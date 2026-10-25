---
{
  "title": "Graph Theory Basics: Vertices, Edges, Degrees and the Handshake Lemma",
  "metaTitle": "Graph Theory Basics: Vertices, Edges and Degrees",
  "description": "The vocabulary of graph theory explained with small examples: vertices, edges, degree, paths, cycles, connectivity and the handshake lemma, with its proof.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "graphs", "handshake lemma"],
  "primaryKeyword": "graph theory basics",
  "secondaryKeywords": [
    "vertices and edges",
    "degree of a vertex",
    "handshake lemma",
    "complete graph number of edges",
    "paths and cycles in graphs"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why the number of odd degree vertices is even",
    "how many edges does a complete graph have",
    "difference between a walk, a path and a cycle",
    "what is a connected graph"
  ],
  "aiSearchQuestions": [
    "What is a graph in discrete math?",
    "What is the handshake lemma?",
    "How many edges does the complete graph on n vertices have?",
    "What is the difference between a path and a cycle in a graph?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "euler-path-vs-euler-circuit",
    "trees-in-graph-theory",
    "adjacency-matrix-explained",
    "bipartite-graphs-explained",
    "graph-coloring-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A graph is a set of vertices together with a set of edges, each edge joining two vertices; the drawing is just a picture of that structure.",
    "The degree of a vertex is the number of edges meeting it.",
    "The handshake lemma: the degrees add up to twice the number of edges, because every edge has two ends.",
    "So every graph has an even number of vertices of odd degree, and seven people cannot each shake hands with exactly three others.",
    "The complete graph Kₙ, with every pair of vertices joined, has n(n − 1)/2 edges."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a graph in discrete math?",
      "answer": "A collection of points, called vertices, and connections between pairs of them, called edges. It is not a plot of a function. Graphs model anything made of connections: road maps, computer networks, friendships, task dependencies."
    },
    {
      "question": "What is the handshake lemma?",
      "answer": "The statement that the sum of the degrees of all vertices in a graph equals twice the number of edges. Each edge contributes 1 to the degree of each of its two ends, so it is counted exactly twice. A consequence is that the number of vertices with odd degree is always even."
    },
    {
      "question": "How many edges does a complete graph have?",
      "answer": "The complete graph Kₙ has an edge between every pair of its n vertices, so it has C(n, 2) = n(n − 1)/2 edges. K₅ has 10 edges and K₁₀ has 45. The handshake lemma confirms it: each of the n vertices has degree n − 1."
    },
    {
      "question": "What is the difference between a walk, a path and a cycle?",
      "answer": "A walk is any sequence of vertices joined by edges. A path is a walk that does not repeat a vertex. A cycle is a path that returns to its starting vertex, using at least three vertices in a simple graph. Textbooks vary slightly, so check your course's definitions."
    }
  ],
  "sources": [
    {
      "title": "Graph Theory: Definitions (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_gt-intro.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Graphs: General Introduction (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-graphs-introduction.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Handshaking Lemma",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/HandshakingLemma.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "12.1 Graph Basics (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/12-1-graph-basics",
      "accessed": "2026-10-24"
    }
  ]
}
---

In graph theory a "graph" is not a plot of y against x. It is a network: a set of points and a set of connections between them. That simple structure can model road maps, computer networks, friendships, timetables and the dependencies between tasks.

## Vertices, edges and adjacency

*Applied Discrete Structures* defines a simple undirected graph as a nonempty set V of **vertices** together with a set E of **edges**, each edge being a set of two distinct vertices. An edge {u, v} **joins** u and v, and u and v are then **adjacent**.

**Example.** V = {a, b, c, d, e} and E = {ab, ac, bc, cd, de}. Drawn on paper, a, b and c form a triangle, c is joined to d, and d to e.

The drawing is only a picture. Moving the dots around, or drawing edges as curves, gives the same graph, because the graph is the sets V and E. Whether two different-looking drawings are the same graph is the subject of [graph isomorphism](/blog/graph-isomorphism-explained/).

## Variations you will meet

| Kind | What changes | Example use |
| --- | --- | --- |
| Simple graph | No loops, at most one edge per pair | Friendships |
| Multigraph | Several edges may join the same pair | Bridges between two islands |
| Directed graph (digraph) | Edges have a direction, from u to v | One-way streets, web links |
| Weighted graph | Each edge carries a number | Road distances, network costs |

