# Published Google Play inventory

Every Google Play listing published by **Reign Collective Apps** — the store
developer account of **Reign Creative LLC** — that this website represents, with
the verification result for each.

Captured **2026-09-04** by `node scripts/verify-play-listings.mjs`, which reads
the `SoftwareApplication` JSON-LD block Google Play embeds in each listing plus
the "Contains ads" / "In-app purchases" badges. Raw capture:
`scripts/play-verification.json`. Cross-checked against the site catalog by
`node scripts/audit-catalog.mjs`, which fails on any drift.

## Inclusion test

A listing qualifies for the website only when **all** of the following hold:

1. `https://play.google.com/store/apps/details?id=<package>` returns HTTP 200 to
   a signed-out request.
2. The page carries a `SoftwareApplication` JSON-LD block — the marker of a
   publicly installable listing rather than a draft, review-stage,
   internal-testing, pre-registration or removed one.
3. The package ID is exact and unique in the catalog.
4. The listing title and the developer name are readable from that block.
5. The developer is `Reign Collective Apps`.

All 29 listings below pass all five.

## How the two names relate

**Reign Creative LLC** is the company. **Reign Collective Apps** is the name that
appears as the developer on Google Play. They are the same organisation; the
store account simply carries a different display name. Every app page on this
site states the relationship, and the site-wide `Organization` schema uses
`Reign Creative LLC` with the Play developer page as an `sameAs` identifier.

## How the inventory was discovered

Enumerating a Play developer's full catalogue is not a solved problem — the
public developer page returns only the first 20 titles, and returns the same 20
across every region tested (US, GB, CA, AU, PH, TH, MY, KH, VN, RU, HK, IN). The
inventory below was therefore assembled from four independent passes:

1. The 21 packages already in the site catalog.
2. The developer page at
   `https://play.google.com/store/apps/developer?id=Reign+Collective+Apps`
   (20 IDs, of which 4 were new).
3. A crawl of the "more by this developer" links on every known listing.
4. A direct probe of candidate package IDs built from the naming patterns
   observed in the known set — `learn<language>language`,
   `<sport>mycareer`, `<sport>mycareersimulator`, `<sport>mycareersim`,
   `<sport>draftgm` — across roughly 120 candidates, of which 4 more were new.

This found 8 listings that were public but missing from the site. It cannot
*prove* the catalogue is complete, because Google Play exposes no endpoint that
enumerates a developer's full portfolio. If a title exists under a package name
that matches none of the observed patterns and is linked from none of the known
listings, this method would not find it. **Owner action:** compare the table
below against Play Console and tell us about anything missing.

## Verified public listings (29)

Ads, in-app purchases, price and content rating are as captured on 2026-09-04.
Download counts, star ratings and review counts are deliberately **not**
recorded, on this site or in this file — they change continuously and a stale
figure presented as current is a false claim.

