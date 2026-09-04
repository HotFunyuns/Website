# SEO expansion — final report

The September 2026 content and catalog expansion, from baseline to deploy.

Completed **2026-09-04** (America/Los_Angeles). Baseline measured at commit
`7628c3e`.

Every number here was counted from the repository or the built output. Where a
figure could not be obtained, this report says so rather than estimating it.

---

## 1. Starting and final counts

| | Before | After | Change |
| --- | ---: | ---: | ---: |
| Published articles | 36 | **175** | +139 |
| Gated drafts | 39 | **0** | −39 |
| Article files on disk | 75 | 175 | +100 |
| App pages | 21 | **29** | +8 |
| App category pages | 7 | 7 | — |
| Blog category pages | 7 | 7 | — |
| Exported HTML pages | — | 231 | — |
| URLs in `sitemap.xml` | 81 | **228** | +147 |
| Items in `blog/rss.xml` | 36 | **175** | +139 |
| Total words across articles | — | 225,270 | — |
| Source citations | — | 507 | — |
| FAQ entries | — | 930 | — |
| JSON-LD blocks | — | 1,105 | — |

**Public article routes increased by exactly 139**, matching the target. The
sitemap gained 147 because it also picked up the 8 new app pages.

Sitemap decomposition: 10 static + 7 app categories + 29 apps + 7 blog
categories + 175 articles = 228.

## 2. Complete article inventory

The full inventory — every article with its slug, category, associated app,
primary intent and word count — is in
[`docs/article-inventory.md`](./article-inventory.md), generated from frontmatter
so it cannot disagree with the content. It contains:

- the **39 previously gated drafts** released;
- the **100 newly written articles**;
- the **36 articles** published before this pass, with original dates preserved.

## 3. Associated app and category for every article

In the inventory above, and in
[`docs/keyword-to-url-map.md`](./keyword-to-url-map.md).

Every one of the 29 apps is the primary app for at least two articles. Coverage
ranges from 14 articles (Protein Diet Tracker) to 2 (Learn Cambodian, Speak
Khmer). No app received articles merely to reach a count; distribution follows
the subject areas that had genuine unanswered questions.

| Category | Articles |
| --- | ---: |
| sports-gm | 64 |
| language-learning | 36 |
| health-nutrition | 23 |
| action-arcade | 15 |
| education-brain | 14 |
| video-utility | 12 |
| anime-creative | 11 |

## 4. Primary search intent and keyword cluster

Per article in [`docs/keyword-to-url-map.md`](./keyword-to-url-map.md);
distribution and cluster structure in
[`docs/search-intent-and-cannibalization-map.md`](./search-intent-and-cannibalization-map.md)
and [`docs/keyword-research-100.md`](./keyword-research-100.md).

175 articles, 175 distinct primary keywords. The build fails on a collision, so
this cannot drift.

## 5. Evidence for every claimed trend or search-volume metric

**No search-volume, difficulty or CPC figure is claimed anywhere on this site or
in these documents.** That is the finding, not an omission.

| Source | Available? | Obtained |
| --- | --- | --- |
| Google Search Console | No — no credentials in this environment | Nothing |
| Google Trends | No — HTTP 429 on every request | Nothing |
| Google Ads Keyword Planner | No — no authenticated access | Nothing |
| Commercial SEO provider | No — no subscription | Nothing |
| **Google Autocomplete** | **Yes** | 1,015 suggestions, 120 seeds, US/English, 2026-09-04 |
| **First-party Play listings** | **Yes** | 29 listings verified 2026-09-04 |

Autocomplete evidences **phrasing and intent**, not demand size. Raw data:
`docs/data/search-intent-observations.json`. Method and limits:
[`docs/keyword-research-100.md`](./keyword-research-100.md).

`docs/keyword-verification-needed.md` now registers **1,820 unique terms across
175 articles**, all marked unverified, for checking in a real tool.

## 6. Apps added to the website

