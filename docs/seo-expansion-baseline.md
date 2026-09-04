# SEO expansion — repository baseline

The state of the repository **before** the September 2026 content and catalog
expansion. Every number here was counted from the working tree at commit
`7628c3e` (`Improve SEO authority and publish 15 additional articles`), not
estimated.

Measured **2026-09-03**, branch `main`, upstream `origin/main`, working tree
clean at the point of measurement.

## 1. Content counts as found

| | Count |
| --- | ---: |
| Article files in `content/blog/` | 75 |
| `"status": "published"` with a past `publishedAt` | 36 |
| Gated (`"status": "draft"`, `"noindex": true`) | 39 |
| App pages (`/apps/<slug>/`) | 21 |
| App category pages | 7 |
| Blog category pages (categories with ≥1 published article) | 7 |
| URLs in `sitemap.xml` | 81 |
| Items in `blog/rss.xml` | 36 |
| Retired-but-kept URL, excluded from sitemap | 1 (`/apps/82-0-pro-basketball-draft/`) |

`sitemap.xml` decomposes as 10 static pages + 7 app category pages + 21 app
pages + 7 blog category pages + 36 articles.

### Published-article distribution by category

| Category | Published |
| --- | ---: |
| sports-gm | 12 |
| language-learning | 8 |
| anime-creative | 4 |
| education-brain | 4 |
| health-nutrition | 4 |
| action-arcade | 3 |
| video-utility | 1 |

### Gated drafts by category

| Category | Drafts |
| --- | ---: |
| sports-gm | 14 |
| language-learning | 8 |
| health-nutrition | 6 |
| action-arcade | 4 |
| video-utility | 3 |
| education-brain | 2 |
| anime-creative | 2 |

All 39 drafts are complete articles between roughly 1,400 and 2,700 words, with
JSON frontmatter, FAQs, takeaways and cited sources already present. None is an
outline or a stub.

## 2. Architecture as found

- **Content model.** `content/blog/*.md` with a JSON frontmatter block. Parsed
  and validated at build time by `src/lib/blog/index.ts`, which rejects missing
  fields, over-length metadata, unknown app or category references, self-links,
  broken `relatedArticles` references and duplicate `primaryKeyword` values.
- **Publication gate.** Three independent mechanisms, documented in
  `docs/content-review-process.md`: the `posts` collection filters through
  `isPublicPost()`; `generateStaticParams()` with `dynamicParams = false` means
  a draft slug has no route at all; and `scripts/validate-content.mjs` fails the
  build if a draft leaks into `out/`, the sitemap, the feed or any link.
- **App catalog.** `src/data/apps/catalog/*.ts`, one file per category, with a
  `VerifiedPlayFacts` group that may only be written by
  `scripts/verify-play-listings.mjs` from the live Play listing.
  `scripts/audit-catalog.mjs` cross-checks the catalog against that capture and
  fails on any drift.
- **Analytics.** GA4 `G-JK8FPQB5L2`, manual `page_view` on route change,
  `play_store_click` from the shared `PlayStoreLink` component, production
  hostname gating in `src/lib/analytics.ts`.
