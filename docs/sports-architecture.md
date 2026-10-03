# Sports hubs and sports calculators

How `/sports/` and `/tools/` are built, and how to extend them. Added 2026-10-02.

## Why these pages exist

| Page | Answers | Distinct from |
| --- | --- | --- |
| `/apps/category/sports-gm/` | Which sports app? | — (unchanged) |
| `/blog/category/sports-gm/` | Every sports article, by date | — (unchanged) |
| `/sports/` | Which sport? | Lists sport hubs, the guides that apply to every sport, the calculators, and an app-by-sport table. It does not repeat the app grid or the article list. |
| `/sports/<sport>/` | Everything about one sport | Standing copy (454–728 words per hub at launch), how that sport's apps differ, guides grouped by subject, calculators, FAQs. |
| `/tools/` | Which calculator? | Every calculator, grouped by sport, and how they are built. |
| `/tools/<sport>/<tool>/` | Work out one statistic | A calculator, plus the formula, a worked example and the limits, all in the static HTML. |

## URL scheme

- `/sports/` and `/sports/<id>/` for `basketball`, `baseball`, `football` (American football), `hockey`, `soccer`, `rugby` (union), `combat-sports`, `tennis`, `golf`. A hub is generated only when it lists at least one published guide.
- `/tools/` and `/tools/<sport>/<tool>/`, where `<sport>` is a sport id or `multi-sport`.
- **There is no `/tools/<sport>/` page.** Those paths return a genuine 404 and nothing links to them. Add one only if it would carry substantive content of its own.
- Trailing slashes everywhere, as on the rest of the site.

## Breadcrumbs

Every level is a real, linked page, and the visible trail and the `BreadcrumbList` come from the same `Breadcrumbs` component, so they cannot disagree.

| Template | Trail |
| --- | --- |
| `/sports/` | Home › Sports |
| `/sports/<id>/` | Home › Sports › *Sport* |
| `/tools/` | Home › Tools |
| `/tools/<sport>/<tool>/` | Home › Tools › *Tool* |

A tool page links its sport hub in the line under its H1 ("More in the Golf hub"), and every hub lists its tools. The breadcrumb deliberately does not invent a `/tools/<sport>/` level.

## Structured data

| Template | JSON-LD (besides the site-wide Organization and WebSite) |
| --- | --- |
| `/sports/` | `CollectionPage` with an `ItemList` of hubs, `BreadcrumbList`, `FAQPage` |
| `/sports/<id>/` | `CollectionPage` with an `ItemList` of the guides listed, `BreadcrumbList`, `FAQPage` |
| `/tools/` | `CollectionPage` with an `ItemList` of tools, `BreadcrumbList` |
| `/tools/<sport>/<tool>/` | `WebPage` (with `datePublished`/`dateModified`), `BreadcrumbList`, `FAQPage` |

Every `FAQPage` question is visible on the page. Tools are **not** marked up as `SoftwareApplication` or `WebApplication`: those types invite rating fields we have nothing truthful to fill. No ratings, reviews or offers anywhere. `scripts/validate-structured-data.mjs` now knows these page types (`sports-index`, `sport-hub`, `tools-index`, `tool`) and fails the build if a template loses its expected blocks.

## How hubs choose their articles

All from existing frontmatter — no new fields:

- An article's **sport** is the sport of its primary app (`relatedApps[0]`), but only if the article is about that sport: one of the sport's `keywords` appears in its tags, or as a whole word in its title. `getSportForPost()` in `src/data/sports.ts` is the helper templates should use.
- On a hub: **own** guides (primary app's sport, about the sport) are grouped by subject — rules, statistics, strategy, simulators — from their tags (`groupGuides()` in `src/lib/sports.ts`); **"Guides for any sport"** are led by the sport's app but apply everywhere (salary caps, draft formats); **"Also relevant"** are about the sport but led by another sport's app.
- `/sports/` lists every guide led by a sports app that belongs to no single sport.
- Each hub's **cornerstone** ("Start here") must be a published article and one of that hub's own guides, or the build fails. The team sports use their app guides; soccer, rugby, combat sports, tennis and golf use the rules explainer the keyword research chose.

## App names and claims

- Copy never types an app name. It uses `{draft}` and `{career}`, filled from the catalog at render time, because Play titles change (the football GM app was renamed in September 2026). A placeholder with no app behind it fails the build.
- Anything said about an app must be in its catalog entry. The draft/GM apps must never be called fictional or generic, and no copy may name a real athlete, club or league in connection with any app. Hubs and tool pages carry the line "not affiliated with, or endorsed by, any league, team, players' association or athlete".
- **Rugby career app:** "Pro Rugby Career Sport Sim" is live on Play. The rugby hub detects the catalog slug `rugby-career-sim` and switches on its app card, copy, FAQ and table row with no further edit. Its copy says only what the live listing says.
- **Sports without a hub** (the motorsport app, for example) are listed under "Other sports" on `/sports/` as soon as they are in the catalog with `categoryId: 'sports-gm'`.

## Dates, sitemap and llms.txt

- Hubs' `lastmod` is the newest of the hub's own `updatedAt`, the `updatedAt` of every guide it lists, and the `updatedAt` of every tool it lists. Never the build time.
- Tools carry `publishedAt` and `updatedAt` in their `meta.ts`. Move `updatedAt` only when the visible content or the calculation changes. The page shows "Updated" only when the two differ.
- `llms.txt` lists every hub and every tool. `scripts/validate-sitemap-rss.mjs` fails if it omits one that the sitemap has.

## Calculators: how they are built

- **Formulas** live in `src/lib/tools/*.mjs`: plain JavaScript with JSDoc, no React. The same functions run in the build (worked examples), in the browser (the calculator), and in `npm test`.
- **Tests** in `scripts/tests/tools.test.mjs` pin each formula to its source's own worked example: the NFL Record & Fact Book's 122.5, the NCAA statisticians' manual's 161.71, the rulebook's 2.89 ERA, MLB's ISO and BABIP examples, Basketball-Reference's eFG example, Ryder's .640, the USGA rules and table, and Fantasy Postseason's 3RR order. They also pin claims the pages make in prose.
- **Each tool is a folder**, `src/tools/<id>/`, holding `meta.ts` (data only), `Calculator.tsx` (client) and `Explainer.tsx` (server). `src/tools/registry.ts` discovers every `meta.ts` with webpack's `require.context`. No hand-maintained list exists, and the registry validates each tool's data at build time.
- **Each route** is a 10-line file at `src/app/tools/<sport>/<id>/page.tsx` that passes the three pieces to the shared `ToolPage` layout (`src/components/tools/ToolPage.tsx`).

| Tool | URL | Formula source |
| --- | --- | --- |
| Passer rating (NFL + NCAA) | `/tools/football/passer-rating-calculator/` | NFL Record & Fact Book 2025; NCAA Football Statisticians' Manual 2020 (cited unlinked: HTTP-only) |
| Batting stats (AVG/OBP/SLG/OPS/ISO/BABIP) | `/tools/baseball/batting-average-calculator/` | Official Baseball Rules 2026, Rule 9.21; MLB.com glossary |
| Pitching (ERA incl. 7/6-inning, WHIP, K/9, BB/9, HR/9, K/BB, FIP) | `/tools/baseball/era-calculator/` | Rule 9.21(e); MLB.com glossary; FanGraphs Sabermetrics Library (FIP and its constant) |
| True shooting (TS%, eFG%, FG%, 3P%, FT%) | `/tools/basketball/true-shooting-percentage-calculator/` | Basketball-Reference glossary |
| Save percentage and GAA | `/tools/hockey/save-percentage-calculator/` | Hockey-Reference glossary |
| Handicap Index | `/tools/golf/handicap-index-calculator/` | USGA Rules of Handicapping 5.1a, 5.2a, 5.2b, App. G |
| Course and playing handicap | `/tools/golf/course-handicap-calculator/` | USGA Rules of Handicapping 6.1a, 6.2a, App. C, App. G |
| Pythagorean expectation | `/tools/multi-sport/pythagorean-expectation-calculator/` | MLB.com glossary (2, 1.83); Basketball-Reference (14); Ryder 2004 (hockey, 2) |
| Draft order generator | `/tools/multi-sport/draft-order-generator/` | ESPN Fan Support (snake); Fantasy Postseason (3RR, straight); NIST DADS (Fisher–Yates) |
| Per-36, usage rate, Game Score, AST/TO | `/tools/basketball/per-36-calculator/` | Basketball-Reference glossary; NBA.com glossary |
| Four factors, possessions, pace, ratings | `/tools/basketball/four-factors-calculator/` | Basketball-Reference (Oliver's four factors; its own worked example) |
| Points %, pace, points-based magic number | `/tools/hockey/points-percentage-calculator/` | NHL Official Rules 2026-27, Rule 78.1; Hockey-Reference |
| World Rugby rankings points exchange | `/tools/rugby/world-rankings-calculator/` | World Rugby rankings explanation; 18 June 2026 announcement (home weighting removed from 1 July 2026) |
| Weight-class finder (boxing, MMA) | `/tools/combat-sports/weight-class-finder/` | ABC Unified Rules of MMA (August 2026); Nevada NAC 467.476; WBC and IBF ratings pages; NIST (kg) |
| Fight scorecard (10-point must) | `/tools/combat-sports/fight-scorecard/` | ABC Unified Rules of MMA (2026) and boxing judging manual; Nevada NAC 467.612 |
| Perfect-season probability | `/tools/multi-sport/perfect-season-calculator/` | NIST (binomial); season lengths from the Official Baseball Rules, NBA.com and the NFL Record & Fact Book |
| Elo rating change | `/tools/multi-sport/elo-rating-calculator/` | Glickman & Jones (1999); US Chess; FIDE rating regulations; FIFA world-ranking method |
| Draft lottery odds | `/tools/multi-sport/draft-lottery-simulator/` | Exact draw probabilities; MLB 2026 lottery odds (preset reproduces all 15 published odds) |
| Magic number, elimination number, games behind | `/tools/multi-sport/magic-number-calculator/` | MLB.com glossary; SABR games-behind examples; Official Baseball Rules (winning percentage) |
| Tennis win probability (game, tiebreak, set, match) | `/tools/tennis/win-probability-calculator/` | Newton & Keller (2005) Markov model; ITF Rules of Tennis |
| Stableford points | `/tools/golf/stableford-calculator/` | Rules of Golf 21.1b and The R&A's example card; Rules of Handicapping Appendix E |

Deferred from this release (candidates exist in the research files): a basketball rotation
generator, a baseball lineup and fielding card, a football depth-chart maker, a hockey line
generator, a soccer lineup builder, a round-robin schedule generator and a league-table generator.

No American football Pythagorean exponent is offered, because no source for one could be opened (Pro-Football-Reference returned 403). AY/A and ANY/A are left out for the same reason.

## Adding a tool (no shared file needs editing)

1. **Formula.** Put the pure functions in a new `src/lib/tools/<topic>.mjs` and start the file with a comment citing where each formula comes from. Use a new file rather than extending an existing one, so two people adding tools don't conflict. Validation belongs there too: return a list of plain-English error strings.
2. **Tests.** Add `scripts/tests/tools-<id>.test.mjs`; the runner picks up any `*.test.mjs`. Reproduce the source's own worked example, test edge cases (zero denominators, impossible lines, rounding), and pin any number the page states in prose.
3. **Data.** Create `src/tools/<id>/meta.ts` exporting a `ToolMeta` as default:
   - `id` equals the folder name;
   - `sport` is a sport id or `multi-sport`; `alsoFor` lists other hubs that should list it;
   - `metaTitle` ≤ 60 characters; `metaDescription` 70–160;
   - 3–6 FAQs;
   - `sources` are https, or carry `unlinked` with the reason; `accessed` is the day you opened them;
   - `relatedArticles` are published slugs, or the build fails;
   - `primaryApp` is a catalog slug, and `appContext` uses only catalog facts, with `{app}` for the name;
   - `publishedAt` and `updatedAt` are the real day.
4. **Calculator.** Create `src/tools/<id>/Calculator.tsx` (`'use client'`) using the primitives in `src/components/tools/fields.tsx`: labelled text inputs with an input mode, and a `ResultRegion` (aria-live) that shows either errors or results. Start it on the same values as the worked example.
5. **Explainer.** Create `src/tools/<id>/Explainer.tsx` (server) with `ExplainerParts`: the formula, a worked example computed by calling the same functions, the limits, and links to guides. Label illustrative numbers as illustrative.
6. **Route.** Copy any `src/app/tools/<sport>/<id>/page.tsx` to the new path and change the three imports.
7. **Check.** Run `npx tsc --noEmit`, `npx next lint`, `npm test`, `npm run build` and `npm run audit:all`. The registry, sitemap, `llms.txt`, `/tools/`, the hubs and `/sports/` pick the tool up automatically.

## Adding a sport

1. Add the id to `SportId` and an entry to `sports` in `src/data/sports.ts`:
   - catalog slugs by role;
   - a cornerstone that is published and about the sport;
   - `keywords` matching how its articles are tagged;
   - copy that names apps only through `{draft}` and `{career}`;
   - 3–6 FAQs, `relatedSports`, meta title and description, and `updatedAt`.
2. Build. The hub is generated once it lists a published guide, and the sitemap, `llms.txt`, `/sports/` and the footer's Sports link need no change.

## Validation added

- **`validate-structured-data.mjs`:** page types and expected blocks for the four templates; `WebPage` now requires `name` and `url`.
- **`link-report.mjs`:** the four page types count toward click depth and orphan checks, and the hubs and indexes are measured for standing copy.
- **`validate-sitemap-rss.mjs`:** `llms.txt` must list every `/sports/` and `/tools/` URL that the sitemap lists.
- **`scripts/tests/tools.test.mjs`:** 43 formula tests.
- Build-time checks live in `src/data/sports.ts` (catalog slugs, placeholders, related sports), `src/lib/sports.ts` (cornerstones) and `src/tools/registry.ts` (every field of every tool).