Eight published Google Play listings had no presence on this site. All eight were
verified public, signed out, on 2026-09-04, and added with a full app page,
catalog record, category placement, `SoftwareApplication` and `BreadcrumbList`
JSON-LD, a tracked Play CTA and internal links.

| App | Package ID | Site page |
| --- | --- | --- |
| Baseball Career Sim 2026 | `com.reigncreative.baseballmycareer` | `/apps/baseball-career-sim/` |
| Football Career Sim 2026 | `com.reigncreative.footballmycareer` | `/apps/football-career-sim/` |
| Hockey Career Sim 2026 | `com.reigncreative.hockeymycareersimulator` | `/apps/hockey-career-sim/` |
| Football Career Soccer XI Sim | `com.reigncreative.soccermycareersim` | `/apps/soccer-career-sim-xi/` |
| Golf Career Simulator Pro Tour | `com.reigncreative.golfmycareersimulator` | `/apps/golf-career-simulator/` |
| Learn Vietnamese Language Fast | `com.reigncreative.learnvietnameselanguage` | `/apps/learn-vietnamese/` |
| Learn Lao Language Fast & Easy | `com.reigncreative.learnlaolanguage` | `/apps/learn-lao/` |
| Learn Italian for Beginners | `com.reigncreative.learnitalianlanguage` | `/apps/learn-italian/` |

**The app the brief named specifically — `com.reigncreative.baseballdraft162`,
162-0 Baseball Draft & GM Team — was already on the site.** It was re-verified
public on 2026-09-04 and no duplicate page was created.

Full inventory of all 29: [`docs/published-app-inventory.md`](./published-app-inventory.md).

### Facts corrected against the live store

| App | Repository said | Store says | Fixed in |
| --- | --- | --- | --- |
| `pro-basketball-draft-gm-mode` | "Basketball Draft GM Franchise" | "Pro Basketball GM Franchise" | Catalog + 14 articles + keyword map |
| `soccer-draft-gm-xi` | "38-0 Football Draft XI Soccer" | "38-0-0 Pro Football GM Soccer" | Catalog + articles + keyword map |
| `zombie-survival-last-survivor` | No in-app purchases | Has in-app purchases | Flag + 3 articles |
| `mma-boxing-fight-draft` | No in-app purchases | Has in-app purchases | Flag + 2 articles + FAQ + meta description |
| `learn-malay` | No in-app purchases | Has in-app purchases | Flag + 3 articles |

Site URLs for the two renamed apps were **not** changed. A slug is a permanent
address.

## 7. Apps excluded, and why

**None.** Every Google Play listing that resolved publicly was added.

[`docs/excluded-google-play-listings.md`](./excluded-google-play-listings.md)
records all 91 candidate package IDs probed and not found, so the search is
reproducible. Nothing was excluded on editorial grounds.

**Limitation, stated plainly:** Google Play exposes no endpoint that enumerates a
developer's full portfolio. The public developer page returns only 20 titles and
returned the same 20 across every region tested. The inventory was assembled from
four independent passes — existing catalog, developer page, a crawl of
"more by this developer" links, and 120 pattern-derived probes. It found 8
missing apps and **cannot prove completeness**. Owner action: compare the
inventory against Play Console.

## 8. Google Play URLs and package IDs used

All 29, with verification results, in
[`docs/published-app-inventory.md`](./published-app-inventory.md). Raw capture:
`scripts/play-verification.json` (`verifiedAt` 2026-09-04T06:23Z).

Every URL is `https://play.google.com/store/apps/details?id=<package>`. Article
CTAs append a percent-encoded `referrer` carrying `utm_source=reigncreative_blog`,
`utm_medium=organic_content`, `utm_campaign=<app slug>`,
`utm_content=<article slug>`. Nothing identifying a person is included.

## 9. Keyword-to-URL map

[`docs/keyword-to-url-map.md`](./keyword-to-url-map.md) — 175 articles, 175
distinct primary keywords, grouped by category, with intent, URL, primary app
and word count.

