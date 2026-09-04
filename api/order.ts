/** Vercel Edge Function — /api/order */

import Stripe from 'stripe';

export const config = { runtime: 'edge' };

const OWNER_EMAIL = 'info@spiceoflifemedia.com.au';
const FROM_EMAIL = 'Spice of Life Media <orders@spiceoflifemedia.com.au>';
const ETSY_ORDER_URL =
  'https://www.etsy.com/au/listing/4382552922/personalised-burned-mixtape-cd-custom';
const UNSUBSCRIBE_BASE_URL = 'https://www.spiceoflifemedia.com.au/api/unsubscribe';
const AUSTRALIAN_STATES = new Set(['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']);
const ARTWORK_BUCKET = 'custom-cd-artwork';
const ARTWORK_SLOTS = ['front', 'back', 'disc'] as const;
const MAX_ARTWORK_BYTES = 20 * 1024 * 1024;
const CD_OPTIONS = {
  blank_sleeve: { label: 'Blank CD + Sleeve', cents: 1095 },
  blank_jewel: { label: 'Blank CD + Jewel Case', cents: 1495 },
  full: { label: 'Full Artwork Package', cents: 2595 },
  custom: { label: 'Custom Artwork Setup', cents: 4895 },
} as const;
const SHIPPING_OPTIONS = {
  'au-economy': { label: 'Economy shipping — untracked', cents: 680, destination: 'au' },
  'au-standard': { label: 'Tracked Standard shipping', cents: 1095, destination: 'au' },
  'au-express': { label: 'Express Post', cents: 1320, destination: 'au' },
  'nz-standard': { label: 'New Zealand shipping', cents: 1895, destination: 'nz' },
  'global-standard': { label: 'Worldwide shipping', cents: 3495, destination: 'global' },
} as const;

type ArtworkSlot = typeof ARTWORK_SLOTS[number];
type ArtworkFile = { path: string; name: string; type: string; size: number };
type ArtworkOption = keyof typeof CD_OPTIONS;
type ShippingMethod = keyof typeof SHIPPING_OPTIONS;

type OrderData = {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  addressExtra: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
  cdTitle: string;
  musicSource: 'spotify' | 'google_drive' | 'dropbox';
  musicLink: string;
  playlistDurationMinutes: number;
  spotifyPublic: boolean;
  spotifyOrderConfirmed: boolean;
  driveFilesNumbered: boolean;
  under79Minutes: boolean;
  rightsConfirmed: boolean;
  artworkOption: ArtworkOption;
  artworkLink: string;
  artworkBrief: string;
  artworkFiles: Partial<Record<ArtworkSlot, ArtworkFile>>;
  artworkPrintConfirmed: boolean;
  plainCdConfirmed: boolean;
  shippingConfirmed: boolean;
  shippingMethod: ShippingMethod | '';
  checkoutMethod: 'etsy' | 'site';
  marketingConsent: boolean;
  idempotencyKey: string;
};

type RpcOrder = {
  reference: string;
  created: boolean;
  payment_channel: 'etsy' | 'site';
  stripe_checkout_session_id: string | null;
};
type RpcPromo = { promo_code: string | null };
type ResendResult = { ok: boolean; id?: string };
type PricedOrder = { amountTotal: number; lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] };

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function stringValue(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function booleanValue(value: unknown): boolean {
  return value === true;
}

function numberValue(value: unknown): number {
  const parsed = typeof value === 'number' ? value : Number(typeof value === 'string' ? value.trim() : NaN);
  return Number.isFinite(parsed) ? parsed : 0;
}

function destinationFor(country: string): 'au' | 'nz' | 'global' {
  const normalized = country.trim().toLowerCase();
  if (normalized === 'australia') return 'au';
  if (normalized === 'new zealand' || normalized === 'nz') return 'nz';
  return 'global';
}

function validMusicLink(source: OrderData['musicSource'], value: string): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    if (url.protocol !== 'https:') return false;
    if (source === 'spotify') return host === 'open.spotify.com' && url.pathname.startsWith('/playlist/');
    if (source === 'google_drive') return host === 'drive.google.com' && url.pathname.includes('/folders/');
    return host === 'dropbox.com';
  } catch {
    return false;
  }
}

