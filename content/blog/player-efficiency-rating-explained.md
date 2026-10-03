---
{
  "title": "PER, Win Shares and Box Plus/Minus: Basketball's All-in-One Ratings Explained",
  "metaTitle": "What Is PER in Basketball? PER vs Win Shares vs BPM",
  "description": "What PER, Win Shares and Box Plus/Minus measure, how each is built from the box score, why they can disagree about one player, and which suits which question.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "basketball",
    "analytics",
    "advanced stats",
    "player ratings",
    "statistics"
  ],
  "primaryKeyword": "what is per in basketball",
  "secondaryKeywords": [
    "player efficiency rating formula",
    "what is a good per in basketball",
    "per vs win shares",
    "win shares per 48",
    "box plus minus meaning",
    "player efficiency rating"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is league average per 15",
    "what does vorp mean in basketball",
    "how are win shares calculated",
    "does per reward volume shooting"
  ],
  "aiSearchQuestions": [
    "What is PER in basketball?",
    "What is a good PER?",
    "What is the difference between PER and Win Shares?",
    "What does Box Plus/Minus measure?",
    "What is WS/48?"
  ],
  "relatedApps": [
    "pro-basketball-draft-gm-mode",
    "pro-basketball-my-career-sim"
  ],
  "relatedArticles": [
    "basketball-advanced-stats-explained",
    "how-sports-simulation-engines-work",
    "basketball-draft-gm-guide"
  ],
  "takeaways": [
    "Read PER against its fixed baseline: the league average is set to 15.00 every season, so 15 means average per-minute box-score production.",
    "Check efficiency before trusting a high PER, because under the 2025-26 league constants a two-point attempt adds to PER whenever it goes in more than about 34% of the time.",
    "Use Win Shares for 'who produced the wins' and WS/48 for a rate comparison, remembering that the league average WS/48 is about 0.100.",
    "Use BPM and VORP for per-possession impact, but discount the defensive part, which its own author says should not be considered definitive.",
    "When two all-in-one numbers disagree, look at minutes, shooting efficiency and defensive role before deciding which one is wrong."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is PER in basketball?",
      "answer": "PER, or Player Efficiency Rating, is a per-minute rating developed by John Hollinger. It adds up a player's positive box-score contributions, subtracts the negative ones, adjusts for the team's pace and then scales the result so the league average is 15.00 every season. It measures box-score production per minute, not defence or impact on the score directly."
    },
    {
      "question": "What is a good PER?",
      "answer": "Anything above 15 is above the league average, because the formula sets the average to 15 every season. Basketball-Reference's methodology page does not publish an official scale beyond that, so treat the distance above 15 as the signal. Check minutes and shooting efficiency too, because a small sample or high-volume shooting can inflate a rating."
    },
    {
      "question": "What is the difference between PER and Win Shares?",
      "answer": "PER is a per-minute rate built from the box score, while Win Shares divides a team's wins among its players. Win Shares only credits offence above 92% of league-average efficiency per possession, so inefficient volume shooting counts against a player. PER's break-even point for a shot is much lower, which is a common reason the two disagree."
    },
    {
      "question": "What is WS/48?",
      "answer": "Win Shares per 48 minutes: an estimate of the wins a player contributes per 48 minutes played. Basketball-Reference puts the league average at approximately 0.100. It turns Win Shares, a counting stat, into a rate so that players with different minutes can be compared."
    },
    {
      "question": "What does Box Plus/Minus measure?",
      "answer": "BPM estimates how many points per 100 possessions a player contributes above a league-average player, using box-score information, position and team performance. Its weights come from regressions on plus-minus data from 1996-97 to 2015-16. It is a pure rate stat; VORP converts it into a total that accounts for playing time."
    }
  ],
  "sources": [
    {
      "title": "Calculating PER",
      "publisher": "Basketball-Reference.com",
      "url": "https://www.basketball-reference.com/about/per.html",
      "accessed": "2026-10-02"
    },
    {
      "title": "NBA Win Shares",
      "publisher": "Basketball-Reference.com",
      "url": "https://www.basketball-reference.com/about/ws.html",
      "accessed": "2026-10-02"
    },
    {
      "title": "About Box Plus/Minus (BPM)",
      "publisher": "Basketball-Reference.com",
      "url": "https://www.basketball-reference.com/about/bpm2.html",
      "accessed": "2026-10-02"
    },
    {
      "title": "Glossary",
      "publisher": "Basketball-Reference.com",
      "url": "https://www.basketball-reference.com/about/glossary.html",
      "accessed": "2026-10-02"
    },
    {
      "title": "NBA League Averages - Per Game",
      "publisher": "Basketball-Reference.com",
      "url": "https://www.basketball-reference.com/leagues/NBA_stats_per_game.html",
      "accessed": "2026-10-02"
    }
  ]
}
---

