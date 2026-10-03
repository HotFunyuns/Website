# HTTPS, canonical and duplicate-URL report — 2026-10

Measured **2026-10-02**, 21:56–22:15 UTC, against the build of `e72c9a6` in
`out/` and against production (`https://reigncreativellc.com`, which serves that
same commit). Live checks used Node `fetch` with `redirect: 'manual'` and
`cache-control: no-cache`; the scheme rows were repeated with `curl`. Commands
and the full baseline: [expansion-2026-10-baseline.md](./expansion-2026-10-baseline.md).
Earlier audits: [url-normalization-audit.md](./url-normalization-audit.md) and
[search-console-canonical-fix.md](./search-console-canonical-fix.md) (both 2026-09-15).

## Verdict

| Area | State |
| --- | --- |
| **Enforce HTTPS** | **OFF.** `http://` serves full 200 duplicates; owner action |
| HSTS | Not sent on any response |
| Canonicals | Correct everywhere: 599 self-referencing absolute https canonicals, 1 documented alias, 1 intentional none |
| `og:url`, JSON-LD, sitemap, RSS, `llms.txt` | All agree with the canonicals, locally and live |
| RSC `index.txt` payloads | Gone: 0 in `out/`, 404 live (fixed since 2026-09-15) |
| `/404/` soft 404 | Gone: 404 live (fixed since 2026-09-15) |
| Case variants | 404, so no duplicates |
| Tracking parameters | 200, consolidated by the parameterless canonical (host limitation; acceptable) |
| Mixed content | **None** |

## 1. HTTPS enforcement status

| Request | Status | `Location` | Notes |
| --- | --- | --- | --- |
| `http://reigncreativellc.com/` | **200** | — | 162,417 bytes, **byte-identical** (same SHA-1) to the https page |
| `http://reigncreativellc.com/blog/mental-math-training-guide/` | **200** | — | 138,691 bytes, byte-identical to https |
| `http://reigncreativellc.com/sitemap.xml`, `/robots.txt` | **200** | — | Served over http too |
| `http://www.reigncreativellc.com/` (and an article path) | 301 | **`http://reigncreativellc.com/…`** | Redirects to the apex but keeps the insecure scheme |
| `https://www.reigncreativellc.com/` (and an article path) | 301 | `https://reigncreativellc.com/…` | Correct |
| `https://hotfunyuns.github.io/Website/` | 301 | **`http://reigncreativellc.com/`** | GitHub's custom-domain redirect lands on http |
| `http://hotfunyuns.github.io/Website/` | 301 | `http://reigncreativellc.com/` | Same |
| `https://reigncreativellc.com/` | 200 | — | No `Strict-Transport-Security` header |

Across all probes, 16 distinct `http://` page URLs covering every indexable page
type (index, static, app, app category, blog category, topic hub, author,
article) returned **16 / 16 → 200**. Each carried its `https://` canonical.

**No HSTS anywhere.** No `Strict-Transport-Security` header appeared on any of
the 46 targeted probes or on any of the 599 sitemap pages. The full response
header set on `https://reigncreativellc.com/` is: `accept-ranges`,
`access-control-allow-origin`, `age`, `cache-control: max-age=600`, `connection`,
`content-encoding`, `content-length`, `content-type`, `date`, `etag`, `expires`,
`last-modified`, `server: GitHub.com`, `vary`, `via`, `x-cache`, `x-cache-hits`,
`x-fastly-request-id`, `x-github-edge-region`, `x-github-request-id`,
`x-proxy-cache`, `x-served-by` and `x-timer`.

**Preconditions for turning it on are met:**

- The certificate presented for both hostnames is Let's Encrypt, with SAN
  `reigncreativellc.com` and `www.reigncreativellc.com`, valid 2026-08-20 to
  2026-11-18, and the chain is trusted.
- DNS is the standard GitHub Pages setup: apex A records 185.199.108.153,
  .109, .110 and .111; `www` CNAME `hotfunyuns.github.io`.

The Pages settings API (`GET /repos/HotFunyuns/Website/pages`) returns 404
without authentication, so the checkbox itself could not be read. The verdict
rests on behaviour: with Enforce HTTPS on, GitHub redirects http requests to
https, and here it serves 200.

**Verdict: Enforce HTTPS is OFF**, unchanged since 2026-09-15.

**Owner step:** github.com → `HotFunyuns/Website` → **Settings → Pages → tick
"Enforce HTTPS"**. The certificate is already valid for both hostnames, so the
box should be available. If it is not, read GitHub's "Securing your GitHub Pages
site with HTTPS" guidance before touching the custom-domain field.

