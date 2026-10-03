# Expansion 2026-10 — production baseline

Recorded **2026-10-02**, 21:56–22:15 UTC (14:56–15:15 America/Los_Angeles),
before any content change in this expansion. Every count below comes from a
command run in this session; the commands are listed in §13. Where something
could not be measured it says so.

Companion report: [https-canonical-report-2026-10.md](./https-canonical-report-2026-10.md).
Previous full report: [seo-pipeline-final-report.md](./seo-pipeline-final-report.md) (2026-09-26).

## 1. Commit and branch

| | |
| --- | --- |
| Commit | `e72c9a66b3b853c728313ffaae4c9b079fd4acd4` (`e72c9a6`, "Note that the queue workflow's first scheduled run is not yet observed") |
| Branch | `main`, level with `origin/main` (`git status -sb` → `## main...origin/main`) |
| Working tree | **Clean** at the start, immediately before `npm run build`, and immediately after it and after `npm run audit:all` |
| Later | By 22:14 UTC another agent had added one untracked file, `docs/data/search-intent-observations-2026-10-team-sports.json`. It affects nothing here: the build and audits ran on a verified-clean tree, and nothing in the build chain reads `docs/data/` |
| Content commits since | `146d5b2` and `e72c9a6` touch only `docs/seo-pipeline-final-report.md`. The site content is that of `77a9312` |
| Production | Serves `e72c9a6`: deploy run **36228272751** (*Deploy Next.js site to Pages*, push, success, 07:56:02 → 07:57:56 UTC on 2026-09-26). Live `Last-Modified: Sat, 26 Sep 2026 07:57:52 GMT` |
| Toolchain | Local Node v24.15.0, npm 11.12.1, Next.js 14.2.35. CI builds on Node 20 |

## 2. Build result and timing

`npm run build` → **pass** (exit 0), **79 s** wall clock (21:56:52 → 21:58:11 UTC).
The chain is `audit-catalog → next build → validate-content → audit-authorship → postbuild-normalize-urls`.

| Step | Printed |
| --- | --- |
| `audit-catalog` | apps 39, live verified listings 39; sports-gm 14, language-learning 10, action-arcade 5, anime-creative 3, health-nutrition 3, education-brain 2, video-utility 2; activeCategories 7; featured 6; "All catalog checks passed." |
| `next build` | Compiled successfully; lint and type check passed; "Generating static pages (609/609)". 609 is Next's own route count and includes non-HTML routes such as the sitemap, feed, `llms.txt`, manifest and image routes. First Load JS shared by all: 87.4 kB |
| `validate-content` | "OK — 525 published, 0 unpublished, 602 pages". 602 counts `out/404/index.html`, which the normaliser removes next |
| `audit-authorship` | 525 articles, 1 author profile; "git: 0 changed article(s) compared with HEAD"; "authorship and dates consistent" |
| `postbuild-normalize-urls` | "removed 600 RSC flight payload(s) (38456 KB)"; "removed out/404/ (soft 404; out/404.html kept)" |

The only warning is that the Browserslist `caniuse-lite` data is six months old. It is cosmetic.

**Local and production HTML are not byte-identical, and that is expected.** Chunk
hashes and `buildId` differ between builds. The Linux CI build also emits three
`<link rel="preload" as="font">` tags and `<meta name="next-size-adjust">`. This
Windows build omits them, although it self-hosts the same 13 `.woff2` files,
including the same three `.p.woff2` preload files. With hashes normalised, the
live and local `404.html` differ only in those font tags, the `buildId`, and the
inline RSC rows renumbered as a knock-on effect. There is no content difference.
Every text document is byte-identical live and local (§9). Compare content, not bytes.

## 3. Page inventory (`out/`, after the normaliser)

601 HTML files, 737 files in total, 83.0 MB, of which HTML is 73.4 MB. By extension:
html 601, webp 64, js 35, jpg 14, woff2 13, txt 3, png 2, xml 2, svg 1,
webmanifest 1, css 1.

