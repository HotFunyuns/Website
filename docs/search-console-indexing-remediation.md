# Search Console indexing remediation — October 2026

Owner-reported Search Console **Pages** baseline (2026-10-24): **Indexed 425, Not indexed 138,
Total 563** (about 75.5% indexed). Not-indexed reasons:

| Reason | URLs | Status of this remediation |
| --- | ---: | --- |
| Crawled – currently not indexed (last crawled 2026-10-17) | 116 | URL list **not yet received** from the owner; classification method below, applied when the export arrives |
| Duplicate without user-selected canonical | 16 | one disposition per URL below |
| Page with redirect | 3 | expected; no action (one-hop 301s to the https apex) |
| Alternate page with proper canonical tag | 2 | expected; no action (canonical points to the https URL) |
| Not found (404) | 1 | fixed: `/favicon.ico` now ships (live after the 2026-10-25 deployment) |
| **Total** | **138** | |

Nothing here guarantees indexing. Google decides what to index; these changes remove the
technical and duplication reasons the report gives, and the validation steps say how to
ask Google to re-check.

## 1. The 22 URLs with a known reason — one row each

| # | URL | Reason | Diagnosis | Disposition | Change made |
| ---: | --- | --- | --- | --- | --- |
| 1 | `https://reigncreativellc.com/tools/` | Duplicate | 69% of its text was contained in `/sports/`, which repeated every calculator card and description | **Keep indexable, differentiate** | `/sports/` now lists calculator names only and links to `/tools/`; `/tools/` gained a which-calculator question table (updatedAt 2026-10-24) |
| 2 | `https://reigncreativellc.com/blog/how-does-american-football-work/` | Duplicate | Closest page `/blog/nfl-kickoff-rules/` at Jaccard 0.134 — distinct intent, overlapping rule text | **Keep, refresh** | Sources re-verified in this release (see §4) |
| 3 | `https://reigncreativellc.com/tools/golf/course-handicap-calculator/` | Duplicate | Shared explainer text with `/tools/golf/handicap-index-calculator/` (J 0.194) | **Keep, differentiate** | Course-handicap explainer and meta rewritten around course handicap only (updatedAt 2026-10-24) |
| 4 | `https://reigncreativellc.com/blog/malay-reduplication-explained/` | Duplicate | Closest `/blog/malay-phrases-for-travel/` (J 0.113) | **Keep, refresh** | Examples re-verified in this release (see §4) |
| 5 | `https://reigncreativellc.com/about/` | Duplicate | Not a content duplicate (max J 0.047); likely grouped by shared chrome | **Keep** | Added a "working with us" section linking `/partnerships/` |
| 6 | `https://reigncreativellc.com/blog/topics/world-history-timelines/` | Duplicate | Hub page 71% contained in its category listing | **Keep, differentiate** | Hub copy reviewed for uniqueness (see §4); category listing is paginated |
| 7 | `https://reigncreativellc.com/apps/rugby-draft-pro-league/` | Duplicate | App template shared ~40% text with sibling app pages | **Keep, differentiate** | App pages now render audience, how-it-works, screenshots and limitations; compact related-app cards (top J 0.147 → 0.122) |
| 8 | `https://reigncreativellc.com/apps/category/video-utility/` | Duplicate | Repeated the newest guide cards from `/blog/category/video-utility/` | **Keep, differentiate** | Category page shows an app chooser and the most-cited guides as titles, not cards |
| 9 | `https://reigncreativellc.com/blog/category/health-nutrition/` | Duplicate | Listed every card also shown on `/blog/` | **Keep, paginate** | Category listings paginated (`/blog/category/<id>/page/N/`) |
| 10 | `https://reigncreativellc.com/apps/zombie-survival-last-survivor/` | Duplicate | App template overlap with `/apps/space-shooter-classic-arcade/` (J 0.201) | **Keep, differentiate** | As row 7 (J 0.201 → 0.140) |
| 11 | `https://reigncreativellc.com/apps/pro-basketball-my-career-sim/` | Duplicate | Overlap with `/apps/pro-basketball-draft-gm-mode/` (J 0.201) | **Keep, differentiate** | As row 7 (J 0.201 → 0.143) |
| 12 | `https://reigncreativellc.com/blog/category/language-learning/` | Duplicate | 94% contained in `/blog/` | **Keep, paginate** | As row 9 (containment 0.943 → 0.331) |
| 13 | `https://reigncreativellc.com/blog/how-to-track-protein-intake/` | Duplicate | Close to `/blog/how-much-protein-per-day/` (J 0.144) | **Keep, sharpen intent** | Intent sharpened to the tracking method (see §4) |
| 14 | `https://reigncreativellc.com/blog/anime-coloring-app-guide/` | Duplicate | Close to `/blog/anime-art-styles-explained/` (J 0.086) | **Keep, refresh** | Visuals checked: owned or licensed only (see §4) |
| 15 | `https://reigncreativellc.com/apps/category/education-brain/` | Duplicate | Overlap with other category pages | **Keep, differentiate** | As row 8 |
| 16 | `https://reigncreativellc.com/apps/learn-cantonese/` | Duplicate | Overlap with `/apps/learn-malay/` (J 0.133) | **Keep, differentiate** | As row 7 (J 0.133 → 0.079) |
| 17 | `http://reigncreativellc.com/` | Page with redirect | One-hop 301 to the https apex (Enforce HTTPS on) | **No action** | Verified by `npm run verify:search-console` (R2) |
| 18 | `https://www.reigncreativellc.com/` | Page with redirect | One-hop 301 to the https apex | **No action** | R2 |
| 19 | `http://www.reigncreativellc.com/` | Page with redirect | One-hop 301 to the https apex | **No action** | R2 |
| 20 | `http://reigncreativellc.com/apps/pro-basketball-draft-gm-mode/` | Alternate with proper canonical | 301 to its https twin, which self-canonicalises | **No action** | R3 |
| 21 | `https://reigncreativellc.com/?from=AppAgg.com&utm_campaign=AppAgg.com&utm_medium=referral&utm_source=AppAgg.com` | Alternate with proper canonical | A third-party referral link; the page canonicalises to `/` | **No action** — no doorway page, no robots block (Google must see the canonical), no client-side redirect | R4 |
| 22 | `https://reigncreativellc.com/favicon.ico` | Not found (404) | No favicon.ico existed | **Fixed** | `public/favicon.ico` from the brand mark (commit afbec04) |

