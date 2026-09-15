# Current production app inventory — verified 2026-09-15

Supersedes `docs/published-app-inventory.md` (2026-09-04, 29 apps).

**39 apps are on the site. All 39 were individually re-verified on 2026-09-15
against their live, signed-out Google Play listing.** Nothing below is carried
over on trust from a previous audit — every row was re-probed in this pass.

## Verification method

Identical for all 39, and reproducible:

```
node scripts/verify-play-listings.mjs     # probes every package, writes scripts/play-verification.json
node scripts/audit-catalog.mjs            # fails if any catalog row drifts from that file
node scripts/fetch-app-icons.mjs          # downloads icons we do not already hold locally
```

`verify-play-listings.mjs` requests
`https://play.google.com/store/apps/details?id=<package>&hl=en&gl=US` with no
cookies and no Google session, and accepts the listing as **publicly available**
only when the response is **HTTP 200 and the page carries a
`SoftwareApplication` JSON-LD block**. A 404, a redirect away from the listing,
or a 200 with no JSON-LD all count as *not public*, and the script reports that
package as unverified rather than passing it through.

Every published fact on the site (name, Play category, content rating, ads
disclosure, in-app purchase disclosure, free/paid) is copied out of that JSON by
`audit-catalog.mjs`, which is why the catalog cannot silently disagree with the
store. **No rating, review count or download number is published anywhere on
this site**, because the JSON-LD does not carry one we could stand behind.

## How the 39 were found

The public developer page
(`https://play.google.com/store/apps/developer?id=Reign+Collective+Apps`) renders
only **20** packages into its initial HTML and offers no pagination, so it is not
a complete index. Three passes were used together:

1. **Developer page scrape** — 20 packages, including three not previously in the
   catalog (`protenniscareersim`, `spacegalaxyattackhardcore`, `tcgvaluescanner`).
2. **Breadth-first crawl** of every known listing page, extracting any
   `com.reigncreative.*` package ID appearing in the HTML. This confirmed the
   32 then-known packages and surfaced no others — the "more by developer"
   carousel is loaded by JavaScript and is not in the served HTML.
3. **Google Play search** for each title the owner listed as recently visible,
   followed by direct package-ID probing. This found the remaining seven.

## Verified production apps (39)

Icon assets are committed under `public/icons/` at 384px and 128px. **The site
never hotlinks Google's CDN.**

