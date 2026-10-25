---
{
  "title": "Adjacency Matrices and Lists: Representing a Graph, and Counting Walks",
  "metaTitle": "Adjacency Matrix vs List: Representing Graphs",
  "description": "How to store a graph as an adjacency matrix, an adjacency list or an edge list, what each costs, and how matrix powers count walks and triangles.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "matrices", "data structures"],
  "primaryKeyword": "adjacency matrix",
  "secondaryKeywords": [
    "adjacency list",
    "adjacency matrix vs adjacency list",
    "number of walks of length k",
    "adjacency matrix of a directed graph",
    "count triangles with adjacency matrix"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to write the adjacency matrix of a graph",
    "what does the square of an adjacency matrix tell you",
    "when to use an adjacency list instead of a matrix",
    "row sums of an adjacency matrix are degrees"
  ],
  "aiSearchQuestions": [
    "What is an adjacency matrix?",
    "What is the difference between an adjacency matrix and an adjacency list?",
    "What does the square of an adjacency matrix count?",
    "How do you find the number of triangles from an adjacency matrix?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "graph-theory-basics",
    "properties-of-relations",
    "dijkstras-algorithm-explained",
    "graph-isomorphism-explained",
    "big-o-notation-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The adjacency matrix of a graph on vertices 1 to n has a 1 in row i, column j when i and j are adjacent, and 0 otherwise.",
    "For an undirected simple graph the matrix is symmetric with zeros on the diagonal, and each row sums to that vertex's degree.",
    "An adjacency list stores each vertex's neighbours; it uses space proportional to vertices plus edges, much less than n² for sparse graphs.",
    "The (i, j) entry of Aᵏ counts the walks of length k from i to j.",
    "The trace of A³ divided by 6 is the number of triangles in a simple graph."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is an adjacency matrix?",
      "answer": "A square table of 0s and 1s describing a graph. Rows and columns are labelled by the vertices, and the entry in row i, column j is 1 if there is an edge from i to j and 0 if not. MathWorld also calls it the connection matrix."
    },
    {
      "question": "When should I use an adjacency list instead of a matrix?",
      "answer": "When the graph is sparse, with far fewer edges than the n² possible pairs. A list uses space proportional to the number of vertices plus edges and lets you loop over a vertex's neighbours quickly. A matrix is better for dense graphs and for instant 'is there an edge?' checks."
    },
    {
      "question": "What does the square of an adjacency matrix tell you?",
      "answer": "Entry (i, j) of A² is the number of walks of length 2 from i to j, that is, the number of common neighbours of i and j. On the diagonal, entry (i, i) is the degree of vertex i. Higher powers count longer walks."
    },
    {
      "question": "How do you count triangles using the adjacency matrix?",
      "answer": "Compute the trace of A³, the sum of its diagonal entries, and divide by 6. Each triangle gives 6 closed walks of length 3: it can start at any of its 3 vertices and go in either of 2 directions."
    }
  ],
  "sources": [
    {
      "title": "Adjacency Matrix",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/AdjacencyMatrix.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Data Structures for Graphs (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-data-structures-for-graphs.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Walk",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Walk.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

A drawing is a fine way for a person to look at a graph, but a computer needs the graph as data, and the choice of representation decides how fast graph algorithms run. *Applied Discrete Structures* describes three data structures for the job: an adjacency matrix, adjacency lists and an edge list. The matrix also turns out to be a mathematical tool in its own right, because its powers count walks.

## The adjacency matrix

Number the vertices 1 to n. The **adjacency matrix** A is the n × n table with

Aᵢⱼ = 1 if vertex i is adjacent to vertex j, and 0 otherwise.

MathWorld gives the same definition, noting the alternative name "connection matrix".

**Example.** Vertices 1, 2, 3, 4 with edges 12, 13, 23 and 34: a triangle on 1, 2, 3 with vertex 4 hanging off 3.

| | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| **1** | 0 | 1 | 1 | 0 |
| **2** | 1 | 0 | 1 | 0 |
| **3** | 1 | 1 | 0 | 1 |
| **4** | 0 | 0 | 1 | 0 |

What you can read straight off it:

- **Symmetric.** For an undirected graph, Aᵢⱼ = Aⱼᵢ: an edge between i and j shows up in both places.
- **Zero diagonal.** A simple graph has no loops.
- **Row sums are degrees.** Row 3 sums to 3, the degree of vertex 3. Adding all the entries gives twice the number of edges, the [handshake lemma](/blog/graph-theory-basics/) again.

For a **directed** graph, Aᵢⱼ = 1 means an edge from i to j, so the matrix need not be symmetric; row sums count edges leaving a vertex and column sums count edges arriving. This is exactly the matrix of a relation, so the tests for reflexive, symmetric and transitive in [checking a relation's properties](/blog/properties-of-relations/) apply directly. For a weighted graph, store the weight instead of 1.

## Adjacency lists and edge lists

An **adjacency list** stores, for each vertex, the list of its neighbours:

- 1: 2, 3
- 2: 1, 3
- 3: 1, 2, 4
- 4: 3

An **edge list** simply lists the edges: {1, 2}, {1, 3}, {2, 3}, {3, 4}. *Applied Discrete Structures* points out that building either of the other structures usually starts from such a list.

## Which to use

| Task | Adjacency matrix | Adjacency list |
| --- | --- | --- |
| Space | n² entries | Proportional to n + e |
| Is there an edge between i and j? | One lookup | Scan i's list |
| List all neighbours of i | Scan a whole row, n entries | Proportional to the degree of i |
| Best for | Dense graphs, matrix calculations | Sparse graphs, most traversal algorithms |

*Applied Discrete Structures* makes the case with rough estimates. For a graph of airports it guesses about 4,500 vertices and, at around 75 direct destinations each, roughly 75 × 4,500 / 2 = 168,750 edges, far fewer than the 4,500² entries a matrix would need, so it concludes an edge list or dictionary would be more efficient. A dense graph is the opposite case, where most of the matrix's n² entries are 1s and little space is wasted. Graph searches and [Dijkstra's algorithm](/blog/dijkstras-algorithm-explained/) mostly ask "what are this vertex's neighbours?", which lists answer quickly. In [big-O](/blog/big-o-notation-explained/) terms, the list version of a full traversal takes time proportional to n + e rather than n².

## Matrix powers count walks

Square the example matrix:

| A² | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| **1** | 2 | 1 | 1 | 1 |
| **2** | 1 | 2 | 1 | 1 |
| **3** | 1 | 1 | 3 | 0 |
| **4** | 1 | 1 | 0 | 1 |

**Entry (i, j) of A² is the number of walks of length 2 from i to j.** The reason is the matrix product itself: (A²)ᵢⱼ = Σₖ AᵢₖAₖⱼ, and each term is 1 exactly when i–k–j is a walk. Check a few:

- (A²)₁₄ = 1: the walk 1–3–4.
- (A²)₃₄ = 0: no vertex is adjacent to both 3 and 4.
- (A²)₃₃ = 3: walks 3–1–3, 3–2–3, 3–4–3. Diagonal entries of A² are the degrees.

In general, by induction on k, **entry (i, j) of Aᵏ counts the walks of length k from i to j.** So vertices i and j are connected by some path exactly when some power Aᵏ with k < n has a nonzero (i, j) entry, which gives a matrix test for connectivity.

## Counting triangles

A walk that returns to its start after 3 steps in a simple graph must go round a triangle. MathWorld's entry on walks notes that the number of closed walks of length k is the trace of Aᵏ, the sum of its diagonal. Each triangle is traversed by 6 closed walks of length 3 (3 starting vertices times 2 directions), so

**number of triangles = trace(A³)/6.**

For the example, the diagonal of A³ is 2, 2, 2, 0, with trace 6, so the graph has exactly one triangle, the one on vertices 1, 2 and 3.

## Matrices and isomorphism

Relabelling the vertices permutes the rows and columns of A in the same way. So two graphs are isomorphic exactly when one adjacency matrix can be turned into the other by such a simultaneous reordering, a computer-friendly restatement of [graph isomorphism](/blog/graph-isomorphism-explained/).

## Exercises on matrices and walks

1. Write the adjacency matrix of the 4-cycle 1–2–3–4–1 and compute A². What do the diagonal entries tell you?
2. In any graph, what does entry (i, j) of A² equal when i ≠ j? (The number of common neighbours.)
3. How many triangles does K₄ have? (trace(A³) = 24, so 4.)

Graph theory is the last of the units in [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), after sets, functions, counting, probability and recurrences. Browse our [education apps](/apps/category/education-brain/), or the [discrete math hub](/blog/topics/discrete-math/) for the rest of the graph series.
