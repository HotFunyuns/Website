# App inventory and catalog refresh — 2026-10-02

Supersedes [current-production-app-inventory.md](./current-production-app-inventory.md)
(2026-09-15, 39 apps) as the record of what the catalog says and why. Inputs:
[sports-app-inventory-2026-10.md](./sports-app-inventory-2026-10.md) (sports
discovery pass, same day) and `docs/sports-data-provenance.md` (player-data
audit, same day).

## Summary

- **44 apps are on the site, all live.** `node scripts/verify-play-listings.mjs`
  returned 44/44 public listings (HTTP 200 + `SoftwareApplication` JSON-LD,
  signed out), and `node scripts/audit-catalog.mjs` passes against that file.
- **Five apps were added**: Pro Rugby Career Sport Sim, Car Racing - Pro Career
  Racer, PDF All in One Tool No Limit, Transcribe Audio to Text PRO and Kawaii
  Cute Notes Journal Plan.
- **Five apps were renamed on Play since 2026-09-15**, and the catalog now uses
  the live titles. No URL slug changed.
- **Eight app pages now show proven former Play titles** ("Previously listed on
  Google Play as …") and carry them as `alternateName`.
- **Three apps' descriptions changed on Play**, and their catalog entries were
  rewritten from the new listings only: the brain-training app (now an IQ-style
  test + brain games app), Ketora and the slots app. The other 36 previously
  catalogued listings' descriptions are byte-identical to the 2026-09-15
  snapshot, and no icon changed.
- **59 published sports articles were corrected** (91 passages) because they
  said the draft/GM apps use fictional, generated players. They do not — see
  section G. Each carries a dated correction note.
- **Not edited, owner follow-up:** non-sports articles still name renamed apps by
  their old titles (271 mentions of "Mental Math & Memory Games" alone), and 87
  sentences are flagged for review against the new listings (section H).

## Method

1. Added the five newly found packages to `PACKAGES` in
   `scripts/verify-play-listings.mjs` and re-ran it (44 probes, 400 ms apart).
   Output: `scripts/play-verification.json`.
2. Diffed every listing against the committed snapshots of 2026-08-10
   (`d094f14`), 2026-09-04 (`5dd26d5`) and 2026-09-15 (`2170969`): names, short
   and full descriptions, icon URLs, category, rating, ads, IAP, price.
3. Rewrote only what a live listing states. No feature was inferred, and no
   rating, review count or download number was recorded or published.
4. Fetched icons for the new apps with `scripts/fetch-app-icons.mjs` (WebP,
   384 px and 128 px, committed under `public/icons/`; Google's CDN is never
   hotlinked).
5. Former names come **only** from Play titles recorded in a committed
   verification snapshot (section B).

## A. All 44 apps, as verified

Probe: `node scripts/verify-play-listings.mjs`, run 2026-10-02T22:27:24.461Z (UTC). 44/44 HTTP 200 with `SoftwareApplication` JSON-LD, signed out, `hl=en&gl=US`.

| Site URL | Live Google Play title | Package | Play category | Rating | Ads | IAP | Site category | Former Play titles shown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/apps/jellyfish-arena-survivor-io/` | Jellyfish Arena Survivor io | `com.reigncreative.jellyfishio` | GAME_ACTION | Everyone | Yes | Yes | action-arcade | — |
| `/apps/regal-tower-defense/` | Regal Tower Defense: TD Game | `com.reigncreative.regaltowerdefense` | GAME_STRATEGY | Everyone | Yes | Yes | action-arcade | — |
| `/apps/space-galaxy-attack-hardcore/` | Space Galaxy Attack Hardcore | `com.reigncreative.spacegalaxyattackhardcore` | GAME_ACTION | Everyone | Yes | No | action-arcade | — |
| `/apps/space-shooter-classic-arcade/` | Space Galaxy Attack Arcade | `com.reigncreative.alieninvasion` | GAME_ARCADE | Everyone | Yes | Yes | action-arcade | Space Shooter - Galaxy Arcade |
| `/apps/zombie-survival-last-survivor/` | Zombie Survival: Last Survivor | `com.reigncreative.zombiesurvivors` | GAME_ACTION | Everyone | Yes | Yes | action-arcade | — |
| `/apps/anime-casino-slots/` | Vegas Casino Slots JACKPOT WIN | `com.reigncreative.animecasinoslots` | GAME_CASINO | Teen | Yes | No | anime-creative | Anime Casino Slot Machine Game |
| `/apps/anime-coloring-book/` | Anime Coloring Book: Paint Art | `reigncreative.animecoloringbook` | ART_AND_DESIGN | Everyone | Yes | Yes | anime-creative | — |
| `/apps/anime-trivia-word-games/` | Anime Trivia & Word Games | `com.reigncreative.animetrivia` | GAME_TRIVIA | Everyone | Yes | Yes | anime-creative | — |
| `/apps/mental-math-memory-games/` | IQ Test & Brain Training Games | `com.reigncreative.mentalmathchampion` | GAME_EDUCATIONAL | Everyone | Yes | Yes | education-brain | Mental Math & Memory Games |
| `/apps/world-history-timeline-sim/` | World History Timeline Sim | `com.reigncreative.history` | EDUCATION | Everyone | Yes | Yes | education-brain | — |
| `/apps/easy-recipes-meal-planner/` | Easy Recipes & Meal Planner | `com.reigncreative.easyrecipes` | FOOD_AND_DRINK | Everyone | Yes | Yes | health-nutrition | — |
| `/apps/keto-diet-tracker/` | Ketora: Keto Diet Carb Tracker | `com.reigncreative.ketotracker` | HEALTH_AND_FITNESS | Everyone | Yes | No | health-nutrition | Keto Diet Tracker: Low Carb |
| `/apps/protein-diet-tracker/` | Protein Diet Tracker | `com.reigncreative.proteinup` | HEALTH_AND_FITNESS | Everyone | Yes | Yes | health-nutrition | — |
| `/apps/learn-cambodian-khmer/` | Learn Cambodian, Speak Khmer | `com.reigncreative.learncambodian` | EDUCATION | Everyone | Yes | Yes | language-learning | — |
| `/apps/learn-cantonese/` | Learn Cantonese for Beginners | `com.reigncreative.learnchinesecantonese` | EDUCATION | Everyone | Yes | Yes | language-learning | — |
| `/apps/learn-italian/` | Learn Italian for Beginners | `com.reigncreative.learnitalianlanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | — |
| `/apps/learn-lao/` | Learn Lao Language Fast & Easy | `com.reigncreative.learnlaolanguage` | EDUCATION | Everyone | Yes | No | language-learning | — |
| `/apps/learn-malay/` | Learn Malay - Bahasa Melayu | `com.reigncreative.learnmalaylanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | — |
| `/apps/learn-marathi/` | Learn Marathi Language Fast | `com.reigncreative.learnmarathilanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | — |
| `/apps/learn-russian/` | Regal - Learn Russian Language | `com.reigncreative.learnrussianlanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | — |
| `/apps/learn-shanghainese/` | Learn Shanghainese Wu Chinese | `com.reigncreative.learnshanghaineselanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | — |
| `/apps/learn-thai/` | Regal - Learn Thai Language | `com.reigncreative.learnthailanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | — |
| `/apps/learn-vietnamese/` | Learn Vietnamese Language Fast | `com.reigncreative.learnvietnameselanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | — |
| `/apps/baseball-career-sim/` | Baseball Career Sim 2026 | `com.reigncreative.baseballmycareer` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/baseball-draft-gm-team/` | 162-0 Baseball Draft & GM Team | `com.reigncreative.baseballdraft162` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/car-racing-pro-career/` | Car Racing - Pro Career Racer | `com.reigncreative.procarracingcareer` | GAME_RACING | Everyone | Yes | No | sports-gm | — |
| `/apps/football-career-sim/` | Football Career Sim 2026 | `com.reigncreative.footballmycareer` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/football-draft-gm-mode/` | Football Franchise GM League | `com.reigncreative.twentyzero.footballdraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | 20-0 Football Draft & GM Mode |
| `/apps/golf-career-simulator/` | Golf Career Simulator Pro Tour | `com.reigncreative.golfmycareersimulator` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/hockey-career-sim/` | Hockey Career Sim 2026 | `com.reigncreative.hockeymycareersimulator` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/hockey-draft-gm-manager/` | 84-0 Hockey Draft & GM Manager | `com.reigncreative.eightyfourprohockeydraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/mma-boxing-fight-draft/` | 40-0 MMA & Boxing Fight Draft | `com.reigncreative.fortyzero.mmaboxingfightdraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/pro-basketball-draft-gm-mode/` | Pro Basketball GM Franchise | `com.reigncreative.eightytwopro.basketballdraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Basketball Draft GM Franchise |
| `/apps/pro-basketball-my-career-sim/` | Basketball Career Sim | `com.reigncreative.probasketballsim` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/rugby-career-sim/` | Pro Rugby Career Sport Sim | `com.reigncreative.prorugbycareersim` | GAME_SPORTS | Everyone | Yes | No | sports-gm | — |
| `/apps/rugby-draft-pro-league/` | 24-0 Rugby Draft Pro League | `com.reigncreative.twentyfourzero.rugbydraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/soccer-career-sim-xi/` | Football Career Soccer XI Sim | `com.reigncreative.soccermycareersim` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | — |
| `/apps/soccer-draft-gm-xi/` | Pro Football GM Club Soccer | `com.reigncreative.soccerdraftgm` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | 38-0-0 Pro Football GM Soccer; 38-0 Football Draft XI Soccer |
| `/apps/tennis-career-sim/` | Tennis Career Simulator 2026 | `com.reigncreative.protenniscareersim` | GAME_SPORTS | Everyone | No | Yes | sports-gm | — |
| `/apps/kawaii-cute-notes-journal/` | Kawaii Cute Notes Journal Plan | `com.reigncreative.cutenotesjournal` | TOOLS | Everyone | Yes | No | video-utility | — |
| `/apps/pdf-all-in-one-tools/` | PDF All in One Tool No Limit | `com.reigncreative.pdftoolsallinone` | TOOLS | Everyone | Yes | Yes | video-utility | — |
| `/apps/regal-video-player/` | Video Player All Formats PRO | `com.reigncreative.regalvideoplayer` | VIDEO_PLAYERS | Everyone | Yes | Yes | video-utility | Regal Video Player |
| `/apps/tcg-card-grading-scanner/` | TCG Card Grading Scanner Value | `com.reigncreative.tcgvaluescanner` | SPORTS | Everyone | Yes | Yes | video-utility | — |
| `/apps/transcribe-audio-to-text/` | Transcribe Audio to Text PRO | `com.reigncreative.transcribeaudiototext` | TOOLS | Everyone | Yes | No | video-utility | — |


## B. Renames and former names

### B1. Renamed on Play since 2026-09-15 (catalog updated, slugs unchanged)

| Site URL | Old catalog name (= Play title on 2026-09-15) | Live Play title 2026-10-02 | Description changed? |
| --- | --- | --- | --- |
| `/apps/football-draft-gm-mode/` | 20-0 Football Draft & GM Mode | **Football Franchise GM League** | No — the description still says "20-0 Football Draft" 14 times |
| `/apps/mental-math-memory-games/` | Mental Math & Memory Games | **IQ Test & Brain Training Games** | **Yes** — rewritten around an IQ test, personality test and brain games |
| `/apps/keto-diet-tracker/` | Keto Diet Tracker: Low Carb | **Ketora: Keto Diet Carb Tracker** | **Yes** |
| `/apps/anime-casino-slots/` | Anime Casino Slot Machine Game | **Vegas Casino Slots JACKPOT WIN** | **Yes** — anime/manga/25-machine copy removed |
| `/apps/regal-video-player/` | Regal Video Player | **Video Player All Formats PRO** | No — the description still calls it "Regal Video Player" |

### B2. Former names now shown on app pages

Rendered under the tagline as "Previously listed on Google Play as …" and
emitted as `SoftwareApplication.alternateName`. Each title is the JSON-LD `name`
in a committed verification snapshot:

| App page | Former Play title(s), most recent first | Snapshot evidence |
| --- | --- | --- |
| `/apps/football-draft-gm-mode/` | 20-0 Football Draft & GM Mode | 08-10, 09-04, 09-15 |
| `/apps/mental-math-memory-games/` | Mental Math & Memory Games | 08-10, 09-04, 09-15 |
| `/apps/keto-diet-tracker/` | Keto Diet Tracker: Low Carb | 08-10, 09-04, 09-15 |
| `/apps/anime-casino-slots/` | Anime Casino Slot Machine Game | 09-15 |
| `/apps/regal-video-player/` | Regal Video Player | 08-10, 09-04, 09-15 |
| `/apps/soccer-draft-gm-xi/` | 38-0-0 Pro Football GM Soccer; 38-0 Football Draft XI Soccer | 09-04; 08-10 |
| `/apps/pro-basketball-draft-gm-mode/` | Basketball Draft GM Franchise | 08-10 |
| `/apps/space-shooter-classic-arcade/` | Space Shooter - Galaxy Arcade | 08-10, 09-04 |

**Not added: "82-0 Pro Basketball Draft".** The repository proves the *site* used
that name for `com.reigncreative.eightytwopro.basketballdraft` (commit `b3c2415`,
2026-07-06, plus the retired `/apps/82-0-pro-basketball-draft/` route), but no
verification snapshot records it as a Google Play title. The earliest one
(2026-08-10) already shows "Basketball Draft GM Franchise". Calling it a former
Play title would be an unproven claim. The owner can confirm the original Play
title; if confirmed, add it to `formerNames`.

## C. Description drift found and fixed

| App | What the live listing now says | Catalog change |
| --- | --- | --- |
| IQ Test & Brain Training Games | An IQ test across numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed; brain, memory, logic, focus, vocabulary, puzzle and mind games; mental math (four operations, percentages, ratios, estimation, money); personality test + Big Five profile; memory and reaction-time tests; assessment history. **Disclaimer:** results are "estimates based on app activities, not medical, psychological, clinical, educational-placement, employment, or professional diagnostic assessments." | Entry rewritten. It says "IQ-style test" and repeats the listing's disclaimer, never "measures your IQ". The audit's IQ-claim rules are untouched |
| Ketora: Keto Diet Carb Tracker | Net carbs = total − fiber − sugar alcohols; progress ring; barcode scanner + "large, verified food database"; daily macro/calorie targets; strict/lazy/flexible styles; keto recipes; meal planner → grocery list; IF timer (16:8, 18:6, 20:4, OMAD, custom) with reminders; weight, measurements, water, ketone readings; weekly insights; an "AI coach"; optional "Ketora Premium"; not medical advice | Rewritten. Removed: electrolytes, GKI, photo logs, named sweeteners, carb-limit alerts, monthly summaries. One FAQ was also dropped, and one listing statement was referred to the owner |
| Vegas Casino Slots JACKPOT WIN | Generic Vegas-style slots with virtual coins and virtual jackpots; no cash payouts or prizes; adult entertainment only; rated Teen | Rewritten. Removed 25 machines, manga/kawaii sets, jackpot meters, VIP tier and readable-board copy. Kept in **anime-creative**: the store icon still reads "Casino Anime Slots" and the URL and the category's articles stay put. Category copy no longer promises "original anime slots" |
| Football Franchise GM League | Title only | Name, meta title, FAQ; the "20-0" goal FAQ now notes the rename |
| Video Player All Formats PRO | Title only | Name, meta title, FAQ; the first paragraph notes the old name the description still uses |

## D. New apps added (5)

All were live on both 2026-10-02 probes and written only from their listings.

| App (live title) | Package | Slug | Site category | Play category | Ads / IAP |
| --- | --- | --- | --- | --- | --- |
| Pro Rugby Career Sport Sim | `com.reigncreative.prorugbycareersim` | `rugby-career-sim` | sports-gm | GAME_SPORTS | Yes / No |
| Car Racing - Pro Career Racer | `com.reigncreative.procarracingcareer` | `car-racing-pro-career` | sports-gm (motorsport) | GAME_RACING | Yes / No |
| PDF All in One Tool No Limit | `com.reigncreative.pdftoolsallinone` | `pdf-all-in-one-tools` | video-utility | TOOLS | Yes / Yes |
| Transcribe Audio to Text PRO | `com.reigncreative.transcribeaudiototext` | `transcribe-audio-to-text` | video-utility | TOOLS | Yes / No |
| Kawaii Cute Notes Journal Plan | `com.reigncreative.cutenotesjournal` | `kawaii-cute-notes-journal` | video-utility | TOOLS | Yes / No |

The rugby career app completes the rugby draft ↔ career pair, and its FAQ names
24-0 Rugby Draft Pro League as the squad-building counterpart. The listing does
not say union or league, so neither is claimed. No combat/boxing career app is
live. The racing app is a career sim with no draft partner. No privacy or
data-location claim was written for the transcription app: its listing does not
say where audio is processed.

## E. Category copy and entity guards

- **sports-gm:** "nine sports" → "ten sports" (motorsport added). The intro adds
  rugby and motorsport and notes that the career sims follow one player or
  driver. The reading intro used to say the guides use no "real players or real
  league data". It now says the guides do not profile real athletes, which is
  true of the guides; the old wording read as a claim about the apps, which is
  false (section G).
- **anime-creative:** "original anime slots" → "a virtual-coin slots game" /
  "a social-casino slots game".
- **education-brain:** "mental arithmetic" widened to "brain training across
  memory, logic and mental arithmetic".
- **health-nutrition:** dropped "optimise for … rather than the breadth of the
  database", which the new Ketora listing ("large, verified food database")
  contradicts.
- **video-utility:** intro and meta now list the PDF toolkit, the transcription
  app and the notes journal.
- **Entity guards:** "IQ Test & Brain Training Games" is no longer banned as an
  "unreleased name" (`scripts/audit-entities.mjs`, `scripts/audit-expansion-250.mjs`),
  because it is now the live title. "World History Simulator" stays banned. The
  IQ-claim rules ("validated IQ", "your real IQ", "raise your IQ", …) are
  unchanged.

## F. Sports prose: the football app's name

"20-0 Football Draft & GM Mode" → "Football Franchise GM League", **23
occurrences in 14 files** (exact-string replacement; mentions of a 20-0 *record*
were left alone). `publishedAt`/`updatedAt` did not move for the name alone,
because a name update is not a substantive revision and
`scripts/audit-authorship.mjs` accepts it. Thirteen of the 14 files were later
corrected for the player-pool claim (section G), and that correction moved their
`updatedAt`.

Files: `best-offline-sports-games-android`, `best-sports-manager-games-for-short-sessions`,
`career-sim-vs-manager-game`, `depth-charts-explained`, `football-career-sim-guide`,
`football-draft-gm-guide`, `football-positions-explained-for-drafting`,
`how-fantasy-draft-strategy-works`, `how-football-draft-order-works`,
`quarterback-archetypes-explained`, `reading-a-defense-basics`,
`salary-cap-basics-for-gm-games`, `understanding-sports-sim-probability`,
`what-makes-a-good-draft-board`.

## G. Corrections: real-athlete player pools

**59 published articles corrected, 91 passages.** Each now carries a visible correction note dated 2026-10-02 and `updatedAt: "2026-10-02"`; `publishedAt` is unchanged. Evidence: `docs/sports-data-provenance.md` §3a (main tree) — the seven live draft/GM apps build their player pools from real-world players' careers; the career sims are fictional, so career-sim statements were left alone. No replacement names a real athlete, club or league.

### `content/blog/baseball-draft-gm-guide.md`

- **Was:** No. The game makes no claim of official league affiliation and is not connected to any real league, club or player. The pool is generated inside the game, which is why the statistics on the cards are the only thing you have to judge a player by.
  **Now:** No. The game is not affiliated with, endorsed by or licensed by any league, team, players' association or player. Its draft pool is built from real players' careers, and the ratings are the game's own estimates rather than official statistics, so judge each pick on what the card shows and on what your roster needs rather than on reputation alone.
- **Was:** The players are fictional and generated inside the game. Nothing in the projection describes, forecasts or relates to any real club, player or season, and it is not usable as an indication of any real event.
  **Now:** The draft pool is built from real players' careers, but the projection is the game's model scoring a roster you assembled: it does not forecast any real club, player or season, and it is not usable as an indication of any real event.

### `content/blog/baseball-pitching-roles-explained.md`

- **Was:** All players, teams and leagues in our games are fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/baseball-stats-explained-for-beginners.md`

- **Was:** No. 162-0 Baseball Draft & GM Team is a fictional simulation built on generated players and it is not affiliated with, endorsed by or connected to any real league, team or athlete. It uses no live results. Every statistic you see in the game belongs to a player who does not exist.
  **Now:** Yes. The draft pool in 162-0 Baseball Draft & GM Team is built from real players' careers. The ratings are the game's own estimates rather than official statistics, the game uses no live results, and it is not affiliated with, endorsed by or licensed by any league, team, players' association or athlete.

### `content/blog/basketball-advanced-stats-explained.md`

- **Was:** In [Pro Basketball GM Franchise](/apps/pro-basketball-draft-gm-mode/), you evaluate generated players from attributes rather than statistics, which sidesteps most of these problems at the draft. They return the moment your roster plays, because your own players' numbers are shaped by the roles you assigned.
  **Now:** In [Pro Basketball GM Franchise](/apps/pro-basketball-draft-gm-mode/), the draft pool is built from real players' careers and the board ranks them by the game's own ratings — estimates that compress a career into a number, so treat them with the same care as the statistics above. These problems also return the moment your roster plays, because your own players' numbers are shaped by the roles you assigned.
- **Was:** Every league, team and player in our games is fictional, and the catalogue is under [sports career and GM games](/apps/category/sports-gm/).
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete. The catalogue is under [sports career and GM games](/apps/category/sports-gm/).

### `content/blog/basketball-draft-gm-guide.md`

- **Was:** No. Pro Basketball GM Franchise is a fictional sports simulation with generated players, and it is not affiliated with, endorsed by or connected to any real league, team or athlete. The generic pool is also what makes the drafting interesting, because you have to judge players on the attributes in front of you rather than on reputation.
  **Now:** Pro Basketball GM Franchise builds its draft pool from real players' careers, and some of its GM screens use real team nicknames. The ratings are the game's own estimates rather than official statistics, and the app is not affiliated with, endorsed by or licensed by any league, team, players' association or athlete. Reputation is not the same as fit, so the drafting still rewards judging players on the attributes in front of you.

### `content/blog/batting-order-strategy-explained.md`

- **Was:** All players, teams and leagues in our games are fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/best-offline-sports-games-android.md`

- **Was:** No. Football Franchise GM League, Basketball Career Sim and 162-0 Baseball Draft & GM Team are fictional sports simulations built on generated players. They are not affiliated with, endorsed by or connected to any real league, team, school, athlete or organisation, and they do not use live results.
  **Now:** No. None of them is affiliated with, endorsed by or licensed by any league, team, school, athlete or organisation, and none uses live results. Basketball Career Sim is set in a fictional league with fictional players. Football Franchise GM League and 162-0 Baseball Draft & GM Team build their draft pools from real players' careers, with ratings that are the games' own estimates rather than official statistics.

### `content/blog/best-sports-manager-games-for-short-sessions.md`

- **Was:** No. Every sports title the studio publishes is a fictional simulation and is not affiliated with, endorsed by or connected to any real league, club, team or athlete. The players, squads and fighters are generated inside each game, which is why the skill they ask for is reading attributes rather than recognising names.
  **Now:** Partly. The studio's career sims are set in fictional leagues with fictional players, while its draft and GM games build their player and fighter pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with, endorsed by or licensed by any league, club, team or athlete, and the skill they ask for is reading attributes and fit rather than recognising names.
- **Was:** Every record these games return is produced by internal rules acting on players the game generated.
  **Now:** Every record these games return is produced by internal rules acting on the roster you built.
- **Was:** Nothing in a result describes, forecasts or relates to any real league, club, team or athlete, and none of it is a prediction or guidance of any kind. The perfect records the games are named for
  **Now:** Nothing in a result is a forecast about any real league, club, team or athlete, and none of it is a prediction or guidance of any kind. The perfect records the games are built around

### `content/blog/boxing-scoring-explained.md`

- **Was:** No. 40-0 MMA & Boxing Fight Draft is a fictional simulation and is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete.
  **Now:** Yes. 40-0 MMA & Boxing Fight Draft builds its fighter pools from real fighters' careers, with ratings and records that are the game's own estimates rather than official statistics, and it is not affiliated with, endorsed by or licensed by any promotion, sanctioning body, event or athlete.
- **Was:** The simulator applies the game's own internal rules to fighters the game generated.
  **Now:** The simulator applies the game's own internal rules and ratings to the fighters you drafted.

### `content/blog/career-mode-vs-franchise-mode.md`

- **Was:** No. The studio's sports titles are fictional simulations and are not affiliated with, endorsed by or connected to any real league, team, school, athlete or organisation. Every player, club and fighter in them is generated inside the game, and any in-game money is a fictional simulation value with no real-world worth.
  **Now:** The career sims do not: their leagues, teams and players are fictional. The draft and GM games build their player and fighter pools from real-world athletes' careers, with ratings that are the games' own estimates. None of the studio's sports titles is affiliated with, endorsed by or licensed by any league, team, school, athlete or organisation, and any in-game money is a simulation value with no real-world worth.
- **Was:** These games take fictional players, apply internal rules to your decisions, and return an outcome. They are not reproducing the physics of the sport, and they are not describing, forecasting or relating to any real league, team, school or athlete.
  **Now:** These games take a player or a roster — fictional in the career sims, drawn from real athletes' careers in the draft and GM games — apply internal rules to your decisions, and return an outcome. They are not reproducing the physics of the sport, and they are not forecasting anything about any real league, team, school or athlete.
- **Was:** the perfect records these games are named for are deliberately hard
  **Now:** the perfect records these games are built around are deliberately hard

### `content/blog/career-sim-vs-manager-game.md`

- **Was:** No. Both formats produce outputs from a model working under its own assumptions, applied to generated players in fictional leagues.
  **Now:** No. Both formats produce outputs from a model working under its own assumptions — applied to fictional players in the career sims, and to rosters drawn from real athletes' careers in the manager games.
- **Was:** Neither predicts anything about a real athlete, team or competition, and every league, team and player in our games is fictional.
  **Now:** Neither predicts anything about a real athlete, team or competition. Our career sims are set in fictional leagues; our draft and GM games build their player pools from real athletes' careers, with ratings that are the games' own estimates.

### `content/blog/clean-sheets-explained.md`

- **Was:** Every club, competition and player in our games is fictional.
  **Now:** Our career sims use fictional clubs, competitions and players; our draft games build their player pools from real-world players' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, club or player.

### `content/blog/depth-charts-explained.md`

- **Was:** Every league, team and player in our games is fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/expansion-drafts-explained.md`

- **Was:** Every league, team and player in our games is fictional, and nothing here describes
  **Now:** Our career sims are set in fictional leagues and our draft and GM games build their player pools from real athletes' careers; nothing here describes

### `content/blog/football-draft-gm-guide.md`

- **Was:** No. It is a generic simulator with fictional players and no affiliation with, endorsement by or connection to any real league, team or athlete. That is also why the drafting works the way it does — you judge players on the attributes shown rather than on names you already know.
  **Now:** No. It is not affiliated with, endorsed by or licensed by any league, team, players' association or athlete. Its draft pool is built from real players' careers, and the ratings are the game's own estimates rather than official statistics, so the drafting still comes down to judging players on the attributes shown rather than on names you already know.
- **Was:** Nothing about the result describes, forecasts or relates to any real football game, team, player or season. The players in the pool are fictional and generated by the game.
  **Now:** Nothing about the result forecasts any real football game, team, player or season. The pool is built from real players' careers, but the record is the game's model scoring the roster you assembled.

### `content/blog/football-positions-explained-for-drafting.md`

- **Was:** No. Football Franchise GM League is a generic simulator built on fictional players, and it is not affiliated with, endorsed by or connected to any real league, team or athlete. That is also why the positional thinking in this article is the useful part — you are judging a slot and a set of attributes rather than recognising a name.
  **Now:** Football Franchise GM League builds its draft pool from real players' careers, with ratings that are the game's own estimates rather than official statistics, and it is not affiliated with, endorsed by or licensed by any league, team, players' association or athlete. That is why the positional thinking in this article is the useful part — a familiar name still has to fill a slot, and the attributes decide whether it does.
- **Was:** The players are fictional and generated inside the game, so nothing in the result describes or forecasts any real league, team or athlete.
  **Now:** The pool is built from real players' careers, but the result is the game's model scoring your roster, so nothing in it forecasts any real league, team or athlete.
- **Was:** the perfect unbeaten run the game is named for is deliberately hard
  **Now:** the perfect unbeaten run the game is built around is deliberately hard

### `content/blog/free-agency-explained.md`

- **Was:** Every league, team and player in our games is fictional, and nothing here describes
  **Now:** Our career sims are set in fictional leagues and our draft and GM games build their player pools from real athletes' careers; nothing here describes

### `content/blog/goal-difference-and-tiebreakers.md`

- **Was:** Every club, competition and player in our games is fictional.
  **Now:** Our career sims use fictional clubs, competitions and players; our draft games build their player pools from real-world players' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, club or player.

### `content/blog/hockey-draft-gm-guide.md`

- **Was:** No. It is a generic simulator with fictional players and no affiliation with, endorsement by or connection to any real league, club or player. Every rating on the board is generated inside the game.
  **Now:** No. It is not affiliated with, endorsed by or licensed by any league, club, players' association or player. Its draft pool is built from real players' careers, and every rating on the board is the game's own estimate rather than an official statistic.
- **Was:** It does not describe, predict or relate to any real hockey game, club, player or season — the entire pool is fictional and generated inside the game.
  **Now:** It does not predict any real hockey game, club, player or season — the pool is built from real players' careers, but the record is the game's own model scoring your roster.

### `content/blog/hockey-goaltending-explained.md`

- **Was:** Every league, team and player in our games is fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/hockey-line-combinations-explained.md`

- **Was:** No. 84-0 Hockey Draft & GM Manager is a generic simulator built on fictional players, and it is not affiliated with, endorsed by or connected to any real league, team or athlete. Because there are no names to recognise, the drafting comes down to judging attributes and how well a lineup fits together
  **Now:** 84-0 Hockey Draft & GM Manager builds its draft pool from real players' careers, with ratings that are the game's own estimates rather than official statistics, and it is not affiliated with, endorsed by or licensed by any league, team, players' association or athlete. Recognising a name does not tell you whether a player suits your lines, so the drafting still comes down to judging attributes and how well a lineup fits together
- **Was:** The players are fictional and generated inside the game, so nothing in the result relates to any real league, team or athlete.
  **Now:** The pool is built from real players' careers, but the result is the game's model scoring your lineup, so nothing in it forecasts any real league, team or athlete.

### `content/blog/hockey-positions-explained.md`

- **Was:** No. 84-0 Hockey Draft & GM Manager is a fictional simulation and is not affiliated with, endorsed by or connected to any real league, team or athlete. Every player in the draft pool is generated by the game, which is why the drafting rewards reading attributes rather than recognising names.
  **Now:** No. 84-0 Hockey Draft & GM Manager is not affiliated with, endorsed by or licensed by any league, team, players' association or athlete. Its draft pool is built from real players' careers, with ratings that are the game's own estimates, and the drafting rewards reading attributes and fit rather than recognising names.
- **Was:** produced by its internal rules acting on players it generated.
  **Now:** produced by its internal rules acting on the players you drafted and the game's own ratings for them.
- **Was:** Worth stating explicitly: nothing in that result describes, forecasts or relates to any real league, team or athlete,
  **Now:** Worth stating explicitly: nothing in that result forecasts anything about any real league, team or athlete,

### `content/blog/how-boxing-records-are-written.md`

- **Was:** The fighters in the game are fictional and generated inside it. It is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete, and no record it produces describes a real career.
  **Now:** The game's fighter pools are built from real fighters' careers, with ratings and records that are the game's own estimates rather than official statistics. It is not affiliated with, endorsed by or licensed by any promotion, sanctioning body, event or athlete, and no record a simulation produces describes a real career.

### `content/blog/how-draft-lotteries-work.md`

- **Was:** Every league, team and player in our games is fictional, and nothing here describes
  **Now:** Our career sims are set in fictional leagues and our draft and GM games build their player pools from real athletes' careers; nothing here describes

### `content/blog/how-fantasy-draft-strategy-works.md`

- **Was:** No. Pro Basketball GM Franchise and Football Franchise GM League are fictional sports simulations with generated player pools. They are not affiliated with, endorsed by or connected to any real league, team or athlete. Drafting against generated players is also what makes the exercise a strategy problem rather than a memory test, because you have to judge each name on the attributes shown.
  **Now:** Pro Basketball GM Franchise and Football Franchise GM League build their draft pools from real players' careers, with ratings that are the games' own estimates rather than official statistics, and some GM screens use real team names. Neither is affiliated with, endorsed by or licensed by any league, team, players' association or athlete. Knowing the names does not turn it into a memory test, though: each pick still has to be judged on the attributes shown and on what your roster needs.

### `content/blog/how-fight-cards-are-built.md`

- **Was:** The fighters in the game are fictional and generated inside it; it is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete.
  **Now:** The game's fighter pools are built from real fighters' careers, with ratings and records that are the game's own estimates; it is not affiliated with, endorsed by or licensed by any promotion, sanctioning body, event or athlete.

### `content/blog/how-football-draft-order-works.md`

- **Was:** evaluating a generated pool under a specific constraint
  **Now:** evaluating a draft pool under a specific constraint
- **Was:** Every league, team and player in our games is fictional, and nothing here describes
  **Now:** Our career sims are set in fictional leagues and our draft and GM games build their player pools from real athletes' careers; nothing here describes

### `content/blog/how-mma-judging-criteria-work.md`

- **Was:** The fighters in the game are fictional and generated inside it. It is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete,
  **Now:** The game's fighter pools are built from real fighters' careers, with ratings and records that are the game's own estimates. It is not affiliated with, endorsed by or licensed by any promotion, sanctioning body, event or athlete,

### `content/blog/how-player-career-modes-work.md`

- **Was:** No. Every league, team and player in Reign Creative's sports games is fictional. Nothing in them is affiliated with, endorsed by or licensed from any real league, club or athlete.
  **Now:** No. Every league, team and player in Reign Creative's career sims is fictional, and nothing in them is affiliated with, endorsed by or licensed from any real league, club or athlete. The studio's draft and GM games are different: their player pools are built from real-world athletes' careers.

### `content/blog/how-soccer-league-tables-work.md`

- **Was:** No. Pro Football GM Club Soccer is a fictional simulation and is not affiliated with, endorsed by or connected to any real league, club or player. The records it produces are outputs of its own model applied to players it generated,
  **Now:** No. Pro Football GM Club Soccer is not affiliated with, endorsed by or licensed by any league, club or player. Its draft pool is built from real players' careers, but the records it produces are outputs of its own model applied to the squad you built,
- **Was:** The campaign result is produced by the game's internal rules acting on players the game generated. It weighs squad quality, position fit and balance; it does not reproduce football, and it has no relationship to any real competition, club or player.
  **Now:** The campaign result is produced by the game's internal rules acting on the squad you drafted. It weighs squad quality, position fit and balance; it does not reproduce football, and it is not a forecast of any real competition, club or player.

### `content/blog/how-sports-simulation-engines-work.md`

- **Was:** No. 162-0 Baseball Draft & GM Team and Pro Basketball GM Franchise are fictional sports simulations built on generated player pools, and they are not affiliated with, endorsed by or connected to any real league, team or athlete.
  **Now:** Their player pools are. 162-0 Baseball Draft & GM Team and Pro Basketball GM Franchise build their draft pools from real players' careers, with ratings that are the games' own estimates rather than official statistics, and neither is affiliated with, endorsed by or licensed by any league, team, players' association or athlete.

### `content/blog/how-the-offside-rule-works.md`

- **Was:** Every club, competition and player in our games is fictional.
  **Now:** Our career sims use fictional clubs, competitions and players; our draft games build their player pools from real-world players' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, club or player.

### `content/blog/how-to-build-a-balanced-basketball-roster.md`

- **Was:** No. Pro Basketball GM Franchise and Basketball Career Sim are fictional sports simulations built on generated players. They are not affiliated with, endorsed by or connected to any real league, team or athlete,
  **Now:** In one of them. Pro Basketball GM Franchise builds its draft pool from real players' careers, with ratings that are the game's own estimates; Basketball Career Sim is set in a fictional league with fictional players. Neither is affiliated with, endorsed by or licensed by any league, team or athlete,

### `content/blog/injuries-in-sports-career-games.md`

- **Was:** Every league, team and player in our games is fictional.
  **Now:** Every league, team and player in our career sims is fictional.

### `content/blog/mma-boxing-fight-draft-guide.md`

- **Was:** Every result is the output of a model applied to fictional fighters, and describes nothing about any real bout, athlete or promotion.
  **Now:** Every result is the output of a model applied to the fighters you drafted — built from real fighters' careers and rated by the game's own estimates — and predicts nothing about any real bout, athlete or promotion.
- **Was:** No. The fighters are fictional and generated inside the game, and it is not affiliated with, endorsed by or connected to any real promotion, sanctioning body or athlete. Results are simulation outputs and describe nothing about any real bout.
  **Now:** Yes. The draft pools are built from real fighters' careers across eras and weight classes, with ratings and records that are the game's own estimates rather than official statistics. The game is not affiliated with, endorsed by or licensed by any promotion, sanctioning body or athlete, and results are simulation outputs that describe nothing about any real bout.
- **Was:** Drafting across eras is one of the genuine pleasures of a fictional pool —
  **Now:** Drafting across eras is one of the genuine pleasures of a simulated draft —
- **Was:** The fighters are fictional and generated inside the game. The game is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete. No result describes, predicts or relates to any real bout,
  **Now:** The fighter pools are built from real fighters' careers, with ratings and records that are the game's own estimates. The game is not affiliated with, endorsed by or licensed by any promotion, sanctioning body, event or athlete. No result describes or predicts any real bout,

### `content/blog/mma-fantasy-draft-strategy.md`

- **Was:** Drafting across eras is one of the genuine pleasures of a fictional pool,
  **Now:** Drafting across eras is one of the genuine pleasures of a simulated draft,
- **Was:** The fighters in the game are fictional and generated inside it. It is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete, and no draft or result describes or predicts anything real.
  **Now:** The game's fighter pools are built from real fighters' careers, with ratings and records that are the game's own estimates. It is not affiliated with, endorsed by or licensed by any promotion, sanctioning body, event or athlete, and no draft or result predicts anything real.

### `content/blog/mma-weight-classes-explained.md`

- **Was:** No. 40-0 MMA & Boxing Fight Draft is a fictional simulation and is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete.
  **Now:** 40-0 MMA & Boxing Fight Draft uses real fighters: its pools are built from real fighters' careers, with ratings and records that are the game's own estimates rather than official statistics. It is not affiliated with, endorsed by or licensed by any promotion, sanctioning body, event or athlete.
- **Was:** The simulators take fictional fighters generated inside the game, apply
  **Now:** The simulators take the fighters you drafted, apply

### `content/blog/ops-and-slugging-explained.md`

- **Was:** All players, teams and leagues in our games are fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/plus-minus-and-hockey-stats.md`

- **Was:** you are evaluating generated players from their attributes rather than from a statistical history, which removes most of these distortions at the point of selection
  **Now:** the draft pool is built from real players' careers and you compare them on the game's own ratings, which keeps most of these distortions out of the point of selection
- **Was:** Every league, team and player in our games is fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/power-play-and-penalty-kill.md`

- **Was:** Every league, team and player in our games is fictional, and the catalogue is under [sports career and GM games](/apps/category/sports-gm/).
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete. The catalogue is under [sports career and GM games](/apps/category/sports-gm/).

### `content/blog/quarterback-archetypes-explained.md`

- **Was:** and our games borrow the structure of downs, distance and clock rather than any league's identities. Every league, team and player in them is fictional.
  **Now:** and the structure of downs, distance and clock in our games comes from the sport itself. Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/reading-a-defense-basics.md`

- **Was:** Every league, team and player in our games is fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/rebuild-vs-retool.md`

- **Was:** Every league, team and player in our games is fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/salary-cap-basics-for-gm-games.md`

- **Was:** and the games are not affiliated with, endorsed by or connected to any real league, team or athlete.
  **Now:** and the games are not affiliated with, endorsed by or licensed by any league, team or athlete, although their draft pools are built from real players' careers.

### `content/blog/snake-draft-vs-auction-draft.md`

- **Was:** No. Pro Basketball GM Franchise and 162-0 Baseball Draft & GM Team are fictional sports simulations built on generated player pools. They are not affiliated with, endorsed by or connected to any real league, team or athlete,
  **Now:** No. Pro Basketball GM Franchise and 162-0 Baseball Draft & GM Team are not affiliated with, endorsed by or licensed by any league, team, players' association or athlete. Their draft pools are built from real players' careers, with ratings that are the games' own estimates,

### `content/blog/soccer-draft-xi-guide.md`

- **Was:** No. It is a generic simulator with fictional players and no affiliation with, endorsement by or connection to any real club, league or player. Because the pool is generated, you are judging players on the attributes and styles shown rather than on reputation.
  **Now:** No. It is not affiliated with, endorsed by or licensed by any club, league or player. Its draft pool is built from real players' careers and some of its screens use real club names, but the ratings are the game's own estimates, so judge players on the attributes and styles shown rather than on reputation.
- **Was:** **It does not describe anything real.** The players are fictional and generated inside the game. The result has no relationship to any real match, club, competition or player,
  **Now:** **It does not forecast anything real.** The pool is built from real players' careers, but the result is the game's model scoring your squad, and it predicts nothing about any real match, club, competition or player,

### `content/blog/soccer-formations-explained.md`

- **Was:** No. Pro Football GM Club Soccer is a fictional simulation, and it is not affiliated with, endorsed by or connected to any real league, club or player. The players you draft are generated inside the game, which is precisely why judging position fit and playing style is the skill it asks for.
  **Now:** Pro Football GM Club Soccer builds its draft pool from real players' careers and uses real club names in some of its screens, with ratings that are the game's own estimates; it is not affiliated with, endorsed by or licensed by any league, club or player. Judging position fit and playing style is still the skill it asks for, because a famous name in the wrong role weakens the side.

### `content/blog/soccer-positions-explained.md`

- **Was:** assembling a balanced starting eleven from a generated pool
  **Now:** assembling a balanced starting eleven from the draft pool
- **Was:** Every club, competition and player in our games is fictional.
  **Now:** Our career sims use fictional clubs, competitions and players; our draft games build their player pools from real-world players' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, club or player.

### `content/blog/southpaw-vs-orthodox.md`

- **Was:** The fighters in the game are fictional and generated inside it. It is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete,
  **Now:** The game's fighter pools are built from real fighters' careers, with ratings and records that are the game's own estimates. It is not affiliated with, endorsed by or licensed by any promotion, sanctioning body, event or athlete,

### `content/blog/sports-gm-games-without-internet.md`

- **Was:** No. The studio's sports titles are fictional simulations and are not affiliated with, endorsed by or connected to any real league, team or athlete. That is also one reason they suit offline play: there is no live data feed to be out of sync with, because there is no real-world data involved at all.
  **Now:** No. None of the studio's sports titles is affiliated with, endorsed by or licensed by any league, team or athlete. The career sims are fictional; the draft and GM games build their player pools from real athletes' careers, but those pools ship inside the app with ratings that are the games' own estimates. That is one reason they suit offline play: there is no live data feed to be out of sync with.
- **Was:** **There is no live data.** A simulator built on fictional players has nothing to sync with.
  **Now:** **There is no live data.** A simulator whose player pool ships inside the app has nothing to sync with.
- **Was:** The projected record is produced by the game's own internal rules acting on players it generated. It is not fetching anything, not comparing you to anyone, and not describing or forecasting any real league, team or athlete.
  **Now:** The projected record is produced by the game's own internal rules acting on the roster you drafted. It is not fetching anything, not comparing you to anyone, and not forecasting anything about any real league, team or athlete.

### `content/blog/striking-vs-grappling-in-mma.md`

- **Was:** The fighters in the game are fictional and generated inside it; it is not affiliated with, endorsed by or connected to any real promotion, sanctioning body or athlete,
  **Now:** The game's fighter pools are built from real fighters' careers, with ratings and records that are the game's own estimates; it is not affiliated with, endorsed by or licensed by any promotion, sanctioning body or athlete,

### `content/blog/style-matchups-in-a-fight-simulator.md`

- **Was:** **What it does not claim:** anything about reality. The fighters are fictional and generated inside the game. A result does not describe, predict or relate to any real bout or athlete.
  **Now:** **What it does not claim:** anything about reality. The fighter pools are built from real fighters' careers, but the ratings are the game's own estimates and a result does not describe or predict any real bout or athlete.
- **Was:** which are one of the genuine pleasures of a fictional pool.
  **Now:** which are one of the genuine pleasures of a simulated draft.
- **Was:** The fighters, records and results in the game are fictional. It is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete.
  **Now:** The game's fighter pools are built from real fighters' careers, with ratings and records that are the game's own estimates, and its results are simulations. It is not affiliated with, endorsed by or licensed by any promotion, sanctioning body, event or athlete.

### `content/blog/transfers-and-contracts-explained.md`

- **Was:** Every club, competition and player in our games is fictional.
  **Now:** Our career sims use fictional clubs, competitions and players; our draft games build their player pools from real-world players' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, club or player.

### `content/blog/two-way-players-explained.md`

- **Was:** Nothing here describes any real athlete. Simulation examples refer to generated players in fictional leagues.
  **Now:** Nothing here describes any real athlete. Simulation examples refer to the career sim's generated players in fictional leagues.
- **Was:** Everything above about simulation behaviour refers to generated players in fictional leagues. Reign Creative's baseball games contain no real athletes, teams or competitions, and nothing here is a description of, or a claim about, any real player's career.
  **Now:** Everything above about simulation behaviour refers to the career sim's generated players in fictional leagues, and nothing here is a description of, or a claim about, any real player's career. The draft game is different: its player pool is built from real players' careers, with ratings that are the game's own estimates.

### `content/blog/understanding-sports-sim-probability.md`

- **Was:** 162-0 Baseball Draft & GM Team and Football Franchise GM League are simulations built on generated players, not affiliated with, endorsed by or connected to any real league, team or athlete.
  **Now:** 162-0 Baseball Draft & GM Team and Football Franchise GM League build their draft pools from real players' careers, with ratings that are the games' own estimates, and are not affiliated with, endorsed by or licensed by any league, team or athlete.
- **Was:** The probabilities in a sports simulation are properties of software written by people, applied to generated players who do not exist.
  **Now:** The probabilities in a sports simulation are properties of software written by people, applied to ratings the software assigns — whether the players are generated or drawn from real careers.

### `content/blog/what-is-era-in-baseball.md`

- **Was:** All players, teams and leagues in our games are fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/what-is-icing-in-hockey.md`

- **Was:** Every league, team and player in our games is fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/what-is-whip-in-baseball.md`

- **Was:** In [162-0 Baseball Draft & GM Team](/apps/baseball-draft-gm-team/) you are evaluating generated players from attributes rather than from a statistical record, which removes the noise problem at the point of selection. But once your roster is playing, the same reasoning applies to your own pitchers:
  **Now:** In [162-0 Baseball Draft & GM Team](/apps/baseball-draft-gm-team/) the draft pool is built from real players' careers, and you compare pitchers on numbers that include ERA and WHIP, so the noise problem above applies at the point of selection too. Once your roster is playing, the same reasoning applies to your own pitchers:
- **Was:** All players, teams and leagues in our games are fictional.
  **Now:** Our career sims are set in fictional leagues with fictional teams and players; our draft and GM games build their player pools from real-world athletes' careers, with ratings that are the games' own estimates. None of them is affiliated with or endorsed by any league, team or athlete.

### `content/blog/what-makes-a-good-draft-board.md`

- **Was:** No. Football Franchise GM League and Pro Basketball GM Franchise are fictional sports simulations built on generated player pools, and they are not affiliated with, endorsed by or connected to any real league, team or athlete. Every rating you compare on the board belongs to a generated player.
  **Now:** Football Franchise GM League and Pro Basketball GM Franchise build their draft pools from real players' careers, and some GM screens use real team names. Every rating you compare on the board is the game's own estimate rather than an official statistic, and neither game is affiliated with, endorsed by or licensed by any league, team, players' association or athlete.

## H. Non-sports prose follow-up (not edited — owner action)

### H1. Articles that still name a renamed app by an old Play title

Not wrong as history — each app page now says "Previously listed on Google Play as …" and carries the old title as `alternateName` — but stale as a current name.

| Old title | Files | Occurrences |
| --- | ---: | ---: |
| Mental Math & Memory Games | 111 | 271 |
| Keto Diet Tracker: Low Carb | 18 | 24 |
| Regal Video Player | 16 | 24 |
| Keto Diet Tracker | 6 | 10 |
| Anime Casino Slot Machine Game | 3 | 8 |

<details><summary>Per-file counts</summary>

| File | Category | Old title | Count |
| --- | --- | --- | ---: |
| `abstract-reasoning-tests-explained.md` | education-brain | Mental Math & Memory Games | 4 |
| `accessibility-in-brain-training-apps.md` | education-brain | Mental Math & Memory Games | 5 |
| `accuracy-before-speed.md` | education-brain | Mental Math & Memory Games | 2 |
| `added-sugars-vs-total-sugars.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `adding-a-list-of-numbers-mentally.md` | education-brain | Mental Math & Memory Games | 2 |
| `analogy-puzzles-explained.md` | education-brain | Mental Math & Memory Games | 4 |
| `android-app-permissions-explained.md` | video-utility | Regal Video Player | 1 |
| `android-video-player-guide.md` | video-utility | Regal Video Player | 1 |
| `android-video-players-compared.md` | video-utility | Regal Video Player | 7 |
| `are-online-iq-tests-accurate.md` | education-brain | Mental Math & Memory Games | 3 |
| `arithmetic-sequences-explained.md` | education-brain | Mental Math & Memory Games | 1 |
| `attention-span-exercises.md` | education-brain | Mental Math & Memory Games | 4 |
| `audio-codecs-explained.md` | video-utility | Regal Video Player | 1 |
| `av1-on-android-explained.md` | video-utility | Regal Video Player | 1 |
| `backward-digit-span.md` | education-brain | Mental Math & Memory Games | 4 |
| `battery-and-performance-in-mobile-games.md` | action-arcade | Regal Video Player | 1 |
| `brain-games-for-older-adults.md` | education-brain | Mental Math & Memory Games | 4 |
| `brain-games-for-the-whole-family.md` | education-brain | Mental Math & Memory Games | 5 |
| `brain-training-apps-compared.md` | education-brain | Mental Math & Memory Games | 4 |
| `brain-training-for-busy-adults.md` | education-brain | Mental Math & Memory Games | 2 |
| `brain-training-questions-answered.md` | education-brain | Mental Math & Memory Games | 4 |
| `budget-math-in-your-head.md` | education-brain | Mental Math & Memory Games | 1 |
| `building-a-daily-practice-habit.md` | education-brain | Mental Math & Memory Games | 1 |
| `can-practice-raise-an-iq-score.md` | education-brain | Mental Math & Memory Games | 3 |
| `careless-arithmetic-mistakes.md` | education-brain | Mental Math & Memory Games | 1 |
| `change-detection-tasks.md` | education-brain | Mental Math & Memory Games | 3 |
| `choosing-a-difficulty-level.md` | education-brain | Mental Math & Memory Games | 3 |
| `common-reasoning-mistakes.md` | education-brain | Mental Math & Memory Games | 3 |
| `comparing-fractions-mentally.md` | education-brain | Mental Math & Memory Games | 1 |
| `compensation-strategy-in-arithmetic.md` | education-brain | Mental Math & Memory Games | 2 |
| `conditional-reasoning-if-then.md` | education-brain | Mental Math & Memory Games | 3 |
| `counting-up-subtraction.md` | education-brain | Mental Math & Memory Games | 2 |
| `cross-multiplication-in-one-pass.md` | education-brain | Mental Math & Memory Games | 2 |
| `daily-challenge-formats-explained.md` | education-brain | Mental Math & Memory Games | 4 |
| `deductive-reasoning-examples.md` | education-brain | Mental Math & Memory Games | 3 |
| `delayed-recall-explained.md` | education-brain | Mental Math & Memory Games | 3 |
| `deliberate-practice-in-brain-games.md` | education-brain | Mental Math & Memory Games | 2 |
| `designing-memory-games-beyond-matching-pairs.md` | education-brain | Mental Math & Memory Games | 1 |
| `digit-span-explained.md` | education-brain | Mental Math & Memory Games | 5 |
| `do-brain-training-apps-work.md` | education-brain | Mental Math & Memory Games | 2 |
| `electrolytes-on-low-carb.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `estimating-sales-tax.md` | education-brain | Mental Math & Memory Games | 1 |
| `estimation-techniques-explained.md` | education-brain | Mental Math & Memory Games | 1 |
| `fibonacci-and-recursive-sequences.md` | education-brain | Mental Math & Memory Games | 1 |
| `finding-the-original-price-before-a-discount.md` | education-brain | Mental Math & Memory Games | 1 |
| `finding-the-rule-in-a-number-pattern.md` | education-brain | Mental Math & Memory Games | 1 |
| `fluid-and-crystallized-intelligence.md` | education-brain | Mental Math & Memory Games | 1 |
| `fraction-decimal-percent-conversions.md` | education-brain | Mental Math & Memory Games | 1 |
| `frame-rate-and-resolution-explained.md` | video-utility | Regal Video Player | 1 |
| `fun-iq-quizzes-versus-real-assessments.md` | education-brain | Mental Math & Memory Games | 3 |
| `geometric-sequences-explained.md` | education-brain | Mental Math & Memory Games | 1 |
| `glycemic-index-and-load.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `google-play-data-safety-explained.md` | video-utility | Keto Diet Tracker: Low Carb | 1 |
| `google-play-data-safety-explained.md` | video-utility | Regal Video Player | 1 |
| `grid-and-position-memory.md` | education-brain | Mental Math & Memory Games | 4 |
| `growing-sequence-memory-games.md` | education-brain | Mental Math & Memory Games | 4 |
| `hardware-vs-software-decoding.md` | video-utility | Regal Video Player | 1 |
| `helping-a-child-with-math-facts.md` | education-brain | Mental Math & Memory Games | 1 |
| `how-iq-scores-are-calculated.md` | education-brain | Mental Math & Memory Games | 3 |
| `how-long-a-brain-training-session-should-be.md` | education-brain | Mental Math & Memory Games | 2 |
| `how-much-protein-per-day.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `how-to-hit-a-protein-goal.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `how-to-improve-concentration.md` | education-brain | Mental Math & Memory Games | 3 |
| `how-to-memorize-numbers.md` | education-brain | Mental Math & Memory Games | 3 |
| `how-to-play-mkv-files-on-android.md` | video-utility | Regal Video Player | 1 |
| `how-to-track-practice-progress.md` | education-brain | Mental Math & Memory Games | 2 |
| `how-to-track-protein-intake.md` | health-nutrition | Keto Diet Tracker | 1 |
| `inductive-reasoning-examples.md` | education-brain | Mental Math & Memory Games | 2 |
| `interference-and-forgetting.md` | education-brain | Mental Math & Memory Games | 3 |
| `interleaving-versus-blocked-practice.md` | education-brain | Mental Math & Memory Games | 2 |
| `intermittent-fasting-windows-explained.md` | health-nutrition | Keto Diet Tracker | 4 |
| `iq-and-emotional-intelligence.md` | education-brain | Mental Math & Memory Games | 4 |
| `iq-score-ranges-and-bands.md` | education-brain | Mental Math & Memory Games | 3 |
| `judging-your-own-recall.md` | education-brain | Mental Math & Memory Games | 3 |
| `keto-flu-explained.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `keto-macros-explained.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `keto-macros-explained.md` | health-nutrition | Keto Diet Tracker | 1 |
| `lattice-and-line-multiplication.md` | education-brain | Mental Math & Memory Games | 2 |
| `left-to-right-addition.md` | education-brain | Mental Math & Memory Games | 2 |
| `limitations-of-iq-testing.md` | education-brain | Mental Math & Memory Games | 2 |
| `logic-grid-puzzles.md` | education-brain | Mental Math & Memory Games | 4 |
| `low-carb-tracking-apps-compared.md` | health-nutrition | Keto Diet Tracker: Low Carb | 6 |
| `low-carb-tracking-apps-compared.md` | health-nutrition | Keto Diet Tracker | 1 |
| `math-anxiety-in-adults.md` | education-brain | Mental Math & Memory Games | 2 |
| `matrix-reasoning-puzzles.md` | education-brain | Mental Math & Memory Games | 4 |
| `memory-techniques-that-work.md` | education-brain | Mental Math & Memory Games | 1 |
| `mental-division-tricks.md` | education-brain | Mental Math & Memory Games | 1 |
| `mental-math-training-guide.md` | education-brain | Mental Math & Memory Games | 2 |
| `mental-math-tricks-that-work.md` | education-brain | Mental Math & Memory Games | 2 |
| `missing-number-problems.md` | education-brain | Mental Math & Memory Games | 2 |
| `mnemonic-systems-for-numbers.md` | education-brain | Mental Math & Memory Games | 3 |
| `multiplication-shortcuts-explained.md` | education-brain | Mental Math & Memory Games | 1 |
| `multiplying-by-five-and-twenty-five.md` | education-brain | Mental Math & Memory Games | 2 |
| `multiplying-by-nine-and-ninety-nine.md` | education-brain | Mental Math & Memory Games | 2 |
| `n-back-tasks-explained.md` | education-brain | Mental Math & Memory Games | 3 |
| `net-carbs-explained-keto-tracking.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `net-carbs-explained-keto-tracking.md` | health-nutrition | Keto Diet Tracker | 1 |
| `nonverbal-reasoning-tests-explained.md` | education-brain | Mental Math & Memory Games | 3 |
| `number-bonds-and-making-tens.md` | education-brain | Mental Math & Memory Games | 2 |
| `number-sequence-puzzles-explained.md` | education-brain | Mental Math & Memory Games | 2 |
| `numerical-reasoning-tests-explained.md` | education-brain | Mental Math & Memory Games | 2 |
| `odd-one-out-puzzles.md` | education-brain | Mental Math & Memory Games | 4 |
| `offline-brain-training-apps.md` | education-brain | Mental Math & Memory Games | 5 |
| `paired-associate-learning.md` | education-brain | Mental Math & Memory Games | 3 |
| `percentages-in-your-head.md` | education-brain | Mental Math & Memory Games | 1 |
| `percentiles-and-standard-scores.md` | education-brain | Mental Math & Memory Games | 3 |
| `picture-in-picture-on-android.md` | video-utility | Regal Video Player | 1 |
| `plant-vs-animal-protein.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `protein-tracking-apps-compared.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `ratios-and-proportions-mentally.md` | education-brain | Mental Math & Memory Games | 1 |
| `reading-nutrition-labels.md` | health-nutrition | Keto Diet Tracker: Low Carb | 2 |
| `reading-response-time-numbers.md` | education-brain | Mental Math & Memory Games | 2 |
| `recognition-versus-recall.md` | education-brain | Mental Math & Memory Games | 3 |
| `reliability-and-validity-in-testing.md` | education-brain | Mental Math & Memory Games | 4 |
| `remembering-a-long-number.md` | education-brain | Mental Math & Memory Games | 2 |
| `remuxing-vs-transcoding.md` | video-utility | Regal Video Player | 1 |
| `russian-peasant-multiplication.md` | education-brain | Mental Math & Memory Games | 2 |
| `sequences-with-more-than-one-answer.md` | education-brain | Mental Math & Memory Games | 1 |
| `serving-size-vs-portion-size.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `short-term-versus-working-memory.md` | education-brain | Mental Math & Memory Games | 2 |
| `simplifying-fractions-quickly.md` | education-brain | Mental Math & Memory Games | 1 |
| `slot-reel-mechanics-explained.md` | anime-creative | Anime Casino Slot Machine Game | 2 |
| `slot-volatility-explained.md` | anime-creative | Anime Casino Slot Machine Game | 2 |
| `social-casino-vs-real-money-gambling.md` | anime-creative | Anime Casino Slot Machine Game | 4 |
| `spatial-reasoning-and-number-sense.md` | education-brain | Mental Math & Memory Games | 3 |
| `squares-cubes-and-roots.md` | education-brain | Mental Math & Memory Games | 1 |
| `strategy-for-timed-reasoning-tests.md` | education-brain | Mental Math & Memory Games | 2 |
| `subtitle-formats-explained.md` | video-utility | Regal Video Player | 1 |
| `subtitles-not-working-on-android.md` | video-utility | Regal Video Player | 1 |
| `subtraction-without-borrowing.md` | education-brain | Mental Math & Memory Games | 2 |
| `sugar-alcohols-explained.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `syllogisms-explained.md` | education-brain | Mental Math & Memory Games | 2 |
| `tdee-and-energy-balance.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `times-tables-memorisation.md` | education-brain | Mental Math & Memory Games | 2 |
| `unit-price-comparison.md` | education-brain | Mental Math & Memory Games | 1 |
| `verbal-reasoning-question-types.md` | education-brain | Mental Math & Memory Games | 4 |
| `video-codecs-explained.md` | video-utility | Regal Video Player | 2 |
| `video-file-formats-explained.md` | video-utility | Regal Video Player | 2 |
| `visual-pattern-puzzles.md` | education-brain | Mental Math & Memory Games | 5 |
| `warming-up-before-focused-work.md` | education-brain | Mental Math & Memory Games | 2 |
| `what-a-brain-age-score-means.md` | education-brain | Mental Math & Memory Games | 4 |
| `what-a-brain-training-subscription-buys.md` | education-brain | Mental Math & Memory Games | 3 |
| `what-iq-tests-actually-measure.md` | education-brain | Mental Math & Memory Games | 2 |
| `what-is-a-ketone-reading.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `what-is-a-ketone-reading.md` | health-nutrition | Keto Diet Tracker | 2 |
| `what-processing-speed-means.md` | education-brain | Mental Math & Memory Games | 3 |
| `what-the-average-iq-score-means.md` | education-brain | Mental Math & Memory Games | 3 |
| `who-invented-the-iq-test.md` | education-brain | Mental Math & Memory Games | 2 |
| `why-am-i-slow-at-mental-math.md` | education-brain | Mental Math & Memory Games | 1 |
| `why-divisibility-rules-work.md` | education-brain | Mental Math & Memory Games | 1 |
| `why-food-databases-disagree.md` | health-nutrition | Keto Diet Tracker: Low Carb | 1 |
| `why-practice-progress-plateaus.md` | education-brain | Mental Math & Memory Games | 2 |
| `working-backwards-problems.md` | education-brain | Mental Math & Memory Games | 2 |
| `working-memory-and-training.md` | education-brain | Mental Math & Memory Games | 3 |

</details>

### H2. Sentences the live listings may now contradict

**IQ Test & Brain Training Games** (formerly Mental Math & Memory Games). Its 2026-10-02 listing advertises an IQ test across seven domains, a personality test and Big Five profile, a memory test, a reaction time test and assessment history. 61 sentences in 41 articles deny that the app contains any test or assessment, an IQ test, personality content or a reaction test. Some phrasing (that results are not a clinical or professional assessment) still matches the listing's own disclaimer; the blanket "contains no test" claims do not.

| File:line | Sentence |
| --- | --- |
| `abstract-reasoning-tests-explained.md:58` | Its Number Pattern Challenge is a rule-discovery drill in numbers, which is an analogue of this task rather than an equivalent, and it is not a test." |
| `abstract-reasoning-tests-explained.md:77` | That is a useful analogue of the same mental move, but it is practice in a game rather than an assessment, and it produces no score that means anything outside the app." |
| `abstract-reasoning-tests-explained.md:153` | That is an analogue of abstract reasoning, not an equivalent, and it is not an assessment of anything. |
| `analogy-puzzles-explained.md:160` | That is a supporting skill, not the task, and the app makes no assessment of any kind. |
| `are-online-iq-tests-accurate.md:59` | "Mental Math & Memory Games contains no test at all, so there is nothing in it to be accurate or inaccurate about. |
| `are-online-iq-tests-accurate.md:78` | It has no test, no assessment, no percentile, no brain-age figure and no estimate of intelligence. |
| `are-online-iq-tests-accurate.md:156` | [Mental Math & Memory Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and it contains no test. |
| `backward-digit-span.md:59` | Those are game statistics, not assessment scores, and the app administers no cognitive test." |
| `brain-games-for-older-adults.md:58` | "Mental Math & Memory Games produces no brain-age number, no percentile, no cognitive assessment and no age comparison of any kind. |
| `brain-games-for-older-adults.md:153` | Mental Math & Memory Games does not produce a brain-age figure, a cognitive age, a percentile, an IQ estimate or any comparison against an age group. |
| `brain-games-for-older-adults.md:153` | It contains no cognitive assessment, no reaction test and no personality test. |
| `brain-training-questions-answered.md:66` | Mental Math & Memory Games contains no IQ test, no cognitive assessment and no percentile scoring, and its score is not an estimate of anything but that session." |
| `brain-training-questions-answered.md:132` | It contains no IQ test, no cognitive assessment, no personality test, no brain-age figure and no percentile scoring. |
| `careless-arithmetic-mistakes.md:158` | It is a practice game and nothing more: it records performance on its own drills, offers no test or assessment of any kind, and makes no claim about intelligence. |
| `change-detection-tasks.md:60` | They are practice and entertainment, not a test of visual memory, and the app contains no assessment." |
| `change-detection-tasks.md:139` | The app records score, accuracy, streak, response time and personal bests, and it contains no test or assessment of any kind — a missing-item result is a game statistic, not a measurement of your visual memory. |
| `common-reasoning-mistakes.md:178` | The app records score, accuracy, streak and response time on its drills and claims nothing beyond that; it contains no test, no assessment and no verdict about you. |
| `comparing-fractions-mentally.md:170` | The app is an educational game and a practice tool, not a standardised assessment; the numbers it keeps are score, accuracy, streak, response time and personal bests on the modes you play. |
| `delayed-recall-explained.md:82` | The app contains no assessment, no clinical measure and no interpretation of your results." |
| `digit-span-explained.md:5` | How the stepped procedure produces that figure, and why an app's best span is not a test score.", |
| `digit-span-explained.md:57` | That is a personal best in a game, not a measurement, and the app administers no cognitive assessment of any kind." |
| `digit-span-explained.md:80` | It is not a test, not an assessment, and not comparable to a score produced by a psychologist using a standardised instrument." |
| `digit-span-explained.md:118` | The app administers no cognitive assessment of any kind, and this article explains what the real procedure does so you can see the difference. |
| `finding-the-original-price-before-a-discount.md:181` | The app is an educational game and a practice tool rather than an assessment of anything, and the numbers it records — score, accuracy, streak, response time and personal bests — describe drill performance and nothing else. |
| `fun-iq-quizzes-versus-real-assessments.md:56` | "Mental Math & Memory Games ships quiz-shaped practice — Boss Quiz, True or False Math, Tap the Correct Answer — and no assessment of any kind." |
| `fun-iq-quizzes-versus-real-assessments.md:75` | It contains no assessment, no percentile and no estimate of intelligence, and everything it records describes a practice session." |
| `fun-iq-quizzes-versus-real-assessments.md:159` | **None of them is an assessment.** The app contains no IQ test, no cognitive assessment, no personality test, no brain-age estimate and no percentile scoring. |
| `grid-and-position-memory.md:76` | Mental Math & Memory Games contains no test of any kind, and its grid modes produce a game score rather than a measurement." |
| `grid-and-position-memory.md:147` | It is not a test result, it is not comparable to anyone else's number, and the app contains no assessment of any kind. |
| `growing-sequence-memory-games.md:148` | It is not a standardised assessment, and Mental Math & Memory Games contains no test of any kind. |
| `helping-a-child-with-math-facts.md:155` | It does not decide what a child should learn next, it does not track a syllabus, and it makes no assessment of any kind — the numbers it keeps are score, accuracy, streak, response time and personal bests on its own drills. |
| `how-iq-scores-are-calculated.md:158` | The app therefore produces no IQ score, no percentile and no classification of any kind, and a higher score in it says only that you did better at that mode, at that difficulty, than you did before. |
| `how-to-improve-concentration.md:145` | What it does not have is equally worth stating: there is no attention test in the app, no reaction test, and no assessment of any kind. |
| `how-to-track-practice-progress.md:160` | They are not an assessment. |
| `interference-and-forgetting.md:154` | The app records score, accuracy, streak, response time and personal bests, and it contains no assessment of any kind. |
| `iq-and-emotional-intelligence.md:55` | "Mental Math & Memory Games contains no emotional-intelligence content, no personality content and no assessment of any kind." |
| `iq-and-emotional-intelligence.md:74` | The app has no emotional-intelligence content, no personality questionnaire and no assessment of any kind. |
| `iq-and-emotional-intelligence.md:142` | Mental Math & Memory Games is our own app, built by Reign Creative, and it contains no emotional-intelligence content, no personality content and no assessment of any kind. |
| `limitations-of-iq-testing.md:157` | So it does not: there is no IQ estimate, no percentile, no classification, no brain-age figure and no assessment of any kind in the product. |
| `math-anxiety-in-adults.md:145` | The app does not diagnose, assess or treat anything, produces no test result, and makes no claim about intelligence or about anxiety. |
| `matrix-reasoning-puzzles.md:76` | That rehearses the same habit in one dimension, but it is not a matrix puzzle and the app is not an assessment of any kind." |
| `mnemonic-systems-for-numbers.md:159` | It offers no assessment, no test and no interpretation of what your numbers say about you — practice and entertainment on one side, standardised psychological assessment on the other, and nothing in the product crosses that line. |
| `nonverbal-reasoning-tests-explained.md:138` | It is an educational game, not an assessment, and it produces no percentile, band or classification of any kind. |
| `numerical-reasoning-tests-explained.md:156` | What it does not do is present a data table and ask what follows from it, and it makes no assessment of any kind. |
| `paired-associate-learning.md:57` | "Mental Math & Memory Games includes Letter Pairs and Letter-Number Pairs rounds as part of its memory catalogue; they are game modes, not an assessment, and the app contains no test of any kind." |
| `paired-associate-learning.md:159` | It contains no assessment of any kind, and a pair-drill result is a game statistic rather than a measurement of associative memory. |
| `recognition-versus-recall.md:155` | The app records score, accuracy, streak, response time and personal bests on its own drills and nothing more; it contains no assessment, no test and no interpretation of what any of it means about your abilities. |
| `reliability-and-validity-in-testing.md:152` | It contains no IQ test, no cognitive assessment and no percentile scoring, and the numbers it shows you describe what happened in a session: score, accuracy, streak, average and median response time, fastest correct answer, and personal bests per mode. |
| `remembering-a-long-number.md:147` | Second, the app is practice and entertainment, not assessment: it records score, accuracy, streak, response time and personal bests, and contains no test of any kind. |
| `short-term-versus-working-memory.md:153` | It contains no cognitive assessment, no test, and no interpretation of what your numbers mean about you — those belong to qualified professionals using standardised instruments, which is a different activity from practice or entertainment. |
| `times-tables-memorisation.md:171` | Mental Math & Memory Games, our own app at Reign Creative, is an educational game rather than an assessment of any kind — it contains no test, produces no score that means anything outside the app, and makes no claim about the player's abilities. |
| `unit-price-comparison.md:169` | The app is an educational game and a practice tool rather than an assessment of anything. |
| `verbal-reasoning-question-types.md:142` | It is an educational game rather than an assessment, and it offers no preparation for a verbal reasoning test. |
| `what-a-brain-age-score-means.md:74` | It contains no IQ test and no cognitive assessment of any kind, and it is published as an educational game." |
| `what-a-brain-age-score-means.md:142` | It contains no IQ test and no cognitive assessment. |
| `what-iq-tests-actually-measure.md:55` | That is a genuine, useful outcome and it is not an assessment of anything." |
| `what-iq-tests-actually-measure.md:74` | It contains no test, no assessment, no percentile and no estimate of intelligence. |
| `what-iq-tests-actually-measure.md:148` | The app contains no test, no norms, no percentile, no classification, and no estimate of anyone's intelligence. |
| `what-processing-speed-means.md:57` | It contains no reaction-time test and no assessment of any kind." |
| `who-invented-the-iq-test.md:142` | It contains no IQ test, no cognitive assessment and no percentile scoring. |
| `why-am-i-slow-at-mental-math.md:164` | It is a practice game, not an assessment: it makes no claim about intelligence, produces no test result, and its numbers describe performance on its own drills and nothing else. |

**Ketora: Keto Diet Carb Tracker** (formerly Keto Diet Tracker: Low Carb). The new listing no longer mentions electrolyte (sodium/potassium/magnesium) logging, GKI, photo logs, named sweeteners (erythritol, allulose, monk fruit), carb-limit alerts or monthly summaries; it now says fiber and sugar alcohols, describes recipes, a meal planner, an AI coach and an optional Ketora Premium, while the Play badge still shows no in-app purchases. 16 sentences:

| File:line | Sentence |
| --- | --- |
| `added-sugars-vs-total-sugars.md:165` | [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) works from total carbohydrate, subtracting fibre and sweeteners including erythritol, allulose and monk fruit to produce net carbs as you log. |
| `electrolytes-on-low-carb.md:158` | [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) includes logging for sodium, potassium and magnesium alongside water intake, net carbs, fat and protein, so the whole day sits in one record rather than across several apps. |
| `glycemic-index-and-load.md:162` | [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) works in net carbs rather than glycemic index, subtracting fibre and sweeteners including erythritol, allulose and monk fruit from total carbohydrate as you log. |
| `intermittent-fasting-windows-explained.md:81` | "answer": "Keto Diet Tracker includes an intermittent fasting timer alongside its food log, net carb tracking, water tracking and electrolyte tracking. |
| `intermittent-fasting-windows-explained.md:245` | [Keto Diet Tracker](/apps/keto-diet-tracker/) includes an intermittent fasting timer alongside the rest of its logging: a food log with automatic net carb subtraction, a low-carb food database with a barcode scanner, custom foods and recipes, water tracking, electrolyte tracking for sodium, potassium and magnesium, ketone logs for readings you have taken yourself, body measurements, photo logs, an |
| `keto-flu-explained.md:171` | [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) keeps net carbs, fat, protein, water, sodium, potassium and magnesium in one daily record, alongside an intermittent fasting timer and space for any ketone readings you have taken yourself. |
| `keto-macros-explained.md:234` | [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) does the net carb subtraction as you log — fiber and sweeteners such as erythritol, allulose and monk fruit come off total carbohydrate automatically — and can alert you when a day passes a limit you set yourself. |
| `low-carb-tracking-apps-compared.md:79` | "answer": "Keto Diet Tracker: Low Carb is free to download on Google Play, is supported by ads, and has no in-app purchases. |
| `low-carb-tracking-apps-compared.md:83` | Keto Diet Tracker records blood, urine strip and breath readings including GKI, and it does not measure anything itself. |
| `low-carb-tracking-apps-compared.md:157` | [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) subtracts fiber along with erythritol, allulose and monk fruit from total carbohydrate each time you log a food, and it can alert you when a day passes a limit you set yourself. |
| `low-carb-tracking-apps-compared.md:208` | \| Keto Diet Tracker: Low Carb \| Free to download, supported by ads, no in-app purchases. \| |
| `low-carb-tracking-apps-compared.md:220` | **Pick [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) if** you want the net carb subtraction handled with a stated rule, you log ketones or fasting windows or electrolytes, and you would rather have ads than a subscription. |
| `reading-nutrition-labels.md:82` | Keto Diet Tracker: Low Carb has a barcode scanner and a low-carb food database, and it subtracts fiber and sweeteners such as erythritol, allulose and monk fruit from total carbohydrate as you log. |
| `reading-nutrition-labels.md:247` | [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) is the more label-focused of our two: a barcode scanner and a low-carb food database pull packaged items in, custom foods and recipes cover anything you cook, and fiber and sweeteners such as erythritol, allulose and monk fruit come off total carbohydrate automatically as you log. |
| `sugar-alcohols-explained.md:165` | [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) subtracts fibre and sweeteners including erythritol, allulose and monk fruit from total carbohydrate automatically as you log, so the net carb figure is calculated rather than done by hand in a supermarket aisle. |
| `why-food-databases-disagree.md:165` | [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) includes a low-carb food database and a barcode scanner for packaged items, plus custom foods and recipes for anything you make yourself. |

**Vegas Casino Slots JACKPOT WIN** (formerly Anime Casino Slot Machine Game). The new listing no longer mentions 25 machines, anime/manga/kawaii sets, Mini/Major/Grand meters or a VIP tier (the store icon still reads "Casino Anime Slots"). 10 sentences mention the app; those asserting the 25 machines or the meters are the ones at risk:

| File:line | Sentence |
| --- | --- |
| `slot-reel-mechanics-explained.md:70` | "question": "Are the mechanics in Anime Casino Slot Machine Game the same as a real slot machine's?", |
| `slot-reel-mechanics-explained.md:148` | Anime Casino Slot Machine Game is built by Reign Creative, and it is the reason this glossary is framed the way it is. |
| `slot-reel-mechanics-explained.md:150` | Full details are on the [app page](/apps/anime-casino-slots/). |
| `slot-volatility-explained.md:71` | In a social casino game such as Anime Casino Slot Machine Game, coins cannot be transferred, sold or redeemed, so volatility determines how often something happens and how long a coin balance lasts, not what anything costs. |
| `slot-volatility-explained.md:141` | Anime Casino Slot Machine Game is our own app, built by Reign Creative, and it is a social casino game: twenty-five original anime and manga-themed machines played entirely with virtual coins, with no real-money gambling and no way to transfer, sell or redeem those coins. |
| `slot-volatility-explained.md:143` | The [app page](/apps/anime-casino-slots/) lists what each machine is built around, and the coin balance simply refills through daily rewards rather than through a wallet. |
| `social-casino-vs-real-money-gambling.md:51` | "Anime Casino Slot Machine Game, which we build, uses virtual coins only, attaches no real-money prizes to its jackpot meters, and is rated Teen on Google Play; its coins cannot be transferred, sold or redeemed.", |
| `social-casino-vs-real-money-gambling.md:64` | In Anime Casino Slot Machine Game the Mini, Major and Grand meters build locally as you spin and carry no real-money prizes; coins cannot be transferred, sold or redeemed for money, merchandise or physical prizes. |
| `social-casino-vs-real-money-gambling.md:68` | Anime Casino Slot Machine Game is rated Teen on Google Play and its own listing states it is intended for an adult audience for entertainment purposes, and that success in the game does not imply future success in real-money gambling. |
| `social-casino-vs-real-money-gambling.md:126` | Anime Casino Slot Machine Game is our own app, built by Reign Creative, and it is a useful worked example because every relevant fact about it is public on its [app page](/apps/anime-casino-slots/) and on its store listing. |

**Video Player All Formats PRO** (formerly Regal Video Player): description unchanged, so no feature sentence is at risk; only the name is stale (H1).

## I. Owner actions

Owner-only compliance notes are kept outside this public repository. The items
below are the website-facing ones.

1. **Football listing description still uses the old name.** The title is
   "Football Franchise GM League", but the description still opens "Build a
   roster in 20-0 Football Draft" and uses "20-0" 14 times.
2. **Video player** description still says "Regal Video Player" throughout.
3. **Slots app**: the listing text dropped every anime reference, but the icon
   still says "Casino Anime Slots". Decide which identity is current. The site
   keeps the app in the Anime & Creative category for now.
4. **"82-0 Pro Basketball Draft"**: confirm whether that was ever the Play
   title. If so, it can be added to `formerNames` (section B2).
5. **Site wording on draft/GM player pools** (section G). The editorial policy
   (`src/app/editorial-policy/page.tsx`, the "Sports simulation" paragraph) and
   `docs/content-spec.md` rule 10 were outside this pass's file ownership. Both
   have since been rewritten to say that the draft and GM games build their
   player pools from real-world players' careers (checked 2026-10-02).
6. **Non-sports prose** (section H): renaming 300+ old-title mentions and
   reviewing the 87 flagged sentences needs per-article review and correction
   notes. Not done here.
7. **Play Console Website field**: 14 of 16 live sports listings, including both
   new apps, still give `https://reigncreativellc.com/privacy/` as the developer
   URL.

## J. Validation (worktree)

| Check | Result |
| --- | --- |
| `node scripts/verify-play-listings.mjs` | 44/44 public |
| `node scripts/audit-catalog.mjs` | All catalog checks passed (44 apps; sports-gm 16, video-utility 5) |
| `npx tsc --noEmit` | 0 errors |
| `npx next lint` | No warnings or errors |
| `npm run build` | Pass — 525 published, 607 pages, every gate green; authorship audit compared 60 changed articles with HEAD |
| `npm run audit:all` | Exit 0, including 63/63 tests |
| `node scripts/audit-expansion-250.mjs` / `audit-similarity-250.mjs` | Clean |
| Sitemap | 604 URLs (599 + 5 new app pages) |
| Rendered spot checks | Former-name line + `alternateName` on all 8 pages; H1 = live title on the 5 new pages; correction notes render; "Updated October 2, 2026" on corrected articles |