## 10. Cannibalisation report

[`docs/search-intent-and-cannibalization-map.md`](./search-intent-and-cannibalization-map.md).

Similarity is IDF-weighted across the corpus of primary keywords, so a shared
generic word ("learn", "explained") counts for little and a shared distinctive
one counts for a lot. A naive token overlap flagged 154 pairs, almost all of them
false — "learn lao for beginners" and "learn malay for beginners" share three of
four tokens and are not the same query.

**Result: 30 pairs exceed the threshold. All 30 are parallel series** — each
keyword contains a content token the other lacks, so they name different
subjects. **Zero pairs are subset relations**, which is the shape that would
indicate one page absorbing another's query.

Four independent mechanisms prevent duplication reaching production:

1. Duplicate `primaryKeyword` → **build failure**.
2. Duplicate category + intent + normalised keyword → **pre-flight failure**.
3. Near-duplicate title at 85% token overlap → **pre-flight failure**.
4. Duplicate rendered `<title>`, meta description or canonical → **output audit
   failure**.

## 11. Competitor and source verification

**224 unique external URLs across 175 articles, all verified on 2026-09-04.**

| Verdict | Count |
| --- | ---: |
| Resolved directly | 211 |
| Browser-only (confirmed live by independent fetch) | 13 |
| **Failed** | **0** |

The 13 browser-only URLs are on hosts that block scripted requests
(`developer.android.com`, `ods.od.nih.gov`, `whc.unesco.org`,
`britishmuseum.org`, `coe.int`, `loc.gov`). Each was confirmed live separately
and the host list is recorded in `scripts/check-sources.mjs` so a future run does
not delete a working citation on the strength of a local network artefact.

### Broken sources found and replaced

| Article | Was | Now |
| --- | --- | --- |
| `spaced-repetition-for-language-learning` | `psychclassics.yorku.ca/Ebbinghaus/` — TLS chain does not verify | Ebbinghaus, *Memory* (1885) on the Internet Archive |
| `world-history-timeline-guide` | `digitalarchive.wilsoncenter.org` — DNS does not resolve | *Foreign Relations of the United States*, Office of the Historian |

### Competitor claims re-verified

All four comparison articles had every competitor claim re-checked against the
vendor's own current pages before `researchDate` was moved to 2026-09-03:
MyFitnessPal, Cronometer, Carb Manager, Duolingo, Memrise, Pimsleur, Anki, VLC.

Two claims had drifted and were corrected: Cronometer Gold's feature list gained
two entries, and Duolingo's course description was rewritten to quote the
current page rather than a stale paraphrase.

Each comparison carries an ownership disclosure, a trademark notice and a visible
research date. No competitor logos, screenshots or trade dress appear anywhere.

## 12. Old-article optimisation

All 75 pre-existing articles were audited. Changes made:

| Change | Articles |
| --- | ---: |
| App name corrected after a store rename | 14 |
| In-app purchase claim corrected | 8 |
| Second contextual article link added (was 1, needs 2+) | 10 |
| Additional authoritative source added | 4 |
| Broken source replaced | 2 |
| Uncertainty disclosure strengthened | 1 |
| Trademark disclosure added | 7 |

The three articles the brief named specifically were all strengthened:

- **`how-to-build-a-balanced-basketball-roster`** — added FIBA's rule-book
  downloads page, which is the primary source for the 5 × 40 = 200
  player-minutes arithmetic the article's central argument rests on.
- **`basketball-positions-explained`** — added the same primary source for the
  claim that positions are a coaching convention rather than a rule.
- **`soccer-formations-explained`** — added IFAB Law 3 (The Players) and Law 11
  (Offside), the two laws the article's reasoning actually depends on.

`updatedAt` was moved for the **15 articles that were meaningfully revised**, and
left alone for the rest. `publishedAt` was never changed on any pre-existing
article. `scripts/stamp-dates.mjs` refuses to backdate or to set `updatedAt`
before `publishedAt`.

