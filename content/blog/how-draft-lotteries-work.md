---
{
  "title": "How Draft Lotteries Work, and What They Are Trying to Fix",
  "metaTitle": "How Draft Lotteries Work",
  "description": "Why leagues randomise draft order, how weighted lotteries are built, what flattening the odds changes, and what a lottery can and cannot prevent.",
  "status": "published",
  "publishedAt": "2026-09-04",
  "updatedAt": "2026-09-04",
  "author": "Reign Creative Team",
  "category": "sports-gm",
  "tags": [
    "draft",
    "league design",
    "gm mode",
    "probability"
  ],
  "primaryKeyword": "how do draft lotteries work",
  "secondaryKeywords": [
    "weighted draft lottery",
    "tanking in sports",
    "lottery odds explained",
    "draft order randomisation",
    "flattened lottery odds"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why do leagues use a draft lottery",
    "what does flattening lottery odds do",
    "does a lottery stop tanking",
    "how are lottery combinations drawn"
  ],
  "aiSearchQuestions": [
    "How does a draft lottery work?",
    "Why do leagues use lotteries instead of reverse standings?",
    "Does a lottery stop teams from tanking?",
    "What does flattening the odds mean?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "pro-basketball-draft-gm-mode",
    "hockey-draft-gm-manager"
  ],
  "relatedArticles": [
    "how-football-draft-order-works",
    "rebuild-vs-retool",
    "what-makes-a-good-draft-board",
    "understanding-sports-sim-probability"
  ],
  "takeaways": [
    "A draft lottery randomises the top of the draft order so that finishing last does not guarantee the first pick.",
    "It exists to reduce the incentive to lose deliberately, which pure reverse-standings ordering creates.",
    "Most lotteries are weighted: worse teams get better odds, so the incentive is reduced rather than removed.",
    "Flattening the odds — giving several bad teams identical chances — weakens the incentive further, at the cost of some competitive-balance benefit.",
    "A lottery cannot remove the incentive entirely, because being bad still improves your expected pick."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a draft lottery?",
      "answer": "A randomised process that determines the top of a draft order, so that the team with the worst record has a chance at the first pick rather than a guarantee of it. Remaining picks are usually assigned by reverse standings after the lottery positions are settled."
    },
    {
      "question": "Why do leagues use lotteries?",
      "answer": "Because pure reverse-standings ordering rewards losing. A team already out of contention improves its draft position by losing more, and a lottery makes that reward probabilistic rather than certain."
    },
    {
      "question": "How are lottery odds usually structured?",
      "answer": "They are weighted, with worse records receiving better odds. A common implementation draws from a pool of numbered combinations, with more combinations assigned to teams with worse records."
    },
    {
      "question": "What does flattening the odds do?",
      "answer": "It gives several of the worst teams identical or near-identical chances, so being the very worst is no better than being third worst. That reduces the incentive to lose further, at the cost of concentrating less help on the team that needs it most."
    },
    {
      "question": "Does a lottery stop tanking?",
      "answer": "No. It reduces the incentive rather than removing it, because a worse record still improves your expected pick. It converts a certainty into a probability, which changes behaviour at the margin without eliminating it."
    }
  ],
  "sources": [
    {
      "title": "SP 800-22 Rev. 1a: A Statistical Test Suite for Random and Pseudorandom Number Generators",
      "publisher": "National Institute of Standards and Technology (NIST)",
      "url": "https://csrc.nist.gov/pubs/sp/800/22/r1/upd1/final",
      "accessed": "2026-09-03"
    },
    {
      "title": "Seeing Theory: A visual introduction to probability and statistics",
      "publisher": "Brown University",
      "url": "https://seeing-theory.brown.edu/",
      "accessed": "2026-09-03"
    }
  ]
}
---

**A draft lottery randomises the top of the draft order, so that finishing last gives you the best chance at the first pick rather than a guarantee of it.** It exists to solve a problem that reverse-standings ordering creates.

## The problem it addresses

