---
{
  "title": "Proof by Contrapositive: The Indirect Proof That Is Often Easiest",
  "metaTitle": "Proof by Contrapositive: How and When to Use It",
  "description": "To prove 'if p then q', prove 'if not q then not p' instead. Why it is valid, how to write one, five worked examples and how to tell it is the right method.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "proofs", "contrapositive", "indirect proof"],
  "primaryKeyword": "proof by contrapositive",
  "secondaryKeywords": [
    "proof by contrapositive examples",
    "contrapositive proof discrete math",
    "if n squared is even then n is even proof",
    "indirect proof contrapositive",
    "how to write a contrapositive proof"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "when to use proof by contrapositive",
    "contrapositive proof with or in the conclusion",
    "proof by contrapositive vs contradiction",
    "prove if 3n plus 2 is odd then n is odd"
  ],
  "aiSearchQuestions": [
    "What is a proof by contrapositive?",
    "How do you write a proof by contrapositive?",
    "When is proof by contrapositive easier than a direct proof?",
    "Is proof by contrapositive the same as proof by contradiction?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "converse-inverse-contrapositive",
    "how-to-write-a-direct-proof",
    "proof-by-contradiction-explained",
    "de-morgans-laws-explained",
    "why-divisibility-rules-work",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A conditional p → q is logically equivalent to its contrapositive ¬q → ¬p, so proving either one proves both.",
    "In a contrapositive proof you assume the conclusion is false and show the hypothesis is false, by a direct argument.",
    "It is the natural choice when the conclusion is a negative or an 'or' statement, or when the hypothesis is hard to use directly.",
    "Negate carefully: by De Morgan's laws, 'not (a or b)' is 'not a and not b'.",
    "Say at the start that you are proving the contrapositive, and state it, so a reader can follow the plan."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a proof by contrapositive?",
      "answer": "A way to prove 'if p then q' by proving 'if not q then not p' instead. The two statements are logically equivalent, so a direct proof of the contrapositive is a proof of the original. You assume q is false and deduce that p is false."
    },
    {
      "question": "When should I use proof by contrapositive?",
      "answer": "When the negation of the conclusion gives you more to work with than the hypothesis. 'If n² is even, then n is even' is hard directly, because knowing n² = 2k says little about n, but 'if n is odd, then n² is odd' is one line of algebra."
    },
    {
      "question": "Is proof by contrapositive the same as proof by contradiction?",
      "answer": "No, though they are related. A contrapositive proof assumes ¬q and has a fixed goal, ¬p. A contradiction proof assumes p and ¬q together and may reach any contradiction. A contrapositive proof is a direct proof of an equivalent statement, which usually makes it easier to read."
    },
    {
      "question": "How do I negate an 'or' conclusion for a contrapositive proof?",
      "answer": "Use De Morgan's laws: the negation of 'a is odd or b is odd' is 'a is even and b is even'. That 'and' is exactly why contrapositive works well for 'or' conclusions: you get two facts to work with instead of a choice between two."
    }
  ],
  "sources": [
    {
      "title": "Proofs: Proof by Contrapositive (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_logic-proofs.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "2.5 Equivalent Statements (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/2-5-equivalent-statements",
      "accessed": "2026-10-24"
    },
    {
      "title": "Book of Proof, 3rd edition (Richard Hammack)",
      "publisher": "Richard Hammack (open textbook)",
      "url": "https://richardhammack.github.io/BookOfProof/",
      "accessed": "2026-10-24"
    }
  ]
}
---

Sometimes the cleanest way to prove "if p, then q" is to prove a different statement: "if not q, then not p". The two say the same thing. OpenStax's *Contemporary Mathematics* states it directly: the contrapositive is logically equivalent to the conditional. So a proof of one is a proof of the other, and you can pick whichever is easier.

Levin's *Discrete Mathematics: An Open Introduction* explains the motivation: plenty of statements are hard to prove directly, but their contrapositive can easily be proved directly.

## The method

1. **Write the contrapositive.** For p → q, it is ¬q → ¬p. Negate each part carefully.
2. **Announce it.** "We prove the contrapositive: if ¬q, then ¬p."
3. **Prove it directly.** Assume ¬q, unpack the definitions, and reason forward to ¬p.
4. **Conclude** that the original statement holds.

