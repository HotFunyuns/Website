---
{
  "title": "Tautology, Contradiction or Contingency? How to Tell in One Truth Table",
  "metaTitle": "Tautology, Contradiction or Contingency: How to Tell",
  "description": "A tautology is always true, a contradiction always false and a contingency depends on its parts. How to classify any statement, with worked truth tables.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "logic", "tautology", "truth tables"],
  "primaryKeyword": "tautology contradiction contingency",
  "secondaryKeywords": [
    "what is a tautology in logic",
    "tautology truth table example",
    "contradiction in propositional logic",
    "how to prove a statement is a tautology",
    "tautology vs contingency"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "is p or not p a tautology",
    "show that p and not p is a contradiction",
    "prove tautology without a truth table",
    "how to tell if a statement is a contingency"
  ],
  "aiSearchQuestions": [
    "What is the difference between a tautology, a contradiction and a contingency?",
    "How do you prove a statement is a tautology?",
    "Is every logically valid argument a tautology?",
    "Can you prove a tautology without a truth table?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "how-to-make-a-truth-table",
    "logical-equivalence-explained",
    "rules-of-inference-explained",
    "de-morgans-laws-explained",
    "knights-and-knaves-puzzles",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A tautology is true in every row of its truth table, a contradiction is false in every row, and a contingency is true in at least one row and false in at least one.",
    "Two statements are logically equivalent exactly when the biconditional between them is a tautology.",
    "An argument is valid exactly when the conditional from the conjunction of its premises to its conclusion is a tautology.",
    "To show a statement is not a tautology you need only one row that makes it false; to show it is one, you must rule out every row.",
    "For statements with many variables, a short proof using known equivalences, or a search for a falsifying row, is faster than a full table."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a tautology in logic?",
      "answer": "A compound statement that is true whatever the truth values of its parts, so its truth table has T in every row of the final column. The simplest example is p ∨ ¬p: either p is true or its negation is."
    },
    {
      "question": "What is the difference between a contradiction and a contingency?",
      "answer": "A contradiction is false in every row, such as p ∧ ¬p. A contingency is true in at least one row and false in at least one other, such as p → q. A contingency's truth depends on the facts, which is why it can go either way."
    },
    {
      "question": "How do you show something is not a tautology?",
      "answer": "Find one assignment of truth values that makes it false. A single falsifying row is a complete answer, and it is often faster to look for that row directly, by asking what each part would need to be, than to build the whole table."
    },
    {
      "question": "Is the negation of a tautology a contradiction?",
      "answer": "Yes. If a statement is true in every row, its negation is false in every row. Likewise the negation of a contradiction is a tautology, and the negation of a contingency is another contingency."
    }
  ],
  "sources": [
    {
      "title": "Tautology",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Tautology.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Contingency",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Contingency.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Equivalence and Implication (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-equivalence-implication.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Every compound statement in propositional logic falls into exactly one of three classes, and the final column of its truth table tells you which.

| Class | Final column | Simplest example |
| --- | --- | --- |
| Tautology | T in every row | p ∨ ¬p |
| Contradiction | F in every row | p ∧ ¬p |
| Contingency | At least one T and at least one F | p → q |

MathWorld defines a tautology as a sentence whose truth table contains only T, and a contingency as one whose table contains at least one T and at least one F. *Applied Discrete Structures* defines a contradiction as an expression that is false in all cases, and adds a convenient notation: it writes 1 for a tautology and 0 for a contradiction, which is how the same ideas look in Boolean algebra.

## Classifying a statement, step by step

1. Build the [truth table](/blog/how-to-make-a-truth-table/), with a column for each connective.
2. Look only at the final column.
3. All T: tautology. All F: contradiction. Anything else: contingency.

**Example 1: [(p → q) ∧ p] → q.**

| p | q | p → q | (p → q) ∧ p | [(p → q) ∧ p] → q |
| --- | --- | --- | --- | --- |
| T | T | T | T | T |
| T | F | F | F | T |
| F | T | T | F | T |
| F | F | T | F | T |

Every row is T, so this is a tautology. It is the statement form of modus ponens: if p implies q and p holds, then q holds. That connection is not an accident, and it is explained below.

**Example 2: (p ∨ q) ∧ (¬p ∧ ¬q).**

| p | q | p ∨ q | ¬p ∧ ¬q | (p ∨ q) ∧ (¬p ∧ ¬q) |
| --- | --- | --- | --- | --- |
| T | T | T | F | F |
| T | F | T | F | F |
| F | T | T | F | F |
| F | F | F | T | F |

Every row is F: a contradiction. It claims that at least one of p and q is true and that both are false. By [De Morgan's laws](/blog/de-morgans-laws-explained/), ¬p ∧ ¬q is the negation of p ∨ q, so the statement has the form r ∧ ¬r. *Applied Discrete Structures* gives the same statement, grouped slightly differently, as one of its examples of a contradiction.

**Example 3: (p → q) → (q → p).**

| p | q | p → q | q → p | (p → q) → (q → p) |
| --- | --- | --- | --- | --- |
| T | T | T | T | T |
| T | F | F | T | T |
| F | T | T | F | F |
| F | F | T | T | T |

Row 3 is F and the others are T, so this is a contingency. In words: "if a conditional holds, its converse holds" is not a law of logic. Row 3 is the counterexample, where q is true and p is false.

## Why tautologies matter: equivalence and validity

Tautologies are not just a classification exercise. Two of the central ideas in logic are defined through them.

**Equivalence.** Statements r and s are logically equivalent when r ↔ s is a tautology; that is the definition *Applied Discrete Structures* uses. Saying the biconditional is always true is the same as saying r and s always have the same truth value. The guide to [proving logical equivalence](/blog/logical-equivalence-explained/) uses this directly.

**Implication and valid arguments.** The same text says r implies s when r → s is a tautology. So an argument with premises P₁, …, Pₙ and conclusion C is valid exactly when (P₁ ∧ … ∧ Pₙ) → C is a tautology. Example 1 is modus ponens written this way. Every rule in the [rules of inference](/blog/rules-of-inference-explained/) corresponds to a tautology of this shape, which is why those rules can be trusted.

## Faster than a full table

A table with five variables has 32 rows. Two shortcuts save time.

**Hunt for a falsifying row.** To test whether a conditional is a tautology, ask what would make it false: the hypothesis true and the conclusion false. Then see whether that is possible.

Take (p ∧ q) → (p ∨ r). For it to be false, p ∧ q must be true, so p is true. But then p ∨ r is true, so the conclusion cannot be false. No falsifying row exists: tautology. That took two lines instead of eight rows.

Take (p ∨ q) → (p ∧ q). Make the hypothesis true with p true and q false; the conclusion is false. One falsifying row is enough: not a tautology, and since the row p = q = T makes it true, it is a contingency.

**Simplify with known laws.** p ∨ (q ∨ ¬p) rearranges, by the commutative and associative laws, to (p ∨ ¬p) ∨ q. Since p ∨ ¬p is always true, the whole statement is a tautology without any table at all.

## Facts worth remembering

- The negation of a tautology is a contradiction, and vice versa. The negation of a contingency is a contingency.
- A contradiction implies any statement, and any statement implies a tautology: 0 → p and p → 1 are both tautologies. This is why a set of premises that contradict each other "proves" anything. It is also why a [proof by contradiction](/blog/proof-by-contradiction-explained/) can stop as soon as it reaches one: if assuming ¬P leads to a statement that is always false, ¬P cannot be true.
- All tautologies are equivalent to one another, a point *Applied Discrete Structures* makes explicitly, and likewise all contradictions.

## Classify these statements

Classify these, then check your answers with a table: p → (q → p); (p → q) ∧ (p ∧ ¬q); (p ↔ q) ∨ (p ↔ ¬q). (Answers: tautology, contradiction, tautology.) Logic puzzles such as [knights and knaves](/blog/knights-and-knaves-puzzles/) are another way to practise, because every solution is a search for the one consistent row.

The truth-table generator in [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) builds a truth table for you, which makes checking these quick once you have tried them by hand. Find more in the [discrete math hub](/blog/topics/discrete-math/) and among our [education and brain-training apps](/apps/category/education-brain/).
