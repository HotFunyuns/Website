# Structured-data, sitemap, feed and metadata report

Measured **2026-09-15** against the exported `out/` directory (230 HTML pages,
228 sitemap URLs, 175 published articles, 29 app pages) by:

```
node scripts/validate-structured-data.mjs   # JSON-LD
node scripts/validate-sitemap-rss.mjs       # sitemap / RSS / llms.txt agreement
node scripts/audit-output.mjs               # per-page metadata
```

All three exit 0 on the measured export. Nothing below is inferred from source —
every figure is read out of the built files a crawler would receive.

## Why this pass exists

Search Console reported 12 pages as `Duplicate without user-selected canonical`.
That message means Google found a URL duplicating a known page and saw **no
canonical on it at all**. Removing the duplicate URLs is one half of the fix and
belongs to the build pipeline. The other half is signal consistency: every URL
this site publishes about itself — in the sitemap, in the feed, in `llms.txt`, in
`og:url`, in JSON-LD — must be spelled identically, and no surface may advertise
a URL another surface omits. This report records the state of that second half.

## Types emitted, per page type

Counts are top-level `<script type="application/ld+json">` blocks.

| Page type | Pages | JSON-LD blocks emitted per page |
| --- | ---: | --- |
| Homepage | 1 | `Organization`, `WebSite` |
| Article | 175 | `Organization`, `WebSite`, `BlogPosting`, `FAQPage`, `BreadcrumbList` |
| App page | 29 | `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| App category | 7 | `Organization`, `WebSite`, `CollectionPage`, `BreadcrumbList` |
| Blog category | 7 | `Organization`, `WebSite`, `CollectionPage`, `BreadcrumbList` |
| Apps index | 1 | `Organization`, `WebSite`, `CollectionPage` |
| Blog index | 1 | `Organization`, `WebSite`, `Blog` |
| Static page | 7 | `Organization`, `WebSite` (+ `WebPage` on `/editorial-policy/`) |
| Legacy alias | 1 | `Organization`, `WebSite` only — it is not the app page, so it must not carry the app page's markup |
| `404.html` | 1 | `Organization`, `WebSite` |

Nested types, all of them legitimate children of the blocks above:
`Question` 1077, `Answer` 1077, `ListItem` 1062, `CreativeWork` 507 (article
citations), `ContactPoint` 230, `WebPage` 175 (`mainEntityOfPage`),
`Organization` 175 (`BlogPosting.author`), `Offer` 29, `SoftwareApplication` 29
(category listings), `BlogPosting` 20 (blog-index summaries), `ItemList` 14.

Totals: **1103 JSON-LD blocks, every one valid JSON, every `@type` a real
schema.org type, every `@context` exactly `https://schema.org`.**

## Fabricated structured data: what was looked for, what was found

The whole export was walked key by key — object keys, not a text search, so an
article discussing the word "review" in prose is not mistaken for markup
claiming one.

| Claim | Occurrences found |
| --- | ---: |
| `aggregateRating` | 0 |
| `ratingValue` / `ratingCount` / `bestRating` / `worstRating` | 0 |
| `review` / `reviewCount` / `reviewRating` | 0 |
| `award` | 0 |
| `interactionStatistic` / `userInteractionCount` (install and download counts) | 0 |
| `contentRating` | 0 |
| `@type: Review` / `AggregateRating` / `Rating` | 0 |

**Nothing fabricated was found, and nothing was removed.** The site publishes no
star rating, no review count, no download total and no award anywhere in its
markup, and the validator now fails the build if any of them appear.

Two related absences are deliberate and worth recording, because both are
tempting to add and neither is honest here:

- **No `SearchAction` / sitelinks searchbox** on `WebSite`. The site has no
  search endpoint; an action pointing at a URL that does not exist would be
  markup describing something the site cannot do.
- **Only free apps get an `Offer`**, always `price: "0"`, matching the visible
  Price row and the Play listing. No price we have not verified is published.

## What was verified

### Sitemap (`out/sitemap.xml`)

- 228 `<loc>` entries, zero duplicates, one `<loc>` per `<url>`.
- Every URL absolute, `https`, host `reigncreativellc.com` (never `www`),
  lowercase, trailing slash, no query or fragment.
- **Every URL resolves to a real `index.html` in `out/`**, and that page's
  `<link rel="canonical">` is byte-identical to the sitemap URL. Automated.
- The reverse also holds: every exported page that names itself as its own
  canonical and is not `noindex` appears in the sitemap.
- **The legacy alias `/apps/82-0-pro-basketball-draft/` is absent** — confirmed,
  not assumed. It is excluded by the rule above, because its canonical points at
  `/apps/pro-basketball-draft-gm-mode/` rather than at itself.