| Type | Route | Pages | In sitemap |
| --- | --- | ---: | ---: |
| Articles | `/blog/<slug>/` | **525** | 525 |
| App pages | `/apps/<slug>/` | **39** | 39 |
| App-category pages | `/apps/category/<id>/` | **7** | 7 |
| Blog-category pages | `/blog/category/<id>/` | **7** | 7 |
| Topic hubs | `/blog/topics/<hub>/` | **10** | 10 |
| Author pages | `/authors/reign-creative-llc/` | **1** | 1 |
| Index pages | `/`, `/apps/`, `/blog/` | **3** | 3 |
| Other static pages | `/about/`, `/app-support/`, `/editorial-policy/`, `/press/`, `/privacy/`, `/support/`, `/terms/` | **7** | 7 |
| Retired app alias | `/apps/82-0-pro-basketball-draft/` | 1 | 0 (canonical → `/apps/pro-basketball-draft-gm-mode/`) |
| Not-found handler | `/404.html` | 1 | 0 (`noindex`) |
| **Total** | | **601** | **599** |

Content source: 525 files in `content/blog/`, all `"status": "published"`. No file
has `editorialApproved` or `publishAt`, so the publishing queue is empty.

Leftovers: `index.txt` files in `out/`: **0**. `out/404/`: **absent**.

## 4. Sitemap, RSS and `llms.txt`

| Document | Local `out/` | Live | Notes |
| --- | --- | --- | --- |
| `sitemap.xml` | **599** `<loc>` (599 distinct), 113,560 bytes | 599, **byte-identical** | All `https://reigncreativellc.com/…/`, slash-terminated. The set equals the set of 599 self-canonical pages exactly: 0 extra, 0 missing. 593 entries have `<lastmod>`; the six without are `/about/`, `/support/`, `/editorial-policy/`, `/app-support/`, `/privacy/` and `/terms/` |
| `blog/rss.xml` | **525** items (525 distinct links), 298,363 bytes | 525, **byte-identical** | Item links are exactly the 525 article canonicals. `guid` equals `link` on every item. Channel link `https://reigncreativellc.com/blog/`; `atom:link rel="self"` is https |
| `llms.txt` | **11,775 bytes**, 100 lines, 68 URLs (67 first-party) | **byte-identical** | Every first-party URL is a canonical page or the sitemap or feed. No `http://` |
| `robots.txt` | 1,206 bytes | byte-identical | See §9 |
| `app-ads.txt` | 59 bytes | byte-identical | See §9 |

**Correction to the 2026-09-26 report.** It gave live `llms.txt` as "11,759
bytes". The file is 11,775 bytes and 11,759 *characters*: seven em dashes and one
`’`, each three bytes in UTF-8. Nothing differed between local and live; the
figure was a character count labelled as bytes.

## 5. Canonical and `og:url` coverage (all 601 HTML files)

| Measure | Count |
| --- | ---: |
| Pages with exactly one `<link rel="canonical">` | 600 |
| Pages with more than one | 0 |
| Pages with none | 1: `/404.html`, by design (`noindex`) |
| Canonicals that are absolute `https://reigncreativellc.com/…` | 600 / 600 |
| Canonicals over `http://`, relative, or on another host | 0 |
| **Self-referencing absolute https canonicals** | **599** |
| Non-self canonicals | 1: `/apps/82-0-pro-basketball-draft/` → `/apps/pro-basketball-draft-gm-mode/`, a documented exemption |
| Distinct canonical targets | 599 |
| Pages with `og:url` | 601 |
| **`og:url` equal to the canonical** | **600 / 600** pages that have a canonical, including the alias, where both name the replacement page |
| `og:url` without a canonical | 1: `/404.html` has `og:url = https://reigncreativellc.com/`. Minor; the page is `noindex` |
| JSON-LD page nodes checked (BlogPosting 525, SoftwareApplication 39, CollectionPage 25, AboutPage, ProfilePage, Blog, WebPage) | 593; `url` and `mainEntityOfPage.@id` equal the canonical on **593 / 593** |
| `<meta name="robots">` noindex pages | 1 (`/404.html`, which carries two robots tags, `noindex` and `noindex, follow`) |