function validCanvaLink(value: string): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    const parts = url.pathname.split('/').filter(Boolean);
    return url.protocol === 'https:'
      && host === 'canva.com'
      && parts[0] === 'design'
      && parts.length >= 4
      && parts.at(-1) === 'view';
  } catch {
    return false;
  }
}

function artworkFilesValue(value: unknown): Partial<Record<ArtworkSlot, ArtworkFile>> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const rawFiles = value as Record<string, unknown>;
  const files: Partial<Record<ArtworkSlot, ArtworkFile>> = {};
  for (const slot of ARTWORK_SLOTS) {
    const rawFile = rawFiles[slot];
    if (!rawFile || typeof rawFile !== 'object' || Array.isArray(rawFile)) continue;
    const item = rawFile as Record<string, unknown>;
    files[slot] = {
      path: stringValue(item.path, 260),
      name: stringValue(item.name, 180),
      type: stringValue(item.type, 80).toLowerCase(),
      size: typeof item.size === 'number' ? Math.floor(item.size) : 0,
    };
  }
  return files;
}

function validate(raw: Record<string, unknown>): { data?: OrderData; errors?: Record<string, string> } {
  const data: OrderData = {
    fullName: stringValue(raw.fullName, 120),
    email: stringValue(raw.email, 254).toLowerCase(),
    phone: stringValue(raw.phone, 40),
    streetAddress: stringValue(raw.streetAddress, 180),
    addressExtra: stringValue(raw.addressExtra, 120),
    city: stringValue(raw.city, 100),
    region: stringValue(raw.region, 100).toUpperCase(),
    postcode: stringValue(raw.postcode, 24),
    country: stringValue(raw.country, 100),
    cdTitle: stringValue(raw.cdTitle, 120),
    musicSource: raw.musicSource === 'spotify' || raw.musicSource === 'google_drive' || raw.musicSource === 'dropbox'
      ? raw.musicSource
      : 'spotify',
    musicLink: stringValue(raw.musicLink, 1200),
    playlistDurationMinutes: numberValue(raw.playlistDurationMinutes),
    spotifyPublic: booleanValue(raw.spotifyPublic),
    spotifyOrderConfirmed: booleanValue(raw.spotifyOrderConfirmed),
    driveFilesNumbered: booleanValue(raw.driveFilesNumbered),
    under79Minutes: booleanValue(raw.under79Minutes),
    rightsConfirmed: booleanValue(raw.rightsConfirmed),
    artworkOption: raw.artworkOption === 'blank_sleeve' || raw.artworkOption === 'blank_jewel' || raw.artworkOption === 'full' || raw.artworkOption === 'custom'
      ? raw.artworkOption
      : 'blank_sleeve',
    artworkLink: stringValue(raw.artworkLink, 1200),
    artworkBrief: stringValue(raw.artworkBrief, 1200),
    artworkFiles: artworkFilesValue(raw.artworkFiles),
    artworkPrintConfirmed: booleanValue(raw.artworkPrintConfirmed),
    plainCdConfirmed: booleanValue(raw.plainCdConfirmed),
    shippingConfirmed: booleanValue(raw.shippingConfirmed),
    shippingMethod: stringValue(raw.shippingMethod, 40) as ShippingMethod | '',
    checkoutMethod: raw.checkoutMethod === 'site' ? 'site' : 'etsy',
    marketingConsent: booleanValue(raw.marketingConsent),
    idempotencyKey: stringValue(raw.idempotencyKey, 36),
  };

  const errors: Record<string, string> = {};
  const requiredText: Array<[keyof OrderData, string]> = [
    ['fullName', 'Enter your full name.'],
    ['email', 'Enter your email address.'],
    ['phone', 'Enter your phone number.'],
    ['streetAddress', 'Enter your street address.'],
    ['city', 'Enter your suburb or city.'],
    ['region', 'Enter your state, province or region.'],
    ['postcode', 'Enter your postcode.'],
    ['country', 'Enter your country.'],
    ['cdTitle', 'Enter a CD title.'],
    ['musicLink', 'Paste your playlist or folder link.'],
  ];
  for (const [key, message] of requiredText) {
    if (!data[key]) errors[key] = message;
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (raw.musicSource !== 'spotify' && raw.musicSource !== 'google_drive' && raw.musicSource !== 'dropbox') {
    errors.musicSource = 'Choose how you are sending the music.';
  }
  if (data.musicLink && !validMusicLink(data.musicSource, data.musicLink)) {
    errors.musicLink = data.musicSource === 'spotify'
      ? 'Paste a public Spotify playlist link from open.spotify.com.'
      : data.musicSource === 'google_drive'
        ? 'Paste a shared Google Drive folder link.'
        : 'Paste a shared Dropbox folder link.';
  }
  if (data.playlistDurationMinutes <= 0) {
    errors.playlistDurationMinutes = 'Enter the total running time shown for your playlist or song folder.';
  } else if (data.playlistDurationMinutes >= 79) {
    errors.playlistDurationMinutes = `This music runs for ${data.playlistDurationMinutes} minutes. Shorten it to less than 79 minutes before ordering.`;
  }
  if (raw.artworkOption !== 'blank_sleeve' && raw.artworkOption !== 'blank_jewel' && raw.artworkOption !== 'full' && raw.artworkOption !== 'custom') {
    errors.artworkOption = 'Choose one of the four custom CD options.';
  }
  if (data.artworkOption === 'blank_sleeve' || data.artworkOption === 'blank_jewel') {
    if (!data.plainCdConfirmed) errors.plainCdConfirmed = 'Confirm that this is a blank CD with no printed artwork.';
    if (data.artworkLink) errors.artworkOption = 'Blank CD orders cannot include a Canva artwork link.';
    if (Object.keys(data.artworkFiles).length) errors.artworkOption = 'Blank CD orders cannot include artwork files.';
  }
  if (data.artworkOption === 'full') {
    if (!data.artworkPrintConfirmed) errors.artworkPrintConfirmed = 'Approve the final artwork before submitting.';
    if (!data.artworkLink && Object.keys(data.artworkFiles).length === 0) {
      errors.artworkLink = 'Upload the front, back and disc artwork, or paste your finished Canva design link.';
    } else if (data.artworkLink && !validCanvaLink(data.artworkLink)) {
      errors.artworkLink = 'Paste a public Canva view link ending in /view. Private /edit links are not accepted.';
    } else if (!data.artworkLink) {
      for (const slot of ARTWORK_SLOTS) {
        const file = data.artworkFiles[slot];
        if (!file
            || !file.path.startsWith(`incoming/${data.idempotencyKey}/${slot}.`)
            || !/\.(png|jpg|pdf)$/i.test(file.path)
            || !file.name
            || !['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)
            || file.size <= 0
            || file.size > MAX_ARTWORK_BYTES) {
          errors[`artwork-${slot}`] = `Upload a valid ${slot} artwork file.`;
        }
      }
    }
  }
  if (data.artworkOption === 'custom' && !data.artworkBrief) {
    errors.artworkBrief = 'Tell us what you want the custom artwork to look and feel like.';
  }
  if (data.country.toLowerCase() === 'australia' && !AUSTRALIAN_STATES.has(data.region)) {
    errors.region = 'Choose an Australian state or territory.';
  }
  if (data.musicSource === 'spotify' && !data.spotifyPublic) {
    errors.spotifyPublic = 'Confirm that your Spotify playlist is public.';
  }
  if (data.musicSource === 'spotify' && !data.spotifyOrderConfirmed) {
    errors.spotifyOrderConfirmed = 'Confirm the Spotify playlist order.';
  }
  if (data.musicSource !== 'spotify' && !data.driveFilesNumbered) {
    errors.driveFilesNumbered = 'Confirm that every filename is numbered.';
  }
  if (!data.under79Minutes) {
    errors.under79Minutes = 'Tick to confirm that your music is under 79 minutes. Longer orders are automatically rejected.';
  }
  if (!data.rightsConfirmed) errors.rightsConfirmed = 'Confirm that you may reproduce the supplied files.';
  if (!data.shippingConfirmed) errors.shippingConfirmed = 'Confirm that you understand the shipping information.';
  if (data.checkoutMethod === 'site') {
    if (!Object.hasOwn(SHIPPING_OPTIONS, data.shippingMethod)) {
      errors.shippingMethod = 'Choose a shipping option.';
    } else if (SHIPPING_OPTIONS[data.shippingMethod as ShippingMethod].destination !== destinationFor(data.country)) {
      errors.shippingMethod = 'Choose a shipping option that matches the delivery country.';
    }
  }
  if (raw.checkoutMethod !== 'etsy' && raw.checkoutMethod !== 'site') {
    errors.checkoutMethod = 'Choose a valid checkout method.';
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.idempotencyKey)) {
    errors.idempotencyKey = 'Refresh the page and try again.';
  }

  return Object.keys(errors).length ? { errors } : { data };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character] ?? character);
}

