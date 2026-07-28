# Spice of Life Media

Production website for Spice of Life Media: an Adelaide brand, web, content
and growth agency working internationally.

Built with Vite, React, Tailwind v4 and Framer Motion. The static frontend uses
one Vercel serverless function for enquiry email delivery.

## Local dev

```bash
npm install
npm run dev
```

## Production

Auto-deployed to Vercel from `main`. The Vite build outputs to `dist/` and Vercel rewrites all non-asset routes to `index.html` for the single-page app.

### Lead-form email (Vercel function)

The contact form posts to `/api/sol-leads`, a Vercel serverless function that emails leads to the business via [Resend](https://resend.com).

Required environment variables (set in the Vercel project's **Settings → Environment Variables**):

- `RESEND_API_KEY` — Resend API key (Production + Preview).
- `SOL_LEAD_TO_EMAIL` — where leads are delivered. Defaults to `info@spiceoflifemedia.com.au` if unset.
- `SOL_LEAD_FROM_EMAIL` — verified sender. Defaults to `Spice of Life Media <leads@spiceoflifemedia.com.au>` if unset. **Must be on a domain you have verified in Resend.**

If `RESEND_API_KEY` is missing, the function returns an honest configuration
error and the form directs the visitor to the studio email address.

## Source of truth

This repository is the production source of truth. Merges to `main` trigger the
Vercel production deployment.
