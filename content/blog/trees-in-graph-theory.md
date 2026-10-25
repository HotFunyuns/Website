---
{
  "title": "Trees in Graph Theory: Why a Tree with n Vertices Has n − 1 Edges",
  "metaTitle": "Trees in Graph Theory: Properties and Proofs",
  "description": "A tree is a connected graph with no cycles. Its equivalent definitions, why every tree has two leaves and n − 1 edges, and rooted and binary trees.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "trees", "proofs"],
  "primaryKeyword": "trees graph theory",
  "secondaryKeywords": [
    "properties of trees",
    "tree has n-1 edges proof",
    "leaves of a tree",
    "rooted tree and binary tree",
    "forest graph theory"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does every tree have at least two leaves",
    "equivalent definitions of a tree",
    "how many edges in a forest with k components",
    "number of labeled trees on n vertices"
  ],
  "aiSearchQuestions": [
    "What is a tree in graph theory?",
    "Why does a tree with n vertices have n − 1 edges?",
    "What are the equivalent definitions of a tree?",
    "What is the difference between a tree and a rooted tree?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "graph-theory-basics",
    "minimum-spanning-tree-explained",
    "proof-by-induction-step-by-step",
    "catalan-numbers-explained",
    "hamiltonian-path-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A tree is a connected graph with no cycles; a forest is a graph with no cycles, whose components are trees.",
    "Equivalent definitions: a unique path joins every pair of vertices; or the graph is connected with n − 1 edges; or it is acyclic with n − 1 edges.",
    "Every tree with at least two vertices has at least two leaves, vertices of degree 1.",
    "Removing a leaf leaves a smaller tree, which makes induction the natural proof method for trees.",
    "A forest with n vertices and k components has n − k edges."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a tree in graph theory?",
      "answer": "A connected graph that contains no cycles. Equivalently, a graph in which every two distinct vertices are joined by exactly one path, a proposition Levin's textbook proves. A graph with no cycles that may be disconnected is called a forest."
    },
    {
      "question": "Why does a tree with n vertices have n − 1 edges?",
      "answer": "Every tree with at least two vertices has a leaf, a vertex of degree 1. Removing the leaf and its edge leaves a tree with one fewer vertex and one fewer edge. Repeating down to a single vertex, which has 0 edges, shows the edge count is always one less than the vertex count."
    },
    {
      "question": "Why does every tree have at least two leaves?",
      "answer": "Take a longest path in the tree. Its two end vertices must be leaves: an end vertex cannot have another neighbour on the path, because that would make a cycle, and it cannot have a neighbour off the path, because the path could then be extended."
    },
    {
      "question": "What is the difference between a tree and a rooted tree?",
      "answer": "A rooted tree is a tree with one vertex chosen as the root. That choice gives every edge a direction away from the root, so you can talk about parents, children, ancestors and depth. Binary trees are rooted trees in which each vertex has at most two children, labelled left and right."
    }
  ],
  "sources": [
    {
      "title": "Trees (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_trees.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "What Is a Tree? (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-what-is-a-tree.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "12.10 Trees (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/12-10-trees",
      "accessed": "2026-10-24"
    },
    {
      "title": "Catalan Number",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/CatalanNumber.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Trees are the simplest connected graphs: just enough edges to hold everything together and not one more. A tree with n vertices always has exactly n − 1 edges, and the proof of that fact, by removing a leaf and using induction, is the model for many other proofs about trees.

## Connected, with no cycles

A **tree** is a connected graph with no cycles. A graph with no cycles that may be disconnected is a **forest**; each of its connected pieces is a tree. Levin's *Discrete Mathematics: An Open Introduction* puts it neatly: a connected forest is a tree.

A vertex of degree 1 is a **leaf**.

## Four equivalent definitions

For a graph T with n vertices, the following are all equivalent. Any one of them could serve as the definition.

1. T is connected and has no cycles.
2. Every pair of distinct vertices is joined by a **unique** path.
3. T is connected and has exactly n − 1 edges.
4. T has no cycles and has exactly n − 1 edges.

Levin proves the first equivalence as a proposition: a graph is a tree if and only if a unique path joins every pair of distinct vertices. The reason is short. Connectedness gives at least one path; if two different paths joined the same pair, they would combine into a cycle. Conversely, a cycle would give two paths between any two of its vertices.

Two more characterisations are useful in practice:

- **Minimally connected.** Removing any edge of a tree disconnects it. Every edge is a "bridge".
- **Maximally acyclic.** Adding any new edge to a tree creates exactly one cycle.

## Every tree has two leaves

**Claim.** Any tree with at least two vertices has at least two leaves. Levin states this as a proposition, and the edge-count proof below depends on it.

**Proof.** Take a longest path in the tree, from u to v. Consider u. It has a neighbour on the path. It cannot have a second neighbour on the path, because that edge would close a cycle. It cannot have a neighbour off the path, because then the path could be extended past u, contradicting that it is longest. So u has degree 1, and the same argument applies to v. ∎

A path graph shows that two is the best possible: it has exactly two leaves.

## Why n vertices means n − 1 edges

**Claim.** A tree with n vertices has n − 1 edges.

**Proof by induction on n.** A tree with 1 vertex has 0 edges. Suppose every tree with k vertices has k − 1 edges, and let T have k + 1 ≥ 2 vertices. T has a leaf; remove it and its single edge. What remains is still connected (the leaf was not on any path between other vertices) and still has no cycles, so it is a tree with k vertices and, by the hypothesis, k − 1 edges. Adding the leaf back adds one vertex and one edge: k edges for k + 1 vertices. ∎

The pattern, "remove a leaf, apply the hypothesis, put the leaf back", works for many other statements about trees. The [step-by-step induction guide](/blog/proof-by-induction-step-by-step/) explains the format.

**For forests.** Applying the result to each component: a forest with n vertices and k components has n − k edges. So a graph with n vertices and fewer than n − 1 edges cannot be connected, and a graph with n vertices and n or more edges must contain a cycle.

## Checking whether a graph is a tree

Count. If a graph has n vertices and n − 1 edges, you only need to check one more thing: either that it is connected or that it has no cycles. Example: a graph with 6 vertices, 5 edges and a visible cycle cannot be a tree, and is therefore disconnected.

## Rooted and binary trees

Choosing one vertex as the **root** turns a tree into a hierarchy. Every other vertex then has a unique **parent** (the next vertex on its path to the root), and its other neighbours are its **children**. The **depth** of a vertex is its distance from the root, and the **height** of the tree is the greatest depth. *Applied Discrete Structures* develops rooted trees, and then binary trees, in its chapter on trees.

A **binary tree** is a rooted tree in which every vertex has at most two children, distinguished as left and right. An arithmetic expression such as (3 + 4) × 5 can be drawn as one, with × at the root, the subtree for 3 + 4 on the left and 5 on the right. MathWorld lists full binary trees with n internal vertices among the objects counted by the nth [Catalan number](/blog/catalan-numbers-explained/); removing the leaves of such a tree leaves a binary tree with n vertices, so the same number counts those.

## Spanning trees

Every connected graph contains a **spanning tree**: a tree that uses all of its vertices and some of its edges. Remove edges from cycles one at a time until no cycle is left; the graph stays connected throughout. In a weighted graph, the spanning tree of least total weight is the [minimum spanning tree](/blog/minimum-spanning-tree-explained/), which is what you want when connecting a set of sites as cheaply as possible.

Trees also explain why some questions are easy on them and hard in general: a tree has no cycles, so it can never have a [Hamiltonian cycle](/blog/hamiltonian-path-explained/), and finding paths in a tree is trivial because each path is unique.

## Counting exercises on trees

1. A tree has 10 vertices. How many edges? (9.) What is the sum of its degrees? (18, by the [handshake lemma](/blog/graph-theory-basics/).)
2. A tree has 3 vertices of degree 3, 1 of degree 2, and the rest are leaves. How many leaves? (If there are L leaves, then n = 4 + L, and the degree sum 9 + 2 + L = 2(n − 1) = 2(3 + L), so L = 5.)
3. A forest has 20 vertices and 16 edges. How many trees does it contain? (4.)

OpenStax's *Contemporary Mathematics* has further worked examples on identifying trees and spanning trees. [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a graph theory unit with lessons and knowledge checks, and the app sits with our other [education apps](/apps/category/education-brain/). The [discrete math hub](/blog/topics/discrete-math/) has the rest of the graph series.
