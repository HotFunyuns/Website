---
{
  "title": "The Cartesian Product: Ordered Pairs, Grids and Relations",
  "metaTitle": "Cartesian Product of Sets, Explained with Examples",
  "description": "A × B is the set of ordered pairs (a, b) with a in A and b in B. Worked examples, why |A × B| = |A| · |B|, why order matters, and how relations use it.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "set theory", "cartesian product", "relations"],
  "primaryKeyword": "cartesian product of sets",
  "secondaryKeywords": [
    "cartesian product example",
    "ordered pairs discrete math",
    "cardinality of a cartesian product",
    "is the cartesian product commutative",
    "cartesian product and relations"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what is a cross b if a has 3 elements and b has 2",
    "cartesian product of a set with the empty set",
    "difference between an ordered pair and a set",
    "cartesian product of three sets"
  ],
  "aiSearchQuestions": [
    "What is the Cartesian product of two sets?",
    "How many elements are in A × B?",
    "Is A × B the same as B × A?",
    "How are relations related to Cartesian products?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "set-operations-explained",
    "power-set-explained",
    "properties-of-relations",
    "permutations-vs-combinations",
    "injective-surjective-bijective",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A × B is the set of all ordered pairs (a, b) whose first entry comes from A and second entry from B.",
    "For finite sets, |A × B| = |A| · |B|, which is the multiplication principle of counting in set form.",
    "Order matters: (1, 2) ≠ (2, 1), so A × B and B × A are usually different sets.",
    "A × ∅ = ∅ for any set A, because there is no second entry to choose.",
    "A relation from A to B is any subset of A × B, and a function is a relation with exactly one pair for each element of A."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the Cartesian product of two sets?",
      "answer": "The set of all ordered pairs whose first entry is from the first set and second entry from the second. For A = {1, 2, 3} and B = {x, y}, A × B = {(1, x), (1, y), (2, x), (2, y), (3, x), (3, y)}."
    },
    {
      "question": "How many elements does A × B have?",
      "answer": "|A| times |B| when both are finite. Each of the |A| choices for the first entry can be paired with each of the |B| choices for the second, so a 3-element set and a 2-element set give 6 ordered pairs."
    },
    {
      "question": "Is A × B equal to B × A?",
      "answer": "Usually not. (1, x) is in A × B, but B × A contains (x, 1) instead, and an ordered pair is different from its reverse. The two products have the same number of elements, and they are equal only when A = B or one of the sets is empty."
    },
    {
      "question": "What is a Cartesian product used for?",
      "answer": "It describes every combination of choices: coordinates in the plane (ℝ × ℝ), outcomes of rolling two dice, the squares of a grid such as a chessboard, and pairs of related objects. Relations and functions are defined as subsets of Cartesian products."
    }
  ],
  "sources": [
    {
      "title": "Cartesian Products and Power Sets (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-cartesian_Products_and_Power_Sets.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Sets (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_intro-sets.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Cartesian Product",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/CartesianProduct.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Union and intersection combine sets into new sets of the *same kind of element*. The Cartesian product does something different: it builds a set of *pairs*, one entry from each set. It is the construction behind coordinates, tables, relations and functions, and it is the set-theory version of the multiplication principle of counting.

## Ordered pairs from two sets

For sets A and B, the Cartesian product is

A × B = {(a, b) : a ∈ A and b ∈ B},

the set of all ordered pairs whose first entry is from A and second entry from B. Levin's *Discrete Mathematics: An Open Introduction* points out that this is nothing new to anyone who has graphed a function: the Cartesian plane is the set of all ordered pairs of real numbers, ℝ × ℝ.

**Example.** Let A = {1, 2, 3} and B = {x, y}. Then

A × B = {(1, x), (1, y), (2, x), (2, y), (3, x), (3, y)}.

Arranged as a grid, with A down the side and B across the top, every cell is one pair:

| | x | y |
| --- | --- | --- |
| **1** | (1, x) | (1, y) |
| **2** | (2, x) | (2, y) |
| **3** | (3, x) | (3, y) |

## Counting the pairs

The grid has 3 rows and 2 columns, so 6 cells. In general, for finite sets,

|A × B| = |A| · |B|.

*Applied Discrete Structures* states this rule after an example with A = {1, 2, 3} and B = {4, 5}, noting that it is a good reason for the × symbol. It is the multiplication principle in disguise: choosing a pair means making one choice from A and then one independent choice from B. Two dice, for instance, have {1, …, 6} × {1, …, 6} as their outcomes, 36 ordered pairs in all, which is where the familiar 36 in dice probability comes from.

Products of more sets work the same way. A × B × C is the set of ordered triples (a, b, c), and has |A| · |B| · |C| elements. When all the sets are equal, exponents are used: A² = A × A, A³ = A × A × A, and so on. The set {0, 1}ⁿ is the set of all bit strings of length n, which has 2ⁿ elements, the same count as the [power set](/blog/power-set-explained/) of an n-element set.

## Order matters

An ordered pair is not a set. {1, 2} = {2, 1}, but (1, 2) ≠ (2, 1). Two ordered pairs are equal only when their first entries match *and* their second entries match.

So A × B and B × A are usually different. With A = {1, 2, 3} and B = {x, y}, A × B contains (1, x) while B × A contains (x, 1), and the two sets share no elements at all. They do have the same size, |A| · |B| = |B| · |A|.

Two edge cases are worth knowing:

- **A × ∅ = ∅.** There is no element of ∅ to use as the second entry, so no pairs can be formed. This matches |A| · 0 = 0.
- **A × B = B × A** exactly when A = B, or when A or B is empty.

## How the product interacts with other operations

Cartesian products distribute over union and intersection:

- A × (B ∪ C) = (A × B) ∪ (A × C)
- A × (B ∩ C) = (A × B) ∩ (A × C)

Each is proved by the element-chasing method from the [set operations guide](/blog/set-operations-explained/): take an arbitrary pair (a, b) and follow the definitions. The product does not distribute the other way around, and (A × B) ∪ (C × D) is generally not a product of two sets at all.

## Relations and functions are subsets of products

This is where the Cartesian product does its main work in a discrete math course.

A **relation** from A to B is any subset of A × B. If A is a set of students and B a set of courses, the relation "is enrolled in" is the set of pairs (student, course) where that student takes that course. A relation on a single set A is a subset of A × A; "is less than" on {1, 2, 3} is {(1, 2), (1, 3), (2, 3)}. The [guide to relation properties](/blog/properties-of-relations/) checks such sets for reflexivity, symmetry and transitivity.

A **function** f from A to B is a relation in which every a ∈ A appears as a first entry exactly once. Its graph, {(a, f(a)) : a ∈ A}, is a subset of A × B, which is precisely what you draw when you plot a function. Whether a function is one-to-one or onto is a question about how those pairs use B, the subject of [injective, surjective and bijective functions](/blog/injective-surjective-bijective/).

## Where you see it outside mathematics

- **Grids and coordinates.** A chessboard's squares are {a, …, h} × {1, …, 8}, 64 ordered pairs.
- **Every combination of options.** Three sizes and four colours give 12 product variants, the same count as in [permutations versus combinations](/blog/permutations-vs-combinations/) problems that use the multiplication rule.

## Exercises on products of sets

1. List {a, b} × {1, 2, 3} and {1, 2, 3} × {a, b}. How many pairs are in each, and how many do they share?
2. How many elements does {0, 1}³ × {x, y} have? (8 · 2 = 16.)
3. Prove A × (B ∩ C) = (A × B) ∩ (A × C) by element chasing.
4. Find sets A and B with A × B = B × A and A ≠ B. (One of them must be empty.)

Sets and the functions built from them belong to the sets, functions and countability unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), the fourth in its sequence. It is part of our [education app collection](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) lists the rest of the set-theory guides.