PER, short for Player Efficiency Rating, is a per-minute rating devised by John Hollinger that adds up everything positive a player records in the box score, subtracts the negatives, adjusts for the team's pace and scales the result so that the league average is exactly 15.00 every season. A PER above 15 means above-average box-score production per minute, and a PER below 15 means below-average.

PER is one of three all-in-one numbers you will meet on Basketball-Reference, alongside Win Shares and Box Plus/Minus. They are often quoted as if they measured the same thing. They do not, and the most useful thing to know about them is why they disagree.

This piece picks up where [basketball advanced stats explained](/blog/basketball-advanced-stats-explained/) stops. That article covers the rate statistics, true shooting, usage and per-possession numbers, and warns that composite ratings "hide their assumptions". Here are the assumptions.

## Three numbers, three different questions

| | PER | Win Shares | Box Plus/Minus |
| --- | --- | --- | --- |
| The question it answers | How productive was this player per minute, by the box score? | How many of the team's wins does this player's production account for? | How many points per 100 possessions better than an average player was this player? |
| Built from | Box-score totals, team assist rate, league constants and pace | Points produced and possessions on offence; Defensive Rating on defence; team and league totals | Box-score information, position and team performance, weighted by regression |
| Baseline | League average set to 15.00 | Team Win Shares roughly equal team wins; WS/48 league average about 0.100 | League average is 0.0; replacement level is -2.0 |
| Rate or total? | Rate | Total (WS) and rate (WS/48) | Rate; VORP is the total |
| Available from | 1951-52 | 1951-52 for WS/48 | 1973-74 |

The availability dates come from Basketball-Reference's glossary, and they matter: anything before 1973-74 is calculated without steals, blocks and offensive rebounds, which the league did not record until then.

## PER: an adding machine with weights

Basketball-Reference publishes the full formula. It starts with "unadjusted PER", built from a player's totals, then multiplies by a pace adjustment, league pace divided by team pace, and finally rescales so the minutes-weighted league average is 15.

The positive terms are three-pointers, assists (worth two-thirds of a point each), field goals, free throws, rebounds, steals and blocks. The negative terms are turnovers, missed field goals, missed free throws and personal fouls. Several of those are valued using league-wide constants, most importantly the "value of possession", league points divided by league possessions.

That weighting has a consequence you can calculate. Using Basketball-Reference's 2025-26 league averages, and assuming the player's team assisted on the league-average share of its baskets, the formula credits roughly the following, in its raw units before the per-minute, pace and league-average scaling:

- **+1.62** for a made two-point field goal;
- **+2.62** for a made three, the extra point coming from the three-pointer term;
- **-0.83** for any missed field goal.

Those figures are our arithmetic from the published formula and the 2025-26 per-game league averages. The value of possession is 115.6 ÷ (89.1 − 11.4 + 14.5 + 0.44 × 23.5) ≈ 1.127, the league's defensive-rebound share is 32.4 ÷ 43.8 ≈ 0.740, and the assisted share of baskets is 26.7 ÷ 42.0 ≈ 0.636, which puts the formula's "factor" at about 0.597. A made field goal then earns 2 − 0.597 × 0.636 ≈ 1.62, and a miss costs 1.127 × 0.740 ≈ 0.83.

On those numbers, a two-point attempt adds to PER whenever it goes in more than about 34% of the time (0.83 ÷ (1.62 + 0.83)), and a three-point attempt whenever it goes in more than about 24% of the time (0.83 ÷ (2.62 + 0.83)). League-average shooting in 2025-26 was far better than either: teams made about 55% of their twos and 36% of their threes. So under PER's arithmetic, extra shots that are clearly below average still raise a player's rating. That is the sense in which PER rewards volume, and it is a property of the formula rather than an opinion about it.

PER's defensive content is limited to what the box score records: steals, blocks and defensive rebounds. A defender whose value lies in positioning gets little credit.

## Win Shares: dividing up the wins

