# Sports app inventory, verified 2026-10-02

Signed-out Google Play verification of every Reign Creative **sports** app: the 14 in the catalog, every sports project on the Desktop, and anything the developer page, Play search or the listings themselves link to. It also covers two requested non-sports packages. Raw evidence for every package is in `docs/data/play-verification-2026-10.json`.

**Rule this document serves:** nothing may be published or linked for an app that is not publicly live. Every "live" below means HTTP 200 plus `SoftwareApplication` JSON-LD on the signed-out listing **today**. Anything else is not live.

## Results at a glance

- **16 sports apps are publicly live**: all **14** catalog sports apps, plus **2 that are not in the catalog**: **Car Racing - Pro Career Racer** (`com.reigncreative.procarracingcareer`) and **Pro Rugby Career Sport Sim** (`com.reigncreative.prorugbycareersim`).
- **1 catalog sports app has a new title on Play.** `com.reigncreative.twentyzero.footballdraft` is now **"Football Franchise GM League"**. The catalog still says "20-0 Football Draft & GM Mode". All other published facts for the 14 (category, rating, ads, IAP, free) still match.
- **36 sports package IDs are not public, all HTTP 404.** 27 are from Desktop projects (including the borderline chess app), and each was 404 on gl=US in two separate passes. The 26 sports ones were also not public on GB, IN and AU. One gl=IN response was a transient 200 with no JSON-LD and returned 404 on re-check. The other 9 are labelled guesses, probed once. Four more Desktop folders have no package ID at all, and three folders reuse the football app's ID.
- **Rugby career app: LIVE** (Pro Rugby Career Sport Sim, not yet in the catalog). **Combat/boxing career app: NOT live.**
- **Branded strings:** "82-0", "82 and 0" and "38-0" appear on **no** live listing. "162-0", "84-0", "40-0" and "24-0" are still in their titles and descriptions. "20-0" has left the football **title** but is still in its short and full description.
- **Stock Trading Simulator Game** (`com.reigncreative.stocktradingsim`): **HTTP 404, not public** (confirmed twice). **TCG** (`com.reigncreative.tcgvaluescanner`): **live** as "TCG Card Grading Scanner Value".

## Method

Identical in substance to the accepted method in `scripts/verify-play-listings.mjs`:

```
GET https://play.google.com/store/apps/details?id=<package>&hl=en&gl=US
User-Agent: Chrome/151 desktop UA (same string as the script)   Accept-Language: en-US,en
no cookies, no Google session
```

- **Public only if** HTTP 200 **and** the HTML carries an app-typed JSON-LD block. Every live listing in this run carried `SoftwareApplication`.
- **Not public if** 404, any redirect, a fetch failure, or a 200 without that JSON-LD. Unlike the script, redirects were **not followed** (`redirect: manual`), so a redirect could not end up on some other 200 page. No package redirected.
- Every live listing was also checked for an **Install** button and for pre-registration or early-access markers. All 16 live sports listings show Install, and none show either marker.
- `aggregateRating` was **stripped** from every stored JSON-LD block. No rating, review count or download figure is recorded anywhere in this document or the JSON.
- `scripts/verify-play-listings.mjs` and `scripts/play-verification.json` were **not run and not modified**. Neither was the catalog. No commits were made.

All times are UTC on 2026-10-02 (15:01–15:14 in Los Angeles).

| Pass | What | Started | Finished |
| --- | --- | --- | --- |
| Pass 1 | Developer page, 32 Play searches, every catalog + Desktop package, "More by developer" BFS | 2026-10-02 22:01:48 UTC | 2026-10-02 22:03:01 UTC |
| Pass 2 | Re-probe every not-live package (gl=US), GB/IN/AU region probes, crawl of 18 more catalog listings, 29 more searches, 9 labelled guesses | 2026-10-02 22:05:04 UTC | 2026-10-02 22:06:50 UTC |
| Pass 3 | Name check of the 25 non-sports catalog apps (out of scope, for the coordinator) | 2026-10-02 22:07:37 UTC | 2026-10-02 22:07:55 UTC |
| Spot check | Re-check of the one transient gl=IN 200 (onesixtytwopro.baseballdraft) | 2026-10-02 22:10:09 UTC | 2026-10-02 22:10:11 UTC |
| Pass 4 | Re-probe of all 16 live sports apps + TCG (title, short description, badges unchanged) | 2026-10-02 22:13:54 UTC | 2026-10-02 22:14:06 UTC |

**Discovery sources** (used to find package IDs only, never as proof of availability):

1. **Developer page** `https://play.google.com/store/apps/developer?id=Reign+Collective+Apps`: HTTP 200, 20 packages in the served HTML (still capped at 20).
2. **Desktop project configs**: 46 sports-related folders with a package ID, giving 43 distinct IDs, because 3 folders reuse the football app's ID. The count includes the borderline chess app. The 2 requested non-sports projects were read too. Only identity fields were read (`expo.name`, `slug`, `version`, `android.package`) from `app.json` / `app.config.js|ts`. For Boxing Prize Fighter Career, the identity keys came from `app.identity.json`, which its `app.config.ts` imports. `google-services.json`, `GoogleService-Info.plist`, keystores, `.env*` and credentials were never opened.
3. **"More by developer" block**: on 2026-09-15 this block was loaded by JavaScript and absent from the served HTML. It is now embedded in the served HTML. Each of the 45 crawled listings shows 6 packages, always drawn from the same 7: `com.reigncreative.baseballdraft162`, `com.reigncreative.footballmycareer`, `com.reigncreative.baseballmycareer`, `com.reigncreative.transcribeaudiototext`, `com.reigncreative.prorugbycareersim`, `com.reigncreative.cutenotesjournal`, `com.reigncreative.pdftoolsallinone`.
4. **Play search**: 61 queries. They covered the developer name, sport + draft/career terms, the key terms of the unreleased local titles, and the two new live titles. Results were filtered to `reigncreative` IDs. The full query list is in the JSON under `playSearches`.
5. **Labelled guesses**: 9 package IDs for the config-less `Prize Fighter 2` folder and for boxing/cricket career apps. All returned 404. A 404 on a guess proves only that the guess was wrong.

## Every probed package

Each row runs from Desktop folder to local identity to live result. "Local name" is the name in the project config, which may be an unreleased rename. **Only the live title may be published.**

