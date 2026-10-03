---
{
  "title": "How Is WAR Calculated? Replacement Level, Runs and Wins, Step by Step",
  "metaTitle": "How Is WAR Calculated in Baseball? Step by Step",
  "description": "WAR sums batting, baserunning, fielding and positional runs, sets the baseline at replacement level and turns runs into wins. Each step, and where sites differ.",
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
    "war"
  ],
  "primaryKeyword": "how is war calculated in baseball",
  "secondaryKeywords": [
    "how is war calculated for position players",
    "how is war calculated for pitchers",
    "war baseball formula",
    "war baseball calculation"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what is replacement level in war",
    "how many runs equal a win in war",
    "what is the positional adjustment in war"
  ],
  "aiSearchQuestions": [
    "How is WAR calculated for a position player?",
    "How is WAR calculated for a pitcher?",
    "What is replacement level in WAR?",
    "Why do FanGraphs and Baseball-Reference show different WAR?"
  ],
  "relatedApps": [
    "baseball-draft-gm-team",
    "baseball-career-sim"
  ],
  "relatedArticles": [
    "baseball-stats-explained-for-beginners",
    "baseball-draft-gm-guide",
    "two-way-players-explained",
    "minor-league-baseball-levels-explained"
  ],
  "takeaways": [
    "Build WAR in runs first and convert to wins last: batting, baserunning and fielding runs above average, plus positional, league and replacement adjustments, divided by runs per win.",
    "Expect fielding and the positional adjustment to carry the most uncertainty, so treat WAR built mostly on defence with extra caution.",
    "Check whose WAR you are reading before comparing players, because FanGraphs bases pitcher WAR on FIP while Baseball-Reference bases it on runs allowed.",
    "Do not separate two players on WAR when they are within about one win of each other; both publishers say the figure is not that precise.",
    "Use WAR to shortlist and its components to decide, since the components show where a player's value actually comes from."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How is WAR calculated for position players?",
      "answer": "FanGraphs adds a player's batting runs, baserunning runs and fielding runs, each measured against an average player, then adds a positional adjustment, a small league adjustment and replacement-level runs. The total, runs above replacement, is divided by the season's runs-per-win value to give wins above replacement. MLB.com's glossary describes the same structure."
    },
    {
      "question": "How is WAR calculated for pitchers?",
      "answer": "It starts from a measure of run prevention compared with league average. FanGraphs uses FIP, with infield fly balls counted as strikeouts, adjusted for park and scaled to runs allowed per nine innings, then converts to wins with a runs-per-win figure specific to that pitcher and adds replacement level by innings pitched. Baseball-Reference starts from runs allowed instead and tries to correct for the team's defence."
    },
    {
      "question": "What is replacement level in WAR?",
      "answer": "Replacement level is the production a team could get from a freely available player, such as a minor-league free agent. FanGraphs and Baseball-Reference use the same level: 1,000 WAR across a full major-league season of 2,430 games, which corresponds to a .294 winning percentage for a team of replacement players. FanGraphs assigns 57 percent of those wins to position players and 43 percent to pitchers."
    },
    {
      "question": "How many runs equal a win in WAR?",
      "answer": "About ten, but it varies with the scoring environment. FanGraphs computes a league-wide runs-per-win figure each season that it says is usually between 9 and 10. Baseball-Reference says ten is the best single number across history, but it calculates a conversion specific to each player because exceptional players change the run environment of their own games."
    },
    {
      "question": "Why is WAR different on FanGraphs and Baseball-Reference?",
      "answer": "Both use the same framework and the same replacement level, but they estimate the components differently. The largest differences are the fielding metric, the basis for pitcher value (FIP at FanGraphs, runs allowed at Baseball-Reference) and how runs are converted to wins. Baseball-Reference itself warns against treating a full-season gap of less than one to two wins as definitive."
    }
  ],
  "sources": [
    {
      "title": "What is WAR? | Sabermetrics Library",
      "publisher": "FanGraphs",
      "url": "https://library.fangraphs.com/misc/war/",
      "accessed": "2026-10-02"
    },
    {
      "title": "WAR for Position Players | Sabermetrics Library",
      "publisher": "FanGraphs",
      "url": "https://library.fangraphs.com/war/war-position-players/",
      "accessed": "2026-10-02"
    },
    {
      "title": "WAR for Pitchers | Sabermetrics Library",
      "publisher": "FanGraphs",
      "url": "https://library.fangraphs.com/war/calculating-war-pitchers/",
      "accessed": "2026-10-02"
    },
    {
      "title": "Wins Above Replacement (WAR) | Glossary",
      "publisher": "MLB.com",
      "url": "https://www.mlb.com/glossary/advanced-stats/wins-above-replacement",
      "accessed": "2026-10-02"
    },
    {
      "title": "Baseball-Reference.com WAR Explained",
      "publisher": "Baseball-Reference.com",
      "url": "https://www.baseball-reference.com/about/war_explained.shtml",
      "accessed": "2026-10-02"
    },
    {
      "title": "Baseball-Reference.com WAR Explained, Converting Runs to Wins",
      "publisher": "Baseball-Reference.com",
      "url": "https://www.baseball-reference.com/about/war_explained_runs_to_wins.shtml",
      "accessed": "2026-10-02"
    }
  ]
}
---