| # | App name | Package ID | Site page | Play category | Rating | Free | Ads | IAP |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Protein Diet Tracker | `com.reigncreative.proteinup` | `/apps/protein-diet-tracker/` | HEALTH_AND_FITNESS | Everyone | Yes | Yes | Yes |
| 2 | Keto Diet Tracker: Low Carb | `com.reigncreative.ketotracker` | `/apps/keto-diet-tracker/` | HEALTH_AND_FITNESS | Everyone | Yes | Yes | No |
| 3 | Basketball Career Sim | `com.reigncreative.probasketballsim` | `/apps/pro-basketball-my-career-sim/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 4 | Pro Basketball GM Franchise | `com.reigncreative.eightytwopro.basketballdraft` | `/apps/pro-basketball-draft-gm-mode/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 5 | 20-0 Football Draft & GM Mode | `com.reigncreative.twentyzero.footballdraft` | `/apps/football-draft-gm-mode/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 6 | 162-0 Baseball Draft & GM Team | `com.reigncreative.baseballdraft162` | `/apps/baseball-draft-gm-team/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 7 | 38-0-0 Pro Football GM Soccer | `com.reigncreative.soccerdraftgm` | `/apps/soccer-draft-gm-xi/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 8 | 84-0 Hockey Draft & GM Manager | `com.reigncreative.eightyfourprohockeydraft` | `/apps/hockey-draft-gm-manager/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 9 | 40-0 MMA & Boxing Fight Draft | `com.reigncreative.fortyzero.mmaboxingfightdraft` | `/apps/mma-boxing-fight-draft/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 10 | **Baseball Career Sim 2026** | `com.reigncreative.baseballmycareer` | `/apps/baseball-career-sim/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 11 | **Football Career Sim 2026** | `com.reigncreative.footballmycareer` | `/apps/football-career-sim/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 12 | **Hockey Career Sim 2026** | `com.reigncreative.hockeymycareersimulator` | `/apps/hockey-career-sim/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 13 | **Football Career Soccer XI Sim** | `com.reigncreative.soccermycareersim` | `/apps/soccer-career-sim-xi/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 14 | **Golf Career Simulator Pro Tour** | `com.reigncreative.golfmycareersimulator` | `/apps/golf-career-simulator/` | GAME_SPORTS | Everyone | Yes | Yes | Yes |
| 15 | Learn Cantonese for Beginners | `com.reigncreative.learnchinesecantonese` | `/apps/learn-cantonese/` | EDUCATION | Everyone | Yes | Yes | Yes |
| 16 | Regal - Learn Thai Language | `com.reigncreative.learnthailanguage` | `/apps/learn-thai/` | EDUCATION | Everyone | Yes | Yes | Yes |
| 17 | Learn Malay - Bahasa Melayu | `com.reigncreative.learnmalaylanguage` | `/apps/learn-malay/` | EDUCATION | Everyone | Yes | Yes | Yes |
| 18 | Regal - Learn Russian Language | `com.reigncreative.learnrussianlanguage` | `/apps/learn-russian/` | EDUCATION | Everyone | Yes | Yes | Yes |
| 19 | Learn Cambodian, Speak Khmer | `com.reigncreative.learncambodian` | `/apps/learn-cambodian-khmer/` | EDUCATION | Everyone | Yes | Yes | Yes |
| 20 | **Learn Vietnamese Language Fast** | `com.reigncreative.learnvietnameselanguage` | `/apps/learn-vietnamese/` | EDUCATION | Everyone | Yes | Yes | Yes |
| 21 | **Learn Lao Language Fast & Easy** | `com.reigncreative.learnlaolanguage` | `/apps/learn-lao/` | EDUCATION | Everyone | Yes | Yes | No |
| 22 | **Learn Italian for Beginners** | `com.reigncreative.learnitalianlanguage` | `/apps/learn-italian/` | EDUCATION | Everyone | Yes | Yes | Yes |
| 23 | Space Shooter - Galaxy Arcade | `com.reigncreative.alieninvasion` | `/apps/space-shooter-classic-arcade/` | GAME_ARCADE | Everyone | Yes | Yes | Yes |
| 24 | Zombie Survival: Last Survivor | `com.reigncreative.zombiesurvivors` | `/apps/zombie-survival-last-survivor/` | GAME_ACTION | Everyone | Yes | Yes | Yes |
| 25 | World History Timeline Sim | `com.reigncreative.history` | `/apps/world-history-timeline-sim/` | EDUCATION | Everyone | Yes | Yes | Yes |
| 26 | Mental Math & Memory Games | `com.reigncreative.mentalmathchampion` | `/apps/mental-math-memory-games/` | GAME_EDUCATIONAL | Everyone | Yes | Yes | Yes |
| 27 | Anime Coloring Book: Paint Art | `reigncreative.animecoloringbook` | `/apps/anime-coloring-book/` | ART_AND_DESIGN | Everyone | Yes | Yes | Yes |
| 28 | Anime Trivia & Word Games | `com.reigncreative.animetrivia` | `/apps/anime-trivia-word-games/` | GAME_TRIVIA | Everyone | Yes | Yes | Yes |
| 29 | Regal Video Player | `com.reigncreative.regalvideoplayer` | `/apps/regal-video-player/` | VIDEO_PLAYERS | Everyone | Yes | Yes | Yes |

**Bold** rows are the 8 listings added to the website in this pass.

Every Play URL is `https://play.google.com/store/apps/details?id=<package>` with
the package ID from the table. Article and app-page CTAs append a percent-encoded
`referrer` value carrying `utm_source=reigncreative_blog`,
`utm_medium=organic_content`, `utm_campaign=<app slug>` and
`utm_content=<article slug>`; no other parameter is added and nothing that could
identify a person is included.

## Facts corrected against the live store on 2026-09-04

| App | Repository said | Live listing says | Fixed |
| --- | --- | --- | --- |
| `pro-basketball-draft-gm-mode` | "Basketball Draft GM Franchise" | "Pro Basketball GM Franchise" | Catalog + 14 articles + keyword map |
| `soccer-draft-gm-xi` | "38-0 Football Draft XI Soccer" | "38-0-0 Pro Football GM Soccer" | Catalog + articles + keyword map |
| `zombie-survival-last-survivor` | No in-app purchases | In-app purchases present | Flag + 3 articles + FAQ |
| `mma-boxing-fight-draft` | No in-app purchases | In-app purchases present | Flag + 2 articles + audience bullet + FAQ + meta description |
| `learn-malay` | No in-app purchases | In-app purchases present | Flag + 3 articles + FAQ |

The site URL for the two renamed apps was **not** changed. A slug is a permanent
address; renaming it to match a store title would break every existing link and
every indexed URL for no reader benefit.

## What is deliberately not published

- **No `aggregateRating`.** Star ratings and review counts are not in the
  catalog, not in any page, and not in any JSON-LD block.
- **No download counts.** Play publishes these as coarse buckets that change
  without notice.
- **No prices other than "free to download".** All 29 are free at capture time,
  and `free: true` is the only price fact the catalog holds.
- **No "last updated" date from the store.** The site publishes its own
  `lastVerified`, which is the date *we* checked, not a store field.
