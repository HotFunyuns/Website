---
{
  "title": "Stars and Bars: Counting Combinations with Repetition",
  "metaTitle": "Stars and Bars: Combinations with Repetition, Explained",
  "description": "How the stars and bars method counts ways to share identical items among distinct groups, with and without minimums, and why the formula is C(k + n − 1, n − 1).",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "counting", "combinatorics", "stars and bars"],
  "primaryKeyword": "stars and bars",
  "secondaryKeywords": [
    "combinations with repetition",
    "stars and bars formula",
    "number of nonnegative integer solutions",
    "distributing identical objects into distinct boxes",
    "multichoose"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how many ways to give 10 identical candies to 4 kids",
    "stars and bars with at least one in each box",
    "x1 + x2 + x3 = 7 nonnegative solutions",
    "stars and bars with upper limits"
  ],
  "aiSearchQuestions": [
    "What is the stars and bars method?",
    "What is the formula for combinations with repetition?",
    "How many nonnegative integer solutions does x₁ + x₂ + x₃ = 7 have?",
    "How do you handle a minimum in each group with stars and bars?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "permutations-vs-combinations",
    "inclusion-exclusion-principle",
    "binomial-theorem-and-pascals-triangle",
    "lattice-paths-counting",
    "generating-functions-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The number of ways to distribute k identical items among n distinct groups is C(k + n − 1, n − 1).",
    "The same number counts nonnegative integer solutions of x₁ + ⋯ + xₙ = k and multisets of size k from n types.",
    "Each distribution corresponds to a row of k stars and n − 1 bars, and choosing where the bars go fixes it.",
    "If every group must get at least one, hand one to each first; that leaves C(k − 1, n − 1) ways.",
    "Upper limits are handled by subtracting the over-limit cases with inclusion–exclusion."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the stars and bars formula?",
      "answer": "The number of ways to put k identical items into n distinct boxes, with empty boxes allowed, is C(k + n − 1, n − 1), which equals C(k + n − 1, k). For 7 cookies and 4 children it is C(10, 3) = 120."
    },
    {
      "question": "Why does stars and bars work?",
      "answer": "Write each item as a star and separate the boxes with n − 1 bars. Every distribution becomes a row of k stars and n − 1 bars, and every such row is a distribution. Choosing which of the k + n − 1 positions hold bars determines the row, so there are C(k + n − 1, n − 1) of them."
    },
    {
      "question": "How do I count distributions where every box gets at least one?",
      "answer": "Give one item to each of the n boxes first, then distribute the remaining k − n freely. That gives C(k − n + n − 1, n − 1) = C(k − 1, n − 1). For 10 candies and 4 children with at least one each, it is C(9, 3) = 84."
    },
    {
      "question": "When can't I use stars and bars?",
      "answer": "When the items are distinct, such as different books, or the boxes are identical, such as unlabelled piles. Distinct items into distinct boxes is nᵏ. Identical boxes lead to partition counting, a different problem with no formula as simple as this one."
    }
  ],
  "sources": [
    {
      "title": "Stars and Bars (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_stars-and-bars.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Multichoose",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Multichoose.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Advanced Counting Using PIE (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_advPIE.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Some counting problems look different but share one structure: identical things shared among distinct recipients. Ten identical sweets for four children. Seven scoops from five ice-cream flavours. Nonnegative whole numbers x₁, x₂, x₃ adding to 7. All of them are solved by one picture, a row of stars and bars, which Levin's *Discrete Mathematics: An Open Introduction* introduces with cookies and children.

## The picture

Suppose 7 identical cookies go to 4 children. Draw each cookie as a star and separate the children's shares with bars. Three bars are needed to make four groups:

★★★ | ★ | ★ | ★★

means 3 cookies for the first child, 1 for the second, 1 for the third and 2 for the fourth. Empty groups are fine:

★★★★ | | ★★★ |

means 4, 0, 3, 0.

Every distribution gives exactly one row of 7 stars and 3 bars, and every row of 7 stars and 3 bars gives exactly one distribution. Counting distributions is therefore the same as counting rows. A row has 10 positions; choose which 3 hold bars and the rest are stars. So there are

C(10, 3) = 120

ways. This is a bijective proof, the same idea as matching subsets with bit strings in the [power set guide](/blog/power-set-explained/).

## The general formula

The number of ways to distribute **k identical items** among **n distinct groups**, with empty groups allowed, is

C(k + n − 1, n − 1) = C(k + n − 1, k).

There are k stars and n − 1 bars in k + n − 1 positions, and the bars' positions decide everything.

The same number counts three things that are really the same problem:

| Form of the question | Example | Count |
| --- | --- | --- |
| Identical items into distinct boxes | 7 cookies, 4 children | C(10, 3) = 120 |
| Nonnegative integer solutions | x₁ + x₂ + x₃ + x₄ = 7 | C(10, 3) = 120 |
| Multisets: choose k from n types with repetition | 7 scoops from 4 flavours | C(10, 3) = 120 |

MathWorld calls the last one "n multichoose k", the number of multisets of size k drawn from n types. In the four-way table of [permutations versus combinations](/blog/permutations-vs-combinations/), it is the "unordered, with repetition" entry.

## Worked examples

**1. Equation solutions.** How many nonnegative integer solutions does x₁ + x₂ + x₃ = 7 have? Seven stars, two bars: C(9, 2) = 36.

**2. Doughnuts.** A shop sells 6 kinds of doughnut. How many ways to choose a box of 4, repeats allowed? Four stars (doughnuts), five bars (between six kinds): C(9, 5) = C(9, 4) = 126.

**3. At least one each.** Ten identical sweets for 4 children, every child getting at least one. Give each child one sweet first, using 4. The remaining 6 are shared freely: C(6 + 3, 3) = C(9, 3) = 84. In general, with a minimum of one per group, the count is C(k − 1, n − 1).

**4. Other minimums.** Solutions of x₁ + x₂ + x₃ = 12 with x₁ ≥ 3, x₂ ≥ 0, x₃ ≥ 2. Substitute y₁ = x₁ − 3 and y₃ = x₃ − 2; then y₁ + x₂ + y₃ = 7 with all three nonnegative: C(9, 2) = 36. Any lower bound is handled by "pre-paying" it.

**5. Strict inequalities.** Positive integers a, b, c with a + b + c = 12: that is "at least one each", C(11, 2) = 55.

## Upper limits need inclusion–exclusion

A maximum cannot be pre-paid. Instead, count everything, then subtract the distributions that break a limit, using [inclusion–exclusion](/blog/inclusion-exclusion-principle/) when several limits could be broken at once.

**Example.** How many solutions does x₁ + x₂ + x₃ = 9 have in whole numbers from 0 to 4?

- No limit: C(11, 2) = 55.
- A particular variable is at least 5: write it as 5 + y, so the three variables now sum to 4, C(6, 2) = 15 ways. Three variables: 45.
- Two variables at least 5: that needs a sum of at least 10, impossible.

So 55 − 45 = **10**. Listing them confirms it: the 3 arrangements of (4, 4, 1), the 6 of (4, 3, 2) and (3, 3, 3). Levin's book devotes a section to exactly this kind of advanced counting with PIE, sharing out cookies among kids so that none gets more than 4.

## When stars and bars does not apply

- **Distinct items.** Ten different books among 4 shelves are not stars; each book independently picks a shelf, 4¹⁰ ways.
- **Identical boxes.** Splitting 7 identical cookies into unlabelled piles counts integer partitions, a different problem with no formula as simple as this one.
- **Order within a box matters.** Then the problem involves arrangements, not just counts.

A quick test: if swapping two items changes nothing and swapping two boxes does change something, stars and bars applies.

## Connections

Stars and bars counts are also counts of [lattice paths](/blog/lattice-paths-counting/): a row of stars and bars is a path of right-steps and up-steps. And the formula reappears in [generating functions](/blog/generating-functions-explained/), where C(k + n − 1, n − 1) is the coefficient of xᵏ in 1/(1 − x)ⁿ.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a combinatorics unit with lessons and knowledge checks, plus topic quizzes and a review of missed questions. It sits with our [education and brain-training apps](/apps/category/education-brain/); see the [discrete math hub](/blog/topics/discrete-math/) for the related counting guides.
