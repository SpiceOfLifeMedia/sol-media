import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { Resend } from "resend";

const LeadSchema = z.object({
  services: z
    .array(
      z.enum(["Brand", "Web", "Content", "Growth", "Connected programme"]),
    )
    .min(1)
    .max(5),
  website: z.string().trim().max(240).optional().default(""),
  projectGoal: z.string().trim().min(20).max(3000),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
  companyWebsite: z.string().max(0).optional().default(""),
});

type Lead = z.infer<typeof LeadSchema>;

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
    ["Capabilities", lead.services.join(", ")],
    ["Current website", lead.website],
    ["Project goal", lead.projectGoal],
    ["Email", lead.email],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Timing", lead.timeline],
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

  const headlineLeft = lead.services.join(" + ");
  const headlineRight = lead.name;

  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#F2EEE6;padding:24px;color:#16150F;">
  <table style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e6e6;border-radius:6px;overflow:hidden;border-collapse:collapse;width:100%;">
    <tr><td style="padding:20px 24px;background:#16150F;color:#F2EEE6;">
      <div style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#C0442A;margin-bottom:6px;">New Studio Enquiry</div>
      <div style="font-size:20px;font-weight:600;">${escapeHtml(headlineLeft)} — ${escapeHtml(headlineRight)}</div>
    </td></tr>
    <tr><td style="padding:0;"><table style="width:100%;border-collapse:collapse;">${body}</table></td></tr>
    <tr><td style="padding:14px 24px;background:#fafaf7;font-size:12px;color:#777;">Submitted from www.spiceoflifemedia.com.au</td></tr>
  </table>
</body></html>`;
}

function buildText(lead: Lead): string {
  const lines: string[] = [
    `New Spice of Life Media Enquiry`,
    ``,
    `Capabilities: ${lead.services.join(", ")}`,
    `Current website: ${lead.website || "Not supplied"}`,
    ``,
    `What needs to change:`,
    lead.projectGoal,
    ``,
    `Email: ${lead.email}`,
    `Name: ${lead.name}`,
  ];
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.timeline) lines.push(`Timing: ${lead.timeline}`);
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

  if (lead.companyWebsite) {
    return res.status(200).json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.SOL_LEAD_TO_EMAIL || "info@spiceoflifemedia.com.au";
  const fromEmail =
    process.env.SOL_LEAD_FROM_EMAIL ||
    "Spice of Life Media <leads@spiceoflifemedia.com.au>";

  if (!apiKey) {
    console.error("[sol-leads] RESEND_API_KEY not set — refusing to report a false success", {
      email: lead.email,
      services: lead.services,
    });
    return res.status(503).json({
      error: "Email delivery is not configured.",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const subjectPart = `${lead.services.join(" + ")} — ${lead.name}`;
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
