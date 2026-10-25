---
{
  "title": "Dijkstra's Algorithm Worked by Hand on a Small Graph",
  "metaTitle": "Dijkstra's Algorithm by Hand: A Worked Example",
  "description": "Dijkstra's algorithm finds shortest paths from one vertex. The table method step by step, recovering the route, and why negative weights break it.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "algorithms", "shortest paths"],
  "primaryKeyword": "dijkstras algorithm",
  "secondaryKeywords": [
    "dijkstra's algorithm example",
    "shortest path algorithm",
    "dijkstra's algorithm step by step",
    "single source shortest path",
    "dijkstra negative weights"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to do dijkstra's algorithm by hand with a table",
    "why dijkstra fails with negative edge weights",
    "how to find the path not just the distance in dijkstra",
    "dijkstra vs minimum spanning tree"
  ],
  "aiSearchQuestions": [
    "How does Dijkstra's algorithm work?",
    "How do you run Dijkstra's algorithm by hand?",
    "Why doesn't Dijkstra's algorithm work with negative weights?",
    "What is the difference between Dijkstra's algorithm and a minimum spanning tree?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "minimum-spanning-tree-explained",
    "graph-theory-basics",
    "big-o-notation-explained",
    "adjacency-matrix-explained",
    "trees-in-graph-theory",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Dijkstra's algorithm finds the shortest distance from one start vertex to every other vertex in a graph with nonnegative edge weights.",
    "Repeatedly finalise the unvisited vertex with the smallest tentative distance, then update its neighbours' tentative distances.",
    "Record each vertex's predecessor when its distance improves, so the shortest route can be traced back at the end.",
    "It is correct because, with nonnegative weights, no later route can undercut the smallest tentative distance.",
    "Negative edge weights break that reasoning, so Dijkstra's algorithm can give wrong answers on graphs that have them."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does Dijkstra's algorithm do?",
      "answer": "It computes the length of the shortest path from a chosen start vertex to every other vertex of a weighted graph, provided all edge weights are nonnegative. With predecessor records, it also gives the routes themselves, which together form a shortest-path tree."
    },
    {
      "question": "How do you run Dijkstra's algorithm by hand?",
      "answer": "Give the start distance 0 and every other vertex infinity. Repeatedly pick the unvisited vertex with the smallest distance, mark it final, and for each neighbour check whether going through it is shorter; if so, update the neighbour's distance and predecessor. Stop when every vertex is final."
    },
    {
      "question": "Why doesn't Dijkstra's algorithm work with negative weights?",
      "answer": "It finalises a vertex on the assumption that any other route to it would be at least as long, because every remaining edge adds a nonnegative amount. A negative edge discovered later could make a longer-looking route shorter, after the vertex has already been finalised."
    },
    {
      "question": "Is Dijkstra's shortest-path tree the same as a minimum spanning tree?",
      "answer": "No. Dijkstra's tree minimises the distance from the start to each vertex individually. A minimum spanning tree minimises the total weight of all edges. On the same graph they can contain different edges."
    }
  ],
  "sources": [
    {
      "title": "Shortest Paths (Algorithms, 4th edition, Sedgewick and Wayne)",
      "publisher": "Princeton University",
      "url": "https://algs4.cs.princeton.edu/44sp/",
      "accessed": "2026-10-24"
    },
    {
      "title": "Dijkstra's Algorithm",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/DijkstrasAlgorithm.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Graph Optimization (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-graph-optimization.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

A recurring graph question is the shortest route from one place to every other place. For graphs whose edge weights are distances, times or costs that cannot be negative, a standard method is Dijkstra's algorithm. Sedgewick and Wayne's *Algorithms* describes it as solving the single-source shortest-paths problem in edge-weighted graphs with nonnegative weights.

## The idea

Grow a set of vertices whose shortest distance is known for certain, starting from the source. At each step, the next vertex to finalise is the one with the smallest **tentative** distance among those not yet final. Then use it to improve the tentative distances of its neighbours, an operation usually called **relaxing** its edges.

## The example graph

Undirected, with these weights:

| Edge | SA | SB | AB | AC | BC | BD | CD | CT | DT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Weight | 4 | 2 | 1 | 5 | 8 | 10 | 2 | 6 | 2 |

Goal: shortest distances from S to every vertex, and the shortest route from S to T.

## Step by step

Start with distance 0 at S and ∞ everywhere else. Each row shows the tentative distances after the vertex in the first column is finalised and its edges relaxed; a value in brackets is the predecessor that produced it.

| Finalise | S | A | B | C | D | T |
| --- | --- | --- | --- | --- | --- | --- |
| Start | 0 | ∞ | ∞ | ∞ | ∞ | ∞ |
| S (0) | **0** | 4 (S) | 2 (S) | ∞ | ∞ | ∞ |
| B (2) | | 3 (B) | **2** | 10 (B) | 12 (B) | ∞ |
| A (3) | | **3** | | 8 (A) | 12 (B) | ∞ |
| C (8) | | | | **8** | 10 (C) | 14 (C) |
| D (10) | | | | | **10** | 12 (D) |
| T (12) | | | | | | **12** |

Notes on the key steps:

- **After S:** A gets 4 and B gets 2. B is smaller, so B is finalised next.
- **After B:** going S → B → A costs 2 + 1 = 3, which beats 4, so A improves to 3 with predecessor B. C gets 2 + 8 = 10 and D gets 2 + 10 = 12.
- **After A:** S → B → A → C costs 3 + 5 = 8, beating 10.
- **After C:** D improves to 8 + 2 = 10, beating 12; T gets 8 + 6 = 14.
- **After D:** T improves to 10 + 2 = 12.

Final distances from S: A = 3, B = 2, C = 8, D = 10, T = 12.

## Recovering the route

Follow the predecessors back from T: T came from D, D from C, C from A, A from B, B from S. So the shortest route is

S → B → A → C → D → T, with length 2 + 1 + 5 + 2 + 2 = **12**.

The predecessor links for all vertices together form a **shortest-path tree** rooted at S: every vertex hangs from the vertex that last improved it.

Notice the direct-looking route S → A → C → T has length 4 + 5 + 6 = 15. The algorithm found a route with more edges and less total weight, which is the whole point of weighting.

## Why it is correct

When a vertex u is chosen, it has the smallest tentative distance among all unfinished vertices, say d. Any other route to u must leave the finished set at some point, through an unfinished vertex whose tentative distance is already at least d, and then continue along edges whose weights are nonnegative. So that route has length at least d, and d is truly the shortest. A formal version of this argument is an induction on the number of finalised vertices.

The word **nonnegative** in that argument is essential. Sedgewick and Wayne restrict attention to nonnegative weights for exactly this reason.

## What goes wrong with negative weights

Take three vertices: S–A with weight 2, S–B with weight 3, and a directed edge B → A with weight −2. Dijkstra finalises A at distance 2 first, since 2 < 3. But the route S → B → A has length 3 + (−2) = 1, shorter, and it is discovered too late. Graphs with negative weights need other algorithms, such as Bellman–Ford, which Sedgewick and Wayne also present.

## Dijkstra versus a minimum spanning tree

Both algorithms grow a tree greedily, and both look alike on paper, but they optimise different things. Dijkstra's tree minimises the distance from the source to each vertex. A [minimum spanning tree](/blog/minimum-spanning-tree-explained/) minimises the total weight of the whole network. A triangle shows the difference: vertices S, A and B with SA = 2, SB = 2 and AB = 1. The minimum spanning tree is AB plus one of the 2-edges, total weight 3. Dijkstra's tree from S uses SA and SB, total weight 4, because that puts both A and B at distance 2, while the spanning tree would leave one of them at distance 3. Prim's algorithm and Dijkstra's differ in a single line: Prim compares the weight of the edge alone, Dijkstra compares the distance from the source.

## How fast is it?

With a priority queue to find the smallest tentative distance, Sedgewick and Wayne show the running time grows in proportion to E log V in the worst case, for E edges and V vertices; see [big-O notation](/blog/big-o-notation-explained/) for what that means. Storing the graph as adjacency lists, covered in [adjacency matrices and lists](/blog/adjacency-matrix-explained/), keeps the relaxation step efficient.

## Run it yourself

Run the algorithm from A on the example graph. (Distances: B 1, S 3, C 5, D 7, T 9.) Then add an edge S–T of weight 11 and run it from S again. Does the route to T change?

MathWorld describes the algorithm as constructing a shortest-path tree from the initial vertex to every other vertex, and *Applied Discrete Structures* sets weighted graphs among other graph optimisation problems such as the travelling salesman problem and maximum flow. Graphs belong to the graph theory unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). Find it with our [education apps](/apps/category/education-brain/), and the full graph sequence in the [discrete math hub](/blog/topics/discrete-math/), beginning with [graph theory basics](/blog/graph-theory-basics/).