function formatAud(cents: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(cents / 100);
}

function priceOrder(data: OrderData): PricedOrder {
  const product = CD_OPTIONS[data.artworkOption];
  const shipping = data.shippingMethod ? SHIPPING_OPTIONS[data.shippingMethod] : null;
  const pricedItems = [
    { label: product.label, description: `Custom audio CD — ${data.cdTitle}`, cents: product.cents },
    ...(shipping ? [{ label: shipping.label, description: `Delivery to ${data.country}`, cents: shipping.cents }] : []),
  ];

  return {
    amountTotal: pricedItems.reduce((total, item) => total + item.cents, 0),
    lineItems: pricedItems.map((item) => ({
      quantity: 1,
      price_data: {
        currency: 'aud',
        unit_amount: item.cents,
        product_data: { name: item.label, description: item.description.slice(0, 500) },
      },
    })),
  };
}

function musicSourceLabel(source: OrderData['musicSource']): string {
  if (source === 'spotify') return 'Spotify playlist';
  if (source === 'google_drive') return 'Google Drive folder';
  return 'Dropbox folder';
}

function orderRows(data: OrderData): string {
  const artworkSummary = data.artworkOption === 'blank_sleeve'
    ? 'Blank CD + cardboard sleeve — no printed artwork'
    : data.artworkOption === 'blank_jewel'
      ? 'Blank CD + jewel case — no printed artwork'
      : data.artworkOption === 'custom'
        ? `Custom Artwork Setup — ${data.artworkBrief}`
        : data.artworkLink
          ? `Full Artwork Package — Canva design: ${data.artworkLink}`
          : `Full Artwork Package — ${ARTWORK_SLOTS.map((slot) => data.artworkFiles[slot]?.name).filter(Boolean).join(', ')}`;
  const rows: Array<[string, string]> = [
    ['Name', data.fullName], ['Email', data.email], ['Phone', data.phone],
    ['Address', [data.streetAddress, data.addressExtra, data.city, data.region, data.postcode, data.country].filter(Boolean).join(', ')],
    ['CD title', data.cdTitle],
    ['CD option', `${CD_OPTIONS[data.artworkOption].label} — ${formatAud(CD_OPTIONS[data.artworkOption].cents)}`],
    ['Music source', musicSourceLabel(data.musicSource)],
    ['Music link', data.musicLink], ['Music length', `${data.playlistDurationMinutes} minutes`], ['Artwork', artworkSummary],
    ...(data.shippingMethod ? [['Shipping', `${SHIPPING_OPTIONS[data.shippingMethod].label} — ${formatAud(SHIPPING_OPTIONS[data.shippingMethod].cents)}`] as [string, string]] : []),
  ];
  return rows.map(([label, value]) => `<tr><td style="padding:9px 0;border-bottom:1px solid #ded9cf;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#716c61;vertical-align:top">${escapeHtml(label)}</td><td style="padding:9px 0 9px 20px;border-bottom:1px solid #ded9cf;font-size:14px;color:#16150f;word-break:break-word">${escapeHtml(value)}</td></tr>`).join('');
}

