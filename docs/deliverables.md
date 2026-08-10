# Deliverables

What was built, what was verified, and what is deliberately not claimed.

Build verified on **2026-08-09** against Next.js 14.2.35, static export.

> **No outcome is promised anywhere in this work.** Nothing here guarantees a
> ranking, an impression, a click, an AI citation, or an install. Search and
> assistant results are not under our control. What this system does is make
> outcomes *measurable and attributable* — not certain.

## 1. Catalog

| | |
| --- | --- |
| Apps | 21, each verified against its live Google Play listing |
| Categories | 7 |
| Draft / in-review apps published | **0** — deliberately excluded |

`npm run audit:catalog` passes: 21 apps, 21 verified listings, 7 categories.

App counts are derived from `src/data/apps` everywhere they appear. The stale
"eight apps and counting" claim is gone, and a grep for hardcoded counts returns
nothing, so the number cannot drift again.

The retired `/apps/82-0-pro-basketball-draft/` URL still resolves. It carries a
canonical to the renamed app, `robots: noindex, follow`, a meta-refresh, and a
no-JS fallback body. It is the one intentional orphan on the site — linking to
it would defeat its purpose.

## 2. Content

| | Count | Words |
| --- | --- | --- |
| Published cornerstone articles | 21 (one per app) | 1,451–2,144 (median 1,675) |
| Unpublished drafts | 54 | 1,403–2,701 (median 1,896) |
| — of which competitor comparisons | 4 | |
| — of which P8 topic drafts | 50 | |
| **Total** | **75** | **136,625** |

Also: **266 cited sources** and **425 FAQ entries** across the 75 articles.

Every article carries typed JSON frontmatter. The parser rejects the file rather
than defaulting, so a malformed article fails the build instead of publishing
half-formed.

## 3. The publication gate

This is the part that matters most, because the request was explicit that the 50
additional articles stay out of the index until approved.

Drafts are gated by `isPublicPost()`, which `generateStaticParams` uses. With
`dynamicParams = false`, an unlisted slug produces **no route at all** — not a
404 page, not a redirect, nothing. There is no URL to discover.

`npm run build` runs `scripts/validate-content.mjs` against the exported `out/`
directory. It re-parses the frontmatter from source rather than importing the
site's own filter, so a bug in the filter cannot also silence the check meant to
catch it. It fails the build on:

- a draft exported to `out/blog/<slug>/`
- a draft in `sitemap.xml` or the RSS feed
- a draft URL linked from *any* exported page
- a published article missing from the export, sitemap or feed
- a published article marked `noindex`
- a `noindex` page listed in the sitemap
- any broken internal link

**Result: `validate-content OK — 21 published, 54 unpublished, 68 pages`.**

Verified independently of that gate — 54 draft slugs checked against every
emitted route directory, `sitemap.xml`, `blog/rss.xml`, `llms.txt`, and the full
text of all 68 HTML files: **no leaks**, 21 blog routes emitted.

All 54 drafts also carry `"noindex": true` and `"status": "draft"` in
frontmatter, so the flag is right if one is ever published by mistake.

Releasing a draft means completing the nine steps in
[`content-review-process.md`](./content-review-process.md), including
re-verifying its sources and app claims. Moving a date on the schedule is not
publishing.

## 4. Keyword map

`npm run keywords` → **75 articles, 828 unique terms**, written to
[`keyword-map.csv`](./keyword-map.csv) with 14 columns.

No search volume, difficulty, CPC, competition figure or traffic projection
appears anywhere. Every term is tagged with a qualitative demand tier explicitly
labelled an estimate, and
[`keyword-verification-needed.md`](./keyword-verification-needed.md) lists what
needs checking in Keyword Planner, Semrush or Ahrefs before anyone relies on it.

Primary-keyword collisions are rejected at build time across all 75 articles,
drafts included. The 10 remaining overlaps are all secondary or long-tail, and
all follow the intended hub-and-spoke shape: a cornerstone's broad secondary term
is a deeper draft's primary. `how much protein per day` is the one worth watching
at publication time, and the report flags it.

## 5. Internal linking

`npm run report:links` → **68 pages, 0 broken, 0 thin, 0 deeper than 3 clicks.**

One orphan: the intentional `/apps/82-0-pro-basketball-draft/` redirect stub.

`/editorial-policy/` was orphaned until this pass — it is cited by `llms.txt` and
by the `author.url` in every article's JSON-LD, but nothing linked to it. It is
now in the footer.

Twenty-five anchor texts point at more than one destination. Two kinds:

- Category names that exist in both the app and blog trees. Genuinely ambiguous
  in isolation, disambiguated by their section.
- Card CTAs — "read →" (21 links) and "learn more →" (21 links). These are
  visually repeated but each carries a unique `aria-label` (`Read {title}`,
  `Learn more about {app}`), so the accessible name is distinct. The report reads
  visible text, which is why they appear.

## 6. Analytics and attribution

The existing GA4 property `G-JK8FPQB5L2` is untouched. Verified:

- exactly **one** tag source (`GoogleAnalytics.tsx`), mounted once in the root
  layout — no second gtag snippet, no GTM container
- exactly **one** `play_store_click` fire site (`analytics.ts:106`), reached only
  through `PlayStoreLink`
- page views sent manually with `send_page_view: false`, deduped on
  `pathname + search`

