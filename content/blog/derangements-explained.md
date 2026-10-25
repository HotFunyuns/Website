---
{
  "title": "Derangements: The Hat-Check Problem and Its Formula",
  "metaTitle": "Derangements Explained: Formula, Recurrence and 1/e",
  "description": "A derangement is a permutation that leaves nothing in place. Count them with inclusion–exclusion, see why the odds approach 1/e, and use the recurrence.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "combinatorics", "permutations", "derangements"],
  "primaryKeyword": "derangements",
  "secondaryKeywords": [
    "derangement formula",
    "hat check problem",
    "subfactorial",
    "number of derangements of 5",
    "derangement recurrence relation"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "probability no one gets their own hat back",
    "why derangements approach n factorial over e",
    "secret santa nobody draws their own name probability",
    "derangements using inclusion exclusion"
  ],
  "aiSearchQuestions": [
    "What is a derangement?",
    "What is the formula for the number of derangements?",
    "What is the probability that nobody gets their own hat back?",
    "Why does the derangement probability approach 1/e?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "inclusion-exclusion-principle",
    "permutations-vs-combinations",
    "recurrence-relations-explained",
    "expected-value-explained",
    "binomial-theorem-and-pascals-triangle",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A derangement is a permutation in which no item ends up in its original position.",
    "The number of derangements of n items is Dₙ = n!(1 − 1/1! + 1/2! − 1/3! + ⋯ ± 1/n!), found by inclusion–exclusion.",
    "The first values are 1, 0, 1, 2, 9, 44, 265, 1854 for n = 0 to 7.",
    "The chance that a random permutation is a derangement approaches 1/e ≈ 0.368, and is already close for n = 4.",
    "Derangements satisfy the recurrence Dₙ = (n − 1)(Dₙ₋₁ + Dₙ₋₂)."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a derangement?",
      "answer": "A rearrangement of a list in which no item stays in its original position. Of the 6 orderings of 1, 2, 3, only 231 and 312 move every number, so there are 2 derangements of three items."
    },
    {
      "question": "How many derangements of 5 items are there?",
      "answer": "44. By the formula, D₅ = 5!(1/2! − 1/3! + 1/4! − 1/5!) = 60 − 20 + 5 − 1 = 44, out of 120 permutations in all."
    },
    {
      "question": "What is the probability that nobody gets their own hat back?",
      "answer": "For n people it is Dₙ/n!, which is 1 − 1/1! + 1/2! − ⋯ ± 1/n!. As n grows it approaches 1/e, about 36.8%. With 4 people it is 9/24 = 37.5%, and for 10 or more it agrees with 1/e to several decimal places."
    },
    {
      "question": "What is a subfactorial?",
      "answer": "Another name for the number of derangements, written !n. So !4 = 9 and !5 = 44. It can be computed as n!/e rounded to the nearest integer for n ≥ 1."
    }
  ],
  "sources": [
    {
      "title": "Advanced Counting Using PIE: Counting Derangements (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_advPIE.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Derangement",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Derangement.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "A000166: Subfactorial or rencontres numbers, or derangements",
      "publisher": "The On-Line Encyclopedia of Integer Sequences (OEIS)",
      "url": "https://oeis.org/A000166",
      "accessed": "2026-10-24"
    }
  ]
}
---

A cloakroom attendant loses the tickets and hands the hats back at random. What is the chance that nobody gets their own hat? Or: a group draws names for a gift exchange from a hat; how often does nobody draw themselves? Both are questions about **derangements**, permutations in which nothing stays where it started. MathWorld records that P. R. de Montmort formulated the problem in 1708 and solved it in 1713, and that Nicholas Bernoulli also solved it with inclusion–exclusion.

## Small cases

Number the items 1 to n and look for orderings in which item i is never in position i.

- **n = 1:** the only ordering, 1, leaves 1 in place. D₁ = 0.
- **n = 2:** 21 works. D₂ = 1.
- **n = 3:** of 123, 132, 213, 231, 312 and 321, only 231 and 312 move everything. D₃ = 2. This is the example Levin's *Discrete Mathematics: An Open Introduction* uses.
- **n = 4:** 9 of the 24 orderings.

Listing gets out of hand quickly, which is why a formula is worth having. The OEIS entry for the sequence (A000166) gives

| n | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dₙ | 1 | 0 | 1 | 2 | 9 | 44 | 265 | 1,854 | 14,833 |
| n! | 1 | 1 | 2 | 6 | 24 | 120 | 720 | 5,040 | 40,320 |

