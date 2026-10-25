---
{
  "title": "Graph Coloring and the Chromatic Number: Scheduling, Maps and Limits",
  "metaTitle": "Graph Coloring and Chromatic Number, Explained",
  "description": "A proper coloring gives adjacent vertices different colors. How to find the chromatic number, the bounds that help, the four color theorem, and scheduling uses.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "graph theory", "graph coloring", "scheduling"],
  "primaryKeyword": "graph coloring chromatic number",
  "secondaryKeywords": [
    "chromatic number of a graph",
    "greedy coloring algorithm",
    "four color theorem",
    "exam scheduling graph coloring",
    "brooks theorem"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to find the chromatic number of a graph",
    "chromatic number of a cycle graph",
    "why does a map need only four colors",
    "upper and lower bounds on chromatic number"
  ],
  "aiSearchQuestions": [
    "What is the chromatic number of a graph?",
    "How do you find the chromatic number?",
    "What does the four color theorem say?",
    "How is graph coloring used for scheduling?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "bipartite-graphs-explained",
    "planar-graphs-and-eulers-formula",
    "graph-theory-basics",
    "ramsey-numbers-introduction",
    "hamiltonian-path-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A proper coloring assigns colors to vertices so that adjacent vertices differ; the chromatic number χ(G) is the fewest colors that work.",
    "To prove χ(G) = k, show a k-coloring exists and show k − 1 colors cannot work, often by finding k mutually adjacent vertices.",
    "χ(Kₙ) = n; a cycle needs 2 colors if its length is even and 3 if odd; bipartite graphs, including trees, need at most 2.",
    "Greedy coloring never uses more than one more color than the largest degree, and Brooks' theorem tightens that for every connected graph except complete graphs and odd cycles.",
    "The four color theorem says every planar graph, and so every map, can be colored with at most 4 colors."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the chromatic number of a graph?",
      "answer": "The smallest number of colors needed to color the vertices so that no edge joins two vertices of the same color. It is written χ(G). A triangle has chromatic number 3, a square (a 4-cycle) has 2, and the complete graph on n vertices has n."
    },
    {
      "question": "How do you find the chromatic number?",
      "answer": "Find a coloring with some number k of colors, which shows χ ≤ k, and an argument that k − 1 colors fail, which shows χ ≥ k. The usual lower-bound argument is a set of k vertices that are all adjacent to each other, since each needs its own color."
    },
    {
      "question": "What does the four color theorem say?",
      "answer": "Every planar graph can be properly colored with at most four colors. For maps, regions sharing a border get different colors, and four always suffice. Its proof relies on a computer checking a large set of configurations; no short proof by hand is known."
    },
    {
      "question": "How is graph coloring used in scheduling?",
      "answer": "Make each exam a vertex and join two exams if some student takes both. A proper coloring assigns exams to time slots with no student clash, colors being slots, and the chromatic number is the fewest slots possible."
    }
  ],
  "sources": [
    {
      "title": "Coloring (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_coloring.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Chromatic Number",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/ChromaticNumber.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Planarity and Colorings (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-planarity-and-colorings.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Colour the countries on a map so that neighbours differ. Assign exams to time slots so that no student has two at once. Give radio transmitters frequencies so that nearby ones do not interfere. All three can be modelled as graph colouring problems, and the central question in each is the same: what is the fewest colours that will do?

## Proper colourings and χ(G)

A **proper colouring** of a graph assigns a colour to each vertex so that the two ends of every edge get different colours. Levin's *Discrete Mathematics: An Open Introduction* calls a colouring of the vertices a vertex colouring, and the fewest colours needed for a proper one the **chromatic number**, written χ(G).

"Colours" are just labels. You can use 1, 2, 3 or time slots or frequencies; nothing depends on actual colour.

## Chromatic numbers of familiar graphs

| Graph | χ | Why |
| --- | --- | --- |
| Complete graph Kₙ | n | Every vertex is adjacent to every other, so all need different colours |
| Even cycle C₄, C₆, … | 2 | Alternate two colours around the cycle |
| Odd cycle C₃, C₅, … | 3 | Alternating fails on the last vertex; a third colour fixes it |
| Bipartite graph (with an edge) | 2 | Colour each side differently |
| Tree with an edge | 2 | Trees are bipartite |
| Graph with no edges | 1 | Nothing to conflict |

Levin's book works three of these: K₆ needs 6 colours because every vertex is adjacent to every other; a graph containing a triangle needs at least 3; and K₂,₃, like every [bipartite graph](/blog/bipartite-graphs-explained/), needs only 2.

## Proving a chromatic number: two halves

To show χ(G) = k you must show two things.

1. **Upper bound, χ ≤ k:** exhibit a proper colouring with k colours.
2. **Lower bound, χ ≥ k:** show that k − 1 colours cannot work.

A standard lower bound is a **clique**, a set of vertices all adjacent to each other. A clique of size k needs k different colours, so χ is at least the size of the largest clique. MathWorld states this bound, that the chromatic number is at least the clique number.

The bound is not always tight. The 5-cycle has no triangle, so its largest clique has 2 vertices, yet it needs 3 colours because it is an odd cycle.

## Worked example: scheduling six exams

Exams: Maths, Physics, Chemistry, Biology, History, English. Two exams conflict if some student takes both:

Maths–Physics, Maths–Chemistry, Physics–Chemistry, Chemistry–Biology, Biology–History, History–Maths, English–Physics, English–History.

**Lower bound.** Maths, Physics and Chemistry are mutually conflicting, a triangle, so at least 3 slots are needed.

**Upper bound, by greedy colouring.** Go through the exams in order and give each the lowest-numbered slot not used by an already-scheduled neighbour:

| Exam | Conflicts already placed | Slot |
| --- | --- | --- |
| Maths | none | 1 |
| Physics | Maths (1) | 2 |
| Chemistry | Maths (1), Physics (2) | 3 |
| Biology | Chemistry (3) | 1 |
| History | Biology (1), Maths (1) | 2 |
| English | Physics (2), History (2) | 1 |

Three slots, matching the lower bound, so χ = 3: three exam sessions are enough, and two are not.

## Greedy colouring and its bound

Greedy colouring, as above, never needs more than Δ + 1 colours, where Δ is the largest degree: when a vertex is coloured, at most Δ neighbours are already coloured, so one of the first Δ + 1 colours is free. The result depends on the order, and a bad order can use far more colours than necessary, but the Δ + 1 bound always holds.

**Brooks' theorem** sharpens it. MathWorld records that the chromatic number of a connected simple graph is at most Δ, except for complete graphs and odd cycles, which need Δ + 1. So a connected graph where every vertex has degree at most 3 can be coloured with 3 colours unless it is K₄.

## Maps and the four colour theorem

Turn a map into a graph by making each region a vertex and joining regions that share a border. The result is a planar graph, one that can be drawn without crossing edges, the subject of [planar graphs and Euler's formula](/blog/planar-graphs-and-eulers-formula/).

Levin calls the answer the best known theorem of graph theory: **every planar graph has chromatic number at most 4**, so four colours suffice for any map. The book is frank about the proof. No easy proof is known, and the current best proof still requires computers to check an unavoidable set of 633 reducible configurations. *Applied Discrete Structures* covers the same theorem alongside planarity.

A much easier result, that five colours always suffice for planar graphs, can be proved by hand; *Applied Discrete Structures* proves this five-colour theorem, starting from the fact that every connected planar graph has a vertex of degree 5 or less.

## When the two bounds do not meet

For small graphs, a clique and a greedy colouring often meet, as they did for the exam timetable, and then the answer is settled. When they do not, the greedy count is only an upper bound, and closing the gap needs a separate argument, as with the 5-cycle, whose largest clique has 2 vertices but which needs 3 colours. As with the [Hamiltonian cycle](/blog/hamiltonian-path-explained/) question, there is no simple degree test to fall back on.

## Colouring exercises

1. Find χ for the wheel with 6 spokes: a 6-cycle plus a centre joined to every cycle vertex. (3: the rim is an even cycle needing 2 colours, and the centre, adjacent to all of it, needs a third.)
2. Find χ for the wheel with 5 spokes. (The rim is an odd cycle needing 3, plus the centre: 4.)
3. Show that any graph with 10 edges can be coloured with 5 colours. (Hint: a graph needing k colours has at least C(k, 2) edges, one between every pair of colour classes.)

Colouring connects to many other topics: two-colourable graphs are exactly the bipartite ones, and colouring the edges of complete graphs leads to [Ramsey numbers](/blog/ramsey-numbers-introduction/). Colouring belongs to the graph theory unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). Find it among our [education apps](/apps/category/education-brain/), and the full graph sequence in the [discrete math hub](/blog/topics/discrete-math/), starting from [graph theory basics](/blog/graph-theory-basics/).
