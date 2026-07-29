/**
 * Vercel Edge Function — /api/contact
 *
 * Receives the "Start a project" form, validates it server-side,
 * and delivers a formatted enquiry email to info@spiceoflifemedia.com.au
 * via Resend's REST API.
 *
 * Required env vars (set in Vercel dashboard or Replit Secrets):
 *   RESEND_API_KEY        — Resend API key (re_…)
 *
 * Optional env vars:
 *   CONTACT_TO_EMAIL      — recipient (default: info@spiceoflifemedia.com.au)
 *   CONTACT_FROM_EMAIL    — verified sender (default: website@spiceoflifemedia.com.au)
 *                           MUST be on a Resend-verified domain.
 */

export const config = { runtime: 'edge' };

const TO_EMAIL = 'info@spiceoflifemedia.com.au';
const FROM_EMAIL = 'Spice of Life Media <website@spiceoflifemedia.com.au>';

function field(label: string, value: string | undefined): string {
  if (!value?.trim()) return '';
  return `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #e8e4dc;vertical-align:top;">
        <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7a7567;">${label}</span>
      </td>
      <td style="padding:8px 0 8px 20px;border-bottom:1px solid #e8e4dc;font-size:15px;color:#16150f;">${value.replace(/\n/g, '<br>')}</td>
    </tr>`;
}

function buildHtml(d: Record<string, string>): string {
  const services = d['services'] || '—';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Project Enquiry</title></head>
<body style="margin:0;padding:0;background:#f2eee6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2eee6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e0dbd0;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#16150f;padding:32px 40px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#e8451c;">NEW PROJECT ENQUIRY</p>
            <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;color:#f2eee6;letter-spacing:-.02em;">Spice of Life Media</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${field('Name', d['name'])}
              ${field('Email', d['email'])}
              ${field('Business / Company', d['business'])}
              ${field('Current Website', d['url'])}
              ${field('Services Interested In', services)}
              ${field('Budget', d['budget'])}
              ${field('Timing', d['timing'])}
              ${field('What feels disconnected?', d['problem'])}
              ${field('How they heard about us', d['source'])}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f2eee6;padding:24px 40px;border-top:1px solid #e0dbd0;">
            <p style="margin:0;font-size:12px;color:#9e9a91;">
              Submitted via spiceoflifemedia.com.au · Reply directly to this email to respond to ${d['name'] ?? 'the enquirer'}.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildText(d: Record<string, string>): string {
  return [
    'NEW PROJECT ENQUIRY — Spice of Life Media',
    '—'.repeat(40),
    `Name: ${d['name'] ?? '—'}`,
    `Email: ${d['email'] ?? '—'}`,
    `Business: ${d['business'] ?? '—'}`,
    `Website: ${d['url'] ?? '—'}`,
    `Services: ${d['services'] ?? '—'}`,
    `Budget: ${d['budget'] ?? '—'}`,
    `Timing: ${d['timing'] ?? '—'}`,
    '',
    `What feels disconnected?`,
    d['problem'] ?? '—',
    '',
    `How they heard about us: ${d['source'] ?? '—'}`,
  ].join('\n');
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = (process.env['RESEND_API_KEY'] ?? '').trim();
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY not set — form submission dropped');
    return new Response(JSON.stringify({ error: 'Email service not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Parse multipart form data
  let data: Record<string, string> = {};
  try {
    const formData = await req.formData();
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        if (data[key]) {
          // Multiple checkboxes (services) → comma-separated
          data[key] = `${data[key]}, ${value}`;
        } else {
          data[key] = value;
        }
      }
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid form data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Honeypot
  if (data['website_confirm']) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Server-side validation
  if (!data['name'] || !data['email'] || !data['business'] || !data['problem']) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const toEmail = process.env['CONTACT_TO_EMAIL'] ?? TO_EMAIL;
  const fromEmail = process.env['CONTACT_FROM_EMAIL'] ?? FROM_EMAIL;

  const payload = {
    from: fromEmail,
    to: [toEmail],
    reply_to: data['email'],
    subject: `New enquiry from ${data['name']} — ${data['business']}`,
    html: buildHtml(data),
    text: buildText(data),
  };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[contact] Resend error ${res.status}:`, body);
      return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[contact] Network error sending via Resend:', err);
    return new Response(JSON.stringify({ error: 'Network error' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