Win Shares, adapted from Bill James's baseball method, splits a team's success among its players. On Basketball-Reference's version, one win share equals one win, team totals land close to team wins, and a player can finish negative. The page reports an average error of 2.74 wins between summed Win Shares and actual team wins since 1962-63.

The offensive half rests on Dean Oliver's "points produced" and "offensive possessions". The key step is the threshold. Marginal offence equals points produced minus 0.92 times the league's points per possession times the player's offensive possessions. Only production above 92% of league-average efficiency earns credit, and production below it subtracts. That is then divided by "marginal points per win", 0.32 times league points per game, adjusted for team pace.

The defensive half uses Oliver's Defensive Rating, an estimate of points allowed per 100 defensive possessions, together with the player's share of the team's minutes. Basketball-Reference's author notes that modern Defensive Win Shares are "most dependent on minutes played, defensive rebounds, steals, and blocks."

### Why PER and Win Shares can disagree about the same shot

Put the two thresholds side by side using 2025-26 league figures. NBA teams scored 115.7 points per 100 possessions, so the Win Shares threshold sits at about 0.92 × 1.157 ≈ 1.06 points per possession. Treating one shot as one possession, which is a simplification:

| A two-point attempt that goes in 45% of the time | Effect |
| --- | --- |
| Points produced per attempt | 0.45 × 2 = 0.90 |
| PER: 0.45 × 1.62 - 0.55 × 0.83 | about +0.27 per attempt, so it raises PER |
| Win Shares: 0.90 - 1.06 | about -0.16 points of marginal offence, so it lowers Win Shares |

Same shot, opposite verdicts. A high-volume scorer with mediocre efficiency can look excellent by PER and ordinary by Win Shares, and neither number is malfunctioning. They are answering different questions.

## Box Plus/Minus: a regression estimate

Box Plus/Minus, in its 2.0 version by Daniel Myers, takes another route. Instead of choosing weights by hand, it estimates them: the weights come from regressions of box-score data onto Regularized Adjusted Plus/Minus, using four five-year regressions covering 1996-97 to 2015-16. The output is points per 100 possessions above a league-average player, defined as 0.0.

BPM "does not take into account playing time", in its author's words, so it is purely a rate. Value Over Replacement Player, VORP, adds playing time back, measuring contribution above a replacement-level player set at -2.0. The methodology page gives a scale: +10 is an all-time season, +8 an MVP season, +6 all-NBA, +4 all-star consideration, +2 a good starter, 0 a decent starter or solid sixth man, and -2 a bench player at replacement level.

Its author is unusually candid about the weak spot. The box score captures nearly everything important on offence, but "on defense the box score is quite limited", and the defensive numbers "should not be considered definitive".

## Which number for which question

| If you want to know... | Start with | Then check |
| --- | --- | --- |
| Who produced the most per minute, by the box score | PER | True shooting, because PER rewards volume |
| Who accounted for a team's wins this season | Win Shares | Minutes and team quality, because WS accumulates |
| Who was most effective per minute, regardless of playing time | WS/48 or BPM | Sample size, because rates swing on few minutes |
| Who added the most value overall | VORP | The defensive half, which is the least reliable part |
| Whether a defender is good | None of them alone | Context the box score does not record |

Two habits prevent a lot of mistakes. First, never trust a rate stat without the minutes behind it, because a bench player with a few good games can post an extreme PER or BPM. Second, when two of these numbers disagree, use the disagreement: it usually points straight at efficiency, playing time or defence.

## Ratings in a simulation

Game ratings are another all-in-one number with hidden weights. In [Pro Basketball GM Franchise](/apps/pro-basketball-draft-gm-mode/), the draft board shows a pool built from real players' careers with the game's own ratings, which are the game's estimates rather than any official statistic. Treat them the way you would treat PER: as a summary worth reading critically. The [basketball draft simulator guide](/blog/basketball-draft-gm-guide/) covers drafting against ratings, and [how sports simulation engines work](/blog/how-sports-simulation-engines-work/) explains how ratings turn into results.

If you prefer to build one player rather than read the numbers on many, [Basketball Career Sim](/apps/pro-basketball-my-career-sim/) follows a fictional career with its own stats, awards and legacy score. More basketball explainers are on the [basketball hub](/sports/basketball/), and our sports titles are listed in the [sports GM category](/blog/category/sports-gm/).
