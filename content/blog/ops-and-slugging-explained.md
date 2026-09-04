---
{
  "title": "OPS and Slugging Percentage Explained",
  "metaTitle": "What Is OPS in Baseball?",
  "description": "How slugging percentage and OPS are calculated, why adding two rates with different denominators is a compromise, and what OPS is genuinely good for.",
  "status": "published",
  "publishedAt": "2026-09-04",
  "updatedAt": "2026-09-04",
  "author": "Reign Creative Team",
  "category": "sports-gm",
  "tags": [
    "baseball",
    "statistics",
    "hitting"
  ],
  "primaryKeyword": "what is ops in baseball",
  "secondaryKeywords": [
    "slugging percentage explained",
    "on base plus slugging",
    "ops calculation",
    "batting average vs ops",
    "total bases baseball"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how is slugging percentage calculated",
    "why is ops criticised",
    "what is a good ops",
    "is ops better than batting average"
  ],
  "aiSearchQuestions": [
    "What is OPS in baseball?",
    "How is slugging percentage calculated?",
    "Is OPS better than batting average?",
    "What are the criticisms of OPS?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "baseball-draft-gm-team",
    "baseball-career-sim"
  ],
  "relatedArticles": [
    "baseball-stats-explained-for-beginners",
    "what-is-whip-in-baseball",
    "batting-order-strategy-explained",
    "baseball-career-sim-guide"
  ],
  "takeaways": [
    "Slugging percentage is total bases divided by at-bats, so it weights a home run as four times a single.",
    "OPS is on-base percentage plus slugging percentage — two rates with different denominators added together, which is mathematically untidy and practically useful.",
    "OPS improves on batting average enormously, because batting average ignores walks entirely and treats every hit as identical.",
    "Its main flaw is that it slightly under-weights on-base percentage, which is the more valuable of the two components.",
    "It is a good summary and a poor precision instrument — useful for sorting, not for splitting hairs."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How is slugging percentage calculated?",
      "answer": "Total bases divided by at-bats. A single is one base, a double two, a triple three and a home run four. It measures the value of contact rather than the frequency of it."
    },
    {
      "question": "What is OPS?",
      "answer": "On-base percentage plus slugging percentage. It combines how often a hitter reaches base with how much damage they do when they hit, into a single figure."
    },
    {
      "question": "Is OPS better than batting average?",
      "answer": "For most purposes, substantially. Batting average ignores walks and treats a single and a home run as the same event. OPS accounts for both, which is why it correlates much better with run scoring."
    },
    {
      "question": "What is the criticism of OPS?",
      "answer": "It adds two rates with different denominators, which is mathematically improper, and it weights the two components equally when on-base percentage is worth more. It is a useful approximation rather than a correct formula."
    },
    {
      "question": "What is a good OPS?",
      "answer": "It depends on the run environment. In most modern contexts a figure around .800 is solidly above average and .900 or higher is excellent, but the honest comparison is against the league the hitter plays in, not against a fixed number."
    }
  ],
  "sources": [
    {
      "title": "On-base Plus Slugging (OPS)",
      "publisher": "MLB.com Glossary",
      "url": "https://www.mlb.com/glossary/standard-stats/on-base-plus-slugging",
      "accessed": "2026-09-03"
    },
    {
      "title": "Slugging Percentage (SLG)",
      "publisher": "MLB.com Glossary",
      "url": "https://www.mlb.com/glossary/standard-stats/slugging-percentage",
      "accessed": "2026-09-03"
    }
  ]
}
---

**OPS is on-base percentage plus slugging percentage.** It is the most widely used single-number summary of a hitter, and understanding it requires understanding the two things being added.

## Slugging percentage

[Slugging percentage](https://www.mlb.com/glossary/standard-stats/slugging-percentage) is total bases divided by at-bats. Total bases counts a single as one, a double as two, a triple as three and a home run as four.

A hitter with 500 at-bats producing 90 singles, 30 doubles, 3 triples and 25 home runs:

Total bases = (90 × 1) + (30 × 2) + (3 × 3) + (25 × 4) = 90 + 60 + 9 + 100 = **259**
259 ÷ 500 = **.518**

The key property: slugging measures **the value of contact**, not how often contact happens. A hitter who never reaches base but hits a home run every time they do would have an enormous slugging percentage.

Its blind spot is symmetrical: **walks do not appear at all.** A walk is not an at-bat and produces no total bases, so a hitter with exceptional plate discipline gets no credit here.

## On-base percentage

On-base percentage covers exactly what slugging misses: how often a hitter reaches base by any means, including walks and being hit by a pitch. It says nothing about what kind of base they reached.

Slugging and on-base percentage are therefore complementary, which is the whole motivation for adding them.

## OPS, and the honest caveat

[OPS](https://www.mlb.com/glossary/standard-stats/on-base-plus-slugging) is simply the sum. A hitter with a .370 on-base percentage and a .518 slugging percentage has an OPS of **.888**.

Two criticisms are worth stating, because they are correct and they are usually glossed over:

**The denominators differ.** On-base percentage divides by plate appearances; slugging divides by at-bats. Adding two fractions with different denominators is not a legitimate operation in the way arithmetic normally works. OPS survives because it correlates well with run scoring in practice, not because it is derived correctly.

**The weighting is wrong.** Research on run scoring consistently finds that on-base percentage is worth more per point than slugging. OPS weights them equally, so it slightly undervalues the hitter who walks a lot and slightly overvalues the one who hits for power.

The consequence for you: **OPS is a good sorting tool and a poor precision instrument.** Use it to separate good hitters from ordinary ones. Do not use it to declare that a .812 hitter is better than a .807 one.

## Why it still beats batting average

Batting average is hits divided by at-bats. It has two failings that OPS does not:

| | Batting average | OPS |
| --- | --- | --- |
| Counts walks | No | Yes, via OBP |
| Distinguishes a single from a home run | No | Yes, via SLG |
| Correlates well with runs scored | Weakly | Strongly |
| Easy to compute in your head | Yes | Not really |

A hitter batting .250 with a lot of walks and power can be considerably more valuable than one batting .300 with neither, and batting average shows the opposite. That single fact is why OPS took over.

## Reading it in a simulation

In [162-0 Baseball Draft & GM Team](/apps/baseball-draft-gm-team/) and [Baseball Career Sim 2026](/apps/baseball-career-sim/), OPS is a reasonable way to compare hitters within one simulated season, with two caveats.

**Compare within the same run environment.** A simulated league configured to produce more offence inflates everyone's OPS. The number only means something relative to the other hitters in that league.

**Do not read small samples.** A hundred plate appearances is not enough to distinguish a good hitter from an average one. Over a full season it becomes informative; over a month it is noise.

From the player's perspective, OPS is also the fairest way to judge your own offensive season, because unlike RBIs it does not depend on who bats in front of you — a point covered in [how a batting order works](/blog/batting-order-strategy-explained/).

## Where to read next

[Baseball statistics explained for beginners](/blog/baseball-stats-explained-for-beginners/) covers the wider vocabulary, and [what is WHIP in baseball](/blog/what-is-whip-in-baseball/) is the pitching-side equivalent of "what does this rate actually capture". [The Baseball Career Sim 2026 guide](/blog/baseball-career-sim-guide/) covers reading your own numbers when you are the hitter rather than the front office.

All players, teams and leagues in our games are fictional. The catalogue is under [sports career and GM games](/apps/category/sports-gm/).

MLB and MLB.com are trademarks of their respective owners, referenced here only to identify the source of the statistical definitions cited. No affiliation, sponsorship or endorsement is implied.
