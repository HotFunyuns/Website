---
{
  "title": "Minimum Spanning Trees: Kruskal's and Prim's Algorithms by Hand",
  "metaTitle": "Minimum Spanning Tree: Kruskal and Prim by Hand",
  "description": "How to connect every vertex of a weighted graph at least total cost. Kruskal's and Prim's algorithms worked step by step, and the cut property behind both.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "algorithms", "spanning trees"],
  "primaryKeyword": "minimum spanning tree",
  "secondaryKeywords": [
    "kruskal's algorithm",
    "prim's algorithm",
    "kruskal vs prim",
    "cut property minimum spanning tree",
    "spanning tree weighted graph"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "kruskal's algorithm step by step example",
    "prim's algorithm by hand",
    "is the minimum spanning tree unique",
    "difference between minimum spanning tree and shortest path"
  ],
  "aiSearchQuestions": [
    "What is a minimum spanning tree?",
    "How does Kruskal's algorithm work?",
    "How does Prim's algorithm work?",
    "Is a minimum spanning tree the same as a shortest path tree?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "trees-in-graph-theory",
    "dijkstras-algorithm-explained",
    "graph-theory-basics",
    "big-o-notation-explained",
    "adjacency-matrix-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A minimum spanning tree connects every vertex of a connected weighted graph using the smallest possible total edge weight; it always has n − 1 edges.",
    "Kruskal's algorithm adds edges from lightest to heaviest, skipping any edge that would form a cycle.",
    "Prim's algorithm grows one tree from a starting vertex, always adding the lightest edge that reaches a new vertex.",
    "Both are correct because of the cut property: the lightest edge crossing any division of the vertices belongs to a minimum spanning tree.",
    "A minimum spanning tree minimises total weight, not the distance between any particular pair of vertices; that is a shortest-path problem."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a minimum spanning tree?",
      "answer": "In a connected graph whose edges have weights, a spanning tree uses all the vertices and just enough edges to connect them without cycles. A minimum spanning tree is a spanning tree whose total edge weight is as small as possible."
    },
    {
      "question": "How does Kruskal's algorithm work?",
      "answer": "Sort the edges from lightest to heaviest. Go through them in order, adding each edge unless it would create a cycle with the edges already chosen. Stop after n − 1 edges. The chosen edges form a minimum spanning tree."
    },
    {
      "question": "What is the difference between Kruskal's and Prim's algorithms?",
      "answer": "Kruskal's looks at edges globally, in weight order, and may build several separate pieces that merge later. Prim's grows a single tree from one vertex, always adding the cheapest edge to a vertex not yet in the tree. Both produce a minimum spanning tree."
    },
    {
      "question": "Is a minimum spanning tree unique?",
      "answer": "It is when all edge weights are different. With repeated weights there can be several minimum spanning trees, all with the same total weight. Either algorithm may return any one of them, depending on how ties are broken."
    }
  ],
  "sources": [
    {
      "title": "Minimum Spanning Trees (Algorithms, 4th edition, Sedgewick and Wayne)",
      "publisher": "Princeton University",
      "url": "https://algs4.cs.princeton.edu/43mst/",
      "accessed": "2026-10-24"
    },
    {
      "title": "Spanning Trees (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-spanning-trees.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Kruskal's Algorithm",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/KruskalsAlgorithm.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Suppose five sites must be joined by cable, and each possible link has a cost. You need every site connected, directly or through others, at the lowest total cost. Any cheapest solution will contain no cycle, because a cycle has a link you could remove without disconnecting anything. So the answer is a tree that spans every site: a **minimum spanning tree**. Two classic algorithms find one by hand, and both are greedy, making the locally cheapest choice at each step, which here happens to give the best overall answer.

## The setup

A **weighted graph** has a number on each edge. A **spanning tree** of a connected graph is a [tree](/blog/trees-in-graph-theory/) that includes every vertex, so with n vertices it has exactly n − 1 edges. A **minimum spanning tree** (MST) is a spanning tree with the smallest possible total weight.

Throughout, use this graph with vertices A, B, C, D, E:

| Edge | AC | BC | DE | AB | BD | BE | CD | CE |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Weight | 1 | 2 | 2 | 4 | 5 | 6 | 8 | 10 |

## Kruskal's algorithm

Sedgewick and Wayne's *Algorithms* describes it in a sentence: process the edges in order of weight, from smallest to largest, taking each edge that does not form a cycle with the edges already taken, and stop after adding V − 1 edges.

| Step | Edge (weight) | Decision | Pieces afterwards |
| ---: | --- | --- | --- |
| 1 | AC (1) | Add | {A, C}, {B}, {D}, {E} |
| 2 | BC (2) | Add | {A, B, C}, {D}, {E} |
| 3 | DE (2) | Add | {A, B, C}, {D, E} |
| 4 | AB (4) | Skip: A and B already connected, so it would close a cycle | unchanged |
| 5 | BD (5) | Add | {A, B, C, D, E} |

Four edges for five vertices, so stop. The MST is {AC, BC, DE, BD} with total weight 1 + 2 + 2 + 5 = **10**.

The only judgement needed is the cycle check, which is a question of whether the two ends of an edge are already in the same piece. Tracking the pieces, as in the last column, makes it mechanical.

## Prim's algorithm

Prim's algorithm, in the same book's words, works by attaching a new edge to a single growing tree at each step. Start anywhere, and repeatedly add the cheapest edge joining the tree to a vertex outside it.

Start at A.

| Step | Tree so far | Cheapest edge leaving the tree | Add |
| ---: | --- | --- | --- |
| 1 | {A} | AC (1), AB (4) | AC |
| 2 | {A, C} | BC (2), AB (4), CD (8), CE (10) | BC |
| 3 | {A, B, C} | BD (5), BE (6), CD (8), CE (10) | BD |
| 4 | {A, B, C, D} | DE (2), BE (6), CE (10) | DE |

Same tree, same total, 10. Starting from a different vertex can change the order in which edges are added, but not the total weight.

## Why greedy works: the cut property

Split the vertices into any two groups. Sedgewick and Wayne's **cut property** says that, with all edge weights distinct, the lightest edge crossing between the two groups is in the MST.

**Why.** Suppose an MST T did not contain that lightest crossing edge e. Adding e to T creates a cycle, and that cycle must cross between the groups a second time, at some other edge f, which is heavier than e. Swap f out and e in: the result is still a spanning tree, and it weighs less than T, a contradiction.

Both algorithms only ever add an edge that is lightest across some cut. In Prim's, the cut is "tree versus everything else". In Kruskal's, an added edge is lightest across the cut separating one of its pieces from the rest, since every lighter edge has already been considered. That is why both are correct.

## Uniqueness and ties

If all weights are distinct, the MST is unique. With ties, there may be several minimum spanning trees, all of the same weight, and the algorithms return one depending on how ties are broken. In the example, BC and DE both weigh 2, but they never compete, so the MST is the same either way.

## Choosing between them by hand

| | Kruskal | Prim |
| --- | --- | --- |
| Works from | The sorted edge list | A growing tree |
| Main check | Would this edge make a cycle? | Which edge leaving the tree is cheapest? |
| Convenient when | Edges are listed in a table | The graph is drawn, or given as a matrix |

For computers, the efficiency depends on data structures: Kruskal needs sorting plus a structure to track the pieces, and Prim a priority queue. The [adjacency matrix guide](/blog/adjacency-matrix-explained/) covers the representations, and [big-O notation](/blog/big-o-notation-explained/) the language used to compare them.

## A common confusion: MST versus shortest paths

The MST minimises the **total** weight of the network. It does not give the shortest route between two particular vertices. In the example, the MST path from A to E is A–C–B–D–E with length 1 + 2 + 5 + 2 = 10, but the route A–C–B–E, which uses the non-tree edge BE, has length 1 + 2 + 6 = 9. For routes from one starting point, the right tool is [Dijkstra's algorithm](/blog/dijkstras-algorithm-explained/), which builds a different kind of tree.

## Spanning-tree exercises

1. Find an MST of the example graph if edge BD is removed. (AC, BC, DE, then BE at 6: total 11.)
2. Show that in any connected graph, the single lightest edge is in some MST.
3. A connected graph has 12 vertices. How many edges does each of its spanning trees have? (11.)

*Applied Discrete Structures* and MathWorld's entry on Kruskal's algorithm cover the same material from the mathematics side. [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) ends its sequence of units with graph theory, taught through lessons with knowledge checks. See it with our other [education apps](/apps/category/education-brain/), or continue in the [discrete math hub](/blog/topics/discrete-math/).
