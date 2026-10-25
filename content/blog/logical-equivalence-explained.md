---
{
  "title": "Proving Logical Equivalence: Truth Tables vs Laws of Logic",
  "metaTitle": "Logical Equivalence: Truth Tables vs Laws of Logic",
  "description": "Two ways to prove statements are logically equivalent: compare truth tables, or rewrite one into the other with named laws. Worked proofs and when to use each.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "logic", "logical equivalence", "proofs"],
  "primaryKeyword": "logical equivalence discrete math",
  "secondaryKeywords": [
    "laws of logic list",
    "prove logical equivalence without truth table",
    "logical equivalence examples",
    "conditional equivalence p implies q",
    "absorption law logic"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "show that p implies q is equivalent to not p or q",
    "how to prove two statements are logically equivalent",
    "logical equivalence step by step with laws",
    "when to use a truth table vs laws of logic"
  ],
  "aiSearchQuestions": [
    "How do you prove two logical statements are equivalent?",
    "What are the laws of logic used in equivalence proofs?",
    "Is p → q equivalent to ¬p ∨ q?",
    "When should I use a truth table instead of logical laws?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "how-to-make-a-truth-table",
    "de-morgans-laws-explained",
    "tautology-contradiction-contingency",
    "boolean-algebra-and-logic-gates",
    "discrete-math-cheat-sheet",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Two statements are logically equivalent when they have the same truth value in every row, which is the same as saying their biconditional is a tautology.",
    "A truth table proves equivalence mechanically and works for any statement, but the number of rows doubles with every variable.",
    "A proof by laws rewrites one statement into the other one step at a time, naming the law used at each step, such as De Morgan's, distributive or absorption.",
    "Replace conditionals with p → q ≡ ¬p ∨ q first; most equivalence proofs become manipulation of and, or and not.",
    "To show two statements are not equivalent, one row where they differ is enough."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does it mean for two statements to be logically equivalent?",
      "answer": "They have the same truth value under every assignment of true and false to their variables. Equivalently, the biconditional between them is a tautology. Equivalent statements can replace each other anywhere in a larger statement without changing its truth value."
    },
    {
      "question": "Is p → q logically equivalent to ¬p ∨ q?",
      "answer": "Yes. Both are false only when p is true and q is false. This identity, often called conditional equivalence or material implication, is the usual first step in an equivalence proof, because it removes the arrow and leaves only and, or and not."
    },
    {
      "question": "Should I use a truth table or the laws of logic?",
      "answer": "Use a truth table when the statements have two or three variables or when the question asks for one. Use the laws when there are more variables, when the question says 'without a truth table', or when you want to see why the equivalence holds. If your course states a preference, follow it."
    },
    {
      "question": "How do I show two statements are not equivalent?",
      "answer": "Find one assignment of truth values where they differ. For p → q and q → p, take p false and q true: the first is true and the second false. A single row is a complete proof of non-equivalence."
    }
  ],
  "sources": [
    {
      "title": "The Laws of Logic (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-logic-laws.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "2.5 Equivalent Statements (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/2-5-equivalent-statements",
      "accessed": "2026-10-24"
    },
    {
      "title": "Propositional Logic (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_propositional.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Two compound statements are logically equivalent when they are true in exactly the same situations. Written P ≡ Q (or P ⇔ Q), it means that under every assignment of true and false to the variables, P and Q come out the same. OpenStax phrases the test in terms of the biconditional: P and Q are equivalent when the last column of the truth table for P ↔ Q is all true.

There are two standard ways to prove an equivalence: OpenStax uses the truth table, and *Applied Discrete Structures* sets out the laws of logic for rewriting one statement into the other.

## Method 1: compare truth tables

Build one table with a final column for each statement. If the columns match in every row, the statements are equivalent; if they differ in any row, they are not.

**Prove p → q ≡ ¬p ∨ q.**

| p | q | p → q | ¬p | ¬p ∨ q |
| --- | --- | --- | --- | --- |
| T | T | T | F | T |
| T | F | F | F | F |
| F | T | T | T | T |
| F | F | T | T | T |

Columns 3 and 5 match, so the two are equivalent. This identity, which *Applied Discrete Structures* lists as conditional equivalence, is the most useful single fact in this topic, because it turns any arrow into "or" and "not".

Truth tables are mechanical and cannot miss a case, which is their strength. Their weakness is size: the row count doubles with each variable, so four variables need 16 rows and five need 32. The [truth table guide](/blog/how-to-make-a-truth-table/) covers the layout.

## Method 2: rewrite with the laws of logic

The second method starts from one statement and rewrites it, one law at a time, until it becomes the other. Each step must cite the law it uses. These are the laws you will use most; *Applied Discrete Structures* tabulates the full set, writing 1 for a statement that is always true and 0 for one that is always false.

| Law | Form |
| --- | --- |
| Commutative | p ∨ q ≡ q ∨ p; p ∧ q ≡ q ∧ p |
| Associative | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r), and likewise for ∧ |
| Distributive | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r); p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) |
| Identity | p ∨ 0 ≡ p; p ∧ 1 ≡ p |
| Negation | p ∧ ¬p ≡ 0; p ∨ ¬p ≡ 1 |
| Idempotent | p ∨ p ≡ p; p ∧ p ≡ p |
| Null (domination) | p ∧ 0 ≡ 0; p ∨ 1 ≡ 1 |
| Absorption | p ∧ (p ∨ q) ≡ p; p ∨ (p ∧ q) ≡ p |
| De Morgan's | ¬(p ∨ q) ≡ ¬p ∧ ¬q; ¬(p ∧ q) ≡ ¬p ∨ ¬q |
| Double negation (involution) | ¬¬p ≡ p |
| Conditional equivalence | p → q ≡ ¬p ∨ q |

