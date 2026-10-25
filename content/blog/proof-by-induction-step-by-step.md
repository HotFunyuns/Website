---
{
  "title": "Proof by Induction, Step by Step: Base Case, Hypothesis and the Inductive Step",
  "metaTitle": "Proof by Induction: Step-by-Step with Worked Examples",
  "description": "How to write a proof by induction: the base case, the inductive hypothesis and the step that uses it, with worked sum, divisibility and inequality proofs.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "proofs", "induction", "sequences"],
  "primaryKeyword": "proof by induction",
  "secondaryKeywords": [
    "mathematical induction examples",
    "proof by induction steps",
    "inductive hypothesis",
    "induction proof divisibility",
    "induction proof inequality"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to write the inductive step",
    "proof by induction sum of odd numbers",
    "prove 3 divides n cubed minus n by induction",
    "why does mathematical induction work"
  ],
  "aiSearchQuestions": [
    "How do you write a proof by induction?",
    "What is the inductive hypothesis?",
    "Why does proof by induction work?",
    "What are common mistakes in induction proofs?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "strong-induction-vs-weak-induction",
    "sequences-and-summation-notation",
    "recurrence-relations-explained",
    "arithmetic-sequences-explained",
    "how-to-write-a-direct-proof",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "An induction proof has two parts: a base case showing P(first value) is true, and an inductive step showing that P(k) implies P(k + 1) for every k from the first value on.",
    "The inductive hypothesis is the assumption that P(k) holds for one arbitrary k; you are not assuming what you want to prove, because you still have to reach P(k + 1).",
    "The inductive step must actually use the hypothesis; finding where P(k) sits inside P(k + 1) is usually the key move.",
    "The base case must match the claim: a statement for all n ≥ 4 starts at 4, not 1.",
    "Write the conclusion explicitly: by the principle of mathematical induction, P(n) holds for all n in the stated range."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What are the steps of a proof by induction?",
      "answer": "State the claim P(n) and the range of n. Prove the base case, P(n₀). State the inductive hypothesis: assume P(k) for an arbitrary k ≥ n₀. Prove P(k + 1) using that assumption. Conclude that P(n) holds for all n ≥ n₀ by the principle of mathematical induction."
    },
    {
      "question": "Isn't assuming P(k) the same as assuming what you want to prove?",
      "answer": "No. You want to prove P(n) for every n. The inductive step only proves the conditional 'if P(k), then P(k + 1)'. Combined with the base case, that conditional carries the truth from n₀ to n₀ + 1, then to n₀ + 2, and so on, like a row of falling dominoes."
    },
    {
      "question": "Why is the base case necessary?",
      "answer": "Without it, the inductive step proves only that each case follows from the one before, not that any case is true. The false claim 'n = n + 1' has a valid-looking inductive step, since adding 1 to both sides of k = k + 1 gives k + 1 = k + 2, but no true base case."
    },
    {
      "question": "When do I need strong induction instead?",
      "answer": "When proving P(k + 1) needs more than P(k), for example P(k − 1) as well, or P(j) for some smaller j you cannot predict. Recurrences such as the Fibonacci numbers and the existence of prime factorisations are typical cases."
    }
  ],
  "sources": [
    {
      "title": "Induction (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_seq-induction.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Mathematical Induction (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-induction.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Principle of Mathematical Induction",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/PrincipleofMathematicalInduction.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Induction is how mathematicians prove that something holds for every natural number at once. It is the natural tool for formulas for sums, divisibility patterns, inequalities and anything defined recursively; this guide works one example of each.

The idea fits in one image, which Levin's *Discrete Mathematics: An Open Introduction* uses too: a row of dominoes. If the first domino falls, and every domino knocks over the next one, then all of them fall. You do not have to push each one.

## The template

To prove that a statement P(n) holds for every integer n ≥ n₀:

1. **Base case.** Show P(n₀) is true, usually by direct calculation.
2. **Inductive hypothesis.** Let k ≥ n₀ be arbitrary and assume P(k) is true.
3. **Inductive step.** Using that assumption, prove P(k + 1).
4. **Conclusion.** By the principle of mathematical induction, P(n) is true for all n ≥ n₀.

The inductive step proves a conditional, P(k) → P(k + 1), for every k. That is why assuming P(k) is legitimate: it is the hypothesis of the conditional you are proving, exactly as in a [direct proof](/blog/how-to-write-a-direct-proof/).

## Example 1: the sum of the first n odd numbers

**Claim.** For every n ≥ 1, 1 + 3 + 5 + ⋯ + (2n − 1) = n².

**Base case.** For n = 1 the left side is 1 and the right side is 1² = 1.

**Inductive hypothesis.** Assume 1 + 3 + ⋯ + (2k − 1) = k² for some k ≥ 1.

**Inductive step.** The next odd number after 2k − 1 is 2(k + 1) − 1 = 2k + 1. So

1 + 3 + ⋯ + (2k − 1) + (2k + 1) = k² + (2k + 1) = (k + 1)²,

where the first equality uses the inductive hypothesis.

**Conclusion.** By induction, the formula holds for every n ≥ 1. ∎

The key move is spotting the old sum inside the new one. In sum proofs it is easy: the new sum is the old sum plus one more term. Writing sums compactly with sigma notation makes that split explicit, as the [summation notation guide](/blog/sequences-and-summation-notation/) shows.

## Example 2: a divisibility pattern

**Claim.** For every n ≥ 0, 3 divides 4ⁿ − 1.

**Base case.** n = 0: 4⁰ − 1 = 0, and 3 divides 0.

**Inductive hypothesis.** Assume 3 ∣ 4ᵏ − 1, so 4ᵏ − 1 = 3m for some integer m.

**Inductive step.** We need the old expression inside the new one:

4ᵏ⁺¹ − 1 = 4 · 4ᵏ − 1 = 4(4ᵏ − 1) + 4 − 1 = 4 · 3m + 3 = 3(4m + 1).

So 3 divides 4ᵏ⁺¹ − 1. ∎

The trick of adding and subtracting to expose 4ᵏ − 1 is typical. Levin's book makes the same point about its own divisibility example: you have to be a little clever to locate the old expression inside the new one, and that is what makes induction proofs challenging.

## Example 3: an inequality that starts late

**Claim.** For every n ≥ 4, n! > 2ⁿ.

It fails for small n: 3! = 6 < 8 = 2³. So the base case is n = 4.

**Base case.** 4! = 24 > 16 = 2⁴.

**Inductive hypothesis.** Assume k! > 2ᵏ for some k ≥ 4.

**Inductive step.** (k + 1)! = (k + 1) · k! > (k + 1) · 2ᵏ ≥ 2 · 2ᵏ = 2ᵏ⁺¹, using the hypothesis for the first inequality and k + 1 ≥ 2 for the second. ∎

*Applied Discrete Structures* states this generalised form of the principle explicitly: induction works on any set of the form {n₀, n₀ + 1, n₀ + 2, …}, not just from 1.

## Example 4: induction on a recursive definition

Define a₁ = 1 and aₙ₊₁ = 2aₙ + 1. The first terms are 1, 3, 7, 15, 31, which suggests aₙ = 2ⁿ − 1.

**Base case.** a₁ = 1 = 2¹ − 1.

**Inductive step.** Assume aₖ = 2ᵏ − 1. Then aₖ₊₁ = 2aₖ + 1 = 2(2ᵏ − 1) + 1 = 2ᵏ⁺¹ − 1. ∎

This is how a guessed formula for a recurrence is confirmed; the [recurrence relations guide](/blog/recurrence-relations-explained/) shows how to find the formula in the first place.

## Mistakes markers look for

1. **No base case, or the wrong one.** "n = n + 1" has an inductive step that works (add 1 to both sides) but no true base case. The proof needs both parts.
2. **An inductive step that never uses the hypothesis.** If you prove P(k + 1) without P(k), you have proved it directly, or more likely made an error.
3. **Assuming P(k + 1).** Starting from the equation you want to prove and simplifying both sides until they agree is a common, circular habit. Start from one side of P(k + 1) and work towards the other.
4. **A step that fails for small k.** The famous "all horses are the same colour" argument breaks exactly here: its step from k to k + 1 needs two overlapping groups, which do not overlap when k = 1.
5. **Forgetting the conclusion sentence.**

## Ordinary or strong?

Sometimes P(k) alone is not enough to reach P(k + 1). Proving facts about the Fibonacci numbers, where each term depends on the previous two, or showing every integer has a prime factorisation, needs the assumption that P holds for *all* values up to k. That variation, which *Applied Discrete Structures* calls the course-of-values principle, is covered in [strong induction versus ordinary induction](/blog/strong-induction-vs-weak-induction/).

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a unit on induction and algorithms, with lessons and knowledge checks, and a review of missed questions for going back over the ones you got wrong. It sits among our [education apps](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) has the related sequence guides, and [arithmetic sequences](/blog/arithmetic-sequences-explained/) gives more sums to practise on.