| App title (exactly as shown on Play) | Package ID | Play listing | Site URL | Category | Verification | Checked | Local icon assets |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 162-0 Baseball Draft & GM Team | `com.reigncreative.baseballdraft162` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.baseballdraft162) | `/apps/baseball-draft-gm-team/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/baseball-draft-gm-team.webp`<br>`public/icons/baseball-draft-gm-team-sm.webp` |
| 20-0 Football Draft & GM Mode | `com.reigncreative.twentyzero.footballdraft` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.twentyzero.footballdraft) | `/apps/football-draft-gm-mode/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/football-draft-gm-mode.webp`<br>`public/icons/football-draft-gm-mode-sm.webp` |
| 24-0 Rugby Draft Pro League <br>**NEW** | `com.reigncreative.twentyfourzero.rugbydraft` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.twentyfourzero.rugbydraft) | `/apps/rugby-draft-pro-league/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/rugby-draft-pro-league.webp`<br>`public/icons/rugby-draft-pro-league-sm.webp` |
| 40-0 MMA & Boxing Fight Draft | `com.reigncreative.fortyzero.mmaboxingfightdraft` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.fortyzero.mmaboxingfightdraft) | `/apps/mma-boxing-fight-draft/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/mma-boxing-fight-draft.webp`<br>`public/icons/mma-boxing-fight-draft-sm.webp` |
| 84-0 Hockey Draft & GM Manager | `com.reigncreative.eightyfourprohockeydraft` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.eightyfourprohockeydraft) | `/apps/hockey-draft-gm-manager/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/hockey-draft-gm-manager.webp`<br>`public/icons/hockey-draft-gm-manager-sm.webp` |
| Anime Casino Slot Machine Game <br>**NEW** | `com.reigncreative.animecasinoslots` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.animecasinoslots) | `/apps/anime-casino-slots/` | anime-creative | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/anime-casino-slots.webp`<br>`public/icons/anime-casino-slots-sm.webp` |
| Anime Coloring Book: Paint Art | `reigncreative.animecoloringbook` | [listing](https://play.google.com/store/apps/details?id=reigncreative.animecoloringbook) | `/apps/anime-coloring-book/` | anime-creative | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/anime-coloring-book.jpg`<br>`public/icons/anime-coloring-book-sm.jpg` |
| Anime Trivia & Word Games | `com.reigncreative.animetrivia` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.animetrivia) | `/apps/anime-trivia-word-games/` | anime-creative | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/anime-trivia-word-games.webp`<br>`public/icons/anime-trivia-word-games-sm.webp` |
| Baseball Career Sim 2026 | `com.reigncreative.baseballmycareer` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.baseballmycareer) | `/apps/baseball-career-sim/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/baseball-career-sim.webp`<br>`public/icons/baseball-career-sim-sm.webp` |
| Basketball Career Sim | `com.reigncreative.probasketballsim` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.probasketballsim) | `/apps/pro-basketball-my-career-sim/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/pro-basketball-my-career-sim.jpg`<br>`public/icons/pro-basketball-my-career-sim-sm.jpg` |
| Easy Recipes & Meal Planner <br>**NEW** | `com.reigncreative.easyrecipes` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.easyrecipes) | `/apps/easy-recipes-meal-planner/` | health-nutrition | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/easy-recipes-meal-planner.webp`<br>`public/icons/easy-recipes-meal-planner-sm.webp` |
| Football Career Sim 2026 | `com.reigncreative.footballmycareer` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.footballmycareer) | `/apps/football-career-sim/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/football-career-sim.webp`<br>`public/icons/football-career-sim-sm.webp` |
| Football Career Soccer XI Sim <br>hero | `com.reigncreative.soccermycareersim` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.soccermycareersim) | `/apps/soccer-career-sim-xi/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/soccer-career-sim-xi.webp`<br>`public/icons/soccer-career-sim-xi-sm.webp` |
| Golf Career Simulator Pro Tour | `com.reigncreative.golfmycareersimulator` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.golfmycareersimulator) | `/apps/golf-career-simulator/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/golf-career-simulator.webp`<br>`public/icons/golf-career-simulator-sm.webp` |
| Hockey Career Sim 2026 <br>hero | `com.reigncreative.hockeymycareersimulator` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.hockeymycareersimulator) | `/apps/hockey-career-sim/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/hockey-career-sim.webp`<br>`public/icons/hockey-career-sim-sm.webp` |
| Jellyfish Arena Survivor io <br>**NEW** · hero | `com.reigncreative.jellyfishio` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.jellyfishio) | `/apps/jellyfish-arena-survivor-io/` | action-arcade | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/jellyfish-arena-survivor-io.webp`<br>`public/icons/jellyfish-arena-survivor-io-sm.webp` |
| Keto Diet Tracker: Low Carb | `com.reigncreative.ketotracker` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.ketotracker) | `/apps/keto-diet-tracker/` | health-nutrition | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/keto-diet-tracker.jpg`<br>`public/icons/keto-diet-tracker-sm.jpg` |
| Learn Cambodian, Speak Khmer | `com.reigncreative.learncambodian` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learncambodian) | `/apps/learn-cambodian-khmer/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-cambodian-khmer.webp`<br>`public/icons/learn-cambodian-khmer-sm.webp` |
| Learn Cantonese for Beginners | `com.reigncreative.learnchinesecantonese` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learnchinesecantonese) | `/apps/learn-cantonese/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-cantonese.webp`<br>`public/icons/learn-cantonese-sm.webp` |
| Learn Italian for Beginners | `com.reigncreative.learnitalianlanguage` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learnitalianlanguage) | `/apps/learn-italian/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-italian.webp`<br>`public/icons/learn-italian-sm.webp` |
| Learn Lao Language Fast & Easy | `com.reigncreative.learnlaolanguage` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learnlaolanguage) | `/apps/learn-lao/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-lao.webp`<br>`public/icons/learn-lao-sm.webp` |
| Learn Malay - Bahasa Melayu | `com.reigncreative.learnmalaylanguage` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learnmalaylanguage) | `/apps/learn-malay/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-malay.webp`<br>`public/icons/learn-malay-sm.webp` |
| Learn Marathi Language Fast <br>**NEW** | `com.reigncreative.learnmarathilanguage` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learnmarathilanguage) | `/apps/learn-marathi/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-marathi.webp`<br>`public/icons/learn-marathi-sm.webp` |
| Learn Shanghainese Wu Chinese <br>**NEW** | `com.reigncreative.learnshanghaineselanguage` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learnshanghaineselanguage) | `/apps/learn-shanghainese/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-shanghainese.webp`<br>`public/icons/learn-shanghainese-sm.webp` |
| Learn Vietnamese Language Fast | `com.reigncreative.learnvietnameselanguage` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learnvietnameselanguage) | `/apps/learn-vietnamese/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-vietnamese.webp`<br>`public/icons/learn-vietnamese-sm.webp` |
| Mental Math & Memory Games | `com.reigncreative.mentalmathchampion` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.mentalmathchampion) | `/apps/mental-math-memory-games/` | education-brain | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/mental-math-memory-games.webp`<br>`public/icons/mental-math-memory-games-sm.webp` |
| Pro Basketball GM Franchise <br>hero | `com.reigncreative.eightytwopro.basketballdraft` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.eightytwopro.basketballdraft) | `/apps/pro-basketball-draft-gm-mode/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/pro-basketball-draft-gm-mode.webp`<br>`public/icons/pro-basketball-draft-gm-mode-sm.webp` |
| Pro Football GM Club Soccer | `com.reigncreative.soccerdraftgm` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.soccerdraftgm) | `/apps/soccer-draft-gm-xi/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/soccer-draft-gm-xi.webp`<br>`public/icons/soccer-draft-gm-xi-sm.webp` |
| Protein Diet Tracker | `com.reigncreative.proteinup` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.proteinup) | `/apps/protein-diet-tracker/` | health-nutrition | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/protein-diet-tracker.jpg`<br>`public/icons/protein-diet-tracker-sm.jpg` |
| Regal - Learn Russian Language | `com.reigncreative.learnrussianlanguage` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learnrussianlanguage) | `/apps/learn-russian/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-russian.webp`<br>`public/icons/learn-russian-sm.webp` |
| Regal - Learn Thai Language | `com.reigncreative.learnthailanguage` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.learnthailanguage) | `/apps/learn-thai/` | language-learning | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/learn-thai.webp`<br>`public/icons/learn-thai-sm.webp` |
| Regal Tower Defense: TD Game <br>**NEW** | `com.reigncreative.regaltowerdefense` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.regaltowerdefense) | `/apps/regal-tower-defense/` | action-arcade | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/regal-tower-defense.webp`<br>`public/icons/regal-tower-defense-sm.webp` |
| Regal Video Player <br>hero | `com.reigncreative.regalvideoplayer` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.regalvideoplayer) | `/apps/regal-video-player/` | video-utility | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/regal-video-player.webp`<br>`public/icons/regal-video-player-sm.webp` |
| Space Galaxy Attack Arcade | `com.reigncreative.alieninvasion` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.alieninvasion) | `/apps/space-shooter-classic-arcade/` | action-arcade | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/space-shooter-classic-arcade.jpg`<br>`public/icons/space-shooter-classic-arcade-sm.jpg` |
| Space Galaxy Attack Hardcore <br>**NEW** · hero | `com.reigncreative.spacegalaxyattackhardcore` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.spacegalaxyattackhardcore) | `/apps/space-galaxy-attack-hardcore/` | action-arcade | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/space-galaxy-attack-hardcore.webp`<br>`public/icons/space-galaxy-attack-hardcore-sm.webp` |
| TCG Card Grading Scanner Value <br>**NEW** · hero | `com.reigncreative.tcgvaluescanner` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.tcgvaluescanner) | `/apps/tcg-card-grading-scanner/` | video-utility | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/tcg-card-grading-scanner.webp`<br>`public/icons/tcg-card-grading-scanner-sm.webp` |
| Tennis Career Simulator 2026 <br>**NEW** · hero | `com.reigncreative.protenniscareersim` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.protenniscareersim) | `/apps/tennis-career-sim/` | sports-gm | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/tennis-career-sim.webp`<br>`public/icons/tennis-career-sim-sm.webp` |
| World History Timeline Sim | `com.reigncreative.history` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.history) | `/apps/world-history-timeline-sim/` | education-brain | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/world-history-timeline-sim.jpg`<br>`public/icons/world-history-timeline-sim-sm.jpg` |
| Zombie Survival: Last Survivor | `com.reigncreative.zombiesurvivors` | [listing](https://play.google.com/store/apps/details?id=com.reigncreative.zombiesurvivors) | `/apps/zombie-survival-last-survivor/` | action-arcade | HTTP 200 + JSON-LD | 2026-09-15 | `public/icons/zombie-survival-last-survivor.jpg`<br>`public/icons/zombie-survival-last-survivor-sm.jpg` |

### Distribution

| Category | Apps |
| --- | ---: |
| sports-gm | 14 |
| language-learning | 10 |
| action-arcade | 5 |
| anime-creative | 3 |
| health-nutrition | 3 |
| education-brain | 2 |
| video-utility | 2 |
| **Total** | **39** |

No new category was created. Ten apps were placed into the seven existing
categories and the affected category copy was widened to match what now sits in
it — see "Judgement calls" below.

---

## Added in this pass (10)

All ten returned HTTP 200 with `SoftwareApplication` JSON-LD, signed out, on
2026-09-15, under developer **Reign Collective Apps**.

| App | Package | Site URL | Category | How it was found |
| --- | --- | --- | --- | --- |
| Tennis Career Simulator 2026 | `com.reigncreative.protenniscareersim` | `/apps/tennis-career-sim/` | sports-gm | Developer page |
| Space Galaxy Attack Hardcore | `com.reigncreative.spacegalaxyattackhardcore` | `/apps/space-galaxy-attack-hardcore/` | action-arcade | Developer page |
| TCG Card Grading Scanner Value | `com.reigncreative.tcgvaluescanner` | `/apps/tcg-card-grading-scanner/` | video-utility | Developer page |
| Jellyfish Arena Survivor io | `com.reigncreative.jellyfishio` | `/apps/jellyfish-arena-survivor-io/` | action-arcade | Play search |
| 24-0 Rugby Draft Pro League | `com.reigncreative.twentyfourzero.rugbydraft` | `/apps/rugby-draft-pro-league/` | sports-gm | Play search |
| Regal Tower Defense: TD Game | `com.reigncreative.regaltowerdefense` | `/apps/regal-tower-defense/` | action-arcade | Play search |
| Learn Marathi Language Fast | `com.reigncreative.learnmarathilanguage` | `/apps/learn-marathi/` | language-learning | Play search |
| Learn Shanghainese Wu Chinese | `com.reigncreative.learnshanghaineselanguage` | `/apps/learn-shanghainese/` | language-learning | Play search |
| Easy Recipes & Meal Planner | `com.reigncreative.easyrecipes` | `/apps/easy-recipes-meal-planner/` | health-nutrition | Play search |
| Anime Casino Slot Machine Game | `com.reigncreative.animecasinoslots` | `/apps/anime-casino-slots/` | anime-creative | Package-ID probe |

Every feature, audience line and FAQ answer written for these ten is traceable
to a specific statement in the live long description captured in
`scripts/play-verification.json`. Nothing was inferred, and no download count,
rating or review number appears in any of them.

## Renamed on Play since the last audit (2)

Both URL slugs are **unchanged**. Two published articles and a legacy alias route
depend on them, and a rename on the store is not a reason to break a live URL.

| Site URL (unchanged) | Old catalog name | Live name on Play, 2026-09-15 |
| --- | --- | --- |
| `/apps/space-shooter-classic-arcade/` | Space Shooter - Galaxy Arcade | **Space Galaxy Attack Arcade** |
| `/apps/soccer-draft-gm-xi/` | 38-0-0 Pro Football GM Soccer | **Pro Football GM Club Soccer** |

The soccer rename went further than the title. The live listing **no longer
mentions "38-0-0" or a 38-game season anywhere** — it now says "chase a perfect
season" with no match count. The catalog entry's `tagline`, `cardDescription`,
two `longDescription` paragraphs, one feature, one step and one FAQ all asserted
the 38-game framing, so those claims were removed rather than left standing
without a source. The store-supported "perfect season" framing was kept.

> **Open item for the content owner, outside this agent's file ownership:**
> **27 published articles under `content/blog/` still name these apps by their
> retired titles** — 15 say "Space Shooter - Galaxy Arcade" and 12 say
> "38-0-0 Pro Football GM Soccer". All 12 of the soccer ones also state the
> 38-game / 38-0-0 figure as fact, which the live listing no longer supports;
> `soccer-draft-xi-guide.md` is the worst case, containing the sentence
> "The app is titled 38-0-0 Pro Football GM Soccer" plus a worked
> "38 x 3 = 114 points" calculation. Those articles now disagree with the app
> pages they link to. The full file list is in the agent report to the lead.

## Removed from the catalog

**None.** All 29 previously published apps are still publicly reachable.

---

## Excluded

See `docs/excluded-google-play-listings.md` for the full probe log. Summary:

| App | Status | Reason |
| --- | --- | --- |
| BIG JACKPOT Casino Slots Games | **UNVERIFIED — excluded** | No publicly reachable listing found. Not on the developer page; absent from Google Play search under five separate queries; 22 plausible package IDs probed, all HTTP 404. Cannot be confirmed public, so it is not on the site. |

**Not treated as live.** An app that cannot be verified is excluded, not
assumed. If the owner supplies the exact package ID, it can be re-probed and
added in one pass: add the ID to `PACKAGES` in
`scripts/verify-play-listings.mjs`, re-run the three commands at the top of this
document, and write the catalog entry.

---

## Judgement calls for review

1. **No new categories were created.** A `strategy` category would have held one
   app (Regal Tower Defense) and a `casino` category one app (Anime Casino Slot
   Machine Game). Single-app category pages are thin doorway pages, and each new
   category adds an `/apps/category/<id>/` route mid-release while another agent
   owns the sitemap. Both apps were placed in the nearest existing category and
   the category's `blurb`/`intro`/`metaDescription` in `src/data/apps/types.ts`
   was widened to describe what is actually in it. Reverse this if the lead
   prefers accurate taxonomy over page thickness.

2. **Anime Casino Slot Machine Game is a simulated-gambling title.** It is rated
   **Teen** (every other app on the site is Everyone), sits in Play's
   `GAME_CASINO` category, and its own listing states it is for an adult
   audience. It is genuinely public and it is the owner's product, and the owner
   listed it, so it was added — with the entertainment-only, no-real-money,
   coins-are-not-redeemable disclosures stated in the first paragraph of the
   page, the FAQ and the category intro. **If the studio does not want a
   simulated-gambling title represented on the marketing site, or if it creates
   an ad-network policy problem, deleting the one entry from
   `src/data/apps/catalog/anime-creative.ts` removes it cleanly.**

3. **Two listings claim Premium/VIP tiers in their long description but show no
   "In-app purchases" badge on Play**: Space Galaxy Attack Hardcore and Anime
   Casino Slot Machine Game. The badge is what the site publishes, because the
   badge is the store's own disclosure. The site therefore says "In-app
   purchases: No" for both. The copy written for them avoids describing a
   purchase, so nothing on the page contradicts the fact table — but the owner
   may want to check whether those two listings' badges are correct.

4. **`schemaCategory` gained two values** in `src/data/apps/types.ts`:
   `UtilitiesApplication` (TCG scanner) and `LifestyleApplication` (recipes).
   Both are valid schema.org `applicationCategory` values. The field is passed
   straight through to JSON-LD as a string, so nothing else needed changing.