## 13. Internal linking

[`docs/internal-linking-report.md`](./internal-linking-report.md), regenerated
from the built output.

| Metric | Result |
| --- | ---: |
| Exported pages | 231 |
| Broken internal links | **0** |
| Orphan pages | 1 |
| Thinly linked pages (1–2 inbound) | **0** |
| Pages more than 3 clicks deep | **0** |
| Anchor texts pointing at more than one destination | 22 |

The single orphan is `/apps/82-0-pro-basketball-draft/`, the retired URL for a
renamed app. It is deliberately unlinked and deliberately excluded from the
sitemap: it exists to redirect old inbound links, not to be found.

Every article links its primary app page, its category, and two to five related
articles — enforced by pre-flight, which fails an article linking fewer.

## 14. Structured data

[`docs/structured-data-report.md`](./structured-data-report.md).

1,105 JSON-LD blocks across 231 pages, all parsing and all valid:

| Type | Blocks |
| --- | ---: |
| Organization | 231 |
| WebSite | 231 |
| BreadcrumbList | 218 |
| FAQPage | 204 |
| BlogPosting | 175 |
| SoftwareApplication | 29 |
| CollectionPage | 15 |
| Blog | 1 |
| WebPage | 1 |

`scripts/validate-structured-data.mjs` fails the audit on `aggregateRating`,
`review`, `reviewCount`, `ratingValue` or `award`, and enforces that every FAQ
question and every citation URL is visible on the page.

Google's Rich Results Test needs a live URL, so it runs after deploy.
Representative URLs are listed in the structured-data report.

## 15. Google spam-policy compliance

[`docs/google-spam-compliance-audit.md`](./google-spam-compliance-audit.md) —
every policy area, with the mechanism that enforces it.

**One issue was found and fixed.** The retired app URL used a zero-delay
`<meta http-equiv="refresh">`, which can leave that URL in the session history
and turn Back into a loop. It now uses `location.replace()`, which replaces the
current entry rather than adding one. `audit-output.mjs` fails the audit if a
meta refresh, an inline navigation handler, or a first-party `pushState`,
`popstate` or `beforeunload` handler reappears.

**One residual risk is recorded rather than resolved.** Publishing 139 articles
in one day is a release pattern that can attract site-level scrutiny regardless
of individual page quality. The previous audit in this repository recommended a
ten-batch drip for that reason. That recommendation was superseded by an explicit
instruction to publish everything in this pass; the instruction was followed and
the risk is documented in the compliance audit § 1 and in
[`docs/publishing-schedule.md`](./publishing-schedule.md), along with what to
watch and what to do if indexing goes badly.

## 16. AI crawler and robots report

`public/robots.txt` is unchanged in policy and verified by `audit-output.mjs`,
which fails if any of these is missing or if a site-wide `Disallow` appears:

```
User-agent: OAI-SearchBot   Allow: /
User-agent: ChatGPT-User    Allow: /
User-agent: Claude-SearchBot Allow: /
User-agent: Claude-User     Allow: /
User-agent: PerplexityBot   Allow: /
Sitemap: https://reigncreativellc.com/sitemap.xml
```

**Training-only crawlers were not touched.** GPTBot, ClaudeBot and CCBot are
deliberately given no rules of their own and continue to inherit the site-wide
`Allow: /` that was already this site's default. Changing a training preference
is an owner decision, and none was requested.

Nothing else blocks retrieval: the site is a static export with no middleware, no
authentication, no rate limiting and no bot protection. The CSP in `vercel.json`
governs what the browser may load, not what a crawler may fetch. `llms.txt` is
generated from the same `posts` collection as the routes, so it cannot advertise
a draft; it supplements crawlable HTML rather than replacing it.

## 17. Sitemap and RSS