Internal links: **37,055** internal `<a href>` across 601 pages, reaching **599**
distinct targets. None lacks a trailing slash, carries a query string, has
uppercase, ends in `index.html`, uses an absolute first-party URL or `http://`,
or points to a missing target.

## 6. Breadcrumb coverage: visible versus JSON-LD

| Measure | Count |
| --- | ---: |
| Pages with `BreadcrumbList` JSON-LD | **589** |
| Pages with a visible `nav[aria-label="Breadcrumb"]` | **589** |
| Pages with both / only one / duplicates | 589 / 0 / 0 |
| **Visible items match the JSON-LD items** | **589 / 589** |
| `ListItem`s in breadcrumb lists | 2,331 (4 items on 564 pages, 3 items on 25 pages) |
| By page type | articles 525, apps 39, topic hubs 10, app categories 7, blog categories 7, author 1 |
| Without breadcrumbs (12) | `/`, `/apps/`, `/blog/`, the 7 static pages, the retired alias, `/404.html` |

"Match" means the same number of items in the same order, `position` running
1…n, each `name` equal to the decoded visible label, and each linked crumb's
`item` equal to `https://reigncreativellc.com` plus its visible `href`. Every
`item` URL is https, on the apex host, slash-terminated, and present in `out/`.
The last crumb is unlinked on screen (`aria-current="page"`) and carries no `item`
on all 589 pages, which Google's breadcrumb documentation permits for the final
item. Both renderings come from one `items` array in
`src/components/Breadcrumbs.tsx`, so they cannot drift apart unless that
component changes.

**Owner-reported, not independently verified:** the Search Console Breadcrumbs
report shows **17 valid items, 0 invalid**. This build has 589 pages carrying a
`BreadcrumbList` and zero validation errors (§7). So 17 reflects how few pages
Google has crawled and processed, not a markup fault. Which 17 pages they are
cannot be determined without the export (§10).

## 7. Structured data

2,948 JSON-LD blocks, **0 parse errors**. All 2,948 use `"@context":"https://schema.org"`.

| Top-level `@type` | Count | | Every node, nested included | Count |
| --- | ---: | --- | --- | ---: |
| Organization | 601 | | ListItem | 3,121 |
| WebSite | 601 | | Question / Answer | 2,615 / 2,615 |
| BreadcrumbList | 589 | | CreativeWork (citations) | 1,815 |
| FAQPage | 564 | | Organization (incl. 525 `BlogPosting.author`, 1 `ProfilePage.mainEntity`) | 1,127 |
| BlogPosting | 525 | | ContactPoint | 601 |
| SoftwareApplication | 39 | | BlogPosting (incl. 20 nested in the `Blog` node on `/blog/`) | 545 |
| CollectionPage | 25 | | WebPage (incl. 525 `mainEntityOfPage`) | 526 |
| AboutPage | 1 | | SoftwareApplication (incl. 39 in `/apps/` `about`) | 78 |
| ProfilePage | 1 | | Offer | 39 |
| Blog | 1 | | ItemList | 24 |
| WebPage | 1 (`/editorial-policy/`) | | | |

The top-level counts match `npm run audit:schema` exactly, and match the
2026-09-26 report.

## 8. `npm run audit:all`

**Pass** (exit 0) in **38 s**. The chain stops at the first failure; nothing failed.

