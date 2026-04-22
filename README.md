# Reign Creative LLC — Official Website

The official company website for **Reign Creative LLC**, a mobile app development studio. Built with Next.js, TypeScript, and Tailwind CSS. Designed to establish company identity, showcase apps, and provide support information for app store publishing.

**Live domain:** [reigncreativellc.com](https://reigncreativellc.com)

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: 20 LTS)
- npm (included with Node.js)

### Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static output is generated in the `out/` directory, ready to deploy to any static hosting provider.

---

## Site Structure

| Page | Path | Purpose |
|------|------|---------|
| Home | `/` | Hero, company intro, featured apps, CTA |
| About | `/about/` | Company overview, values, what sets us apart |
| Apps | `/apps/` | Full app portfolio with cards and stats |
| Support | `/support/` | Contact form, support topics, contact info |
| Privacy Policy | `/privacy/` | Privacy policy for apps and website |
| Terms of Service | `/terms/` | Terms for app users and site visitors |
| Developer Info | `/app-support/` | Company details, app list, policies (for app store review) |

---

## How to Update Content

### Apps

Edit `src/data/apps.ts` — all app cards are generated from this single file:

```typescript
{
  id: 'my-new-app',
  name: 'My New App',
  description: 'A short professional description.',
  category: 'Productivity',
  status: 'Published',        // 'Published' | 'In Development' | 'Coming Soon'
  icon: '🚀',
  gradient: 'from-blue-500 to-cyan-600',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=...',  // optional
}
```

### Company Info & Support Email

Edit `src/data/apps.ts` — the `companyInfo` object at the bottom:

```typescript
export const companyInfo = {
  name: 'Reign Creative LLC',
  supportEmail: 'ReignCreativeSupport@gmail.com',
  domain: 'reigncreativellc.com',
  // ...
};
```

### Navigation Links

Edit `src/data/navigation.ts` to add or modify nav links.

### Privacy Policy & Terms

Edit the page files directly:
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`

Update the `lastUpdated` variable when making changes.

---

## Deployment

### Option 1: GitHub Pages (Recommended)

1. Create a GitHub repository (e.g., `reign-creative-website`)
2. Push the code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/reign-creative-website.git
git push -u origin main
```

3. In GitHub repo settings → **Pages** → Source: select **GitHub Actions**
4. The included `.github/workflows/deploy.yml` will automatically build and deploy on every push to `main`

### Option 2: Vercel

```bash
npx vercel --prod
```

### Option 3: Netlify

Upload the `out/` directory after running `npm run build`, or connect the GitHub repo and set build command to `npm run build` with publish directory `out`.

---

## Connect GoDaddy Domain (reigncreativellc.com)

### For GitHub Pages

1. In your GitHub repo → **Settings** → **Pages** → **Custom domain**: enter `reigncreativellc.com`
2. In GoDaddy DNS settings, add these records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

3. Wait for DNS propagation (up to 24–48 hours)
4. Enable **Enforce HTTPS** in GitHub Pages settings once the certificate is provisioned

### For Vercel

1. Add the domain in the Vercel dashboard under **Project Settings → Domains**
2. In GoDaddy, update the nameservers to the ones Vercel provides, or add the CNAME/A records shown in the Vercel dashboard

### For Netlify

1. Add the domain under **Domain management** in Netlify
2. Follow GoDaddy DNS instructions shown by Netlify

---

## Security

### Security Headers

The site implements a comprehensive set of security headers via **both** HTML meta tags (built into every page) and hosting-platform config files:

| Header | Value | Purpose |
|--------|-------|---------|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' fonts.gstatic.com fonts.googleapis.com; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' mailto:;` | Restricts script, style, font, and asset sources; blocks iframes and object embeds |
| X-Frame-Options | `DENY` | Prevents the site from being embedded in iframes (clickjacking protection) |
| X-Content-Type-Options | `nosniff` | Prevents MIME-type sniffing attacks |
| X-XSS-Protection | `1; mode=block` | Legacy XSS filter for older browsers |
| Referrer-Policy | `strict-origin-when-cross-origin` | Controls how much referrer info is sent |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()` | Disables unnecessary browser APIs |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS (in `_headers`/`vercel.json` — requires HTTP header, not meta tag) |

**Meta tags** are set in `src/app/layout.tsx` and are baked into every generated HTML file.

**HTTP headers** are configured in:
- `public/_headers` — for Netlify and Cloudflare Pages
- `vercel.json` — for Vercel

**Note on GitHub Pages:** GitHub Pages does not support custom HTTP headers. The meta tag CSP, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, and Referrer-Policy all work via meta tags. HSTS is handled by GitHub Pages automatically when "Enforce HTTPS" is enabled. For full header control, consider deploying behind Cloudflare (free tier) which allows custom response headers via Transform Rules.

### CSP Design Notes

- `script-src 'unsafe-inline'` is required because Next.js static export injects inline `<script>` tags for page data hydration. This is standard for all Next.js static sites.
- `style-src 'unsafe-inline'` is required because Framer Motion applies inline styles for animations, and Tailwind may generate inline critical CSS.
- `frame-src 'none'` and `object-src 'none'` block all embedded content (iframes, plugins, Flash).
- `form-action 'self' mailto:` restricts forms to same-origin and mailto links only.
- No `unsafe-eval` is used anywhere.