| Desktop folder | Local name | Package | HTTP | Live title (JSON-LD `name`) | In catalog? | Notes |
| --- | --- | --- | ---: | --- | --- | --- |
| 162-0 Baseball Draft | 162-0 Baseball Draft | `com.reigncreative.baseballdraft162` | 200 | 162-0 Baseball Draft & GM Team | yes |  |
| 20-0 Football Draft | Football Franchise GM League | `com.reigncreative.twentyzero.footballdraft` | 200 | Football Franchise GM League | yes | **Name drift**: catalog says "20-0 Football Draft & GM Mode" |
| 24-0 Rugby Draft | 24-0 Rugby Draft | `com.reigncreative.twentyfourzero.rugbydraft` | 200 | 24-0 Rugby Draft Pro League | yes |  |
| 38-0 Soccer Draft | 38-0 Football Draft | `com.reigncreative.soccerdraftgm` | 200 | Pro Football GM Club Soccer | yes |  |
| 40-0 MMA Boxing Fight Draft | 40-0 MMA & Boxing Fight Draft | `com.reigncreative.fortyzero.mmaboxingfightdraft` | 200 | 40-0 MMA & Boxing Fight Draft | yes |  |
| 82 Pro Basketball | Pro Basketball Draft | `com.reigncreative.eightytwopro.basketballdraft` | 200 | Pro Basketball GM Franchise | yes |  |
| 84-0 Hockey Draft | 84-0 Pro Hockey Draft | `com.reigncreative.eightyfourprohockeydraft` | 200 | 84-0 Hockey Draft & GM Manager | yes |  |
| Baseball My Career | Baseball My Career | `com.reigncreative.baseballmycareer` | 200 | Baseball Career Sim 2026 | yes |  |
| Football My Career | Football My Career | `com.reigncreative.footballmycareer` | 200 | Football Career Sim 2026 | yes |  |
| Golf My Career Simulator | Golf Career Simulator Pro Tour | `com.reigncreative.golfmycareersimulator` | 200 | Golf Career Simulator Pro Tour | yes |  |
| Hockey My Career Simulator | Hockey My Career Simulator | `com.reigncreative.hockeymycareersimulator` | 200 | Hockey Career Sim 2026 | yes |  |
| Pro Basketball Simulator | Pro Basketball My Career Sim | `com.reigncreative.probasketballsim` | 200 | Basketball Career Sim | yes |  |
| Pro Tennis Career Simulator | Pro Tennis Career Simulator | `com.reigncreative.protenniscareersim` | 200 | Tennis Career Simulator 2026 | yes |  |
| Soccer My Career Simulator | Soccer My Career Simulator | `com.reigncreative.soccermycareersim` | 200 | Football Career Soccer XI Sim | yes |  |
| Pro Car Racing Career Simulator | Pro Car Racing Career Sim | `com.reigncreative.procarracingcareer` | 200 | Car Racing - Pro Career Racer | no | **Live, not in catalog** |
| Pro Rugby Career Simulator | Pro Rugby Career Simulator | `com.reigncreative.prorugbycareersim` | 200 | Pro Rugby Career Sport Sim | no | **Live, not in catalog** |
| 20-0 Football Draft - Copy | 20-0 Football Draft | `com.reigncreative.twentyzero.footballdraft` | 200 | Football Franchise GM League | yes (as the football app) | Copy of the football project (same package). The live listing is the football app. |
| 20-0 Football Draft - Copy (2) | 20-0 Football Draft | `com.reigncreative.twentyzero.footballdraft` | 200 | Football Franchise GM League | yes (as the football app) | Copy of the football project (same package). The live listing is the football app. |
| 34-0 Cricket Draft | 34-0 Cricket Draft | `com.reigncreative.twentyzero.footballdraft` | 200 | Football Franchise GM League | yes (as the football app) | Cloned from the football project and never re-identified: `app.json` still has slug `twentyzero-football-draft` and the football package. **It has no package of its own**, and the live listing at that ID is the football app, not a cricket app. |
| 15-0 Badminton Draft & GM roster | 15-0 Badminton Draft & GM Roster | `com.reigncreative.badmintondraftgm` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| 28-0 Tennis Draft | 28-0 Pro Tennis Draft | `com.reigncreative.twentyeightzero.tennisdraft` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| 32-0 College Basketball Draft | 32-0 College Basketball Draft | `com.reigncreative.collegebasketballdraft32` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| 35-0 Table Tennis Draft & GM | 35-0 Table Tennis Draft & GM | `com.reigncreative.thirtyfivezero.tabletennisdraft` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| 36-0 Auto Racing MotorSport | 36-0 Auto Racing Motorsport | `com.reigncreative.autoracingmotorsport` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| 44-0 Womens Basketball Draft | 44-0 Women's Basketball Draft | `com.reigncreative.womensbasketballdraft` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| 72-Hole Golf Draft | 72-Hole Golf Draft | `com.reigncreative.golfdraft` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Baseball League Sandbox | Baseball League Sandbox | `com.reigncreative.baseballleaguesandbox` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Basketball Dunking Program | Basketball Dunking Program | `com.reigncreative.basketballdunkingprogram` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Basketball League Sandbox | Basketball League Sandbox | `com.reigncreative.basketballleaguesandbox` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Billiard Pool Table Pro | Billiard Pool Table Pro | `com.reigncreative.billiardpoolpro` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Boxing Prize Fighter Career | Boxing Prize Fighter Career | `com.reigncreative.boxingprizefightercareer` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Chess Strategies Grandmaster | Chess Strategies: Grand Master | `com.reigncreativellc.chessstrategiesgrandmaster` | 404 | — (not public) | no | Borderline (mind sport). Note the different `com.reigncreativellc.` prefix. 404 again in pass 2 |
| Football League Sandbox | Football League Sandbox | `com.reigncreative.footballleaguesandbox` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Football League Soccer Sandbox | Football League Soccer Sandbox | `com.reigncreative.footballleaguesoccersandbox` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Football Legends | Football Legends | `com.reigncreative.footballlegends` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Football Quarterback Legend | Football Quarterback Legends | `com.reigncreative.footballqblegends` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Hockey League Sandbox | Hockey League Sandbox | `com.reigncreative.hockeyleaguesandbox` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Hockey Pro Legend | Hockey Pro Legends | `com.reigncreative.hockeyprolegends` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Pro Baseball Draft | 162-0 Pro Baseball Draft | `com.reigncreative.onesixtytwopro.baseballdraft` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 200 (transient, no JSON-LD; 404 on re-check), AU 404 |
| Pro Boxing Simulator | Pro Boxing My Career Simulator | `com.reigncreative.proboxingsim` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Pro Cricket Career Simulator | Pro Cricket Career Simulator | `com.reigncreative.procricketcareersim` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Pro Football Draft | 17-0 Pro Football Draft | `com.reigncreative.seventeenzero.footballdraft` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Pro Hockey Draft | 82-0 Pro Hockey Draft | `com.reigncreative.eightytwopro.hockeydraft` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Pro Soccer Draft | 38-0 Pro Soccer Draft | `com.reigncreative.perfectseason.soccerdraft` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Pro Soccer Simulator | Pro Soccer Simulator | `com.reigncreative.prosoccersim` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Street Soccer Legends | Soccer Legends | `com.reigncreative.soccerlegends` | 404 | — (not public) | no | 404 again in pass 2. Region: GB 404, IN 404, AU 404 |
| Stock Trading Simulator Game | Stock Trading Simulator Game | `com.reigncreative.stocktradingsim` | 404 | — (not public) | no | Requested check. 404 confirmed twice |
| TCG Value Scanner | TCG Value Scanner | `com.reigncreative.tcgvaluescanner` | 200 | TCG Card Grading Scanner Value | yes (video-utility) | Requested check. Live title matches the catalog |
| 38-0-Soccer-Draft-inherited-basketball-services-backup | — | — (no package ID) | — | — | no | No app.json/app.config. Holds only Firebase config files, which were not opened. |
| 38-0-Soccer-Draft-inherited-git-backup | — | — (no package ID) | — | — | no | Bare `.git` directory, no working-tree config. Not inspected further. |
| Prize Fighter 2 | — | — (no package ID) | — | — | no | Seven PNG screenshots only, no project config. Guessed package IDs were probed instead, and all were 404 (listed with the other guesses). |
| Prediction & Bets Tracker | — | — (no package ID) | — | — | no | Empty folder (and a tracker, not a sports game). |
| — (guess) | — | `com.reigncreative.prizefighter2` | 404 | — (not public) | no | Labelled guess (Prize Fighter 2 / boxing / cricket career) |
| — (guess) | — | `com.reigncreative.prizefighter` | 404 | — (not public) | no | Labelled guess (Prize Fighter 2 / boxing / cricket career) |
| — (guess) | — | `com.reigncreative.boxingprizefighter` | 404 | — (not public) | no | Labelled guess (Prize Fighter 2 / boxing / cricket career) |
| — (guess) | — | `com.reigncreative.prizefightercareer` | 404 | — (not public) | no | Labelled guess (Prize Fighter 2 / boxing / cricket career) |
| — (guess) | — | `com.reigncreative.boxingcareersim` | 404 | — (not public) | no | Labelled guess (Prize Fighter 2 / boxing / cricket career) |
| — (guess) | — | `com.reigncreative.proboxingcareersim` | 404 | — (not public) | no | Labelled guess (Prize Fighter 2 / boxing / cricket career) |
| — (guess) | — | `com.reigncreative.proboxingcareer` | 404 | — (not public) | no | Labelled guess (Prize Fighter 2 / boxing / cricket career) |
| — (guess) | — | `com.reigncreative.procricketcareer` | 404 | — (not public) | no | Labelled guess (Prize Fighter 2 / boxing / cricket career) |
| — (guess) | — | `com.reigncreative.cricketcareersim` | 404 | — (not public) | no | Labelled guess (Prize Fighter 2 / boxing / cricket career) |

