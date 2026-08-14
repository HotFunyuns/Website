---
{
  "title": "Baseball Stats Explained for Beginners",
  "metaTitle": "Baseball Stats Explained for Beginners",
  "description": "ERA, WHIP, OBP, slugging, fielding percentage and WAR, each with the formula and a worked example, plus what every one of them fails to tell you.",
  "status": "published",
  "publishedAt": "2026-08-13",
  "updatedAt": "2026-08-13",
  "author": "Reign Creative Team",
  "category": "sports-gm",
  "tags": [
    "baseball",
    "statistics",
    "sports sim",
    "draft strategy",
    "beginners"
  ],
  "primaryKeyword": "baseball stats explained",
  "secondaryKeywords": [
    "what is era in baseball",
    "what is whip in baseball",
    "on base percentage formula",
    "slugging percentage explained",
    "what does war mean in baseball",
    "fielding percentage formula"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you calculate era in baseball",
    "what is a good whip for a pitcher",
    "difference between batting average and on base percentage",
    "why is war different on different websites"
  ],
  "aiSearchQuestions": [
    "How is ERA calculated in baseball?",
    "What is the difference between OBP and batting average?",
    "What does WAR measure in baseball?",
    "Why is fielding percentage a limited statistic?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": [
    "baseball-draft-gm-team"
  ],
  "relatedArticles": [
    "baseball-draft-gm-guide",
    "basketball-positions-explained",
    "how-to-build-a-balanced-basketball-roster"
  ],
  "takeaways": [
    "Rate statistics like ERA, WHIP and OBP describe performance per opportunity; counting statistics like home runs describe accumulated totals, and mixing the two up is the most common beginner error.",
    "On-base percentage counts walks and hit-by-pitches, so it credits a skill batting average ignores entirely — reaching base without hitting the ball.",
    "ERA and WHIP measure related but different things: ERA is about runs allowed, WHIP is about traffic allowed, and a large gap between them usually means something outside the pitcher's control is involved.",
    "WAR is a framework rather than a single formula, and different publishers compute it differently, so a WAR figure only means something alongside the method that produced it.",
    "Fielding percentage only counts plays a fielder reached, which is why it says almost nothing about range."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How is ERA calculated?",
      "answer": "Earned run average is earned runs divided by innings pitched, multiplied by nine, which expresses the result as runs per nine-inning game. A pitcher who allows 60 earned runs across 180 innings has an ERA of 60 ÷ 180 × 9 = 3.00. The word 'earned' matters: runs that scored because of a fielding error are excluded, which is an attempt to separate the pitcher's contribution from the defence behind them."
    },
    {
      "question": "What is the difference between batting average and on-base percentage?",
      "answer": "Batting average is hits divided by at-bats, so it only credits reaching base by hitting. On-base percentage adds walks and hit-by-pitches to both the top and the bottom of the fraction, so it credits every way a batter avoids making an out. Two players with identical averages can have very different on-base percentages, and the difference is entirely plate discipline."
    },
    {
      "question": "What does WAR actually measure?",
      "answer": "Wins Above Replacement estimates how many more wins a player is worth than a freely available replacement-level player at the same position. It is a framework rather than one equation: it bundles hitting, baserunning, fielding and positional adjustment into a single number, and different publishers make different choices at each step. That is why the same player can carry different WAR figures on different sites, and why a WAR number is only meaningful together with its source."
    },
    {
      "question": "Why is fielding percentage considered limited?",
      "answer": "Because it only counts plays the fielder actually reached. A fielder with poor range never touches the difficult ball, so it never becomes an error, and their fielding percentage stays high. A fielder with great range gets to more balls and therefore has more opportunities to make a mistake. The statistic measures reliability on plays made, not how many plays were possible."
    },
    {
      "question": "How does 162-0 Baseball Draft & GM Team use these statistics?",
      "answer": "You compare pitchers and hitters on ERA, WHIP, home runs, on-base ability, fielding, speed and WAR before committing each pick, filling nine positions and then choosing a coach. The season simulator weighs roster quality, position fit, hitting, pitching, speed, defence and coaching to produce a projected 162-game record."
    },
    {
      "question": "Are the players in the game real?",
      "answer": "No. 162-0 Baseball Draft & GM Team is a fictional simulation built on generated players and it is not affiliated with, endorsed by or connected to any real league, team or athlete. It uses no live results. Every statistic you see in the game belongs to a player who does not exist."
    }
  ],
  "sources": [
    {
      "title": "FanGraphs Sabermetrics Library",
      "publisher": "FanGraphs",
      "url": "https://library.fangraphs.com/",
      "accessed": "2026-08-09"
    },
    {
      "title": "Society for American Baseball Research",
      "publisher": "SABR",
      "url": "https://sabr.org/",
      "accessed": "2026-08-09"
    }
  ]
}
---

