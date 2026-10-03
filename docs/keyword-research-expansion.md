# Keyword research — 2026-10 sports expansion

Generated from the research candidates and the repository's actual state on 2026-10-02.
Raw observations: `docs/data/search-intent-observations-2026-10-team-sports.json` and
`docs/data/search-intent-observations-2026-10-other-sports.json`. Companion documents:
[keyword-to-url-map-expansion.md](./keyword-to-url-map-expansion.md) and
[search-intent-cannibalization-map.md](./search-intent-cannibalization-map.md).

## What was measured, and what was not

| Metric | Source | Country / language | Date and range | Definition | Measured, relative or inferred |
| --- | --- | --- | --- | --- | --- |
| Query phrasing | Google Autocomplete (`suggestqueries.google.com`, `client=firefox`) | US / en | Collected 2026-10-02 (2026-10-02T22:05:41.851Z and 2026-10-02T22:06:29.938Z); a single-day snapshot | Whether Google suggested a phrase for a seed on that day | **Measured** (presence of a suggestion). It is **not** search volume |
| Result type for a query | Manual review of live results for a sample of clusters | US / en | 2026-10-02 | Whether calculators, explainers, lists or official pages dominate | **Inferred** from inspection; no rank data recorded |
| Demand | — | — | — | — | **Not available.** Google Trends returned HTTP 429 to both research agents; Keyword Planner and Search Console are not available to this repository |
| Search volume, difficulty, CPC, traffic | — | — | — | — | **Not used anywhere.** Every candidate's `volume`, `difficulty` and `cpc` fields read "unknown" or are absent, by design — no figure was ever recorded |

2,386 Autocomplete requests returned 19,529 suggestions. A suggestion
shows that people phrase a question that way; it says nothing about how many do. Priorities in
this release are editorial: distinct intent, a verifiable answer, and a relevant live app.

## Candidates and what happened to them

| Sport | Published | Held | Deferred | Not written | Consolidated | Rejected | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| basketball | 19 | 0 | 1 | 0 | 3 | 16 | 39 |
| baseball | 22 | 0 | 6 | 0 | 2 | 13 | 43 |
| football | 19 | 0 | 2 | 0 | 2 | 10 | 33 |
| hockey | 19 | 0 | 1 | 0 | 2 | 9 | 31 |
| soccer | 20 | 0 | 1 | 0 | 3 | 10 | 34 |
| rugby | 12 | 0 | 0 | 0 | 4 | 5 | 21 |
| combat-sports | 13 | 0 | 0 | 0 | 3 | 6 | 22 |
| tennis | 9 | 0 | 0 | 0 | 3 | 5 | 17 |
| golf | 14 | 0 | 0 | 0 | 5 | 5 | 24 |
| cross-sport | 10 | 0 | 2 | 0 | 3 | 6 | 21 |
| **All** | **157** | **0** | **13** | **0** | **30** | **85** | **285** |

- **Published** — live from this release (articles, sport hubs, calculators).
- **Held** — written, but did not pass every gate, so not published.
- **Deferred** — a reason to wait (an expiring labour agreement, a data pipeline not built,
  a calculator not built yet).
- **Consolidated** — the intent is already served by an existing page; no new URL.
- **Rejected** — a keyword variant, a duplicate of an existing article, a thin page, a
  betting-adjacent topic, or a rights/branding constraint.

Finance and Pokémon TCG candidates are inventoried separately and were blocked:
[finance-content-inventory.md](./finance-content-inventory.md) (app not on Google Play) and
[tcg-rights-audit.md](./tcg-rights-audit.md) (no licence).

## Branded clusters

| Cluster | Live app name (2026-10-02) | Decision |
| --- | --- | --- |
| 82-0 (basketball) | Pro Basketball GM Franchise | "82-0" no longer appears on the live listing, and Autocomplete returns other companies' games. No page targets it; the app page carries the live name. A history article answers "has any team gone 82-0?" |
| 20-0 (football) | Football Franchise GM League | The live title dropped "20-0"; the app page shows its former name. A history article answers "has any team gone 20-0?" |
| 162-0 (baseball) | 162-0 Baseball Draft & GM Team | Owned by the app page; a history article answers "has any team gone 162-0?" |
| 84-0 (hockey) | 84-0 Hockey Draft & GM Manager | Owned by the app page; an article explains the 84-game season (2026-27) |
| 40-0 (MMA/boxing) | 40-0 MMA & Boxing Fight Draft | Owned by the app page only — bare "40-0" searches mean other things |
| 24-0 (rugby) | 24-0 Rugby Draft Pro League | Owned by the app page; "24-0 rugby league" phrasing points to another product, and our app is rugby union |
| 38-0 (soccer) | Pro Football GM Club Soccer | No page: the term is on no live listing and searches point to other products |

