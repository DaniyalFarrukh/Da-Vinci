# da Vinci Dental Works

Next.js App Router website for **da Vinci Dental Works**, built with TypeScript, Tailwind CSS v4, `next/image`, `next/font/google`, and Playwright verification scripts.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build and run in production mode:
   ```bash
   npm run build
   npm run start
   ```

## Environment Variables

See `.env.example`:

- `RESEND_API_KEY` — Resend API key used by `POST /api/consult`
- `CONSULT_FROM_EMAIL` — Verified sender email address in Resend
- `CONSULT_TO_EMAIL` — Clinic inbox that receives consultation requests

## Scripts

- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run typecheck` — Run `tsc --noEmit`
- `npm run optimize:images` — Convert source images in `Photos/` to WebP/AVIF in `public/images/`
- `npm run screenshots` — Capture Playwright screenshots across device profiles

## Deployment (GitHub + Vercel)

1. Push this repository to a private GitHub repository.
2. Import the repository into Vercel (`Framework Preset: Next.js`).
3. Add `RESEND_API_KEY`, `CONSULT_FROM_EMAIL`, and `CONSULT_TO_EMAIL` in Vercel Project Settings → Environment Variables.
4. Deploy to production.
