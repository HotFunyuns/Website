# Partnership and acquisition content — report (2026-10-24 release)

## What was published

- **61 partnership overviews**, one per live app (`kind: "partnership"`, disclaimer
  `partnership`), at `/blog/<app>-partnership-opportunities/`. The build rejects a second
  partnership article for the same app.
- They live in the **`/partnerships/` hub**, not in consumer listings: they are excluded from
  blog category pages, app pages' guide lists and (since this release) the sport hubs, which
  now read only `guidePosts`.
- Every overview carries the **AI-assisted label** like the rest of the release; none claims
  a person's review.

## Owner-approved scope (src/data/partnerships.ts)

Partnerships, publishing, distribution, co-development, licensing, white-label where
technically feasible, sponsorship, cross-promotion, localisation, educational and
institutional partnerships, integrations supported by existing capabilities, and acquisition
of an individual app, several apps or the portfolio.

**Not published anywhere:** prices, valuations, revenue, downloads or user numbers, ratings
counts, contract terms, confidential information, or any binding offer. Every overview says
discussions are nonbinding until due diligence and signed terms, and that any ownership
change follows Google Play's formal transfer process (Play Console Help, "Transfer apps to a
different developer account", read 2026-10-24).

## How enquiries arrive

- `/partnerships/` → a pre-filled `mailto:` to **ReignCreativeSupport@gmail.com** (static
  site; no form backend, so no credentials or submissions in the bundle).
- The pre-filled body asks for name, organisation, a reply address and a few sentences, and
  says not to include confidential, financial or personal information in a first message.
- Analytics: the click fires `business_inquiry_click` with the app slug, inquiry type,
  button location and page path only — never a name, email address or message text (GA4 G-JK8FPQB5L2,
  single tag).

## Content safeguards applied in every overview