### Architecture Decisions

- **No backend / no API keys**: Fully static site with zero server-side code. The contact form opens the user's email client via `mailto:` — no form data is transmitted to or stored on any server.
- **Input sanitization**: All contact form fields are validated and sanitized before use: length limits, HTML/script tag stripping (`<>&"'/\`, `javascript:`, `data:`, `on*=` patterns), RFC-compliant email validation.
- **Honeypot anti-spam**: A hidden form field catches automated bots. It is invisible to real users (positioned off-screen, `aria-hidden`, `tabIndex={-1}`) but bots that fill all fields are silently rejected.
- **Rate limiting**: Client-side cooldown prevents rapid repeated form submissions (3-second minimum between submits).
- **Safe external links**: Every `<a>` tag pointing to an external URL or `mailto:` uses `rel="noopener noreferrer"`. The only `target="_blank"` link (Google Play store) also has this attribute.
- **No inline scripts authored**: All JavaScript is in external `.js` chunk files loaded by Next.js. No custom `<script>` tags, `eval()`, `Function()`, `innerHTML`, or `dangerouslySetInnerHTML` are used anywhere in the codebase.
- **No source maps in production**: `productionBrowserSourceMaps: false` in `next.config.mjs` ensures no `.map` files are generated. Internal file structure is not exposed in the build output.
- **Console stripping**: `console.log` and `console.debug` calls are removed from production builds via the Next.js compiler. Only `console.error` and `console.warn` are preserved for debugging.
- **No secrets in source**: No API keys, tokens, or credentials exist anywhere in the codebase. The `.gitignore` excludes `.env` and all `.env*.local` files. The `supportEmail` is intentionally public.
- **Minimal dependencies**: Only 4 runtime packages: Next.js, React, React-DOM, Framer Motion. No unnecessary third-party libraries. Attack surface is minimized.
- **Strict TypeScript**: TypeScript strict mode catches type errors at build time.
- **React strict mode**: Enabled to detect potential issues in development.
- **All buttons have explicit `type` attributes**: `type="button"` or `type="submit"` — preventing accidental form submissions.
- **Powered-by header disabled**: `poweredByHeader: false` in Next.js config prevents exposing the framework version.

### HTTPS Enforcement

- **GitHub Pages**: Go to repo → Settings → Pages → check "Enforce HTTPS". GitHub automatically provisions a Let's Encrypt certificate for custom domains.
- **Vercel**: HTTPS is enabled by default with automatic certificate provisioning.
- **Netlify**: HTTPS is enabled by default. Use Settings → Domain management → HTTPS to verify.
- **Cloudflare**: Set SSL/TLS mode to "Full (strict)" and enable "Always Use HTTPS" under SSL/TLS → Edge Certificates.

The `Strict-Transport-Security` header (HSTS) is configured in `_headers` and `vercel.json` with a 2-year max-age and preload flag. This tells browsers to always use HTTPS for this domain after the first visit.

### npm Audit Status

The remaining `npm audit` findings are:
- **Next.js 14.x server-side vulnerabilities** (DoS via Image Optimizer, HTTP request smuggling, Server Components issues) — these are server-only vulnerabilities that **do not affect static exports**. The site has no server, no API routes, and no runtime Node.js process.
- **glob CLI command injection** — only exists in the ESLint dev tooling chain, never runs in production or in the browser.

These are false positives for this deployment model. The site ships only static HTML, CSS, and JS files.

### Keeping the Site Secure

1. **Update dependencies regularly**: Run `npm audit` and `npm update` periodically
2. **Review before deploying**: Check `git diff` before pushing to ensure nothing sensitive was added
3. **Never commit `.env` files**: The `.gitignore` excludes all env files. If you ever need environment variables, use your hosting provider's dashboard
4. **Monitor dependency vulnerabilities**: Run `npm audit` after installing new packages
5. **Keep Node.js updated**: Use the latest LTS version
6. **Review CSP if adding third-party scripts**: If you add analytics, chat widgets, or other third-party JS, update the CSP in both `src/app/layout.tsx` and the hosting config files (`_headers`, `vercel.json`)
7. **Check headers after deployment**: Use [securityheaders.com](https://securityheaders.com) to verify your deployed headers are working correctly

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with static export |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |

---

## Project Structure

```
├── .github/workflows/    GitHub Actions deploy workflow
├── public/               Static assets (favicon, robots.txt)
├── src/
│   ├── app/              Next.js App Router pages
│   │   ├── about/
│   │   ├── apps/
│   │   ├── app-support/
│   │   ├── privacy/
│   │   ├── support/
│   │   ├── terms/
│   │   ├── globals.css
│   │   ├── layout.tsx    Root layout with metadata
│   │   ├── not-found.tsx 404 page
│   │   ├── page.tsx      Home page
│   │   └── sitemap.ts    Auto-generated sitemap
│   ├── components/       Reusable UI components
│   └── data/             Centralized data (apps, navigation)
├── CHANGELOG.md
├── README.md
└── package.json
```

---

## License

All rights reserved. &copy; Reign Creative LLC.
