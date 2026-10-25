---
{
  "title": "Ramsey Numbers: Why R(3,3) = 6",
  "metaTitle": "Ramsey Numbers Explained: Why R(3,3) = 6",
  "description": "In any group of six people, three are mutual friends or mutual strangers. The proof, why five is not enough, and why Ramsey numbers are so hard to compute.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "ramsey theory", "combinatorics"],
  "primaryKeyword": "ramsey numbers",
  "secondaryKeywords": [
    "r(3,3) = 6 proof",
    "ramsey theory party problem",
    "ramsey's theorem",
    "r(4,4) = 18",
    "r(5,5) bounds"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does a party of 6 always have 3 friends or 3 strangers",
    "coloring of k5 with no monochromatic triangle",
    "why is r(5,5) unknown",
    "ramsey number recursive upper bound"
  ],
  "aiSearchQuestions": [
    "What is a Ramsey number?",
    "Why is R(3,3) equal to 6?",
    "Why are Ramsey numbers so hard to compute?",
    "What is known about R(5,5)?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "pigeonhole-principle-examples",
    "graph-coloring-explained",
    "graph-theory-basics",
    "proof-by-contradiction-explained",
    "big-o-notation-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The Ramsey number R(s, t) is the smallest n such that any red–blue colouring of the edges of Kₙ contains a red Kₛ or a blue Kₜ.",
    "R(3, 3) = 6: in any group of six people, three know each other or three are mutual strangers, and five people are not enough.",
    "The proof is a pigeonhole argument: one person's five relationships include three of the same kind, and those three people force a triangle.",
    "Ramsey's theorem guarantees every R(s, t) exists, with the bound R(s, t) ≤ R(s − 1, t) + R(s, t − 1).",
    "Exact values are known only for small cases: R(4, 4) = 18, while R(5, 5) is known only to lie between 43 and 46."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a Ramsey number?",
      "answer": "R(s, t) is the smallest number of vertices n such that however the edges of the complete graph Kₙ are coloured red and blue, there is a red complete subgraph on s vertices or a blue one on t vertices. In party terms, it is the smallest party guaranteed to contain s mutual acquaintances or t mutual strangers."
    },
    {
      "question": "Why is R(3, 3) = 6?",
      "answer": "Six is enough: pick one person; of the five others, at least three have the same relationship to them, say acquaintances, and among those three, any acquainted pair completes a triangle of acquaintances, while no such pair means the three are mutual strangers. Five is not enough: colour the edges of a pentagon red and its diagonals blue, and there is no single-coloured triangle."
    },
    {
      "question": "Why are Ramsey numbers so hard to compute?",
      "answer": "Checking a candidate n means ruling out every red–blue colouring of Kₙ, and Kₙ has n(n − 1)/2 edges, so there are 2 to that power colourings. For n = 43 that is 2⁹⁰³ colourings, far beyond exhaustive search, and clever methods only go so far."
    },
    {
      "question": "What is known about R(5, 5)?",
      "answer": "Only bounds. It is at least 43, from a colouring of K₄₂ found in 1989, and at most 46, shown in 2024. Paul Erdős's famous joke, quoted by Joel Spencer, was that if aliens demanded R(5, 5) we should set every computer and mathematician on it, but if they demanded R(6, 6) we should try to destroy the aliens."
    }
  ],
  "sources": [
    {
      "title": "Ramsey Number",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/RamseyNumber.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Small Ramsey Numbers (Stanisław Radziszowski), Dynamic Survey DS1",
      "publisher": "The Electronic Journal of Combinatorics",
      "url": "https://www.combinatorics.org/ojs/index.php/eljc/article/view/DS1",
      "accessed": "2026-10-24"
    },
    {
      "title": "Ramsey's theorem",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Ramsey%27s_theorem",
      "accessed": "2026-10-24"
    }
  ]
}
---

Take any six people. Either three of them all know each other, or three of them are all strangers to each other. Always. With five people this can fail. That fact, written R(3, 3) = 6, is the opening example of Ramsey theory, the part of combinatorics whose theme, loosely put, is that any large enough structure contains an orderly piece.

## The party problem in graph form

MathWorld describes the Ramsey number R(s, t) as the solution to the party problem: the minimum number of guests that must be invited so that at least s will know each other or at least t will not know each other.

In graph language, make each guest a vertex of the complete graph Kₙ and colour each edge red if the pair know each other and blue if not. Then R(s, t) is the smallest n such that **every** red–blue colouring of Kₙ's edges contains a red Kₛ or a blue Kₜ. (MathWorld phrases the same thing with cliques and independent sets.)

