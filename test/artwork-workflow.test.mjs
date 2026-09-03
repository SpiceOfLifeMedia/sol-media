import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const orderPage = fs.readFileSync(path.join(root, 'src/pages/Order.tsx'), 'utf8');
const orderApi = fs.readFileSync(path.join(root, 'api/order.ts'), 'utf8');
const migration = fs.readFileSync(path.join(root, 'supabase/migrations/20260904031925_fix_custom_cd_artwork_upload.sql'), 'utf8');

test('native artwork uploads are the primary workflow', () => {
  assert.match(orderPage, /CANVA_FALLBACK_ACTIVE = false/);
  assert.match(orderPage, /ARTWORK_SPECS\.map/);
  assert.match(orderPage, /Front cover.*120 × 120 mm.*1417 × 1417 px/);
  assert.match(orderPage, /Back cover.*150 × 118 mm.*1772 × 1394 px/);
  assert.match(orderPage, /Disc print.*120 × 120 mm.*1417 × 1417 px/);
});

test('front, back and disc previews require explicit print approval', () => {
  assert.match(orderPage, /alt={`\$\{spec\.title\} preview`}/);
  assert.match(orderPage, /name="artworkPrintConfirmed" required/);
  assert.match(orderPage, /approve it for printing exactly as supplied/);
  assert.match(orderApi, /!data\.artworkPrintConfirmed/);
});

test('any artwork upload failure retains the form and reveals Canva fallback', () => {
  assert.match(orderPage, /setArtworkUploadFailed\(true\)/);
  assert.match(orderPage, /Your details are still here/);
  assert.match(orderPage, /useCanvaFallback \?/);
  assert.match(orderPage, /OPEN OUR CANVA TEMPLATE/);
});

test('database migration counts JSON object keys using supported PostgreSQL functions', () => {
  assert.match(migration, /count\(\*\) from jsonb_object_keys\(p_files\)/);
  assert.doesNotMatch(migration, /jsonb_object_length/);
});
