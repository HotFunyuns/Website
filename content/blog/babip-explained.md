---
{
  "title": "BABIP Explained: Batting Average on Balls in Play, and When It Means Luck",
  "metaTitle": "BABIP Explained: What It Measures and When It Means Luck",
  "description": "BABIP is batting average on balls in play. The formula, why strikeouts and home runs drop out, and how much of it is luck for hitters versus pitchers.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "baseball",
    "statistics",
    "sabermetrics",
    "hitting",
    "pitching"
  ],
  "primaryKeyword": "babip explained",
  "secondaryKeywords": [
    "what is babip",
    "babip formula",
    "is babip luck",
    "what is a good babip in baseball",
    "what is league average babip"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is babip around .300",
    "how many balls in play for babip to stabilize",
    "do pitchers control babip",
    "babip for hitters vs pitchers"
  ],
  "aiSearchQuestions": [
    "What is BABIP in baseball?",
    "How do you calculate BABIP?",
    "Is a high BABIP just luck?",
    "What is the league-average BABIP?"
  ],
  "relatedApps": [
    "baseball-draft-gm-team",
    "baseball-career-sim"
  ],
  "relatedArticles": [
    "baseball-stats-explained-for-beginners",
    "ops-and-slugging-explained",
    "understanding-sports-sim-probability",
    "baseball-draft-gm-guide",
    "how-to-keep-score-in-baseball"
  ],
  "takeaways": [
    "Compute BABIP as hits minus home runs, divided by at-bats minus strikeouts and home runs plus sacrifice flies, so only balls the defence could field are counted.",
    "Judge a hitter's BABIP against his own long-run level, not against the league's .300, because hitters control a real share of it.",
    "Expect a pitcher's BABIP to drift back toward league average unless he has several seasons of evidence that he suppresses hits on balls in play.",
    "Check the sample before you call anything luck: FanGraphs puts the point where BABIP starts to mean something at roughly 800 balls in play for hitters and 2,000 for pitchers.",
    "When a batting average jumps or collapses, look at BABIP first, because that is where most short-term swings in average come from."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is BABIP in baseball?",
      "answer": "BABIP stands for batting average on balls in play. It measures how often a ball hit into the field of play becomes a hit, so it leaves out home runs, strikeouts and walks. It can be calculated for a hitter or for the hitters a pitcher has faced."
    },
    {
      "question": "How do you calculate BABIP?",
      "answer": "MLB.com and FanGraphs give the same formula: hits minus home runs, divided by at-bats minus strikeouts minus home runs plus sacrifice flies. A hitter with 125 non-home-run hits and 380 balls in play by that definition has a .329 BABIP."
    },
    {
      "question": "What is the league-average BABIP?",
      "answer": "MLB.com says the league average is typically around .300, and FanGraphs says it is almost always right around that figure. It does move a little from season to season, so for a precise comparison use the league figure for the season you are looking at."
    },
    {
      "question": "Is BABIP luck?",
      "answer": "Partly. FanGraphs names three ingredients: defence, luck and talent. Hitters control a meaningful share of their BABIP through how hard and how they hit the ball, while pitchers have much less control, so an extreme pitcher BABIP is more likely to be temporary than an extreme hitter BABIP."
    },
    {
      "question": "What is a good BABIP?",
      "answer": "For a hitter, higher is better, and FanGraphs says the very best hitters can sustain figures around .350 while weaker hitters sit nearer .260. For a pitcher, lower is better, but FanGraphs notes few pitchers stay outside roughly .290 to .310 over the long run. A single season far outside those ranges usually includes some luck."
    }
  ],
  "sources": [
    {
      "title": "Batting Average on Balls in Play (BABIP) | Glossary",
      "publisher": "MLB.com",
      "url": "https://www.mlb.com/glossary/advanced-stats/babip",
      "accessed": "2026-10-02"
    },
    {
      "title": "BABIP | Sabermetrics Library",
      "publisher": "FanGraphs",
      "url": "https://library.fangraphs.com/pitching/babip/",
      "accessed": "2026-10-02"
    },
    {
      "title": "Official Baseball Rules, 2026 Edition",
      "publisher": "Office of the Commissioner of Baseball",
      "url": "https://mktg.mlbstatic.com/mlb/official-information/2026-official-baseball-rules.pdf",
      "accessed": "2026-10-02"
    }
  ]
}
---

