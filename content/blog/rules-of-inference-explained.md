---
{
  "title": "Rules of Inference: Modus Ponens, Modus Tollens and the Rest, with Worked Arguments",
  "metaTitle": "Rules of Inference: Modus Ponens, Tollens and More",
  "description": "The rules of inference used in discrete math, from modus ponens to resolution and the quantifier rules, with a numbered derivation and the fallacies to avoid.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "logic", "rules of inference", "arguments"],
  "primaryKeyword": "rules of inference",
  "secondaryKeywords": [
    "modus ponens and modus tollens",
    "hypothetical syllogism",
    "disjunctive syllogism",
    "rules of inference for quantifiers",
    "rules of inference examples"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to use rules of inference to prove a conclusion",
    "rules of inference table with names",
    "universal instantiation example",
    "resolution rule of inference"
  ],
  "aiSearchQuestions": [
    "What are the rules of inference in discrete math?",
    "What is the difference between modus ponens and modus tollens?",
    "How do you write a proof using rules of inference?",
    "What are the rules of inference for quantified statements?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "valid-vs-sound-arguments",
    "tautology-contradiction-contingency",
    "converse-inverse-contrapositive",
    "predicates-and-quantifiers",
    "deductive-reasoning-examples",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A rule of inference is an argument form that is always valid: whenever its premises are true, its conclusion is true.",
    "Modus ponens goes from p → q and p to q; modus tollens goes from p → q and ¬q to ¬p.",
    "Each propositional rule corresponds to a tautology, such as [(p → q) ∧ p] → q, which is how its validity is checked.",
    "A derivation lists numbered statements, each a premise or the result of a named rule applied to earlier lines.",
    "Affirming the consequent and denying the antecedent look like rules but are invalid."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between modus ponens and modus tollens?",
      "answer": "Both start from a conditional p → q. Modus ponens adds p and concludes q: if it rains the ground is wet, it rains, so the ground is wet. Modus tollens adds ¬q and concludes ¬p: the ground is not wet, so it did not rain."
    },
    {
      "question": "How do you know a rule of inference is valid?",
      "answer": "Write the rule as a single conditional, with the conjunction of the premises as the hypothesis and the conclusion as the consequent, and check that it is a tautology. For modus ponens, [(p → q) ∧ p] → q is true in all four rows of its truth table."
    },
    {
      "question": "What are the rules of inference for quantifiers?",
      "answer": "Universal instantiation: from ∀x P(x), conclude P(c) for any particular c. Universal generalisation: if P(c) holds for an arbitrary c, conclude ∀x P(x). Existential instantiation: from ∃x P(x), introduce a new name c with P(c). Existential generalisation: from P(c), conclude ∃x P(x)."
    },
    {
      "question": "Is affirming the consequent a rule of inference?",
      "answer": "No, it is a fallacy. From p → q and q it does not follow that p. If it rains the ground is wet; the ground is wet; but a sprinkler could explain it. The conditional (p → q) ∧ q → p is false when p is false and q is true."
    }
  ],
  "sources": [
    {
      "title": "The Laws of Logic: Basic Logical Laws, Common Implications and Equivalences (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-logic-laws.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Propositional Logic: Deductions (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_propositional.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Modus Ponens",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/ModusPonens.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Modus Tollens",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/ModusTollens.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

A rule of inference is an argument form that is always valid. Whatever statements you substitute into it, if the premises are true then the conclusion is true. Proofs are chains of these steps, and writing a short argument out formally, one rule per line, makes that structure visible.

Levin's *Discrete Mathematics: An Open Introduction* calls these deduction rules and checks each one the same way: put every premise and the conclusion in a truth table and confirm that in every row where all the premises are true, the conclusion is true too.

## The propositional rules

| Rule | Premises | Conclusion |
| --- | --- | --- |
| Modus ponens (detachment) | p → q, p | q |
| Modus tollens (indirect reasoning) | p → q, ¬q | ¬p |
| Hypothetical syllogism (chain rule) | p → q, q → r | p → r |
| Disjunctive syllogism | p ∨ q, ¬p | q |
| Addition | p | p ∨ q |
| Simplification | p ∧ q | p |
| Conjunction | p, q | p ∧ q |
| Resolution | p ∨ q, ¬p ∨ r | q ∨ r |
| Proof by cases | p → r, q → r, p ∨ q | r |

*Applied Discrete Structures* lists most of these in its table of common implications, under the names detachment, indirect reasoning, disjunctive addition, conjunctive and disjunctive simplification, and the chain rule. Names vary between textbooks, so learn the forms rather than the labels.

Each rule corresponds to a tautology. Modus ponens is the statement [(p → q) ∧ p] → q, which is true in every row of its truth table; the [tautology guide](/blog/tautology-contradiction-contingency/) works through it. That correspondence is what makes the rules trustworthy: an argument that follows them cannot take you from true premises to a false conclusion.

## Modus ponens and modus tollens, side by side

These two are the rules that treat a conditional most directly; Levin calls modus ponens a particularly famous rule.

- **Modus ponens.** If the code compiles, the tests run. The code compiles. Therefore the tests run.
- **Modus tollens.** If the code compiles, the tests run. The tests did not run. Therefore the code did not compile.

Modus tollens is the contrapositive at work: p → q is equivalent to ¬q → ¬p, and modus ponens applied to that gives ¬p. The [converse, inverse and contrapositive guide](/blog/converse-inverse-contrapositive/) explains the equivalence.

## A worked derivation

**Premises:**

1. If the server is down, the site is unreachable. (s → u)
2. If the site is unreachable, support gets tickets. (u → t)
3. Support has no tickets. (¬t)
4. The server is down or the cache is stale. (s ∨ c)

**Conclusion to prove:** the cache is stale (c).

| Step | Statement | Reason |
| ---: | --- | --- |
| 1 | s → u | Premise |
| 2 | u → t | Premise |
| 3 | s → t | Hypothetical syllogism, 1 and 2 |
| 4 | ¬t | Premise |
| 5 | ¬s | Modus tollens, 3 and 4 |
| 6 | s ∨ c | Premise |
| 7 | c | Disjunctive syllogism, 6 and 5 |

Each line is either a premise or follows from earlier lines by a named rule. The format looks fussy, but it makes every step checkable, and it shows exactly which premises the conclusion depends on. Here all four were needed.

## Rules for quantified statements

When statements contain ∀ and ∃, four more rules come into play. They are the formal version of moves every proof makes.

| Rule | From | Conclude | Condition |
| --- | --- | --- | --- |
| Universal instantiation | ∀x P(x) | P(c) | c is any element of the domain |
| Universal generalisation | P(c) | ∀x P(x) | c was arbitrary: nothing special was assumed about it |
| Existential instantiation | ∃x P(x) | P(c) | c is a new name, not used earlier |
| Existential generalisation | P(c) | ∃x P(x) | c is a particular element |

Universal instantiation combined with modus ponens gives the classic syllogism about Socrates. All people are mortal, ∀x (H(x) → M(x)). Socrates is a person, H(s). Instantiate the first premise at s to get H(s) → M(s), then apply modus ponens: M(s).

The conditions are the part to check. Universal generalisation is valid only if c was genuinely arbitrary; checking that the claim holds for c = 3 does not prove it for all integers. Existential instantiation must use a fresh name: if two premises each say something exists, you cannot assume it is the same thing. The [quantifiers guide](/blog/predicates-and-quantifiers/) covers the notation these rules use.

## Two forms that look valid and are not

| Fallacy | Form | Why it fails |
| --- | --- | --- |
| Affirming the consequent | p → q, q, so p | q could be true for another reason |
| Denying the antecedent | p → q, ¬p, so ¬q | q could still be true without p |

For affirming the consequent, the row p false, q true makes both premises true and the conclusion false. One such row shows the form is invalid. Levin's book uses the same test on longer argument forms: if any row of the truth table makes all the premises true and the conclusion false, the form is not a valid deduction rule.

Note the difference between an invalid *form* and a false *conclusion*. An invalid argument can happen to reach a true conclusion, and a valid one can reach a false conclusion from a false premise. That distinction is the subject of [valid versus sound arguments](/blog/valid-vs-sound-arguments/), and the everyday side of it appears in our [deductive reasoning examples](/blog/deductive-reasoning-examples/).

## How to build a derivation yourself

1. Translate each premise and the conclusion into symbols, defining your letters.
2. Work backwards from the conclusion: which rule could produce it, and what would that rule need?
3. Look for chains (p → q, q → r) and for a negated consequent that invites modus tollens.
4. Write the derivation forwards, one rule per line, citing line numbers.
5. Check that every premise you used is one you were given.

The argument-validity checker in [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) tests whether an argument is valid, a quick check before you write out the derivation, and the app has a unit on quantifiers and rules of inference with lessons and knowledge checks. See the [discrete math hub](/blog/topics/discrete-math/) for the rest of the logic guides, and our [education apps](/apps/category/education-brain/) for other study tools.