Baseball produces more numbers than any other team sport, and the reason is structural rather than cultural: the game is a long sequence of discrete one-on-one events with a clear beginning and end. That makes it unusually easy to count things, and unusually easy to count the wrong things.

Every statistic below comes with its formula, a worked example you can check with a calculator, and — more importantly — the specific thing it cannot tell you.

## First: rate versus counting

Before any individual metric, this distinction does most of the work.

A **counting statistic** accumulates. Home runs, hits, strikeouts, stolen bases. More playing time produces a bigger number, so counting statistics measure *total contribution* and quietly reward availability.

A **rate statistic** divides by opportunity. Batting average, ERA, WHIP, on-base percentage. These measure *quality per chance* and are unaffected by how long someone played — but they are unstable when the sample is small.

Both matter and they answer different questions. "Who contributed most this season" is a counting question. "Who is better" is a rate question. Comparing a full season of one player against a partial season of another on counting statistics alone will mislead you every single time.

## Hitting

### Batting average (BA)

```
BA = hits ÷ at-bats
```

A hitter with 150 hits in 500 at-bats: 150 ÷ 500 = **.300**. Baseball writes rates to three decimals and reads them aloud as if they were whole numbers, so this is "three hundred".

**What it misses:** everything that is not a hit. Walks do not count. Hit-by-pitches do not count. A patient hitter who reaches base constantly without hitting the ball looks identical to one who does not reach base at all.

### On-base percentage (OBP)

```
OBP = (hits + walks + hit-by-pitch) ÷ (at-bats + walks + hit-by-pitch + sacrifice flies)
```

The same hitter, now with 60 walks, 5 hit-by-pitches and 5 sacrifice flies:

- Numerator: 150 + 60 + 5 = 215
- Denominator: 500 + 60 + 5 + 5 = 570
- OBP = 215 ÷ 570 = **.377**

The core insight of on-base percentage is that the scarce resource in an inning is outs. A team gets 27 of them and nothing else limits how long an inning lasts. Anything that avoids making an out extends the inning, and it does not matter how you did it.

**What it misses:** how far you got. A walk and a home run count the same here.

### Slugging percentage (SLG)

```
SLG = total bases ÷ at-bats
```

Total bases weights each hit by its value: single 1, double 2, triple 3, home run 4. Say our hitter's 150 hits break down as 90 singles, 30 doubles, 5 triples and 25 home runs:

- Total bases: (90 × 1) + (30 × 2) + (5 × 3) + (25 × 4) = 90 + 60 + 15 + 100 = 265
- SLG = 265 ÷ 500 = **.530**

**What it misses:** walks again, and it treats a home run as exactly four times a single, which is a convention rather than a measurement.

### OPS

```
OPS = OBP + SLG
```

For our hitter: .377 + .530 = **.907**.

Adding two fractions with different denominators is mathematically improper and everybody knows it. It survives because it is quick and because the two components capture the two things that matter most — reaching base and moving runners along. Treat it as a rough single-number summary, not a precise one.

### Home runs

A counting statistic, and one of the few that needs no explanation. Worth noting only that home run totals are heavily influenced by context — the dimensions of a ballpark, the era, the conditions — so comparing raw totals across different environments compares environments as much as hitters.

## Pitching

### ERA (earned run average)

```
ERA = (earned runs ÷ innings pitched) × 9
```

60 earned runs in 180 innings: 60 ÷ 180 = 0.3333, × 9 = **3.00**. The multiplication by nine expresses everything on a per-game scale.

A note that confuses every beginner: innings pitched are recorded in thirds, because outs come in threes. An entry of 180.1 means 180 and one third of an inning, not 180.1 innings. Using it as a decimal introduces a small error.

**What it misses:** the difference between the pitcher and the defence behind them. "Earned" excludes runs caused by errors, but it cannot exclude runs caused by fielders who simply have poor range and never commit an error at all.

### WHIP (walks and hits per inning pitched)

```
WHIP = (walks + hits allowed) ÷ innings pitched
```

45 walks and 150 hits in 180 innings: 195 ÷ 180 = **1.083**.

WHIP measures traffic. It answers "how many runners does this pitcher put on per inning", which is upstream of runs and much less dependent on sequencing than ERA is.

**Reading them together is the point.** A pitcher with a low WHIP and a high ERA is allowing few runners but conceding runs anyway — which usually means home runs, unlucky sequencing, or a defence that is not converting. A high WHIP with a low ERA is the reverse: lots of traffic, few runs, which tends not to persist. The gap between the two is more informative than either number alone.

