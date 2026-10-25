---
{
  "title": "Euler Paths vs Euler Circuits: The Degree Test and How to Find One",
  "metaTitle": "Euler Path vs Euler Circuit: The Degree Test",
  "description": "An Euler path uses every edge once; an Euler circuit also ends where it started. Count odd-degree vertices to decide which exists, then find one by hand.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "euler paths", "konigsberg"],
  "primaryKeyword": "euler path vs euler circuit",
  "secondaryKeywords": [
    "euler circuit theorem",
    "eulerian path conditions",
    "bridges of konigsberg",
    "fleury's algorithm",
    "odd degree vertices euler path"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to tell if a graph has an euler circuit",
    "where does an euler path start and end",
    "why the konigsberg bridges have no solution",
    "draw a figure without lifting your pen"
  ],
  "aiSearchQuestions": [
    "What is the difference between an Euler path and an Euler circuit?",
    "How do you know whether a graph has an Euler circuit?",
    "Why is there no solution to the bridges of Königsberg?",
    "How do you find an Euler circuit by hand?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "graph-theory-basics",
    "hamiltonian-path-explained",
    "proof-by-induction-step-by-step",
    "adjacency-matrix-explained",
    "planar-graphs-and-eulers-formula",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "An Euler path uses every edge exactly once; an Euler circuit is an Euler path that ends where it began.",
    "A connected graph has an Euler circuit exactly when every vertex has even degree.",
    "It has an Euler path that is not a circuit exactly when it has exactly two vertices of odd degree, and the path must start at one and end at the other.",
    "The bridges of Königsberg have no solution because all four land masses have odd degree.",
    "To find a circuit, follow edges without stranding any part of the graph (Fleury), or join cycles together (Hierholzer)."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between an Euler path and an Euler circuit?",
      "answer": "Both traverse every edge of a graph exactly once. An Euler circuit also starts and finishes at the same vertex; an Euler path may finish somewhere else. Every Euler circuit is an Euler path, but not the other way round."
    },
    {
      "question": "How do you tell whether a graph has an Euler circuit?",
      "answer": "Check that it is connected (ignoring isolated vertices) and count the vertices of odd degree. Zero odd-degree vertices: an Euler circuit exists. Exactly two: an Euler path exists, from one odd vertex to the other, but no circuit. Any other number: neither exists."
    },
    {
      "question": "Why is there no walk across all seven bridges of Königsberg?",
      "answer": "Model the four land masses as vertices and the bridges as edges. Every vertex then has odd degree, three or five. An Euler path allows at most two odd-degree vertices, so no walk can cross every bridge exactly once."
    },
    {
      "question": "Why must an Euler path start and end at the odd vertices?",
      "answer": "Every time the path passes through a vertex it uses two edges, one in and one out. So at any vertex where the path neither starts nor ends, the edges pair up and the degree is even. Only the start and end vertices can have odd degree."
    }
  ],
  "sources": [
    {
      "title": "Euler Paths and Circuits (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_paths.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Traversals: Eulerian and Hamiltonian Graphs (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-traversals.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "12.5 Euler Circuits (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/12-5-euler-circuits",
      "accessed": "2026-10-24"
    },
    {
      "title": "12.6 Euler Trails (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/12-6-euler-trails",
      "accessed": "2026-10-24"
    }
  ]
}
---

Can you draw a figure without lifting your pen or retracing a line? Can a postal worker walk every street of a district exactly once? Can the residents of an old city cross each of its bridges once and only once? These are all the same question about graphs, and unusually for graph theory, it has a complete and simple answer, found by Leonhard Euler.

## The definitions

In a graph, an **Euler path** is a walk that uses every edge exactly once. An **Euler circuit** is an Euler path that finishes at the vertex where it started. *Applied Discrete Structures* uses these definitions and adds a warning worth repeating: a graph with an Euler path that is not a circuit is generally not called Eulerian, although some authors do, so check which definition your book uses.

Vertices may be visited more than once. Only edges are restricted.

## The degree test in full

For a connected graph (isolated vertices aside):

| Number of odd-degree vertices | Euler circuit? | Euler path? |
| ---: | --- | --- |
| 0 | Yes | Yes (any circuit is a path) |
| 2 | No | Yes, from one odd vertex to the other |
| 4, 6, 8, … | No | No |

