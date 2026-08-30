/** Vercel Edge Function — /api/artwork-upload */

export const config = { runtime: 'edge' };

const BUCKET = 'custom-cd-artwork';
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const SLOTS = ['front', 'back', 'disc'] as const;
const MIME_EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'application/pdf': 'pdf',
};

type ArtworkSlot = typeof SLOTS[number];
type FileRequest = { slot: ArtworkSlot; name: string; type: string; size: number };

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function stringValue(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

async function fingerprint(req: Request, salt: string): Promise<string> {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim().slice(0, 64) || 'unknown';
  const bytes = new TextEncoder().encode(`${salt}:${forwarded}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function supabaseRpc(url: string, secret: string, name: string, body: unknown): Promise<void> {
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: secret, Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const detail = await response.text();
    if (detail.includes('rate_limit_exceeded')) throw new Error('rate_limit_exceeded');
    if (detail.includes('upload_session_conflict')) throw new Error('upload_session_conflict');
    throw new Error(`supabase_${response.status}`);
  }
}

async function signedUploadUrl(
  supabaseUrl: string,
  secret: string,
  path: string,
): Promise<string> {
  const base = supabaseUrl.replace(/\/$/, '');
  const response = await fetch(
    `${base}/storage/v1/object/upload/sign/${BUCKET}/${path.split('/').map(encodeURIComponent).join('/')}`,
    {
      method: 'POST',
      headers: {
        apikey: secret,
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
        'x-upsert': 'true',
      },
      body: '{}',
    },
  );
  if (!response.ok) throw new Error(`storage_sign_${response.status}`);
  const result = await response.json() as { url?: string };
  if (!result.url) throw new Error('storage_sign_missing_url');
  return result.url.startsWith('http') ? result.url : `${base}/storage/v1${result.url}`;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  let raw: Record<string, unknown>;
  try {
    raw = await req.json() as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid upload request.' }, 400);
  }

  const idempotencyKey = stringValue(raw.idempotencyKey, 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idempotencyKey)) {
    return json({ error: 'Refresh the page and try again.' }, 422);
  }

  if (!Array.isArray(raw.files) || raw.files.length !== SLOTS.length) {
    return json({ error: 'Upload a front, back and disc artwork file.' }, 422);
  }

  const files: FileRequest[] = [];
  const seen = new Set<string>();
  for (const item of raw.files) {
    if (!item || typeof item !== 'object') return json({ error: 'Invalid artwork file.' }, 422);
    const value = item as Record<string, unknown>;
    const slot = stringValue(value.slot, 12) as ArtworkSlot;
    const name = stringValue(value.name, 180);
    const type = stringValue(value.type, 80).toLowerCase();
    const size = typeof value.size === 'number' ? Math.floor(value.size) : 0;
    if (!SLOTS.includes(slot) || seen.has(slot) || !name || !MIME_EXTENSIONS[type] || size <= 0 || size > MAX_FILE_SIZE) {
      return json({ error: 'Each artwork file must be a PNG, JPG or PDF no larger than 20 MB.' }, 422);
    }
    seen.add(slot);
    files.push({ slot, name, type, size });
  }

  const supabaseUrl = (process.env['SUPABASE_URL'] ?? '').trim();
  const supabaseSecret = (process.env['SUPABASE_SECRET_KEY'] ?? '').trim();
  const rateLimitSalt = (process.env['ORDER_RATE_LIMIT_SALT'] ?? '').trim();
  if (!supabaseUrl || !supabaseSecret || !rateLimitSalt) {
    console.error('[artwork-upload] Required server configuration is missing');
    return json({ error: 'The artwork upload service is not configured yet.' }, 503);
  }

  const fileMap = Object.fromEntries(files.map((file) => {
    const path = `incoming/${idempotencyKey}/${file.slot}.${MIME_EXTENSIONS[file.type]}`;
    return [file.slot, { path, name: file.name, type: file.type, size: file.size }];
  }));

  try {
    await supabaseRpc(supabaseUrl, supabaseSecret, 'prepare_custom_cd_artwork_upload', {
      p_idempotency_key: idempotencyKey,
      p_fingerprint: await fingerprint(req, rateLimitSalt),
      p_files: fileMap,
    });
    const uploads = await Promise.all(files.map(async (file) => {
      const metadata = fileMap[file.slot] as { path: string };
      return { slot: file.slot, path: metadata.path, signedUrl: await signedUploadUrl(supabaseUrl, supabaseSecret, metadata.path) };
    }));
    return json({ uploads });
  } catch (error) {
    if (error instanceof Error && error.message === 'rate_limit_exceeded') {
      return json({ error: 'Too many upload attempts. Please try again in an hour.' }, 429);
    }
    if (error instanceof Error && error.message === 'upload_session_conflict') {
      return json({ error: 'Your selected files changed. Refresh the page and upload them again.' }, 409);
    }
    console.error('[artwork-upload] Could not prepare private uploads');
    return json({ error: 'We could not prepare your artwork uploads. Please try again.' }, 502);
  }
}