Straight reverse ordering gives the weakest team the first selection. That is good for competitive balance — [how draft order works](/blog/how-football-draft-order-works/) covers the reasoning — and it has an awkward consequence: **a team that is out of contention improves its position by losing.**

That is not a hypothetical incentive. Once a season is lost, every remaining win moves you down the order, and every loss moves you up. A front office acting rationally on behalf of its future is acting against its supporters' interest in the present.

Leagues respond by making the top of the order uncertain.

## How weighted lotteries are built

The common implementation:

1. A pool of numbered combinations is created — often several hundred, sometimes over a thousand.
2. Combinations are **distributed unequally**, with more assigned to teams with worse records.
3. Combinations are drawn to determine the first few picks.
4. Remaining picks are assigned by reverse standings among the teams that were not drawn.

The weighting is the key design lever. Heavier weighting toward the worst teams preserves more of the competitive-balance benefit and preserves more of the incentive to lose. Lighter weighting does the reverse.

| Design | Competitive balance | Tanking incentive |
| --- | --- | --- |
| Pure reverse standings | Strongest | Strongest |
| Steeply weighted lottery | Strong | Moderate |
| Flattened lottery | Moderate | Weaker |
| Uniform lottery among non-playoff teams | Weakest | Weakest |

## Flattening the odds

"Flattening" means giving several of the worst teams identical or near-identical chances. If the three worst records all have the same odds, there is no benefit to being the very worst rather than third worst.

This weakens the incentive at the sharp end, which is where it was strongest. The cost is that the team most in need of help is no longer most likely to receive it — the redistribution mechanism becomes blunter.

There is no correct answer here. It is a genuine trade-off between two goals that pull in opposite directions, and different leagues resolve it differently.

## What a lottery cannot do

**It cannot remove the incentive.** A worse record still produces better odds, so it still raises your expected pick. A lottery makes losing less rewarding; it does not make it unrewarding.

**It cannot stop a rebuild.** Trading established players for future assets is legitimate roster management, and it also produces a worse record. Distinguishing a rebuild from a tank requires reading intent, which no ordering rule can do. [Rebuild versus retool](/blog/rebuild-vs-retool/) covers the strategic difference.

**It cannot make the draw feel fair.** Because a lottery is random, one team will always be able to say it deserved better. That is what randomness means, and it is why the drawing procedure is usually conducted publicly with witnesses.

## The randomness has to be genuinely random

This is more of an engineering problem than it appears. A lottery whose outcomes are subtly non-uniform is a lottery that can be exploited or, at minimum, doubted.

That is why serious randomness is testable rather than assumed. [NIST's statistical test suite](https://csrc.nist.gov/pubs/sp/800/22/r1/upd1/final) exists precisely to evaluate whether a generator's output has the statistical properties random output should have. Physical drawing procedures — numbered balls, sealed machines, independent observers — are the low-technology version of the same concern.

For the underlying intuition about why random draws produce runs that look suspicious, [Brown University's Seeing Theory](https://seeing-theory.brown.edu/) is a good visual introduction, and [understanding sports simulation probability](/blog/understanding-sports-sim-probability/) applies the same reasoning to simulated seasons.

## In a simulation

Most draft games, ours included, do not model a lottery, because a lottery is a solution to an incentive problem that only exists when a team plays a season it wants to lose. In a game where you draft first and play afterwards, there is nothing to tank.

What our games model instead is the part that is interesting to play: evaluating a pool under a constraint. [Pro Basketball GM Franchise](/apps/pro-basketball-draft-gm-mode/) offers eight draft formats, each changing the constraint rather than the order, and [84-0 Hockey Draft & GM Manager](/apps/hockey-draft-gm-manager/) does the same for hockey.

[What makes a good draft board](/blog/what-makes-a-good-draft-board/) covers preparing for any of them — and the preparation matters more than the position, because a board that identifies where the real quality gaps sit is worth more than a pick one place higher.

Every league, team and player in our games is fictional, and nothing here describes any real league's current lottery rules — those change, and each league's own published regulations are the authority. The catalogue is under [sports career and GM games](/apps/category/sports-gm/).