**Owner-reported, not independently verified:** the Search Console HTTPS report
shows **0 non-HTTPS pages**. That fits what we measured: every `http://` copy
carries an `https://` canonical, so Google indexes the https URL. It does **not**
contradict the verdict above. The report counts which scheme Google *indexed*;
it does not say whether `http://` redirects.

## 2. Scheme and host duplicates

| Variant | Live | Consolidated by | Fixable by |
| --- | --- | --- | --- |
| `https://reigncreativellc.com/<route>/` | 200 | — (canonical form) | — |
| `http://reigncreativellc.com/<route>/` (16 / 16 sampled across all page types) | **200 duplicate** | The https canonical inside the HTML | **Owner: Enforce HTTPS** |
| `https://www.reigncreativellc.com/…` | 301 → https apex | Redirect | Already correct |
| `http://www.reigncreativellc.com/…` | 301 → **http** apex, then a 200 duplicate | Redirect, then canonical | **Owner: Enforce HTTPS** |
| `https://hotfunyuns.github.io/Website/` | 301 → **http** apex | Redirect, then canonical | **Owner: Enforce HTTPS** |

Every internal link is root-relative: 37,055 internal hrefs, none of them an
absolute first-party URL. So a visitor who arrives on `http://` stays on `http://`
for the whole visit. GA4 would record those page views with an `http://`
`page_location`. `isAnalyticsEnabled()` checks only the hostname, and
`trackPageView()` builds the location from `window.location.origin`. This is read
from the code; no GA4 data was available to confirm it. It is another reason for
the owner step.

## 3. Trailing-slash convention

`trailingSlash: true` (`next.config.mjs`) means every page is `/<route>/` and
served from `<route>/index.html`.

- Slashless forms redirect: `/blog` → 301 `/blog/`; `/blog/mental-math-training-guide` →
  301 with a slash; `/apps/protein-diet-tracker` → 301 with a slash. This is
  GitHub Pages' directory redirect.
- All 37,055 internal hrefs end in `/` or a file extension. None is slashless.
- All 600 canonicals, all 601 `og:url` values, every JSON-LD page `url` and
  `mainEntityOfPage`, every breadcrumb `item`, all 599 sitemap `<loc>` and all
  525 RSS links end in `/`.
- `https://reigncreativellc.com//` and `/blog//` return **200** and are
  byte-identical to the single-slash page, with the correct canonical. GitHub
  Pages cannot redirect them, and the canonical consolidates them. Nothing links
  to them.
- `/index.html` and `/blog/mental-math-training-guide/index.html` return 200,
  byte-identical to the slash URL, with the correct canonical. The host offers no
  alternative; nothing links to them (0 internal `index.html` hrefs).

## 4. 404 behaviour

| Request | Live | Notes |
| --- | --- | --- |
| `/does-not-exist/` | **404** | Body byte-identical to `/404.html` (35,377 bytes); a genuine status, not a soft 404. Removed `index.txt` URLs return the same 404 |
| `/404/` | **404** | `out/404/` is deleted by the normaliser. It was a 200 soft 404 before 2026-09-15 |
| `/404.html` | 200 | The handler file itself. `noindex`, no canonical by design, absent from the sitemap, linked from nowhere. Unavoidable on GitHub Pages |
| `/_headers`, `/vercel.json` | 404 | No dead host configuration is published |

Small blemishes on `/404.html`: it emits two robots tags
(`<meta name="robots" content="noindex"/>` and `content="noindex, follow"`), and
it inherits `og:url = https://reigncreativellc.com/` from the root layout while
having no canonical. Both are harmless because the page is `noindex`. See repo
fix R1.

## 5. `index.txt` and RSC artifacts

