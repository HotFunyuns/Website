---
{
  "title": "Hamiltonian Paths and Cycles: Why No Simple Test Exists",
  "metaTitle": "Hamiltonian Path and Cycle: Definitions and Tests",
  "description": "A Hamiltonian cycle visits every vertex exactly once. Why no simple test exists, the sufficient conditions that help, and how to rule one out.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "hamiltonian cycles", "np-complete"],
  "primaryKeyword": "hamiltonian path",
  "secondaryKeywords": [
    "hamiltonian cycle",
    "hamiltonian vs eulerian",
    "dirac's theorem",
    "ore's theorem",
    "gray code hamiltonian cycle"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to tell if a graph has a hamiltonian cycle",
    "why is the hamiltonian cycle problem np complete",
    "number of hamiltonian cycles in a complete graph",
    "show a graph has no hamiltonian cycle"
  ],
  "aiSearchQuestions": [
    "What is a Hamiltonian path?",
    "What is the difference between a Hamiltonian cycle and an Euler circuit?",
    "Is there a test for whether a graph has a Hamiltonian cycle?",
    "How do you prove a graph has no Hamiltonian cycle?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "euler-path-vs-euler-circuit",
    "graph-theory-basics",
    "bipartite-graphs-explained",
    "big-o-notation-explained",
    "number-bases-and-binary",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A Hamiltonian path visits every vertex exactly once; a Hamiltonian cycle also returns to its start.",
    "Unlike Euler circuits, there is no known efficient test: deciding whether a graph has a Hamiltonian cycle is NP-complete.",
    "Dirac's theorem gives a sufficient condition: if every one of n ≥ 3 vertices has degree at least n/2, a Hamiltonian cycle exists.",
    "To rule one out, look for a vertex of degree 1, a vertex whose removal disconnects the graph, or a bipartite graph with unequal sides.",
    "The complete graph Kₙ has (n − 1)!/2 Hamiltonian cycles, which is why trying them all is hopeless for large n."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a Hamiltonian path?",
      "answer": "A path in a graph that visits every vertex exactly once. If it can be closed up by an edge back to its starting vertex, giving a cycle through every vertex, that cycle is a Hamiltonian cycle and the graph is called Hamiltonian."
    },
    {
      "question": "What is the difference between Hamiltonian and Eulerian?",
      "answer": "An Euler circuit uses every edge exactly once; a Hamiltonian cycle visits every vertex exactly once. Euler circuits have a simple test, every vertex of even degree in a connected graph. Hamiltonian cycles have no known efficient test at all."
    },
    {
      "question": "How do you show a graph has no Hamiltonian cycle?",
      "answer": "Find an obstruction. A vertex of degree 1 cannot lie on a cycle. A vertex whose removal disconnects the graph means a cycle would have to pass through it twice. A bipartite graph with unequal sides has none, because a cycle alternates sides and must use each side equally."
    },
    {
      "question": "What does Dirac's theorem say?",
      "answer": "If a simple graph has n ≥ 3 vertices and every vertex has degree at least n/2, then it has a Hamiltonian cycle. It is a sufficient condition only: a cycle graph Cₙ is Hamiltonian even though its vertices have degree 2."
    }
  ],
  "sources": [
    {
      "title": "Hamiltonian Cycle",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/HamiltonianCycle.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Traversals: Eulerian and Hamiltonian Graphs (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-traversals.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Dirac's Theorem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/DiracsTheorem.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "12.7 Hamilton Cycles (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/12-7-hamilton-cycles",
      "accessed": "2026-10-24"
    },
    {
      "title": "Ore's Theorem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/OresTheorem.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "12.9 Traveling Salesperson Problem (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/12-9-traveling-salesperson-problem",
      "accessed": "2026-10-24"
    }
  ]
}
---

Euler's question was whether you can travel along every **edge** of a graph exactly once, and it has a one-line answer based on degrees. Change "edge" to "vertex" and you get the Hamiltonian question, which sounds almost the same and turns out to have no known efficient answer at all.

## Visiting every vertex once

- A **Hamiltonian path** visits every vertex of a graph exactly once.
- A **Hamiltonian cycle** is a Hamiltonian path whose last vertex is adjacent to its first, so it can close into a cycle through every vertex.
- A graph with a Hamiltonian cycle is **Hamiltonian**.

Edges may be left unused; only vertices are restricted. That is the reverse of the [Euler path](/blog/euler-path-vs-euler-circuit/) rules, where edges are used once and vertices may repeat.

## Why there is no simple test

For Euler circuits, counting odd-degree vertices settles everything. Nothing like that is known for Hamiltonian cycles. *Applied Discrete Structures* says it directly: unfortunately, a simple condition that characterises Hamiltonian graphs doesn't exist. Being connected is necessary but not enough, and the book invites you to find a connected graph on four vertices that is not Hamiltonian (a star, one centre joined to three others, is one).

MathWorld records the stronger, formal version: the general problem of finding a Hamiltonian cycle is **NP-complete**, and no algorithm running in polynomial time is known for general graphs. *Applied Discrete Structures* adds that simple search algorithms exist but take far too long on large graphs, and that it is widely believed no fast algorithm exists. The book makes this precise in terms of growth rates: the known search methods take more than polynomial time, the kind of comparison described in [big-O notation](/blog/big-o-notation-explained/).

The size of the search space shows why brute force fails. In the complete graph Kₙ, a Hamiltonian cycle is an ordering of the vertices up to the starting point and direction, so there are (n − 1)!/2 of them. For n = 10 that is 181,440; for n = 20 it is about 6 × 10¹⁶.

## Conditions that guarantee a cycle

Some sufficient conditions are known. They say "yes" when they apply and nothing when they do not.

**Dirac's theorem (1952).** If a simple graph has n ≥ 3 vertices and every vertex has degree at least n/2, the graph has a Hamiltonian cycle.

**Ore's theorem.** If a simple graph has n ≥ 3 vertices and, for every pair of non-adjacent vertices u and v, deg(u) + deg(v) ≥ n, the graph has a Hamiltonian cycle.

Ore's condition is weaker than Dirac's, since Dirac's degrees give every pair a sum of at least n, so Ore's theorem applies to more graphs. Neither is necessary: the cycle Cₙ is Hamiltonian, yet every vertex has degree 2, far below n/2 for large n. MathWorld has short entries stating both theorems.

## Ways to prove there is no cycle

Since no general test exists, proving a graph is *not* Hamiltonian means finding a specific obstruction.

1. **A vertex of degree 0 or 1.** A cycle enters and leaves every vertex, so every vertex needs degree at least 2.
2. **A degree-2 vertex forces its edges.** If v has degree 2, both its edges must be in the cycle. Follow the forced edges; if they close a cycle too early, or force a third edge at some vertex, there is no Hamiltonian cycle.
3. **A cut vertex.** If removing one vertex disconnects the graph, a cycle would have to pass through that vertex twice to visit both sides.
4. **Bipartite with unequal sides.** In a [bipartite graph](/blog/bipartite-graphs-explained/) every cycle alternates between the two sides, so it uses equally many vertices from each. If the sides have different sizes, no cycle can cover all the vertices. For example, K₂,₃ has no Hamiltonian cycle.

A well-known non-Hamiltonian graph is the Petersen graph, which has 10 vertices, all of degree 3. MathWorld lists it among the exactly five known connected vertex-transitive graphs without a Hamiltonian cycle.

## A useful Hamiltonian cycle: the Gray code

*Applied Discrete Structures* gives an engineering example. Take the n-cube: its vertices are the 2ⁿ bit strings of length n, joined when they differ in exactly one bit. A Hamiltonian cycle of the n-cube is a list of all n-bit strings in which each differs from the next in one position, and it is called a **Gray code**. For n = 3:

000, 001, 011, 010, 110, 111, 101, 100, then back to 000.

The book's application is an analogue-to-digital dial whose sectors are labelled so that turning between neighbours changes only one switch, which avoids misreadings. The recursive construction: list the Gray code for n − 1 with a 0 in front, then the same list reversed with a 1 in front. Bit strings themselves are covered in [number bases and binary](/blog/number-bases-and-binary/).

## Related problems

- **The travelling salesperson problem** asks for the *shortest* Hamiltonian cycle in a weighted complete graph. OpenStax's *Contemporary Mathematics* works small cases by brute force, listing every distinct Hamilton cycle of a complete graph, and by the greedy nearest neighbour method.
- **Knight's tours** ask for a Hamiltonian path on the graph of chessboard squares joined by knight moves.

## Is it Hamiltonian?

1. Does K₄ have a Hamiltonian cycle? (Yes; it has (4 − 1)!/2 = 3 of them.)
2. Does a tree with at least two vertices ever have a Hamiltonian cycle? (No: trees have no cycles at all.)
3. Does the 3-cube have a Hamiltonian cycle? (Yes: the Gray code above.)

Hamiltonian and Eulerian graphs belong to the graph theory unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). It is one of our [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) links the other graph guides, starting with [graph theory basics](/blog/graph-theory-basics/).