| Sub-audit | Result | Key numbers |
| --- | --- | --- |
| `audit:content` (preflight) | pass, "pre-flight clean" | 525 articles; 16 notes for human review, all trademark nominative-use reminders (MLB ×7, NFL ×2, Duolingo ×2, MyFitnessPal ×2, Cronometer ×2, Carb Manager ×1, over 13 articles) |
| `audit:catalog` | pass | 39 apps / 39 verified listings, 7 categories, 6 featured |
| `audit:output` | pass, "output audit clean" | pages 601; indexable 599; noindex 1; unique titles 599; unique descriptions 599; canonicals 599; JSON-LD blocks 2,948; images 2,111, all with alt, width and height. **Warning:** 32 titles over 60 characters (61–69) |
| `audit:schema` | pass, "structured data valid" | type counts as in §7 |
| `audit:analytics` | pass | Play CTAs 2,598, all rendered by the tracked component; 1,584 with install-referrer attribution; GA4 `G-JK8FPQB5L2` |
| `audit:authorship` | pass | 525 articles, 1 author profile, 0 changed vs HEAD |
| `audit:entities` | pass | 606 files; "Reign Creative LLC" ×10,249, "Reign Collective Apps" ×1,189, short "Reign Creative" ×2,123; 2,598 Play links |
| `report:links` | pass (diagnostic) | 601 pages, 0 broken, 0 orphans, 0 articles without an editorial inbound link, 0 with only one, maximum depth 2. It rewrote its three tracked outputs **byte-identically** (SHA-1 before = after), so the committed link report matches this build |
| `audit:canonicals` | pass | 601 pages, 599 fully checked, 2 documented exemptions (`/404.html`, the retired alias); 599 distinct canonicals |
| `audit:redirects` | pass (offline) | 737 files, 601 HTML, 0 RSC payloads; text documents `app-ads.txt`, `llms.txt`, `robots.txt`; `404.html` present, `/404/` absent |
| `audit:duplicates` | pass | 601 pages, 601 distinct primary-content hashes; 2 short pages excluded from near-matching (`/404.html` 22 words, the alias 51 words) |
| `audit:backnav` | pass | 601 pages, 71 source files; 1 note (`AppsExplorer.tsx` uses `history.replaceState`, documented as intentional) |
| `audit:feeds` | pass | sitemap 599 (525 articles, 39 apps); RSS 525; exported 601; sitemap, RSS and `llms.txt` agree with every canonical |
| `npm test` | pass | **63 tests, 63 pass, 0 fail** (10.7 s) |

## 9. Live production checks

All live checks ran 2026-10-02, 22:04–22:10 UTC, using Node `fetch` with
`redirect: 'manual'`. Scheme rows were confirmed with `curl`. Full details and
the duplicate-URL analysis are in the companion report.

| Check | Result |
| --- | --- |
| `http://reigncreativellc.com/` | **200**, no redirect. Byte-identical to the https page (162,417 bytes, same SHA-1) |
| `http://www.reigncreativellc.com/` | **301 → `http://reigncreativellc.com/`** (keeps the insecure scheme) |
| `https://www.reigncreativellc.com/` | 301 → `https://reigncreativellc.com/` |
| `https://reigncreativellc.com/blog` | 301 → `/blog/` |
| `https://reigncreativellc.com/Blog/` | 404 (also `/BLOG/` and a mixed-case article slug) |
| `https://reigncreativellc.com/does-not-exist/` | 404, serving the `404.html` body (35,377 bytes) |
| Article `index.txt` (`/blog/mental-math-training-guide/index.txt`) | 404, also with `?_rsc=abc123` and over `http://` |
| Article `?utm_source=x` | 200, byte-identical to the clean URL; canonical `https://reigncreativellc.com/blog/mental-math-training-guide/` |
| `/sitemap.xml` | 200 `application/xml`, **599 URLs**, byte-identical to local |
| `/robots.txt` | 200, byte-identical. Explicit `Allow: /` groups for **OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot**. GPTBot, ClaudeBot, Google-Extended, CCBot, anthropic-ai, Applebot-Extended, Bytespider and Perplexity-User have no group and inherit `User-agent: *` → `Allow: /`. No `Disallow` anywhere |
| `/llms.txt` | 200 `text/plain`, 11,775 bytes, byte-identical |
| `/app-ads.txt` | 200 `text/plain`, 59 bytes: `google.com, pub-4872012511804466, DIRECT, f08c47fec0942fa0` followed by one `\n`. **Matches** the required line exactly, plus a single trailing newline |
| HSTS | **None.** No `Strict-Transport-Security` on any response: 46 targeted probes plus all 599 sitemap pages |
| **All 599 sitemap URLs** | 599 × 200; 599 self-canonical; 599 `og:url` = canonical; JSON-LD parses on all; no `http://` in any body |
| `index.txt` sample (every 5th sitemap URL) | 120 / 120 → 404 |
| `http://` sample (16 page URLs across all 8 page types) | 16 / 16 → 200, each with its https canonical |
| `node scripts/verify-live.mjs --smoke` | "12 page(s) checked, sitemap 599 URLs, RSS 525 items, 0 unpublished article(s) checked for leaks — live site verified" |
| `node scripts/audit-redirects.mjs --live` | Every row as expected **except** `http://reigncreativellc.com/`: observed 200, expected a 301 to https. The script prints this; it does not fail |
| TLS certificate | Let's Encrypt, SAN `reigncreativellc.com` + `www.reigncreativellc.com`, valid 2026-08-20 → 2026-11-18, chain trusted |
| DNS | Apex A → 185.199.108–111.153 (GitHub Pages); `www` CNAME → `hotfunyuns.github.io` |