## The 14 catalog sports apps, field by field

All 14: HTTP 200, `SoftwareApplication`, developer "Reign Collective Apps", Install button present, `offers.price` "0" USD `InStock`. `og:description` is identical to the JSON-LD `description` (the Play short description) on every one.

| # | Catalog `name` | Package | HTTP | JSON-LD `name` | Category | Content rating | Price | `og:title` | Badges as shown | Branded string in title | Branded string in description | Live name differs? |
| ---: | --- | --- | ---: | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| 1 | Basketball Career Sim | `com.reigncreative.probasketballsim` | 200 | Basketball Career Sim | GAME_SPORTS | Everyone | 0 | Basketball Career Sim - Apps on Google Play | Contains ads · In-app purchases | — | — | no |
| 2 | Pro Basketball GM Franchise | `com.reigncreative.eightytwopro.basketballdraft` | 200 | Pro Basketball GM Franchise | GAME_SPORTS | Everyone | 0 | Pro Basketball GM Franchise - Apps on Google Play | Contains ads · In-app purchases | — | — | no |
| 3 | 20-0 Football Draft & GM Mode | `com.reigncreative.twentyzero.footballdraft` | 200 | Football Franchise GM League | GAME_SPORTS | Everyone | 0 | Football Franchise GM League - Apps on Google Play | Contains ads · In-app purchases | — | 20-0 (short, full ×14) | **YES** |
| 4 | 162-0 Baseball Draft & GM Team | `com.reigncreative.baseballdraft162` | 200 | 162-0 Baseball Draft & GM Team | GAME_SPORTS | Everyone | 0 | 162-0 Baseball Draft & GM Team - Apps on Google Play | Contains ads · In-app purchases | 162-0 | 162-0 (short, full ×8) | no |
| 5 | Pro Football GM Club Soccer | `com.reigncreative.soccerdraftgm` | 200 | Pro Football GM Club Soccer | GAME_SPORTS | Everyone | 0 | Pro Football GM Club Soccer - Apps on Google Play | Contains ads · In-app purchases | — | — | no |
| 6 | 84-0 Hockey Draft & GM Manager | `com.reigncreative.eightyfourprohockeydraft` | 200 | 84-0 Hockey Draft & GM Manager | GAME_SPORTS | Everyone | 0 | 84-0 Hockey Draft & GM Manager - Apps on Google Play | Contains ads · In-app purchases | 84-0 | 84-0 (short, full ×8) | no |
| 7 | 40-0 MMA & Boxing Fight Draft | `com.reigncreative.fortyzero.mmaboxingfightdraft` | 200 | 40-0 MMA & Boxing Fight Draft | GAME_SPORTS | Everyone | 0 | 40-0 MMA & Boxing Fight Draft - Apps on Google Play | Contains ads · In-app purchases | 40-0 | 40-0 (short, full ×5) | no |
| 8 | Baseball Career Sim 2026 | `com.reigncreative.baseballmycareer` | 200 | Baseball Career Sim 2026 | GAME_SPORTS | Everyone | 0 | Baseball Career Sim 2026 - Apps on Google Play | Contains ads · In-app purchases | — | — | no |
| 9 | Football Career Sim 2026 | `com.reigncreative.footballmycareer` | 200 | Football Career Sim 2026 | GAME_SPORTS | Everyone | 0 | Football Career Sim 2026 - Apps on Google Play | Contains ads · In-app purchases | — | — | no |
| 10 | Hockey Career Sim 2026 | `com.reigncreative.hockeymycareersimulator` | 200 | Hockey Career Sim 2026 | GAME_SPORTS | Everyone | 0 | Hockey Career Sim 2026 - Apps on Google Play | Contains ads · In-app purchases | — | — | no |
| 11 | Football Career Soccer XI Sim | `com.reigncreative.soccermycareersim` | 200 | Football Career Soccer XI Sim | GAME_SPORTS | Everyone | 0 | Football Career Soccer XI Sim - Apps on Google Play | Contains ads · In-app purchases | — | — | no |
| 12 | Golf Career Simulator Pro Tour | `com.reigncreative.golfmycareersimulator` | 200 | Golf Career Simulator Pro Tour | GAME_SPORTS | Everyone | 0 | Golf Career Simulator Pro Tour - Apps on Google Play | Contains ads · In-app purchases | — | — | no |
| 13 | Tennis Career Simulator 2026 | `com.reigncreative.protenniscareersim` | 200 | Tennis Career Simulator 2026 | GAME_SPORTS | Everyone | 0 | Tennis Career Simulator 2026 - Apps on Google Play | In-app purchases | — | — | no |
| 14 | 24-0 Rugby Draft Pro League | `com.reigncreative.twentyfourzero.rugbydraft` | 200 | 24-0 Rugby Draft Pro League | GAME_SPORTS | Everyone | 0 | 24-0 Rugby Draft Pro League - Apps on Google Play | Contains ads · In-app purchases | 24-0 | 24-0 (short, full ×2) | no |