Step 2 matters more than it looks. A reader who sees you assume "n is odd" in a proof about "n² is even" will be confused unless you have said what you are doing.

## Example 1: the standard first example

**Claim.** For every integer n, if n² is even, then n is even.

A direct attempt stalls: n² = 2k tells you nothing obvious about n. The contrapositive is "if n is odd, then n² is odd".

**Proof.** We prove the contrapositive. Let n be odd, so n = 2k + 1 for some integer k. Then n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd. ∎

This small result is used inside the classic [proof by contradiction that √2 is irrational](/blog/proof-by-contradiction-explained/), which is a good example of methods working together.

## Example 2: an 'or' in the conclusion

**Claim.** For integers a and b, if ab is even, then a is even or b is even.

A direct proof would need to decide which of a and b is even. The contrapositive, by [De Morgan's laws](/blog/de-morgans-laws-explained/), is "if a is odd and b is odd, then ab is odd", and "and" gives you two facts to use.

**Proof.** We prove the contrapositive. Suppose a and b are both odd: a = 2j + 1 and b = 2k + 1. Then ab = 4jk + 2j + 2k + 1 = 2(2jk + j + k) + 1, which is odd. ∎

## Example 3: a linear expression

**Claim.** For every integer n, if 3n + 2 is odd, then n is odd.

**Proof.** We prove the contrapositive: if n is even, then 3n + 2 is even. Let n = 2k. Then 3n + 2 = 6k + 2 = 2(3k + 1), which is even. ∎

## Example 4: an inequality with 'or'

**Claim.** For real numbers x and y, if x + y ≥ 100, then x ≥ 50 or y ≥ 50.

**Proof.** We prove the contrapositive: if x < 50 and y < 50, then x + y < 100. Adding the two inequalities gives x + y < 50 + 50 = 100. ∎

This is a pigeonhole-style argument in miniature: if a total is large, at least one part must be large. The [pigeonhole principle guide](/blog/pigeonhole-principle-examples/) is the counting version of the same idea.

## Example 5: rational and irrational numbers

**Claim.** For real numbers x and y, if xy is irrational, then x is irrational or y is irrational.

**Proof.** We prove the contrapositive: if x and y are both rational, then xy is rational. Write x = a/b and y = c/d with integers a, b, c, d and b, d ≠ 0. Then xy = ac/bd, a ratio of integers with bd ≠ 0, so xy is rational. ∎

Note the claim is one-directional. The converse is false: √2 and √2 are irrational, yet their product, 2, is rational.

## How to recognise a contrapositive problem

| Sign | Why contrapositive helps |
| --- | --- |
| The conclusion is "or" | Its negation is "and", giving two facts to use |
| The conclusion is negative ("is not divisible", "is irrational") | Its negation is positive, with a definition to unpack |
| The hypothesis is about a square, product or sum | Going from n² back to n is hard; from n to n² is easy |
| A direct attempt gives you an equation you cannot use | Try the other direction before trying contradiction |

## Contrapositive versus contradiction

The two are easy to mix up because both begin by assuming ¬q. The difference is the goal. A contrapositive proof has a fixed target, ¬p, and is really a direct proof of an equivalent statement. A contradiction proof assumes p *and* ¬q and aims for any impossibility.

Any contrapositive proof can be dressed up as a contradiction ("assume p and ¬q; derive ¬p; but p, contradiction"), but the extra wrapping adds nothing. When your contradiction proof never actually uses p until the last line, you have a contrapositive proof and should write it as one. Richard Hammack's *Book of Proof* gives the two separate chapters, contrapositive proof and proof by contradiction, and both are worth practising.

## Common errors

1. **Proving the converse instead.** The converse of p → q is q → p, which is not equivalent. The [converse, inverse and contrapositive guide](/blog/converse-inverse-contrapositive/) shows the difference with a truth table.
2. **Negating incorrectly.** "Not (x ≥ 50)" is x < 50; "not (a or b)" is "not a and not b".
3. **Proving the inverse.** ¬p → ¬q is equivalent to the converse, not the original.
4. **Skipping the announcement.** State the contrapositive before proving it.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a proof techniques unit with lessons and knowledge checks, and its converse-inverse-contrapositive helper forms the three variants of a conditional so you can check you have written the right one. More study tools are listed under [education and brain training](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) links every proof guide.