Blog CTAs attribute installs through a single percent-encoded `referrer`
parameter carrying `utm_source=reigncreative_blog`,
`utm_medium=organic_content`, `utm_campaign=<app-slug>`,
`utm_content=<article-slug>`. No user id, email, device id or session id appears
in any URL — only public slugs.

Full measurement plan, including the GA console setting that must stay off, is in
[`analytics-measurement.md`](./analytics-measurement.md).

## 7. Technical SEO and AI search

- `sitemap.xml`, `blog/rss.xml`, `llms.txt` — all generated from the same `posts`
  collection the routes use, so none can advertise a draft
- `robots.txt` explicitly allows `OAI-SearchBot`, `ChatGPT-User`,
  `Claude-SearchBot`, `Claude-User` and `PerplexityBot`. Training-only crawlers
  (GPTBot, ClaudeBot, CCBot) were **not** silently changed — they inherit the
  site-wide `Allow` that was already there, and the file says so
- Structured data: Organization, WebSite, SoftwareApplication, BreadcrumbList,
  BlogPosting, FAQPage
- **No `aggregateRating` anywhere.** No review markup, no invented offers
- `SoftwareApplication` emits an `Offer` only for free apps, from the same field
  the visible Price row reads
- `BlogPosting.author` names "Reign Creative Team" to match the visible byline
  exactly, and points at `/editorial-policy/`

## 8. Accuracy posture

The Google Indexing API was **not** used for articles. It is not eligible for
this content type.

What the writing deliberately does not claim:

- **Health.** Sources are federal or equivalent — NIH, NIDDK, NIMH, NIA,
  MedlinePlus, FDA, National Academies. Eight articles carry a visible medical
  disclaimer. No diagnosis, no prescription, no weight-loss promise. No "optimal
  ketosis" range or GKI target, because no federal source publishes one
- **Brain training.** `working-memory-and-training` cites the skeptical
  literature — two meta-analyses finding no convincing far transfer, plus the
  dissenting positive n-back meta-analysis — and the FTC's $2M Lumosity
  settlement. It states outright: "We do not make that claim about our app, and
  the published evidence does not support making it"
- **Language.** All speaker-population figures were dropped for lack of a citable
  source. Khmer diacritic names and the Cantonese tone table are flagged for
  native-speaker review rather than presented as settled
- **Sports.** Zero real player, team or league names. Simulation outputs are
  described as scores assigned by a model under its own assumptions, explicitly
  not predictions and not betting guidance
- **App features.** Every capability claim traces to the catalog. The
  spaced-repetition article names the review modes the apps actually have and
  then says what they do not: "What it does not give you is a per-item scheduler
  computing an optimal next review date, and we are not going to claim it does"
- **No expert review is claimed anywhere**, because none was performed

## 9. Competitor comparisons

Four articles, all `status: draft`, all with `researchDate: 2026-08-09`.

Each carries an ownership disclosure naming us as the maker of one of the
compared apps, plus a trademark notice. No competitor logos, screenshots or trade
dress. No competitor Play Store links. No invented pricing, ratings or features —
where a fact could not be verified from a primary source it was omitted, not
estimated. Competitors that could not be fetched at all were dropped rather than
described from memory.

## 10. Build and quality

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | exit 0 |
| `npm run build` | 75 static pages, validate-content OK |
| `npm run audit:catalog` | 21 apps / 21 verified / 7 categories |
| `npm run report:links` | 0 broken, 0 thin, 0 too deep |
| Draft leak (independent check) | none |
| Frontmatter sweep, all 75 | 0 problems |
| First Load JS (shared) | 87.4 kB |
| Heaviest route | `/apps` at 167 kB |

Eight client components; everything else is a server component. All `<img>`
elements have `alt`. Filter controls use `aria-pressed`, result counts use
`aria-live="polite"`, motion respects `prefers-reduced-motion`.

## 11. Needs a human before it matters

These are not blockers for the cornerstone launch. They are blockers for
publishing specific drafts.

1. **Keyword data.** Everything in the map is an unverified estimate. Check the
   terms listed in `keyword-verification-needed.md` in a real tool before
   planning around them.
2. **CDC DKA URL.** Kept in `what-is-a-ketone-reading` because MedlinePlus cites
   that exact URL, but it returns 403 to scripted requests. Open it in a browser.
3. **URLs flagged by the arcade batch:** RogueBasin Berlin Interpretation, Google
   Play data-safety help, Apple QuickTime file format, Adobe Flash EOL, Android
   PGS overview.
4. **Khmer script details.** Diacritic names and functions (`៉` musikatoan, `៊`
   triisap, `់` bantoc, `៍` toandakhiat, `៌` robat) and the punctuation set come
   from Unicode chart annotations. A Khmer reader should confirm before this
   publishes.
5. **Cantonese tone table.** Descriptions differ between references; the article
   says so, but a fluent speaker should still read it.
6. **GA console.** Admin → Data Streams → Enhanced measurement → "Page changes
   based on browser history events" must stay **off**, or all traffic numbers
   double.

## 12. Recommended next step

Launch the 21 cornerstone articles. Leave roughly two weeks before the first
draft batch so there is a baseline to measure against, then work through
[`publishing-schedule.md`](./publishing-schedule.md) — five articles per batch,
each batch approved on its own merits, running the checks between batches.

A batch that is not ready does not ship. The schedule slips instead.
