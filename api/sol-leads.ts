import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { Resend } from "resend";

const LeadSchema = z.object({
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(4000),
  name: z.string().trim().max(120).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  projectType: z.string().trim().max(120).optional().default(""),
});

type Lead = z.infer<typeof LeadSchema>;

const RECENT_WINDOW_MS = 24 * 60 * 60 * 1000;
const recentEmails = new Map<string, number>();

function isDuplicate(email: string): boolean {
  const now = Date.now();
  for (const [key, ts] of recentEmails) {
    if (now - ts > RECENT_WINDOW_MS) recentEmails.delete(key);
  }
  const last = recentEmails.get(email);
  if (last && now - last < RECENT_WINDOW_MS) return true;
  recentEmails.set(email, now);
  return false;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(lead: Lead): string {
  const rows: Array<[string, string]> = [
    ["Email", lead.email],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Project type", lead.projectType],
    ["Message", lead.message],
  ].filter(([, v]) => v && v.length > 0) as Array<[string, string]>;

  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 14px;border-bottom:1px solid #e6e6e6;color:#555;font-weight:600;white-space:nowrap;vertical-align:top;">${escapeHtml(
          k,
        )}</td><td style="padding:8px 14px;border-bottom:1px solid #e6e6e6;color:#111;white-space:pre-wrap;">${escapeHtml(
          v,
        )}</td></tr>`,
    )
    .join("");

  const headlineLeft = lead.projectType || "New Enquiry";
  const headlineRight = lead.name || lead.email;

  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#f5f3ee;padding:24px;color:#111;">
  <table style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e6e6;border-radius:6px;overflow:hidden;border-collapse:collapse;width:100%;">
    <tr><td style="padding:20px 24px;background:#1F2433;color:#F5F3EE;">
      <div style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#C8A96A;margin-bottom:6px;">New Studio Enquiry</div>
      <div style="font-size:20px;font-weight:600;">${escapeHtml(headlineLeft)} — ${escapeHtml(headlineRight)}</div>
    </td></tr>
    <tr><td style="padding:0;"><table style="width:100%;border-collapse:collapse;">${body}</table></td></tr>
    <tr><td style="padding:14px 24px;background:#fafaf7;font-size:12px;color:#777;">Submitted from spiceoflifemedia.com.au</td></tr>
  </table>
</body></html>`;
}

function buildText(lead: Lead): string {
  const lines: string[] = [
    `New Studio Enquiry`,
    ``,
    `Email: ${lead.email}`,
  ];
  if (lead.name) lines.push(`Name: ${lead.name}`);
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.projectType) lines.push(`Project type: ${lead.projectType}`);
  lines.push(``, `Message:`, lead.message);
  return lines.join("\n");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = LeadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid submission",
      details: parsed.error.flatten().fieldErrors,
    });
  }
  const lead = parsed.data;

  if (isDuplicate(lead.email.toLowerCase())) {
    return res.status(200).json({ ok: true, deduped: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.SOL_LEAD_TO_EMAIL || "info@spiceoflifemedia.com.au";
  const fromEmail = process.env.SOL_LEAD_FROM_EMAIL || "Spice Of Life Media <leads@spiceoflifemedia.com.au>";

  if (!apiKey) {
    console.error("[sol-leads] RESEND_API_KEY not set — lead received but email not sent", {
      email: lead.email,
      projectType: lead.projectType,
    });
    return res.status(202).json({
      ok: true,
      warning: "Lead received but email delivery is not configured yet.",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const subjectPart = lead.projectType || lead.name || lead.email;
    const sent = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: lead.email,
      subject: `Studio enquiry: ${subjectPart}`,
      html: buildHtml(lead),
      text: buildText(lead),
    });
    if (sent.error) {
      console.error("[sol-leads] Resend error", sent.error);
      return res.status(502).json({ error: "Email delivery failed" });
    }
    return res.status(200).json({ ok: true, id: sent.data?.id });
  } catch (err) {
    console.error("[sol-leads] unexpected error", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