- **Output.** Next.js 14 static export (`output: 'export'`, `trailingSlash: true`),
  deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`.

## 3. Existing reports carried forward, not replaced

`docs/` already contains an authority audit, a keyword-verification backlog, an
internal-linking report, a content-consolidation analysis, an analytics
measurement plan, a content spec, a review process and a publishing schedule.
This expansion **adds** to that set. Nothing in the previous audits was deleted
or rewritten; where a number changed, the new report records the new number and
says which document it supersedes.

## 4. Unresolved verification flags found in previous reports

From `docs/deliverables.md` § "Needs a human before it matters", plus
`docs/keyword-verification-needed.md`.

| # | Flag | Status after this pass |
| --- | --- | --- |
| 1 | Every keyword term in the map is an unverified estimate; no tool data exists | **Partly addressed.** 1,015 real Google Autocomplete observations were collected and dated (`docs/data/search-intent-observations.json`). Autocomplete evidences phrasing and intent, not volume. No volume, difficulty or CPC figure is published anywhere on the site or in these docs. |
| 2 | CDC diabetic-ketoacidosis URL returns 403 to scripted requests | **Resolved.** Fetched successfully; page title *Diabetic Ketoacidosis \| Diabetes \| CDC*. Retained. |
| 3 | Five URLs flagged by the arcade batch (RogueBasin Berlin Interpretation, Play data-safety help, Apple QuickTime file format, Adobe Flash EOL, Android PGS overview) | **Resolved.** All five resolve. Android PGS overview confirmed as *Google Play Games Services overview*. |
| 4 | Khmer diacritic names taken from Unicode chart annotations, not reviewed by a Khmer reader | **Still open — disclosed on the page.** The article now names the source of those glosses in the body and states that a Khmer reader has not reviewed them. |
| 5 | Cantonese tone table descriptions differ between references | **Still open — disclosed on the page.** The article already tells the reader to treat any tone table, including its own, as a map rather than a measurement. |
| 6 | GA4 Enhanced Measurement "page changes based on browser history events" must stay off | **Still open — console setting, not a repository change.** Unchanged by this pass. |

### Broken sources found and fixed in this pass

Both were genuinely unreachable, and both were replaced with primary sources
that were verified to resolve on 2026-09-03.

| Article | Was | Now |
| --- | --- | --- |
| `spaced-repetition-for-language-learning` | `psychclassics.yorku.ca/Ebbinghaus/` — TLS chain does not verify | Ebbinghaus, *Memory* (1885, Ruger & Bussenius translation) on the Internet Archive |
| `world-history-timeline-guide` | `digitalarchive.wilsoncenter.org` — DNS does not resolve | *Foreign Relations of the United States*, Office of the Historian, U.S. Department of State |

### False negatives in the automated link check

`developer.android.com` URLs fail from Node's `fetch` in this environment with a
transport error rather than an HTTP status. All of them were confirmed live by
an independent fetch. They are recorded here so a future reader does not remove
a working citation on the strength of a local network artefact.

## 5. Content overlap found in the existing set

`docs/keyword-verification-needed.md` already lists secondary-keyword overlaps.
Primary-keyword collisions cannot exist, because the build rejects them. The
overlaps that matter for intent, rather than for a single term, are:

| Pair | Overlap | Disposition |
| --- | --- | --- |
| `how-much-protein-per-day` / `how-to-track-protein-intake` | Both touch daily protein targets | Distinct: one answers *how much*, the other answers *how to log it*. Kept. |
| `cantonese-tones-explained` / `learn-cantonese-beginners-guide` | Tone material appears in both | Distinct: the guide introduces tone in one section; the tone article is the deep treatment. Kept, with the guide linking out. |
| `learn-thai-script-beginners-guide` / `thai-tones-explained` | Consonant classes appear in both | Same pattern as Cantonese. Kept. |
| `learn-malay-beginners-guide` / `malay-vs-indonesian-differences` | Malay/Indonesian comparison in both | Kept; the guide states the difference briefly and links to the comparison. |
| `best-offline-sports-games-android` / `sports-gm-games-without-internet` | Both about offline play | Narrowest genuine overlap in the set. Retargeted during this pass so one covers the category and the other covers the GM subgenre specifically. |

## 6. Incorrect app claims found

Found by re-running `scripts/verify-play-listings.mjs` against the live store on
2026-09-03 and diffing against the catalog.

| Claim in repository | Live listing on 2026-09-03 | Action |
| --- | --- | --- |
| App name "Basketball Draft GM Franchise" | "Pro Basketball GM Franchise" | Renamed across the catalog, 14 articles and the keyword map |
| App name "38-0 Football Draft XI Soccer" | "38-0-0 Pro Football GM Soccer" | Renamed across the catalog, articles and keyword map |
| `zombie-survival-last-survivor`: no in-app purchases | In-app purchases present | Flag flipped; three articles and the catalog FAQ corrected |
| `mma-boxing-fight-draft`: no in-app purchases | In-app purchases present | Flag flipped; two articles, an audience bullet, a FAQ and a meta description corrected |
| `learn-malay`: no in-app purchases | In-app purchases present | Flag flipped; three articles and the catalog FAQ corrected |
| Catalog contained 21 apps | 29 public listings exist under Reign Collective Apps | 8 apps added — see `docs/published-app-inventory.md` |

## 7. What this baseline is used for

Every "after" number in `docs/seo-expansion-final-report.md` is reconciled
against the table in § 1. If a count in the final report does not follow from
this baseline plus a documented change, that is a defect in the report.