function ownerEmail(data: OrderData, reference: string) {
  return {
    subject: `${reference} — Custom CD order from ${data.fullName}`,
    html: `<!doctype html><html><body style="margin:0;background:#f2eee6;font-family:Arial,sans-serif;color:#16150f"><div style="max-width:680px;margin:0 auto;padding:32px"><div style="background:#16150f;padding:28px 32px;color:#f2eee6"><div style="font-size:11px;font-weight:700;letter-spacing:.16em;color:#e8451c">CUSTOM CD ORDER</div><h1 style="margin:8px 0 0;font-size:32px">${reference}</h1><p style="margin:8px 0 0;color:#d8d3ca">Awaiting Etsy payment match</p></div><div style="background:#fff;padding:28px 32px"><table style="width:100%;border-collapse:collapse">${orderRows(data)}</table></div></div></body></html>`,
    text: [`CUSTOM CD ORDER — ${reference}`, 'Status: Awaiting Etsy payment match', '', `Name: ${data.fullName}`, `Email: ${data.email}`, `Phone: ${data.phone}`, `Address: ${[data.streetAddress, data.addressExtra, data.city, data.region, data.postcode, data.country].filter(Boolean).join(', ')}`, `CD title: ${data.cdTitle}`, `Music source: ${data.musicSource}`, `Music link: ${data.musicLink}`, `Music length: ${data.playlistDurationMinutes} minutes`, `Artwork: ${data.artworkOption === 'blank_sleeve' ? 'Blank CD + cardboard sleeve — no printed artwork' : data.artworkOption === 'blank_jewel' ? 'Blank CD + jewel case — no printed artwork' : data.artworkOption === 'custom' ? `Custom Artwork Setup — ${data.artworkBrief}` : data.artworkLink ? `Full Artwork Package — Canva design: ${data.artworkLink}` : 'Full Artwork Package — front, back and disc uploaded'}`].join('\n'),
  };
}

