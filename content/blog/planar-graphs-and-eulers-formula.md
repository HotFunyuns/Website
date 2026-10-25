---
{
  "title": "Planar Graphs and Euler's Formula V − E + F = 2",
  "metaTitle": "Planar Graphs and Euler's Formula V − E + F = 2",
  "description": "Which graphs can be drawn without crossing edges, why V − E + F = 2 for every connected planar graph, and how it proves K₅ and K₃,₃ are not planar.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "planar graphs", "euler's formula"],
  "primaryKeyword": "planar graph euler formula",
  "secondaryKeywords": [
    "euler's formula v - e + f = 2",
    "is k5 planar",
    "k33 non planar proof",
    "kuratowski's theorem",
    "faces of a planar graph"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is k5 not planar",
    "three utilities problem solution",
    "planar graph edges at most 3v - 6",
    "euler's formula for polyhedra examples"
  ],
  "aiSearchQuestions": [
    "What is a planar graph?",
    "What is Euler's formula for planar graphs?",
    "How do you prove K₅ is not planar?",
    "Why is the three utilities problem impossible?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "graph-coloring-explained",
    "bipartite-graphs-explained",
    "euler-path-vs-euler-circuit",
    "proof-by-contradiction-explained",
    "graph-isomorphism-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A planar graph can be drawn in the plane with no edges crossing; such a drawing divides the plane into faces, including the outer one.",
    "Euler's formula: every connected planar drawing has V − E + F = 2.",
    "Since each face is bounded by at least 3 edges, a simple planar graph with at least 3 vertices has E ≤ 3V − 6; with no triangles, E ≤ 2V − 4.",
    "Those bounds prove K₅ and K₃,₃ are not planar, so the three utilities puzzle has no solution.",
    "Kuratowski's theorem: a graph is planar exactly when it contains no subdivision of K₅ or K₃,₃."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a planar graph?",
      "answer": "A graph that can be drawn on a flat surface with no edges crossing. A graph can be planar even if a particular drawing has crossings; it only needs one crossing-free drawing. K₄ is planar, though its usual square-with-diagonals drawing has a crossing."
    },
    {
      "question": "What is Euler's formula for planar graphs?",
      "answer": "For a connected graph drawn in the plane without crossings, V − E + F = 2, where V counts vertices, E edges and F faces, including the unbounded outer face. A triangle has 3 vertices, 3 edges and 2 faces: 3 − 3 + 2 = 2."
    },
    {
      "question": "Why is K₅ not planar?",
      "answer": "If it were, Euler's formula would give F = 2 − 5 + 10 = 7 faces. Each face needs at least 3 edges and each edge borders at most 2 faces, so 3F ≤ 2E, that is, 21 ≤ 20, which is false. So no crossing-free drawing exists."
    },
    {
      "question": "Can three houses be connected to three utilities without crossings?",
      "answer": "No. The graph is K₃,₃, with V = 6 and E = 9, so a planar drawing would have F = 5 faces. K₃,₃ has no triangles, so each face needs at least 4 edges, giving 4F ≤ 2E, or 20 ≤ 18, a contradiction."
    }
  ],
  "sources": [
    {
      "title": "Planar Graphs (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_planar.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Coloring (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_coloring.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Planar Graph",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/PlanarGraph.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Polyhedral Formula",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/PolyhedralFormula.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Can a graph be drawn on paper without any of its edges crossing? For the old puzzle of connecting three houses to water, gas and electricity, that is the whole question. Graphs that can be drawn this way are **planar**, and a single equation, Euler's formula, does most of the work in deciding which graphs are.

## Planar graphs and faces

A graph is **planar** if it *can* be drawn in the plane with no edges crossing. A particular drawing with crossings does not settle anything. K₄ is usually drawn as a square with both diagonals, which cross, but moving one vertex inside the triangle formed by the other three removes the crossing, so K₄ is planar.

A crossing-free drawing divides the plane into regions called **faces**. One of them, the **outer face**, is unbounded. A triangle has two faces: the inside and the outside. A tree has only one, since it encloses nothing.

## Euler's formula

**For any connected planar graph drawn without crossings, V − E + F = 2.**

Levin's *Discrete Mathematics: An Open Introduction* calls this the connection between the number of vertices, edges and faces in any connected planar graph.

| Graph | V | E | F | V − E + F |
| --- | ---: | ---: | ---: | ---: |
| Single vertex | 1 | 0 | 1 | 2 |
| Tree with 5 vertices | 5 | 4 | 1 | 2 |
| Triangle | 3 | 3 | 2 | 2 |
| K₄ | 4 | 6 | 4 | 2 |
| Cube (as a graph) | 8 | 12 | 6 | 2 |

**Why it is true.** Levin suggests building the drawing one step at a time and watching the total. Start with a single vertex: 1 − 0 + 1 = 2. Each step adds either:

- a new vertex joined by a new edge: V and E each go up by 1, so V − E + F is unchanged; or
- a new edge between two existing vertices: E goes up by 1, and the edge splits a face in two, so F goes up by 1, and again nothing changes.

Every connected planar drawing can be built this way, so the total stays 2 throughout. Written out formally, it becomes a [proof by induction](/blog/proof-by-induction-step-by-step/) on the number of edges.

## Polyhedra

The formula is older than graph theory. MathWorld's entry on the polyhedral formula notes it was discovered independently by Euler (1752) and Descartes, for the vertices, edges and faces of a polyhedron. Squash a convex polyhedron flat through one face and you get a planar graph, with the face you pushed through becoming the outer face. The cube gives 8 − 12 + 6 = 2, the tetrahedron 4 − 6 + 4 = 2, and the octahedron 6 − 12 + 8 = 2.

## The edge bounds

In a simple graph each face is bounded by at least 3 edges, and each edge borders at most 2 faces. Counting edge–face incidences two ways gives

**3F ≤ 2E.**

Combining this with Euler's formula, for a connected simple planar graph with V ≥ 3:

**E ≤ 3V − 6.**

If the graph has no triangles, as in a [bipartite graph](/blog/bipartite-graphs-explained/), each face needs at least 4 edges, so 4F ≤ 2E and

**E ≤ 2V − 4.**

These inequalities are the practical tool. A graph that breaks them cannot be planar.

## K₅ is not planar

K₅ has V = 5 and E = 10. Levin's proof is by contradiction: if K₅ were planar, Euler's formula would give F = 2 − 5 + 10 = 7. Then 3F ≤ 2E would require 21 ≤ 20, which is false. So K₅ is not planar. (Equivalently, E = 10 exceeds 3V − 6 = 9.) The method is the one in [proof by contradiction](/blog/proof-by-contradiction-explained/).

## K₃,₃ and the three utilities

Three houses, three utilities, every house joined to every utility: that is K₃,₃, with V = 6 and E = 9. It passes the first test, since 9 ≤ 3 × 6 − 6 = 12. But it is bipartite, so it has no triangles, and the stronger bound applies: E ≤ 2V − 4 = 8. Nine edges is one too many. If you prefer the face count, a planar drawing would have F = 2 − 6 + 9 = 5 faces, and 4F ≤ 2E would need 20 ≤ 18. The puzzle has no solution on a flat surface.

## Kuratowski's theorem

K₅ and K₃,₃ turn out to be the only fundamental obstacles. MathWorld states Kuratowski's theorem (1930): a finite graph is planar if and only if it does not contain a subdivision of K₅ or K₃,₃, where a subdivision is the graph with some edges replaced by paths through new vertices. To show a graph is non-planar, find one of these two hidden inside it; to show it is planar, draw it.

## Planarity and colouring

Planar graphs are where the four colour theorem lives: Levin's book states it as the fact that every planar graph can be coloured with at most four colours, which is why every map can. The bound E ≤ 3V − 6 also shows every planar graph has a vertex of degree at most 5, an exercise in Levin's planar graphs section. The [graph colouring guide](/blog/graph-coloring-explained/) has the details.

## Planarity exercises

1. A connected planar graph has 10 vertices, each of degree 3. How many faces does any planar drawing have? (E = 15 by the handshake lemma, so F = 2 − 10 + 15 = 7.)
2. Is K₆ minus one edge planar? (V = 6, E = 14 > 3V − 6 = 12, so no.)
3. Is the Petersen graph planar? (It has V = 10, E = 15 and no triangles or 4-cycles, so each face needs at least 5 edges. Then 5F ≤ 30 gives F ≤ 6, but Euler requires F = 7. Not planar.)

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) closes its sequence of units with graph theory, with lessons, knowledge checks and topic quizzes. It sits with our other [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) links the related graph guides, including the different Euler result on [Euler paths and circuits](/blog/euler-path-vs-euler-circuit/).