- App facts only from the catalog (`dump-catalog` / the session's `appfacts` helper), with
  monetisation stated exactly as the listing gives it (ads; in-app purchases or none).
- Casino apps: virtual-coin entertainment only; Google Play's gambling policy cited where it
  matters (a simulated casino game that directs users to real-money casinos is a violation),
  and real-money operators are explicitly out of scope.
- Investing app: education and simulation only, not advice. Health and breathing apps: not
  medical advice; no outcome claims. Card scanner: values are third-party estimates, grades
  informational, no affiliation with publishers or graders. History app: alternate-history
  consequences are simulations.
- Draft/GM sports apps: ratings are the game's own; no league or athlete affiliation implied.
- Structure varied per app; repeated headings were rewritten so no H2 recurs across the 61
  overviews more than the release audit allows.

## The 61 overviews

| # | Article | App | Primary keyword | Category | Words |
| ---: | --- | --- | --- | --- | ---: |
| 1 | `/blog/hero-td-idle-tower-defense-partnership-opportunities/` | `hero-td-idle-tower-defense` | idle game publishing partnership | action-arcade | 786 |
| 2 | `/blog/jellyfish-arena-survivor-io-partnership-opportunities/` | `jellyfish-arena-survivor-io` | io game partnership | action-arcade | 816 |
| 3 | `/blog/regal-tower-defense-partnership-opportunities/` | `regal-tower-defense` | tower defense game acquisition | action-arcade | 822 |
| 4 | `/blog/space-galaxy-attack-hardcore-partnership-opportunities/` | `space-galaxy-attack-hardcore` | shooter game acquisition | action-arcade | 782 |
| 5 | `/blog/space-shooter-classic-arcade-partnership-opportunities/` | `space-shooter-classic-arcade` | arcade game publishing partnership | action-arcade | 808 |
| 6 | `/blog/world-war-gunship-attack-partnership-opportunities/` | `world-war-gunship-attack` | action game acquisition | action-arcade | 789 |
| 7 | `/blog/zombie-survival-last-survivor-partnership-opportunities/` | `zombie-survival-last-survivor` | survival game licensing | action-arcade | 799 |
| 8 | `/blog/anime-casino-slots-partnership-opportunities/` | `anime-casino-slots` | social casino game acquisition | anime-creative | 773 |
| 9 | `/blog/anime-coloring-book-partnership-opportunities/` | `anime-coloring-book` | coloring app licensing | anime-creative | 819 |
| 10 | `/blog/anime-trivia-word-games-partnership-opportunities/` | `anime-trivia-word-games` | trivia game partnership | anime-creative | 803 |
| 11 | `/blog/big-jackpot-casino-slots-partnership-opportunities/` | `big-jackpot-casino-slots` | slots game publishing partnership | anime-creative | 783 |
| 12 | `/blog/block-world-rpg-partnership-opportunities/` | `block-world-rpg` | sandbox game co-development | anime-creative | 784 |
| 13 | `/blog/dragon-pet-evolve-partnership-opportunities/` | `dragon-pet-evolve` | virtual pet game licensing | anime-creative | 782 |
| 14 | `/blog/life-simulator-city-builder-partnership-opportunities/` | `life-simulator-city-builder` | city builder game partnership | anime-creative | 803 |
| 15 | `/blog/discrete-math-study-quiz-partnership-opportunities/` | `discrete-math-study-quiz` | math education app partnership | education-brain | 777 |
| 16 | `/blog/learn-to-trade-stocks-partnership-opportunities/` | `learn-to-trade-stocks` | financial literacy app partnership | education-brain | 774 |
| 17 | `/blog/mental-math-memory-games-partnership-opportunities/` | `mental-math-memory-games` | brain training app acquisition | education-brain | 783 |
| 18 | `/blog/world-history-timeline-sim-partnership-opportunities/` | `world-history-timeline-sim` | history education app partnership | education-brain | 823 |
| 19 | `/blog/easy-recipes-meal-planner-partnership-opportunities/` | `easy-recipes-meal-planner` | meal planner app partnership | health-nutrition | 791 |
| 20 | `/blog/kawaii-breathe-relax-partnership-opportunities/` | `kawaii-breathe-relax` | wellness app partnership | health-nutrition | 787 |
| 21 | `/blog/keto-diet-tracker-partnership-opportunities/` | `keto-diet-tracker` | keto app licensing | health-nutrition | 807 |
| 22 | `/blog/protein-diet-tracker-partnership-opportunities/` | `protein-diet-tracker` | nutrition tracker app partnership | health-nutrition | 791 |
| 23 | `/blog/learn-cambodian-khmer-partnership-opportunities/` | `learn-cambodian-khmer` | khmer learning app partnership | language-learning | 819 |
| 24 | `/blog/learn-cantonese-partnership-opportunities/` | `learn-cantonese` | cantonese learning app partnership | language-learning | 790 |
| 25 | `/blog/learn-italian-partnership-opportunities/` | `learn-italian` | italian learning app partnership | language-learning | 810 |
| 26 | `/blog/learn-lao-partnership-opportunities/` | `learn-lao` | lao language app partnership | language-learning | 801 |
| 27 | `/blog/learn-malay-partnership-opportunities/` | `learn-malay` | malay learning app partnership | language-learning | 818 |
| 28 | `/blog/learn-marathi-partnership-opportunities/` | `learn-marathi` | marathi learning app partnership | language-learning | 826 |
| 29 | `/blog/learn-russian-partnership-opportunities/` | `learn-russian` | russian learning app licensing | language-learning | 828 |
| 30 | `/blog/learn-shanghainese-partnership-opportunities/` | `learn-shanghainese` | shanghainese learning partnership | language-learning | 788 |
| 31 | `/blog/learn-thai-partnership-opportunities/` | `learn-thai` | thai learning app partnership | language-learning | 789 |
| 32 | `/blog/learn-vietnamese-partnership-opportunities/` | `learn-vietnamese` | vietnamese learning app partnership | language-learning | 795 |
| 33 | `/blog/baseball-career-sim-partnership-opportunities/` | `baseball-career-sim` | baseball game partnership | sports-gm | 808 |
| 34 | `/blog/baseball-draft-gm-team-partnership-opportunities/` | `baseball-draft-gm-team` | baseball gm game acquisition | sports-gm | 810 |
| 35 | `/blog/basketball-career-pro-league-partnership-opportunities/` | `basketball-career-pro-league` | basketball game publishing partnership | sports-gm | 826 |
| 36 | `/blog/basketball-league-sandbox-partnership-opportunities/` | `basketball-league-sandbox` | basketball simulation licensing | sports-gm | 823 |
| 37 | `/blog/boxing-prize-fighter-career-partnership-opportunities/` | `boxing-prize-fighter-career` | boxing game partnership | sports-gm | 827 |
| 38 | `/blog/car-racing-pro-career-partnership-opportunities/` | `car-racing-pro-career` | racing game partnership | sports-gm | 817 |
| 39 | `/blog/cricket-career-simulator-partnership-opportunities/` | `cricket-career-simulator` | cricket game partnership | sports-gm | 822 |
| 40 | `/blog/football-career-pro-league-partnership-opportunities/` | `football-career-pro-league` | football game co-development | sports-gm | 804 |
| 41 | `/blog/football-career-sim-partnership-opportunities/` | `football-career-sim` | american football game publishing partnership | sports-gm | 843 |
| 42 | `/blog/football-career-soccer-league-partnership-opportunities/` | `football-career-soccer-league` | soccer game localization partnership | sports-gm | 811 |
| 43 | `/blog/football-draft-gm-mode-partnership-opportunities/` | `football-draft-gm-mode` | football gm game partnership | sports-gm | 804 |
| 44 | `/blog/football-league-commissioner-partnership-opportunities/` | `football-league-commissioner` | sports league simulator licensing | sports-gm | 806 |
| 45 | `/blog/golf-career-simulator-partnership-opportunities/` | `golf-career-simulator` | golf game partnership | sports-gm | 810 |
| 46 | `/blog/hockey-career-pro-league-partnership-opportunities/` | `hockey-career-pro-league` | hockey game publishing partnership | sports-gm | 800 |
| 47 | `/blog/hockey-career-sim-partnership-opportunities/` | `hockey-career-sim` | hockey game licensing | sports-gm | 796 |
| 48 | `/blog/hockey-draft-gm-manager-partnership-opportunities/` | `hockey-draft-gm-manager` | hockey gm game partnership | sports-gm | 812 |
| 49 | `/blog/mma-boxing-fight-draft-partnership-opportunities/` | `mma-boxing-fight-draft` | mma game licensing | sports-gm | 816 |
| 50 | `/blog/pro-basketball-draft-gm-mode-partnership-opportunities/` | `pro-basketball-draft-gm-mode` | basketball gm game acquisition | sports-gm | 821 |
| 51 | `/blog/pro-basketball-my-career-sim-partnership-opportunities/` | `pro-basketball-my-career-sim` | basketball career game licensing | sports-gm | 919 |
| 52 | `/blog/rugby-career-sim-partnership-opportunities/` | `rugby-career-sim` | rugby game partnership | sports-gm | 796 |
| 53 | `/blog/rugby-draft-pro-league-partnership-opportunities/` | `rugby-draft-pro-league` | rugby gm game partnership | sports-gm | 789 |
| 54 | `/blog/soccer-career-sim-xi-partnership-opportunities/` | `soccer-career-sim-xi` | soccer career game partnership | sports-gm | 809 |
| 55 | `/blog/soccer-draft-gm-xi-partnership-opportunities/` | `soccer-draft-gm-xi` | soccer manager game acquisition | sports-gm | 842 |
| 56 | `/blog/tennis-career-sim-partnership-opportunities/` | `tennis-career-sim` | tennis game licensing | sports-gm | 793 |
| 57 | `/blog/kawaii-cute-notes-journal-partnership-opportunities/` | `kawaii-cute-notes-journal` | journal app partnership | video-utility | 801 |
| 58 | `/blog/pdf-all-in-one-tools-partnership-opportunities/` | `pdf-all-in-one-tools` | pdf app partnership | video-utility | 763 |
| 59 | `/blog/regal-video-player-partnership-opportunities/` | `regal-video-player` | video player app licensing | video-utility | 779 |
| 60 | `/blog/tcg-card-grading-scanner-partnership-opportunities/` | `tcg-card-grading-scanner` | card scanner app partnership | video-utility | 770 |
| 61 | `/blog/transcribe-audio-to-text-partnership-opportunities/` | `transcribe-audio-to-text` | transcription app partnership | video-utility | 795 |

## Related documents

- [acquisition-checklist.md](./acquisition-checklist.md) — owner process from first contact to the Play transfer.
- [published-app-inventory-latest.md](./published-app-inventory-latest.md) — the 61 verified apps.
- [article-review-manifest-400.md](./article-review-manifest-400.md) — review verdicts for every article in the release.
