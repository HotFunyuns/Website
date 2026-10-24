---
{
  "title": "Regression to the Mean in Sports: Why Great Seasons Are Followed by Good Ones",
  "metaTitle": "Regression to the Mean in Sports, With Worked Examples",
  "description": "Why an outstanding season is usually followed by a merely good one, how much of a record is luck in different sports, and how to read a career year.",
  "status": "published",
  "editorialReview": "organization",
  "reviewAttestation": "library-2026-10-24",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "regression to the mean",
    "luck vs skill",
    "probability",
    "statistics",
    "gm mode"
  ],
  "primaryKeyword": "regression to the mean sports",
  "secondaryKeywords": [
    "what is regression to the mean",
    "why does regression to the mean occur",
    "luck vs skill in sports",
    "what is the most luck based sport",
    "sophomore slump"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how much of a season is luck",
    "why do great seasons not repeat",
    "how to read a career year",
    "does season length affect luck in sports"
  ],
  "aiSearchQuestions": [
    "What is regression to the mean in sports?",
    "Why do players have a sophomore slump?",
    "Which sport involves the most luck?",
    "How should I judge a team after an outstanding season?"
  ],
  "relatedApps": [
    "soccer-draft-gm-xi",
    "tennis-career-sim"
  ],
  "relatedArticles": [
    "understanding-sports-sim-probability",
    "aging-curves-in-career-sims",
    "rebuild-vs-retool",
    "baseball-stats-explained-for-beginners",
    "is-momentum-in-sports-real"
  ],
  "takeaways": [
    "Expect an outstanding season to be followed by a good one rather than a repeat, and plan around the regressed estimate instead of the peak.",
    "Regress harder when the sample is short: in the data analysed here, a 14-game season carried nearly three times the luck share of an 80-game one.",
    "Before crediting or blaming a change made after an extreme run, compare the next run with what regression alone would have predicted.",
    "Judge a drafted squad over several simulated runs, because the best run of any squad is usually followed by a worse one."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is regression to the mean in sports?",
      "answer": "It is the tendency for an extreme result to be followed by one closer to average, because part of what made the first result extreme was luck that does not repeat. It applies to players and teams in every sport. It does not mean anyone got worse, and it works in both directions: unusually poor seasons tend to be followed by better ones."
    },
    {
      "question": "Why does regression to the mean happen?",
      "answer": "Every result mixes a stable part, such as ability, with a variable part, such as bounces, injuries to opponents and close calls. The most extreme results are disproportionately the ones where the variable part ran far in one direction, and next time it is drawn afresh. The pull is strongest when results are noisy and when the cases being followed were chosen because of their first result."
    },
    {
      "question": "Is the sophomore slump real?",
      "answer": "Standout rookies are, on average, likely to do worse in their second season, so the pattern is real. Regression to the mean explains much of it: rookies are singled out because their first season was exceptional, and part of an exceptional season is luck. That does not rule out other causes, such as opponents adjusting, but no extra cause is needed to produce the drop."
    },
    {
      "question": "Which sport has the most luck?",
      "answer": "By one measure, how often the team with the worse record wins, a study of more than a century of results found the most upsets in English top-flight soccer and in baseball, at about 45% and 44% of games, and the fewest in basketball and American football, at about 36.5%. Season length matters as much as the sport. A short season leaves far more luck in the final standings than a long one."
    },
    {
      "question": "How should a GM read a career year?",
      "answer": "Treat it as part ability and part luck, and expect the next season to land between the career year and the longer-run level. The noisier the measure and the shorter the sample, the further back toward average the best estimate sits. Make contract and roster decisions on that estimate, not on the peak."
    }
  ],
  "sources": [
    {
      "title": "Regression to the mean: what it is and how to deal with it (Barnett, van der Pols and Dobson, 2005)",
      "publisher": "International Journal of Epidemiology (Oxford University Press)",
      "url": "https://academic.oup.com/ije/article/34/1/215/638499",
      "accessed": "2026-10-02"
    },
    {
      "title": "What is the most competitive sport? (Ben-Naim, Vazquez and Redner)",
      "publisher": "arXiv; published in the Journal of the Korean Physical Society, 2007",
      "url": "https://arxiv.org/abs/physics/0512143",
      "accessed": "2026-10-02"
    },
    {
      "title": "Regression toward the mean",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Regression_toward_the_mean",
      "accessed": "2026-10-02"
    },
    {
      "title": "Pythagorean Winning Percentage",
      "publisher": "MLB.com Glossary",
      "url": "https://www.mlb.com/glossary/advanced-stats/pythagorean-winning-percentage",
      "accessed": "2026-10-02"
    }
  ]
}
---

