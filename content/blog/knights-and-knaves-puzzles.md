---
{
  "title": "Knights and Knaves Puzzles: Solving Them with Propositional Logic",
  "metaTitle": "Knights and Knaves Puzzles: How to Solve Them",
  "description": "Knights always tell the truth and knaves always lie. How to turn each statement into a biconditional, solve by cases or truth table, and check the answer.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "logic puzzles", "propositional logic", "truth tables"],
  "primaryKeyword": "knights and knaves puzzles",
  "secondaryKeywords": [
    "knights and knaves logic",
    "truth teller and liar puzzle",
    "how to solve knights and knaves",
    "knights and knaves with truth tables",
    "liar puzzles with answers"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what happens if someone says i am a knave",
    "two guards one always lies which question to ask",
    "knights and knaves three people puzzle",
    "biconditional in knights and knaves"
  ],
  "aiSearchQuestions": [
    "How do you solve knights and knaves puzzles?",
    "Why can no one on the island say 'I am a knave'?",
    "What question finds the right road when one guard always lies?",
    "How do truth tables solve logic puzzles?"
  ],
  "relatedApps": ["discrete-math-study-quiz", "mental-math-memory-games"],
  "relatedArticles": [
    "how-to-make-a-truth-table",
    "tautology-contradiction-contingency",
    "logic-grid-puzzles",
    "deductive-reasoning-examples",
    "proof-by-contradiction-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Let A stand for 'A is a knight'. If A says S, the puzzle gives you the biconditional A ↔ S: A is a knight exactly when S is true.",
    "Solve by cases: assume a speaker is a knight, follow the consequences, and discard any assumption that leads to a contradiction.",
    "For two or three people, a truth table with one row per assignment lists every possibility; keep the rows where every speaker's biconditional holds.",
    "Nobody can say 'I am a knave': a knight would be lying and a knave would be telling the truth.",
    "Always check the final answer against every statement, and check that it is the only consistent assignment."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How do you solve a knights and knaves puzzle?",
      "answer": "Assign a variable to each person meaning 'this person is a knight'. Each statement S by person A becomes A ↔ S. Then either test each case by assuming someone's type and following the consequences, or build a truth table and keep only the rows where every biconditional is true."
    },
    {
      "question": "Why can't anyone say 'I am a knave'?",
      "answer": "A knight saying it would be telling a lie, which knights never do. A knave saying it would be telling the truth, which knaves never do. In logic, A ↔ ¬A is a contradiction, false in every row, so no one on the island can make that statement."
    },
    {
      "question": "What question finds the right road if one guard lies and one tells the truth?",
      "answer": "Ask either guard: 'If I asked you whether the left road leads to the village, would you say yes?' A knight reports his true answer truthfully. A knave would lie to the inner question and then lie about that lie, so the two lies cancel. Either way, 'yes' means the left road is correct."
    },
    {
      "question": "Can a knights and knaves puzzle have more than one answer?",
      "answer": "Yes, if it is badly set. If two different assignments both make every statement consistent, the puzzle cannot be solved. That is why you should check every case or row, not stop at the first one that works."
    }
  ],
  "sources": [
    {
      "title": "Mathematical Statements (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Propositional Logic (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_propositional.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "2.3 Constructing Truth Tables (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/2-3-constructing-truth-tables",
      "accessed": "2026-10-24"
    }
  ]
}
---

On a certain island, every inhabitant is either a **knight**, who always tells the truth, or a **knave**, who always lies. You meet some of them, they make statements, and you must work out who is which. Puzzles of this kind turn propositional logic into a game, and textbooks use them as exercises: Levin's *Discrete Mathematics: An Open Introduction* dresses them up as trolls guarding a bridge, each either a knight or a knave, who will not let you pass until you identify them.

## The translation that solves everything

Use a letter for each person, standing for the statement "this person is a knight". So A means "A is a knight" and ¬A means "A is a knave".

Now the key observation. If A says S, then:

- if A is a knight, S is true;
- if A is a knave, S is false.

Both together say exactly **A ↔ S**: A is a knight if and only if S is true. Every statement in every puzzle becomes a biconditional, and the puzzle becomes a question about which truth assignments make all of them true at once.

