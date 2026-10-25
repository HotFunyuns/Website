---
{
  "title": "Counting Lattice Paths on a Grid",
  "metaTitle": "Lattice Paths: How to Count Routes on a Grid",
  "description": "How many shortest routes cross a grid? Why the answer is a binomial coefficient, how to count paths through or around a point, and the Pascal link.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "combinatorics", "lattice paths", "binomial coefficients"],
  "primaryKeyword": "lattice paths",
  "secondaryKeywords": [
    "number of paths on a grid",
    "counting shortest paths on a grid",
    "lattice path combinatorics",
    "grid paths avoiding a point",
    "paths through a point on a grid"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how many paths from 0 0 to 4 3",
    "grid paths that must pass through a point",
    "count grid paths with a blocked square",
    "lattice paths and pascal's triangle"
  ],
  "aiSearchQuestions": [
    "How many shortest paths are there on a grid?",
    "Why is the number of lattice paths a binomial coefficient?",
    "How do you count grid paths that avoid a point?",
    "How are lattice paths related to Pascal's triangle?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "binomial-theorem-and-pascals-triangle",
    "catalan-numbers-explained",
    "permutations-vs-combinations",
    "stars-and-bars-explained",
    "inclusion-exclusion-principle",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A shortest path from (0, 0) to (m, n) using right and up steps has m + n steps, and the path is fixed by choosing which m are right steps: C(m + n, m) paths.",
    "Paths through a point multiply: count from the start to the point and from the point to the end.",
    "Paths avoiding a point are all paths minus those through it; several blocked points need inclusion–exclusion.",
    "Filling in a grid by adding the counts from the left and from below reproduces Pascal's triangle, tilted.",
    "Paths that never cross the diagonal are counted by the Catalan numbers."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How many lattice paths are there from (0, 0) to (m, n)?",
      "answer": "C(m + n, m). Every shortest path takes m steps right and n steps up in some order, so it is a string of m R's and n U's. Choosing the positions of the R's among the m + n steps determines the path. From (0, 0) to (4, 3) there are C(7, 3) = 35 paths."
    },
    {
      "question": "How do you count grid paths that must pass through a point?",
      "answer": "Multiply the number of paths from the start to that point by the number from that point to the end. From (0, 0) to (4, 3) through (2, 1): C(3, 1) × C(4, 2) = 3 × 6 = 18 paths."
    },
    {
      "question": "How do you count grid paths that avoid a point?",
      "answer": "Subtract the paths through the point from all paths. Avoiding (2, 1) on the way from (0, 0) to (4, 3) leaves 35 − 18 = 17 paths. With several blocked points, use inclusion–exclusion or fill in the grid point by point."
    },
    {
      "question": "Why does Pascal's triangle appear in lattice paths?",
      "answer": "The last step into any point comes either from the left or from below, so the number of paths to a point is the sum of the counts at those two neighbours. That is Pascal's rule, and the counts along each anti-diagonal of the grid are a row of Pascal's triangle."
    }
  ],
  "sources": [
    {
      "title": "Binomial Coefficients: Lattice Paths (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_counting-binom.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Lattice Path",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/LatticePath.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Picture a city laid out as a perfect grid. You want to walk from one corner of a block of streets to the opposite corner, always heading east or north, never doubling back. How many different routes are there? This is the lattice path problem, and Levin's *Discrete Mathematics: An Open Introduction* uses it as one of four counting problems, alongside subsets and bit strings, that all turn out to have the same answer: a binomial coefficient.

## The setup

A **lattice path** in Levin's sense is one of the shortest possible paths between two points of the grid, moving only horizontally and vertically. Going from (0, 0) to (m, n), that means exactly m steps right (R) and n steps up (U), in some order. MathWorld's entry on lattice paths covers the same counting along with many variations.

## The count: choose the R's

Write each path as a string of its steps. From (0, 0) to (4, 3), one path is RRRRUUU, another is URURURR. Every path is a string of 4 R's and 3 U's, and every such string is a path.

So counting paths means counting strings. A string of length 7 is fixed by choosing which 4 positions hold the R's (the rest are U's):

**Number of paths = C(7, 4) = C(7, 3) = 35.**

In general, the number of lattice paths from (0, 0) to (m, n) is

**C(m + n, m) = (m + n)!/(m! n!).**

It is a combination because the steps are identical: swapping two R's gives the same path. The [permutations versus combinations guide](/blog/permutations-vs-combinations/) has the general reasoning. A 5-by-5 block of streets has C(10, 5) = 252 shortest routes.

## Paths that must pass through a point

To count paths from (0, 0) to (4, 3) that go through (2, 1), split each into two independent pieces:

- (0, 0) to (2, 1): 2 R's and 1 U, so C(3, 1) = 3 ways.
- (2, 1) to (4, 3): 2 R's and 2 U's, so C(4, 2) = 6 ways.

Any first piece can be followed by any second piece, so by the multiplication principle there are **3 × 6 = 18** paths through (2, 1).

## Paths that avoid a point

If the corner (2, 1) is blocked, subtract:

35 − 18 = **17** paths avoid it.

With two blocked points P and Q, subtracting the paths through each removes the paths through both twice, so add those back: all − through P − through Q + through both. This is the [inclusion–exclusion principle](/blog/inclusion-exclusion-principle/) at work.

## Counting by filling in the grid

There is a second method that never needs a formula and handles any shape of obstruction. Every point can be reached only from the point to its left or the point below it, so

**paths to (x, y) = paths to (x − 1, y) + paths to (x, y − 1).**

Fill in the grid from the bottom-left corner, writing 1 along the bottom row and left column (only one way to go straight), and add as you go. For the 4-by-3 grid with (2, 1) blocked, write 0 at the blocked point and keep adding:

| y \ x | 0 | 1 | 2 | 3 | 4 |
| --- | ---: | ---: | ---: | ---: | ---: |
| 3 | 1 | 4 | 7 | 11 | **17** |
| 2 | 1 | 3 | 3 | 4 | 6 |
| 1 | 1 | 2 | 0 | 1 | 2 |
| 0 | 1 | 1 | 1 | 1 | 1 |

The top-right entry is 17, agreeing with the subtraction. Without the block, the same filling-in reproduces Pascal's triangle tilted on its side: each entry is the sum of the two before it, which is exactly Pascal's rule from [the binomial theorem guide](/blog/binomial-theorem-and-pascals-triangle/).

## Paths that stay on one side of the diagonal

On a square grid from (0, 0) to (n, n), how many paths never go above the diagonal line y = x? This extra condition changes the answer from C(2n, n) to the **Catalan number**

C(2n, n)/(n + 1).

For n = 3 that is 20/4 = 5 paths. The proof uses a reflection trick, flipping the part of a "bad" path after it first crosses the diagonal, and it is worked through in [Catalan numbers](/blog/catalan-numbers-explained/).

## In three dimensions

On a 3-D grid, a shortest path from (0, 0, 0) to (a, b, c) is a string of a, b and c steps in three directions, so the count is the multinomial coefficient

(a + b + c)!/(a! b! c!).

From (0, 0, 0) to (2, 2, 2) there are 6!/(2! 2! 2!) = 90 paths.

## Connections

The lattice path count is the same number as the count of subsets of a given size and of bit strings with a given number of 1s, which is the point of Levin's section: one binomial coefficient, several disguises. It also matches [stars and bars](/blog/stars-and-bars-explained/), where U steps play the role of bars between groups of R steps.

## Grid-path exercises

1. Count the paths from (0, 0) to (5, 2). (C(7, 2) = 21.)
2. How many paths from (0, 0) to (6, 6) pass through (3, 3)? (C(6, 3)² = 400.)
3. How many paths from (0, 0) to (3, 3) avoid (1, 1)? (20 − C(2, 1) × C(4, 2) = 20 − 12 = 8.)

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a combinatorics unit, with lessons, knowledge checks and topic quizzes. Find it among our [education apps](/apps/category/education-brain/), and the rest of the counting series in the [discrete math hub](/blog/topics/discrete-math/).
