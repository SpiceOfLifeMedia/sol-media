/** Vercel Edge Function — /api/checkout-status */

import Stripe from 'stripe';

export const config = { runtime: 'edge' };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') return json({ error: 'Method not allowed.' }, 405);

  const sessionId = new URL(req.url).searchParams.get('session_id')?.trim() ?? '';
  if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(sessionId) || sessionId.length > 255) {
    return json({ error: 'Invalid checkout session.' }, 400);
  }

  const stripeSecret = (process.env['STRIPE_SECRET_KEY'] ?? '').trim();
  if (!stripeSecret) return json({ error: 'Payment status is unavailable.' }, 503);

  try {
    const stripe = new Stripe(stripeSecret, { httpClient: Stripe.createFetchHttpClient() });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === 'paid' || session.payment_status === 'no_payment_required';
    return json({
      paid,
      processing: !paid && session.status === 'complete',
      reference: session.metadata?.['sol_reference'] || session.client_reference_id || undefined,
      value: typeof session.amount_total === 'number' ? session.amount_total / 100 : undefined,
      currency: session.currency?.toUpperCase(),
    });
  } catch {
    return json({ error: 'Payment status is unavailable.' }, 404);
  }
}