Short description (JSON-LD `description` = `og:description`) as served:

| Package | Short description |
| --- | --- |
| `com.reigncreative.probasketballsim` | Build your player, make choices, and live a full pro basketball career. |
| `com.reigncreative.eightytwopro.basketballdraft` | Basketball GM game: draft, trade, manage your franchise and build a dynasty. |
| `com.reigncreative.soccerdraftgm` | Build your Soccer XI in a football squad draft and chase a perfect season |
| `com.reigncreative.baseballmycareer` | Build your baseball career in a realistic player simulator and sports game. |
| `com.reigncreative.footballmycareer` | Build a quarterback career in a deep pro football simulation game. |
| `com.reigncreative.hockeymycareersimulator` | Build your hockey career in an ice hockey game with career simulator. |
| `com.reigncreative.soccermycareersim` | Build your football career in a realistic soccer player life simulator. |
| `com.reigncreative.golfmycareersimulator` | Build your golf career in a pro golf simulator packed with tournaments. |
| `com.reigncreative.protenniscareersim` | Build a tennis career, train, compete in tournaments and climb world rankings. |
| `com.reigncreative.twentyfourzero.rugbydraft` | Draft rugby legends, manage your club, and chase a perfect 24-0 season. |

Four rows are withheld here. Owner-only compliance notes are kept outside this public repository.

Full description text for every listing is in the JSON under `packages.<id>.evidence.fullDescription`.

## Name drift

### Catalog vs live (sports), the only one that matters for publishing

| Package | Catalog `name` (site today) | Live Play title | Notes |
| --- | --- | --- | --- |
| `com.reigncreative.twentyzero.footballdraft` | 20-0 Football Draft & GM Mode | Football Franchise GM League | The local `app.json` in `20-0 Football Draft` already carries the new name. The listing description still calls the app "20-0 Football Draft" (see branded strings). In the repo, 15 files under `content/` and `src/` (the catalog plus 14 content files) use "20-0 Football Draft" 27 times. "Football Franchise GM League" appears in neither directory. |

The other 13 catalog sports names match their live titles exactly, and so do their category, content rating, ads, IAP and free facts. Tennis has an IAP badge and no ads badge on Play, which matches the catalog.

### Local `app.json` name vs live title (information only, never publish the local name)

| Desktop folder | Local name | Live title |
| --- | --- | --- |
| 162-0 Baseball Draft | 162-0 Baseball Draft | 162-0 Baseball Draft & GM Team |
| 24-0 Rugby Draft | 24-0 Rugby Draft | 24-0 Rugby Draft Pro League |
| 38-0 Soccer Draft | 38-0 Football Draft | Pro Football GM Club Soccer |
| 82 Pro Basketball | Pro Basketball Draft | Pro Basketball GM Franchise |
| 84-0 Hockey Draft | 84-0 Pro Hockey Draft | 84-0 Hockey Draft & GM Manager |
| Baseball My Career | Baseball My Career | Baseball Career Sim 2026 |
| Football My Career | Football My Career | Football Career Sim 2026 |
| Hockey My Career Simulator | Hockey My Career Simulator | Hockey Career Sim 2026 |
| Pro Basketball Simulator | Pro Basketball My Career Sim | Basketball Career Sim |
| Pro Car Racing Career Simulator | Pro Car Racing Career Sim | Car Racing - Pro Career Racer |
| Pro Rugby Career Simulator | Pro Rugby Career Simulator | Pro Rugby Career Sport Sim |
| Pro Tennis Career Simulator | Pro Tennis Career Simulator | Tennis Career Simulator 2026 |
| Soccer My Career Simulator | Soccer My Career Simulator | Football Career Soccer XI Sim |

## Live sports apps NOT in the catalog

Both passed the full test in two separate probes (pass 1, then pass 4 with title, short description and badges unchanged). Both appear in the "More by developer" block that every listing serves. Both are by "Reign Collective Apps", show an Install button, and have no pre-registration or early-access marker. They may be added to the catalog later by the coordinator. **Until they are, nothing on the site may link to them as catalog pages.**

### Car Racing - Pro Career Racer

