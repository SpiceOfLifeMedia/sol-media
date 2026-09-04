/** Vercel Edge Function — /api/stripe-webhook */

import Stripe from 'stripe';

export const config = { runtime: 'edge' };

const OWNER_EMAIL = 'info@spiceoflifemedia.com.au';
const FROM_EMAIL = 'Spice of Life Media <orders@spiceoflifemedia.com.au>';
const NEXT_ORDER_COUPON_ID = 'SOL_NEXT_ORDER_5';

type PaidOrder = {
  reference: string;
  full_name: string;
  customer_email: string;
  phone: string;
  payload: Record<string, unknown>;
  amount_total: number;
  amount_paid: number;
  reward_code: string | null;
  customer_payment_email_delivery_state: 'pending' | 'sent' | 'failed';
  owner_payment_email_delivery_state: 'pending' | 'sent' | 'failed';
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character] ?? character);
}

function value(payload: Record<string, unknown>, key: string, fallback = '—'): string {
  const item = payload[key];
  return typeof item === 'string' && item.trim() ? item.trim() : fallback;
}

function formatAud(cents: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(cents / 100);
}

async function supabaseRpc<T>(url: string, secret: string, name: string, body: unknown): Promise<T> {
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: secret, Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`supabase_${response.status}`);
  const responseBody = await response.text();
  return (responseBody ? JSON.parse(responseBody) : undefined) as T;
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.ok;
}

async function ensureRewardCode(stripe: Stripe, session: Stripe.Checkout.Session, reference: string): Promise<string | null> {
  if (session.metadata?.['marketing_consent'] !== 'yes') return null;
  const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
  if (!customerId) throw new Error('missing_stripe_customer');

  let coupon: Stripe.Coupon;
  try {
    coupon = await stripe.coupons.retrieve(NEXT_ORDER_COUPON_ID);
  } catch (error) {
    if (!(error instanceof Stripe.errors.StripeInvalidRequestError) || error.code !== 'resource_missing') throw error;
    coupon = await stripe.coupons.create({
      id: NEXT_ORDER_COUPON_ID,
      percent_off: 5,
      duration: 'once',
      name: '5% off your next Spice of Life Media order',
      metadata: { source: 'custom-cds' },
    }, { idempotencyKey: 'sol-next-order-5-coupon' });
  }

  const code = `SOL5-${reference.replace(/^SOL-/, '')}`;
  await stripe.promotionCodes.create({
    promotion: { type: 'coupon', coupon: coupon.id },
    code,
    customer: customerId,
    max_redemptions: 1,
    metadata: { source_order: reference },
  }, { idempotencyKey: `sol-reward-${session.id}` });
  return code;
}

function customerEmail(order: PaidOrder) {
  const reward = order.reward_code
    ? `<div style="margin:28px 0;padding:24px;border:2px solid #16150f"><div style="font-size:11px;font-weight:800;letter-spacing:.14em;color:#716c61">5% OFF YOUR NEXT CUSTOM CD ORDER</div><div style="margin-top:8px;font-size:30px;font-weight:800;color:#e8451c;letter-spacing:.08em">${escapeHtml(order.reward_code)}</div></div><p>Enter this one-use code at the SOL website checkout next time. It is linked to this email address.</p>`
    : '';
  const rewardText = order.reward_code ? `\n\nYour one-use 5% next-order code is ${order.reward_code}.` : '';
  return {
    subject: `Payment received for ${order.reference}`,
    html: `<!doctype html><html><body style="margin:0;background:#f2eee6;font-family:Arial,sans-serif;color:#16150f"><div style="max-width:620px;margin:0 auto;padding:32px"><div style="background:#16150f;padding:32px;color:#f2eee6"><div style="font-size:11px;font-weight:700;letter-spacing:.16em;color:#e8451c">PAYMENT RECEIVED</div><h1 style="margin:10px 0;font-size:36px">${escapeHtml(order.reference)}</h1><p style="margin:0;color:#d8d3ca">Your custom CD is now in the Spice of Life Media production queue.</p></div><div style="background:#fff;padding:32px"><p style="margin-top:0">Hi ${escapeHtml(order.full_name)},</p><p>We received <strong>${escapeHtml(formatAud(order.amount_paid))}</strong> for your custom CD order. Keep your SOL reference until delivery.</p>${reward}<p style="margin-bottom:0;font-size:13px;color:#716c61">Questions? Reply to this email or contact info@spiceoflifemedia.com.au.</p></div></div></body></html>`,
    text: `Hi ${order.full_name},\n\nPayment received for ${order.reference}: ${formatAud(order.amount_paid)}. Your custom CD is now in production.${rewardText}`,
  };
}