## Rejected and consolidated candidates

| Candidate | Sport | Decision | Why |
| --- | --- | --- | --- |
| Basketball Rotation Generator: Equal Playing-Time Substitution Chart | basketball | Deferred | Calculator not built in this release. |
| Is the Hot Hand Real? What the Basketball Research Actually Found | basketball | Rejected | WITHDRAWN to avoid a duplicate: sibling candidate 4b-x-08 (/blog/is-momentum-in-sports-real/) covers the same two papers and already targets "hot hand fallacy" and "hot hand fallacy debunked". 4a han… |
| "82-0" game / challenge / filter / app pages | basketball | Rejected | Navigational for third-party products. Our basketball GM app no longer carries the 82-0 name on Google Play (live title "Pro Basketball GM Franchise", fetched 2026-10-02), so a page chasing these que… |
| "Games like 82-0" / "82-0 alternative" roundup | basketball | Rejected | Trades on another product's name to promote ours; would need comparison-disclaimer research on products we do not control and implies a relationship that does not exist. Generic "manager games on a p… |
| App-name variants: "pro basketball gm franchise", "pro basketball gm", "basketball gm fra… | basketball | Consolidated | Served by /blog/basketball-draft-gm-guide/; no new URL. The existing app page owns the exact app name. Autocomplete for the app name returns two OTHER products ("Franchise Basketball: Pro GM", "Ultim… |
| "basketball gm" navigational cluster (roster files, goat formula, reddit) | basketball | Rejected | Navigational for a specific third-party web game (the suggestions name its files, formulas and forums). Generic GM-game intent is already owned by basketball-draft-gm-guide ("basketball gm game andro… |
| Mod / Roblox / Sims variants of "basketball career sim" | basketball | Rejected | Modded-APK and other-game intents; serving them would mean promoting piracy or another product. The generic career-sim intent stays with basketball-career-sim-guide. |
| Generic app-discovery phrasing: "basketball career simulator", "basketball manager game a… | basketball | Consolidated | Served by /blog/basketball-career-sim-guide/; no new URL. Owned by basketball-career-sim-guide ("basketball career sim game") and basketball-draft-gm-guide ("basketball draft simulator app", secondar… |
| Real-prospect mock draft simulator | basketball | Rejected | Requires a real-prospect database and player names — prohibited by content-spec #10 (no real player databases). |
| Salary-cap / luxury-tax calculator or trade checker for real teams | basketball | Rejected | Only useful with live payroll and contract data for real players and teams (prohibited; provenance unavailable). The mechanics are covered by BKB-A09/A10. |
| PER calculator | basketball | Rejected | PER needs season league constants (league pace, value of possession, DRB%) that would have to come from a data source with verified provenance; a calculator with made-up constants would output a wron… |
| Box Plus/Minus calculator | basketball | Rejected | BPM is a regression with team-level adjustments that a box-score calculator cannot reproduce faithfully; explained in BKB-A07 instead. |
| League-specific "how does the NBA/NHL draft lottery work" articles | basketball | Consolidated | Served by /blog/how-draft-lotteries-work/; no new URL. Add a short, sourced section per league format (basketball, hockey, baseball) to how-draft-lotteries-work and link it to the BKB-T05 simulator,… |
| "What is true shooting / usage rate" explainer articles | basketball | Rejected | Already owned by basketball-advanced-stats-explained (secondaries "true shooting percentage", "usage rate basketball"). The calculators (BKB-T01/T02) take the calculator intent only. |
| Basketball court dimensions reference page | basketball | Rejected | Diagram-led reference intent with a weak link to either app; the high-school rulebook (NFHS) is not freely available to cite. Professional/international dimensions are folded into BKB-A04's compariso… |
| One page per rule: traveling, goaltending, backcourt, shot clock, three seconds, overtime… | basketball | Rejected | Would create a rule-per-page farm of thin pages. Each is a section (with its own H3 and FAQ) inside BKB-A02. |
| Separate records pages: best/worst record, most wins, longest streak | basketball | Rejected | Same historical-record intent as BKB-A01; separate list pages would be near-duplicates and would invite team-name tables the content spec avoids. |
| Positionless basketball explainer | basketball | Rejected | basketball-positions-explained already has "positionless basketball" as a secondary keyword, an H2 and an FAQ on it. |
| Coaching plays/drills pages (motion offense PDFs, pick-and-roll drills) | basketball | Rejected | Coaching-curriculum intent (drill diagrams, playbooks) outside the studio's expertise and evidence base; the strategy concepts are covered by BKB-A05/A06/A15. |
| Video-game build intent: "pick and roll 2k26", "best basketball archetypes" (2K builds) | basketball | Rejected | Rights or branding constraint (details kept with the owner). |
| Baseball Lineup Generator: Batting Order and Inning-by-Inning Fielding Card | baseball | Deferred | Calculator not built in this release. |
| Run Expectancy Matrix (RE24) by Season | baseball | Deferred | Deferred: a run-expectancy table needs a reproducible pipeline from licensed play-by-play data. |
| How the MLB Draft Works: Eligibility, the Lottery and Competitive Balance Picks | baseball | Deferred | Deferred: MLB's collective bargaining agreement expires 2026-12-01; draft rules may change. |
| Service Time and Salary Arbitration in Baseball, Explained | baseball | Deferred | Deferred: arbitration and service-time rules are set by the expiring MLB agreement. |
| The 40-Man Roster, Minor League Options and the Rule 5 Draft | baseball | Deferred | Deferred: 40-man roster, options and Rule 5 terms are set by the expiring MLB agreement. |
| Does MLB Have a Salary Cap? The Competitive Balance Tax Explained | baseball | Deferred | Deferred: competitive-balance-tax thresholds after 2026 depend on the next MLB agreement. |
| "162-0" game / challenge / diamond draft / historic-lineup pages | baseball | Rejected | Navigational for third-party games (names in the suggestions are other products). Our app keeps the 162-0 name, so its app page should state plainly what it is and is not, without chasing these queri… |
| Exact app-name queries for 162-0 Baseball Draft & GM Team and Baseball Career Sim 2026 | baseball | Consolidated | Served by /blog/baseball-draft-gm-guide/; no new URL. App pages own the exact names (the full names "162-0 baseball draft & gm team" and "baseball career sim 2026" returned zero suggestions on 2026-1… |
| Real-prospect MLB draft / fantasy draft simulators and real-roster builders | baseball | Rejected | Requires real player/prospect databases (content-spec #10). |
| "baseball simulator near me" / home hitting simulators | baseball | Rejected | Physical batting-cage and hardware intent; unrelated to the studio's apps. |
| One calculator per statistic (OBP, SLG, OPS, ISO, BABIP, WHIP, FIP, K/9, K/BB, IP) | baseball | Rejected | Thin single-formula pages; consolidated into one batting calculator and one pitching calculator. |
| Separate games-behind, elimination-number, winning-percentage and run-differential calcul… | baseball | Rejected | Same "where does the race stand" and "expected record" jobs as BSB-T03 and BSB-T04. |
| WAR calculator | baseball | Rejected | WAR depends on publisher-specific fielding models, park factors and league constants; a box-score calculator would output a number that matches no publisher. The method is explained in BSB-A12. |
| OPS+, wRC+ and ERA+ calculators | baseball | Rejected | Need park factors and league averages per season — data with unverified provenance. Explained in BSB-A11. |
| Youth pitch-count and rest-day calculator | baseball | Rejected | Youth arm-health (YMYL-adjacent) rules from several bodies (Little League, Pitch Smart, state associations, travel organisations) that change by season; a stale table would be harmful, the official p… |
| One page per rule: interference vs obstruction, ground-rule double, mercy rule, DH, tag-u… | baseball | Rejected | Rule farm risk. The genuinely deep rules (infield fly, balk, dropped third strike) get their own pages; the rest are sections of BSB-A02 and BSB-A06. |
| Definition pages already owned: "what is war / era / whip / ops in baseball" | baseball | Rejected | Owned by existing articles (primary keywords "what is era in baseball", "what is whip in baseball", "what is ops in baseball"; secondary "what does war mean in baseball"). |
| Leaderboards: stolen-base, intentional-walk, fielding-percentage leaders | baseball | Rejected | Real-player leaderboards — a player-profile/data farm prohibited by content-spec #10. |
| Fielding percentage calculator | baseball | Rejected | A one-line formula already explained (with its limits) in the beginners' stats article; too thin for a tool. |
| Ambiguous heads: "hit and run", "perfect game", "opener", "service time" (bare) | baseball | Rejected | Bare phrasings are dominated by other meanings (crime news, a youth scouting brand, "season opener", church service times). The baseball meanings are covered with qualified phrasing in BSB-A20 and BS… |
| Qualifying offer (baseball) explainer | baseball | Consolidated | Served by /blog/free-agency-explained/; no new URL. A free-agent compensation mechanism; add a short, sourced baseball note to free-agency-explained rather than a thin page. ("qualifying offer" means… |
| Football Depth Chart Maker: Offence, Defence and Special Teams | football | Deferred | Calculator not built in this release. |
| Two-Point, Fourth-Down and Onside-Kick Success Rates by Season | football | Deferred | Deferred: conversion-rate tables need a reproducible pipeline from licensed play-by-play data. |
| "20-0" game / challenge / app / daily pages | football | Rejected | Navigational for third-party games. Our football GM package now shows "Football Franchise GM League" on Play (2026-10-02), so even the app page should stop leading with 20-0 once agent 2 confirms. |
| Exact app-name queries and generic app discovery ("football draft simulator", "football c… | football | Consolidated | Served by /blog/football-draft-gm-guide/; no new URL. App pages and the two app guides own these. "football gm" is navigational for a third-party web game; "football draft simulator" is contaminated… |
| Real-prospect mock drafts, fantasy trade-value charts, fantasy strength of schedule | football | Rejected | Real-player data and weekly fantasy valuations (content-spec #10); fantasy strategy in general is already owned by how-fantasy-draft-strategy-works. |
| DVOA explainer | football | Rejected | Rights or branding constraint (details kept with the owner). |
| Fourth-down decision calculator | football | Rejected | A credible calculator needs a win-probability/expected-points model fitted to play-by-play data whose provenance is unverified; a toy version would give confident wrong advice. FTB-A06 explains the r… |
| Possible-scores / score-combination / "scorigami" tool | football | Rejected | The "scores ending in X" variants are squares-pool (gambling) intent, and scorigami needs a complete historical score database with unverified provenance. |
| One page per rule: pass interference, holding, false start, grounding, safety, touchback,… | football | Rejected | Rule-farm risk; each is a section of the rules, penalties or kickoff article. |
| "How does the NFL draft work" (eligibility) article | football | Consolidated | Served by /blog/how-football-draft-order-works/; no new URL. Add a sourced eligibility section to how-football-draft-order-works instead of a second "how the draft works" page. |
| Separate "17 game season" / "why 17 games" / team-specific perfect-season pages | football | Rejected | Same intent as FTB-A01 (schedule history is its explanation of "17 + 3"); team-specific pages conflict with the no-team-names policy. |
| Referee hand-signal guide | football | Rejected | Image-led intent that would require reproducing the league's official signal artwork; penalties are explained in text in FTB-A03. |
| Offensive-system history pages (West Coast offense, Air Raid) | football | Rejected | Scheme history built around real coaches and teams, with no official source and a weak link to the apps; RPO/play-action (FTB-A17) covers the decision concepts the career sim uses. |
| Field-goal distance calculator | football | Rejected | No observed phrasing and a one-line formula (line of scrimmage + end zone + hold distance); too thin. |
| Hockey Line Generator: Forward Lines, Defence Pairs and a Printable Lineup Card | hockey | Deferred | Calculator not built in this release. |
| "84-0" game / challenge / simulator / build-a-player pages | hockey | Rejected | Navigational for third-party products. "84 0 gm mode" also appears and could be ours or another product — not targeted. Our app keeps the 84-0 name; its app page owns the exact name only. |
| Exact app names and generic app discovery ("hockey gm", "hockey career simulator", "hocke… | hockey | Consolidated | Served by /blog/hockey-draft-gm-guide/; no new URL. Exact full names ("84-0 hockey draft & gm manager", "hockey career sim 2026", "hockey draft gm manager", "84-0 season") returned zero suggestions;… |
| "Longest season in NHL history" page | hockey | Rejected | The exact phrase returned only unrelated suggestions and its SERP answers a different question (calendar duration). The 84-game story is told under the observed phrasing "nhl 84 game season" (HKY-A01… |
| Real-prospect NHL draft simulator | hockey | Rejected | Requires a real-prospect database (content-spec #10). |
| Corsi / PDO calculators | hockey | Rejected | Only the bare phrases were observed (no calculator variants), and the arithmetic is a single ratio; a worked example inside HKY-A08 serves the need. |
| "Hockey stats explained" and "save percentage explained" articles | hockey | Rejected | Already secondaries of plus-minus-and-hockey-stats ("hockey stats explained") and hockey-goaltending-explained ("save percentage explained"). |
| One page per topic: fighting rules, rink dimensions, game length, periods, wild card, reg… | hockey | Rejected | Rule/topic-farm risk; each is a section of a broader page. |
| "How does the NHL draft lottery work" article | hockey | Consolidated | Served by /blog/how-draft-lotteries-work/; no new URL. Same treatment as BKB-R11: a sourced hockey-format section in how-draft-lotteries-work, plus the BKB-T05 simulator preset; HKY-A16 links to both. |
| "Hat trick" meaning page | hockey | Rejected | Thin, cross-sport (soccer and cricket dominate the suggestions) and unrelated to the apps; listed in the 4b hand-off in case a cross-sport glossary is planned. |
| "Breakout hockey" page | hockey | Rejected | Ambiguous (local leagues, camps and tournaments dominate) and drill-led; breakouts are mentioned inside HKY-A10. |
| Video-game line-combo generators ("nhl 26 line combo generator") | hockey | Rejected | Another publisher's video game; real-team lines for it would need real rosters. Real-world line building is HKY-T02. |
| Soccer Lineup Builder: Pick a Formation, Place Your XI, Export the Graphic | soccer | Deferred | Calculator not built in this release. |
| Round Robin Schedule Generator: Single and Double Round Robins, With Byes | cross-sport | Deferred | Calculator not built in this release. |
| League Table Generator: Standings From Your Results (Soccer and Rugby Presets) | cross-sport | Deferred | Calculator not built in this release. |
| "40-0" branded cluster | combat-sports | Consolidated | Served by /blog//apps/mma-boxing-fight-draft//; no new URL. Owner: /apps/mma-boxing-fight-draft/ for the exact app name only. Bare "40-0" queries mean other things (college-basketball unbeaten season… |
| "24-0" branded cluster | rugby | Consolidated | Served by /blog//apps/rugby-draft-pro-league//; no new URL. Owner: /apps/rugby-draft-pro-league/ for the exact app name. The observed "24-0 rugby league" / "24-0 nrl game" suggestions most plausibly… |
| "38-0" / "38-0-0" branded cluster | soccer | Rejected | No page may target "38-0". The live listing title is "Pro Football GM Club Soccer" and no live listing carries "38-0" (agent 2, 2026-10-02); the observed suggestions point to third-party products (ki… |
| Unbeaten-record history pages (unbeaten league seasons, undefeated boxers, longest rugby… | cross-sport | Rejected | A verifiable history article exists in principle (records are documented on club/league and record-book sites), but every version needs real team or fighter names and record lists, which docs/content… |
| Individual soccer role pages (inverted winger, inverted full-back, box-to-box, regista, n… | soccer | Consolidated | Served by /blog/soccer-positions-explained/; no new URL. Each role page would be thin and several suggestions are driven by FM/FC video-game role names. soccer-positions-explained (897 words; already… |
| Positional play / half-spaces article | soccer | Consolidated | Served by /blog/soccer-formations-explained/; no new URL. No authoritative source could be opened (Wikipedia "Positional play" returned 404); coaching vocabulary fits as a section of soccer-formation… |
| History of soccer tactics (catenaccio, total football, tiki-taka) | soccer | Rejected | Cannot be written without naming clubs, national teams and coaches (content-spec rule 10). |
| Two-legged ties and the away goals rule | soccer | Rejected | Competition-specific (UEFA abolished away goals in 2021), weak tie to any catalog feature. |
| Group-stage tiebreakers (World Cup 2026) | soccer | Rejected | Event-specific regulations; head-to-head tiebreaks are already covered by goal-difference-and-tiebreakers. |
| xG calculator tool | soccer | Rejected | Needs a fitted shot model (fidelity cannot be verified here) and the observed intent is prediction/betting. |
| Soccer referee signals guide | soccer | Rejected | Needs signal imagery (IFAB images are not ours to reuse) and has no app tie. |
| Soccer pitch dimensions page | soccer | Consolidated | Served by /blog//blog/soccer-rules-for-beginners//; no new URL. A dimensions table is a section of the beginners' rules page, not a URL. |
| UEFA club coefficient explainer | soccer | Rejected | Single-competition branding with no app tie. |
| "pro football gm" phrases on soccer pages | soccer | Rejected | These suggestions carry American-football GM intent (agent 4a's domain); the soccer app's title creates the overlap. Do not target on soccer pages. |
| "Best soccer manager games" listicle | soccer | Rejected | A third-party listicle would need comparison research and a comparison disclaimer, and overlaps the existing short-sessions article; the soccer hub covers the studio's own games. |
| How many games in a soccer season | soccer | Rejected | Already answered (existing long-tail "how many games in a 20 team league season"). |
| Rugby defensive systems (blitz vs drift) | rugby | Rejected | No authoritative source opened; coaching content would rest on blogs. Revisit if World Rugby coaching material is found. |
| Individual rugby position pages (hooker, flanker, number 8, fly-half…) | rugby | Consolidated | Served by /blog/rugby-positions-and-numbers/; no new URL. rugby-positions-and-numbers already covers each shirt number; one page per position would be thin and near-duplicate. |
| Rugby World Cup format / rugby playoff formats | rugby | Rejected | Event- and competition-branded, news-driven, no app tie. |
| Longest winning streaks / unbeaten rugby records | rugby | Rejected | Needs national-team names and record lists (content-spec rule 10). |
| Touch and tag rugby rules | rugby | Rejected | Different games with school/recreational intent and no app tie. |
| Rugby kicking strategy / box kick tactics | rugby | Consolidated | Served by /blog/drafting-a-goal-kicker-in-rugby/; no new URL. The box-kick law change belongs in 4b-rug-06; tactical kicking adds little beyond the goal-kicker article without coaching sources. |
| Standalone "how the World Rugby rankings work" article | rugby | Consolidated | Served by /blog//tools/rugby/world-rankings-calculator//; no new URL. The calculator page carries the full explanation; a second URL would duplicate it. |
| Rugby stats explained | rugby | Rejected | Thin evidence ("rugby 25 stats explained" is a video game) and no primary stats-definition source opened. |
| Undefeated / perfect-record fighter lists, pound-for-pound and boxing rankings | combat-sports | Rejected | Real-fighter profile farm; content-spec rule 10; constant maintenance. |
| Significant strikes / punch stats explainers | combat-sports | Rejected | Definitions belong to private stats providers and a promotion's branding; bout-specific suggestions. |
| Best martial art for MMA | combat-sports | Rejected | Opinion/listicle intent; striking-vs-grappling already answers "is wrestling the best base". |
| MMA / boxing career simulator guide | combat-sports | Rejected | No combat career app is live (agent 2, 2026-10-02); a guide would promote a product that does not exist. |
| Fight purses, promoters, boxing manager vs promoter | combat-sports | Rejected | Real people/events; the manager/promoter split is already covered. |
| Catchweight and 10-8 round explainers | combat-sports | Consolidated | Served by /blog/mma-weight-classes-explained/; no new URL. Already claimed as secondaries/long-tails of mma-weight-classes-explained and the judging articles. |
| Combat weight-class dataset page (/data/combat-sports/weight-classes/) | combat-sports | Rejected | Would repeat the table carried by the article and the finder tool, and agent 3 (docs/sports-data-provenance.md §1) concluded that a /data/{sport}/ explorer is not justified. The weight limits themsel… |
| MMA/boxing tournament formats | combat-sports | Consolidated | Served by /blog//blog/tournament-formats-explained//; no new URL. Amateur/local intent; the cross-sport formats article covers brackets. |
| Tennis doubles rules and strategy | tennis | Rejected | The catalog never mentions doubles; an article could not honestly tie to the app. |
| Hawk-Eye / electronic line calling | tennis | Rejected | Vendor-branded technology topic with weak app relevance. |
| ATP ranking calculator tool | tennis | Rejected | Needs official points tables that change each season; existing ranking articles cover the logic. |
| Golden/calendar/career Grand Slam, longest-match records | tennis | Rejected | Player records and event branding; the terms belong in the tennis hub glossary. |
| Walkovers and retirements | tennis | Rejected | Suggestion set is dominated by betting rules (prizepicks, kalshi, bet365). |
| Return of serve / singles strategy guides | tennis | Consolidated | Served by /blog/playing-the-big-points-in-tennis/; no new URL. Coaching how-to with no authoritative source opened (ITF Coaching Review returned 403); overlaps the existing big-points and playing-sty… |
| How to become a professional tennis player | tennis | Consolidated | Served by /blog/junior-circuit-to-pro-tour-path/; no new URL. Already answered by the junior-circuit article (primary "how do tennis players turn pro"). |
| Tennis terms glossary article | tennis | Consolidated | Served by /blog/tennis-scoring-for-beginners/; no new URL. Put the glossary on the /sports/tennis/ hub as standing content rather than a thin standalone page. |
| Course rating and slope rating explainer | golf | Consolidated | Served by /blog/golf-handicap-for-beginners/; no new URL. Covered by the existing handicap article's section and the course-handicap calculator's explanation. |
| Net double bogey explainer | golf | Consolidated | Served by /blog//tools/golf/handicap-index-calculator//; no new URL. One rule of handicapping; explained inside the handicap calculator. |
| OWGR explained | golf | Rejected | Already covered (existing secondary "official world golf ranking explained"). |
| Golf strategy to break 90 / lay-up decisions | golf | Consolidated | Served by /blog/golf-course-management-basics/; no new URL. Course-management content already exists; a score-target variant would cannibalise it. |
| Golf shot dispersion | golf | Consolidated | Served by /blog/golf-course-management-basics/; no new URL. No research source opened; the aiming concept belongs in course management. |
| Skins game rules / calculator | golf | Rejected | Wagering side game (no gambling framing; content-spec rule 11). |
| Scramble, best ball, four-ball and foursomes formats | golf | Rejected | Already covered by golf-tournament-formats. |
| "golf simulator" pages | golf | Rejected | Hardware/venue intent; the golf app is not a simulator in that sense. |
| 14-club rule explainer | golf | Consolidated | Served by /blog/club-distance-gapping/; no new URL. Already a secondary keyword of club-distance-gapping. |
| World Handicap System changes 2027 | golf | Rejected | No 2027 revision found on USGA/R&A sites on 2026-10-02; nothing verifiable to write. |
| Scouting report template tool | cross-sport | Rejected | No published standard to implement; sport-specific scales (e.g. 20–80) belong to agent 4a's sports; risk of a thin template page. |
| Tournament bracket generator | cross-sport | Rejected | Out of scope for this release; one competition tool (round robin) plus the formats article is enough. |
| Player ratings: overall vs potential | cross-sport | Consolidated | Served by /blog/style-fit-vs-rating-in-squad-building/; no new URL. Suggestions are driven by third-party video games (FC/Madden/2K); the concept is covered by style-fit-vs-rating and how-player-care… |
| Sports analytics for beginners | cross-sport | Rejected | Broad, career-oriented intent; overlaps several existing explainers. |
| Generic "draft strategy" article | cross-sport | Rejected | Suggestions are fantasy-football/MTG specific (agent 4a / off-topic); the existing fantasy-draft-strategy and draft-board articles cover the general concept. |
| "Sports simulator" / "career simulator" head-term pages | cross-sport | Rejected | Hardware/venue and life/job-simulator intent dominate the suggestions. |
| Monte Carlo simulation in sports article | cross-sport | Consolidated | Served by /blog/how-sports-simulation-engines-work/; no new URL. Explained inside the perfect-season tool and the existing engines article; the standalone suggestion set leans to betting. |
| "What is a sports management game" article | cross-sport | Consolidated | Served by /blog/career-mode-vs-franchise-mode/; no new URL. Answer it in the /sports/ index hub's standing intro; the format articles already define the genre. |