**Enforce HTTPS verdict: OFF.** Owner step: GitHub → `HotFunyuns/Website` →
**Settings → Pages → tick "Enforce HTTPS"**. The certificate already covers both
hostnames, so the box should be selectable. Evidence and the follow-up checks are
in the companion report, §1.

**Owner-reported, not independently verified:** the Search Console HTTPS report
shows **zero non-HTTPS pages**. That is consistent with every `http://` copy
carrying an https canonical, so Google indexes the https URL. It is **not**
evidence that `http://` redirects, and the probes above show that it does not.

## 10. Search Console and GA4 data availability

| Source | State |
| --- | --- |
| `search-console/` (gitignored import folder) | **Absent** |
| Export or credential files in the repo | **None.** Searched for `*credential*`, `*service-account*`, `*client_secret*`, `*.p12`, `*gsc*`, `*search-console*`, `*ga4*`, `*.csv`, `*.zip`, `.env*`; the only hits are keyword maps, the link graph, and the importer's own code, config and tests |
| Environment variables | None whose names match GOOGLE, GA4, GSC, SEARCH_CONSOLE or ANALYTICS |
| GitHub Pages settings API | `GET /repos/HotFunyuns/Website/pages` → 404 without authentication, so the HTTPS-enforcement flag cannot be read directly |
| GA4 reporting data | **Not available.** Only the measurement ID is in the code; there is no Data API access or export |

**Search Console data used: none.** For the owner to export (steps in
[search-console-refresh-report.md](./search-console-refresh-report.md) §"How to export the data"):

1. Performance → Search results, compare mode, 28 days → `search-console/28d/`.
   The same for 3 months → `search-console/90d/`.
2. Indexing → Pages: one CSV per "Why pages aren't indexed" reason → `search-console/indexing/`.
3. Optionally page + query rows (Looker Studio or API) → `search-console/page-queries.csv`.
4. To turn the owner-reported figures into evidence: the **Breadcrumbs** enhancement
   report (the 17 valid items), the **HTTPS** report, and the example URLs of any
   duplicate or redirect buckets.

Then run `npm run report:search-console`.

**GA4:** the property setting *Admin → Data Streams → Enhanced measurement → Page
changes based on browser history events* must stay **OFF**. It cannot be read
from here. Page views are sent manually, so turning it on double-counts.

### Analytics code path (verified in source and build)

- `G-JK8FPQB5L2` is the **only** Google tag ID. It appears in 12 built JS chunks
  and in no HTML file; there are no `UA-`, `GTM-`, `AW-` or `DC-` IDs anywhere in
  `out/`. In `src/` it is defined once, `GA_MEASUREMENT_ID` in `src/lib/analytics.ts`.
