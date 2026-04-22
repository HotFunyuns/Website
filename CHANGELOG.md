# Changelog

All notable changes to the Reign Creative LLC website are documented here.

## [1.1.0] — 2026-04-22

### Security Hardening

- **Content-Security-Policy (CSP)**: Added comprehensive CSP via meta tag restricting script, style, font, image, connect, frame, object, base-uri, and form-action sources
- **X-Frame-Options**: Set to `DENY` to prevent clickjacking via iframe embedding
- **X-XSS-Protection**: Enabled with `mode=block` for legacy browser XSS filtering
- **Referrer-Policy**: Set to `strict-origin-when-cross-origin` via dedicated meta tag
- **Permissions-Policy**: Expanded to disable camera, microphone, geolocation, payment, USB, magnetometer, gyroscope, and accelerometer APIs
- **HSTS**: Added `Strict-Transport-Security` (2-year max-age, includeSubDomains, preload) in hosting config files
- **Honeypot anti-spam**: Added invisible honeypot field to contact form to catch automated bots
- **Rate limiting**: Added 3-second client-side cooldown between form submissions
- **Enhanced input sanitization**: Contact form now strips `& " ' / \`, `javascript:`, `data:` URIs, and `on*=` event handler patterns in addition to `< >`
- **Source maps disabled**: Set `productionBrowserSourceMaps: false` — no `.map` files in build output
- **Console stripping**: Production builds remove `console.log`/`console.debug` via Next.js compiler
- **Netlify `_headers` file**: Full security header set for Netlify/Cloudflare Pages deployments
- **Vercel `vercel.json`**: Full security header set for Vercel deployments
- **README security docs**: Comprehensive documentation of all security headers, CSP design notes, HTTPS enforcement per platform, npm audit analysis, and ongoing maintenance steps

### Changed

- Removed unused `dompurify` and `isomorphic-dompurify` dependencies (manual sanitization is sufficient and reduces attack surface)
- Renamed `FormData` interface to `ContactFormData` to avoid collision with browser global
- Upgraded Referrer-Policy from `metadata.other` to dedicated `<meta name="referrer">` tag
- Removed empty `headers` function from `next.config.mjs`

## [1.0.0] — 2026-04-22

### Added

- **Home page** with animated hero section, company intro, featured apps grid, and CTA section
- **About page** with company overview, values, and differentiators
- **Apps page** with full portfolio grid, stats summary, and per-app cards
- **Support page** with contact form (mailto-based), support topics, and contact information
- **Privacy Policy page** with comprehensive, editable privacy policy
- **Terms of Service page** with professional terms for app users and site visitors
- **Developer Information page** with company details, app list, and policy links for app store review
- **404 page** with branded design and navigation back to home
- **Responsive design** optimized for mobile, tablet, and desktop
- **Smooth animations** using Framer Motion (scroll reveals, hover effects, page transitions)
- **SEO optimization** with metadata, Open Graph tags, sitemap, and robots.txt
- **Centralized app data** in `src/data/apps.ts` for easy updates
- **GitHub Actions workflow** for automated deployment to GitHub Pages
- **Security hardening**: input validation, sanitization, safe link handling, no stored secrets, minimal dependencies
- **Accessible design**: semantic HTML, proper labels, focus states, readable contrast
- **Custom 404 page** for better user experience
- **SVG favicon** with brand gradient
