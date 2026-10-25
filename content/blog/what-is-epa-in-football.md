---
{
  "title": "What Is EPA in Football? Expected Points Added and Success Rate, Explained",
  "metaTitle": "What Is EPA in Football? Expected Points Added Explained",
  "description": "Expected points put a value on every down, distance and yard line, and EPA measures how much one play changed it. A worked drive shows how success rate differs.",
  "status": "published",
  "editorialReview": "organization",
  "reviewAttestation": "library-2026-10-24",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "american football",
    "analytics",
    "expected points",
    "statistics",
    "career sims"
  ],
  "primaryKeyword": "what is epa in football",
  "secondaryKeywords": [
    "expected points added explained",
    "expected points added per play",
    "what is success rate in football",
    "success rate football definition",
    "what is epa in football stats"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how are expected points calculated in football",
    "why do turnovers have such negative epa",
    "epa vs success rate",
    "what does epa per play mean"
  ],
  "aiSearchQuestions": [
    "What does EPA mean in football?",
    "How are expected points calculated?",
    "What is success rate in football analytics?",
    "What is the difference between EPA and win probability added?"
  ],
  "relatedApps": [
    "football-career-sim",
    "football-draft-gm-mode"
  ],
  "relatedArticles": [
    "how-sports-simulation-engines-work",
    "understanding-sports-sim-probability",
    "quarterback-archetypes-explained",
    "football-draft-gm-guide",
    "cricket-stats-explained",
    "net-run-rate-explained"
  ],
  "takeaways": [
    "EPA is the change in a team's expected points from the start of a play to the end of it, so it credits a play for the situation it leaves behind as well as any points it scores.",
    "Expected points are estimated from what historically happened next from similar situations, using inputs such as down, distance, yard line, time left in the half and timeouts.",
    "A turnover costs twice: the offence loses the value of its own possession and hands the opponent a valuable one, which is why interceptions carry large negative EPA.",
    "Success rate counts the share of plays with positive EPA; use it to judge consistency and EPA per play to judge size, and switch to win probability late in close games."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does EPA stand for in football?",
      "answer": "EPA stands for expected points added. It is the difference between the expected points of the situation after a play and the situation before it, plus any points the play scored. A positive EPA means the play left the offence better placed than it started; a negative one means it left it worse placed."
    },
    {
      "question": "How are expected points calculated?",
      "answer": "Expected points estimate the average net points a situation is worth, based on what happened next from similar situations in past games. The open-source nflfastR model takes the season, home team, roof type, seconds left in the half, yard line, down, yards to go and both teams' timeouts, and estimates the probability of each possible next score in the half, from which it computes expected points for the team with the ball."
    },
    {
      "question": "What is success rate in football?",
      "answer": "In the nflfastR data a play is marked a success when its EPA is greater than zero, and a success rate is simply the share of plays marked successful. It measures how often an offence moved its situation forward, regardless of by how much, which makes it less sensitive to a handful of very large plays than average EPA."
    },
    {
      "question": "Why does a one-yard touchdown add so little EPA?",
      "answer": "Because most of its value was already counted before the snap. In David Romer's estimates from 1998-2000 first quarters, a first-and-goal at the 1 was already worth about 5.55 points, so the touchdown and the kickoff that follows add less than one point. The plays that moved the ball to the 1 earned most of the credit."
    },
    {
      "question": "Is EPA the same as win probability added?",
      "answer": "No. EPA measures a play in points, and treats a point as equally valuable whenever it is scored. Win probability added measures the change in a team's chance of winning, which depends heavily on the score and the clock, so the two can disagree sharply late in close games."
    }
  ],
  "sources": [
    {
      "title": "Field Descriptions",
      "publisher": "nflfastR package documentation",
      "url": "https://nflfastr.com/articles/field_descriptions.html",
      "accessed": "2026-10-02"
    },
    {
      "title": "Compute expected points (calculate_expected_points)",
      "publisher": "nflfastR package documentation",
      "url": "https://nflfastr.com/reference/calculate_expected_points.html",
      "accessed": "2026-10-02"
    },
    {
      "title": "nflfastR EP, WP, CP xYAC, and xPass models",
      "publisher": "Open Source Football (Ben Baldwin)",
      "url": "https://www.opensourcefootball.com/posts/2020-09-28-nflfastr-ep-wp-and-cp-models/",
      "accessed": "2026-10-02"
    },
    {
      "title": "A beginner's guide to nflfastR",
      "publisher": "nflfastR package documentation",
      "url": "https://nflfastr.com/articles/beginners_guide.html",
      "accessed": "2026-10-02"
    },
    {
      "title": "Do Firms Maximize? Evidence from Professional Football",
      "publisher": "Journal of Political Economy (David Romer, 2006; author's copy)",
      "url": "https://eml.berkeley.edu/~dromer/papers/JPE_April06.pdf",
      "accessed": "2026-10-02"
    }
  ]
}
---

EPA, or expected points added, measures how much a single play changed a team's scoring outlook. Every situation in a game, such as first-and-10 at your own 25 with five minutes left in the half, has an expected-points value: the average net points a team in that spot goes on to produce, estimated from what happened next in thousands of similar situations. EPA is the value after the play minus the value before it, plus any points the play scored. Success rate is its simpler cousin: in the open-source nflfastR data, a play counts as a success when its EPA is above zero.

That is the whole idea. The rest of this article shows where the values come from, walks a short drive through the arithmetic, and explains when success rate is the better question.

## Expected points: a price on every situation

The open-source nflfastR package, which builds play-by-play data for NFL games, documents its expected-points model plainly. It takes these inputs for every play:

- the season, which team is at home, and the roof type;
- the seconds remaining in the half;
- the yard line, measured as the distance from the opponent's end zone;
- the down and the yards to go;
- both teams' timeouts remaining.