| Field | Value |
| --- | --- |
| Package | `com.reigncreative.procarracingcareer` |
| Listing | https://play.google.com/store/apps/details?id=com.reigncreative.procarracingcareer |
| HTTP / JSON-LD | 200 / SoftwareApplication |
| Live title (JSON-LD `name`) | Car Racing - Pro Career Racer |
| `og:title` | Car Racing - Pro Career Racer - Apps on Google Play |
| Play category (`applicationCategory`) | GAME_RACING. **Not GAME_SPORTS.** |
| Content rating | Everyone |
| Price | 0 USD (https://schema.org/InStock) |
| Badges as shown | Contains ads. No "In-app purchases" badge. |
| Short description | Build your car racing career in a realistic motorsport strategy simulator. |
| Developer (JSON-LD author) | Reign Collective Apps, url https://reigncreativellc.com/privacy/ |
| Icon (JSON-LD `image`, do not hotlink) | https://play-lh.googleusercontent.com/yYJEo6M5s0-K3H5YHfvEbplHreEdKRCGaiq-hXtsFljFb6ETPhAcd3ZTVnu62wOuAQXpANTuDmfi3tpV290j-w |
| `og:image` | https://play-lh.googleusercontent.com/yYJEo6M5s0-K3H5YHfvEbplHreEdKRCGaiq-hXtsFljFb6ETPhAcd3ZTVnu62wOuAQXpANTuDmfi3tpV290j-w=s0-br30 |
| Updated on (as shown) | Sep 17, 2026 |
| Desktop project | Pro Car Racing Career Simulator (local name "Pro Car Racing Career Sim", v1.0.0) |
| Branded strings | none |

<details><summary>Full JSON-LD (aggregateRating stripped)</summary>

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Car Racing - Pro Career Racer",
  "url": "https://play.google.com/store/apps/details/Car_Racing_Pro_Career_Racer?id=com.reigncreative.procarracingcareer&hl=en",
  "description": "Build your car racing career in a realistic motorsport strategy simulator.",
  "operatingSystem": "ANDROID",
  "applicationCategory": "GAME_RACING",
  "image": "https://play-lh.googleusercontent.com/yYJEo6M5s0-K3H5YHfvEbplHreEdKRCGaiq-hXtsFljFb6ETPhAcd3ZTVnu62wOuAQXpANTuDmfi3tpV290j-w",
  "contentRating": "Everyone",
  "author": {
    "@type": "Person",
    "name": "Reign Collective Apps",
    "url": "https://reigncreativellc.com/privacy/"
  },
  "offers": [
    {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  ]
}
```

</details>

<details><summary>Full description as served</summary>

```text
Start your engine and build a legendary motorsport career in Car Racing - Pro Career Racer, a car racing game focused on driver progression, race strategy, championship battles and realistic career decisions.

BEGIN YOUR RACING CAREER

Start in karting, develop your skills and climb through professional motorsport. Earn better contracts, join stronger racing teams and fight for a place at the front of the grid. Every season shapes your driver career, reputation and racing legacy.

LIVE RACE SIMULATOR

Experience strategic racing without complicated steering controls. During each live race simulation, make decisions that can change your result:

• Choose when to attack, defend or hold position
• Brake early, trail-brake or risk a late move
• Manage tires, fuel, grip and car condition
• React to rain, cautions, traffic and changing track conditions
• Choose racing lines through hairpins, chicanes and fast corners
• Plan pit stops and respond to mechanical problems
• Fight rivals in side-by-side racing and final-lap battles

Your speed, car performance, driver attributes, track position and choices influence what happens next. Select MPH or km/h in Settings and face realistic speed-aware situations.

BECOME A PRO RACE CAR DRIVER

This racing career simulator is about more than winning one event. Train your driver, improve attributes and prove yourself across complete racing seasons. Strong performances unlock opportunities, while mistakes and risky decisions can cost positions, contracts and championships.

Build relationships with teammates, engineers and team management. Face career rivals, media pressure, contract negotiations, team expectations and defining moments on and off the circuit.

DEEP MOTORSPORT STRATEGY

Every race requires a different plan. Push for the fastest lap, protect your tires, save fuel, defend position or gamble on an aggressive pit strategy. Adapt to dry and wet races, changing grip, tire wear, traffic, safety periods and car reliability.

The realistic race simulator tracks positions, time gaps, nearby cars, pit status and race progress. Watch cars battle as the circuit view, standings, minimap and commentary react to the same live race state.

A CAREER MODE FULL OF CHOICES

Explore hundreds of racing scenarios and career decisions covering:

• Karting and junior racing
• Professional race weekends
• Driver training and development
• Team contracts and transfers
• Championship standings
• Teammates and racing rivals
• Car setup and development
• Pit strategy and tire management
• Sponsor and media opportunities
• Injuries, setbacks and comebacks
• Achievements, records and career milestones
• Post-race reports and season history

No two careers need to unfold the same way. Your choices determine whether you become a dependable team driver, aggressive overtaking specialist, wet-weather expert, championship contender or motorsport legend.

RACE ACROSS A FICTIONAL MOTORSPORT WORLD

Compete across varied fictional circuits with different layouts, corner types, surfaces, climates and strategic demands. Master long straights, technical tracks, heavy braking zones, fast sweepers and difficult wet races.

Follow nearby competitors, chase the car ahead and protect the gap behind. Battle through the field, earn podiums, collect wins and pursue the championship.

MADE FOR RACING STRATEGY FANS

Looking for a car racing career game, motorsport career simulator or strategic racing game? This race car driver simulator combines a deep racing career mode with car setup, professional driver progression, open-wheel racing and championship strategy.

YOUR ROAD TO THE CHAMPIONSHIP STARTS NOW

Begin as an unknown rookie. Improve your driver, earn your seat, outsmart rivals and make the decisions that separate contenders from champions.

Download Car Racing - Pro Career Racer and start building your racing legacy today.
```

</details>

### Pro Rugby Career Sport Sim

| Field | Value |
| --- | --- |
| Package | `com.reigncreative.prorugbycareersim` |
| Listing | https://play.google.com/store/apps/details?id=com.reigncreative.prorugbycareersim |
| HTTP / JSON-LD | 200 / SoftwareApplication |
| Live title (JSON-LD `name`) | Pro Rugby Career Sport Sim |
| `og:title` | Pro Rugby Career Sport Sim - Apps on Google Play |
| Play category (`applicationCategory`) | GAME_SPORTS |
| Content rating | Everyone |
| Price | 0 USD (https://schema.org/InStock) |
| Badges as shown | Contains ads. No "In-app purchases" badge. |
| Short description | Build your rugby career, train your player, and lead your team through a season. |
| Developer (JSON-LD author) | Reign Collective Apps, url https://reigncreativellc.com/privacy/ |
| Icon (JSON-LD `image`, do not hotlink) | https://play-lh.googleusercontent.com/N7td25QbhmyvVWD-8Bvs_xsddBV6IsWshulYXNIIHCMn-Jpw9AfJ8ytdIF39NHWLep4dAj5eyMADfvj-0UjdqZQ |
| `og:image` | https://play-lh.googleusercontent.com/N7td25QbhmyvVWD-8Bvs_xsddBV6IsWshulYXNIIHCMn-Jpw9AfJ8ytdIF39NHWLep4dAj5eyMADfvj-0UjdqZQ=s0-br30 |
| Updated on (as shown) | Sep 15, 2026 |
| Desktop project | Pro Rugby Career Simulator (local name "Pro Rugby Career Simulator", v1.0.0) |
| Branded strings | none |

<details><summary>Full JSON-LD (aggregateRating stripped)</summary>

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pro Rugby Career Sport Sim",
  "url": "https://play.google.com/store/apps/details/Pro_Rugby_Career_Sport_Sim?id=com.reigncreative.prorugbycareersim&hl=en",
  "description": "Build your rugby career, train your player, and lead your team through a season.",
  "operatingSystem": "ANDROID",
  "applicationCategory": "GAME_SPORTS",
  "image": "https://play-lh.googleusercontent.com/N7td25QbhmyvVWD-8Bvs_xsddBV6IsWshulYXNIIHCMn-Jpw9AfJ8ytdIF39NHWLep4dAj5eyMADfvj-0UjdqZQ",
  "contentRating": "Everyone",
  "author": {
    "@type": "Person",
    "name": "Reign Collective Apps",
    "url": "https://reigncreativellc.com/privacy/"
  },
  "offers": [
    {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  ]
}
```

</details>

<details><summary>Full description as served</summary>

```text
Pro Rugby Career Sport Sim is a rugby game built around your journey as a player. Create your athlete, develop skills through training, and follow your team through a season of matches. This sports simulation brings career mode, on-field action, and stats together so you can track your progress from one performance to the next.

Create your athlete

Your career starts with a player you make your own. Choose a portrait and position, then decide what kind of rugby athlete you want to become. Do you want to focus on carrying the ball, tackling, or supporting your team? Use training to build skills that suit your role.

In this rugby game, career mode gives each decision a longer perspective. A single performance is part of a bigger story, and your stats help you see how that story develops. Sports fans who enjoy following an individual athlete can watch their progress across matches, with a new season offering another reason to return to the simulation.

Train with a purpose

Turn your next goal into a training plan. Review your player, consider the skills you want to improve, and prepare for the challenges ahead. Rugby rewards different contributions, so think about how your strengths fit the needs of your team.

Use stats from recent matches to reflect on your performance. Then bring that perspective into career mode as you prepare for the rest of the season. This sports simulation connects preparation with the experience of building a career, giving you progress to follow beyond the final score. Your next session in the rugby game starts with a simple question: what will you work on today?

Follow the action

Watch the simulation unfold on the field and follow your player through the action. Track carries, metres, and tackles to understand your contribution. Rugby is a team sport, and those details tell a richer story than the score alone.

As matches develop, see where your training and skills fit into the contest. Review your performance afterward and use your stats to keep the season in perspective. Career mode brings those moments into your ongoing journey. Whether you enjoy sports for the competition or the stories behind the athletes, this rugby game gives your career a personal focus.

Build across a season

Keep coming back to the player you have created. Follow your progress through matches, revisit your training priorities, and continue developing skills as your career moves forward. Every season gives you another stretch of rugby to experience with your team.

Enjoy the rhythm of a sports simulation: prepare, follow the action, and review your performance. Use your stats to remember strong outings and identify areas that deserve more attention. Career mode makes the journey matter, while the rugby game keeps your next appearance within reach.

Make the journey yours

Set your own goals for progress. You might focus on becoming more effective in your position, contributing more consistently, or simply learning what the match numbers mean. Take time to appreciate the athlete you are building, including the small improvements between standout moments.

Pro Rugby Career Sport Sim is for sports fans who enjoy character development alongside competition. Follow the simulation, return to your goals, and see how your approach develops over time. Your progress is a story you can keep building.

Create your athlete and start your rugby career today.
```

</details>

## Not live, so do not publish or link

Every row returned **HTTP 404** on the signed-out gl=US listing in pass 1 **and** again in pass 2. The region probes are supplementary (GB/IN/AU, same headers) and only show that none of them is quietly live elsewhere.

| Desktop folder | Local name | Package | Pass 1 HTTP | Pass 2 HTTP | Region probes | Kind |
| --- | --- | --- | --- | --- | --- | --- |
| 15-0 Badminton Draft & GM roster | 15-0 Badminton Draft & GM Roster | `com.reigncreative.badmintondraftgm` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| 28-0 Tennis Draft | 28-0 Pro Tennis Draft | `com.reigncreative.twentyeightzero.tennisdraft` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| 32-0 College Basketball Draft | 32-0 College Basketball Draft | `com.reigncreative.collegebasketballdraft32` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| 35-0 Table Tennis Draft & GM | 35-0 Table Tennis Draft & GM | `com.reigncreative.thirtyfivezero.tabletennisdraft` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| 36-0 Auto Racing MotorSport | 36-0 Auto Racing Motorsport | `com.reigncreative.autoracingmotorsport` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| 44-0 Womens Basketball Draft | 44-0 Women's Basketball Draft | `com.reigncreative.womensbasketballdraft` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| 72-Hole Golf Draft | 72-Hole Golf Draft | `com.reigncreative.golfdraft` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Baseball League Sandbox | Baseball League Sandbox | `com.reigncreative.baseballleaguesandbox` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Basketball Dunking Program | Basketball Dunking Program | `com.reigncreative.basketballdunkingprogram` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Basketball League Sandbox | Basketball League Sandbox | `com.reigncreative.basketballleaguesandbox` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Billiard Pool Table Pro | Billiard Pool Table Pro | `com.reigncreative.billiardpoolpro` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Boxing Prize Fighter Career | Boxing Prize Fighter Career | `com.reigncreative.boxingprizefightercareer` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Chess Strategies Grandmaster | Chess Strategies: Grand Master | `com.reigncreativellc.chessstrategiesgrandmaster` | 404 | 404 | not probed | borderline |
| Football League Sandbox | Football League Sandbox | `com.reigncreative.footballleaguesandbox` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Football League Soccer Sandbox | Football League Soccer Sandbox | `com.reigncreative.footballleaguesoccersandbox` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Football Legends | Football Legends | `com.reigncreative.footballlegends` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Football Quarterback Legend | Football Quarterback Legends | `com.reigncreative.footballqblegends` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Hockey League Sandbox | Hockey League Sandbox | `com.reigncreative.hockeyleaguesandbox` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Hockey Pro Legend | Hockey Pro Legends | `com.reigncreative.hockeyprolegends` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Pro Baseball Draft | 162-0 Pro Baseball Draft | `com.reigncreative.onesixtytwopro.baseballdraft` | 404 | 404 | GB 404, IN 200 (transient, no JSON-LD; 404 on re-check), AU 404 | sports |
| Pro Boxing Simulator | Pro Boxing My Career Simulator | `com.reigncreative.proboxingsim` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Pro Cricket Career Simulator | Pro Cricket Career Simulator | `com.reigncreative.procricketcareersim` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Pro Football Draft | 17-0 Pro Football Draft | `com.reigncreative.seventeenzero.footballdraft` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Pro Hockey Draft | 82-0 Pro Hockey Draft | `com.reigncreative.eightytwopro.hockeydraft` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Pro Soccer Draft | 38-0 Pro Soccer Draft | `com.reigncreative.perfectseason.soccerdraft` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Pro Soccer Simulator | Pro Soccer Simulator | `com.reigncreative.prosoccersim` | 404 | 404 | GB 404, IN 404, AU 404 | sports |
| Stock Trading Simulator Game | Stock Trading Simulator Game | `com.reigncreative.stocktradingsim` | 404 | 404 | not probed | non-sports (requested) |
| Street Soccer Legends | Soccer Legends | `com.reigncreative.soccerlegends` | 404 | 404 | GB 404, IN 404, AU 404 | sports |

Labelled guesses (all 404): `com.reigncreative.prizefighter2`, `com.reigncreative.prizefighter`, `com.reigncreative.boxingprizefighter`, `com.reigncreative.prizefightercareer`, `com.reigncreative.boxingcareersim`, `com.reigncreative.proboxingcareersim`, `com.reigncreative.proboxingcareer`, `com.reigncreative.procricketcareer`, `com.reigncreative.cricketcareersim`.

Folders with **no package ID**, so nothing to probe:

- `38-0-Soccer-Draft-inherited-basketball-services-backup`: No app.json/app.config. Holds only Firebase config files, which were not opened.
- `38-0-Soccer-Draft-inherited-git-backup`: Bare `.git` directory, no working-tree config. Not inspected further.
- `Prize Fighter 2`: Seven PNG screenshots only, no project config. Guessed package IDs were probed instead, and all were 404 (listed with the other guesses).
- `Prediction & Bets Tracker`: Empty folder (and a tracker, not a sports game).

`34-0 Cricket Draft` and the two `20-0 Football Draft - Copy` folders have **no package of their own**, because they reuse the football app's ID. No cricket app of any kind is live.

## Developer page

`https://play.google.com/store/apps/developer?id=Reign+Collective+Apps&hl=en&gl=US`: HTTP 200 at 2026-10-02 22:01:49 UTC. It links exactly 20 `reigncreative` packages, all live:

| # | Package | Live title | Sports? | In catalog? |
| ---: | --- | --- | --- | --- |
| 1 | `com.reigncreative.baseballdraft162` | 162-0 Baseball Draft & GM Team | sports | yes |
| 2 | `com.reigncreative.twentyzero.footballdraft` | Football Franchise GM League | sports | yes |
| 3 | `com.reigncreative.probasketballsim` | Basketball Career Sim | sports | yes |
| 4 | `com.reigncreative.proteinup` | Protein Diet Tracker | — | yes |
| 5 | `com.reigncreative.learncambodian` | Learn Cambodian, Speak Khmer | — | yes |
| 6 | `com.reigncreative.eightyfourprohockeydraft` | 84-0 Hockey Draft & GM Manager | sports | yes |
| 7 | `com.reigncreative.history` | World History Timeline Sim | — | yes |
| 8 | `com.reigncreative.protenniscareersim` | Tennis Career Simulator 2026 | sports | yes |
| 9 | `com.reigncreative.eightytwopro.basketballdraft` | Pro Basketball GM Franchise | sports | yes |
| 10 | `com.reigncreative.golfmycareersimulator` | Golf Career Simulator Pro Tour | sports | yes |
| 11 | `com.reigncreative.mentalmathchampion` | IQ Test & Brain Training Games | — | yes |
| 12 | `com.reigncreative.footballmycareer` | Football Career Sim 2026 | sports | yes |
| 13 | `com.reigncreative.cutenotesjournal` | Kawaii Cute Notes Journal Plan | — | **no** |
| 14 | `com.reigncreative.baseballmycareer` | Baseball Career Sim 2026 | sports | yes |
| 15 | `com.reigncreative.hockeymycareersimulator` | Hockey Career Sim 2026 | sports | yes |
| 16 | `com.reigncreative.soccerdraftgm` | Pro Football GM Club Soccer | sports | yes |
| 17 | `com.reigncreative.pdftoolsallinone` | PDF All in One Tool No Limit | — | **no** |
| 18 | `com.reigncreative.learnitalianlanguage` | Learn Italian for Beginners | — | yes |
| 19 | `com.reigncreative.animetrivia` | Anime Trivia & Word Games | — | yes |
| 20 | `com.reigncreative.fortyzero.mmaboxingfightdraft` | 40-0 MMA & Boxing Fight Draft | sports | yes |

The page omits 4 live sports apps: `com.reigncreative.soccermycareersim` (Football Career Soccer XI Sim), `com.reigncreative.twentyfourzero.rugbydraft` (24-0 Rugby Draft Pro League), `com.reigncreative.procarracingcareer` (Car Racing - Pro Career Racer), `com.reigncreative.prorugbycareersim` (Pro Rugby Career Sport Sim). The page is a sample, not an index.

## Requested non-sports checks

| App | Package (from the project config) | First probe | Confirmation | Result |
| --- | --- | --- | --- | --- |
| Stock Trading Simulator Game | `com.reigncreative.stocktradingsim` | pass 1: 404 at 2026-10-02 22:02:53 UTC | pass 2: 404 at 2026-10-02 22:05:21 UTC | **Not public.** Expected 404, confirmed. Play search for its title also returned nothing. |
| TCG Value Scanner | `com.reigncreative.tcgvaluescanner` | pass 1: 200 at 2026-10-02 22:02:53 UTC | pass 3: 200 at 2026-10-02 22:07:55 UTC; pass 4: 200 at 2026-10-02 22:14:05 UTC | **Live** as "TCG Card Grading Scanner Value", matching the catalog name. Play category `SPORTS` (the non-game Sports category; the catalog also records SPORTS), Everyone, price 0, badges: Contains ads · In-app purchases. |

## Branded-string findings

Each live sports listing was checked for every string in its JSON-LD `name`, `og:title`, JSON-LD `description`, `og:description` and full description. The check is case-insensitive and also normalises en/em dashes, non-breaking hyphens and "&". No dash or ampersand variant was found anywhere.

| Live listing | "82-0" | "20-0" | "162-0" | "84-0" | "40-0" | "24-0" | "38-0" | "82 and 0" |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Basketball Career Sim | — | — | — | — | — | — | — | — |
| Pro Basketball GM Franchise | — | — | — | — | — | — | — | — |
| Football Franchise GM League | — | short desc + full desc ×14 | — | — | — | — | — | — |
| 162-0 Baseball Draft & GM Team | — | — | title + short desc + full desc ×8 | — | — | — | — | — |
| Pro Football GM Club Soccer | — | — | — | — | — | — | — | — |
| 84-0 Hockey Draft & GM Manager | — | — | — | title + short desc + full desc ×8 | — | — | — | — |
| 40-0 MMA & Boxing Fight Draft | — | — | — | — | title + short desc + full desc ×5 | — | — | — |
| Baseball Career Sim 2026 | — | — | — | — | — | — | — | — |
| Football Career Sim 2026 | — | — | — | — | — | — | — | — |
| Hockey Career Sim 2026 | — | — | — | — | — | — | — | — |
| Football Career Soccer XI Sim | — | — | — | — | — | — | — | — |
| Golf Career Simulator Pro Tour | — | — | — | — | — | — | — | — |
| Tennis Career Simulator 2026 | — | — | — | — | — | — | — | — |
| 24-0 Rugby Draft Pro League | — | — | — | — | — | title + short desc + full desc ×2 | — | — |
| Car Racing - Pro Career Racer | — | — | — | — | — | — | — | — |
| Pro Rugby Career Sport Sim | — | — | — | — | — | — | — | — |

**Verdict per string**

- **"82-0"**: on **no** live listing. The basketball GM app (`eightytwopro.basketballdraft`) is titled "Pro Basketball GM Franchise" with no "82-0", though its description still says "PLAY A FULL 82-GAME SEASON". Among the Desktop sports projects, "82-0" appears only in the local `app.json` name "82-0 Pro Hockey Draft" of `Pro Hockey Draft`, which is **not live**.
- **"82 and 0"**: on **no** live listing, and in no local project name.
- **"20-0"**: **removed from the title** (now "Football Franchise GM League") but **still present** in the short description and 14 times in the full description. That description still opens "Build a roster in 20-0 Football Draft, a football draft game." so the listing contradicts its own title.
- **"162-0"**, **"84-0"**, **"40-0"**, **"24-0"**: **still present** in the title, short description and full description of the baseball, hockey, MMA/boxing and rugby draft apps respectively.
- **"38-0"**: on **no** live listing. The soccer GM listing's short description still says "chase a perfect season" with no match count, as it did on 2026-09-15. "38-0" survives only in local names: "38-0 Football Draft" (the live soccer app's `app.json`) and "38-0 Pro Soccer Draft" (not live).
- No other "N-0" string appears on any live sports listing.

