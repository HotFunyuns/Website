# Published app inventory — latest (verified 2026-10-24)

Supersedes [app-inventory-2026-10.md](./app-inventory-2026-10.md) (2026-10-02, 44 apps) as the list of apps this site represents.

**61 apps are on the site, and all 61 were individually re-verified against their live, signed-out Google Play listing** on 2026-10-24 (capture time 2026-10-24T22:51:20.132Z) by `node scripts/verify-play-listings.mjs`, which writes `scripts/play-verification.json`. A listing counts as live only when the request returns HTTP 200 and the page carries a `SoftwareApplication` JSON-LD block, and the developer reads **Reign Collective Apps**, the Play developer name of Reign Creative LLC. `node scripts/audit-catalog.mjs` fails the build if any catalog row drifts from that file.

No rating, review count, download number, revenue or user figure is published anywhere on the site, and none appears here.

## Summary

- Live listings: **61 / 61**
- Contains ads: 60; in-app purchases listed: 51
- Each app has exactly one partnership overview (`/blog/<app>-partnership-opportunities/`) in the 2026-10-24 release: 61 / 61

## Inventory

| # | Catalog slug | Google Play title | Package | Play category | Content rating | Ads | IAP | Site category | Live |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `anime-casino-slots` | Vegas Casino Slots JACKPOT WIN | `com.reigncreative.animecasinoslots` | GAME_CASINO | Teen | Yes | Yes | anime-creative | Yes |
| 2 | `anime-coloring-book` | Anime Coloring Book: Paint Art | `reigncreative.animecoloringbook` | ART_AND_DESIGN | Everyone | Yes | Yes | anime-creative | Yes |
| 3 | `anime-trivia-word-games` | Anime Trivia & Word Games | `com.reigncreative.animetrivia` | GAME_TRIVIA | Everyone | Yes | Yes | anime-creative | Yes |
| 4 | `baseball-career-sim` | Baseball Career Sim 2026 | `com.reigncreative.baseballmycareer` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 5 | `baseball-draft-gm-team` | 162-0 Baseball Draft & GM Team | `com.reigncreative.baseballdraft162` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 6 | `basketball-career-pro-league` | Basketball Career Pro League | `com.reigncreative.basketballprocareerleague` | GAME_SPORTS | Everyone | Yes | No | sports-gm | Yes |
| 7 | `basketball-league-sandbox` | Basketball League Sandbox | `com.reigncreative.basketballleaguesandbox` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 8 | `big-jackpot-casino-slots` | BIG JACKPOT Casino Slots Games | `com.reigncreative.casinoslotsmachine` | GAME_CASINO | Teen | Yes | Yes | anime-creative | Yes |
| 9 | `block-world-rpg` | Block World RPG Craft & Build | `com.reigncreative.animecraft` | GAME_CASUAL | Everyone | Yes | Yes | anime-creative | Yes |
| 10 | `boxing-prize-fighter-career` | Boxing Prize Fighter Career | `com.reigncreative.boxingprizefightercareer` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 11 | `car-racing-pro-career` | Car Racing - Pro Career Racer | `com.reigncreative.procarracingcareer` | GAME_RACING | Everyone | Yes | Yes | sports-gm | Yes |
| 12 | `cricket-career-simulator` | Cricket Sport Career Simulator | `com.reigncreative.procricketcareersim` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 13 | `discrete-math-study-quiz` | Discrete Math: Study & Quiz | `com.reigncreative.discretemath` | EDUCATION | Everyone | Yes | No | education-brain | Yes |
| 14 | `dragon-pet-evolve` | Dragon Pet Evolve Hatch Eggs | `com.reigncreative.dragonpetevolvehatcheggs` | GAME_ADVENTURE | Everyone | Yes | Yes | anime-creative | Yes |
| 15 | `easy-recipes-meal-planner` | Easy Recipes & Meal Planner | `com.reigncreative.easyrecipes` | FOOD_AND_DRINK | Everyone | Yes | Yes | health-nutrition | Yes |
| 16 | `football-career-pro-league` | Football Career Pro League | `com.reigncreative.footballprocareerleague` | GAME_SPORTS | Everyone | Yes | No | sports-gm | Yes |
| 17 | `football-career-sim` | Football Career Sim 2027 | `com.reigncreative.footballmycareer` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 18 | `football-career-soccer-league` | Football Career Soccer League | `com.reigncreative.soccerprocareerleague` | GAME_SPORTS | Everyone | Yes | No | sports-gm | Yes |
| 19 | `football-draft-gm-mode` | Football Franchise GM League | `com.reigncreative.twentyzero.footballdraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 20 | `football-league-commissioner` | Football League Commissioner | `com.reigncreative.footballleaguesandbox` | GAME_SPORTS | Everyone | Yes | No | sports-gm | Yes |
| 21 | `golf-career-simulator` | Golf Career Simulator Pro Tour | `com.reigncreative.golfmycareersimulator` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 22 | `hero-td-idle-tower-defense` | Hero TD Idle Tower Defense | `com.reigncreative.herotdidletowerdefense` | GAME_STRATEGY | Everyone | Yes | Yes | action-arcade | Yes |
| 23 | `hockey-career-pro-league` | Hockey Career Pro League Game | `com.reigncreative.hockeyprocareerretroleague` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 24 | `hockey-career-sim` | Hockey Career Sim 2027 | `com.reigncreative.hockeymycareersimulator` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 25 | `hockey-draft-gm-manager` | 84-0 Hockey Draft & GM Manager | `com.reigncreative.eightyfourprohockeydraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 26 | `jellyfish-arena-survivor-io` | Jellyfish Arena Survivor io | `com.reigncreative.jellyfishio` | GAME_ACTION | Everyone | Yes | Yes | action-arcade | Yes |
| 27 | `kawaii-breathe-relax` | Kawaii Cute Breathe Relax Care | `com.reigncreative.kawaiicutebreatherelax` | BEAUTY | Everyone | Yes | No | health-nutrition | Yes |
| 28 | `kawaii-cute-notes-journal` | Kawaii Cute Notes Journal Plan | `com.reigncreative.cutenotesjournal` | TOOLS | Everyone | Yes | No | video-utility | Yes |
| 29 | `keto-diet-tracker` | Ketora: Keto Diet Carb Tracker | `com.reigncreative.ketotracker` | HEALTH_AND_FITNESS | Everyone | Yes | No | health-nutrition | Yes |
| 30 | `learn-cambodian-khmer` | Learn Cambodian, Speak Khmer | `com.reigncreative.learncambodian` | EDUCATION | Everyone | Yes | Yes | language-learning | Yes |
| 31 | `learn-cantonese` | Learn Cantonese for Beginners | `com.reigncreative.learnchinesecantonese` | EDUCATION | Everyone | Yes | Yes | language-learning | Yes |
| 32 | `learn-italian` | Learn Italian for Beginners | `com.reigncreative.learnitalianlanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | Yes |
| 33 | `learn-lao` | Learn Lao Language Fast & Easy | `com.reigncreative.learnlaolanguage` | EDUCATION | Everyone | Yes | No | language-learning | Yes |
| 34 | `learn-malay` | Learn Malay - Bahasa Melayu | `com.reigncreative.learnmalaylanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | Yes |
| 35 | `learn-marathi` | Learn Marathi Language Fast | `com.reigncreative.learnmarathilanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | Yes |
| 36 | `learn-russian` | Regal - Learn Russian Language | `com.reigncreative.learnrussianlanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | Yes |
| 37 | `learn-shanghainese` | Learn Shanghainese Wu Chinese | `com.reigncreative.learnshanghaineselanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | Yes |
| 38 | `learn-thai` | Regal - Learn Thai Language | `com.reigncreative.learnthailanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | Yes |
| 39 | `learn-to-trade-stocks` | Learn to Trade Stocks Beginner | `com.reigncreative.stocktradingsim` | FINANCE | Everyone | Yes | No | education-brain | Yes |
| 40 | `learn-vietnamese` | Learn Vietnamese Language Fast | `com.reigncreative.learnvietnameselanguage` | EDUCATION | Everyone | Yes | Yes | language-learning | Yes |
| 41 | `life-simulator-city-builder` | Life Simulator: City Builder | `com.reigncreative.animetowncitysim` | GAME_CASUAL | Everyone | Yes | Yes | anime-creative | Yes |
| 42 | `mental-math-memory-games` | IQ Test & Brain Training Games | `com.reigncreative.mentalmathchampion` | GAME_EDUCATIONAL | Everyone | Yes | Yes | education-brain | Yes |
| 43 | `mma-boxing-fight-draft` | 40-0 MMA & Boxing Fight Draft | `com.reigncreative.fortyzero.mmaboxingfightdraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 44 | `pdf-all-in-one-tools` | PDF All in One Tool No Limit | `com.reigncreative.pdftoolsallinone` | TOOLS | Everyone | Yes | Yes | video-utility | Yes |
| 45 | `pro-basketball-draft-gm-mode` | Basketball Game Franchise GM | `com.reigncreative.eightytwopro.basketballdraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 46 | `pro-basketball-my-career-sim` | Basketball Career Sim | `com.reigncreative.probasketballsim` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 47 | `protein-diet-tracker` | Protein Diet Tracker | `com.reigncreative.proteinup` | HEALTH_AND_FITNESS | Everyone | Yes | Yes | health-nutrition | Yes |
| 48 | `regal-tower-defense` | Regal Tower Defense: TD Game | `com.reigncreative.regaltowerdefense` | GAME_STRATEGY | Everyone | Yes | Yes | action-arcade | Yes |
| 49 | `regal-video-player` | Video Player All Formats PRO | `com.reigncreative.regalvideoplayer` | VIDEO_PLAYERS | Everyone | Yes | Yes | video-utility | Yes |
| 50 | `rugby-career-sim` | Pro Rugby Career Sport Sim | `com.reigncreative.prorugbycareersim` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 51 | `rugby-draft-pro-league` | 24-0 Rugby Draft Pro League | `com.reigncreative.twentyfourzero.rugbydraft` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 52 | `soccer-career-sim-xi` | Football Career Soccer XI Sim | `com.reigncreative.soccermycareersim` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 53 | `soccer-draft-gm-xi` | Pro Football GM Club Soccer | `com.reigncreative.soccerdraftgm` | GAME_SPORTS | Everyone | Yes | Yes | sports-gm | Yes |
| 54 | `space-galaxy-attack-hardcore` | Space Galaxy Attack Hardcore | `com.reigncreative.spacegalaxyattackhardcore` | GAME_ACTION | Everyone | Yes | Yes | action-arcade | Yes |
| 55 | `space-shooter-classic-arcade` | Space Galaxy Attack Arcade | `com.reigncreative.alieninvasion` | GAME_ARCADE | Everyone | Yes | Yes | action-arcade | Yes |
| 56 | `tcg-card-grading-scanner` | TCG Card Grading Scanner Value | `com.reigncreative.tcgvaluescanner` | SPORTS | Everyone | Yes | Yes | video-utility | Yes |
| 57 | `tennis-career-sim` | Tennis Career Simulator 2026 | `com.reigncreative.protenniscareersim` | GAME_SPORTS | Everyone | No | Yes | sports-gm | Yes |
| 58 | `transcribe-audio-to-text` | Transcribe Audio to Text PRO | `com.reigncreative.transcribeaudiototext` | TOOLS | Everyone | Yes | Yes | video-utility | Yes |
| 59 | `world-history-timeline-sim` | World History Timeline Sim | `com.reigncreative.history` | GAME_EDUCATIONAL | Everyone | Yes | Yes | education-brain | Yes |
| 60 | `world-war-gunship-attack` | World War Gunship Attack | `com.reigncreative.worldwargunshipattack` | GAME_ACTION | Everyone | Yes | Yes | action-arcade | Yes |
| 61 | `zombie-survival-last-survivor` | Zombie Survival: Last Survivor | `com.reigncreative.zombiesurvivors` | GAME_ACTION | Everyone | Yes | Yes | action-arcade | Yes |

## How to re-verify

```
node scripts/verify-play-listings.mjs   # probes all 61 packages signed out
node scripts/audit-catalog.mjs          # fails on any drift between the catalog and the capture
```

Play titles change (five renames on 2026-10-02 alone), so the catalog name, not a name typed into an article, is the source of truth; articles name apps from the catalog.