**WAR is calculated in runs and converted to wins at the very end.** For a position player, FanGraphs' library gives the whole thing in one line: batting runs, plus baserunning runs, plus fielding runs (each measured against an average player), plus a positional adjustment, a league adjustment and replacement-level runs — all divided by the number of runs it takes to produce one win that season. Pitchers go through a separate pipeline that starts from FIP at FanGraphs and from runs allowed at Baseball-Reference.

What WAR means, and why a single number for a whole player is useful and dangerous, is covered in [baseball stats explained for beginners](/blog/baseball-stats-explained-for-beginners/). This article is the arithmetic: each step, what it assumes, and where the two best-known versions part company.

## The position-player formula

```
WAR = (Batting Runs + Base Running Runs + Fielding Runs
       + Positional Adjustment + League Adjustment + Replacement Runs)
      ÷ Runs Per Win
```

That is FanGraphs' formula; MLB.com's glossary describes the same structure in words. The first three terms are runs above an *average* player. The positional and league adjustments put every player on one scale. Replacement runs move the baseline down to *replacement* level, and the division turns runs into wins.

### Step 1: batting runs

FanGraphs starts from weighted on-base average (wOBA), which values each way of reaching base by its run value, and converts it to runs above average:

```
wRAA = ((wOBA − league wOBA) ÷ wOBA scale) × PA
```

It then adds two corrections, one for the hitter's home park and one so that his league's non-pitchers average out correctly. The result is batting runs: how many runs the player's hitting was worth compared with an average hitter given the same plate appearances.

### Step 2: baserunning runs

FanGraphs combines three pieces: Ultimate Base Running for advancing on the bases, weighted stolen-base runs, and weighted double-play runs for avoiding (or hitting into) double plays. Its stolen-base formula values a steal at 0.2 runs in every season and recalculates the cost of being caught each year, because the value of an out moves with the run environment.

### Step 3: fielding runs

Fielding runs are measured against the average fielder *at the same position*, so a +10 first baseman is ten runs better than an average first baseman, not ten runs better than an average shortstop. FanGraphs' library describes Ultimate Zone Rating as the input for non-catchers and a separate method for catchers; Baseball-Reference's WAR notes describe adopting Defensive Runs Saved for 2003 onward. Both publishers revise these inputs over time, and FanGraphs is candid that defence is one of the two least certain parts of the calculation.

### Step 4: the positional adjustment