## Sports cross-promotion map (live apps only)

| Sport | Draft / GM app (live) | Career app (live) | Pair complete? | Not live, do not link |
| --- | --- | --- | --- | --- |
| Basketball (pro) | Pro Basketball GM Franchise (`com.reigncreative.eightytwopro.basketballdraft`) | Basketball Career Sim (`com.reigncreative.probasketballsim`) | yes | College (`collegebasketballdraft32`), women's (`womensbasketballdraft`), `basketballleaguesandbox`, `basketballdunkingprogram` |
| Baseball | 162-0 Baseball Draft & GM Team (`com.reigncreative.baseballdraft162`) | Baseball Career Sim 2026 (`com.reigncreative.baseballmycareer`) | yes | `onesixtytwopro.baseballdraft`, `baseballleaguesandbox` |
| American football | Football Franchise GM League (`com.reigncreative.twentyzero.footballdraft`) | Football Career Sim 2026 (`com.reigncreative.footballmycareer`) | yes | `seventeenzero.footballdraft`, `footballleaguesandbox`, `footballlegends`, `footballqblegends` |
| Ice hockey | 84-0 Hockey Draft & GM Manager (`com.reigncreative.eightyfourprohockeydraft`) | Hockey Career Sim 2026 (`com.reigncreative.hockeymycareersimulator`) | yes | `eightytwopro.hockeydraft`, `hockeyleaguesandbox`, `hockeyprolegends` |
| Soccer (association football) | Pro Football GM Club Soccer (`com.reigncreative.soccerdraftgm`) | Football Career Soccer XI Sim (`com.reigncreative.soccermycareersim`) | yes | `perfectseason.soccerdraft`, `prosoccersim`, `soccerlegends`, `footballleaguesoccersandbox` |
| Rugby (union) | 24-0 Rugby Draft Pro League (`com.reigncreative.twentyfourzero.rugbydraft`) | Pro Rugby Career Sport Sim (`com.reigncreative.prorugbycareersim`) **NEW, not in catalog** | yes, once the new app is catalogued | — |
| Combat (MMA & boxing) | 40-0 MMA & Boxing Fight Draft (`com.reigncreative.fortyzero.mmaboxingfightdraft`) | — none live | — | `proboxingsim`, `boxingprizefightercareer`, Prize Fighter 2 (no ID) |
| Tennis | — none live | Tennis Career Simulator 2026 (`com.reigncreative.protenniscareersim`) | — | `twentyeightzero.tennisdraft` |
| Golf | — none live | Golf Career Simulator Pro Tour (`com.reigncreative.golfmycareersimulator`) | — | `golfdraft` (72-Hole Golf Draft) |
| Motorsport | — none live | Car Racing - Pro Career Racer (`com.reigncreative.procarracingcareer`) **NEW, not in catalog** | — | `autoracingmotorsport` (36-0 Auto Racing) |
| Cricket | — none live | — none live | — | `procricketcareersim`; 34-0 Cricket Draft has no package of its own |
| Badminton | — none live | — none live | — | `badmintondraftgm` |
| Table tennis | — none live | — none live | — | `thirtyfivezero.tabletennisdraft` |
| Billiards / pool | — none live | — none live | — | `billiardpoolpro` |