| | URL | Count |
| --- | --- | ---: |
| Sitemap | `https://reigncreativellc.com/sitemap.xml` | 228 |
| RSS | `https://reigncreativellc.com/blog/rss.xml` | 175 |
| robots | `https://reigncreativellc.com/robots.txt` | — |
| llms.txt | `https://reigncreativellc.com/llms.txt` | — |

Zero duplicate `<loc>` entries. `lastModified` is derived from a real recorded
date — an app's `lastVerified` or an article's `updatedAt` — never from build
time. The Search Console sitemap URL is unchanged, and no ping or resubmission
was sent.

## 18. Analytics

`scripts/audit-analytics.mjs`, run against the built output:

| Check | Result |
| --- | --- |
| Google Play CTAs | 1,067 |
| Rendered by the tracked `PlayStoreLink` component | **1,067 (100%)** |
| Carrying install-referrer attribution | 525 |
| GA4 properties configured | **1 — `G-JK8FPQB5L2`** |
| Hard-coded analytics loaders in HTML | 0 |
| Malformed or identifying referrer values | 0 |

`play_store_click` fires **exactly once** per click: `PlayStoreLink` attaches one
`onClick` that calls `trackPlayStoreClick` once and never calls
`preventDefault()`, so the browser handles the navigation normally and the event
is queued before the new tab opens. The audit asserts the structural
precondition — that no Play link bypasses that component.

Parameters sent: `button_location`, `link_url`, `page_path`, `app_name`,
`article_slug`, `link_text`. `link_text` strips `sr-only` content, so the
accessibility affordance does not pollute the value. No personally identifying
data is included.

**One navigation, one page view.** `send_page_view: false` on the `config` call,
manual `page_view` on route change, and a `lastPageViewPath` guard that suppresses
a duplicate for the same path.

**Unchanged owner action:** GA4 Admin → Data Streams → Enhanced measurement →
"Page changes based on browser history events" must stay **off**, or every
navigation is counted twice.

## 19. Performance and accessibility

| Metric | Value |
| --- | --- |
| Exported pages | 231 |
| First Load JS (shared) | 87.4 kB |
| Total JS shipped | 1,008 kB across 33 files |
| Median page HTML | 105 kB |
| Largest page HTML | 2,589 kB (`/blog/` index, which lists all 175 articles) |
| Images | 61 files, 5.2 MB |
| Images without `alt` | **0 of 956 rendered** |
| Images without `width`/`height` | **0 of 956 rendered** |

Every article is statically generated: the full text is in the HTML, with no
content behind hydration. Client components are limited to the analytics
bootstrap, the two explorer filters, the contact form, the table of contents and
the legacy redirect.

Accessibility properties verified in the output: one `<h1>` per indexable page,
semantic landmarks, breadcrumb `nav` with `aria-label`, `aria-pressed` on filter
controls, `aria-live="polite"` on result counts, descriptive link text on every
CTA plus an `sr-only` note that the link opens a new tab, and
`prefers-reduced-motion` respected through `MotionConfig reducedMotion="user"`.

**Not measured in this pass:** Core Web Vitals (LCP, INP, CLS) as field data.
Those require real users on the live site and appear in Search Console's Core
Web Vitals report and in CrUX once traffic accumulates. No synthetic score is
quoted here, because a lab number is not the metric Google uses.

## 20. Files changed

| Area | New | Modified |
| --- | ---: | ---: |
| Articles (`content/blog/`) | 100 | 54 |
| App catalog (`src/data/apps/catalog/`) | 0 | 7 |
| Components (`src/components/`) | 1 | 0 |
| Pages (`src/app/`) | 0 | 1 |
| Scripts (`scripts/`) | 11 | 4 |
| Docs (`docs/`) | 10 + 2 data files | 4 |
| Icons (`public/icons/`) | 16 | 0 |
| `package.json` | — | 1 |

### New scripts