Because fielding runs only compare a player with others at his position, a second adjustment puts the positions on one scale. It is harder to be an average shortstop than an average first baseman. FanGraphs sets its values per 162 defensive games, where a defensive game is nine innings at the position. Its scale runs from +12.5 runs for a catcher and +7.5 for a shortstop at the top to −12.5 for a first baseman and −17.5 for a designated hitter at the bottom; the worked example below uses the shortstop value.

The player's share is (innings at the position ÷ 9) ÷ 162 × the value above, summed across every position he played. FanGraphs notes the values come from empirical comparisons made years ago and could change; this, with fielding, is where most of the argument about WAR happens.

### Step 5: the league adjustment

Each league's batting, baserunning, fielding and positional runs should sum to zero but rarely do exactly. A small per-plate-appearance correction fixes that. FanGraphs says it adds between 0 and 5 runs to a player's season.

### Step 6: replacement runs

Everything so far is relative to average. Average is the wrong baseline for value, FanGraphs explains, because being average has value, and because a player with one average plate appearance and a player with 600 would both score zero.

So the baseline moves to replacement level: what a freely available player — a minor-league free agent or a fringe bench player — would produce. FanGraphs and Baseball-Reference share the same definition: 1,000 WAR across a full major-league season of 2,430 games, equivalent to a team of replacement players winning at a .294 rate. Baseball-Reference's notes record that it lowered its replacement level from .320 to .294 after discussions with FanGraphs, applying the change retroactively. FanGraphs then splits those 1,000 wins 57 percent to position players (570) and 43 percent to pitchers (430), and credits each player with replacement runs in proportion to his plate appearances.

### Step 7: runs to wins

FanGraphs' runs-per-win figure comes from the season's scoring level:

```
Runs Per Win = 9 × (MLB runs ÷ MLB innings) × 1.5 + 3
```

It says the result is usually between 9 and 10. Baseball-Reference takes a different route. Its runs-to-wins page says that if you had to pick one number across baseball history, "it would be 10," but it computes a conversion specific to each player. Its reasoning: a dominant hitter produces some runs his team did not need, and a dominant pitcher lowers the scoring environment of his own games, which makes each run he saves worth more.

Both conversions come from the same family of win estimators: FanGraphs says its formula matches Pythagpat to within about .02 runs per win, and Baseball-Reference's notes describe a PythagenPat-based conversion. The [Pythagorean expectation calculator](/tools/multi-sport/pythagorean-expectation-calculator/) shows the underlying idea at team level — enter runs scored and allowed, and it returns the winning percentage they imply.

## A worked example, and how one input moves it

A hypothetical everyday shortstop, with every input invented for illustration:

| Component | Runs | Note |
| --- | --- | --- |
| Batting runs | +12.0 | Above-average bat |
| Baserunning runs | +2.0 | A little value on the bases |
| Fielding runs | +4.0 | Slightly above an average shortstop |
| Positional adjustment | +6.9 | 1,350 innings at shortstop: (1,350 ÷ 9) ÷ 162 × 7.5 |
| League adjustment | +1.0 | Small, as FanGraphs describes |
| Replacement runs | +20.0 | Assumed for a full-time player; the real figure depends on league totals |
| **Runs above replacement** | **+45.9** | |

At an assumed 9.8 runs per win, 45.9 ÷ 9.8 is about **4.7 WAR**.

Now suppose a different fielding metric rates the same season at −3 instead of +4. Runs above replacement fall to 38.9, and WAR to about **4.0**. Nothing about his hitting or running changed; one judgement about his glove moved him most of a win. That is the practical meaning of FanGraphs' warning that players who earn much of their value on defence carry more uncertainty, and of Baseball-Reference's advice not to treat a full-season gap of less than one to two wins as definitive.

## How WAR is calculated for pitchers

FanGraphs' pitcher formula has more steps, because a pitcher changes the run environment of the games he pitches:

