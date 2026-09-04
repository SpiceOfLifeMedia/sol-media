import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const app = read('src/App.tsx');
const seo = read('src/lib/seo.ts');
const orderPage = read('src/pages/Order.tsx');
const orderApi = read('api/order.ts');
const checkoutStatusApi = read('api/checkout-status.ts');
const webhookApi = read('api/stripe-webhook.ts');
const migration = read('supabase/migrations/20260904063000_add_custom_cd_direct_checkout.sql');
const analytics = read('src/lib/analytics.ts');

const products = [
  ['Blank CD + Sleeve', '1095'],
  ['Blank CD + Jewel Case', '1495'],
  ['Full Artwork Package', '2595'],
  ['Custom Artwork Setup', '4895'],
];

test('direct checkout and Etsy reference form stay on separate routes', () => {
  assert.match(app, /<Route path="\/custom-cds" component=\{DirectCustomCdOrder\} \/>/);
  assert.match(app, /<Route path="\/custom-cd-order" component=\{EtsyCustomCdOrder\} \/>/);
  assert.match(app, /return <Order checkoutMode="site" \/>/);
  assert.match(app, /return <Order \/>/);
});

test('the public direct-sales page is indexable while the Etsy form stays private', () => {
  const directConfig = seo.match(/'\/custom-cds': \{([\s\S]*?)\n  \},/u)?.[1] ?? '';
  const etsyConfig = seo.match(/'\/custom-cd-order': \{([\s\S]*?)\n  \},/u)?.[1] ?? '';

  assert.match(directConfig, /index: true/);
  assert.match(directConfig, /faq: CUSTOM_CD_FAQS/);
  assert.match(directConfig, /AU\$10\.95/);
  assert.match(etsyConfig, /index: false/);
  assert.match(etsyConfig, /follow: false/);
});

test('all four prices are mirrored in the client and trusted server catalogues', () => {
  for (const [label, cents] of products) {
    assert.match(orderPage, new RegExp(label.replace(/[+]/g, '\\\+'), 'i'));
    assert.match(orderPage, new RegExp(`cents:\\s*${cents}`));
    assert.match(orderApi, new RegExp(`cents:\\s*${cents}`));
  }
  assert.match(orderApi, /unit_amount: item\.cents/);
  assert.match(orderApi, /const storedPayload = \{ \.\.\.data, amountTotal: priced\.amountTotal \}/);
});

test('Stripe checkout uses server-calculated totals and returns only to the public sales page', () => {
  assert.match(orderApi, /const priced = priceOrder\(data\)/);
  assert.match(orderApi, /line_items: priced\.lineItems/);
  assert.match(orderApi, /success_url: `\$\{origin\}\/custom-cds\?checkout=success/);
  assert.match(orderApi, /cancel_url: `\$\{origin\}\/custom-cds\?checkout=cancelled/);
  assert.match(checkoutStatusApi, /session\.payment_status === 'paid' \|\| session\.payment_status === 'no_payment_required'/);
  assert.match(checkoutStatusApi, /session\.amount_total \/ 100/);
});

test('consent-gated commerce events cover the direct checkout funnel', () => {
  assert.match(analytics, /begin_checkout/);
  assert.match(analytics, /purchase/);
  assert.match(orderPage, /form_name: 'custom_cd_direct'/);
  assert.match(orderPage, /trackAnalyticsEvent\('begin_checkout'/);
  assert.match(orderPage, /trackAnalyticsEvent\('purchase'/);
  assert.match(orderPage, /ANALYTICS_ENABLED_EVENT/);
});

test('the payment webhook is signed, idempotent and persists paid state before email', () => {
  assert.match(webhookApi, /stripe\.webhooks\.constructEvent/);
  assert.match(webhookApi, /event\.type !== 'checkout\.session\.completed'/);
  assert.match(webhookApi, /mark_custom_cd_order_paid/);
  assert.match(webhookApi, /const order = paidResult\[0\]/);
  assert.match(webhookApi, /customer_payment_email_delivery_state === 'sent'/);
  assert.match(webhookApi, /owner_payment_email_delivery_state === 'sent'/);
  assert.match(migration, /order_record\.amount_total <> p_amount_subtotal/);
  assert.match(migration, /order_record\.status not in \('awaiting_site_payment', 'paid'\)/);
  assert.match(migration, /grant execute on function public\.mark_custom_cd_order_paid.*to service_role/);
});
