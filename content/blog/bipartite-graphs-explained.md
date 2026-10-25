---
{
  "title": "Bipartite Graphs: The Two-Colour Test and the Odd-Cycle Rule",
  "metaTitle": "Bipartite Graphs: Two-Colour Test and Odd Cycles",
  "description": "A graph is bipartite when its vertices split into two sides with every edge crossing between. How to test it, why odd cycles rule it out, and matchings.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "bipartite graphs", "matchings"],
  "primaryKeyword": "bipartite graph",
  "secondaryKeywords": [
    "how to tell if a graph is bipartite",
    "bipartite graph odd cycle",
    "complete bipartite graph",
    "hall's marriage theorem",
    "two colorable graph"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "is every tree bipartite",
    "why can't a bipartite graph have an odd cycle",
    "bipartite matching job assignment",
    "number of edges in complete bipartite graph"
  ],
  "aiSearchQuestions": [
    "What is a bipartite graph?",
    "How do you check whether a graph is bipartite?",
    "Why does an odd cycle mean a graph is not bipartite?",
    "What is Hall's marriage theorem?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "graph-coloring-explained",
    "graph-theory-basics",
    "hamiltonian-path-explained",
    "planar-graphs-and-eulers-formula",
    "trees-in-graph-theory",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A graph is bipartite if its vertices split into two sets with every edge joining a vertex in one set to a vertex in the other.",
    "Bipartite graphs are exactly the graphs that can be properly colored with two colors.",
    "A graph is bipartite if and only if it has no cycle of odd length; finding one odd cycle proves it is not.",
    "To test a graph, color a vertex, give all its neighbours the other color, and continue; a clash means it is not bipartite.",
    "Bipartite graphs model assignments, such as workers to jobs, and Hall's theorem says when everyone on one side can be matched."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a bipartite graph?",
      "answer": "A graph whose vertices can be divided into two groups so that every edge goes between the groups and none stays inside a group. Students and the courses they take, or workers and the jobs they can do, naturally form bipartite graphs."
    },
    {
      "question": "How do you tell if a graph is bipartite?",
      "answer": "Try to 2-color it. Give any vertex color A, all its neighbours color B, their neighbours color A, and so on through each connected component. If you never have to give two adjacent vertices the same color, the graph is bipartite; a clash exposes an odd cycle and shows it is not."
    },
    {
      "question": "Why can't a bipartite graph contain an odd cycle?",
      "answer": "Walking around a cycle in a bipartite graph, every step crosses from one side to the other. To return to the starting vertex, on its original side, you must take an even number of steps. So every cycle has even length."
    },
    {
      "question": "Are trees bipartite?",
      "answer": "Yes. A tree has no cycles at all, so it certainly has no odd cycles. Concretely, choose a root and put vertices at even depth on one side and odd depth on the other; every edge joins consecutive depths."
    }
  ],
  "sources": [
    {
      "title": "Bipartite Graph",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/BipartiteGraph.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Matching in Bipartite Graphs (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_matchings.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Coloring (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_coloring.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Some networks connect two different kinds of thing: applicants and jobs, students and courses, customers and products, actors and films. Edges only ever join one kind to the other, never two of the same kind. Graphs with that shape are **bipartite**, and they have a clean characterisation, a fast test, and an important theorem about matching.

## Two sides, edges only between them

A graph is **bipartite** if its vertex set can be split into two disjoint sets, often called X and Y, so that every edge has one end in X and one end in Y. No edge joins two vertices on the same side.

The **complete bipartite graph** Kₘ,ₙ has m vertices on one side, n on the other, and every possible edge between the sides, mn edges in all. K₃,₃ is the graph behind the classic puzzle of joining three houses to three utilities.

## Bipartite means two-colourable

Colour the vertices in X red and those in Y blue. Every edge joins a red vertex to a blue one, so this is a proper colouring with two colours. Conversely, any proper 2-colouring splits the vertices into two colour classes with every edge between them. So:

**A graph is bipartite exactly when it can be properly coloured with two colours.**

MathWorld states the equivalence directly, and Levin's *Discrete Mathematics: An Open Introduction* uses it in its colouring section: K₂,₃, like all bipartite graphs, has chromatic number 2. The wider theory of colouring is in [graph colouring and the chromatic number](/blog/graph-coloring-explained/).

## The odd-cycle rule

**A graph is bipartite if and only if it contains no cycle of odd length.** MathWorld gives this criterion too.

**Why odd cycles are impossible.** Walk around a cycle in a bipartite graph. Each step crosses from one side to the other. After an odd number of steps you are on the opposite side from where you started, so you cannot be back at the starting vertex. Every cycle must have even length.

**Why no odd cycles is enough.** Work in one connected component and pick a vertex r. Put each vertex on side X or Y according to whether its distance from r is even or odd. If some edge joined two vertices at even distance, or two at odd distance, the shortest paths from r to its ends, plus that edge, would close up into a walk containing an odd cycle. With no odd cycles, every edge joins an even-distance vertex to an odd-distance one, and the split works.

**Consequences.**

- Every tree is bipartite, having no cycles at all. MathWorld notes that all acyclic graphs are bipartite.
- An even cycle is bipartite; an odd cycle, including a triangle, is not.
- Any graph containing a triangle is not bipartite.

## Testing a graph: colour as you go

The proof above is also an algorithm.

1. Pick an uncoloured vertex and colour it red.
2. Colour all its neighbours blue, then all their uncoloured neighbours red, and so on, alternating.
3. Whenever an edge joins two vertices of the same colour, stop: the graph is not bipartite, and that edge closes an odd cycle you can point to.
4. Repeat for each connected component.

**Example.** Vertices 1 to 6 with edges 12, 23, 34, 45, 56, 61 and 14. Colour 1 red. Then 2, 6 and 4 are blue (neighbours of 1). Then 3 and 5 are red (neighbours of 2, 4 and 6). Check every edge: 12, 23, 34, 45, 56, 61 and 14 all join red to blue. Bipartite, with sides {1, 3, 5} and {2, 4, 6}. Add the edge 13, and 1 and 3 are both red: the cycle 1–2–3–1 is a triangle, so the new graph is not bipartite.

## Matchings and Hall's theorem

In a bipartite graph with sides A and B, a **matching** is a set of edges with no shared ends: each vertex is used at most once. A matching **of A** pairs every vertex in A with a different vertex in B. Think of A as workers, B as jobs, and edges as "can do". Can every worker get a different job?

Levin presents the answer as Hall's marriage theorem, first proved by Philip Hall in 1935: **a bipartite graph has a matching of A if and only if every set S of vertices in A has at least |S| neighbours in B.**

The condition is clearly necessary: if three workers can between them do only two jobs, they cannot all be employed. The theorem says that this is the *only* obstacle. Levin sums up the spirit of it: if you can avoid the obvious counterexamples, you often get what you want.

**Example.** Workers Ana, Ben and Cal; jobs X, Y and Z. Ana can do X or Y; Ben can do X only; Cal can do Y or Z. Check Hall's condition for every group of workers: each individual can do at least one job; {Ana, Ben} can do X and Y; {Ana, Cal} can do X, Y and Z; {Ben, Cal} can do X, Y and Z; all three can do X, Y and Z. The condition holds, so a matching exists: Ben–X, Ana–Y, Cal–Z.

## Where bipartite structure matters elsewhere

- **Hamiltonian cycles.** A cycle alternates sides, so it uses equally many vertices from each. A bipartite graph with unequal sides, such as K₂,₃, has no Hamiltonian cycle, one of the obstructions listed in [Hamiltonian paths and cycles](/blog/hamiltonian-path-explained/).
- **Planarity.** K₃,₃ cannot be drawn in the plane without crossings, a fact proved with Euler's formula in [planar graphs](/blog/planar-graphs-and-eulers-formula/).

## Three graphs to test

1. Is the cube graph (vertices are 3-bit strings, edges join strings differing in one bit) bipartite? (Yes: split by whether the number of 1s is even or odd.)
2. Is C₇ bipartite? (No: it is an odd cycle.)
3. How many edges does K₄,₅ have? (20.)

Bipartite graphs belong to the graph theory unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), the last unit in the app's sequence. It is listed with our [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) links the neighbouring graph guides, including [trees](/blog/trees-in-graph-theory/) and [graph basics](/blog/graph-theory-basics/).