function ownerEmail(order: PaidOrder) {
  const payload = order.payload;
  const address = [value(payload, 'streetAddress', ''), value(payload, 'addressExtra', ''), value(payload, 'city', ''), value(payload, 'region', ''), value(payload, 'postcode', ''), value(payload, 'country', '')].filter(Boolean).join(', ');
  const rows: Array<[string, string]> = [
    ['Customer', order.full_name], ['Email', order.customer_email], ['Phone', order.phone], ['Address', address],
    ['CD title', value(payload, 'cdTitle')], ['CD option', value(payload, 'artworkOption')], ['Music source', value(payload, 'musicSource')],
    ['Music link', value(payload, 'musicLink')], ['Artwork link', value(payload, 'artworkLink')], ['Artwork brief', value(payload, 'artworkBrief')],
    ['Shipping', value(payload, 'shippingMethod')], ['Original total', formatAud(order.amount_total)], ['Amount paid', formatAud(order.amount_paid)],
  ];
  const table = rows.map(([label, content]) => `<tr><td style="padding:9px 0;border-bottom:1px solid #ded9cf;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#716c61;vertical-align:top">${escapeHtml(label)}</td><td style="padding:9px 0 9px 20px;border-bottom:1px solid #ded9cf;font-size:14px;color:#16150f;word-break:break-word">${escapeHtml(content)}</td></tr>`).join('');
  return {
    subject: `PAID ${order.reference} — Custom CD from ${order.full_name}`,
    html: `<!doctype html><html><body style="margin:0;background:#f2eee6;font-family:Arial,sans-serif;color:#16150f"><div style="max-width:680px;margin:0 auto;padding:32px"><div style="background:#16150f;padding:28px 32px;color:#f2eee6"><div style="font-size:11px;font-weight:700;letter-spacing:.16em;color:#e8451c">PAID WEBSITE ORDER</div><h1 style="margin:8px 0 0;font-size:32px">${escapeHtml(order.reference)}</h1><p style="margin:8px 0 0;color:#d8d3ca">Ready for the SOL production queue</p></div><div style="background:#fff;padding:28px 32px"><table style="width:100%;border-collapse:collapse">${table}</table></div></div></body></html>`,
    text: [`PAID WEBSITE ORDER — ${order.reference}`, `Amount paid: ${formatAud(order.amount_paid)}`, `Customer: ${order.full_name}`, `Email: ${order.customer_email}`, `Phone: ${order.phone}`, `Address: ${address}`, `CD title: ${value(payload, 'cdTitle')}`, `CD option: ${value(payload, 'artworkOption')}`, `Music link: ${value(payload, 'musicLink')}`, `Shipping: ${value(payload, 'shippingMethod')}`].join('\n'),
  };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  const stripeSecret = (process.env['STRIPE_SECRET_KEY'] ?? '').trim();
  const webhookSecret = (process.env['STRIPE_WEBHOOK_SECRET'] ?? '').trim();
  const supabaseUrl = (process.env['SUPABASE_URL'] ?? '').trim();
  const supabaseSecret = (process.env['SUPABASE_SECRET_KEY'] ?? '').trim();
  const resendApiKey = (process.env['RESEND_API_KEY'] ?? '').trim();
  if (!stripeSecret || !webhookSecret || !supabaseUrl || !supabaseSecret || !resendApiKey) {
    console.error('[stripe-webhook] Required server configuration is missing');
    return json({ error: 'Webhook is not configured.' }, 503);
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) return json({ error: 'Missing signature.' }, 400);

  const stripe = new Stripe(stripeSecret, { httpClient: Stripe.createFetchHttpClient() });
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      await req.text(),
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch {
    return json({ error: 'Invalid signature.' }, 400);
  }

  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') {
    return json({ received: true });
  }

  const session = event.data.object;
  if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
    return json({ received: true, pending: true });
  }

  const reference = session.metadata?.['sol_reference'] || session.client_reference_id || '';
  const amountSubtotal = session.amount_subtotal;
  const amountPaid = session.amount_total;
  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || '';
  if (!/^SOL-[0-9]{6}$/.test(reference) || amountSubtotal === null || amountPaid === null) {
    console.error('[stripe-webhook] Checkout session is missing required order metadata');
    return json({ error: 'Order metadata is incomplete.' }, 422);
  }

  try {
    const rewardCode = await ensureRewardCode(stripe, session, reference);
    const paidResult = await supabaseRpc<PaidOrder[]>(supabaseUrl, supabaseSecret, 'mark_custom_cd_order_paid', {
      p_reference: reference,
      p_checkout_session_id: session.id,
      p_payment_intent_id: paymentIntentId,
      p_amount_subtotal: amountSubtotal,
      p_amount_paid: amountPaid,
      p_reward_code: rewardCode,
    });
    const order = paidResult[0];
    if (!order) throw new Error('missing_paid_order');

    const fromEmail = (process.env['ORDER_FROM_EMAIL'] ?? FROM_EMAIL).trim();
    const toEmail = (process.env['ORDER_TO_EMAIL'] ?? OWNER_EMAIL).trim();
    let customerDelivered = order.customer_payment_email_delivery_state === 'sent';
    let ownerDelivered = order.owner_payment_email_delivery_state === 'sent';

    if (!customerDelivered) {
      customerDelivered = await sendEmail(resendApiKey, { from: fromEmail, to: [order.customer_email], ...customerEmail(order) });
      await supabaseRpc<unknown>(supabaseUrl, supabaseSecret, 'mark_custom_cd_payment_email_state', {
        p_reference: reference,
        p_email_kind: 'customer',
        p_state: customerDelivered ? 'sent' : 'failed',
      });
    }

    if (!ownerDelivered) {
      ownerDelivered = await sendEmail(resendApiKey, { from: fromEmail, to: [toEmail], reply_to: order.customer_email, ...ownerEmail(order) });
      await supabaseRpc<unknown>(supabaseUrl, supabaseSecret, 'mark_custom_cd_payment_email_state', {
        p_reference: reference,
        p_email_kind: 'owner',
        p_state: ownerDelivered ? 'sent' : 'failed',
      });
    }

    if (!customerDelivered || !ownerDelivered) throw new Error('email_delivery_failed');
    return json({ received: true });
  } catch {
    console.error('[stripe-webhook] Paid order fulfillment failed');
    return json({ error: 'Fulfillment failed and will be retried.' }, 500);
  }
}