function customerEmail(data: OrderData, reference: string) {
  return {
    subject: `Your Spice of Life Media order reference: ${reference}`,
    html: `<!doctype html><html><body style="margin:0;background:#f2eee6;font-family:Arial,sans-serif;color:#16150f"><div style="max-width:620px;margin:0 auto;padding:32px"><div style="background:#16150f;padding:32px;color:#f2eee6"><div style="font-size:11px;font-weight:700;letter-spacing:.16em;color:#e8451c">YOUR CUSTOM CD REFERENCE</div><h1 style="margin:10px 0;font-size:38px">${reference}</h1><p style="margin:0;color:#d8d3ca">Your details are saved. Your CD does not enter production until we match this reference to a paid Etsy order.</p></div><div style="background:#fff;padding:32px"><p style="margin-top:0">Hi ${escapeHtml(data.fullName)},</p><p>Return to Etsy to pay, then place <strong>${reference}</strong> in the Etsy personalisation box or note to seller.</p><p style="margin:28px 0"><a href="${ETSY_ORDER_URL}" style="display:inline-block;background:#e8451c;color:#16150f;padding:16px 22px;font-weight:800;text-decoration:none;letter-spacing:.08em">RETURN TO ETSY AND PAY</a></p><p style="margin-bottom:0;font-size:13px;color:#716c61">Keep this email until your order is complete.</p></div></div></body></html>`,
    text: `Hi ${data.fullName},\n\nYour custom CD details are saved.\n\nReference: ${reference}\n\nReturn to Etsy to pay: ${ETSY_ORDER_URL}\n\nPlace ${reference} in the Etsy personalisation box or note to seller. Your CD does not enter production until we match this reference to a paid Etsy order.`,
  };
}

