---
{
  "title": "Catalan Numbers: Where They Appear and How to Compute Them",
  "metaTitle": "Catalan Numbers: Formula, Recurrence and Examples",
  "description": "The Catalan numbers 1, 1, 2, 5, 14, 42 count balanced brackets, mountain paths, binary trees and triangulations. The formula, the recurrence and why they match.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "combinatorics", "catalan numbers", "sequences"],
  "primaryKeyword": "catalan numbers",
  "secondaryKeywords": [
    "catalan number formula",
    "catalan numbers balanced parentheses",
    "dyck paths",
    "catalan number recurrence",
    "number of binary trees with n nodes"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how many ways to triangulate a hexagon",
    "why is the catalan number 2n choose n over n plus 1",
    "reflection principle catalan proof",
    "catalan numbers in computer science"
  ],
  "aiSearchQuestions": [
    "What are the Catalan numbers?",
    "What is the formula for the nth Catalan number?",
    "What problems do Catalan numbers count?",
    "How do you derive the Catalan number formula?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "lattice-paths-counting",
    "binomial-theorem-and-pascals-triangle",
    "recurrence-relations-explained",
    "trees-in-graph-theory",
    "generating-functions-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The Catalan numbers begin 1, 1, 2, 5, 14, 42, 132, 429, 1430 and are given by Cₙ = C(2n, n)/(n + 1).",
    "They count balanced strings of n pairs of brackets, mountain paths that never dip below the start, binary trees with n nodes and triangulations of a polygon with n + 2 sides.",
    "They satisfy the recurrence Cₙ₊₁ = C₀Cₙ + C₁Cₙ₋₁ + ⋯ + CₙC₀, from splitting a structure at its first point of return.",
    "The reflection principle gives the formula: all paths minus bad paths, C(2n, n) − C(2n, n + 1).",
    "When a counting problem gives 1, 2, 5, 14 for small cases, suspect Catalan numbers and look for a bijection to brackets."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What are the Catalan numbers?",
      "answer": "A sequence, 1, 1, 2, 5, 14, 42, 132, 429, …, that counts many recursively built structures: balanced bracket strings, binary trees, polygon triangulations and paths that stay on one side of a diagonal. The nth term is C(2n, n)/(n + 1)."
    },
    {
      "question": "What is the formula for the nth Catalan number?",
      "answer": "Cₙ = (1/(n + 1)) · C(2n, n) = (2n)!/((n + 1)! n!). For n = 4: C(8, 4)/5 = 70/5 = 14. An equivalent form is C(2n, n) − C(2n, n + 1), which comes from the reflection principle."
    },
    {
      "question": "How many ways can a hexagon be divided into triangles?",
      "answer": "14. A convex polygon with n + 2 sides can be triangulated by non-crossing diagonals in Cₙ ways, and a hexagon has 6 = 4 + 2 sides, so the answer is C₄ = 14. This is Euler's polygon division problem."
    },
    {
      "question": "Where do Catalan numbers appear in computer science?",
      "answer": "They count the binary trees with n nodes, the ways to fully parenthesise a product of n + 1 factors, the valid sequences of n pushes and n pops on a stack, and the balanced strings of n bracket pairs a parser can accept."
    }
  ],
  "sources": [
    {
      "title": "Catalan Number",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/CatalanNumber.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "A000108: Catalan numbers",
      "publisher": "The On-Line Encyclopedia of Integer Sequences (OEIS)",
      "url": "https://oeis.org/A000108",
      "accessed": "2026-10-24"
    },
    {
      "title": "Binomial Coefficients: Lattice Paths (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_counting-binom.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Some sequences turn up so often that recognising them is a skill in itself. The Catalan numbers are a prime example in combinatorics:

1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, …

They count brackets, paths, trees and triangulations, problems that look unrelated until you see that each is built the same recursive way. The OEIS lists the sequence as A000108 with the formula Cₙ = C(2n, n)/(n + 1).

## Four things they count

Take n = 3, where the answer is C₃ = 5.

**Balanced brackets.** Strings of 3 opening and 3 closing brackets in which no prefix has more closers than openers:

((())) · (()()) · (())() · ()(()) · ()()()

**Mountain paths (Dyck paths).** Paths of 3 up-steps and 3 down-steps that never go below the starting level. Replace "(" with up and ")" with down and the five bracket strings become the five paths. This is the same structure, which is the point.

**Binary trees.** Binary trees with 3 nodes, where each node has an optional left child and an optional right child: there are 5 shapes.

**Triangulations.** A convex pentagon (3 + 2 = 5 sides) can be cut into triangles by non-crossing diagonals in 5 ways, one for each vertex the two diagonals can share. MathWorld introduces the Catalan numbers with this question, Euler's polygon division problem.

| n | Cₙ | Bracket strings with n pairs | Polygon with n + 2 sides |
| ---: | ---: | --- | --- |
| 0 | 1 | the empty string | a 2-gon, by convention |
| 1 | 1 | () | a triangle: already one triangle |
| 2 | 2 | (()), ()() | a square: 2 diagonals to choose from |
| 3 | 5 | five strings, above | a pentagon: 5 |
| 4 | 14 | 14 strings | a hexagon: 14 |

MathWorld's entry lists more: ballot sequences in which the first candidate never trails, full binary trees, and the ways to bracket a product of n + 1 factors such as ((ab)c)d.

## The formula, from the reflection principle

Count mountain paths with n up-steps and n down-steps.

1. **All paths.** Without the "stay above the start" rule, choose which n of the 2n steps go up: C(2n, n). This is the lattice-path count from Levin's *Discrete Mathematics: An Open Introduction* and from [counting lattice paths](/blog/lattice-paths-counting/).
2. **Bad paths.** A path that dips below the start touches level −1 somewhere. Reflect the part of the path after its first touch of −1: ups become downs and downs become ups. The reflected path ends at −2 instead of 0, so it has n − 1 ups and n + 1 downs. Every path ending at −2 must touch −1, and reflecting back recovers the original, so bad paths match paths with n + 1 downs one-to-one: C(2n, n + 1) of them.
3. **Good paths.** Cₙ = C(2n, n) − C(2n, n + 1).

Simplifying, C(2n, n + 1) = C(2n, n) · n/(n + 1), so

**Cₙ = C(2n, n) · 1/(n + 1) = (2n)!/((n + 1)! n!).**

**Check:** n = 4 gives C(8, 4) − C(8, 5) = 70 − 56 = 14, and 70/5 = 14.

## The recurrence

Every non-empty balanced string starts with "(" and has a first matching ")". Inside that pair sits a balanced string with some k pairs; after it comes a balanced string with the remaining n − k pairs. Summing over k:

**Cₙ₊₁ = C₀Cₙ + C₁Cₙ₋₁ + ⋯ + CₙC₀.**

For example, C₄ = C₀C₃ + C₁C₂ + C₂C₁ + C₃C₀ = 5 + 2 + 2 + 5 = 14. MathWorld attributes this recurrence to Segner (1761), in his solution to Euler's problem. It is a convolution, the kind of recurrence that [generating functions](/blog/generating-functions-explained/) are designed to solve, and it is not the linear constant-coefficient kind covered in [recurrence relations](/blog/recurrence-relations-explained/).

The same split works for every Catalan family. A binary tree with n + 1 nodes is a root with a left subtree of k nodes and a right subtree of n − k nodes. A triangulated polygon splits at the triangle containing one fixed edge. Recognising that "first return" decomposition is how you prove a new problem is Catalan.

## Growth

The numbers grow roughly like 4ⁿ divided by a power of n: each term is a little under four times the previous one for large n. C₁₀ = 16,796 and C₂₀ = 6,564,120,420. A sequence that more than doubles at each step quickly outpaces brute-force listing, which is why the formula matters.

## Recognising a Catalan problem

1. Compute the first few cases by hand. If you get 1, 2, 5, 14, the Catalan numbers are the prime suspect.
2. Look for a bijection with bracket strings: what plays the role of "(" and ")"?
3. Check that your structure splits at a "first return" into two smaller structures of the same kind.

**Practice.** How many ways can 8 people seated around a round table shake hands in 4 simultaneous pairs with no arms crossing? (C₄ = 14.) How many sequences of 4 pushes and 4 pops on an empty stack never pop from an empty stack? (Also 14.)

Counting problems of this kind belong to the combinatorics unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), and recurrences have a unit of their own. Find it among our [education apps](/apps/category/education-brain/), and see the [discrete math hub](/blog/topics/discrete-math/) for the counting and graph guides that connect to these structures, including [trees](/blog/trees-in-graph-theory/).