**Regression to the mean is the tendency for an extreme result to be followed by one closer to average, because part of what made it extreme was luck that does not repeat.** A team that wins 60% of its games has usually been both good and fortunate. Next season the good part tends to persist and the fortunate part does not, so the best forecast is still above average, only less so. Nothing has to go wrong for this to happen: no complacency, no curse. How strong the pull is depends on how much of a sport's results is luck, and that depends heavily on how long the season is.

## Ability plus luck, then selection

Think of every result as two parts added together: a stable part (ability, roster quality) and a variable part (bounces, officiating calls, an opponent's off night). Over a short stretch the variable part can be large. Over many games it averages out.

Now pick out the most extreme results, say the best ten records in a league. You have not just picked the ten best teams. You have also picked, disproportionately, the teams whose variable part happened to run in their favour. Measure them again and that variable part is drawn afresh, so the group as a whole moves back toward the middle, even if no team changed at all.

Epidemiologists deal with the same problem in medical data. Barnett and colleagues describe regression to the mean as a statistical phenomenon "that can make natural variation in repeated data look like real change," and note that it becomes more noticeable as measurement error grows and when follow-up is examined only in a subgroup selected on its first value. Sport supplies both conditions in abundance: a season is a noisy measurement, and the players and teams people talk about are the ones selected for an extreme year.

### How far back is the pull?

For results that are roughly bell-shaped and equally spread in both periods, the expected second measurement sits closer to the average by a factor equal to the correlation between the two measurements. In plain terms:

**expected next result ≈ average + r × (this result − average)**

If ability stays the same between seasons and luck in one season tells you nothing about luck in the next, the only thing two seasons share is ability, so r equals the share of the spread in results that comes from real differences in ability. When r is 1, results are pure skill and nothing regresses. When r is 0, results are pure luck and the best estimate for everyone is the average.

## How much of a season is luck, sport by sport

Ben-Naim, Vazquez and Redner examined more than 300,000 regular-season games across five leagues: England's top soccer division and four major professional leagues in the United States. They measured predictability with one number, the upset frequency: how often the team with the worse record on the day of the game won.

| Sport (league studied) | Seasons covered | Games per team per season, average | Upset frequency |
| --- | --- | --- | --- |
| Soccer (English top division) | 1888–2005 | 39.7 | 0.452 |
| Baseball | 1901–2005 | 155.5 | 0.441 |
| Ice hockey | 1917–2004 | 70.8 | 0.414 |
| Basketball | 1946–2005 | 79.1 | 0.365 |
| American football | 1922–2004 | 14.0 | 0.364 |

By this measure soccer and baseball were the most competitive and basketball and American football the least. The authors ignored game location and margin of victory, counted ties as half a win for each side, and skipped games between teams with identical records.

### Season length changes the answer

Per-game upsets are only half the story. The paper also reports how widely teams' final winning percentages spread out, and that spread can be split into a part that chance alone would produce and a part that reflects real differences between teams.

Here is that split, under stated assumptions: every game is treated as an independent 50–50 contest, so chance alone gives a standard deviation of √(0.25 ÷ games) in winning percentage, and the rest of the observed variance is attributed to ability. Soccer and ice hockey are left out because frequent draws and ties make the 50–50 formula overstate the chance part.

| Sport | Observed spread (standard deviation) | Spread from chance alone | Share of variance from chance |
| --- | --- | --- | --- |
| Baseball (155.5 games) | 0.084 | √(0.25 ÷ 155.5) ≈ 0.040 | 0.0016 ÷ 0.0071 ≈ 23% |
| Basketball (79.1 games) | 0.150 | √(0.25 ÷ 79.1) ≈ 0.056 | 0.0032 ÷ 0.0225 ≈ 14% |
| American football (14.0 games) | 0.210 | √(0.25 ÷ 14) ≈ 0.134 | 0.0179 ÷ 0.0441 ≈ 40% |

Basketball and American football had almost identical per-game upset rates, yet chance accounts for nearly three times as much of the final standings in American football, because its seasons were so much shorter. These are long-run averages over each league's history to the mid-2000s, not estimates for any current season.

## Two outstanding seasons, regressed

Apply the formula with r = 1 − (chance share).

**A baseball-length season.** A team finishes at .600. With r ≈ 0.77, the best estimate of its underlying level is .500 + 0.77 × 0.100 ≈ .577. Still a good team, but expecting another .600 season means expecting its luck to repeat.

**A 14-game season.** A team goes 10–4, a .714 record. With r ≈ 0.595, the best estimate is .500 + 0.595 × 0.214 ≈ .627, or about 8.8 wins over 14 games. A 10–4 team's best single forecast for an identical rerun is roughly 9–5.

Both calculations assume the team itself does not change. Real teams do: players age, rosters turn over, schedules differ. Changes like these lower the correlation between one season and the next, which in the formula above means a stronger pull toward average, not a weaker one. [Aging curves in career sims](/blog/aging-curves-in-career-sims/) covers the most predictable of those changes.

## Slumps, jinxes and the coach who gets the credit

Several pieces of sporting folklore turn out to be regression wearing a costume.

- **The sophomore slump.** Players who stand out as rookies are likely to do worse in their second season. They were singled out because the first season was exceptional, and part of any exceptional season is luck.
- **The magazine-cover jinx.** Athletes are featured after a period of exceptional performance, which is likely to be followed by a more ordinary one, so the cover appears to cause the decline.
- **Praise and punishment.** Daniel Kahneman has described a flight instructor who was convinced that praising cadets for a clean manoeuvre made the next attempt worse, while shouting at them after a poor one made the next attempt better. Regression produces exactly that pattern even if the feedback does nothing.
- **The improvement nobody earned.** Regression works upward too. Players whose batting average sat below the league mean in one season tend to move up toward it the next.

The costly version in team sport is the intervention made at the bottom of a run. A coach replaced, a lineup reshuffled or a system changed after an unusually bad stretch will usually be followed by better results whether or not the change helped, because the bad stretch contained bad luck. The fair test compares what happened next with what regression alone predicted, not with the slump.

## Regression inside a draft or GM game

Simulations obey the same arithmetic, because their results also mix a stable part (the squad you built) with a random draw. In [Pro Football GM Club Soccer](/apps/soccer-draft-gm-xi/), you draft an XI from a pool built from real players' careers, with ratings that are the game's own estimates, and the season simulation reports the campaign in wins, draws and losses. Completed runs can be saved and compared with your next attempt, and that comparison is where regression bites: with the squad unchanged, its best campaign is the one where the random draw ran most in its favour, so the same XI's next campaign will usually be worse. Judge a squad on several runs, not its best one. A simulated campaign describes the model, not any real club's prospects.

Career modes have their own version. [Tennis Career Simulator 2026](/apps/tennis-career-sim/), a fictional tennis career, lets ranking points expire on a rolling window, so a career-best season has to be defended. If part of that season was luck, the defence will usually fall short and the ranking will drift back even though the player has not got worse.

Whether to rebuild after a poor simulated season is the same decision under the same noise; [rebuild versus retool](/blog/rebuild-vs-retool/) covers the strategic side, and [understanding sports sim probability](/blog/understanding-sports-sim-probability/) shows how wide the range of ordinary results is for a fixed squad.

## Before acting on an outlier

| Situation | What regression predicts | Sensible response |
| --- | --- | --- |
| A career year from a player | Next year lands between the peak and the long-run level | Value the player on a blend, weighted toward the longer record |
| A short season far above expectation | Strong pull back toward average | Treat it as weak evidence; wait for more games |
| A long season far above expectation | Smaller but real pull back | Treat the team as good, but not as good as its record |
| A slump followed by a change | Improvement likely either way | Compare the next stretch with the regressed expectation |

For a team's record, scoring margin offers a second opinion. MLB's glossary describes Pythagorean winning percentage, an estimate of the record built from runs scored and allowed, as more predictive of a team's future performance than its actual winning percentage. The [Pythagorean expectation calculator](/tools/multi-sport/pythagorean-expectation-calculator/) applies the same idea to runs, points or goals, so you can see how far a season ran ahead of, or behind, its scoring.

The same caution applies to individual statistics: [baseball stats explained for beginners](/blog/baseball-stats-explained-for-beginners/) makes the point that rate statistics over small samples are mostly noise. More explainers arranged by sport are on the [sports hub](/sports/), and the studio's draft, GM and career titles are listed under [sports GM games](/apps/category/sports-gm/).
