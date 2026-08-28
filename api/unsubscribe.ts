/** Vercel Edge Function — /api/unsubscribe */

export const config = { runtime: 'edge' };

type UnsubscribeResult = { email_id: string | null };

function page(title: string, copy: string, status = 200): Response {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body style="margin:0;background:#f2eee6;color:#16150f;font-family:Arial,sans-serif"><main style="max-width:620px;margin:8vh auto;padding:32px"><div style="background:#16150f;color:#f2eee6;padding:32px"><div style="color:#e8451c;font-size:12px;font-weight:700;letter-spacing:.16em">SPICE OF LIFE MEDIA</div><h1 style="font-size:40px;margin:12px 0">${title}</h1><p style="font-size:17px;line-height:1.6;color:#d8d3ca">${copy}</p></div></main></body></html>`, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
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
  if (!response.ok) throw new Error(`supabase_${response.status}`);
  return await response.json() as T;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') return page('That link did not work.', 'Please contact info@spiceoflifemedia.com.au for help.', 405);

  const token = new URL(req.url).searchParams.get('token')?.trim() ?? '';
  if (!/^[0-9a-f]{64}$/i.test(token)) return page('That link did not work.', 'Please contact info@spiceoflifemedia.com.au for help.', 400);

  const supabaseUrl = (process.env['SUPABASE_URL'] ?? '').trim();
  const supabaseSecret = (process.env['SUPABASE_SECRET_KEY'] ?? '').trim();
  const resendApiKey = (process.env['RESEND_API_KEY'] ?? '').trim();
  if (!supabaseUrl || !supabaseSecret || !resendApiKey) return page('Please try again.', 'We could not update your preference just now.', 503);

  try {
    const result = await supabaseRpc<UnsubscribeResult[]>(supabaseUrl, supabaseSecret, 'unsubscribe_custom_cd_followup', {
      p_unsubscribe_token_hash: await sha256Hex(token),
    });
    const emailId = result[0]?.email_id;
    if (emailId) {
      await fetch(`https://api.resend.com/emails/${encodeURIComponent(emailId)}/cancel`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
      }).catch(() => undefined);
    }
    return page('You are unsubscribed.', 'The Spice of Life Media follow-up offer has been cancelled.');
  } catch {
    return page('Please try again.', 'We could not update your preference just now.', 503);
  }
}