It does not predict points directly. It estimates the probability of each possible next scoring event in the half: a touchdown, field goal or safety for either team, or no further score. Expected points are then computed from those probabilities with respect to the team that has the ball, so the opponent's possible scores count against it.

### Where the numbers come from

The model is described in a write-up by Ben Baldwin on the Open Source Football site. It is trained with xgboost, a method that builds decision trees from historical plays, and it includes era adjustments, splitting the data into periods from 1999 to 2001 through 2018 and beyond, so that seasons played under different conditions are not treated as identical. To test calibration, the authors held out each season from 2000 to 2019 in turn, trained on the other nineteen, and checked whether the predicted chances of each next score matched what actually happened in the held-out season.

The idea itself is older. In a 2006 paper on fourth-down decisions, the economist David Romer estimated the value of a first-and-10 at every yard line from first quarters of the 1998 to 2000 seasons. His values cross zero around a team's own 15, then rise roughly a point every 18 yards. Receiving a kickoff from the 30 was worth about 0.6 points, the same as a first-and-10 at your own 27, and a first-and-goal at the 1 was worth 5.55. Because 98.4 percent of extra points were good in that period, he counted every touchdown as 6.984 points.

## EPA, one play at a time

Romer's published values are enough to walk through the arithmetic. The figures below use his scale from those first quarters, with the in-between values taken from his approximation of a point every 18 yards, so they are illustrations of the method rather than today's model output. Modern models with more inputs produce different numbers, but the calculation is identical.

| Play | Situation before | Situation after | Value before | Value after, plus points | EPA |
| --- | --- | --- | --- | --- | --- |
| Kickoff return to your 27 | Receiving a kickoff | First-and-10, own 27 | 0.6 | 0.6 | About 0 |
| 18-yard completion | First-and-10, own 27 | First-and-10, own 45 | 0.6 | About 1.6 | About +1.0 |
| Interception, downed at the spot | First-and-10, own 45 | Opponent's first-and-10 at your 45 | About 1.6 | About −2.2 | About −3.8 |
| One-yard touchdown (another drive) | First-and-goal at the 1 | Touchdown, then you kick off | 5.55 | 6.98 − 0.6 = 6.38 | About +0.8 |

Three lessons sit in that table.

**An average play is worth nothing extra.** A kickoff return to the 27 leaves the offence exactly where an average kickoff was expected to leave it, so its EPA is about zero. EPA rewards plays relative to expectation, not yards for their own sake.

**A turnover costs twice.** The interception does not just erase the offence's 1.6 points of value. It hands the opponent a first down near midfield, worth about 2.2 points to them, and therefore minus 2.2 to you. The swing is the sum of both, which is why turnovers dominate a team's EPA in a way they never dominate a box score.

**Short touchdowns earn little.** First-and-goal at the 1 is already worth 5.55 points. The touchdown makes it 6.98, and the kickoff the scoring team must then give away costs about 0.6, so the plunge itself adds under a point. The completions that moved the ball to the 1 earned most of the credit.

## Success rate: the simpler cousin

nflfastR marks every play with a success flag that is true when the play's EPA is greater than zero, and its own guide computes a success rate as the average of that flag. In the drive above, the completion and the touchdown are successes, while the interception is not, and the kickoff return sits on the line.

The two measures answer different questions:

| Question | Better measure | Why |
| --- | --- | --- |
| How often does this offence stay on schedule? | Success rate | Every play counts once, so one huge gain cannot hide a run of failures |
| How much value does this offence create? | EPA per play | Size matters, so explosive plays and turnovers count in full |
| How reliable is a small sample? | Success rate, cautiously | A single 60-yard play or interception can swing average EPA over a few dozen snaps |

The common mistake is reading either one off a handful of plays. Both are averages, and both settle only over many snaps, for the reasons covered in [understanding probability in sports sims](/blog/understanding-sports-sim-probability/).

## What EPA leaves out

**The scoreboard late in a game.** EPA treats a point as a point whenever it arrives. Romer makes that assumption for early-game decisions and notes it is not a good one late in a game, when what a point is worth depends on the score and the clock. For those moments nflfastR records a separate win probability for every play, and win probability added measures each play in that currency.

**Who deserves the credit.** EPA belongs to a play, not to a player. Any split between players is a convention. nflfastR's own variants show how many choices are involved: it separates the value gained through the air from the value gained after the catch, and its quarterback version credits the passer up to the spot where a receiver later loses a fumble.

**What the model already knows.** Home field is built into the model, which is why average EPA per play looks similar for home and road teams in the package's own examples. Anything the model does not take as an input, such as the quality of the opponent, still sits inside the raw numbers.

## Reading your own games this way

[Football Career Sim 2027](/apps/football-career-sim/), our game about one quarterback's career, keeps a season sheet of passing yards, touchdowns, interceptions, completion percentage and rushing production, and its drives move through downs, distance and field position. Those are box-score counts rather than expected points, but the expected-points habit is still a useful way to review a season you have played: protecting the ball on third-and-long while a makeable field goal is still available can be worth more than forcing a throw into coverage, and an interception near midfield costs far more than its single line in the box score. Everything in the game is fictional, and its results come from its own model rather than real NFL data.

[Quarterback archetypes explained](/blog/quarterback-archetypes-explained/) covers how different styles trade risk for reward, and [how sports simulation engines turn ratings into results](/blog/how-sports-simulation-engines-work/) shows how a sim turns a situation into an outcome. If you would rather judge a whole roster, [the football draft simulator guide](/blog/football-draft-gm-guide/) applies the same thinking to units. Our [American football](/sports/football/) hub collects more explainers, and the [sports career and GM section](/blog/category/sports-gm/) has the rest.
