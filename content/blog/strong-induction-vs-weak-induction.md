---
{
  "title": "Strong Induction vs Ordinary Induction: When You Need More Than One Step Back",
  "metaTitle": "Strong Induction vs Weak Induction: When to Use Each",
  "description": "Strong induction assumes every earlier case, not just the last. When you need it, why it is valid, and worked proofs with stamps, primes and Fibonacci numbers.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "proofs", "induction", "strong induction"],
  "primaryKeyword": "strong induction vs weak induction",
  "secondaryKeywords": [
    "strong induction examples",
    "complete induction",
    "course of values induction",
    "strong induction postage stamp problem",
    "strong induction fibonacci proof"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how many base cases does strong induction need",
    "is strong induction stronger than ordinary induction",
    "prove every integer greater than 1 is a product of primes by strong induction",
    "when to use strong induction instead of regular induction"
  ],
  "aiSearchQuestions": [
    "What is the difference between strong induction and ordinary induction?",
    "When do you need strong induction?",
    "How many base cases does a strong induction proof need?",
    "Is strong induction more powerful than weak induction?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "proof-by-induction-step-by-step",
    "fundamental-theorem-of-arithmetic",
    "recurrence-relations-explained",
    "fibonacci-and-recursive-sequences",
    "how-to-write-a-direct-proof",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Ordinary induction assumes P(k) to prove P(k + 1); strong induction assumes P(n₀), P(n₀ + 1), …, P(k) all together.",
    "Use strong induction when the case you are proving depends on an earlier case other than the one just before it, or on several earlier cases.",
    "Strong induction often needs several base cases: as many as the step reaches back.",
    "The two principles prove exactly the same statements; strong induction is a convenience, not extra power.",
    "Typical strong induction proofs: prime factorisations, postage amounts, Fibonacci bounds and recursive algorithms that split a problem unevenly."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between strong and weak induction?",
      "answer": "Weak, or ordinary, induction proves P(k + 1) from P(k) alone. Strong induction proves P(k + 1) from the assumption that P holds for every value from the base case up to k. The extra assumption helps when the next case depends on cases further back."
    },
    {
      "question": "Is strong induction more powerful than ordinary induction?",
      "answer": "No. Anything provable by one is provable by the other: a strong induction proof of P becomes an ordinary induction proof of the statement 'P holds for every value up to n'. Strong induction is a more convenient way to write some proofs, not a stronger principle."
    },
    {
      "question": "How many base cases does strong induction need?",
      "answer": "Enough that the inductive step never reaches below them. If the step from k to k + 1 uses P(k) and P(k − 1), you need two consecutive base cases. If it uses P(k − 2), as in the 3-cent and 5-cent stamp problem, you need three."
    },
    {
      "question": "Why is strong induction valid?",
      "answer": "Suppose P failed somewhere. Then there would be a smallest failing value. Every value below it satisfies P, which is exactly the strong inductive hypothesis, so the inductive step shows P holds there too, a contradiction. This minimal counterexample argument is how Levin's textbook justifies it."
    }
  ],
  "sources": [
    {
      "title": "Induction: Strong Induction (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_seq-induction.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Mathematical Induction: The Course-of-Values Principle (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-induction.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Ordinary induction knocks over dominoes one at a time: if the first falls, and each one topples the next, they all fall. But some proofs need more than the domino immediately behind. To show a number has a prime factorisation, you split it into two smaller factors, and those could be anywhere below it. Strong induction handles that by letting you assume *every* earlier case at once.

## The two principles side by side

| | Ordinary (weak) induction | Strong (complete) induction |
| --- | --- | --- |
| Base case | P(n₀) | P(n₀), and sometimes a few more |
| Inductive hypothesis | P(k) | P(n₀), P(n₀ + 1), …, P(k) |
| Goal of the step | P(k + 1) | P(k + 1) |
| Use when | The next case depends on the previous one | It depends on a case further back, or on several |

*Applied Discrete Structures* calls the strong version the course-of-values principle, noting that it is also sometimes called strong induction. The name "complete induction" is also in use for the same idea, so check which term your course uses.

## Why it is valid

Levin's *Discrete Mathematics: An Open Introduction* justifies strong induction with a minimal counterexample. Suppose P(n) were false for some n. Then there would be a *first* value where it fails. Every value before that one satisfies P, which is precisely the strong inductive hypothesis, so the inductive step proves P at that value too. That contradicts its being a failure, so there is no failure.

The same argument shows the two principles are equally powerful. Any strong induction proof of P can be rewritten as an ordinary induction proof of Q(n): "P holds for every value from n₀ to n". Strong induction is a more natural way to write certain proofs; it does not prove anything ordinary induction cannot.

## Example 1: every integer from 2 up is a product of primes

**Claim.** Every integer n ≥ 2 is a prime or a product of primes.

**Base case.** 2 is prime.

**Inductive hypothesis.** Assume every integer from 2 to k can be written as a product of primes, for some k ≥ 2.

**Inductive step.** Consider k + 1. If it is prime, we are done. If not, k + 1 = ab with 2 ≤ a, b ≤ k. By the hypothesis, a and b are products of primes, so their product is too. ∎

Ordinary induction would be stuck: knowing that k factors tells you nothing about k + 1, since consecutive integers share no prime factors. The factors a and b can be any size below k + 1, so we need the hypothesis for all of them. *Applied Discrete Structures* uses this theorem as its example of the course-of-values principle, and it is the existence half of the [fundamental theorem of arithmetic](/blog/fundamental-theorem-of-arithmetic/).

## Example 2: postage with 3-cent and 5-cent stamps

**Claim.** Every amount of n ≥ 8 cents can be made from 3-cent and 5-cent stamps.

**Base cases.** 8 = 3 + 5, 9 = 3 + 3 + 3, 10 = 5 + 5.

**Inductive hypothesis.** Assume every amount from 8 to k can be made, for some k ≥ 10.

**Inductive step.** Since k ≥ 10, the amount k + 1 − 3 = k − 2 is at least 8 and at most k, so it can be made. Add one 3-cent stamp to get k + 1. ∎

The step reaches back three places, from k + 1 to k − 2, so three base cases are needed. With only 8 as a base case, the step for 9 would rely on 6, which is outside the claim (and 7 cannot be made at all).

## Example 3: a bound on the Fibonacci numbers

Define F₁ = 1, F₂ = 1 and Fₙ = Fₙ₋₁ + Fₙ₋₂. The terms run 1, 1, 2, 3, 5, 8, 13, …

**Claim.** Fₙ < 2ⁿ for every n ≥ 1.

**Base cases.** F₁ = 1 < 2 and F₂ = 1 < 4.

**Inductive step.** Let k ≥ 2 and assume Fⱼ < 2ʲ for all j ≤ k. Then

Fₖ₊₁ = Fₖ + Fₖ₋₁ < 2ᵏ + 2ᵏ⁻¹ < 2ᵏ + 2ᵏ = 2ᵏ⁺¹. ∎

The recurrence uses two earlier terms, so the step uses two earlier cases and needs two base cases. Our guide to [Fibonacci and recursive sequences](/blog/fibonacci-and-recursive-sequences/) covers where this sequence comes from, and the [recurrence relations guide](/blog/recurrence-relations-explained/) shows how to find its exact formula.

## Example 4: breaking a chocolate bar

Levin's book motivates strong induction with a puzzle: a rectangular bar of n squares, broken along rows or columns, always takes exactly n − 1 breaks to reduce to single squares, however you break it.

The proof needs strong induction because the first break splits a bar of k + 1 squares into two smaller bars of sizes a and b with a + b = k + 1, and a could be anything from 1 to k. Assuming the claim for both pieces, they need (a − 1) + (b − 1) more breaks, so the total is 1 + (a − 1) + (b − 1) = k. That is (k + 1) − 1, as required.

## Choosing between them

Ask what the inductive step actually uses.

- Uses only P(k): ordinary induction. The sum formulas and divisibility results in the step-by-step guide are examples.
- Uses P(k − 1) or P(k − 2) as well: strong induction, with that many base cases. Recurrences that reach back two or more terms.
- Uses P(j) for some j you cannot predict: strong induction with one base case, usually. Factorisations, splitting arguments and divide-and-conquer algorithms.

When in doubt, write the step first and see which earlier cases it calls on. Then set up the hypothesis and base cases to cover them. If the step only ever uses P(k), use ordinary induction, which is simpler to read; the [step-by-step induction guide](/blog/proof-by-induction-step-by-step/) covers that format in detail.

## Strong induction exercises

Prove with strong induction: (1) every amount of at least 12 cents can be made with 4-cent and 5-cent stamps (you will need four base cases); (2) for the sequence a₁ = 1, a₂ = 3, aₙ = aₙ₋₁ + 2aₙ₋₂, every term is odd; (3) every positive integer can be written as a sum of distinct powers of 2.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a unit on induction and algorithms, with lessons and knowledge checks. It is one of our [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) has the rest of the proof series.