## The impossible sentence

What if A says "I am a knave"? The translation is A ↔ ¬A. A knight would be lying; a knave would be telling the truth. A ↔ ¬A is false in every row of its truth table, a contradiction in the sense of [tautology, contradiction or contingency?](/blog/tautology-contradiction-contingency/) So nobody on the island can say it, and a puzzle in which someone does has no solution.

## Puzzle 1: "At least one of us is a knave"

A says: "At least one of us is a knave," referring to A and B. B says nothing.

Translation: A ↔ (¬A ∨ ¬B).

- **Suppose A is a knave.** Then the statement must be false, so neither is a knave, so A is a knight. Contradiction.
- **So A is a knight.** Then the statement is true: at least one of A, B is a knave. A is not, so B is.

**Answer:** A is a knight, B is a knave. Check: A's statement, "at least one of us is a knave", is true, and A is a knight. ✓

## Puzzle 2: two statements that refer to each other

A says: "B is a knave." B says: "A and I are the same type."

Translation: A ↔ ¬B, and B ↔ (A ↔ B).

- **Suppose B is a knight.** Then B's statement is true, so A is also a knight. But then A's statement "B is a knave" is true, while B is a knight. Contradiction.
- **So B is a knave.** Then B's statement is false, so A and B are different types, which makes A a knight. A's statement "B is a knave" is then true, consistent with A being a knight. ✓

**Answer:** A is a knight, B is a knave.

## Puzzle 3: three people, by truth table

A says: "B is a knight." B says: "A and C are different types." C says: "B is a knave."

Translation: A ↔ B; B ↔ (A ⊕ C), where ⊕ means exactly one is true; C ↔ ¬B.

With three people there are 2³ = 8 possible assignments. Build a [truth table](/blog/how-to-make-a-truth-table/) with a column for each biconditional and keep the rows where all three hold. OpenStax's *Contemporary Mathematics* uses the same idea of listing every combination of truth values for compound statements.

| A | B | C | A ↔ B | B ↔ (A ⊕ C) | C ↔ ¬B | All hold? |
| --- | --- | --- | --- | --- | --- | --- |
| T | T | T | T | F | F | No |
| T | T | F | T | T | T | **Yes** |
| T | F | T | F | T | T | No |
| T | F | F | F | F | F | No |
| F | T | T | F | T | F | No |
| F | T | F | F | F | T | No |
| F | F | T | T | F | T | No |
| F | F | F | T | T | F | No |

Exactly one row survives: **A and B are knights, C is a knave.** Check in words: A says B is a knight, true. B says A and C differ, true, since A is a knight and C a knave. C says B is a knave, false, as a knave's statements must be. ✓

The table also proves the solution is unique, which reasoning by cases can miss if you stop at the first consistent answer.

## The two guards

A classic variation: two guards stand at a fork, one road leading to the village. One guard is a knight and one a knave, and you do not know which. You may ask one question of one guard.

Ask either guard: **"If I asked you whether the left road leads to the village, would you say yes?"**

- A knight answers the inner question truthfully and reports that answer truthfully.
- A knave would lie to the inner question, and then lie about what he would say, so the two lies cancel.

Either way, "yes" means the left road is correct. The question works because negating twice gives back the original, the logic law ¬¬p ≡ p.

## A method for any puzzle

1. Give each person a variable meaning "is a knight".
2. Translate each statement S by person X into X ↔ S, rewriting "same type" as ↔ and "different types" as ⊕.
3. For one or two people, reason by cases, using [proof by contradiction](/blog/proof-by-contradiction-explained/) to eliminate assumptions.
4. For three or more, build the truth table or eliminate rows systematically.
5. Check the answer against every statement, and confirm it is the only one.

If you enjoy these, [logic grid puzzles](/blog/logic-grid-puzzles/) train the same systematic elimination, and our guide to [deductive reasoning](/blog/deductive-reasoning-examples/) collects everyday examples. [IQ Test & Brain Training Games](/apps/mental-math-memory-games/) has logic games covering conditional reasoning and deduction, and [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) covers the propositional logic behind these puzzles in its first unit, with a Truth Table Generator for checking tables like the one above. Both are among our [education apps](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) has the rest of the logic series.