*Applied Discrete Structures* defines multigraphs explicitly, and directed graphs come first in its treatment; Levin's *Discrete Mathematics: An Open Introduction* starts with simple graphs. Most first results are stated for simple undirected graphs, and this guide sticks to them unless it says otherwise.

## Degree

The **degree** of a vertex is the number of edges that meet it. In the example: deg(a) = 2, deg(b) = 2, deg(c) = 3, deg(d) = 2, deg(e) = 1. A vertex of degree 0 is **isolated**; a vertex of degree 1 is sometimes called a **leaf**, a term that matters for [trees](/blog/trees-in-graph-theory/).

## The handshake lemma

Add up the degrees in the example: 2 + 2 + 3 + 2 + 1 = 10. The graph has 5 edges. That is no coincidence.

**Handshake lemma.** In any graph, the sum of the degrees of all the vertices is twice the number of edges.

**Proof.** Each edge has two ends, and it adds 1 to the degree of each. So when you add all the degrees, every edge is counted exactly twice. ∎

Levin's book states it in the same words, and MathWorld explains the name: think of vertices as people and edges as handshakes. If everyone reports how many hands they shook, the total is twice the number of handshakes, because each handshake involves two people.

**Consequence: odd-degree vertices come in pairs.** The degree sum is even. The even degrees contribute an even amount, so the odd degrees must also add to an even number, which means there must be an even number of them.

**Application.** Can 7 people at a party each shake hands with exactly 3 others? That would give a degree sum of 7 × 3 = 21, which is odd. So it is impossible, and you can say so without trying a single arrangement.

## Paths, cycles and connectivity

- A **walk** is a sequence of vertices in which each consecutive pair is joined by an edge.
- A **path** is a walk that never repeats a vertex.
- A **cycle** is a path that returns to its start, such as a → b → c → a.
- A graph is **connected** if there is a path between every pair of vertices. A disconnected graph splits into **components**, its connected pieces.

The example graph is connected and has exactly one cycle, the triangle abc.

Definitions here vary slightly between books, especially about whether a walk may repeat edges, so check which version your course uses.

## Special graphs

| Graph | Description | Edges |
| --- | --- | --- |
| Complete graph Kₙ | Every pair of n vertices joined | n(n − 1)/2 |
| Cycle Cₙ | n vertices in a ring | n |
| Path Pₙ | n vertices in a line | n − 1 |
| Complete bipartite Kₘ,ₙ | Two groups, every cross pair joined | mn |

The edge count of Kₙ is C(n, 2), one edge per pair, and the handshake lemma agrees: n vertices of degree n − 1 give a degree sum of n(n − 1), so n(n − 1)/2 edges. K₅ has 10 edges. Graphs whose vertices split into two groups with edges only between them are covered in [bipartite graphs](/blog/bipartite-graphs-explained/).

## What the rest of graph theory asks

Much of the graph theory in a first course comes back to a handful of questions about these objects:

- Can you travel along every edge exactly once? That is an [Euler path](/blog/euler-path-vs-euler-circuit/), and the degrees decide it.
- Can you visit every vertex exactly once? That is a [Hamiltonian path](/blog/hamiltonian-path-explained/), and no simple test exists.
- How few colours can label the vertices so that neighbours differ? That is [graph colouring](/blog/graph-coloring-explained/).
- How do you store a graph in a computer? See [adjacency matrices and lists](/blog/adjacency-matrix-explained/).

OpenStax's *Contemporary Mathematics* opens its graph theory chapter with the same basic vocabulary, and its exercises are a good source of small graphs to practise on.

## Degree-sequence exercises

1. A graph has degrees 3, 3, 2, 2, 2. How many edges does it have? (12/2 = 6.)
2. Draw a simple graph with degrees 3, 2, 2, 2, 1. (One answer: join v₁ to v₂, v₃ and v₄, join v₂ to v₃, and join v₄ to v₅.)
3. Is there a simple graph with degrees 3, 3, 3, 1? (The sum is even, so the lemma allows it, but no: with four vertices, each degree-3 vertex is joined to all three others, so the fourth vertex would have degree 3. The lemma is necessary, not sufficient.)

Graph theory is the last unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). Find it among our [education apps](/apps/category/education-brain/), and the rest of the graph guides in the [discrete math hub](/blog/topics/discrete-math/).