function followupEmail(data: OrderData, promoCode: string, unsubscribeUrl: string) {
  const firstName = data.fullName.split(/\s+/)[0] || data.fullName;
  const directOrderSubject = encodeURIComponent(`Direct custom CD reorder — ${promoCode}`);
  const directOrderUrl = `mailto:${OWNER_EMAIL}?subject=${directOrderSubject}`;
  return {
    subject: `Your 5% returning customer code: ${promoCode}`,
    html: `<!doctype html><html><body style="margin:0;background:#f2eee6;font-family:Arial,sans-serif;color:#16150f"><div style="max-width:620px;margin:0 auto;padding:32px"><div style="background:#16150f;padding:32px;color:#f2eee6"><div style="font-size:11px;font-weight:700;letter-spacing:.16em;color:#e8451c">A THANK YOU FROM SPICE OF LIFE MEDIA</div><h1 style="margin:10px 0;font-size:38px">5% off your next order.</h1><p style="margin:0;color:#d8d3ca">Order directly through Spice of Life Media next time and save.</p></div><div style="background:#fff;padding:32px"><p style="margin-top:0">Hi ${escapeHtml(firstName)},</p><p>Use this unique code when you order your next custom CD directly through Spice of Life Media:</p><div style="margin:24px 0;padding:20px;border:2px solid #e8451c;text-align:center;font-size:28px;font-weight:800;letter-spacing:.12em">${escapeHtml(promoCode)}</div><p>Reply to this email with your code and what you would like made, or use the button below to start the email.</p><p style="margin:28px 0"><a href="${directOrderUrl}" style="display:inline-block;background:#e8451c;color:#16150f;padding:16px 22px;font-weight:800;text-decoration:none;letter-spacing:.08em">ORDER DIRECT AND SAVE 5%</a></p><p style="font-size:13px;color:#716c61">Spice of Life Media · ${OWNER_EMAIL}</p><p style="margin-bottom:0;font-size:12px;color:#716c61"><a href="${escapeHtml(unsubscribeUrl)}" style="color:#716c61">Unsubscribe from this follow-up offer</a></p></div></div></body></html>`,
    text: `Hi ${firstName},\n\nOrder your next custom CD directly through Spice of Life Media and take 5% off.\n\nYour unique code: ${promoCode}\n\nReply to this email with your code and what you would like made.\n\nSpice of Life Media\n${OWNER_EMAIL}\n\nUnsubscribe: ${unsubscribeUrl}`,
  };
}