| Check | Result |
| --- | --- |
| `out/**/index.txt` after `npm run build` | **0**. The build removed 600 payloads (38,456 KB) and `out/404/` |
| Normaliser placement | In `npm run build` (`package.json`) **and** in `.github/workflows/nextjs.yml`. It must stay in both |
| Live, every 5th sitemap URL + `index.txt` | **120 / 120 → 404** |
| Live, specific: `/index.txt`, `/blog/index.txt`, two articles, one app, an article with `?_rsc=abc123`, an article over `http://` | all **404** |
| Live, `/blog/<slug>.txt` (the router's no-slash form) | 404 |
| `verify-live --smoke` sidecar check | 12 / 12 pages' `index.txt` → 404 |
| Gates | The normaliser exits 1 if an `index.txt` survives without a sibling page. `audit-redirects.mjs` fails on any surviving payload, and CI runs it before the artifact upload; it is also in `audit:all` |

The cost is unchanged and documented: internal navigation falls back to full page
loads (see `url-normalization-audit.md`). Do **not** add a `robots.txt`
`Disallow` for these URLs; the 404 is the stronger signal.

## 6. Case variants

`/Blog/`, `/BLOG/` and `/blog/Mental-Math-Training-Guide/` all return **404**.
GitHub Pages paths are case-sensitive, so case creates no duplicates. There are 0
mixed-case routes in `out/` and 0 internal hrefs with uppercase.

## 7. Tracking parameters

| Request | Live | Canonical in the body |
| --- | --- | --- |
| `/blog/mental-math-training-guide/?utm_source=x` | 200, **byte-identical** to the clean URL | `https://reigncreativellc.com/blog/mental-math-training-guide/` |
| `/?utm_source=x&gclid=y` | 200, byte-identical to `/` | `https://reigncreativellc.com/` |
| `/blog/mental-math-training-guide/?_rsc=abc` | 200, byte-identical to the clean URL | the clean article URL |
| `/blog/?ref=y` | 200, byte-identical to `/blog/` | `https://reigncreativellc.com/blog/` |

A static host cannot strip or redirect parameters. The parameterless absolute
self-canonical is the consolidation signal, and it is present on all of them.
None of the 37,055 internal hrefs has a query string. No action is needed, and no
robots rule should be added.

## 8. Mixed content and `http://` URLs

Every `http://` string anywhere in the built output:

| Where | `http://` occurrences | Nature |
| --- | --- | --- |
| 601 HTML files: every attribute (`href`, `src`, `content`, `srcset`…), JSON-LD, inline scripts, visible text, CSS `url()` | **0**. A raw grep also finds 0 for `http:\/\/` and `http%3A` | — |
| JSON-LD `@context` | 2,948 / 2,948 are `https://schema.org` | No `http://schema.org` anywhere |
| Canonical, `og:url`, `og:image`, `twitter:image` | 0 over `http://` | — |
| Protocol-relative `//host` in `src` or `href` | 0 | — |
| `sitemap.xml` | 1: `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` | XML namespace identifier required by the sitemap protocol; never fetched |
| `blog/rss.xml` | 1: `xmlns:atom="http://www.w3.org/2005/Atom"` | XML namespace identifier; never fetched |
| `llms.txt`, `robots.txt`, `app-ads.txt`, `manifest.webmanifest` | 0 | — |
| The one CSS file | 0 | Every `url()` is a root-relative `/_next/static/media/…` font |
| 35 JS files | Namespace constants in the React/Next runtime (`http://www.w3.org/2000/svg` ×9, `/1999/xlink` ×9, `/1999/xhtml` ×5, `/1998/Math/MathML` ×4, `/XML/1998/namespace` ×4), and Next.js URL-parsing bases `"http://n"` ×9 and `"http://f"` ×1, used as `new URL(path, "http://n")` | Identifiers and parse bases; never requested |

**Verdict: no mixed content and no `http://` canonical, `og:url` or JSON-LD URL.**
Live, none of the 599 sitemap pages contains `http://` in its body.

## 9. Canonical, `og:url`, JSON-LD, sitemap and RSS alignment

| Signal | Local `out/` | Live |
| --- | --- | --- |
| `<link rel="canonical">` | 600 / 601 pages, exactly one each, all absolute `https://reigncreativellc.com/…`. **599 self-referencing**; 1 alias (`/apps/82-0-pro-basketball-draft/` → `/apps/pro-basketball-draft-gm-mode/`); 1 none (`/404.html`, `noindex`) | 599 / 599 sitemap URLs: 200 and self-canonical |
| `og:url` | Equals the canonical on 600 / 600 pages that have one | 599 / 599 equal the canonical |
| JSON-LD page nodes (593: BlogPosting, SoftwareApplication, CollectionPage, ProfilePage, AboutPage, Blog, WebPage) | `url` and `mainEntityOfPage.@id` equal the canonical on 593 / 593; 0 parse errors in 2,948 blocks | Parses on 599 / 599 |
| `BreadcrumbList` | 589 pages; every `item` is https, apex, slash-terminated and exists in `out/`; matches the visible breadcrumb on 589 / 589 | — |
| `sitemap.xml` | 599 `<loc>`, set-equal to the 599 self-canonicals (0 extra, 0 missing); excludes the alias and `/404.html` | **Byte-identical** to local |
| `blog/rss.xml` | 525 items = the 525 article canonicals; `guid` = `link` on all | **Byte-identical** to local |
| `llms.txt` | 67 first-party URLs, each a canonical page or the sitemap or feed | **Byte-identical** to local |
| Internal links | 37,055 hrefs to 599 distinct targets, all canonical form | — |

The retired alias `/apps/82-0-pro-basketball-draft/` answers 200 live with
canonical **and** `og:url` pointing at `/apps/pro-basketball-draft-gm-mode/`. It
is in no sitemap, feed or internal link. This is the accepted no-301-available
trade-off from 2026-09-15.

**Owner-reported, not independently verified:** the Search Console Breadcrumbs
report shows **17 valid items, 0 invalid**. Locally, 589 pages carry a valid
`BreadcrumbList` with zero validator errors. The gap is crawl and processing
coverage, not markup.

## 10. Actions

### Owner actions (not possible from the repository)

1. **Turn on Enforce HTTPS.** Settings → Pages → tick "Enforce HTTPS".
   - *Evidence:* §1. `http://` apex and article answer 200 and are byte-identical
     to https; `http://www` and `hotfunyuns.github.io` 301 into `http://`; no HSTS.
     The certificate covers both hostnames and DNS is correct, so the box should
     be available.
   - *Afterwards, verify — don't assume.*
     - `curl -s -o /dev/null --max-redirs 0 -w '%{http_code} %{redirect_url}\n' http://reigncreativellc.com/`
       should print `301 https://reigncreativellc.com/`.
     - `curl -s -o /dev/null -L -w '%{num_redirects} %{url_effective}\n'` on
       `http://www.reigncreativellc.com/` and on
       `https://hotfunyuns.github.io/Website/` should end at
       `https://reigncreativellc.com/`.
     - `node scripts/audit-redirects.mjs --live` should then show 301 in its
       first row.
   - Record whether a `Strict-Transport-Security` header appears. This report
     makes no prediction about it, and HSTS must not be claimed until a response
     shows it.
2. **Search Console exports.** These turn the owner-reported figures into
   evidence: the **HTTPS** report, the **Breadcrumbs** report (which 17 pages),
   and *Indexing → Pages* with example URLs for any duplicate, redirect or
   alternate-canonical bucket. Also run URL Inspection on
   `http://reigncreativellc.com/` to see Google's selected canonical. Export
   steps: [search-console-refresh-report.md](./search-console-refresh-report.md).
   - *Evidence:* no export or credential exists in the repository (`search-console/` absent).
3. **GA4:** keep *Page changes based on browser history events* **OFF**. It cannot
   be verified from the repository. Optionally, compare `page_location` values
   starting `http://` before and after action 1, to size the http traffic.
4. **Host decision (unchanged, optional).** A real 301 for the alias, `index.html`
   and `//` variants, HSTS, and security headers all need a host that can send
   redirects and headers.
   - *Evidence:* the §1 header set; `/404.html` must answer 200; the alias answers 200.
   - Canonicalisation already works without this.

### Repository fixes (all low severity; none affects canonicalisation)

These are for whoever owns `src/` and `scripts/`; this audit changed neither.

- **R1.** `src/app/not-found.tsx`: emit one robots tag instead of two, and stop
  inheriting `og:url = https://reigncreativellc.com/` on a page with no canonical.
  Keep `noindex`, and keep the absence of a canonical.
  - *Evidence:* `out/404.html` and live `/404.html` (§4).
- **R2.** Optional: add `<link rel="alternate" type="application/rss+xml" href="https://reigncreativellc.com/blog/rss.xml">`
  so the feed is discoverable.
  - *Evidence:* 0 / 601 pages carry it.
- **R3.** Optional: `<lastmod>` for the six static pages that lack it (`/about/`,
  `/support/`, `/editorial-policy/`, `/app-support/`, `/privacy/`, `/terms/`), but
  only from a real modification date.
  - *Evidence:* 593 / 599 sitemap entries have `<lastmod>`.
- **R4.** Optional: have `scripts/audit-redirects.mjs --live` print a clear,
  **non-gating** WARN when `http://` answers 200, so the state stays visible until
  owner action 1 lands.
  - *Evidence:* today it prints "observed 200 / expected 301" with no warning,
    and exits 0.

### Keep as is (do not "fix")

- `scripts/postbuild-normalize-urls.mjs` must stay in `npm run build` and in
  `nextjs.yml`.
- No `robots.txt` `Disallow` for `index.txt`, `?_rsc=` or tracking parameters.
- No canonical on `/404.html`.
- The alias keeps its canonical and `og:url` to the replacement page, with no `noindex`.
- `index.html`, `//` and parameter variants stay consolidated by the canonical;
  the host offers nothing better.
