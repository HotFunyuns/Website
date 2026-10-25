---
{
  "title": "Boolean Algebra and Logic Gates: From Truth Tables to Circuits",
  "metaTitle": "Boolean Algebra Laws and Logic Gates, Explained",
  "description": "Boolean algebra writes logic with 0, 1, + and ·. The laws, the gates that implement them, building a circuit from a truth table, and a half adder.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "boolean algebra", "logic gates", "digital logic"],
  "primaryKeyword": "boolean algebra laws",
  "secondaryKeywords": [
    "logic gates truth tables",
    "sum of products from truth table",
    "nand gate universal",
    "half adder circuit",
    "simplify boolean expression"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to build a circuit from a truth table",
    "why is nand a universal gate",
    "boolean algebra vs ordinary algebra differences",
    "majority function boolean expression"
  ],
  "aiSearchQuestions": [
    "What are the laws of Boolean algebra?",
    "How do logic gates relate to Boolean algebra?",
    "How do you turn a truth table into a Boolean expression?",
    "Why is NAND called a universal gate?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "logical-equivalence-explained",
    "de-morgans-laws-explained",
    "how-to-make-a-truth-table",
    "number-bases-and-binary",
    "finite-state-machines-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Boolean algebra writes logic with 1 for true, 0 for false, · or juxtaposition for AND, + for OR and a bar or prime for NOT.",
    "Its laws are the laws of logic: commutative, associative, distributive both ways, identity, complement, idempotent, absorption and De Morgan's.",
    "Logic gates are physical versions of the operations: AND, OR and NOT, plus XOR, NAND and NOR.",
    "Any truth table can be turned into a circuit by writing a sum of products, one term for each row whose output is 1, then simplifying.",
    "NAND alone can build NOT, AND and OR, so it can build every circuit."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is Boolean algebra?",
      "answer": "The algebra of the two values 0 and 1 under AND, OR and NOT. It has the same laws as propositional logic, written in algebraic notation: x + y for OR, xy for AND and x̄ for NOT. Its laws let you simplify expressions and the digital circuits that implement them."
    },
    {
      "question": "How is Boolean algebra different from ordinary algebra?",
      "answer": "Some laws look strange: 1 + 1 = 1, x + x = x and x · x = x, and OR distributes over AND, so x + yz = (x + y)(x + z). There are no subtraction or division operations, and every variable can only be 0 or 1."
    },
    {
      "question": "How do you turn a truth table into a Boolean expression?",
      "answer": "For each row with output 1, write the AND of all the inputs, negating those that are 0 in that row. OR these terms together. The result, a sum of products, is correct by construction, and the laws can then simplify it."
    },
    {
      "question": "Why is NAND a universal gate?",
      "answer": "Because NOT, AND and OR can all be built from NAND gates alone: NOT x is x NAND x, AND is NAND followed by NOT, and OR is NAND applied to the two negated inputs, by De Morgan's law. Since AND, OR and NOT can express any truth table, so can NAND."
    }
  ],
  "sources": [
    {
      "title": "A Brief Introduction to Switching Theory and Logic Design (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-logic-design.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Boolean Algebras (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-boolean-algebras.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Boolean Algebra",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/BooleanAlgebra.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Boolean algebra is propositional logic written as algebra: 1 for true, 0 for false, and familiar-looking symbols for AND, OR and NOT. *Applied Discrete Structures* tells the story from the switching side. Early computers relied on many switches to perform logical operations, and pioneers such as Claude Shannon realised that the circuits could be simplified by using an isomorphism between circuits and Boolean algebra. Today's circuits, the book continues, are made of large quantities of gates, which serve the same purpose as switches but can be miniaturised to a great degree.

## The notation

| Logic | Boolean algebra | Gate |
| --- | --- | --- |
| p ∧ q | xy (or x · y) | AND |
| p ∨ q | x + y | OR |
| ¬p | x̄ (or x′) | NOT (inverter) |
| p ⊕ q | x ⊕ y | XOR |
| ¬(p ∧ q) | (xy)‾ | NAND |
| ¬(p ∨ q) | (x + y)‾ | NOR |

The only values are 0 and 1, so the tables are short: 1 + 1 = 1 (true OR true is true), 1 · 0 = 0, and the complement of 1 is 0. *Applied Discrete Structures* uses this notation for its gates, writing XOR, NAND and NOR as x₁ ⊕ x₂, the complement of x₁ · x₂ and the complement of x₁ + x₂.

## The laws

Because Boolean algebra is logic in disguise, its laws are the [laws of logic](/blog/logical-equivalence-explained/):

| Law | Form |
| --- | --- |
| Commutative | x + y = y + x; xy = yx |
| Associative | (x + y) + z = x + (y + z); (xy)z = x(yz) |
| Distributive | x(y + z) = xy + xz; **x + yz = (x + y)(x + z)** |
| Identity | x + 0 = x; x · 1 = x |
| Complement | x + x̄ = 1; x · x̄ = 0 |
| Idempotent | x + x = x; xx = x |
| Domination | x + 1 = 1; x · 0 = 0 |
| Absorption | x + xy = x; x(x + y) = x |
| De Morgan's | (x + y)‾ = x̄ ȳ; (xy)‾ = x̄ + ȳ |

The bold distributive law has no counterpart in ordinary arithmetic, and the idempotent laws look wrong if you read + as addition. Read + as OR and they are obvious. [De Morgan's laws](/blog/de-morgans-laws-explained/) are especially useful for circuits, because they convert between AND-based and OR-based designs.

In the abstract, MathWorld defines a Boolean algebra as a bounded, distributive lattice in which every element has a complement, and describes a Boolean algebra of sets: a family of subsets of a fixed set, closed under union, intersection and complement. The two-element algebra of 0 and 1 is the one used for circuits.

## From truth table to expression

Any truth table can be written as a Boolean expression, by a recipe that always works.

**Example: the majority function.** Three inputs; the output is 1 when at least two inputs are 1.

| x | y | z | M |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

**Step 1: sum of products.** For each row where M = 1, write a product that is 1 on that row only, negating the inputs that are 0:

M = x̄yz + xȳz + xyz̄ + xyz.

**Step 2: simplify.** Using idempotence to reuse xyz three times (xyz = xyz + xyz + xyz):

M = (x̄yz + xyz) + (xȳz + xyz) + (xyz̄ + xyz) = yz + xz + xy.

Each bracket simplifies with the distributive and complement laws, for example x̄yz + xyz = yz(x̄ + x) = yz. The result, M = xy + yz + xz, needs three AND gates and one three-input OR gate instead of the four three-input ANDs of step 1. *Applied Discrete Structures* uses the laws the same way, simplifying a three-input circuit until it can be realised by a much simpler one that does not even need the third input. The [truth table guide](/blog/how-to-make-a-truth-table/) covers building the table in the first place.

## Building an adder

Adding two one-bit numbers x and y gives a sum bit S and a carry bit C:

| x | y | C | S |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

Reading the columns: **S = x ⊕ y** and **C = xy**. One XOR gate and one AND gate form a **half adder**. Chaining adders, with carries passed along, adds binary numbers of any length, which ties this topic to [binary representation](/blog/number-bases-and-binary/). The majority function above is exactly the carry-out of a full adder, which adds three bits: the carry is 1 when at least two of them are 1.

## NAND can do everything

The NAND gate outputs the complement of xy. With NAND alone:

- **NOT:** x NAND x = (xx)‾ = x̄.
- **AND:** take NAND, then NOT it: ((xy)‾)‾ = xy.
- **OR:** x̄ NAND ȳ = (x̄ ȳ)‾ = x + y, by De Morgan's law.

Since AND, OR and NOT can express any truth table (by the sum-of-products recipe), NAND gates alone can build any circuit. NOR gates have the same property. *Applied Discrete Structures* sets the related exercise of building XOR from AND, OR and NOT; one answer is x ⊕ y = xȳ + x̄y.

## Exercises in simplifying and building gates

1. Simplify x + x̄y. (x + y, using the distributive law x + x̄y = (x + x̄)(x + y).)
2. Write a sum of products for a function that is 1 exactly when x = y. (x̄ȳ + xy.)
3. Build NOT x using only NOR gates.

Circuits that also remember a state, rather than just combining their inputs, are modelled by [finite state machines](/blog/finite-state-machines-explained/). The logic behind all of this is the first unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), logic and reasoning, and the app's tools include a truth-table generator, a logical-equivalence checker and a statement simplifier for practising it. It is one of our [education apps](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) has the logic series in order.
