---
{
  "title": "De Morgan's Laws Explained, with Logic and Set Examples",
  "metaTitle": "De Morgan's Laws Explained: Logic, Sets and Code",
  "description": "De Morgan's laws say how to negate an and or an or: flip the connective and negate each part. Proofs by truth table and Venn diagram, plus uses in code.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "logic", "set theory", "boolean algebra"],
  "primaryKeyword": "de morgans laws",
  "secondaryKeywords": [
    "de morgan's law logic",
    "de morgan's law sets",
    "negation of and statement",
    "de morgan's law proof",
    "de morgan's law in programming"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to prove de morgan's law with a truth table",
    "de morgan's law venn diagram",
    "negate x greater than 0 and x less than 10",
    "de morgan's law for three sets"
  ],
  "aiSearchQuestions": [
    "What are De Morgan's laws?",
    "How do you prove De Morgan's laws?",
    "What is the negation of 'p and q'?",
    "How are De Morgan's laws used in programming?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "how-to-make-a-truth-table",
    "set-operations-explained",
    "logical-equivalence-explained",
    "negating-quantified-statements",
    "boolean-algebra-and-logic-gates",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "In logic: not (p and q) is equivalent to (not p) or (not q), and not (p or q) is equivalent to (not p) and (not q).",
    "In sets: the complement of a union is the intersection of the complements, and the complement of an intersection is the union of the complements.",
    "The rule of thumb is to negate each part and flip the connective; forgetting to flip it is the standard mistake.",
    "Both laws can be proved with a four-row truth table, and the set versions with a Venn diagram or an element-by-element argument.",
    "The laws extend to any number of terms and to quantifiers, where not-for-all becomes there-exists-not."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What are De Morgan's laws in simple terms?",
      "answer": "They say how to negate a combined statement. 'Not both' means 'at least one is not', and 'not either' means 'neither'. In symbols, ¬(p ∧ q) ≡ ¬p ∨ ¬q and ¬(p ∨ q) ≡ ¬p ∧ ¬q."
    },
    {
      "question": "How do you prove De Morgan's laws?",
      "answer": "For logic, build a truth table with columns for ¬(p ∧ q) and ¬p ∨ ¬q and check that they match in all four rows; repeat for the other law. For sets, show that an element is in one side exactly when it is in the other, or shade both sides on a Venn diagram."
    },
    {
      "question": "What is the negation of 'x > 0 and x < 10'?",
      "answer": "x ≤ 0 or x ≥ 10. Negate each part, so > becomes ≤ and < becomes ≥, and change 'and' to 'or'. The original describes the numbers strictly between 0 and 10; the negation describes everything outside that interval, including 0 and 10."
    },
    {
      "question": "Do De Morgan's laws work for more than two terms?",
      "answer": "Yes. ¬(p ∧ q ∧ r) ≡ ¬p ∨ ¬q ∨ ¬r, and the complement of A ∪ B ∪ C is the intersection of the three complements. The general version follows by applying the two-term law repeatedly, and makes a good exercise in induction."
    }
  ],
  "sources": [
    {
      "title": "2.6 De Morgan's Laws (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/2-6-de-morgans-laws",
      "accessed": "2026-10-24"
    },
    {
      "title": "de Morgan's Laws",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/deMorgansLaws.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Laws of Set Theory (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-laws-of-set-theory.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

De Morgan's laws answer a question that comes up in logic, set theory and programming alike: how do you negate a statement joined by "and" or "or"? The answer is short. Negate each part and flip the connective.

| | Logic | Sets |
| --- | --- | --- |
| First law | ¬(p ∧ q) ≡ ¬p ∨ ¬q | (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ |
| Second law | ¬(p ∨ q) ≡ ¬p ∧ ¬q | (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ |

The laws are named after Augustus De Morgan. OpenStax's *Contemporary Mathematics* credits his work, with George Boole's, as part of the bridge from 19th-century logic to the computer, and MathWorld notes that the same identities hold in any Boolean algebra, including the algebra of sets.

## The logic version in words

- **Not both** means **at least one is not.** "It is not true that the store is open and has stock" means the store is closed, or it has no stock, or both.
- **Not either** means **neither.** "It is not true that the train is late or cancelled" means it is not late and it is not cancelled.

The second reading tends to match everyday English: "not (late or cancelled)" plainly rules out a cancellation. The first needs more care. "Not (open and in stock)" does not say the store is closed. It says at least one of the two failed.

## Proof by truth table

The first law, ¬(p ∧ q) ≡ ¬p ∨ ¬q:

| p | q | p ∧ q | ¬(p ∧ q) | ¬p | ¬q | ¬p ∨ ¬q |
| --- | --- | --- | --- | --- | --- | --- |
| T | T | T | F | F | F | F |
| T | F | F | T | F | T | T |
| F | T | F | T | T | F | T |
| F | F | F | T | T | T | T |

Columns 4 and 7 agree in every row, so the two statements are logically equivalent. The second law has the same kind of proof; building it yourself is good practice, and the [truth table guide](/blog/how-to-make-a-truth-table/) explains the layout. Matching final columns is the standard test for [logical equivalence](/blog/logical-equivalence-explained/).

## The set version, and why it is the same law

Union behaves like "or", intersection like "and", and complement like "not". An element x is in (A ∪ B)ᶜ when it is not in A or B, which means it is in neither, so x ∈ Aᶜ and x ∈ Bᶜ. That is x ∈ Aᶜ ∩ Bᶜ. Each step is reversible, so the two sets are equal.

**A small example.** Take the universal set U = {1, 2, 3, 4, 5, 6}, with A = {1, 2, 3} and B = {3, 4}.

- A ∪ B = {1, 2, 3, 4}, so (A ∪ B)ᶜ = {5, 6}.
- Aᶜ = {4, 5, 6} and Bᶜ = {1, 2, 5, 6}, so Aᶜ ∩ Bᶜ = {5, 6}.

The two sides match. For the other law: A ∩ B = {3}, so (A ∩ B)ᶜ = {1, 2, 4, 5, 6}, and Aᶜ ∪ Bᶜ = {1, 2, 4, 5, 6} as well.

On a Venn diagram, MathWorld puts it this way: an element is outside the union exactly when it is outside both sets, and outside the intersection exactly when it is outside at least one of them. Shade both sides and the regions coincide. *Applied Discrete Structures* lists both identities among its basic laws of set theory, and the [set operations guide](/blog/set-operations-explained/) covers union, intersection and complement in detail.

## Negating conditions in code

Programmers use De Morgan's laws to invert a condition. In languages that write AND as `&&`, OR as `||` and NOT as `!`:

- `!(a && b)` is equivalent to `!a || !b`
- `!(a || b)` is equivalent to `!a && !b`

A typical case is a range check. "x is between 0 and 10" is `x > 0 && x < 10`. Its negation is `x <= 0 || x >= 10`, not `x <= 0 && x >= 10`, which no number satisfies. Writing a loop's exit condition from its continue condition is the same exercise. Digital logic uses the laws too: they let a circuit built from AND gates and inverters be rebuilt from OR gates, which is covered in [Boolean algebra and logic gates](/blog/boolean-algebra-and-logic-gates/).

## More than two terms, and quantifiers

The laws extend to any number of parts:

¬(p₁ ∧ p₂ ∧ … ∧ pₙ) ≡ ¬p₁ ∨ ¬p₂ ∨ … ∨ ¬pₙ

and similarly for "or". The extension follows by applying the two-term law repeatedly, and proving it formally is a good exercise in induction.

Quantifiers follow the same pattern, because "for all x" is a long "and" and "there exists x" a long "or". The negation of "every student passed" is "some student did not pass", not "no student passed". The [guide to negating quantified statements](/blog/negating-quantified-statements/) applies this to nested quantifiers.

## Negation slips

1. **Negating the parts but not the connective.** ¬(p ∧ q) is not ¬p ∧ ¬q. "Not (tall and fast)" does not mean "slow and short".
2. **Flipping the connective but not the parts.** ¬(p ∧ q) is not p ∨ q.
3. **Mishandling inequalities.** The negation of x < 10 is x ≥ 10, not x > 10.
4. **Applying the law across a conditional.** ¬(p → q) is p ∧ ¬q, a different identity. The [converse, inverse and contrapositive guide](/blog/converse-inverse-contrapositive/) explains it.

The statement simplifier and logical-equivalence checker in [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) can be used to check a negation you have rewritten by hand, and its quantifier negation tool covers the ∀ and ∃ case. More guides are in the [discrete math hub](/blog/topics/discrete-math/), and our other learning apps are under [education and brain training](/apps/category/education-brain/).