**Explicit answers**

- **Is a rugby career app live? YES.** **Pro Rugby Career Sport Sim** (`com.reigncreative.prorugbycareersim`) is live (GAME_SPORTS, Everyone, free, Contains ads). It is **not in the catalog**, so the rugby draft ↔ career pair can be cross-linked on-site only after it is added.
- **Is a combat/boxing career app live? NO.** `com.reigncreative.proboxingsim` (Pro Boxing Simulator) and `com.reigncreative.boxingprizefightercareer` (Boxing Prize Fighter Career) are both 404 on gl=US in two passes, and 404 on GB/IN/AU. 7 boxing-career package guesses (`com.reigncreative.prizefighter2`, `com.reigncreative.prizefighter`, `com.reigncreative.boxingprizefighter`, `com.reigncreative.prizefightercareer`, `com.reigncreative.boxingcareersim`, `com.reigncreative.proboxingcareersim`, `com.reigncreative.proboxingcareer`) are 404 as well. Play searches for boxing and MMA career titles surface no combat career app. The only combat title they return is the **40-0 MMA & Boxing Fight Draft**, a draft/GM app, which therefore has no career partner.
- Motorsport's only live app, **Car Racing - Pro Career Racer**, is in Play category **GAME_RACING**, not GAME_SPORTS. It is a career app with no draft partner, and it is not in the catalog.