| Script | Purpose |
| --- | --- |
| `collect-search-intent.mjs` | Google Autocomplete evidence, dated and reproducible |
| `search-intent-seeds.json` | The 120 seeds |
| `check-sources.mjs` | Every external URL in every article |
| `preflight-articles.mjs` | Editorial gate — banned claim shapes, structure, metadata, linking |
| `publish-drafts.mjs` | Publication field changes, gated on a clean pre-flight |
| `stamp-dates.mjs` | Date stamping that refuses to backdate |
| `audit-output.mjs` | Technical SEO and navigation integrity of the built HTML |
| `validate-structured-data.mjs` | JSON-LD validity and visibility |
| `audit-analytics.mjs` | Play CTA and GA4 integrity |
| `build-seo-reports.mjs` | Keyword map, cannibalisation map, schema report |
| `build-article-inventory.mjs` | The full article inventory |

## 21. Commands and tests run

```
npx tsc --noEmit                      exit 0
npx next lint                         no warnings or errors
npm run build                         231 pages; validate-content OK
npm run audit:content                 175 articles, pre-flight clean
npm run audit:catalog                 29 apps / 29 verified / 7 categories
npm run audit:output                  228 indexable, 0 duplicates, clean
npm run audit:schema                  1,105 JSON-LD blocks, valid
npm run audit:analytics               1,067 CTAs, 1 GA4 property, clean
npm run report:links                  0 broken, 0 thin, 0 too deep
npm run audit:sources                 224 URLs, 0 failures
npm run verify:play                   29/29 listings verified public
npm run keywords                      1,820 terms registered
```

`npm run audit:all` chains the six repeatable audits.

## 22. Production build

`next build` succeeded. 231 pages exported. `validate-content.mjs` reports
**175 published, 0 unpublished, 231 pages** — zero draft leaks into HTML, the
sitemap, the feed or any link.

## 23. Commit and branch

Recorded at the end of this document after the push, along with the deployment
result.

## 24. Deployment

Recorded at the end of this document.

## 25. Facts requiring owner review

1. **App inventory completeness.** Eight missing apps were found, and Google Play
   provides no way to prove the list is now complete. Compare
   `docs/published-app-inventory.md` against Play Console.
2. **Apps in testing or pre-registration.** If any exist, add their package IDs
   to `MUST_NOT_BE_PUBLIC` in `scripts/verify-play-listings.mjs` so every future
   verification run asserts they have not leaked to the site.
3. **GA4 Enhanced Measurement.** "Page changes based on browser history events"
   must remain **off**.
4. **Khmer diacritic names.** Taken from Unicode chart annotations. The article
   now says so in the body and states that no Khmer reader has reviewed it. A
   Khmer speaker should confirm.
5. **Cantonese tone table.** Descriptions differ between references; the article
   says so. A fluent speaker should still read it.
6. **Language articles generally.** None has been reviewed by a native speaker,
   and each says so. If a reviewer becomes available, the Vietnamese, Lao and
   Italian articles are the newest and least scrutinised.
7. **Keyword terms.** All 1,820 remain unverified against any tool.
8. **Two GitHub Actions workflows** both build and deploy to Pages on push to
   `main` (`deploy.yml` and `nextjs.yml`). This predates this pass. They may race,
   and one may report a failure while the other succeeds — worth consolidating to
   one, but not changed here because it was not part of the brief.

## 26. Known limitations

- **No search-volume data of any kind.** Search Console, Trends, Keyword Planner
  and commercial providers were all unavailable. Autocomplete evidences phrasing,
  not demand.
- **No SERP data.** Competing pages were not enumerated, because obtaining that
  data would require either a licence this project does not have or scraping
  Google. The content-gap report says what was actually observed instead.
- **No field performance data.** Core Web Vitals need real traffic.
- **No professional review of any content.** No article is medically,
  linguistically or legally reviewed, and every article in a category where that
  matters says so.
- **The release pattern.** 139 articles in one day, discussed in § 15.
- **Nothing here guarantees an outcome.** No ranking, indexing, traffic, click,
  AI citation or install is promised, and none can be.

---

## Deployment record

_Completed after the push._