1. **Start from FIP, with a twist.** For WAR, FanGraphs counts infield fly balls as strikeouts inside FIP, a version it calls ifFIP.
2. **Put it on a runs-allowed scale.** It adds the difference between league runs allowed per nine innings (RA9) and league ERA, so the figure sits on an RA9 scale rather than an ERA scale.
3. **Adjust for the park** using a FIP-specific park factor, then compare with the league average to get runs above average per nine innings.
4. **Convert with a pitcher-specific runs per win.** The conversion weights the pitcher's own run environment by his innings per game.
5. **Add replacement level** — 0.03 wins per nine innings for a reliever and 0.12 for a starter — and scale by innings pitched.
6. **Credit relievers for leverage.** FanGraphs multiplies a reliever's figure by (1 + his leverage index when entering games) ÷ 2, regressing the leverage effect halfway to account for "chaining": when a closer is hurt, everyone moves up a slot and the replacement arm fills the lowest one.
7. **Apply a final correction** so that all pitchers together total the 430 WAR the framework allocates to them.

Baseball-Reference starts from runs allowed rather than FIP and, as FanGraphs' WAR overview puts it, attempts to correct for the team defence behind the pitcher. MLB.com's glossary summarises the split simply: FanGraphs' WAR uses FIP for pitchers, Baseball-Reference's uses RA9. FanGraphs also publishes an RA9-based version for readers who prefer runs allowed.

## FanGraphs and Baseball-Reference, step by step

| Step | FanGraphs (fWAR) | Baseball-Reference (bWAR or rWAR) |
| --- | --- | --- |
| Replacement level | 1,000 WAR per 2,430 games (.294) | The same, since its change from .320 |
| Batting | wOBA-based batting runs | A wRAA-based measure, per its methodology notes |
| Fielding | UZR for non-catchers, per its library | Defensive Runs Saved from 2003, per its notes |
| Pitcher value | FIP, with infield flies as strikeouts | Runs allowed, with a team-defence correction |
| Runs to wins | Season-wide figure; pitcher-specific for pitchers | Player-specific conversion |

Both publishers describe their methods as evolving, so treat the table as a map of where differences come from rather than a statement of either site's current inputs; each site's methodology pages are the authority. Baseball-Reference's overview puts it plainly: there is no one way to determine WAR.

## Reading WAR once you know how it is built

**Respect the error bars.** FanGraphs says a 6.4 and a 6.1 cannot be told apart, while a 6.4 and a 4.1 can. Its rule of thumb puts an average full-time position player at about 2 WAR and 5 to 6 at superstar level.

**Ask where the value comes from.** Two 4-WAR players can be built completely differently: one from batting runs, one from fielding and a premium position. The first is measured with more confidence than the second.

**Check the source before comparing.** A pitcher whose runs allowed and FIP disagree will carry noticeably different WAR on the two sites, and neither is wrong.

## WAR in our games

[162-0 Baseball Draft & GM Team](/apps/baseball-draft-gm-team/) includes WAR among the numbers you compare when drafting, alongside ERA, WHIP, home runs, on-base ability, fielding and speed. Knowing that WAR is a sum tells you what to do with it: use it to shortlist, then look at the component numbers for the hole you are filling — the method [the baseball draft simulator guide](/blog/baseball-draft-gm-guide/) recommends. The game's ratings are its own estimates rather than official statistics, and its season projection is a model's output, not a forecast.

In [Baseball Career Sim 2026](/apps/baseball-career-sim/) you can build a two-way player who both hits and pitches, the kind of career where a single all-in value measure is most tempting and hardest to compute; [two-way players explained](/blog/two-way-players-explained/) covers the trade-offs. Our other baseball guides are gathered on the [baseball hub](/sports/baseball/).

Baseball Career Sim 2026 is set in a fictional league with fictional teams and players. 162-0 Baseball Draft & GM Team builds its pool from real players' careers, with ratings that are the game's own estimates, and neither game is affiliated with or endorsed by any league, team, players' association or player. MLB.com, FanGraphs and Baseball-Reference are named only to identify the methods cited. More titles are in [sports career and GM games](/apps/category/sports-gm/).
