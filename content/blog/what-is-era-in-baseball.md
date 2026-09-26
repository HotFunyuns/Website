---
{
  "title": "What Is ERA in Baseball, and What Does It Miss?",
  "metaTitle": "What Is ERA in Baseball?",
  "description": "How earned run average is calculated, what counts as an earned run, why ERA flatters some pitchers, and how to read it in a simulated season.",
  "status": "published",
  "publishedAt": "2026-09-04",
  "updatedAt": "2026-09-04",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "baseball",
    "statistics",
    "pitching"
  ],
  "primaryKeyword": "what is era in baseball",
  "secondaryKeywords": [
    "earned run average calculation",
    "earned vs unearned runs",
    "era formula baseball",
    "good era baseball",
    "era limitations"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you calculate era in baseball",
    "what counts as an earned run",
    "why is era misleading",
    "what is a good era for a pitcher"
  ],
  "aiSearchQuestions": [
    "What is ERA in baseball and how is it calculated?",
    "What is the difference between an earned and an unearned run?",
    "Why can ERA be misleading?",
    "What counts as a good ERA?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "baseball-draft-gm-team",
    "baseball-career-sim"
  ],
  "relatedArticles": [
    "baseball-stats-explained-for-beginners",
    "what-is-whip-in-baseball",
    "baseball-pitching-roles-explained",
    "baseball-career-sim-guide",
    "ops-and-slugging-explained"
  ],
  "takeaways": [
    "ERA is earned runs allowed multiplied by nine and divided by innings pitched — a rate per nine innings rather than a total.",
    "Only earned runs count. A run that scored because of a fielding error is excluded, which is what separates ERA from raw runs allowed.",
    "The exclusion of unearned runs is also its main weakness: it partially credits pitchers for playing behind poor defences and partially penalises them for good ones.",
    "ERA over a small number of innings is extremely noisy, which is why reliever ERAs move dramatically on single outings.",
    "It measures results rather than process, so it folds in defence, sequencing and luck alongside the pitcher's own contribution."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How is ERA calculated?",
      "answer": "Earned runs allowed, multiplied by nine, divided by innings pitched. Multiplying by nine expresses the figure as a rate per full nine-inning game, so pitchers who worked different numbers of innings can be compared."
    },
    {
      "question": "What is an earned run?",
      "answer": "A run that scored without the aid of a fielding error or a passed ball. If the official scorer judges that a run would not have scored without a defensive misplay, it is unearned and does not count against the pitcher's ERA."
    },
    {
      "question": "Why is ERA sometimes misleading?",
      "answer": "Because it measures outcomes rather than the pitcher's contribution to them. Defensive quality, the sequence in which hits arrive, and the bullpen's handling of inherited runners all move a pitcher's ERA without the pitcher doing anything differently."
    },
    {
      "question": "What is a good ERA?",
      "answer": "It depends entirely on the run environment. In a high-scoring league, a figure that would be excellent in a low-scoring one is merely average. Compare a pitcher to their own league rather than to a fixed number."
    },
    {
      "question": "Why do relievers' ERAs swing so much?",
      "answer": "Small samples. A reliever may pitch a fraction of a starter's innings, so a single poor outing moves the rate enormously. Read a reliever's ERA as a very noisy estimate rather than a settled measurement."
    }
  ],
  "sources": [
    {
      "title": "Earned Run Average (ERA)",
      "publisher": "MLB.com Glossary",
      "url": "https://www.mlb.com/glossary/standard-stats/earned-run-average",
      "accessed": "2026-09-03"
    },
    {
      "title": "Walks And Hits Per Inning Pitched (WHIP)",
      "publisher": "MLB.com Glossary",
      "url": "https://www.mlb.com/glossary/standard-stats/walks-and-hits-per-inning-pitched",
      "accessed": "2026-09-03"
    }
  ]
}
---

**ERA is earned runs allowed per nine innings pitched.** The formula is earned runs × 9 ÷ innings pitched, and the multiplication by nine is what turns a raw total into something comparable between a pitcher who threw 200 innings and one who threw 60.

