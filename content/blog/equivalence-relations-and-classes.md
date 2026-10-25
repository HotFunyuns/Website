---
{
  "title": "Equivalence Relations and Equivalence Classes, with Partitions You Can Draw",
  "metaTitle": "Equivalence Relations and Classes, Explained",
  "description": "An equivalence relation is reflexive, symmetric and transitive, and it splits a set into equivalence classes. How to prove one, find its classes and draw them.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "relations", "equivalence classes", "partitions"],
  "primaryKeyword": "equivalence relation",
  "secondaryKeywords": [
    "equivalence class",
    "equivalence relation examples",
    "how to prove an equivalence relation",
    "partition of a set",
    "congruence modulo n equivalence classes"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "equivalence classes of congruence mod 3",
    "how many equivalence relations on a set of 3 elements",
    "relationship between partitions and equivalence relations",
    "is having the same birthday an equivalence relation"
  ],
  "aiSearchQuestions": [
    "What is an equivalence relation?",
    "How do you find the equivalence classes of a relation?",
    "How do you prove a relation is an equivalence relation?",
    "What is the connection between equivalence relations and partitions?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "properties-of-relations",
    "modular-arithmetic-explained",
    "partial-orders-and-hasse-diagrams",
    "graph-isomorphism-explained",
    "set-operations-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "An equivalence relation is reflexive, symmetric and transitive; it behaves like 'is the same as, in some respect'.",
    "The equivalence class [a] is the set of everything related to a, and two classes are either identical or disjoint.",
    "The classes of an equivalence relation partition the set, and every partition comes from exactly one equivalence relation.",
    "Congruence modulo n is the key example: it splits the integers into n classes, the remainders 0 to n − 1.",
    "To prove a relation is an equivalence relation, check all three properties from the definition; one failed property is enough to show it is not."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is an equivalence relation?",
      "answer": "A relation on a set that is reflexive (everything is related to itself), symmetric (if a is related to b, then b is related to a) and transitive (if a is related to b and b to c, then a is related to c). Equality, 'has the same remainder mod 5' and 'has the same birthday as' are examples."
    },
    {
      "question": "What is an equivalence class?",
      "answer": "For an element a, its equivalence class [a] is the set of all elements related to a. Under congruence mod 3, [1] = {…, −5, −2, 1, 4, 7, …}. Any element of a class can represent it: [1] = [4] = [7]."
    },
    {
      "question": "Why do equivalence classes form a partition?",
      "answer": "Every element is in its own class, by reflexivity, so the classes cover the set. And if two classes share any element, symmetry and transitivity force them to be identical, so distinct classes never overlap. Covering without overlap is exactly a partition."
    },
    {
      "question": "Is 'is a friend of' an equivalence relation?",
      "answer": "Usually not. It may be symmetric, but it is not transitive, since a friend of a friend need not be your friend, and whether people count as their own friends is unclear. With an everyday relation like this, transitivity is a good property to test first."
    }
  ],
  "sources": [
    {
      "title": "Properties of Relations: Equivalence Relations (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-properties-of-relations.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Equivalence Relation",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/EquivalenceRelation.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Greatest Common Divisors and the Integers Modulo n (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-gcds-and-zsubn.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Mathematics is full of things that are "the same" without being identical. The fractions 1/2 and 2/4 are different expressions for one number. 7 and 19 leave the same remainder when divided by 12, so they are the same hour on a clock. Two graphs drawn differently can have the same structure. An equivalence relation is the precise version of "the same in the respect we care about", and its equivalence classes are the groups of things that count as the same.

## Reflexive, symmetric and transitive

A relation ~ on a set A is an **equivalence relation** when it is

- **reflexive:** a ~ a for every a,
- **symmetric:** a ~ b implies b ~ a, and
- **transitive:** a ~ b and b ~ c imply a ~ c.

*Applied Discrete Structures* calls equality the classic example and explains the name: relations that satisfy these three conditions behave very much like equality. The three properties are covered one at a time, with ways to test them, in [checking a relation's properties](/blog/properties-of-relations/).

## Examples and non-examples

| Relation | Set | Equivalence relation? |
| --- | --- | --- |
| a = b | Any set | Yes |
| a ≡ b (mod n) | Integers | Yes |
| Same birthday | People | Yes |
| a/b and c/d with ad = bc | Pairs of integers, b, d ≠ 0 | Yes: equal fractions |
| a ≤ b | Integers | No: not symmetric |
| |a − b| ≤ 1 | Integers | No: not transitive (1 ~ 2, 2 ~ 3, but not 1 ~ 3) |
| "is a friend of" | People | Usually no: not transitive |

The fraction example is the one *Applied Discrete Structures* uses to motivate equivalence classes: every fraction belongs to a set of equivalent fractions, any of which can stand in for the others when doing arithmetic.

## Equivalence classes

For an element a, its **equivalence class** is

[a] = {x ∈ A : x ~ a},

everything equivalent to a. Any member of the class can represent it.

**Congruence mod 3 on the integers** gives three classes:

- [0] = {…, −6, −3, 0, 3, 6, …}
- [1] = {…, −5, −2, 1, 4, 7, …}
- [2] = {…, −4, −1, 2, 5, 8, …}

So [1] = [4] = [−2]: they are three names for one class. These three classes are the "integers mod 3", the setting for [modular arithmetic](/blog/modular-arithmetic-explained/). *Applied Discrete Structures* defines congruence modulo n by a ≡ b exactly when n divides a − b, and checks each property directly from that definition.

## Partitions: the picture behind the classes

A **partition** of A is a collection of non-empty subsets that cover A and do not overlap. Draw A as a region and the partition as lines dividing it into pieces; every element lies in exactly one piece.

The central theorem of the topic says equivalence relations and partitions are two descriptions of the same thing:

1. The distinct equivalence classes of an equivalence relation on A form a partition of A.
2. Every partition of A comes from exactly one equivalence relation: "is in the same piece as".

*Applied Discrete Structures* states the first direction as a theorem and notes that all three properties are used in its proof. Here is why. Reflexivity puts each a in its own class [a], so the classes cover A. Now suppose [a] and [b] share an element c. Then c ~ a and c ~ b, so by symmetry a ~ c, and by transitivity a ~ b. From there, anything equivalent to a is equivalent to b and vice versa, so [a] = [b]. Two classes are therefore either identical or disjoint.

## Worked example: a relation on a small set

Let A = {1, 2, 3, 4, 5, 6} and define a ~ b when a and b have the same remainder on division by 3. The classes are {1, 4}, {2, 5} and {3, 6}. Draw six dots, circle each pair, and you have the partition.

Conversely, start with the partition {{1, 2}, {3}, {4, 5, 6}}. Its equivalence relation contains (1,1), (1,2), (2,1), (2,2), (3,3) and the nine pairs among 4, 5 and 6, 14 pairs in all.

## How to prove a relation is an equivalence relation

Check the three properties from the definition, in order.

**Claim.** On the integers, a ~ b when a − b is even, is an equivalence relation.

- **Reflexive:** a − a = 0 is even.
- **Symmetric:** if a − b = 2k, then b − a = 2(−k), which is even.
- **Transitive:** if a − b = 2j and b − c = 2k, then a − c = (a − b) + (b − c) = 2(j + k), which is even. ∎

Its classes are the even integers and the odd integers. To show a relation is *not* an equivalence relation, one failed property with a specific counterexample is enough.

## Counting equivalence relations

Because equivalence relations correspond to partitions, counting one counts the other. A 3-element set {a, b, c} has 5 partitions: everything together; {a, b}{c}; {a, c}{b}; {b, c}{a}; and all separate. So it has exactly 5 equivalence relations. For 4 elements there are 15: one with everything together, 4 that split off a single element, 3 that split into two pairs, 6 with one pair and two singletons, and one with everything separate.

## Where equivalence relations appear

- **Modular arithmetic:** integers grouped by remainder.
- **Graph theory:** "is isomorphic to" groups graphs by structure, the topic of [graph isomorphism](/blog/graph-isomorphism-explained/); "is connected to by a path" splits a graph's vertices into connected components.

MathWorld's entry on equivalence relations lists the same three conditions and is a convenient reference. Relations are among the topics of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), alongside sets and functions. See our [education category](/apps/category/education-brain/) for related apps, or the [discrete math hub](/blog/topics/discrete-math/) for the next guide, [partial orders and Hasse diagrams](/blog/partial-orders-and-hasse-diagrams/).