Similarity figures are 5-word-shingle Jaccard (J) and containment (c) measured on the built
`out/` before and after the changes (`page-similarity.mjs` in the session scratchpad).

## 2. Crawled – currently not indexed (116) — classification method

The export was requested but not received, so no per-URL rows exist yet. When the list
arrives, each URL gets exactly one class:

| Class | Meaning | Action |
| --- | --- | --- |
| A | Strong, distinct page; simply not yet indexed (often recently published) | No change; include in Validate Fix; re-check at 14 and 28 days |
| B | Thin or overlapping with a stronger page on the same intent | Improve (add unique worked example, sources, decision content) or merge |
| C | Near-duplicate of another URL on the site | Consolidate: keep the stronger page; retire the other with the established LegacyRedirect pattern (no meta refresh) |
| D | Technical variant that should not be indexed (parameter, sidecar, alternate host) | Confirm canonical/redirect is correct; no new pages |
| E | Should not exist or is outdated | Correct, or retire per the site's corrections policy |

Until then, the corpus-wide signals that most often explain this bucket were addressed
site-wide: category/blog listings paginated, hub and category copy differentiated, app
templates differentiated, RSC `index.txt` sidecars removed by the postbuild normaliser, and
the 400 new articles each serve a distinct primary keyword (enforced at build time).

## 3. Regression tests

`npm run audit:search-console` (local, part of `npm run audit:all`) and
`npm run verify:search-console` (also probes production) cover each reason above:
favicon present and a real ICO (L1/R1); sitemap URLs are canonical, indexable, https apex,
query-free (L2); no `index.txt` sidecars (L3/R6); real 404s, not soft 200s (L4/R5); unique
package IDs (L5); one-hop 301s for http and www (R2/R3); the AppAgg URL canonicalises to `/`
and is not blocked in robots.txt (R4); robots.txt names the sitemap (R7).

## 4. Existing articles refreshed in this release (done)

The four articles flagged during diagnosis (rows 2, 4, 13, 14) and the world-history hub
(row 6) are covered in the release's final report, which records what changed in each.

## 5. Owner actions in Search Console

1. After the deployment is live, open **Indexing → Pages**, choose
   **Duplicate without user-selected canonical**, and click **Validate fix**.
2. Do the same for **Not found (404)** (the favicon) and, once the 116 list has been
   classified, for **Crawled – currently not indexed**.
3. Submit `https://reigncreativellc.com/sitemap.xml` again under **Sitemaps** (it already
   lists the new articles; resubmitting simply prompts a re-read).
4. Do **not** use the Indexing API for ordinary articles. URL Inspection → Request indexing
   is acceptable for a handful of key pages, not for the whole release.
5. **Day 14 check (2026-11-08):** record Indexed / Not indexed / Total, the validation status
   of each started fix, and how many of the 400 new URLs are indexed.
6. **Day 28 check (2026-11-22):** the same figures again; any URL still failing validation
   goes back through §2's classification.
7. Export the **Crawled – currently not indexed** list and share it so §2 can be completed.
