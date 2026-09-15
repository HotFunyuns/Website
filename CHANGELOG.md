# Changelog

All notable changes to the Reign Creative LLC website are documented here.

## [1.2.0] — 2026-09-15

### Search Console canonical fix + 100 new articles

**Root cause of the 12 `Duplicate without user-selected canonical` exclusions.** `output: 'export'`
writes an RSC flight payload at `out/<route>/index.txt` beside every page. GitHub Pages served all
239 at HTTP 200 `text/plain` containing each page's full prose. A `text/plain` response cannot carry
`<link rel="canonical">`, so each was a duplicate URL with no canonical — exactly what that Search
Console bucket means. Confirmed live, and the discovery path was traced in Next's own router chunk
(`pathname += "index.txt"` + `?_rsc=`, then `fetch()`).

- **`scripts/postbuild-normalize-urls.mjs` (new)**: deletes every `out/**/index.txt` and the
  `out/404/` soft-404 directory, keeping `out/404.html` (GitHub Pages' real 404 handler). Wired into
  both `npm run build` and the deploy workflow. Verified in a driven browser that client-side
  navigation, Back and Forward still work — the router falls back to a normal page load.
- **`/apps/82-0-pro-basketball-draft/`**: shipped `og:url` pointing at the homepage while its
  canonical pointed at the renamed app. Fixed with an explicit `openGraph.url`.
- **`.github/workflows/deploy.yml` deleted.** It and `nextjs.yml` both deployed the same artifact on
  every push, and pinned different `deploy-pages` versions.
- **`public/_headers` deleted.** Netlify syntax, inert on this host, and itself served at
  `/_headers` as a crawlable 200 advertising headers nobody sends.
- **Category hubs de-duplicated**: `/blog/category/<id>/` and `/apps/category/<id>/` rendered an
  identical `<h1>` and blurb, making the article hub a ~98% text subset of the app hub. The blog hub
  now has its own heading and intro, and the app hub shows 6 article cards instead of the full list.
- **New audit gates**: `audit-canonicals`, `audit-redirects`, `audit-duplicate-content`,
  `audit-back-navigation`, `validate-sitemap-rss`. The back-navigation audit guards the
  `location.replace()` fix that keeps the retired app URL out of session history.

### Content — 175 → 275 articles

- **100 new articles**, all published, each with a unique primary keyword, 2–5 internal article
  links, a category link, an app link, 3+ FAQs and 3+ takeaways. Median length 1,171 words (was 928).
- **53 of the 100 cover the 9 newly verified apps that had no coverage at all.**
- **400 unique source URLs, every one verified reachable.** Several planned sources were rejected
  rather than cited: Timeline Eons' listing 404s, CGC's pricing path 404s, Beckett redirects to a
  maintenance page, and the ITF rules pages return 200 but serve a stub instead of the document.

### App catalog — 29 → 39 apps

- 10 apps added, each verified against its live signed-out Google Play listing.
- 2 renamed: **Space Galaxy Attack Arcade** and **Pro Football GM Club Soccer**.
- The soccer rename removed the "38-0-0" framing from the store listing, so the 38-game claim was
  stripped from 12 existing articles. Real-football references to a 20-team league playing 38
  matches were kept — those are independently true.
- *BIG JACKPOT Casino Slots Games* excluded as **UNVERIFIED** (22 candidate package IDs probed, all
  404); it is not marked "not published", because a Play-search miss does not prove absence.

### Homepage

- Hero floating icons replaced with 8 verified Production apps, CSS-only animation, explicit
  dimensions for zero layout shift, `prefers-reduced-motion` honoured and animation paused when the
  tab is hidden.

### Performance

- **`/blog/` was 2.65 MB**: `BlogExplorer` is a client component and was being handed full
  `BlogPost` objects, serialising every article body into the page. Narrowed to a card-shaped
  projection — 510 KB at 275 articles, where the old shape would have been roughly 4 MB.
- `getRelatedPosts` raised from 3 to 6: 126 articles declared a 4th related article that was
  authored, build-validated, and then silently discarded.

### Documentation accuracy

- **README's security section was materially false.** It claimed a "comprehensive set of security
  headers" was live. Production sends **none** — verified with `curl -I`. It also claimed
  `X-Frame-Options` and `X-Content-Type-Options` work as meta tags; they do not, so there is
  currently no clickjacking protection. Rewritten to state what is actually served.
- `Organization` schema gained `alternateName: "Reign Collective Apps"` — the real Play developer
  name, previously unlinked to the legal entity.

### Known, not fixed here (owner action)

- **GitHub Pages "Enforce HTTPS" is OFF.** `http://reigncreativellc.com/` returns 200 with an
  identical ETag rather than upgrading, so every page exists on two schemes. No code can change this.
- Real HTTP security headers require a host that sends them (Cloudflare/Netlify/Vercel).

## [1.1.3] — 2026-06-02

### Privacy Policy — Data Retention Compliance Fix (Keto Tracker rejection)

Google Play rejected Keto Tracker because the hosted privacy policy did not state how user data is retained. Updated `src/app/privacy/page.tsx`:

- **Data Retention (new section 5)**: Added immediately after "Data Storage & Security" with specific retention periods, including up to **24 months** for support records. Renumbered later sections (Data Sharing → 6, Children's Privacy → 9, Your Rights → 10, Changes → 11, Contact Us → 12)
- **Data Deletion Requests (new section 7)**: Email `ReignCreativeSupport@gmail.com` to request deletion; local data removed by deleting entries, clearing app storage, or uninstalling; clarified apps require no account creation
- **Health & Wellness Disclaimer (new section 8)**: Apps are for general wellness/educational use only, not medical advice; advises consulting a healthcare professional before keto/fasting/major diet changes
- **Advertising Identifier (Ad ID)**: New subsection describing AdMob use of the advertising identifier (ads, personalization where enabled, frequency capping, fraud prevention, performance measurement)
- **On-Device App Data (Local Only)**: New subsection clarifying diet/keto entries, macros, weight/progress, reminders, streaks, and settings are stored locally and not transmitted to our servers — no cloud sync, no server-side accounts
- **RevenueCat/subscriptions**: Removed standalone RevenueCat references and the RevenueCat privacy-policy link, and removed affirmative subscription claims (not used by current apps); billing/subscription language is now conditional
- **Last Updated**: Bumped to June 2, 2026

## [1.1.2] — 2026-05-19

### AdMob — app-ads.txt Verification

- **app-ads.txt**: Added `public/app-ads.txt` so AdMob can verify Protein Diet Tracker's publisher relationship. Served from the site root at `https://reigncreativellc.com/app-ads.txt` as plain text with the single line `google.com, pub-4872012511804466, DIRECT, f08c47fec0942fa0`. Required because the Google Play Console developer website for Protein Diet Tracker points to `https://reigncreativellc.com` and AdMob was reporting "could not find app-ads.txt" for that publisher ID.

## [1.1.1] — 2026-04-29

### Privacy Policy — Google Play Compliance

- **Automatically Collected Information**: Disclosed collection of device identifiers and advertising identifiers used for analytics, app functionality, and ad personalization
- **Third-Party Services**: Replaced generic third-party language with explicit disclosures for Google AdMob, Google Play Services, Google Play Billing, and RevenueCat, including links to the Google and RevenueCat privacy policies
- **Data Sharing**: Added disclosure that limited data may be shared with Google AdMob (advertising), Google Play Billing (payment processing), and RevenueCat (purchase verification and subscription management)
- **Last Updated**: Bumped to April 29, 2026

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
