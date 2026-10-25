---
{
  "title": "Valid vs Sound Arguments: Why a Valid Argument Can Still Be Wrong",
  "metaTitle": "Valid vs Sound Arguments: The Difference, Explained",
  "description": "A valid argument's conclusion must follow from its premises; a sound one is valid with true premises too. How to test validity, with examples of each case.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "logic", "arguments", "critical thinking"],
  "primaryKeyword": "valid vs sound argument",
  "secondaryKeywords": [
    "what makes an argument valid",
    "sound argument definition",
    "valid but unsound argument example",
    "invalid argument with true conclusion",
    "testing validity with a truth table"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "can a valid argument have a false conclusion",
    "can a sound argument have a false conclusion",
    "how to check if an argument is valid using critical rows",
    "difference between validity and truth"
  ],
  "aiSearchQuestions": [
    "What is the difference between a valid and a sound argument?",
    "Can a valid argument have a false conclusion?",
    "How do you test whether an argument is valid?",
    "Is every sound argument valid?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "rules-of-inference-explained",
    "tautology-contradiction-contingency",
    "syllogisms-explained",
    "common-reasoning-mistakes",
    "how-to-make-a-truth-table",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "An argument is valid when its form makes it impossible for all the premises to be true and the conclusion false.",
    "An argument is sound when it is valid and all its premises are actually true, so a sound argument's conclusion is always true.",
    "Validity depends only on form; you can judge it without knowing whether any premise is true.",
    "To test validity with a truth table, look only at the rows where every premise is true; if the conclusion is false in any of them, the argument is invalid.",
    "A flawed argument does not make its conclusion false: invalid and unsound arguments can still reach true conclusions."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between a valid and a sound argument?",
      "answer": "Validity is about structure: if the premises were true, the conclusion would have to be true. Soundness adds content: the argument is valid and its premises really are true. Every sound argument is valid, but a valid argument with a false premise is unsound."
    },
    {
      "question": "If an argument is valid, must its conclusion be true?",
      "answer": "No. Validity only guarantees a true conclusion when the premises are true. 'All birds can fly; penguins are birds; so penguins can fly' is valid, because the conclusion follows from the premises, but the first premise is false, so the argument is unsound and the conclusion is false."
    },
    {
      "question": "Can a sound argument have a false conclusion?",
      "answer": "No. A sound argument has true premises and a form that guarantees the conclusion is true whenever the premises are. That combination is exactly why mathematical proofs, which start from definitions, axioms and proven results, establish their conclusions."
    },
    {
      "question": "How do I test whether an argument is valid?",
      "answer": "Translate it into symbols and build a truth table with a column for each premise and the conclusion. Mark the rows in which every premise is true. If the conclusion is true in all of them, the argument is valid; one marked row with a false conclusion makes it invalid."
    }
  ],
  "sources": [
    {
      "title": "Validity and Soundness",
      "publisher": "Internet Encyclopedia of Philosophy",
      "url": "https://iep.utm.edu/val-snd/",
      "accessed": "2026-10-24"
    },
    {
      "title": "2.7 Logical Arguments (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/2-7-logical-arguments",
      "accessed": "2026-10-24"
    },
    {
      "title": "Propositional Logic: Deductions (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_propositional.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

In conversation, "that's a valid point" can mean little more than "that's a fair point". In logic the word is narrower and more useful. It describes the *shape* of an argument, not whether its claims are true, and it sits alongside a second idea, soundness, that does care about truth.

## The two definitions

The Internet Encyclopedia of Philosophy defines both for deductive arguments; in paraphrase:

- An argument is **valid** when its form rules out true premises with a false conclusion.
- An argument is **sound** when it is valid and every premise is in fact true.

OpenStax's *Contemporary Mathematics* splits the work slightly differently, calling an argument sound if all its premises are true and noting that, for a conclusion to be proven true, the argument must be both valid and sound. The two accounts reach the same place: a good argument needs a valid form and true premises.

So validity is a conditional guarantee: *if* the premises are true, the conclusion is too. Soundness cashes that guarantee in, because the premises really are true.

## Four combinations

| | Premises all true | Some premise false |
| --- | --- | --- |
| **Valid form** | Sound: conclusion guaranteed true | Valid but unsound: conclusion may be false |
| **Invalid form** | Unsound: conclusion not guaranteed | Unsound |

Examples of each:

1. **Valid and sound.** Every multiple of 6 is even. 18 is a multiple of 6. So 18 is even.
2. **Valid, unsound, false conclusion.** All birds can fly. Penguins are birds. So penguins can fly. The form is fine; the first premise is false.
3. **Valid, unsound, true conclusion.** All cats are reptiles. All reptiles are mammals. So all cats are mammals. Both premises are false and the conclusion happens to be true. Validity was never the problem.
4. **Invalid, with true premises and a true conclusion.** If a number is a multiple of 4, it is even. 12 is even. So 12 is a multiple of 4. Everything stated is true, but the argument affirms the consequent. Run the same form on 10 (10 is even, so 10 is a multiple of 4) and true premises produce a false conclusion.

Example 4 shows the practical meaning of invalidity. An invalid form is one that *can* lead from true premises to a false conclusion, even if it does not in a particular case. That is why "the conclusion is true, so the argument is fine" is not a defence.

## Why validity depends only on form

Replace every content word in example 2 with a letter: all A are B; C is an A; so C is a B. Any argument with that shape is valid, whether it is about birds, numbers or planets. You can judge validity without knowing anything about the subject, which is what makes logic portable. The same is true of the classical forms in our [syllogisms guide](/blog/syllogisms-explained/): each is valid or invalid by its shape alone.

Soundness, by contrast, requires knowing whether the premises are true, which is a question about the world, not about logic.

## Testing validity with a truth table

For arguments built from propositional statements, the truth table gives a mechanical test. Levin's open textbook states the principle: an argument is valid provided the conclusion must be true given that the premises are true.

1. Translate the premises and the conclusion into symbols.
2. Build a [truth table](/blog/how-to-make-a-truth-table/) with a column for each premise and for the conclusion.
3. Mark the **critical rows**, where every premise is true.
4. If the conclusion is true in every critical row, the argument is valid. If it is false in even one, the argument is invalid.

**Test: p → q, q → r, so p → r.**

| p | q | r | p → q | q → r | p → r |
| --- | --- | --- | --- | --- | --- |
| T | T | T | T | T | T |
| T | T | F | T | F | F |
| T | F | T | F | T | T |
| T | F | F | F | T | F |
| F | T | T | T | T | T |
| F | T | F | T | F | T |
| F | F | T | T | T | T |
| F | F | F | T | T | T |

The critical rows are 1, 5, 7 and 8, the rows where both premises are true. The conclusion is true in all four, so the argument is valid. This is the chain rule, also called hypothetical syllogism, one of the standard [rules of inference](/blog/rules-of-inference-explained/).

**Test: p → q, ¬p, so ¬q** (denying the antecedent). Row p = F, q = T makes both premises true and the conclusion ¬q false. One critical row with a false conclusion: invalid.

An equivalent test is to check whether (premise₁ ∧ premise₂ ∧ …) → conclusion is a tautology. The two methods always agree, as explained in [tautology, contradiction or contingency?](/blog/tautology-contradiction-contingency/).

## Where this matters outside a logic class

- **Mathematical proof.** A proof is a valid argument whose premises are definitions, axioms and already-proved results. Because those premises are accepted as true, a correct proof is sound, and its conclusion is established.
- **Evaluating claims.** When you disagree with a conclusion, there are exactly two places to look: a false premise, or an invalid step. Naming which one is the problem makes a disagreement productive.
- **Spotting fallacies.** Some [common reasoning mistakes](/blog/common-reasoning-mistakes/) are invalid forms that resemble valid ones, such as affirming the consequent.

One last point the IEP makes explicitly: an argument being flawed does not show its conclusion is false. Invalid and unsound arguments can have true conclusions. As the IEP puts it, one cannot reject a conclusion simply by finding that a given argument for it is flawed.

## Practise on your own arguments

Write two premises and a conclusion, decide whether the form is valid, then decide whether the premises are true. The argument-validity checker in [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) helps with the first question; the second is up to you. Our [education apps](/apps/category/education-brain/) include logic games as well, and the [discrete math hub](/blog/topics/discrete-math/) collects the logic series in order.
