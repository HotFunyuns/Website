---
{
  "title": "Graph Isomorphism: How to Show Two Graphs Are (or Are Not) the Same",
  "metaTitle": "Graph Isomorphism: How to Prove It, or Disprove It",
  "description": "Two graphs are isomorphic when a relabelling turns one into the other. How to prove it with a bijection, disprove it with an invariant, and avoid the traps.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "graph isomorphism", "invariants"],
  "primaryKeyword": "graph isomorphism",
  "secondaryKeywords": [
    "isomorphic graphs",
    "graph invariants",
    "how to prove two graphs are isomorphic",
    "degree sequence isomorphism",
    "non isomorphic graphs same degree sequence"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to show two graphs are not isomorphic",
    "do isomorphic graphs have the same degree sequence",
    "is graph isomorphism np complete",
    "how many isomorphisms between two graphs"
  ],
  "aiSearchQuestions": [
    "What does it mean for two graphs to be isomorphic?",
    "How do you prove two graphs are isomorphic?",
    "How do you prove two graphs are not isomorphic?",
    "Is the degree sequence enough to decide whether graphs are isomorphic?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "graph-theory-basics",
    "equivalence-relations-and-classes",
    "injective-surjective-bijective",
    "adjacency-matrix-explained",
    "planar-graphs-and-eulers-formula",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Graphs G and H are isomorphic when there is a bijection between their vertex sets that sends edges to edges and non-edges to non-edges.",
    "To prove isomorphism, give the bijection explicitly and check every edge.",
    "To disprove it, find an invariant that differs: number of vertices or edges, degree sequence, connectedness, cycle lengths or bipartiteness.",
    "Matching invariants do not prove isomorphism: a 6-cycle and two separate triangles share a degree sequence but are not isomorphic.",
    "No polynomial-time algorithm is known for testing isomorphism in general, though small cases are quick by hand."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a graph isomorphism?",
      "answer": "A one-to-one correspondence between the vertices of two graphs such that two vertices are adjacent in the first graph exactly when their images are adjacent in the second. If one exists, the graphs have the same structure and differ only in how they are labelled or drawn."
    },
    {
      "question": "How do you prove two graphs are isomorphic?",
      "answer": "Write down a bijection f from the vertices of one to the vertices of the other, then check that each edge uv maps to an edge f(u)f(v). If the graphs have the same number of edges and every edge maps to an edge, non-edges automatically map to non-edges."
    },
    {
      "question": "How do you prove two graphs are not isomorphic?",
      "answer": "Find a property that isomorphisms preserve, an invariant, on which they differ. Different vertex or edge counts, different degree sequences, one connected and one not, or one containing a triangle and the other not: any of these settles it."
    },
    {
      "question": "Is having the same degree sequence enough for isomorphism?",
      "answer": "No. A 6-cycle and a pair of disjoint triangles both have six vertices of degree 2, but the 6-cycle is connected and the triangles are not, so they are not isomorphic. Equal invariants are necessary for isomorphism, never sufficient on their own."
    }
  ],
  "sources": [
    {
      "title": "Graph Isomorphism",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/GraphIsomorphism.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "12.3 Comparing Graphs (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/12-3-comparing-graphs",
      "accessed": "2026-10-24"
    },
    {
      "title": "Graph Theory: Definitions (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_gt-intro.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

The same graph can be drawn in endlessly many ways. Move the dots, bend the edges, rename the vertices, and you still have the same network of connections. Graph isomorphism makes "the same graph" precise, and deciding whether two drawings show the same graph is a skill you can learn as a checklist.

## A bijection that preserves edges

MathWorld's definition: a graph isomorphism from a simple graph G to a simple graph H is a bijection f from the vertices of G to the vertices of H such that **u and v are adjacent in G if and only if f(u) and f(v) are adjacent in H.** If such an f exists, G and H are isomorphic, written G ≅ H.

The "if and only if" matters: edges must go to edges, and non-edges must go to non-edges. OpenStax's *Contemporary Mathematics* puts the idea informally: as long as two graphs indicate the same pattern of connections, they are considered isomorphic, whatever the labels.

The bijection is a [one-to-one and onto function](/blog/injective-surjective-bijective/) on the vertices, and "is isomorphic to" is an [equivalence relation](/blog/equivalence-relations-and-classes/) on graphs, which is why it makes sense to talk about "the same graph".

## Proving two graphs are isomorphic

Give the bijection and check the edges.

**Example.** G has vertices a, b, c, d and edges ab, bc, cd, da: a square. H has vertices 1, 2, 3, 4 and edges 13, 32, 24, 41, drawn as a bow-tie shape with crossing edges. They look different. Try

f(a) = 1, f(b) = 3, f(c) = 2, f(d) = 4.

| Edge in G | Image in H | Edge in H? |
| --- | --- | --- |
| ab | 13 | Yes |
| bc | 32 | Yes |
| cd | 24 | Yes |
| da | 41 | Yes |

All four edges map to edges, and both graphs have exactly four edges, so the four images are all of H's edges. Non-edges then map to non-edges automatically. So G ≅ H: both are the 4-cycle C₄.

**How to find the bijection.** Match vertices with the same degree. Then match neighbours to neighbours: if a goes to 1, a's neighbours must go to 1's neighbours. Special vertices, such as the only one of degree 4 or the one lying on every triangle, are good anchors.

## Proving two graphs are not isomorphic

An **invariant** is a property that isomorphic graphs always share. If the graphs differ on any invariant, they are not isomorphic. The standard checklist, roughly in order of how quick it is to check:

1. Number of vertices.
2. Number of edges.
3. Degree sequence (the list of degrees, sorted).
4. Connectedness and number of components.
5. Number of triangles, or of cycles of each length.
6. Whether the graph is bipartite.
7. Degrees of neighbours: for example, whether the degree-3 vertices are adjacent to each other.
8. Whether the graph is [planar](/blog/planar-graphs-and-eulers-formula/).

OpenStax recommends exactly this approach: check first for obvious ways the graphs might differ before spending time trying to build an isomorphism.

**Example.** C₆, a hexagon, and two separate triangles. Both have 6 vertices, 6 edges and every degree 2, so the first three invariants agree. But C₆ is connected and the triangles are not, so they are not isomorphic. Equally, the triangles contain 3-cycles and the hexagon does not.

**Example.** Two graphs on 5 vertices with degree sequences (3, 3, 2, 2, 2) and (3, 2, 2, 2, 1) cannot be isomorphic: their degree sequences differ.

## The trap: matching invariants prove nothing

Every invariant is a **necessary** condition for isomorphism, never a sufficient one. The C₆ example shows two graphs with the same counts and degree sequence that are still different. No finite list of the simple invariants above is known to settle every case, so when all your invariants match, the only way to prove isomorphism is to find the bijection.

## How hard is it?

For two graphs with n vertices there are n! possible bijections. Checking them all is hopeless beyond small n: 10 vertices already give 3,628,800 candidates. MathWorld notes that no polynomial-time algorithm is known for graph isomorphism testing, although the problem has also not been shown to be NP-complete, and the special complexity class "graph isomorphism complete" is sometimes used for problems equivalent to it. By hand, invariants and anchoring cut the search down enormously.

## Counting graphs up to isomorphism

Isomorphism lets you count "different" graphs meaningfully. There are 2³ = 8 labelled simple graphs on 3 vertices, since each of the three possible edges is present or absent, but only 4 up to isomorphism: no edges, one edge, a path of two edges, and a triangle. The number of edges alone distinguishes them here, but that stops working for larger graphs, which is part of what makes the counting hard.

## Pairs of graphs to compare

1. Are the graphs with edge sets {12, 23, 34, 45} and {13, 35, 52, 24} on vertices 1 to 5 isomorphic? (Both are paths on 5 vertices: yes. Map the path 1-2-3-4-5 to 4-2-5-3-1.)
2. A graph has degree sequence (2, 2, 2, 2). Must it be C₄? (Yes, on 4 vertices: a 2-regular graph is a union of cycles, and 4 vertices allow only one 4-cycle.)
3. Find two non-isomorphic graphs with degree sequence (3, 3, 3, 3, 3, 3). (K₃,₃, which has no triangles, and the triangular prism, which has two.)

Isomorphism builds on [graph theory basics](/blog/graph-theory-basics/), and computer checks often compare [adjacency matrices](/blog/adjacency-matrix-explained/), since two graphs are isomorphic exactly when some reordering of one's rows and columns gives the other. Levin's open textbook covers isomorphism in its graph theory definitions. Graphs are the last unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), listed with our other [education apps](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) has the rest of the series.