- `play_store_click` has one emitter: `trackPlayStoreClick()` in
  `src/lib/analytics.ts`, called only from `handleClick` in
  `src/components/PlayStoreLink.tsx`. That handler fires once per click, never
  calls `preventDefault`, and chains any caller `onClick`. No global click
  listener exists in `src/`. All 2,598 Play CTAs in the build render through
  `PlayStoreLink` (`audit:analytics`).
- Analytics run only on `reigncreativellc.com` / `www.reigncreativellc.com`
  (`isAnalyticsEnabled`), with `send_page_view: false` and manual page views
  de-duplicated by `pathname + search`.
- Minor labelling nit, not a defect: the author page's Play developer-profile link
  (`src/app/authors/[author]/page.tsx`) reports `button_location: "article_top"`
  although it is not on an article.

## 11. GitHub Actions and the publish queue

Public API, unauthenticated; logs are not readable without admin.

| | |
| --- | --- |
| Workflows | 2, both `active`: *Deploy Next.js site to Pages* (`nextjs.yml`, id 264554290) and *Publish approved article (daily queue)* (`publish-queue.yml`, id 367521405, registered 2026-09-26T06:06:07Z) |
| Runs in repo | 67 in total: 30 queue (`schedule`), 21 `nextjs.yml` (`push`), and 16 from the deleted `deploy.yml` (`push`). The 10 most recent are all queue runs |
| Deploy runs | 21 `nextjs.yml` runs, every one a `push`, so the queue has never dispatched a deploy. The latest 5 all succeeded: `e72c9a6` (36228272751), `146d5b2`, `77a9312`, `c79de0f`, `efa6da0` |
| **Has the hourly queue run?** | **Yes: 30 runs, all `schedule`, all `success`, all on `e72c9a6`.** First 2026-09-26T11:23:44Z (5.3 h after registration), latest 2026-10-02T20:44:03Z. The 2026-09-26 report's "first run not yet observed" is superseded |
| What each run did | Latest run 37062464599: "Check eligibility (America/Los_Angeles)" succeeded; Install, Release and link, Build and validate, Confirm linked, Regenerate reports, Commit and push, and Deploy were all **skipped**, as expected with an empty queue |
| Cadence | 30 of 160 hourly `:17` slots fired (**18.8 %**). Gaps between runs: 2.59 h minimum, 5.61 h median, 8.57 h maximum |
| Release window | Every Los Angeles day from 09-26 to 10-02 had at least one run at or after 09:00 LA. The first such run was at 09:22, 11:23, 14:59, 13:46, 12:18, 11:53 and 13:44 LA respectively |

Implications for this expansion:

- With GitHub's best-effort cron, a due article would be released hours after
  09:00 LA, not at 09:00.
- Steps 5–11 (install, release, build, commit, push, dispatch deploy) **have never
  executed in CI**. The first real release will be their first CI run.

## 12. What already fails, and what is only noted

**Failing now:** nothing in `npm run build`, `npm run audit:all` (including 63
tests), `verify-live --smoke`, or the 599-URL live sweep.

**The one unmet production expectation:** `http://` serves full 200 duplicates
(Enforce HTTPS is OFF), and the `www` and `github.io` redirects land on `http://`.
No gate fails on this, because it is not fixable from the repository.

**Noted, not failing:**

1. 32 titles over 60 characters (`audit:output` warning).
2. 16 trademark nominative-use review notes (preflight).
3. `/404.html` has two robots meta tags and `og:url` = homepage (cosmetic; the
   page is `noindex`).
4. No page carries `<link rel="alternate" type="application/rss+xml">` (0 / 601),
   so the feed is not auto-discoverable.
5. Six static pages have no sitemap `<lastmod>`.
6. The author-page Play link is labelled `article_top`.
7. Local Windows builds omit the font preload tags that CI emits.
8. Queue cadence is irregular (§11).
9. `caniuse-lite` data is six months old.

