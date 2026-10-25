---
{
  "title": "Converse, Inverse and Contrapositive: Which One Means the Same Thing?",
  "metaTitle": "Converse, Inverse and Contrapositive, Explained",
  "description": "The contrapositive of an if-then statement always means the same thing; the converse and inverse do not. Truth tables, examples and the mistakes to avoid.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "logic", "conditional statements", "contrapositive"],
  "primaryKeyword": "converse inverse contrapositive",
  "secondaryKeywords": [
    "contrapositive of a conditional statement",
    "converse vs contrapositive",
    "is the contrapositive equivalent",
    "inverse of a conditional statement",
    "negation of a conditional statement"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is the contrapositive logically equivalent",
    "converse and inverse are equivalent to each other",
    "how to write the contrapositive of an if then statement",
    "difference between inverse and negation of a conditional"
  ],
  "aiSearchQuestions": [
    "What is the difference between the converse, inverse and contrapositive?",
    "Which form of a conditional statement is logically equivalent to it?",
    "How do you negate an if-then statement?",
    "Is the converse of a true statement always true?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "how-to-make-a-truth-table",
    "proof-by-contrapositive-explained",
    "conditional-reasoning-if-then",
    "rules-of-inference-explained",
    "valid-vs-sound-arguments",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "For a conditional p → q, the converse is q → p, the inverse is ¬p → ¬q and the contrapositive is ¬q → ¬p.",
    "The contrapositive is logically equivalent to the original statement; the converse and the inverse are equivalent to each other but not to the original.",
    "The negation of p → q is p ∧ ¬q, not the inverse: a conditional is false only when the hypothesis holds and the conclusion fails.",
    "Treating a true statement's converse as true is the fallacy of affirming the consequent, and treating its inverse as true is denying the antecedent.",
    "Proving the contrapositive is a legitimate way to prove the original statement, and often the easier one."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Which variation of a conditional statement is equivalent to it?",
      "answer": "The contrapositive. 'If p then q' and 'if not q then not p' have identical truth tables, so they are true or false together. The converse and the inverse match each other, but each can be false when the original is true."
    },
    {
      "question": "Is the inverse the same as the negation of a conditional?",
      "answer": "No. The inverse of p → q is ¬p → ¬q, another conditional. The negation is p ∧ ¬q, which says the hypothesis is true and the conclusion is false. For 'if it rains, the game is cancelled', the negation is 'it rains and the game is not cancelled'."
    },
    {
      "question": "If a statement is true, is its converse true?",
      "answer": "Not necessarily. 'If a number is divisible by 4, it is even' is true, but its converse, 'if a number is even, it is divisible by 4', fails for 6. When both a statement and its converse are true, the two parts are equivalent and you can write p ↔ q."
    },
    {
      "question": "How do I write the contrapositive in words?",
      "answer": "Swap the two parts and negate both. 'If the program compiles, it has no syntax errors' becomes 'if the program has syntax errors, it does not compile'. Negate carefully: the negation of 'all are' is 'not all are', and the negation of 'A and B' is 'not A or not B'."
    }
  ],
  "sources": [
    {
      "title": "2.5 Equivalent Statements (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/2-5-equivalent-statements",
      "accessed": "2026-10-24"
    },
    {
      "title": "Converse",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Converse.html",
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

Every if-then statement comes with three relatives, each made by swapping or negating its two parts. Only one of them is guaranteed to mean the same thing as the original, and mixing them up produces two well-known invalid arguments, as well as errors in proofs.

Start with a conditional, p → q, read "if p, then q". p is the hypothesis and q is the conclusion.

| Name | Form | Made by |
| --- | --- | --- |
| Conditional | p → q | — |
| Converse | q → p | Swapping hypothesis and conclusion |
| Inverse | ¬p → ¬q | Negating both parts |
| Contrapositive | ¬q → ¬p | Swapping and negating both |

OpenStax's *Contemporary Mathematics* states the result in one line each: the contrapositive is logically equivalent to the conditional, and the converse and inverse are logically equivalent to each other.

## One example, four statements

Take a true statement about integers: **if a number is divisible by 4, then it is even.**

- **Converse:** if a number is even, then it is divisible by 4. *False*: 6 is even and not divisible by 4.
- **Inverse:** if a number is not divisible by 4, then it is not even. *False*: 6 again, not divisible by 4 but even.
- **Contrapositive:** if a number is not even, then it is not divisible by 4. *True*: an odd number cannot be a multiple of 4.

The same counterexample, 6, breaks both the converse and the inverse. That is no coincidence. The inverse is the contrapositive of the converse, so the two always stand or fall together.

## The truth table that settles it

| p | q | p → q | q → p | ¬p → ¬q | ¬q → ¬p |
| --- | --- | --- | --- | --- | --- |
| T | T | T | T | T | T |
| T | F | F | T | T | F |
| F | T | T | F | F | T |
| F | F | T | T | T | T |

The original (column 3) and the contrapositive (column 6) agree in every row. The converse and the inverse (columns 4 and 5) agree with each other and differ from the original in rows 2 and 3. If you are unsure how each column is filled, the [step-by-step truth table guide](/blog/how-to-make-a-truth-table/) explains the method; the key fact is that a conditional is false in exactly one row, when its hypothesis is true and its conclusion false.

There is also an intuitive reason the contrapositive works. "If p then q" says q always comes with p. So if q is missing, p cannot be there either, which is exactly what ¬q → ¬p says.

## Negation is not the inverse

The negation of "if p then q" is not another if-then statement. A conditional is false only when the hypothesis is true and the conclusion is false, so

¬(p → q) ≡ p ∧ ¬q.

For "if it rains, the game is cancelled", the negation is "it rains and the game is not cancelled". The inverse, "if it does not rain, the game is not cancelled", is a different claim altogether, and it can be false while the original is true: the game could be cancelled for some other reason.

This matters most in proofs by contradiction, where the first line assumes the negation of what you want to prove. If the statement is a conditional, that first line is "suppose p is true and q is false", not "suppose not p".

## Words that hide a conditional

Conditionals do not always say "if… then". All of these mean p → q:

- **q if p**
- **p only if q**
- **p is sufficient for q**
- **q is necessary for p**
- **q whenever p**

"Only if" is the one to read most carefully. "You can enrol only if you have passed the prerequisite" means enrolling → passed, not the other way round: passing the prerequisite does not guarantee a place. Rewriting it as a contrapositive often helps: if you have not passed, you cannot enrol.

## The two fallacies these mistakes create

Using the converse or inverse as if they were equivalent produces two classic invalid arguments.

**Affirming the consequent (using the converse).** If the battery is dead, the car will not start. The car will not start. Therefore the battery is dead. The car may be out of fuel.

**Denying the antecedent (using the inverse).** If the battery is dead, the car will not start. The battery is not dead. Therefore the car will start. Again, it may be out of fuel.

Both arguments have true premises and a conclusion that does not follow. The [guide to valid and sound arguments](/blog/valid-vs-sound-arguments/) explains why validity is about form rather than content, and the [rules of inference](/blog/rules-of-inference-explained/) list the forms that are valid, modus ponens and modus tollens. Modus tollens, from p → q and ¬q conclude ¬p, is the contrapositive in action.

## Why the contrapositive is useful in proofs

Because the two are equivalent, proving ¬q → ¬p proves p → q. This is often easier. To prove "if n² is even, then n is even" directly, you would have to get from n² back to n. The contrapositive, "if n is odd, then n² is odd", is one line of algebra: write n = 2k + 1, so n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd. The [proof by contrapositive guide](/blog/proof-by-contrapositive-explained/) works through more examples and shows when to choose it.

## Practise the transformations

Write the converse, inverse and contrapositive of a statement, then decide which are true and find a counterexample for each one that is not. The everyday versions in our [conditional reasoning guide](/blog/conditional-reasoning-if-then/) are good material. [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a converse-inverse-contrapositive helper among its tools, which forms the three variants of a conditional, useful for checking an answer you have already written. More practice for logic and reasoning sits among our [education and brain-training apps](/apps/category/education-brain/) and in the [discrete math hub](/blog/topics/discrete-math/).
