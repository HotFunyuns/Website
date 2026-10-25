---
{
  "title": "Reflexive, Symmetric, Antisymmetric, Transitive: Checking a Relation's Properties",
  "metaTitle": "Reflexive, Symmetric, Transitive Relations: How to Check",
  "description": "How to test a relation for the four key properties using its list of pairs, its matrix or its directed graph, with worked examples and the antisymmetry traps.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "relations", "set theory", "digraphs"],
  "primaryKeyword": "reflexive symmetric transitive",
  "secondaryKeywords": [
    "properties of relations discrete math",
    "antisymmetric relation example",
    "how to check if a relation is transitive",
    "relation matrix properties",
    "symmetric vs antisymmetric"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "can a relation be both symmetric and antisymmetric",
    "is the empty relation reflexive",
    "transitive closure of a relation",
    "how to read relation properties from a digraph"
  ],
  "aiSearchQuestions": [
    "What does it mean for a relation to be reflexive, symmetric or transitive?",
    "What is the difference between symmetric and antisymmetric?",
    "How do you check whether a relation is transitive?",
    "Can a relation be both symmetric and antisymmetric?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "equivalence-relations-and-classes",
    "partial-orders-and-hasse-diagrams",
    "cartesian-product-explained",
    "adjacency-matrix-explained",
    "converse-inverse-contrapositive",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Reflexive: every element is related to itself. Symmetric: a R b always brings b R a. Antisymmetric: a R b and b R a only when a = b. Transitive: a R b and b R c always bring a R c.",
    "Symmetric and antisymmetric are not opposites: equality is both, and some relations are neither.",
    "Symmetry, antisymmetry and transitivity are if-then conditions, so they hold automatically when the 'if' never happens.",
    "In a relation's matrix, reflexive means all 1s on the diagonal and symmetric means the matrix equals its transpose.",
    "Reflexive, symmetric and transitive together make an equivalence relation; reflexive, antisymmetric and transitive make a partial order."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between symmetric and antisymmetric?",
      "answer": "Symmetric means every relationship runs both ways: if a R b then b R a. Antisymmetric means no relationship between two different elements runs both ways: if a R b and b R a, then a = b. They are not opposites. Equality satisfies both, and a relation with pairs (1, 2), (2, 1) and (1, 3) satisfies neither."
    },
    {
      "question": "Is the empty relation transitive?",
      "answer": "Yes. Transitivity says 'if a R b and b R c, then a R c', and in the empty relation the hypothesis never holds, so the condition is never violated. The empty relation is also symmetric and antisymmetric. It is reflexive only on the empty set."
    },
    {
      "question": "How do I check transitivity quickly?",
      "answer": "For every pair (a, b) in the relation, look at every pair that starts with b, say (b, c), and confirm (a, c) is present. In a directed graph, every path of two arrows must have a direct shortcut arrow. One missing shortcut is enough to show the relation is not transitive."
    },
    {
      "question": "How can I see relation properties in a matrix?",
      "answer": "Write a 1 in row a, column b when a R b. Reflexive: every diagonal entry is 1. Symmetric: the matrix equals its transpose. Antisymmetric: no pair of off-diagonal positions (a, b) and (b, a) both hold 1. Transitivity is easiest checked by squaring the matrix with Boolean arithmetic."
    }
  ],
  "sources": [
    {
      "title": "Properties of Relations (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-properties-of-relations.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Matrices of Relations (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-matrices-of-relations.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Equivalence Relation",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/EquivalenceRelation.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

A relation on a set A is any set of ordered pairs from A × A, that is, any subset of the [Cartesian product](/blog/cartesian-product-explained/). Writing a R b means the pair (a, b) is in the relation. "Is less than", "divides", "has the same birthday as" and "is a prerequisite for" are all relations, and four properties sort them into the types that matter most.

## The four properties

| Property | Definition | Fails when |
| --- | --- | --- |
| Reflexive | a R a for every a ∈ A | Some element is not related to itself |
| Symmetric | a R b ⇒ b R a | Some pair runs one way only |
| Antisymmetric | a R b and b R a ⇒ a = b | Two different elements are related both ways |
| Transitive | a R b and b R c ⇒ a R c | Some two-step chain has no direct pair |

These match the definitions in *Applied Discrete Structures*, which actually defines antisymmetry in another form: whenever a R b and a ≠ b, b R a is false. Both versions say the same thing; *Applied Discrete Structures* notes that the version in the table is often more convenient to prove, while its definition is probably easier to understand.

## Worked example: five relations on {1, 2, 3}

| Relation | Pairs | Refl. | Sym. | Antisym. | Trans. |
| --- | --- | --- | --- | --- | --- |
| Equality | (1,1), (2,2), (3,3) | Yes | Yes | Yes | Yes |
| ≤ | (1,1), (1,2), (1,3), (2,2), (2,3), (3,3) | Yes | No | Yes | Yes |
| < | (1,2), (1,3), (2,3) | No | No | Yes | Yes |
| R₄ | (1,1), (2,2), (3,3), (1,2), (2,1) | Yes | Yes | No | Yes |
| R₅ | (1,2), (2,1), (1,3) | No | No | No | No |

Check a few of the less obvious entries:

- **< is not reflexive** because (1, 1) is missing; it is antisymmetric because no two different elements are related both ways.
- **R₄ is transitive.** Chains: (1,2),(2,1) needs (1,1), present; (2,1),(1,2) needs (2,2), present; (1,2),(2,2) needs (1,2), present; and so on.
- **R₅ fails everything.** (2,1) and (1,3) form a chain needing (2,3), which is missing, so it is not transitive. *Applied Discrete Structures* makes the general point with a randomly generated relation, in an example titled "Random relations usually have no properties".

## The traps

**Symmetric and antisymmetric are not opposites.** Equality is both, because the condition for antisymmetry, a R b and b R a with a ≠ b, never occurs. R₅ is neither. *Applied Discrete Structures* calls out equality as the surprising case and explains it the same way: a conditional is always true when its condition is false.

**Vacuous truth.** Symmetry, antisymmetry and transitivity are if-then statements, so they hold automatically when the "if" part never happens. The relation {(1, 2)} on {1, 2, 3} is transitive: there is no chain of two pairs to check. The empty relation is symmetric, antisymmetric and transitive. If this feels like cheating, the [converse, inverse and contrapositive guide](/blog/converse-inverse-contrapositive/) explains why a conditional with a false hypothesis counts as true.

**Reflexive needs every element.** Having *some* loops is not enough. On {1, 2, 3}, a relation containing (1,1) and (2,2) but not (3,3) is not reflexive.

## Reading properties from a matrix

Write the relation as a 0–1 matrix M, with a 1 in row a, column b when a R b. For ≤ on {1, 2, 3}:

| | 1 | 2 | 3 |
| --- | --- | --- | --- |
| **1** | 1 | 1 | 1 |
| **2** | 0 | 1 | 1 |
| **3** | 0 | 0 | 1 |

- **Reflexive:** the diagonal is all 1s.
- **Symmetric:** M equals its transpose (mirror image across the diagonal). Here it does not.
- **Antisymmetric:** no off-diagonal 1 has a 1 in its mirror position. True here.
- **Transitive:** compute the Boolean product M·M (1 + 1 = 1). The relation is transitive when every 1 in M·M is also a 1 in M.

*Applied Discrete Structures* develops these matrix tests in its section on matrices of relations. Adjacency matrices of graphs use the same idea, as in the [adjacency matrix guide](/blog/adjacency-matrix-explained/).

## Reading properties from a directed graph

Draw a dot for each element and an arrow from a to b when a R b.

- Reflexive: a loop at every dot.
- Symmetric: every arrow has a partner going the other way.
- Antisymmetric: no two dots joined by arrows in both directions.
- Transitive: every two-arrow path a → b → c has a direct arrow a → c.

## Why these properties matter

The combinations have names, and each is its own topic:

- **Reflexive, symmetric and transitive:** an [equivalence relation](/blog/equivalence-relations-and-classes/), which splits a set into classes of "interchangeable" elements. MathWorld lists exactly these three conditions.
- **Reflexive, antisymmetric and transitive:** a [partial order](/blog/partial-orders-and-hasse-diagrams/), such as ≤ or "divides" on the positive integers, drawn as a Hasse diagram.

## Closures

If a relation lacks a property, its **closure** is the smallest relation containing it that has the property. The reflexive closure adds the missing loops; the symmetric closure adds every reversed pair; the transitive closure adds shortcuts until no two-step chain is missing one. For R₅, the transitive closure must add (2,3), (1,1) and (2,2), because (1,2),(2,1) and (2,1),(1,2) are chains too. [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) is a study companion for a discrete math course that includes sets, functions and relations, with lessons, knowledge checks and quizzes. Find it with our other [education apps](/apps/category/education-brain/), or read on through the [discrete math hub](/blog/topics/discrete-math/).