async function fingerprint(req: Request, salt: string): Promise<string> {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim().slice(0, 64) || 'unknown';
  const bytes = new TextEncoder().encode(`${salt}:${forwarded}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function supabaseRpc<T>(url: string, secret: string, name: string, body: unknown): Promise<T> {
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: secret, Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.text();
    if (error.includes('rate_limit_exceeded')) throw new Error('rate_limit_exceeded');
    throw new Error(`supabase_${response.status}`);
  }
  const responseBody = await response.text();
  return (responseBody ? JSON.parse(responseBody) : undefined) as T;
}

async function verifyArtworkFiles(url: string, secret: string, files: Partial<Record<ArtworkSlot, ArtworkFile>>): Promise<boolean> {
  const base = url.replace(/\/$/, '');
  const results = await Promise.all(ARTWORK_SLOTS.map(async (slot) => {
    const path = files[slot]?.path;
    if (!path) return false;
    const response = await fetch(
      `${base}/storage/v1/object/info/${ARTWORK_BUCKET}/${path.split('/').map(encodeURIComponent).join('/')}`,
      { headers: { apikey: secret, Authorization: `Bearer ${secret}` } },
    );
    return response.ok;
  }));
  return results.every(Boolean);
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>, idempotencyKey?: string): Promise<ResendResult> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) return { ok: false };
  const result = await response.json().catch(() => ({})) as { id?: string };
  return { ok: true, id: result.id };
}

async function findOrCreateStripeCustomer(stripe: Stripe, data: OrderData): Promise<Stripe.Customer> {
  const existing = await stripe.customers.list({ email: data.email, limit: 1 });
  const customer = existing.data.find((item) => !item.deleted);
  if (customer) return customer;

  return stripe.customers.create({
    email: data.email,
    name: data.fullName,
    phone: data.phone,
    address: {
      line1: data.streetAddress,
      line2: data.addressExtra || undefined,
      city: data.city,
      state: data.region,
      postal_code: data.postcode,
      country: destinationFor(data.country) === 'au' ? 'AU' : destinationFor(data.country) === 'nz' ? 'NZ' : undefined,
    },
    metadata: { source: 'sol-custom-cds' },
  }, { idempotencyKey: `sol-customer-${data.idempotencyKey}` });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  let raw: Record<string, unknown>;
  try {
    raw = await req.json() as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid order data.' }, 400);
  }

  if (stringValue(raw.websiteConfirm, 200)) return json({ ok: true, reference: 'SOL-000000' });

  const { data, errors } = validate(raw);
  if (!data) return json({ error: 'Please check the highlighted answers.', fields: errors }, 422);

  const supabaseUrl = (process.env['SUPABASE_URL'] ?? '').trim();
  const supabaseSecret = (process.env['SUPABASE_SECRET_KEY'] ?? '').trim();
  const rateLimitSalt = (process.env['ORDER_RATE_LIMIT_SALT'] ?? '').trim();
  const resendApiKey = (process.env['RESEND_API_KEY'] ?? '').trim();
  if (!supabaseUrl || !supabaseSecret || !rateLimitSalt || !resendApiKey) {
    console.error('[order] Required server configuration is missing');
    return json({ error: 'The order service is not configured yet.' }, 503);
  }

  if (data.artworkOption === 'full' && !data.artworkLink) {
    try {
      if (!await verifyArtworkFiles(supabaseUrl, supabaseSecret, data.artworkFiles)) {
        return json({ error: 'One or more artwork files did not finish uploading. Please try again.' }, 422);
      }
    } catch {
      console.error('[order] Artwork verification failed');
      return json({ error: 'We could not verify your artwork files. Please try again.' }, 502);
    }
  }

  const priced = priceOrder(data);
  const storedPayload = { ...data, amountTotal: priced.amountTotal };
  let rpcOrder: RpcOrder;
  try {
    const result = await supabaseRpc<RpcOrder[]>(supabaseUrl, supabaseSecret, 'create_custom_cd_order', {
      p_payload: storedPayload,
      p_fingerprint: await fingerprint(req, rateLimitSalt),
      p_idempotency_key: data.idempotencyKey,
    });
    if (!result[0]?.reference) throw new Error('missing_reference');
    rpcOrder = result[0];
  } catch (error) {
    if (error instanceof Error && error.message === 'rate_limit_exceeded') {
      return json({ error: 'Too many attempts. Please try again in an hour.' }, 429);
    }
    console.error('[order] Supabase order creation failed');
    return json({ error: 'We could not save your order. Please try again.' }, 502);
  }


  if (data.artworkOption === 'full' && !data.artworkLink) {
    try {
      await supabaseRpc<unknown>(supabaseUrl, supabaseSecret, 'finalize_custom_cd_artwork_upload', {
        p_idempotency_key: data.idempotencyKey,
      });
    } catch {
      console.error('[order] Artwork upload finalization failed');
    }
  }

  if (rpcOrder.payment_channel !== data.checkoutMethod) {
    return json({ error: 'This saved order already uses a different checkout method. Refresh the page and try again.' }, 409);
  }

  if (data.checkoutMethod === 'site') {
    const stripeSecret = (process.env['STRIPE_SECRET_KEY'] ?? '').trim();
    if (!stripeSecret) {
      console.error('[order] Stripe configuration is missing');
      return json({ error: 'Secure website checkout is not configured yet.' }, 503);
    }

    try {
      const stripe = new Stripe(stripeSecret, { httpClient: Stripe.createFetchHttpClient() });
      if (rpcOrder.stripe_checkout_session_id) {
        const existingSession = await stripe.checkout.sessions.retrieve(rpcOrder.stripe_checkout_session_id);
        if (existingSession.url) {
          return json({ ok: true, reference: rpcOrder.reference, checkoutUrl: existingSession.url });
        }
      }

      const customer = await findOrCreateStripeCustomer(stripe, data);
      const origin = new URL(req.url).origin;
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer: customer.id,
        line_items: priced.lineItems,
        allow_promotion_codes: true,
        client_reference_id: rpcOrder.reference,
        metadata: {
          sol_reference: rpcOrder.reference,
          order_type: 'custom_cd',
          marketing_consent: data.marketingConsent ? 'yes' : 'no',
        },
        payment_intent_data: { metadata: { sol_reference: rpcOrder.reference, order_type: 'custom_cd' } },
        success_url: `${origin}/custom-cds?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/custom-cds?checkout=cancelled&reference=${encodeURIComponent(rpcOrder.reference)}`,
      }, { idempotencyKey: `sol-checkout-${rpcOrder.reference}` });

      if (!session.url) throw new Error('missing_checkout_url');
      await supabaseRpc<unknown>(supabaseUrl, supabaseSecret, 'attach_custom_cd_checkout', {
        p_reference: rpcOrder.reference,
        p_checkout_session_id: session.id,
        p_customer_id: customer.id,
        p_amount_total: priced.amountTotal,
      });

      return json({ ok: true, reference: rpcOrder.reference, checkoutUrl: session.url });
    } catch {
      console.error('[order] Stripe Checkout creation failed');
      return json({ error: 'We saved your order but could not open secure checkout. Please try again.' }, 502);
    }
  }

  if (!rpcOrder.created) {
    return json({ ok: true, reference: rpcOrder.reference, emailDelivered: true });
  }

  let promoCode = '';
  let unsubscribeToken = '';
  if (data.marketingConsent) {
    unsubscribeToken = `${crypto.randomUUID()}${crypto.randomUUID()}`.replaceAll('-', '');
  }

  try {
    const configured = await supabaseRpc<RpcPromo[]>(supabaseUrl, supabaseSecret, 'configure_custom_cd_followup', {
      p_reference: rpcOrder.reference,
      p_marketing_consent: data.marketingConsent,
      p_unsubscribe_token_hash: unsubscribeToken ? await sha256Hex(unsubscribeToken) : null,
    });
    promoCode = configured[0]?.promo_code ?? '';
  } catch {
    console.error('[order] Follow-up configuration failed');
  }

  const owner = ownerEmail(data, rpcOrder.reference);
  const customer = customerEmail(data, rpcOrder.reference);
  const toEmail = (process.env['ORDER_TO_EMAIL'] ?? OWNER_EMAIL).trim();
  const fromEmail = (process.env['ORDER_FROM_EMAIL'] ?? FROM_EMAIL).trim();
  const emailResults = await Promise.allSettled([
    sendEmail(resendApiKey, { from: fromEmail, to: [toEmail], reply_to: data.email, ...owner }),
    sendEmail(resendApiKey, { from: fromEmail, to: [data.email], ...customer }),
  ]);
  const delivered = emailResults.map((result) => result.status === 'fulfilled' && result.value.ok);
  const emailState = delivered.every(Boolean) ? 'sent' : delivered.some(Boolean) ? 'partial_failure' : 'failed';

  try {
    await supabaseRpc<unknown>(supabaseUrl, supabaseSecret, 'mark_custom_cd_order_email_state', {
      p_reference: rpcOrder.reference,
      p_state: emailState,
    });
  } catch {
    console.error('[order] Email state update failed');
  }

  if (data.marketingConsent && promoCode && unsubscribeToken) {
    const scheduledAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const unsubscribeUrl = `${UNSUBSCRIBE_BASE_URL}?token=${encodeURIComponent(unsubscribeToken)}`;
    const followup = followupEmail(data, promoCode, unsubscribeUrl);
    const scheduled = await sendEmail(resendApiKey, {
      from: fromEmail,
      to: [data.email],
      reply_to: OWNER_EMAIL,
      scheduled_at: scheduledAt,
      ...followup,
    }, `custom-cd-followup-${rpcOrder.reference}`);

    try {
      await supabaseRpc<unknown>(supabaseUrl, supabaseSecret, 'mark_custom_cd_followup_email_state', {
        p_reference: rpcOrder.reference,
        p_state: scheduled.ok ? 'scheduled' : 'failed',
        p_email_id: scheduled.id ?? null,
        p_scheduled_at: scheduled.ok ? scheduledAt : null,
      });
    } catch {
      console.error('[order] Follow-up email state update failed');
    }
  }

  return json({
    ok: true,
    reference: rpcOrder.reference,
    emailDelivered: emailState === 'sent',
  });
}
