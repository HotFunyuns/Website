---
{
  "title": "Partial Orders and Hasse Diagrams: How to Draw One and What It Shows",
  "metaTitle": "Partial Orders and Hasse Diagrams, Step by Step",
  "description": "A partial order is reflexive, antisymmetric and transitive. How to draw its Hasse diagram, read maximal and least elements, and find upper and lower bounds.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "relations", "posets", "hasse diagrams"],
  "primaryKeyword": "hasse diagram",
  "secondaryKeywords": [
    "partial order relation",
    "poset examples",
    "how to draw a hasse diagram",
    "maximal vs greatest element",
    "least upper bound poset"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "hasse diagram for divisors of 12",
    "hasse diagram of power set of 1 2 3",
    "difference between partial order and total order",
    "topological sort of a partial order"
  ],
  "aiSearchQuestions": [
    "What is a Hasse diagram?",
    "How do you draw a Hasse diagram from a partial order?",
    "What is the difference between a maximal element and a greatest element?",
    "What is a partially ordered set?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "properties-of-relations",
    "equivalence-relations-and-classes",
    "power-set-explained",
    "euclidean-algorithm-explained",
    "graph-theory-basics",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A partial order is a relation that is reflexive, antisymmetric and transitive; a set with one is a poset.",
    "A Hasse diagram draws only the cover relations, with no loops, no arrows and no edges implied by transitivity; smaller elements sit lower.",
    "In a partial order some pairs can be incomparable, such as 2 and 3 under 'divides'; a total order compares every pair.",
    "A maximal element has nothing above it, while a greatest element is above everything; a poset can have several maximal elements but at most one greatest.",
    "Under 'divides', the least upper bound of two numbers is their lcm and the greatest lower bound is their gcd."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a Hasse diagram?",
      "answer": "A drawing of a partially ordered set that shows only the essential comparisons. Each element is a point, smaller elements are drawn lower, and a line joins two elements only when one covers the other, meaning it is directly above with nothing in between."
    },
    {
      "question": "How do you draw a Hasse diagram?",
      "answer": "Start from the directed graph of the relation. Delete every loop, since reflexivity is assumed. Delete every edge that is implied by transitivity, keeping only cover relations. Then draw the remaining edges as plain lines with each smaller element below the larger one."
    },
    {
      "question": "What is the difference between a maximal and a greatest element?",
      "answer": "A maximal element has no element above it. A greatest element is above every element. In {2, 3, 4, 6} under 'divides', 4 and 6 are both maximal, but there is no greatest element, because neither divides the other."
    },
    {
      "question": "What is the difference between a partial order and a total order?",
      "answer": "In a total order every two elements are comparable, as with ≤ on the integers. In a partial order some pairs may be incomparable, as with ⊆ on subsets, where {1} and {2} are not contained in each other. Every total order is a partial order."
    }
  ],
  "sources": [
    {
      "title": "Properties of Relations: Partial Orderings (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-properties-of-relations.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Posets Revisited (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-posets-revisited.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Hasse Diagram",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/HasseDiagram.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Some relations do not group things as "the same" but rank them: "is less than or equal to", "divides", "is a subset of", "must be done before". These are partial orders, and a Hasse diagram is the standard way to draw one so that its structure is visible at a glance.

## What makes a relation a partial order

*Applied Discrete Structures* defines a partial ordering as a relation that is

- **reflexive:** a ≤ a,
- **antisymmetric:** a ≤ b and b ≤ a together force a = b, and
- **transitive:** a ≤ b and b ≤ c give a ≤ c.

A set with a partial order is a **partially ordered set**, or poset. The guide to [checking a relation's properties](/blog/properties-of-relations/) shows how to test each of the three.

The word "partial" means some pairs may be **incomparable**. Under "divides" on the positive integers, 2 and 3 are incomparable: neither divides the other. Under ⊆, {1} and {2} are incomparable. When every pair is comparable, as with ≤ on numbers, the order is **total** (or linear).

## Drawing a Hasse diagram

MathWorld describes a Hasse diagram as a rendering of a poset by its cover relation, with an implied upward direction. Element b **covers** a when a < b and nothing lies strictly between them. The recipe:

1. Draw a point for each element.
2. Place a lower than b whenever a < b.
3. Join a and b with a line only when b covers a.
4. Draw no arrows and no loops: upward direction and reflexivity are implied.

**Worked example: the divisors of 12 under "divides".** The set is {1, 2, 3, 4, 6, 12}.

Cover relations: 1–2, 1–3, 2–4, 2–6, 3–6, 4–12, 6–12. There is no line from 2 to 12, because 2 | 4 | 12 already shows it, and no line from 1 to 6, because 1 | 2 | 6 shows it.

The diagram has three levels above 1. The bottom is 1. The next level holds 2 and 3. Above them sit 4 (joined only to 2) and 6 (joined to both 2 and 3). The top is 12, joined to 4 and 6. To read off whether a divides b, look for an upward path from a to b: 3 → 6 → 12, so 3 divides 12; there is no upward path from 3 to 4, so 3 does not divide 4.

Compare this with the full directed graph of the relation, which would have 18 arrows, six of them loops. The Hasse diagram has seven lines. Removing what reflexivity and transitivity already imply is the whole point.

## A second example: subsets of {1, 2, 3}

Order the eight subsets of {1, 2, 3} by ⊆. The bottom is ∅; above it the three singletons; above those the three pairs; at the top {1, 2, 3}. Each set is joined to the sets that add exactly one element, so the diagram is a drawing of a cube. *Applied Discrete Structures* points out that the divisors of 30 under "divides" give a structurally identical diagram, because 30 = 2 · 3 · 5 has three prime factors that behave like the three elements. The [power set guide](/blog/power-set-explained/) explains why there are 2³ = 8 subsets to place.

## Reading special elements off the diagram

| Term | Meaning | In a Hasse diagram |
| --- | --- | --- |
| Maximal | Nothing is strictly above it | No line goes up from it |
| Minimal | Nothing is strictly below it | No line goes down from it |
| Greatest | Above (or equal to) every element | A single top point that every element reaches by an upward path |
| Least | Below (or equal to) every element | A single bottom point |
| Upper bound of {a, b} | Above both a and b | A point reachable upward from both |
| Least upper bound | The smallest upper bound, if there is one | The lowest such point |

The maximal/greatest distinction is the easiest one to blur. In {2, 3, 4, 6} under "divides", 4 and 6 are both maximal, since nothing in the set is above either, but there is no greatest element, since neither divides the other. Minimal elements are 2 and 3, with no least element. A poset can have many maximal elements but at most one greatest.

For "divides", bounds have familiar names: the least upper bound of a and b is their least common multiple, and the greatest lower bound is their greatest common divisor. In the divisors of 12, lub(4, 6) = 12 and glb(4, 6) = 2. The gcd itself is computed efficiently with the [Euclidean algorithm](/blog/euclidean-algorithm-explained/).

## From partial order to schedule: topological sorting

A partial order on a finite set can always be extended to a total order that respects it, a "linear extension". Listing the elements from bottom to top, always choosing something whose predecessors have all been listed, does it. For the divisors of 12, one valid list is 1, 2, 3, 4, 6, 12; another is 1, 3, 2, 6, 4, 12.

The same idea applies to course prerequisites or task dependencies: if "must come before" is a partial order, any linear extension is a valid order to do the work in. In computing it is called a topological sort, and it is defined on the directed graphs covered in [graph theory basics](/blog/graph-theory-basics/).

## Partial orders versus equivalence relations

Both are reflexive and transitive. The difference is the third property: an equivalence relation is symmetric, a partial order antisymmetric. Equivalence relations group elements into interchangeable classes, as in [equivalence relations and classes](/blog/equivalence-relations-and-classes/); partial orders rank them. Equality is the one relation that is both.

## Hasse-diagram exercises

1. Draw the Hasse diagram of the divisors of 18 under "divides". Which elements cover 3? (6 and 9.)
2. In {1, 2, 3, 5, 6, 10, 15, 30} under "divides", find lub(6, 10) and glb(6, 10). (30 and 2.)
3. Give a poset with two minimal elements and a greatest element.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) is a study companion for a discrete math course that includes sets, functions and relations, with lessons, knowledge checks and quizzes. More study apps are in our [education category](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) continues with graphs.