(D₀ = 1 by convention: the empty arrangement moves nothing, but it also leaves nothing in place.)

## The formula, by inclusion–exclusion

Count the permutations that fix *at least one* item, then subtract from n!. Let Aᵢ be the set of permutations that leave item i in place.

- |Aᵢ| = (n − 1)!, since the other n − 1 items are arranged freely. There are C(n, 1) such sets.
- |Aᵢ ∩ Aⱼ| = (n − 2)!, with C(n, 2) pairs.
- In general, fixing k chosen items leaves (n − k)! arrangements, and there are C(n, k) ways to choose them.

By [inclusion–exclusion](/blog/inclusion-exclusion-principle/), the number fixing at least one item is

C(n, 1)(n − 1)! − C(n, 2)(n − 2)! + C(n, 3)(n − 3)! − ⋯

Since C(n, k)(n − k)! = n!/k!, subtracting from n! gives

**Dₙ = n! (1 − 1/1! + 1/2! − 1/3! + ⋯ + (−1)ⁿ/n!).**

**Check with n = 5:** 120 · (1 − 1 + 1/2 − 1/6 + 1/24 − 1/120) = 60 − 20 + 5 − 1 = 44.

Levin's book introduces the topic with a prank: swapping the nameplates on five professors' doors so that every one is wrong. The answer is D₅ = 44 ways.

## Why 1/e appears

The probability that a random permutation is a derangement is

Dₙ/n! = 1 − 1/1! + 1/2! − 1/3! + ⋯ + (−1)ⁿ/n!.

That is the start of the series for e⁻¹ = Σ (−1)ᵏ/k!, so as n grows the probability approaches **1/e ≈ 0.3679**. MathWorld remarks that the probability is very close to 1/e for as few as four items, and the numbers bear that out:

| n | Probability of a derangement |
| ---: | ---: |
| 2 | 0.5 |
| 3 | 0.3333 |
| 4 | 0.375 |
| 5 | 0.3667 |
| 6 | 0.3681 |
| 10 | 0.3679 |

So in a gift exchange with names drawn at random, someone draws their own name about 63% of the time, almost regardless of group size. The terms of the series shrink so fast that the error after n terms is less than 1/(n + 1)!, which is why Dₙ equals n!/e rounded to the nearest whole number for every n ≥ 1. (For n = 6: 720/e ≈ 264.87, which rounds to 265.)

A related fact with a one-line proof: the *expected* number of people who get their own hat is exactly 1, for every n. Each person has a 1/n chance, and by linearity of expectation the n chances add to 1. The [expected value guide](/blog/expected-value-explained/) explains why expectations add even when events depend on each other.

## A recurrence

Derangements also satisfy

Dₙ = (n − 1)(Dₙ₋₁ + Dₙ₋₂), for n ≥ 2.

**Why.** Item 1 goes to some position k ≠ 1: n − 1 choices. Now look at item k.

- If item k goes to position 1, items 1 and k have swapped, and the other n − 2 items must form a derangement: Dₙ₋₂ ways.
- If item k does not go to position 1, treat position 1 as k's "forbidden" spot. The remaining n − 1 items, including k, must each avoid one forbidden position: Dₙ₋₁ ways.

**Check:** D₅ = 4 · (D₄ + D₃) = 4 · (9 + 2) = 44, and D₆ = 5 · (44 + 9) = 265. Recurrences like this are solved and analysed in [recurrence relations](/blog/recurrence-relations-explained/).

## Variations

- **Exactly k items in place.** Choose which k stay, C(n, k) ways, and derange the rest: C(n, k) · Dₙ₋ₖ. For n = 5 and k = 2: 10 · 2 = 20.
- **At least one item in place.** n! − Dₙ; for 5 items, 120 − 44 = 76.

## Where derangements show up

- **Gift exchanges and draws.** Rejecting a draw where someone picks themselves and redrawing until none do produces a derangement.
- **A card game's name.** MathWorld notes that derangements are also called rencontres numbers, after the solitaire game rencontres, or complete permutations.
- **Checking shuffles.** In a fair shuffle of n cards, the chance that no card stays in its original position is close to 1/e.

Counting problems built on permutations and inclusion–exclusion belong to the combinatorics unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). See our [education apps](/apps/category/education-brain/), or work through the [discrete math hub](/blog/topics/discrete-math/) for the surrounding counting guides, starting with [permutations versus combinations](/blog/permutations-vs-combinations/).