**BABIP — batting average on balls in play — is the share of balls hit into the field of play that become hits.** MLB.com gives the formula as (H − HR) ÷ (AB − K − HR + SF), and says the league average is typically around .300. Home runs, strikeouts and walks are left out because no fielder ever gets a chance to make a play on them.

Whether a BABIP is luck depends on who owns it. FanGraphs' library names three ingredients — defence, luck and talent — and the mix is different for hitters and pitchers. A hitter's unusual BABIP can be skill. A pitcher's usually is not, at least not for long.

## The formula, piece by piece

```
BABIP = (H − HR) ÷ (AB − K − HR + SF)
```

Each adjustment removes something the defence could not touch, or adds back something it could.

| Term | What it does | Why |
| --- | --- | --- |
| H − HR | Counts hits, minus home runs | A home run never lands in the field of play |
| AB − K | Removes strikeouts from at-bats | A strikeout never puts the ball in play |
| − HR | Removes home runs from at-bats | Same reason as the numerator |
| + SF | Adds sacrifice flies back | A sacrifice fly is a ball in play, but the scoring rules do not count it as an at-bat |

That last row comes from the scoring rules: the 2026 Official Baseball Rules, Rule 9.02(a)(1)(A), say no time at bat is charged when a player "hits a sacrifice bunt or sacrifice fly." Walks and hit batters are not at-bats either (9.02(a)(1)(B) and (C)), so they never enter the denominator in the first place. FanGraphs' definition of a ball in play lists the plate-appearance endings that are excluded: strikeouts, walks, hit batters, catcher's interference, sacrifice bunts and home runs.

### A worked example

A hypothetical hitter finishes a season with 520 at-bats, 150 hits, 25 home runs, 120 strikeouts and 5 sacrifice flies.

- Batting average: 150 ÷ 520 = **.288**
- Balls in play: 520 − 120 − 25 + 5 = 380
- Hits on those balls: 150 − 25 = 125
- BABIP: 125 ÷ 380 = **.329**

His BABIP is higher than his batting average mainly because his 120 strikeouts count against the average but are removed from BABIP. His home runs pull the other way: they count toward the average and not toward BABIP. The [batting stats calculator](/tools/baseball/batting-average-calculator/) runs the same calculation from a stat line, next to the hitter's average, on-base and slugging figures.

### One implementation note

You will occasionally see two websites disagree about a pitcher's BABIP. FanGraphs explains why on its own page: its database does not remove sacrifice bunts from the pitcher denominator, so its pitcher figures can differ slightly from Baseball-Reference's. FanGraphs calls this "a data problem on our end and not a disagreement about the proper methodology." The formula is the same everywhere; the inputs occasionally are not.

## Where a BABIP comes from

FanGraphs breaks every BABIP into three ingredients.

**Defence.** A hard ground ball becomes an out or a hit depending on whether the fielder can reach it. Hitters choose their opponents' defences no more than pitchers choose their own.

**Luck.** A barely struck dribbler can find a hole; a ball hit as hard as anything all week can go straight to a fielder. Over a large sample this evens out. Over a month it does not.

**Talent.** Harder contact falls for hits more often, so better hitters tend to post higher BABIPs. Batted-ball type matters too: FanGraphs notes that line drives become hits more often than ground balls, and ground balls more often than fly balls. A hitter who lives on line drives can sustain a figure that would be a fluke for a fly-ball hitter.

MLB.com's glossary makes the same point from the other side: some pitchers are adept at generating weak contact, and some hitters excel at producing hard-hit balls.

## Is BABIP luck? It depends on the side of the ball

| | Hitters | Pitchers |
| --- | --- | --- |
| How much control they have | A meaningful share, through contact quality and batted-ball profile | Very little once the ball leaves the bat |
| What to compare a season against | The player's own career level | League average |
| Balls in play before it "stabilises" (FanGraphs) | About 800, roughly two seasons | About 2,000, roughly three full seasons for a starter |
| Long-run range FanGraphs describes | About .260 for weak hitters to about .350 for the best | Few pitchers outside about .290 to .310 |

### Hitters

