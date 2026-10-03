# Sports app data: provenance and website use

This document covers the player, team, league, coach, venue and statistics data in
the Reign Creative sports projects: where it comes from and what the website may
use. It was compiled on **2026-10-02** from a read-only inspection of 21 project
folders under `C:\Users\regal\Desktop\`. They are 14 live catalog apps, 1 live
app missing from the catalog, and 6 projects that are not on Google Play.

No project was modified, built, formatted or committed. Credential files
(`google-services.json`, `GoogleService-Info.plist`, `.env*`, `eas.json`,
keystores) were excluded from every search and never opened. `node_modules`,
`android/`, `ios/` and build output were skipped. This is the public version.
It records the website's decisions. Owner-only compliance notes are kept outside
this public repository.

---

## 1. Summary

- **The career sims are fictional. The draft/GM apps are not.** The eight live
  *career* sims are fictional worlds. Their players, clubs and leagues are
  written in-house or generated at runtime. The seven live *draft/GM* apps build
  their player pools from real-world players' careers. Their ratings are each
  game's own estimates, not official statistics. `docs/content-spec.md` rule 10
  (rewritten 2026-10-02) states this premise.
- **The website reproduces no data from the draft/GM apps or the league
  sandboxes.** That means no pages for players, coaches, teams, leagues,
  ratings, rosters, stats or simulated outcomes. An app's rating or projection
  is never attached to a named real athlete (rule 10).
- **The career sims' fictional content belongs to Reign Creative.** It may appear
  only as labelled illustration inside explanations of how the simulation works.
  It has almost no search value and is regenerated for every save (section 5.1).
- **A `/data/{sport}/` explorer is not justified** (section 5.1). Methodology
  explainers backed by source files are the non-thin alternative (section 5.2).
- **No affiliation.** None of the sports apps is affiliated with, or endorsed by,
  any league, team, players' association or athlete. The site says so on the
  editorial policy, the sport hubs and the catalog FAQs.

| Data class | On the website? |
| --- | --- |
| Real athletes, coaches, clubs, leagues, career stats and ratings from any app | **No** |
| Development, calibration and test data inside the projects | **No** |
| Logos, photos, likenesses, jersey designs | **No** |
| Fictional players, teams, leagues, venues and bios from the career sims | **Limited.** Labelled illustration only, never roster or stat pages |
| How ratings, potential, aging and projections are modelled | **Yes**, once each claim has been added to the catalog (content-spec rule 2) |

---

## 2. Which folder is which app

Folders were matched by `android.package` only, from `app.json`,
`app.config.js` or `app.identity.json`. "Play" is the Google Play details-page
HTTP status on 2026-10-02 with `hl=en_US&gl=US`. The cricket ID was also tried
for IN, GB and AU. These results agree with the parallel listing audit in
`docs/sports-app-inventory-2026-10.md`, which also covers sports apps outside
this folder list.

| Folder | Package | Website catalog name | Play (2026-10-02) |
| --- | --- | --- | --- |
| 82 Pro Basketball | `com.reigncreative.eightytwopro.basketballdraft` | Pro Basketball GM Franchise | Live |
| 162-0 Baseball Draft | `com.reigncreative.baseballdraft162` | 162-0 Baseball Draft & GM Team | Live |
| 20-0 Football Draft | `com.reigncreative.twentyzero.footballdraft` | 20-0 Football Draft & GM Mode | Live. The Play title is now **"Football Franchise GM League"** |
| 84-0 Hockey Draft | `com.reigncreative.eightyfourprohockeydraft` | 84-0 Hockey Draft & GM Manager | Live |
| 38-0 Soccer Draft | `com.reigncreative.soccerdraftgm` | Pro Football GM Club Soccer | Live |
| 40-0 MMA Boxing Fight Draft | `com.reigncreative.fortyzero.mmaboxingfightdraft` | 40-0 MMA & Boxing Fight Draft | Live |
| 24-0 Rugby Draft | `com.reigncreative.twentyfourzero.rugbydraft` | 24-0 Rugby Draft Pro League | Live |
| Pro Basketball Simulator | `com.reigncreative.probasketballsim` | Basketball Career Sim | Live |
| Baseball My Career | `com.reigncreative.baseballmycareer` | Baseball Career Sim 2026 | Live |
| Football My Career | `com.reigncreative.footballmycareer` | Football Career Sim 2026 | Live |
| Hockey My Career Simulator | `com.reigncreative.hockeymycareersimulator` | Hockey Career Sim 2026 | Live |
| Soccer My Career Simulator | `com.reigncreative.soccermycareersim` | Football Career Soccer XI Sim | Live |
| Golf My Career Simulator | `com.reigncreative.golfmycareersimulator` | Golf Career Simulator Pro Tour | Live |
| Pro Tennis Career Simulator | `com.reigncreative.protenniscareersim` | Tennis Career Simulator 2026 | Live |
| Pro Rugby Career Simulator | `com.reigncreative.prorugbycareersim` | **Not in the catalog** | **Live**: "Pro Rugby Career Sport Sim", Reign Creative LLC, updated Sep 15, 2026 |
| Pro Cricket Career Simulator | `com.reigncreative.procricketcareersim` | — | 404 (US, IN, GB, AU) |
| Basketball League Sandbox | `com.reigncreative.basketballleaguesandbox` | — | 404 |
| Baseball League Sandbox | `com.reigncreative.baseballleaguesandbox` | — | 404 |
| Football League Sandbox | `com.reigncreative.footballleaguesandbox` | — | 404 |
| Hockey League Sandbox | `com.reigncreative.hockeyleaguesandbox` | — | 404 |
| Boxing Prize Fighter Career | `com.reigncreative.boxingprizefightercareer` | — | 404 |

---

## 3. Per-project inventory

Paths are relative to each project folder.

### 3a. Live draft / GM apps: player pools built from real players' careers

All seven build their player pools from real-world players' careers. Reign
Creative compiled the pools in-house. Ratings are each game's own estimates: a
hand-written 0–99 tier, plus sub-ratings derived in code (for example
`82 Pro Basketball/src/data/derive.ts`). The apps label estimated values. GM
modes simulate seasons, player development and retirement on top of the pool.
**None of this data is reproduced on the website.** Only the method may be
explained (section 5.2).

| Folder | Package | Live? | Player pool | Website use |
| --- | --- | --- | --- | --- |
| 82 Pro Basketball | …eightytwopro.basketballdraft | Live | Real-world players' careers; estimated ratings | Method only |
| 162-0 Baseball Draft | …baseballdraft162 | Live | Real-world players' careers; estimated ratings | Method only |
| 20-0 Football Draft | …twentyzero.footballdraft | Live | Real-world players' careers; estimated ratings | Method only |
| 84-0 Hockey Draft | …eightyfourprohockeydraft | Live | Real-world players' careers; estimated ratings | Method only |
| 38-0 Soccer Draft | …soccerdraftgm | Live | Real-world players' careers; estimated ratings | Method only |
| 40-0 MMA Boxing Fight Draft | …fortyzero.mmaboxingfightdraft | Live | Real-world fighters' careers; estimated ratings | Method only |
| 24-0 Rugby Draft | …twentyfourzero.rugbydraft | Live | Real-world players' careers; estimated ratings | Method only |

### 3b. Live career sims: fictional worlds

All eight share one template. Hand-written fictional casts and celebrities live
in `src/data/fictionalPlayers.ts` and `celebrities.ts`. Fictional clubs and the
league name live in `src/data/teams.ts`. Small name pools live in
`src/data/names.ts`. At runtime, draft classes are built from those pools with
an RNG seeded per career (`src/game/draftClass.ts`). Head coaches are picked
from a shared pool by hashing the team ID (`src/game/coaches.ts`). None of the
21 `package.json` files depends on faker, a name or census package, a scraper or
a stats SDK. Every name pool is an in-repo list written by hand.

| Folder | Package | Live? | Fictional content | Website use |
| --- | --- | --- | --- | --- |
| Pro Basketball Simulator | …probasketballsim | Live | League, clubs, cast and celebrities; generated draft classes and coaches | Limited |
| Baseball My Career | …baseballmycareer | Live | As above. `docs/BASEBALL_STATISTICAL_TARGETS.md` is a dev calibration document of league-average rates, which are engine targets, not shown to players | Limited. The calibration tables: **No** |
| Football My Career | …footballmycareer | Live | As above. Quarterback-only career | Limited |
| Hockey My Career Simulator | …hockeymycareersimulator | Live | As above | Limited |
| Soccer My Career Simulator | …soccermycareersim | Live | As above, plus invented nations (`nations.ts`) | Limited |
| Golf My Career Simulator | …golfmycareersimulator | Live | As above. Courses, tournaments and nations are all fictional | Limited |
| Pro Tennis Career Simulator | …protenniscareersim | Live | As above. Tour, events and academies are fictional (`tourEvents.ts`, `academies.ts`) | Limited |
| Pro Rugby Career Simulator | …prorugbycareersim | **Live, not in the catalog** | As above. Fictional federation, clubs and academies | Limited, once a catalog entry exists |

### 3c. Not on Google Play

| Folder | Package | Live? | Content | Website use |
| --- | --- | --- | --- | --- |
| Pro Cricket Career Simulator | …procricketcareersim | No | The career-sim template, with a fictional world | n/a (unreleased) |
| Basketball League Sandbox | …basketballleaguesandbox | No | Real-player leagues seeded from the matching draft app's pool, plus fictional leagues | **No** |
| Baseball League Sandbox | …baseballleaguesandbox | No | As above | **No** |
| Football League Sandbox | …footballleaguesandbox | No | As above | **No** |
| Hockey League Sandbox | …hockeyleaguesandbox | No | Real-player leagues plus a fictional generator | **No** |
| Boxing Prize Fighter Career | …boxingprizefightercareer | No | Procedural fighters, hand-made opponents, invented sanctioning bodies, arenas and staff | n/a (unreleased) |

---

## 4. Website decision per data class

| Data class | Website decision | Reason |
| --- | --- | --- |
| **Players: real** | **No** player pages, rosters, ratings or stat lines from any app. An app's rating or projection is never attached to a named real athlete | Content-spec rule 10. It would amount to republishing a player database |
| **Players: fictional** | **Limited.** Labelled illustration inside "how the simulation works" explainers only | Regenerated for every save, thin, no search demand (section 5.1) |
| **Teams, clubs and leagues: real** | **No** team or league pages, and no logos, colours or branding taken from any app. Real leagues and clubs are named only nominatively in real-world rules and history explainers, with a cited source | Rule 10 |
| **Teams, clubs, leagues, tours and venues: fictional** | **Limited.** The site does not name in-game leagues, tours or clubs, and never lists them or makes them a page subject | Thin and per-save. The catalog FAQs already say each career sim's world is fictional |
| **Coaches** | Real coaches: **No** data from any app. Fictional coaches: labelled illustration only | Rule 10 |
| **Venues** | **No** venue pages. Real venues are named only with a cited source. Fictional venues appear only as labelled illustration | Rule 10. No search value |
| **Statistics, records and history: real** | Never taken from an app. The site states real statistics, records and history only from a cited official or reputable source | Rule 1 (no invented numbers) and rule 10 |
| **Statistics: simulated** | Fictional players only, labelled, and only constants that exist in the code | Simulated results are not real statistics or predictions. Rules 1 and 11 (no betting framing) |
| **Statistics: calibration targets** | **No** (the dev tables). At most, once it is in the catalog, the site may say an engine is "calibrated to modern league scoring rates" | Internal engineering targets, not reader-facing data |
| **Ratings** | Method: **Yes**, once each claim is in the catalog (rule 2). Values attached to real players: **No** | Ratings of named real people would rebuild the player database (rule 10). The methodology is Reign Creative's own |
| **Logos, photos, likenesses, jerseys** | **No** | Rules 5 and 10. The site gains nothing from them |
| **Biographies** | Real people: **No**. Fictional bios: labelled illustration only | Rule 10 |

---

## 5. Recommendation for the website

### 5.1 No `/data/{sport}/` explorer

1. The only substantial datasets are the draft/GM apps' player pools, which are
   built from real players' careers. Content-spec rule 10 keeps them off the site.
2. The fictional data has no stable, searchable form. Draft classes are
   regenerated for every career (`draftClass.ts` seeds from the player ID),
   coaches derive from team IDs, and the fixed casts are small. Nobody searches
   for a fictional prospect's overall rating, so explorer pages would be thin,
   templated pages with no demand.
3. Simulated numbers presented as data invite confusion with real statistics.
   That runs against rule 1 (no invented numbers) and rule 11 (no gambling
   framing).

### 5.2 Non-thin alternative: "how the simulation works" explainers

Content-spec rule 2 makes the catalog the only allowed source for app claims.
So each claim must first be added to the relevant entry in
`src/data/apps/catalog/sports-gm.ts`, then re-verified against the file below.
Never name real players or show their ratings, even when explaining the draft
apps' method.

| Topic | What the code shows | Evidence |
| --- | --- | --- |
| Aging and the prime curve (career sims) | Young players gain more from the same training. Prime-age players gain at par. Veterans gain more slowly, but never zero. A small, capped physical decline starts in the mid-30s. It is at most −4 per physical attribute per season and touches only four physical attributes. Skill and IQ are untouched | `Pro Basketball Simulator/src/game/aging.ts:4–16, 20–21, 32–52`. Every career sim has its own sport-specific `src/game/aging.ts` with different attribute lists, so verify each app before writing about it |
| Potential, development and retirement (draft GM modes) | Potential is a ceiling set from overall and age, with more headroom for younger players. Each offseason's change is clamped between a floor and that potential. Retirement risk depends only on age. Minutes played, compared with the coach-optimal rotation, speed up or stall development. Training staff speeds up growth but never turns decline into growth | `82 Pro Basketball/src/game/gm/config.ts:263–290`; `src/game/gm/progression.ts:329–352, ~400` |
| How ratings are estimated (draft apps, method only) | A hand-written 0–99 tier, plus sub-ratings derived from career stats, positions and archetypes. An archetype-aware defensive reputation makes up for stats that early eras never tracked. The app labels estimates | `82 Pro Basketball/src/data/derive.ts:15–27, 67–75`; `src/components/explore/DataLabelChip.tsx:31–33` |
| The coach's effect on a season projection | The coach can move the projected wins only by a small capped amount, and the simulation never receives the coach's identity | `82 Pro Basketball/src/game/simulation.ts:39–56` |
| Missing data is shown honestly | An unknown stat shows "—". A verified zero shows 0 | `20-0 Football Draft/docs/PLAYER_DATA_SOURCES.md` §5; `src/components/PlayerCard.tsx` |
| Why perfect seasons are rare | Dev balance harnesses check that elite rosters win far more than weak ones and that no trivial perfect-season path exists | `40-0 MMA Boxing Fight Draft/docs/PLAYER_DATA_SOURCES.md` §5 (`scripts/simBalanceCombat.mjs`); `82 Pro Basketball/src/game/simulation.ts` header (`scripts/simBalance.mjs`) |

**Writing rules for these pages**

- Use only constants that exist in the code, with the file path recorded in
  the article's research notes. No invented sample players or stat lines
  (rule 1).
- Any example output must carry the label: **"Simulated · fictional. Generated
  by [app]; not real people, teams or statistics; not a prediction."**
- No outcome promises and no betting language (rule 11).
- App facts come only from the catalog (rule 2).
- Real-sport facts belong in the existing real-world explainer pattern. Cite
  the governing body's published rules nominatively with a trademark notice, as
  `content/blog/baseball-career-sim-guide.md` and the two tennis articles
  already do. Never mix app data into those articles, and never describe a
  draft app as "fictional".
- Done on 2026-10-02: `docs/content-spec.md` rule 10 now says that the draft/GM
  games build their player pools from real-world players' careers, and that
  articles never reproduce an app's player records, ratings, rosters or pools.

---

## 6. Method and limits

**Sweep.** I ran ripgrep over the text files (`ts`, `tsx`, `js`, `json`, `md`,
`csv`, `txt`) in each folder.

- *Excluded directories:* `node_modules`, `android`, `ios`, `dist*`, `.git`,
  `.expo`, `.claude`, `.tmp*`, `.bundlecheck*`, `.gemini*` and `.conversion`.
- *Excluded files:* the credential files listed above, plus
  `package-lock.json` and `adIdentity.json`.
- *Terms:* athlete, team and league names; league acronyms; and markers of
  third-party data sources and scraping.
- *Dependencies:* every `package.json` was checked for name-generation, census,
  scraping and stats packages (section 3b).

**External checks (2026-10-02).** Each Google Play details page was checked for
HTTP status, title and developer (section 2).

**Not done**

- No data-fetch script was run, and no project was built.
- The working scripts lived in the session scratchpad and were not added to any
  repository.