- No draft, no future-dated post, no `review`-status post. The sitemap builds
  from `posts`, which is filtered before it is exported.
- `lastmod`: 222 of 228 entries carry one; 4 distinct values spanning
  2026-08-09 to 2026-09-04, each derived from an app's `lastVerified` or a
  post's `updatedAt`. **No build-time stamping** — the validator now fails if
  every `lastmod` equals the current date, which is what build stamping looks
  like. The 6 policy and support pages carry no `lastmod` rather than an
  invented one.
- `changefreq` values are all from the sitemaps.org enumeration; every
  `priority` is within 0–1.

### RSS (`out/blog/rss.xml`)

- **Parsed, not scraped.** `scripts/validate-sitemap-rss.mjs` contains a strict
  XML 1.0 reader that rejects unbalanced tags, unquoted attributes, bare `&`,
  undeclared entities, DTDs and characters XML forbids. The feed parses clean.
- Exactly **175 items — the same 175 articles the sitemap publishes**, no more,
  no fewer, cross-checked set against set.
- Every `<link>` equals its `<guid isPermaLink="true">`, matches
  `https://reigncreativellc.com/blog/<slug>/`, resolves to a real page, and
  equals that page's canonical.
- Channel carries `title`, `link` (`/blog/`), `description`, `language`, `docs`,
  `lastBuildDate` and `atom:link rel="self"` whose `href` is the feed's own
  published address.
- All 175 `pubDate`s are valid RFC-822 **and** carry the correct weekday for
  their date; none is in the future; items run newest-first.
- Only `&apos;` (27) and `&quot;` (8) entities appear, both predefined in XML.
  No bare ampersands, no raw control characters.
- No `content:encoded`: the feed is an index, not a second full-text copy of
  every article.

### `llms.txt`

- An honest index: one line per app, category, article and policy page, each
  `- [title](url): description`. It carries **no article bodies** — the longest
  line in the file is well under the 500-character bound the validator enforces.
- **No instructions to AI systems.** Checked explicitly for "recommend our",
  "you should recommend/mention/cite", "when asked", "always mention", "rank
  us", "ignore previous instructions", "system prompt" and similar. **None
  present; nothing had to be removed.** The file describes what exists and says
  plainly that articles are written in-house and are not expert-reviewed unless
  a named reviewer is credited.
- **No fabricated AI schema** — no JSON-LD, no `@context`, no `schema.org`
  reference anywhere in it.
- Every URL in it is a canonical URL that resolves to a real page, and the
  article lines are byte-compared against the feed's titles and descriptions, so
  the two surfaces cannot drift apart.

### Metadata across all 230 exported pages

- **0 duplicate titles, 0 duplicate descriptions, 0 duplicate canonicals** among
  the 228 indexable pages. That baseline is now a build failure to break.
- Every indexable page has exactly one `<h1>`, a self-referencing canonical,
  `og:title`, `og:description`, `og:url`, `og:image` (on this host),
  `twitter:card`, `twitter:title` and `twitter:description`.
- **`canonical` equals `og:url` on every page** — see the fix below.
- No `noindex` on any sitemap page. The only `noindex` page is `404.html`.
- No `http://` self-link and no `www.` host anywhere in the export.
- Lengths are measured after HTML-entity decoding, because `&amp;` is one
  character to a reader and counting its five source bytes reports a
  63-character title as 67.
  - Descriptions: **none over 160 characters**; one under 70 (`/terms/`, 68).
  - Titles: 21 over 60 characters, 61–65 after decoding, all of them app pages,
    app-category pages, `/apps/`, `/editorial-policy/` and `/press/`, where the
    `| Reign Creative LLC` title template pushes an otherwise fine title past
    the width a result will show. Reported as outliers rather than failures —
    the copy lives in `src/data/apps/**` and the static page files, and the
    decision to shorten it is an editorial one. No article title is over 60.

### JSON-LD consistency

- `Organization` and `WebSite` are **byte-identical on all 230 pages** — one
  signature each. The validator now fails if a second spelling appears, because
  two descriptions of one publisher is how an entity gets split in half.
- Entity facts are consistent with the rest of the site: legal name
  `Reign Creative LLC`, `sameAs` the Google Play developer page for
  `Reign Collective Apps` (the Play developer name, which differs from the legal
  name and is not asserted as an `alternateName` because it appears on only 12
  pages and we do not mark up what a reader cannot see).
- Every page-level `url`, `@id` and `mainEntityOfPage` equals that page's
  canonical exactly.
- All 218 `BreadcrumbList` blocks: positions sequential from 1, every `item` an
  absolute on-host trailing-slashed URL that resolves to a real exported page,
  and the last crumb is the current page.