FanGraphs' advice is to expect a hitter to move toward his own career BABIP, not toward .300. A hitter who has run .335 for several seasons and opens a year at .270 is more likely to hit around .335 the rest of the way than to stay at .270 — the low figure is most likely a slump in luck, not a new level. FanGraphs also puts a ceiling on the plausible: it says no player with more than 4,000 career plate appearances has had a career BABIP above about .380, and that .350 is a more realistic mark for the very best.

The reverse warning applies as well. FanGraphs' example is a hitter running a .420 BABIP: he is very unlikely to be making dramatically better contact than everyone else, and much more likely to be making very good contact with some good fortune mixed in. Expect much of the excess to fade.

### Pitchers

Pitchers control strikeouts, walks and home runs, and through them how many balls are put in play. What happens to the ball after contact is mostly about defence and luck. That is why FanGraphs expects pitchers with extreme BABIP values to regress toward league average, and why statistics built for pitchers — fielding independent pitching is the best-known — assume an average result on balls in play rather than trusting the pitcher's own figure.

The exceptions are real but rare. FanGraphs' example is a fly-ball pitcher with a high strikeout rate and a long history of low BABIPs allowed. The test is evidence over several seasons, not one good summer.

## What is a good BABIP?

"Good" depends on whose side you are on: a high BABIP helps a hitter and hurts a pitcher. The useful benchmarks are:

- **League average:** around .300 (MLB.com and FanGraphs), varying slightly by season.
- **The best hitters:** about .350 sustained (FanGraphs).
- **Weaker hitters:** about .260 (FanGraphs).
- **Pitchers over the long run:** mostly between about .290 and .310 (FanGraphs).

So the question to ask of any BABIP is not "is this good?" but "is this normal for this player, over this many balls in play?"

## A four-step check before you call it luck

1. **Count the balls in play.** A month of at-bats is a fraction of the roughly 800 FanGraphs suggests for a hitter. Below that, almost any BABIP is possible.
2. **Pick the right baseline.** Hitter: his own multi-season level. Pitcher: the league's.
3. **Look for a reason.** A genuine change in how a hitter hits — more line drives, fewer fly balls — can justify a new level. A pitcher rarely has an equivalent explanation.
4. **Decide what you expect next.** Hitters drift toward their own level; pitchers drift toward the league's.

Two mistakes this prevents. The first is calling every .350 hitter lucky, when some of them simply hit the ball hard all the time. The second is crediting a pitcher's .250 to skill after one season, when the defence behind him and the bounces deserve most of it.

## Why it matters for batting average and OPS

FanGraphs notes that BABIP can move a hitter's batting average dramatically even when his true performance has not changed: a few extra balls finding grass over a month is enough. Because hits also feed on-base percentage and slugging, the same swing passes straight into OPS. [OPS and slugging explained](/blog/ops-and-slugging-explained/) covers how those two numbers combine, and [baseball stats explained for beginners](/blog/baseball-stats-explained-for-beginners/) covers batting average and its blind spots.

The general lesson — that rates over short samples spread far wider than intuition expects — is worked through with the arithmetic in [understanding probability in sports simulations](/blog/understanding-sports-sim-probability/).

## Reading your own numbers in our games

In our games, the useful part of BABIP is the habit of mind rather than the figure itself.

In [Baseball Career Sim 2026](/apps/baseball-career-sim/), your season record includes batting average, on-base percentage and slugging. When one of those jumps or sags over a short stretch, the BABIP question is the right one to ask: is this coming from the kind of contact you would expect to repeat?

In [162-0 Baseball Draft & GM Team](/apps/baseball-draft-gm-team/), players are compared on ERA, WHIP, home runs, on-base ability, fielding, speed and WAR. The same discipline applies on a draft card: separate what a player controls from what the defence and the bounces gave him. [The 162-0 draft guide](/blog/baseball-draft-gm-guide/) covers how to work through those cards, and our [baseball hub](/sports/baseball/) collects the rest of our guides to the sport.

Baseball Career Sim 2026 uses a fictional league, fictional teams and fictional players. 162-0 Baseball Draft & GM Team builds its player pool from real players' careers, with ratings that are the game's own estimates, and neither game is affiliated with or endorsed by any league, team, players' association or player. MLB.com and FanGraphs are named only to identify the definitions cited. More titles are listed under [sports career and GM games](/apps/category/sports-gm/).