Note that "or" distributes over "and" as well as the other way round, unlike ordinary arithmetic, where addition does not distribute over multiplication.

**Worked proof 1: ¬(p → q) ≡ p ∧ ¬q.**

1. ¬(p → q)
2. ≡ ¬(¬p ∨ q) — conditional equivalence
3. ≡ ¬¬p ∧ ¬q — De Morgan's law
4. ≡ p ∧ ¬q — double negation

Three steps, and it explains *why* the negation of a conditional is "the hypothesis holds and the conclusion fails". The [De Morgan's laws guide](/blog/de-morgans-laws-explained/) explains step 3.

**Worked proof 2: (p ∧ q) → p is a tautology**, meaning it is equivalent to 1.

1. (p ∧ q) → p
2. ≡ ¬(p ∧ q) ∨ p — conditional equivalence
3. ≡ (¬p ∨ ¬q) ∨ p — De Morgan's law
4. ≡ (¬p ∨ p) ∨ ¬q — commutative and associative laws
5. ≡ 1 ∨ ¬q — negation law
6. ≡ 1 — null law

**Worked proof 3: (p ∨ q) ∧ ¬p ≡ q ∧ ¬p.**

1. (p ∨ q) ∧ ¬p
2. ≡ ¬p ∧ (p ∨ q) — commutative
3. ≡ (¬p ∧ p) ∨ (¬p ∧ q) — distributive
4. ≡ 0 ∨ (¬p ∧ q) — negation law
5. ≡ ¬p ∧ q — identity law
6. ≡ q ∧ ¬p — commutative

Proof 3 is the logic behind disjunctive syllogism: knowing "p or q" and "not p" leaves exactly "q and not p".

## A strategy that usually works

1. **Remove arrows first.** Replace every → with conditional equivalence and every ↔ with (p → q) ∧ (q → p).
2. **Push negations inward** with De Morgan's laws until each ¬ sits directly on a variable, then cancel double negations.
3. **Look for p and ¬p together.** They collapse to 1 or 0 via the negation laws, and then the null and identity laws tidy up.
4. **Use absorption** to delete redundant terms: p ∨ (p ∧ anything) is just p.
5. **Work from both ends.** If you are stuck, simplify the target statement too and aim to meet in the middle.

Writing the law at each step is not a formality. It is how a marker checks your proof, and it is how you catch a step that is not actually an instance of any law.

## Which method to choose

| Situation | Better method |
| --- | --- |
| Two or three variables, no instruction | Either; a table is safer under time pressure |
| Four or more variables | Laws |
| "Prove without using a truth table" | Laws, necessarily |
| Proving non-equivalence | Neither: find one row where they differ |
| You want to understand why it holds | Laws |

Non-equivalence deserves emphasis. To show p → q is not equivalent to q → p, a full table is overkill. Take p false and q true: the first statement is true and the second is false. One row is a complete proof, which is the point made in [tautology, contradiction or contingency?](/blog/tautology-contradiction-contingency/) about falsifying rows.

## Where this shows up later

The same laws, written with 0 and 1, are the laws of Boolean algebra used to simplify digital circuits; [Boolean algebra and logic gates](/blog/boolean-algebra-and-logic-gates/) makes that connection. In programming, they justify rewriting a complicated condition into a simpler one that behaves the same on every input. The [discrete math cheat sheet](/blog/discrete-math-cheat-sheet/) collects the laws on one page for revision.

For checking your work, the tools section of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) includes a logical-equivalence checker, which checks whether two statements are equivalent, and a statement simplifier. The app belongs to our [education and brain-training collection](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) lists every guide in this series.