MLB's own glossary defines it in [those terms](https://www.mlb.com/glossary/standard-stats/earned-run-average). The interesting part is the word "earned".

## Earned versus unearned

A run is **unearned** when it scored with the help of a fielding error or a passed ball — when, in the official scorer's judgement, it would not have scored had the defence played the ball cleanly.

Those runs are excluded from ERA. The intent is fairness: a pitcher should not be charged for a shortstop's error.

Two worked examples make the boundary clear.

**Example one.** Two out, nobody on. The shortstop misplays a routine ground ball. The next batter hits a home run. Two runs score, but the inning should have ended before either. Both are unearned.

**Example two.** Two out, runner on second after a clean double. The next batter singles the runner home. One run, cleanly earned, charged to the pitcher in full.

## Calculating it

A pitcher allows 62 earned runs in 180 innings.

62 × 9 = 558
558 ÷ 180 = **3.10**

That is the entire calculation. If you can divide, you can compute an ERA.

## What ERA is bad at

The exclusion of unearned runs sounds like a correction for defence, and it is only a partial one. Three problems:

**It only removes *errors*, not poor defence.** A defender with limited range who never reaches a ball commits no error. Every hit that a better defender would have caught is charged fully to the pitcher. So a pitcher behind a poor-but-tidy defence is penalised, and one behind a good defence is flattered.

**It is sensitive to sequencing.** Three singles in an inning score a run; three singles spread across three innings usually do not. Identical pitching, different ERA.

**Inherited runners belong to whoever put them on.** If you leave with runners on base and the next pitcher allows them to score, those runs are charged to you. A reliever's competence therefore moves a starter's ERA.

**Small samples swing wildly.** A reliever throwing 60 innings who has one outing where they allow five runs sees their ERA move by three quarters of a run. That is a property of the arithmetic, not evidence about their ability. This is why [baseball pitching roles explained](/blog/baseball-pitching-roles-explained/) argues that reliever statistics should be read with much more caution than starters'.

## What to read alongside it

| Statistic | What it adds |
| --- | --- |
| [WHIP](/blog/what-is-whip-in-baseball/) | Traffic allowed per inning, independent of sequencing |
| Strikeouts and walks | Outcomes the pitcher controls most directly |
| Innings pitched | Whether the ERA is measured over a meaningful sample |
| Home runs allowed | The events defence cannot influence at all |

WHIP is the most useful companion, because it counts baserunners rather than runs. A pitcher with a good ERA and a poor WHIP has been getting away with something; a pitcher with the reverse has probably been unlucky. [What is WHIP in baseball](/blog/what-is-whip-in-baseball/) covers it in the same detail as this article covers ERA.

## Reading it in a simulated season

In [162-0 Baseball Draft & GM Team](/apps/baseball-draft-gm-team/) and [Baseball Career Sim 2026](/apps/baseball-career-sim/), the same caveats apply, and one of them applies more strongly.

Because simulated outcomes are sampled rather than computed, the sequencing effect is entirely random from the pitcher's point of view. Two identical simulated seasons will produce different ERAs, and the difference carries no information about how well the pitcher was built or deployed.

Practical guidance:

- **Judge a simulated pitcher over multiple seasons**, not one.
- **Prefer rate statistics that exclude sequencing** — strikeout rate, walk rate, WHIP — when evaluating a draft pool.
- **Do not compare across run environments.** An ERA that is excellent in one simulated league setup is ordinary in another.

There is no fixed number that constitutes a "good" ERA. It is entirely relative to the scoring environment, which is why the same figure means different things in different eras of the real sport and in different configurations of a simulated one.

## Where this fits

[Baseball statistics explained for beginners](/blog/baseball-stats-explained-for-beginners/) covers the wider vocabulary, and [the Baseball Career Sim 2026 guide](/blog/baseball-career-sim-guide/) covers reading your own numbers when you are the pitcher rather than the general manager.

All players, teams and leagues in our games are fictional. The catalogue is under [sports career and GM games](/apps/category/sports-gm/).

MLB and MLB.com are trademarks of their respective owners, referenced here only to identify the source of the statistical definitions cited. No affiliation, sponsorship or endorsement is implied.