## 13. Commands run

| # | Command | Used for |
| --- | --- | --- |
| 1 | `git rev-parse HEAD`, `git rev-parse --abbrev-ref HEAD`, `git status --porcelain=v1` (before and after the build), `git status -sb`, `git log -5`, `git show --stat e72c9a6 146d5b2` | §1 |
| 2 | `npm run build`, timed with `date +%s` before and after, log captured | §2 |
| 3 | `npm run audit:all`, timed, with `sha1sum` of `docs/internal-linking-report.md`, `docs/data/link-graph.json` and `docs/data/link-graph-edges.csv` before and after | §8 |
| 4 | `npm run audit:analytics` (standalone) | §10 |
| 5 | `node scripts/verify-live.mjs --smoke`; `node scripts/audit-redirects.mjs --live` | §9 |
| 6 | Session-scratchpad script `analyze-out.mjs` (not committed; this task may only create these two docs). It parses all 601 HTML files: route classification, canonical and `og:url` tags, robots meta, every JSON-LD block (parse, top-level and nested `@type`, page-node `url` / `mainEntityOfPage`), breadcrumb nav versus `BreadcrumbList` item by item, every `http://` occurrence by context (attribute, JSON-LD, inline script, text, CSS), protocol-relative URLs, every internal `<a href>`, plus the sitemap, feed, `llms.txt` and built JS (GA IDs, `http://` tokens) | §3–§7 |
| 7 | Cross-check one-liners on `out/`: `find out -name '*.html' \| wc -l` (601); `find out/blog -mindepth 2 -maxdepth 2 -name index.html \| wc -l` (525); the same for `out/apps` (40 = 39 + alias), `out/apps/category` (7), `out/blog/category` (7), `out/blog/topics` (10), `out/authors` (1); `grep -o '<loc>' out/sitemap.xml \| wc -l` (599); `grep -o '<item>' out/blog/rss.xml \| wc -l` (525); `wc -c < out/llms.txt` (11775); `find out -name index.txt \| wc -l` (0); `grep -rl 'http://' out --include=*.html \| wc -l` (0); `grep -rl 'aria-label="Breadcrumb"' out --include=*.html \| wc -l` (589); `grep -rl '"@type":"BreadcrumbList"' out --include=*.html \| wc -l` (589); `grep -rho '"@context":"[^"]*"' out --include=*.html \| sort \| uniq -c` (2948 × `https://schema.org`); `grep -rhoE '\bG-[A-Z0-9]{8,12}\b' out --include=*.js --include=*.html \| sort \| uniq -c` (12 × `G-JK8FPQB5L2`) | §3–§7, §10 |
| 8 | Scratchpad `probe-live.mjs`: 46 targeted live URLs (scheme, host, slash, case, 404, RSC, tracking parameters, documents) with `redirect: 'manual'`, a byte comparison of the live documents against `out/`, and a parse of the `robots.txt` groups | §9 |
| 9 | Scratchpad `probe-sitemap.mjs`: every live sitemap URL (599), every 5th URL's `index.txt` (120), and 15 `http://` page URLs | §9 |
| 10 | `curl -s -o /dev/null --max-redirs 0 -w '%{http_code} %{redirect_url}'` and `curl -sI` on the scheme rows; `curl -s https://api.github.com/repos/HotFunyuns/Website/pages` | §9, §10 |
| 11 | Node `tls.connect(...).getPeerCertificate()`; PowerShell `Resolve-DnsName` | §9 |
| 12 | `curl` against `api.github.com/repos/HotFunyuns/Website/actions/` `workflows`, `runs?per_page=10`, `runs?per_page=100`, `workflows/367521405/runs?per_page=100`, `workflows/264554290/runs?per_page=5`, `runs/37062464599/jobs` | §11 |
| 13 | `ls search-console`; a `find` for credential-like file names; an environment-variable name check | §10 |
