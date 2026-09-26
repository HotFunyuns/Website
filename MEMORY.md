# Project Memory — Reign Creative LLC Website

## Key Files

- [App Data](src/data/apps/index.ts) — Central source for all app info and company details (catalog split under `src/data/apps/catalog/`)
- [Navigation](src/data/navigation.ts) — All navigation links
- [Layout](src/app/layout.tsx) — Root layout with global metadata and SEO
- [Globals CSS](src/app/globals.css) — Design system tokens, glass card styles, gradients
- [Deploy Workflow](.github/workflows/nextjs.yml) — the single GitHub Actions workflow that builds and deploys to Pages (`deploy.yml` was deleted 2026-09-15; two workflows were deploying the same artifact twice per push)
- [app-ads.txt](public/app-ads.txt) — AdMob publisher verification for Protein Diet Tracker (must serve as plain text at `https://reigncreativellc.com/app-ads.txt`, single line: `google.com, pub-4872012511804466, DIRECT, f08c47fec0942fa0`). Do not wrap in HTML, do not move out of `/public`.

## Architecture

- Next.js 14 App Router with `output: 'export'` (fully static)
- TypeScript strict mode
- Tailwind CSS 3 with custom brand colors and animation keyframes
- Framer Motion for scroll reveals and interactions
- Contact form uses `mailto:` — no backend, no stored data

## Pages

Home (`/`), About (`/about/`), Apps (`/apps/`), Blog (`/blog/`, categories, topic hubs, 525 articles), Author (`/authors/reign-creative-llc/`), Editorial Policy (`/editorial-policy/`), Press (`/press/`), Support (`/support/`), Privacy (`/privacy/`), Terms (`/terms/`), Developer Info (`/app-support/`), 404

## Publishing articles

New articles go through the approval-gated daily queue — never set `status: published` by hand without `editorialApproved: true`. See `docs/publishing-workflow.md`. Bylines come from `src/data/authors.ts`.

## How to Update

- **Add/edit apps**: `src/data/apps.ts`
- **Change support email or company name**: `companyInfo` in `src/data/apps.ts`
- **Update policies**: edit `src/app/privacy/page.tsx` or `src/app/terms/page.tsx`
- **Add nav links**: `src/data/navigation.ts`