## Fielding

### Fielding percentage

```
Fielding % = (putouts + assists) ÷ (putouts + assists + errors)
```

A fielder with 200 putouts, 300 assists and 10 errors: 500 ÷ 510 = **.980**.

**What it misses:** range, which is most of fielding. The statistic only counts balls the fielder reached. A fielder who never gets to the difficult ball never gets charged with an error on it. This is the clearest example in the sport of a metric that measures what is easy to count instead of what matters, and it is why modern defensive analysis — covered extensively in the FanGraphs Sabermetrics Library — moved toward measuring how many plays a fielder makes relative to opportunity.

## Speed

Speed usually reaches a stat line through baserunning. The rate version:

```
Stolen base success rate = stolen bases ÷ (stolen bases + times caught stealing)
```

30 steals and 10 times caught: 30 ÷ 40 = **75 percent**.

The reason to look at the rate rather than the raw total is that a caught stealing costs an out, and outs are the resource the whole offence is budgeted against. A high volume of steals at a poor success rate can be a net negative even though the counting statistic looks impressive.

Speed also shows up invisibly — taking an extra base, avoiding a double play, covering ground defensively — which is exactly the kind of contribution single-column statistics struggle to capture.

## WAR

Wins Above Replacement is the attempt to put everything on one axis: **how many more wins is this player worth than a freely available replacement-level player at the same position?**

The construction, in outline: measure offensive contribution, add baserunning, add fielding, apply a positional adjustment (a shortstop and a first baseman doing equally well are not equally valuable, because the defensive demands differ), compare all of it against a defined replacement baseline, then convert the resulting run total into wins.

Every one of those steps involves a decision. Which offensive metric? Which fielding metric? Where exactly is replacement level? How many runs equal a win?

Different publishers answer differently, which is why the same player can carry different WAR figures on different sites. **That is not an error, and it is the single most important thing to know about the statistic.** WAR is a framework, not a formula, and a WAR number without its method attached is an opinion in a lab coat.

Used properly it is genuinely powerful: it lets you compare a shortstop to a starting pitcher, which nothing else does. Used improperly — quoted to two decimal places as though it were measured — it invites precision it does not have. Both the FanGraphs library and the Society for American Baseball Research publish detailed treatments of how the components are built, and reading one of them once is worth more than memorising any leaderboard.

## Reading a stat line without being fooled

A short checklist that covers most beginner mistakes:

1. **Check the sample.** Rate statistics over small samples are mostly noise. A dozen innings or thirty at-bats will produce a number carried to three decimal places that means almost nothing.
2. **Ask what the number excludes.** Every statistic in this article has a blind spot, and knowing it is more useful than knowing the value.
3. **Pair a rate with a counting stat.** Quality per chance plus total chances gives you a picture; either alone does not.
4. **Distrust single numbers.** WAR and OPS are summaries. Summaries hide the thing you needed to see.
5. **Compare like with like.** Positions, roles and contexts differ. A closer and a starter are not comparable on ERA in any meaningful way.

## Putting it to work in a draft

[162-0 Baseball Draft & GM Team](/apps/baseball-draft-gm-team/) is built directly on these numbers. You compare pitchers and hitters on ERA, WHIP, home runs, on-base ability, fielding, speed and WAR, fill all nine positions, and finish by choosing the coach.

Its season simulator then weighs roster quality, position fit, hitting, pitching, speed, defence and coaching to return a projected 162-game record — which is a useful list to read as a drafting instruction. Speed and defence being separate inputs means a club drafted purely on home runs and ERA is leaving parts of the model untouched. Position fit being separate from roster quality means the arrangement matters, not just the sum.

Beyond the draft, Franchise GM Mode covers the batting order, rotation, bullpen and payroll, and there are Unlimited Draft, a ten-pick Limited Refresh Draft with no rerolls, payroll drafting, VS Computer, Battle Mode, a Daily Challenge and Baseball IQ. Everything is a projection: no live results, no online multiplayer, and the perfect 162-0 record is designed to be rare.

## Further reading

The [baseball draft simulator guide](/blog/baseball-draft-gm-guide/) runs through the game end to end. For the same argument about positional value in a different sport, see [basketball positions explained](/blog/basketball-positions-explained/), and for what happens once you have to assemble those pieces into a working lineup, [how to build a balanced basketball roster](/blog/how-to-build-a-balanced-basketball-roster/).

More sports management titles are in the [sports GM category](/apps/category/sports-gm/).
