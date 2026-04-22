# Project Memory — Reign Creative LLC Website

## Key Files

- [App Data](src/data/apps.ts) — Central source for all app info and company details
- [Navigation](src/data/navigation.ts) — All navigation links
- [Layout](src/app/layout.tsx) — Root layout with global metadata and SEO
- [Globals CSS](src/app/globals.css) — Design system tokens, glass card styles, gradients
- [Deploy Workflow](.github/workflows/deploy.yml) — GitHub Actions auto-deploy to Pages

## Architecture

- Next.js 14 App Router with `output: 'export'` (fully static)
- TypeScript strict mode
- Tailwind CSS 3 with custom brand colors and animation keyframes
- Framer Motion for scroll reveals and interactions
- Contact form uses `mailto:` — no backend, no stored data

## Pages

Home (`/`), About (`/about/`), Apps (`/apps/`), Support (`/support/`), Privacy (`/privacy/`), Terms (`/terms/`), Developer Info (`/app-support/`), 404

## How to Update

- **Add/edit apps**: `src/data/apps.ts`
- **Change support email or company name**: `companyInfo` in `src/data/apps.ts`
- **Update policies**: edit `src/app/privacy/page.tsx` or `src/app/terms/page.tsx`
- **Add nav links**: `src/data/navigation.ts`