## Why six people are enough

**Claim.** Every red–blue colouring of K₆ contains a red triangle or a blue triangle.

**Proof.** Pick any vertex v. It has 5 edges, each red or blue. By the [pigeonhole principle](/blog/pigeonhole-principle-examples/), at least ⌈5/2⌉ = 3 of them have the same colour; say v is joined by red edges to x, y and z. (If the three are blue, swap the colours throughout.)

Now look at the three edges xy, yz and xz.

- If any of them is red, say xy, then v, x and y form a red triangle.
- If none of them is red, all three are blue, and x, y and z form a blue triangle.

Either way there is a single-coloured triangle. ∎

The proof is short, but notice how much it uses: a pigeonhole step to find three edges of the same colour, then a case split that forces a triangle in one colour or the other.

## Why five people are not enough

To show R(3, 3) > 5, it is enough to give one colouring of K₅ with no single-coloured triangle. Place five vertices as a regular pentagon. Colour the five sides red and the five diagonals blue.

- The red edges form a 5-cycle, which contains no triangle.
- The blue edges form a five-pointed star, which is also a 5-cycle, with no triangle.

So five guests can avoid both three mutual friends and three mutual strangers, and R(3, 3) = 6 exactly. The Wikipedia article on Ramsey's theorem notes that a lower bound usually requires exhibiting a colouring like this one, called a Ramsey graph; the upper bound needed an argument, which is where techniques such as [proof by contradiction](/blog/proof-by-contradiction-explained/) come in.

## Ramsey's theorem: the numbers always exist

**Ramsey's theorem** says R(s, t) is finite for every s and t: however large the patterns you want to force, some finite party size guarantees one. MathWorld states the theorem; the standard proof also gives an upper bound,

**R(s, t) ≤ R(s − 1, t) + R(s, t − 1).**

The idea copies the R(3, 3) proof: pick a vertex v in a graph with R(s − 1, t) + R(s, t − 1) vertices. It has one fewer neighbour than that total, so either it has at least R(s − 1, t) red neighbours or at least R(s, t − 1) blue ones. In the first case, the red neighbours contain a blue Kₜ, finishing the proof, or a red Kₛ₋₁, which together with v makes a red Kₛ. The second case is symmetric.

Starting from R(2, t) = t (any red edge is a red K₂, otherwise all t vertices are joined in blue), the bound gives R(3, 3) ≤ 3 + 3 = 6, which happens to be exact, and R(3, 4) ≤ R(2, 4) + R(3, 3) = 4 + 6 = 10. The true value is 9: the Wikipedia article on Ramsey's theorem shows how the handshake lemma trims the bound to 9 when both terms are even.

## What is known

| Ramsey number | Value |
| --- | --- |
| R(3, 3) | 6 |
| R(3, 4) | 9 |
| R(4, 4) | 18 |
| R(4, 5) | 25 |
| R(5, 5) | Between 43 and 46 |

R(4, 4) = 18 combines both kinds of argument: the recursive bound gives R(4, 4) ≤ R(3, 4) + R(4, 3) = 18, and the Paley graph on 17 vertices gives a colouring of K₁₇ with no single-coloured K₄, so 17 guests are not enough. The bounds on R(5, 5) come from a colouring of K₄₂ found by Geoffrey Exoo in 1989 and an upper bound of 46 proved by Vigleik Angeltveit and Brendan McKay in 2024. Stanisław Radziszowski's dynamic survey "Small Ramsey Numbers" in *The Electronic Journal of Combinatorics* is the reference that tracks the current values and bounds.

## Why the numbers are so hard

To verify R(5, 5) = 43 by brute force you would need to check that every colouring of K₄₃ contains a single-coloured K₅. K₄₃ has 903 edges, so there are 2⁹⁰³ colourings, a number with 272 digits. Clever search can prune most of them, but the growth is so fast that exact values stop at very small sizes. Joel Spencer records Paul Erdős's joke about it: if an alien force demanded the value of R(5, 5) on pain of destroying the Earth, we should marshal all our computers and mathematicians to find it; if they demanded R(6, 6), we should try to destroy the aliens instead.

## Where Ramsey ideas appear

Edge colourings like these are a cousin of the vertex colourings in [graph colouring](/blog/graph-coloring-explained/), and the method is the one used throughout this article: count, apply pigeonhole, and force a structure.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has units on combinatorics and graph theory, with lessons and knowledge checks. It is one of our [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) collects the series, starting from [graph theory basics](/blog/graph-theory-basics/).