*Applied Discrete Structures* states the general case this way: an undirected graph has an Eulerian path if and only if it is connected and has either zero or two vertices of odd degree, and if no vertex has odd degree, the graph is Eulerian. The number of odd vertices cannot be 1, 3 or 5, because the [handshake lemma](/blog/graph-theory-basics/) makes it even.

## Why the degrees decide it

Follow an Euler path and look at any vertex v that is neither its start nor its end. Each time the path arrives at v, it must leave again, using a new edge each time. So the edges at v are used in pairs, one in and one out, and deg(v) is even.

The start and end are the exceptions. The start uses one extra edge going out, and the end one extra coming in. If they are the same vertex, a circuit, those two extras pair up and every degree is even. If they differ, exactly those two vertices have odd degree. Levin's *Discrete Mathematics: An Open Introduction* draws exactly this conclusion: if a graph has an Euler path and two odd vertices, the path must start at one of them and end at the other.

That proves the conditions are necessary. Proving they are sufficient, that even degrees really guarantee a circuit, takes more work. The usual argument shows you never get stuck, by joining cycles together, and can be written as an [induction proof](/blog/proof-by-induction-step-by-step/) on the number of edges.

## The bridges of Königsberg

The problem that started graph theory: the city of Königsberg had seven bridges joining four land masses, two river banks and two islands. *Applied Discrete Structures* recounts the legend that the citizens searched in vain for a walk crossing each bridge exactly once.

Make each land mass a vertex and each bridge an edge (two pairs of bridges join the same land masses, so this is a multigraph). The degrees are 5, 3, 3 and 3. All four are odd, so no Euler path exists, and no such walk is possible. Levin's book adds a follow-up puzzle: building one more bridge between two of the odd land masses leaves two odd vertices, enough for an Euler path, and building two bridges fixes all four, allowing an Euler circuit.

## Worked example: the open envelope

Draw a square with both diagonals and a roof on top: vertices A and B at the bottom, C and D at the top of the square, and E at the peak, joined to C and D. Edges: AB, BD, DC, CA (the square), AD, BC (the diagonals), CE, DE (the roof). That is 8 edges.

Degrees: A has 3 (B, C, D), B has 3 (A, C, D), C has 4 (A, B, D, E), D has 4 (A, B, C, E), E has 2. Exactly two odd vertices, A and B, so there is an Euler path from A to B but no Euler circuit. One such path:

A → B → C → D → E → C → A → D → B.

Count the edges used: AB, BC, CD, DE, EC, CA, AD, DB, all 8, each once. This is the familiar puzzle of drawing an envelope in one stroke, and the theorem explains why you must start at a bottom corner.

## Finding an Euler circuit by hand

**Fleury's algorithm.** Start at any vertex (an odd one, for a path). At each step, follow an unused edge, but never cross a **bridge**, an edge whose removal would cut off the unused part of the graph, unless there is no other choice. Delete each edge as you use it.

**Hierholzer's method.** Walk from a vertex until you return to it, forming a cycle. If unused edges remain, start a new cycle at a vertex on the first one that still has unused edges, then splice the second cycle into the first. Repeat until every edge is used. Unlike Fleury's algorithm, it never needs to check whether an edge is a bridge.

## Directed graphs and applications

For directed graphs, the rule becomes: a connected digraph has an Euler circuit exactly when every vertex has as many edges coming in as going out.

OpenStax's *Contemporary Mathematics* frames these questions through delivery routes that must cover every street and return home; when a perfect Euler circuit does not exist, the route must repeat some streets, and choosing them as economically as possible is the Chinese postman problem, which OpenStax handles by "eulerizing" the graph. Its section on Euler trails walks through Fleury's algorithm step by step. The vertex version of the question, visiting every **vertex** once, is far harder and is covered in [Hamiltonian paths and cycles](/blog/hamiltonian-path-explained/). OpenStax has worked exercises on both.

## Check these graphs

1. Does K₅ have an Euler circuit? (Every vertex has degree 4: yes.) Does K₄? (Degree 3 everywhere: no path at all.)
2. A graph has degrees 2, 2, 3, 3, 4, 4. Which vertices must an Euler path start and end at?
3. What is the smallest number of edges you would need to add to the Königsberg graph to get an Euler circuit? (Two.)

Graph traversals belong to the graph theory unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). It sits with our other [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) links the related graph guides, including [planar graphs and Euler's formula](/blog/planar-graphs-and-eulers-formula/), a different result with the same name.
