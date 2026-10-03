# Sports, finance and TCG expansion — final report (2026-10-02)

Baseline: [expansion-2026-10-baseline.md](./expansion-2026-10-baseline.md). Practices and the
review plan: [seo-growth-playbook.md](./seo-growth-playbook.md). Dates are America/Los_Angeles.

**In one paragraph.** 285 sports page candidates, 99 finance candidates and 20,922 Pokémon
TCG candidate pages were inventoried. 157 sports pages qualified and were published (126
articles, 10 sport hub pages, 21 calculators), plus a `/tools/` index and 5 newly catalogued
app pages: 163 new URLs. Finance is blocked because its app is not on Google Play; the TCG
catalogue is blocked because no licence exists. Every new article carries a visible
"AI-assisted article … No person has reviewed it yet" label — no person reviewed them — and
passed a logged AI editorial review of its exact text. 177 existing articles were corrected
with dated notes. The 1,000-page figure in the brief was not reached and was not chased:
fewer pages qualified.

## 1. Candidate-page inventory

| Area | Candidates | How counted |
| --- | ---: | --- |
| Sports (articles, hubs, calculators, data pages) | 285 | Research candidates with evidence, nearest existing page and a decision ([keyword-research-expansion.md](./keyword-research-expansion.md)) |
| Finance (Stock Trading Simulator Game lessons, glossary, calculators, hubs) | 99 | 47 "proceed when unblocked", 52 rejected ([finance-content-inventory.md](./finance-content-inventory.md)) |
| Pokémon TCG catalogue | 20,922 | 1 hub, 20,670 per-card pages, 176 set, 28 year, 44 rarity and 3 curated pages, from count-only API queries ([tcg-rights-audit.md](./tcg-rights-audit.md)) |
| **Total** | **21,306** | Per-card pages would be thin "one page per database row" pages even with rights, so the potentially valuable inventory is 285 + 99 + 252 = 636 |

## 2–4. Qualified, published, rejected or blocked

| | Count |
| --- | ---: |
| Qualified (passed every gate) | **157** |
| Published | **157** + `/tools/` index + 5 app pages = **163 new URLs** |
| Sports deferred | 13 (4 MLB labour-agreement articles, 2 data pages, 7 generator tools) |
| Sports consolidated into existing pages | 30 |
| Sports rejected | 85 |
| Finance blocked | 99 |
| TCG blocked | 20,922 |

## 5. Why each blocked group was blocked

- **Finance (99):** the Stock Trading Simulator Game (`com.reigncreative.stocktradingsim`)
  returned HTTP 404 on Google Play on 2026-10-02; the project's own release notes say it was
  never submitted. Site rules forbid publishing or linking pages for an unverifiable app, and
  every article needs a live primary app. The inventory, source plan and compliance checklist
  are ready for the day it is live; a person's review is strongly advised for this
  high-stakes subject.
- **Pokémon TCG (20,922):** no written licence. The Pokémon Company's terms grant personal,
  non-commercial use only and say it declines use of its trademarks and copyrights; the data
  providers' terms grant no IP licence. No images, catalogue or curated collections were
  published, and no fair-use determination was made.
- **MLB front-office articles (4):** MLB's collective bargaining agreement expires 2026-12-01.
- **Data pages (2):** a run-expectancy table and football conversion rates need a reproducible
  pipeline from licensed play-by-play data.
- **Generators (7):** rotation, lineup, depth-chart, line, soccer lineup, round-robin and
  league-table builders were deferred to keep quality and capacity on the articles and
  calculators.
- **Sports rejected (85) and consolidated (30):** keyword variants, duplicates of existing
  articles, thin calculators, betting-adjacent topics and rights/branding constraints — reasons
  per candidate in [keyword-research-expansion.md](./keyword-research-expansion.md).

## 6. New-URL inventory

