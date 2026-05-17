# Spice Of Life Media

Premium website studio for Australian businesses — marketing site.

Adelaide-built. Vite + React + Tailwind v4 + Framer Motion. No backend, no database.

## Local dev

```bash
npm install
npm run dev
```

## Production

Auto-deployed to Vercel from `main`. The Vite build outputs to `dist/` and Vercel rewrites all non-asset routes to `index.html` for the single-page app.

## Source of truth

This repo is the standalone deploy mirror of `artifacts/sol-media/` in the private `SpiceOfLifeMedia/artifacts-monorepo` workspace. Edits happen in the monorepo first, then are mirrored here for deploy.
