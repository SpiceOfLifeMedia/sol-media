# Spice Of Life Media

Premium website studio for Australian businesses — marketing site.

Adelaide-built. Vite + React + Tailwind v4 + Framer Motion. Static frontend with one Vercel serverless function for lead-form email delivery.

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
- `SOL_LEAD_FROM_EMAIL` — verified sender. Defaults to `Spice Of Life Media <leads@spiceoflifemedia.com.au>` if unset. **Must be on a domain you have verified in Resend.**

Until `RESEND_API_KEY` is set the function still returns success to the user, logs the lead to Vercel function logs, and skips the email send — so the form never appears broken to a visitor.

## Source of truth

This repo is the standalone deploy mirror of `artifacts/sol-media/` in the private `SpiceOfLifeMedia/artifacts-monorepo` workspace. Edits happen in the monorepo first, then are mirrored here for deploy.