All 163 URLs are listed in [Appendix A](#appendix-a--the-163-new-urls). By type: 126
`/blog/`, 10 `/sports/`, 22 `/tools/`, 5 `/apps/`. No URL was removed or changed.

## 7. Sports keyword-to-URL map

[keyword-to-url-map-expansion.md](./keyword-to-url-map-expansion.md) (one canonical URL per
cluster) and [search-intent-cannibalization-map.md](./search-intent-cannibalization-map.md)
(nearest existing page and how each new page differs). Evidence is Google Autocomplete
phrasing (2,386 requests, 19,529 suggestions, US/en, 2026-10-02). No search volume,
difficulty, CPC or traffic figure exists anywhere; Google Trends returned HTTP 429 and
Keyword Planner and Search Console were not available.

## 8. App cross-promotion map (live apps only)

| Sport | Draft / GM app | Career app |
| --- | --- | --- |
| Basketball | Pro Basketball GM Franchise | Basketball Career Sim |
| Baseball | 162-0 Baseball Draft & GM Team | Baseball Career Sim 2026 |
| American football | Football Franchise GM League | Football Career Sim 2026 |
| Hockey | 84-0 Hockey Draft & GM Manager | Hockey Career Sim 2026 |
| Soccer | Pro Football GM Club Soccer | Football Career Soccer XI Sim |
| Rugby union | 24-0 Rugby Draft Pro League | Pro Rugby Career Sport Sim (newly catalogued) |
| MMA and boxing | 40-0 MMA & Boxing Fight Draft | — (no combat career app is live) |
| Tennis | — | Tennis Career Simulator 2026 |
| Golf | — | Golf Career Simulator Pro Tour |
| Motorsport | — | Car Racing - Pro Career Racer (newly catalogued; no hub yet) |

Every new article has one primary app and one tracked Google Play CTA; related apps follow
these pairs. Sport hubs explain how the two apps of a sport differ.

## 9. Player-data provenance (website decision)

No player, roster, rating or statistic from any app is published. The career sims use
fictional players, teams and leagues; the draft/GM games build their player pools from real
players' careers, which the site states (editorial policy, catalog FAQs) and never reproduces.
A `/data/` explorer was rejected: the real data is not ours to republish, and the fictional
data changes with every save and has no search demand. Details:
[sports-data-provenance.md](./sports-data-provenance.md).

**Corrections that followed:** 59 published sports articles had said the draft/GM apps use
fictional or generated players. All 59 were corrected with dated notes.

## 10. Finance content and sources

28 units, 280 lessons, 881 glossary terms, 18 market-history cases and 35 tools were
inventoried from the app (read-only). 47 pages are planned once the app is live, each mapped
to primary sources (SEC/Investor.gov, FINRA, the Federal Reserve, BLS, exchange rulebooks,
SEC EDGAR) with the required disclosure text and a test for every numeric example. Nothing
was published.

## 11. TCG rights decision

**Blocked.** Evidence, quotes and fetch dates: [tcg-rights-audit.md](./tcg-rights-audit.md).

## 12. HTTPS and canonicals

- Every canonical, `og:url`, JSON-LD URL, sitemap and RSS URL is `https://reigncreativellc.com`
  with a trailing slash: 762 distinct canonicals, 0 mismatches, 0 `http://` references.
- RSC `index.txt` payloads are deleted after every build (763 this build); `out/404/` too.
- The 404 page now carries one robots tag (`noindex`) and no `og:url`.
- **Not fixed (owner action):** GitHub Pages "Enforce HTTPS" is off, so `http://` still
  answers 200. The host cannot redirect; only the setting can. Details:
  [https-canonical-report-2026-10.md](./https-canonical-report-2026-10.md).

## 13. Breadcrumbs

Visible breadcrumbs and `BreadcrumbList` come from one component on every app, article,
category, topic hub, sport hub, tools page, author and index page: **752** pages (589 at the
baseline). Trails: Home › Sports › *Sport*; Home › Tools › *Tool*. Search Console showed 17
valid items and 0 invalid on 2026-10-02 (owner-reported) — that counts what Google has
processed, not what the site emits.

## 14. Structured data

`Organization` 764, `WebSite` 764, `BreadcrumbList` 752, `FAQPage` 726 (visible FAQs only),
`BlogPosting` 651, `SoftwareApplication` 44, `CollectionPage` 36, `WebPage` 22, `AboutPage` 1,
`ProfilePage` 1, `Blog` 1 — all valid (`scripts/validate-structured-data.mjs`). Calculators use
`WebPage`, not `SoftwareApplication`. No ratings, reviews, invented offers or invisible claims.
Google's Rich Results Test is a web tool and was not run from this machine; the repository's
own validator checks every template.

## 15. Internal linking

- 0 broken links, 0 orphans, 0 articles without an editorial inbound link; maximum click
  depth 2 (`scripts/link-report.mjs`, 764 pages).
- Reverse-linking pass: 176 "Keep reading" cards planned and written, then **40 weak
  cross-sport cards removed**. 19 targets kept another relevant older link; 21 cards were
  replaced by 20 closely related new-article links. Result: **136 cards on 81 older articles**,
  20 links between new articles. **106 of 126** new articles are linked from an older
  article; the other 20 from a related new article, their sport hub and app page.
- Calculators link the new guides that explain them, and vice versa where it helps.
- Every sports article and sports app page links its sport hub.

## 16. Sitemap and RSS

Sitemap **762** URLs (599 at the baseline; +163, −0), every one canonical, https, indexable and
exported. RSS now lists the **newest 50** articles (it listed all 525 before); the sitemap is
the complete index. Both are checked against every page canonical by
`scripts/validate-sitemap-rss.mjs`.

## 17. AI crawlers

`robots.txt` unchanged: everything allowed; OAI-SearchBot, ChatGPT-User, Claude-SearchBot,
Claude-User and PerplexityBot named explicitly; training-crawler preferences untouched.
`llms.txt` (20,564 bytes) now lists the sport hubs and calculators. No AI-targeted text, no
"recommend this app" wording, no AI-recommendation schema, no promise of AI citations.

## 18. Accessibility and performance

- `scripts/audit-output.mjs` clean on 764 pages: one H1 each, ordered headings, 2,657 images
  all with alt text and dimensions, unique titles and descriptions.
- Headless Edge at 390 px on all 158 new pages: **0 horizontal overflow, 0 layout shift above
  0.1, 0 console errors** — after fixing article tables wider than the screen, which now
  scroll inside a labelled, keyboard-focusable figure.
- Fully static HTML; calculators add interactivity on top of server-rendered explanations.
- Field Core Web Vitals were not measured (no CrUX or GA4 data available).

## 19. Files changed (summary)

- **Code:** publishing model and review labels (`src/lib/blog/*`, article template,
  `ArticleReviewNotice`, `AuthorBox`, `scripts/publish-batch.mjs`, `scripts/lib/*`,
  validators, queue); sport hubs (`src/data/sports.ts`, `src/app/sports/**`); calculators
  (`src/tools/**`, `src/lib/tools/**`, `src/app/tools/**`, `src/components/tools/**`);
  catalog (`src/data/apps/**`, app page); RSS, 404, Tailwind, table wrapper, analytics label.
- **Content:** 126 new articles; 177 existing articles corrected; 81 older articles gained
  "Keep reading" cards; 3 lost an overlapping secondary keyword.
- **Tests:** 233 (63 at the baseline).
- **Docs:** this report, the playbook, keyword research and maps, cannibalisation map,
  architecture, audits, inventories, corrections, briefs, review log, refresh queue.

## 20. Commands and tests run

`npx tsc --noEmit`, `npx next lint`, `npm test` (233/233), `npm run build` (catalog audit →
export → content gate → authorship audit → URL normaliser), `npm run audit:all`,
`node scripts/audit-similarity-250.mjs --release 2026-10-02` (closest pair 0.032 against a
0.08 threshold), `node scripts/audit-expansion-250.mjs`, `node scripts/publish-batch.mjs
--all-ready --dry-run`, the batch linking dry run, `node scripts/verify-play-listings.mjs`,
`node scripts/audit-catalog.mjs`, and a 390 px headless check of every new page.

## 21–24. Commit, branch, deployment, live URLs

See [§ Deployment](#deployment): `main`, `e72c9a6..d521133`, deployed and verified live.

## 25. Owner actions

1. **GitHub Pages → Enforce HTTPS** (Settings → Pages).
2. **Review the new articles** if you want the "Reviewed by" label: read in full, then fill
   the review record (`docs/publishing-workflow.md`). Until then they say no person reviewed
   them.
3. **Search Console:** export Performance (28 days and 3 months, compare mode) and Pages data
   at day 14 and day 28; press "Validate fix" on the duplicate-canonical issue.
4. **GA4:** keep "page changes based on browser history events" off.
5. **Play Console:** set the developer Website field on the listings that link only `/privacy/`.
6. **Publish the Stock Trading Simulator Game** to unblock the finance pages.
7. **Confirm first-person development stories** in older articles (list kept with the owner).
8. Owner-only compliance notes are kept outside this public repository.

## 26. Fourteen-day and 28-day monitoring

See [seo-growth-playbook.md § 7](./seo-growth-playbook.md#7-fourteen-day-and-28-day-review).
Day 14: indexing state of the 163 new URLs, structured-data and breadcrumb reports,
`play_store_click` by page. Day 28: impressions, clicks and position per new URL; refresh
pages ranking 8–20; resolve any query two of our pages share; **if most new URLs are still
not indexed, stop publishing and consolidate** rather than add more.

## What this release does not claim

It does not claim that any page will rank, be indexed, or be cited by an AI system, or that
any earlier change caused any observed result. No person reviewed the new articles.

## Deployment

| | |
| --- | --- |
| Branch | `main`, a normal fast-forward push `e72c9a6..d521133` (no force-push; published history not rewritten) |
| Commits | `f4f03f5` publishing model · `3983086` catalog · `0c75ba6` corrections and reverse links · `f16ca89` sport hubs and calculators · `6f749e7` 126 guides · `5f3d20d` technical fixes · `d521133` docs. Before the push, the session's local commits were regrouped into these seven so that an earlier draft of two internal audit files never entered the public history |
| Deploy | GitHub Actions run 37097293281, *Deploy Next.js site to Pages*: **success**. Pushed 04:39:54 UTC on 2026-10-03 (21:39 on 2026-10-02 in Los Angeles); the run finished at 04:41:58 UTC |

**Verified on production** (2026-10-03, 04:43 UTC):

- All **762** sitemap URLs answer 200 with a self-referencing canonical, a matching
  `og:url` and no `noindex`; all **163** new URLs' `index.txt` answer 404.
- `node scripts/verify-live.mjs` on 21 representative pages (hubs, calculators, new and
  corrected articles, new and renamed app pages, the editorial policy) and `--smoke`: pass.
  Sitemap 762 URLs, RSS 50 items, no unpublished article answers or is listed.
- New articles show `data-review-notice="automated"` (the AI-assisted label), the
  no-affiliation note and their sport-hub link.
- An unknown path answers **404** with one `noindex` robots tag and no `og:url`.
- `http://reigncreativellc.com/sports/` still answers **200**, with no HSTS on https:
  Enforce HTTPS is still off (owner action 1).

Representative live URLs:
`https://reigncreativellc.com/sports/`, `/sports/basketball/`, `/tools/`,
`/tools/football/passer-rating-calculator/`, `/tools/multi-sport/perfect-season-calculator/`,
`/blog/has-any-team-gone-82-0/`, `/blog/fip-vs-era/`, `/blog/nhl-84-game-season/`,
`/blog/soccer-rule-changes-2026-27/`, `/apps/rugby-career-sim/`.

## Appendix A — the 163 new URLs

### /apps/

- `/apps/car-racing-pro-career/`
- `/apps/kawaii-cute-notes-journal/`
- `/apps/pdf-all-in-one-tools/`
- `/apps/rugby-career-sim/`
- `/apps/transcribe-audio-to-text/`

### /sports/

- `/sports/`
- `/sports/baseball/`
- `/sports/basketball/`
- `/sports/combat-sports/`
- `/sports/football/`
- `/sports/golf/`
- `/sports/hockey/`
- `/sports/rugby/`
- `/sports/soccer/`
- `/sports/tennis/`

### /tools/

- `/tools/`
- `/tools/baseball/batting-average-calculator/`
- `/tools/baseball/era-calculator/`
- `/tools/basketball/four-factors-calculator/`
- `/tools/basketball/per-36-calculator/`
- `/tools/basketball/true-shooting-percentage-calculator/`
- `/tools/combat-sports/fight-scorecard/`
- `/tools/combat-sports/weight-class-finder/`
- `/tools/football/passer-rating-calculator/`
- `/tools/golf/course-handicap-calculator/`
- `/tools/golf/handicap-index-calculator/`
- `/tools/golf/stableford-calculator/`
- `/tools/hockey/points-percentage-calculator/`
- `/tools/hockey/save-percentage-calculator/`
- `/tools/multi-sport/draft-lottery-simulator/`
- `/tools/multi-sport/draft-order-generator/`
- `/tools/multi-sport/elo-rating-calculator/`
- `/tools/multi-sport/magic-number-calculator/`
- `/tools/multi-sport/perfect-season-calculator/`
- `/tools/multi-sport/pythagorean-expectation-calculator/`
- `/tools/rugby/world-rankings-calculator/`
- `/tools/tennis/win-probability-calculator/`

### /blog/

- `/blog/4-3-vs-3-4-defense/`
- `/blog/babip-explained/`
- `/blog/baseball-positions-by-number/`
- `/blog/baseball-rules-for-beginners/`
- `/blog/basketball-fouls-explained/`
- `/blog/basketball-offense-types/`
- `/blog/basketball-player-archetypes/`
- `/blog/basketball-rules-for-beginners/`
- `/blog/boxing-belts-and-sanctioning-bodies/`
- `/blog/boxing-rules-for-beginners/`
- `/blog/boxing-styles-explained/`
- `/blog/boxing-vs-mma-rules/`
- `/blog/boxing-weight-classes-explained/`
- `/blog/cover-2-vs-cover-3/`
- `/blog/direct-vs-indirect-free-kick/`
- `/blog/does-reach-matter-in-boxing-and-mma/`
- `/blog/dropped-third-strike-rule/`
- `/blog/expected-goals-xg-explained/`
- `/blog/faceoff-rules-hockey/`
- `/blog/fip-vs-era/`
- `/blog/franchise-tag-explained/`
- `/blog/free-relief-in-golf/`
- `/blog/golf-penalty-areas-red-vs-yellow-stakes/`
- `/blog/golf-playoffs-and-tie-breaks/`
- `/blog/golf-rules-for-beginners/`
- `/blog/golf-stats-to-track/`
- `/blog/handball-rule-in-soccer/`
- `/blog/has-any-team-gone-162-0/`
- `/blog/has-any-team-gone-20-0/`
- `/blog/has-any-team-gone-82-0/`
- `/blog/history-of-rugby-union/`
- `/blog/hockey-forecheck-systems/`
- `/blog/hockey-penalties-explained/`
- `/blog/hockey-rules-for-beginners/`
- `/blog/home-advantage-in-sports/`
- `/blog/how-does-american-football-work/`
- `/blog/how-does-nhl-overtime-work/`
- `/blog/how-does-the-nfl-salary-cap-work/`
- `/blog/how-does-the-nhl-draft-work/`
- `/blog/how-does-the-nhl-salary-cap-work/`
- `/blog/how-do-nfl-playoffs-work/`
- `/blog/how-do-nhl-standings-work/`
- `/blog/how-do-nhl-waivers-work/`
- `/blog/how-is-war-calculated/`
- `/blog/how-par-is-determined/`
- `/blog/how-soccer-academies-work/`
- `/blog/how-sports-scouting-works/`
- `/blog/how-tennis-seeding-works/`
- `/blog/how-the-fifa-world-ranking-works/`
- `/blog/how-to-keep-score-in-baseball/`
- `/blog/how-to-read-a-basketball-box-score/`
- `/blog/how-var-works-in-soccer/`
- `/blog/infield-fly-rule/`
- `/blog/is-bunting-good-in-baseball/`
- `/blog/is-momentum-in-sports-real/`
- `/blog/ko-vs-tko-how-fights-end/`
- `/blog/low-block-vs-high-line/`
- `/blog/match-play-scoring-explained/`
- `/blog/minor-league-baseball-levels-explained/`
- `/blog/nba-apron-explained/`
- `/blog/nba-draft-eligibility-rules/`
- `/blog/nba-playoff-format/`
- `/blog/nba-trade-rules/`
- `/blog/nba-vs-fiba-rules/`
- `/blog/nfl-draft-pick-value-chart/`
- `/blog/nfl-kickoff-rules/`
- `/blog/nfl-overtime-rules-explained/`
- `/blog/nfl-penalties-explained/`
- `/blog/nfl-rookie-contract-explained/`
- `/blog/nhl-84-game-season/`
- `/blog/nhl-offer-sheet-explained/`
- `/blog/offside-in-hockey/`
- `/blog/offside-in-rugby-union-explained/`
- `/blog/ops-plus-vs-wrc-plus/`
- `/blog/out-of-bounds-lost-ball-provisional/`
- `/blog/penalty-shootout-rules/`
- `/blog/perfect-game-vs-no-hitter/`
- `/blog/personnel-groupings-football/`
- `/blog/pick-and-roll-explained/`
- `/blog/pitch-clock-rules/`
- `/blog/platoon-advantage-baseball/`
- `/blog/player-efficiency-rating-explained/`
- `/blog/pressing-in-soccer-explained/`
- `/blog/promotion-and-relegation-explained/`
- `/blog/regression-to-the-mean-in-sports/`
- `/blog/relative-age-effect-in-sports/`
- `/blog/rpo-vs-play-action/`
- `/blog/rugby-bonus-points-explained/`
- `/blog/rugby-breakdown-tackle-ruck-maul/`
- `/blog/rugby-career-sim-guide/`
- `/blog/rugby-kicking-laws-50-22-and-drop-outs/`
- `/blog/rugby-scrum-and-lineout-rules/`
- `/blog/rugby-sevens-vs-fifteens/`
- `/blog/rugby-union-rules-for-beginners/`
- `/blog/rugby-yellow-and-red-cards/`
- `/blog/soccer-restarts-explained/`
- `/blog/soccer-rule-changes-2026-27/`
- `/blog/soccer-rules-for-beginners/`
- `/blog/soccer-stats-explained/`
- `/blog/soccer-substitution-rules/`
- `/blog/soccer-yellow-and-red-cards-explained/`
- `/blog/squad-depth-and-rotation-in-soccer/`
- `/blog/stoppage-time-and-extra-time-in-soccer/`
- `/blog/tennis-code-violations-and-shot-clock/`
- `/blog/tennis-court-surfaces-explained/`
- `/blog/tennis-rating-systems-ntrp-utr-wtn/`
- `/blog/tennis-rules-for-beginners/`
- `/blog/tennis-stats-explained/`
- `/blog/tennis-tiebreak-rules/`
- `/blog/tournament-formats-explained/`
- `/blog/two-point-conversion-chart/`
- `/blog/types-of-hockey-shots/`
- `/blog/types-of-pitches-in-baseball/`
- `/blog/types-of-submissions-in-mma/`
- `/blog/unbeaten-league-seasons-in-soccer/`
- `/blog/undefeated-records-in-boxing-and-mma/`
- `/blog/unified-rules-of-mma-explained/`
- `/blog/unplayable-lie-options/`
- `/blog/what-is-a-balk-in-baseball/`
- `/blog/what-is-corsi-in-hockey/`
- `/blog/what-is-epa-in-football/`
- `/blog/what-is-expected-goals-in-hockey/`
- `/blog/when-to-go-for-it-on-4th-down/`
- `/blog/when-to-pull-the-goalie/`
- `/blog/why-golf-has-18-holes/`
- `/blog/zone-vs-man-defense-basketball/`