- All 175 `BlogPosting` blocks: `datePublished` and `dateModified` equal the
  article's frontmatter exactly, `dateModified` never precedes `datePublished`,
  no future publication date, and `headline` matches the article title.
- Every `citation` URL in a `BlogPosting` is also a visible, clickable link in
  the article's Sources list.
- Every FAQ question in markup appears in the visible page text.
- Every `{"@id": …}` pointer resolves to a node defined somewhere on the site
  (`/#organization`, `/#website`, `/blog/#blog`, `/editorial-policy/#page`).

## What changed in this pass

| File | Change |
| --- | --- |
| `src/app/layout.tsx` | `Organization.url` and `WebSite.url` now carry a trailing slash, matching the homepage canonical byte for byte. `WebSite` gains `inLanguage` and a comment recording why it has no `SearchAction`. `openGraph.url` documented as the homepage's own value that any page declaring no `openGraph` will inherit. |
| `src/app/blog/rss.xml/route.ts` | `lastBuildDate` now derives from the newest `updatedAt` across all published posts — the same value the sitemap stamps on `/blog/` — instead of `posts[0].updatedAt`, which is the newest *post's* revision date and drifts from the sitemap whenever an older article is revised. `escapeXml` strips the C0 control characters XML 1.0 forbids, so one bad character pasted into a title cannot make the whole feed unparseable. Added `<docs>`. |
| `scripts/validate-sitemap-rss.mjs` | New. Cross-checks sitemap, RSS, `llms.txt` and every page canonical against each other. |
| `scripts/validate-structured-data.mjs` | Hardened: see below. |
| `scripts/audit-output.mjs` | Hardened: see below. |

`src/app/sitemap.ts`, `src/app/llms.txt/route.ts` and
`src/components/JsonLd.tsx` were audited and left unchanged — each was already
correct, and the report above is the evidence.

## Rules the validators now enforce

`scripts/validate-structured-data.mjs`, in addition to everything it checked
before:

1. Every `@type`, nested ones included, is on an allowlist of the 16 types this
   site emits. A typo such as `BlogPost` is silently ignored by consumers — this
   is how markup rots without anyone noticing.
2. `@context` is exactly `https://schema.org`.
3. Forbidden fields are matched on object **keys**, walking the whole tree, and
   the list now covers ratings, review counts, install counters, awards and
   content ratings, plus the `Review`/`Rating`/`AggregateRating` types.
4. Every page-level `url`, `@id` and `mainEntityOfPage` equals the page
   canonical; every site URL is https, non-`www` and trailing-slashed.
5. `BlogPosting` dates and headline match `content/blog/<slug>.md` frontmatter;
   `datePublished` is not in the future.
6. `BreadcrumbList` positions are sequential, items resolve to real pages, and
   the last crumb is the current page.
7. Each page type carries the blocks it is supposed to; a redirect alias is
   exempt and must carry only `Organization` and `WebSite`.
8. No page carries two of the same page-level type.
9. `Organization` and `WebSite` are identical everywhere.
10. Every `@id` reference resolves to a node defined somewhere on the site.

`scripts/audit-output.mjs`, in addition to everything it checked before:

11. `canonical` and `og:url` must agree — checked on **every** page, indexable
    or not, because an alias or an error page can carry the contradiction just
    as easily as an article.
12. `og:description`, `og:url`, `twitter:card` (valid value), `twitter:title`
    and `twitter:description` are required on indexable pages, and `og:image`
    must be on this host.
13. No `http://` self-link and no `www.` host anywhere in the export.
14. Title and description lengths are measured decoded, with hard failures at
    the points where something is certainly wrong and an outlier list either
    side of it.
15. RSC `index.txt` sidecars are counted and reported (not failed — removing
    them is a deploy-pipeline change, and `scripts/postbuild-normalize-urls.mjs`
    now does it).

## Known gaps

- The app taglines in `llms.txt` are not cross-checked against the catalog the
  way the article lines are cross-checked against the feed, because the feed
  carries only articles. `scripts/audit-catalog.mjs` covers the catalog side.
- These scripts prove internal consistency and schema validity. They are not a
  substitute for Google's Rich Results Test, which needs a live URL and runs
  after deploy. Representative URLs to submit:
  - `https://reigncreativellc.com/` — Organization, WebSite
  - `https://reigncreativellc.com/apps/baseball-career-sim/` —
    SoftwareApplication, BreadcrumbList, FAQPage
  - `https://reigncreativellc.com/blog/net-carbs-explained-keto-tracking/` —
    BlogPosting, BreadcrumbList, FAQPage
- A deploy succeeding is not Google accepting anything. The
  `Duplicate without user-selected canonical` count is resolved when Search
  Console says so, not when this file is green.