## Out-of-scope observations for the coordinator (non-sports)

Seen during discovery. Not part of this agent's remit, so not acted on. All 25 non-sports catalog apps were still live in pass 3 (HTTP 200 + JSON-LD), but **4 have new live titles**:

| Package | Catalog `name` | Live title |
| --- | --- | --- |
| `com.reigncreative.animecasinoslots` | Anime Casino Slot Machine Game | Vegas Casino Slots JACKPOT WIN |
| `com.reigncreative.mentalmathchampion` | Mental Math & Memory Games | IQ Test & Brain Training Games |
| `com.reigncreative.ketotracker` | Keto Diet Tracker: Low Carb | Ketora: Keto Diet Carb Tracker |
| `com.reigncreative.regalvideoplayer` | Regal Video Player | Video Player All Formats PRO |

- **"IQ Test & Brain Training Games" is now the live title** of `com.reigncreative.mentalmathchampion`. `scripts/audit-expansion-250.mjs:220` and `scripts/audit-entities.mjs:49` still fail the build on that string as an "unreleased name", and the project memory note recording it as unreleased (2026-09-21) is now out of date.
- **Live but not in the catalog (non-sports):** `com.reigncreative.cutenotesjournal` "Kawaii Cute Notes Journal Plan"; `com.reigncreative.pdftoolsallinone` "PDF All in One Tool No Limit"; `com.reigncreative.transcribeaudiototext` "Transcribe Audio to Text PRO". These were not verified field by field beyond the probe in the JSON.
- **Developer website field:** 2 of 16 live sports listings set `https://reigncreativellc.com/` as the JSON-LD author URL. The other 14, including both new apps, point to `/privacy/`. This is consistent with the known Play Console owner action.

## What was not done

- No change to `src/data/apps/catalog/`, `scripts/play-verification.json`, `scripts/verify-play-listings.mjs` or any other repo file except this document and its JSON. No commits.
- No Desktop project file was modified. No Firebase config, keystore, `.env*` or credential file was opened.
- No rating, review count or download number was recorded, even though the listings show them.
- Nothing here is inferred. Every title, category and description is quoted from the listing as served at the timestamps above.
