/** Vercel Edge Function — /api/order */

export const config = { runtime: 'edge' };

const OWNER_EMAIL = 'info@spiceoflifemedia.com.au';
const FROM_EMAIL = 'Spice of Life Media <orders@spiceoflifemedia.com.au>';
const ETSY_ORDER_URL =
  'https://www.etsy.com/au/listing/4382552922/personalised-burned-mixtape-cd-custom';
const AUSTRALIAN_STATES = new Set(['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']);

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
  musicSource: 'spotify' | 'drive';
  musicLink: string;
  spotifyPublic: boolean;
  spotifyOrderConfirmed: boolean;
  driveFilesNumbered: boolean;
  under79Minutes: boolean;
  rightsConfirmed: boolean;
  artworkLink: string;
  rhinestones: 'yes' | 'no';
  giftCard: 'yes' | 'no';
  giftMessage: string;
  shippingConfirmed: boolean;
  idempotencyKey: string;
};

type RpcOrder = { reference: string; created: boolean };

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

function validHttpsUrl(value: string): boolean {
  if (!value) return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
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
    musicSource: raw.musicSource === 'spotify' ? 'spotify' : 'drive',
    musicLink: stringValue(raw.musicLink, 1200),
    spotifyPublic: booleanValue(raw.spotifyPublic),
    spotifyOrderConfirmed: booleanValue(raw.spotifyOrderConfirmed),
    driveFilesNumbered: booleanValue(raw.driveFilesNumbered),
    under79Minutes: booleanValue(raw.under79Minutes),
    rightsConfirmed: booleanValue(raw.rightsConfirmed),
    artworkLink: stringValue(raw.artworkLink, 1200),
    rhinestones: raw.rhinestones === 'yes' ? 'yes' : 'no',
    giftCard: raw.giftCard === 'yes' ? 'yes' : 'no',
    giftMessage: stringValue(raw.giftMessage, 600),
    shippingConfirmed: booleanValue(raw.shippingConfirmed),
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
  if (raw.musicSource !== 'spotify' && raw.musicSource !== 'drive') {
    errors.musicSource = 'Choose how you are sending the music.';
  }
  if (data.musicLink && !validHttpsUrl(data.musicLink)) {
    errors.musicLink = 'Enter a complete https:// link.';
  }
  if (data.artworkLink && !validHttpsUrl(data.artworkLink)) {
    errors.artworkLink = 'Enter a complete https:// link.';
  }
  if (data.country.toLowerCase() === 'australia' && !AUSTRALIAN_STATES.has(data.region)) {
    errors.region = 'Choose an Australian state or territory.';
  }
  if (raw.rhinestones !== 'yes' && raw.rhinestones !== 'no') {
    errors.rhinestones = 'Choose Yes or No.';
  }
  if (raw.giftCard !== 'yes' && raw.giftCard !== 'no') {
    errors.giftCard = 'Choose Yes or No.';
  }
  if (data.giftCard === 'yes' && !data.giftMessage) {
    errors.giftMessage = 'Enter the printed gift card message.';
  }
  if (data.musicSource === 'spotify' && !data.spotifyPublic) {
    errors.spotifyPublic = 'Confirm that your Spotify playlist is public.';
  }
  if (data.musicSource === 'spotify' && !data.spotifyOrderConfirmed) {
    errors.spotifyOrderConfirmed = 'Confirm the Spotify playlist order.';
  }
  if (data.musicSource === 'drive' && !data.driveFilesNumbered) {
    errors.driveFilesNumbered = 'Confirm that every filename is numbered.';
  }
  if (!data.under79Minutes) errors.under79Minutes = 'Confirm that the CD is under 79 minutes.';
  if (!data.rightsConfirmed) errors.rightsConfirmed = 'Confirm that you may reproduce the supplied files.';
  if (!data.shippingConfirmed) errors.shippingConfirmed = 'Confirm that you understand the shipping information.';
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

function orderRows(data: OrderData): string {
  const rows: Array<[string, string]> = [
    ['Name', data.fullName], ['Email', data.email], ['Phone', data.phone],
    ['Address', [data.streetAddress, data.addressExtra, data.city, data.region, data.postcode, data.country].filter(Boolean).join(', ')],
    ['CD title', data.cdTitle],
    ['Music source', data.musicSource === 'spotify' ? 'Spotify playlist' : 'Google Drive folder'],
    ['Music link', data.musicLink], ['Artwork link', data.artworkLink || 'Blank CD'],
    ['Rhinestone add-on', data.rhinestones === 'yes' ? 'Yes — customer will add at Etsy checkout' : 'No'],
    ['Printed gift card', data.giftCard === 'yes' ? 'Yes — customer will add at Etsy checkout' : 'No'],
    ['Gift card message', data.giftMessage || '—'],
  ];
  return rows.map(([label, value]) => `<tr><td style="padding:9px 0;border-bottom:1px solid #ded9cf;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#716c61;vertical-align:top">${escapeHtml(label)}</td><td style="padding:9px 0 9px 20px;border-bottom:1px solid #ded9cf;font-size:14px;color:#16150f;word-break:break-word">${escapeHtml(value)}</td></tr>`).join('');
}

function ownerEmail(data: OrderData, reference: string) {
  return {
    subject: `${reference} — Custom CD order from ${data.fullName}`,
    html: `<!doctype html><html><body style="margin:0;background:#f2eee6;font-family:Arial,sans-serif;color:#16150f"><div style="max-width:680px;margin:0 auto;padding:32px"><div style="background:#16150f;padding:28px 32px;color:#f2eee6"><div style="font-size:11px;font-weight:700;letter-spacing:.16em;color:#e8451c">CUSTOM CD ORDER</div><h1 style="margin:8px 0 0;font-size:32px">${reference}</h1><p style="margin:8px 0 0;color:#d8d3ca">Awaiting Etsy payment match</p></div><div style="background:#fff;padding:28px 32px"><table style="width:100%;border-collapse:collapse">${orderRows(data)}</table></div></div></body></html>`,
    text: [`CUSTOM CD ORDER — ${reference}`, 'Status: Awaiting Etsy payment match', '', `Name: ${data.fullName}`, `Email: ${data.email}`, `Phone: ${data.phone}`, `Address: ${[data.streetAddress, data.addressExtra, data.city, data.region, data.postcode, data.country].filter(Boolean).join(', ')}`, `CD title: ${data.cdTitle}`, `Music source: ${data.musicSource}`, `Music link: ${data.musicLink}`, `Artwork: ${data.artworkLink || 'Blank CD'}`, `Rhinestones: ${data.rhinestones}`, `Gift card: ${data.giftCard}`, `Gift message: ${data.giftMessage || '—'}`].join('\n'),
  };
}

function customerEmail(data: OrderData, reference: string) {
  return {
    subject: `Your Spice of Life Media order reference: ${reference}`,
    html: `<!doctype html><html><body style="margin:0;background:#f2eee6;font-family:Arial,sans-serif;color:#16150f"><div style="max-width:620px;margin:0 auto;padding:32px"><div style="background:#16150f;padding:32px;color:#f2eee6"><div style="font-size:11px;font-weight:700;letter-spacing:.16em;color:#e8451c">YOUR CUSTOM CD REFERENCE</div><h1 style="margin:10px 0;font-size:38px">${reference}</h1><p style="margin:0;color:#d8d3ca">Your details are saved. Your CD does not enter production until we match this reference to a paid Etsy order.</p></div><div style="background:#fff;padding:32px"><p style="margin-top:0">Hi ${escapeHtml(data.fullName)},</p><p>Return to Etsy to pay, then place <strong>${reference}</strong> in the Etsy personalisation box or note to seller.</p><p style="margin:28px 0"><a href="${ETSY_ORDER_URL}" style="display:inline-block;background:#e8451c;color:#16150f;padding:16px 22px;font-weight:800;text-decoration:none;letter-spacing:.08em">RETURN TO ETSY AND PAY</a></p><p style="margin-bottom:0;font-size:13px;color:#716c61">Keep this email until your order is complete.</p></div></div></body></html>`,
    text: `Hi ${data.fullName},\n\nYour custom CD details are saved.\n\nReference: ${reference}\n\nReturn to Etsy to pay: ${ETSY_ORDER_URL}\n\nPlace ${reference} in the Etsy personalisation box or note to seller. Your CD does not enter production until we match this reference to a paid Etsy order.`,
  };
}

async function fingerprint(req: Request, salt: string): Promise<string> {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim().slice(0, 64) || 'unknown';
  const bytes = new TextEncoder().encode(`${salt}:${forwarded}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
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
  return response.json() as Promise<T>;
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.ok;
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

  let rpcOrder: RpcOrder;
  try {
    const result = await supabaseRpc<RpcOrder[]>(supabaseUrl, supabaseSecret, 'create_custom_cd_order', {
      p_payload: data,
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

  if (!rpcOrder.created) {
    return json({ ok: true, reference: rpcOrder.reference, emailDelivered: true });
  }

  const owner = ownerEmail(data, rpcOrder.reference);
  const customer = customerEmail(data, rpcOrder.reference);
  const toEmail = (process.env['ORDER_TO_EMAIL'] ?? OWNER_EMAIL).trim();
  const fromEmail = (process.env['ORDER_FROM_EMAIL'] ?? FROM_EMAIL).trim();
  const emailResults = await Promise.allSettled([
    sendEmail(resendApiKey, { from: fromEmail, to: [toEmail], reply_to: data.email, ...owner }),
    sendEmail(resendApiKey, { from: fromEmail, to: [data.email], ...customer }),
  ]);
  const delivered = emailResults.map((result) => result.status === 'fulfilled' && result.value);
  const emailState = delivered.every(Boolean) ? 'sent' : delivered.some(Boolean) ? 'partial_failure' : 'failed';

  try {
    await supabaseRpc<unknown>(supabaseUrl, supabaseSecret, 'mark_custom_cd_order_email_state', {
      p_reference: rpcOrder.reference,
      p_state: emailState,
    });
  } catch {
    console.error('[order] Email state update failed');
  }

  return json({
    ok: true,
    reference: rpcOrder.reference,
    emailDelivered: emailState === 'sent',
  });
}
