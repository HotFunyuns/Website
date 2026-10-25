---
{
  "title": "Sigma Notation and Sums: Reading, Splitting and Proving Summation Formulas",
  "metaTitle": "Summation Notation Explained: Sigma, Rules and Formulas",
  "description": "How to read Σ notation, the rules for splitting and shifting sums, the standard closed forms, telescoping sums, and how to prove a sum formula.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "sequences", "summation notation", "series"],
  "primaryKeyword": "summation notation",
  "secondaryKeywords": [
    "sigma notation",
    "sum of first n integers formula",
    "sum of squares formula",
    "geometric series sum formula",
    "telescoping sum"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to read sigma notation",
    "how to change the index of a summation",
    "prove sum of k squared formula by induction",
    "what is a telescoping series example"
  ],
  "aiSearchQuestions": [
    "How do you read sigma notation?",
    "What is the formula for the sum of the first n integers?",
    "How do you shift the index of a sum?",
    "What is a telescoping sum?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "proof-by-induction-step-by-step",
    "arithmetic-sequences-explained",
    "geometric-sequences-explained",
    "generating-functions-explained",
    "recurrence-relations-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Σ from k = m to n of aₖ means aₘ + aₘ₊₁ + ⋯ + aₙ; the index k is a dummy variable that can be renamed.",
    "Sums split and scale: Σ(aₖ + bₖ) = Σaₖ + Σbₖ and Σ c·aₖ = c·Σaₖ, but a sum of products is not the product of sums.",
    "Standard closed forms: Σk = n(n + 1)/2, Σk² = n(n + 1)(2n + 1)/6, and Σrᵏ from 0 to n = (rⁿ⁺¹ − 1)/(r − 1).",
    "Telescoping sums collapse when each term is a difference of consecutive values of some sequence.",
    "A guessed closed form for a sum is proved by induction, adding one term in the inductive step."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How do you read sigma notation?",
      "answer": "Σ from k = 1 to n of aₖ means: substitute each whole number from the lower limit 1 to the upper limit n for k, and add the results. So Σ from k = 1 to 4 of k² = 1 + 4 + 9 + 16 = 30. The letter k is the index of summation."
    },
    {
      "question": "What is the formula for 1 + 2 + ⋯ + n?",
      "answer": "n(n + 1)/2. Write the sum forwards and backwards and add the two: each of the n pairs adds to n + 1, giving n(n + 1), which is twice the sum. For n = 100 the sum is 5,050."
    },
    {
      "question": "How do you change the index of a summation?",
      "answer": "Substitute a new variable and adjust the limits to match. In Σ from k = 1 to n of aₖ₋₁, let j = k − 1: when k = 1, j = 0, and when k = n, j = n − 1, so the sum is Σ from j = 0 to n − 1 of aⱼ. The terms are identical; only the labels change."
    },
    {
      "question": "What is a telescoping sum?",
      "answer": "A sum whose terms are differences, bₖ − bₖ₊₁, so that neighbouring terms cancel and only the first and last remain. For example, Σ from k = 1 to n of 1/(k(k + 1)) = Σ (1/k − 1/(k + 1)) = 1 − 1/(n + 1)."
    }
  ],
  "sources": [
    {
      "title": "Summation Notation and Generalizations (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-summation_Notation_and_Generalizations.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Arithmetic and Geometric Sequences (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_seq-arithgeom.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Describing Sequences (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_seq_intro.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Sums turn up in counting arguments, probabilities and recurrences. Writing them out with "+ ⋯ +" leaves the pattern for the reader to guess, so mathematicians use sigma notation instead. This guide covers how to read it, the rules for splitting and shifting sums, the standard closed forms, and how to prove one.

## Reading the notation

Σ is the capital Greek letter sigma, for "sum". The expression

Σₖ₌₁ⁿ aₖ

means a₁ + a₂ + ⋯ + aₙ. *Applied Discrete Structures* names the parts: k is the **index** of summation, the value below the sigma is the initial index and the value above it is the terminal index.

**Examples.**

- Σₖ₌₁⁴ k² = 1 + 4 + 9 + 16 = 30.
- Σₖ₌₀³ 2ᵏ = 1 + 2 + 4 + 8 = 15.
- Σₖ₌₃⁵ (2k − 1) = 5 + 7 + 9 = 21.
- Σₖ₌₁⁵ 7 = 7 + 7 + 7 + 7 + 7 = 35. A constant summed n times is n times the constant.

The index is a **dummy variable**: Σₖ₌₁ⁿ k² and Σⱼ₌₁ⁿ j² are the same sum. The number of terms is the top limit minus the bottom limit plus one; forgetting the "plus one" is an off-by-one error.

## The rules

| Rule | Statement |
| --- | --- |
| Constant factor | Σ c·aₖ = c·Σ aₖ |
| Sum of sums | Σ (aₖ + bₖ) = Σ aₖ + Σ bₖ |
| Splitting the range | Σₖ₌₁ⁿ aₖ = Σₖ₌₁ᵐ aₖ + Σₖ₌ₘ₊₁ⁿ aₖ |
| Peeling off the last term | Σₖ₌₁ⁿ⁺¹ aₖ = Σₖ₌₁ⁿ aₖ + aₙ₊₁ |
| Shifting the index | Σₖ₌₁ⁿ aₖ = Σⱼ₌₀ⁿ⁻¹ aⱼ₊₁ |

What is **not** allowed: Σ aₖbₖ is not (Σ aₖ)(Σ bₖ). With a = b = (1, 2), the first gives 1 + 4 = 5 and the second gives 3 × 3 = 9.

The "peeling off" rule is the heart of every induction proof about sums, because it is exactly how the (k + 1)th case is built from the kth.

## The standard closed forms

| Sum | Closed form | Check with n = 4 |
| --- | --- | --- |
| Σₖ₌₁ⁿ 1 | n | 4 |
| Σₖ₌₁ⁿ k | n(n + 1)/2 | 10 |
| Σₖ₌₁ⁿ (2k − 1) | n² | 16 |
| Σₖ₌₁ⁿ k² | n(n + 1)(2n + 1)/6 | 30 |
| Σₖ₌₁ⁿ k³ | (n(n + 1)/2)² | 100 |
| Σₖ₌₀ⁿ rᵏ (r ≠ 1) | (rⁿ⁺¹ − 1)/(r − 1) | 31 for r = 2 |

**Why Σk = n(n + 1)/2.** Write S = 1 + 2 + ⋯ + n, and also S = n + (n − 1) + ⋯ + 1. Adding the two lines term by term gives n pairs, each summing to n + 1, so 2S = n(n + 1). This "reverse and add" trick works for any arithmetic sequence: the sum is the number of terms times the average of the first and last. Levin's *Discrete Mathematics: An Open Introduction* uses the same reverse-and-add method for arithmetic sums.

**Why the geometric formula.** Let S = 1 + r + ⋯ + rⁿ. Then rS = r + r² + ⋯ + rⁿ⁺¹. Subtracting, almost everything cancels: rS − S = rⁿ⁺¹ − 1, so S = (rⁿ⁺¹ − 1)/(r − 1). Levin derives geometric sums the same way, by multiplying by the ratio and subtracting. Our guides to [arithmetic sequences](/blog/arithmetic-sequences-explained/) and [geometric sequences](/blog/geometric-sequences-explained/) have more examples.

**Using them.** Σₖ₌₁¹⁰ (3k² − 2k) = 3 · 385 − 2 · 55 = 1,155 − 110 = 1,045, using the constant-factor and sum-of-sums rules with the formulas for Σk² and Σk.

## Telescoping sums

A sum telescopes when each term is a difference of consecutive values of some sequence, so neighbours cancel.

Σₖ₌₁ⁿ 1/(k(k + 1)). Since 1/(k(k + 1)) = 1/k − 1/(k + 1),

(1 − 1/2) + (1/2 − 1/3) + ⋯ + (1/n − 1/(n + 1)) = 1 − 1/(n + 1).

For n = 9 the sum is 0.9. Recognising a telescoping form usually takes a partial-fraction split, as here.

## Proving a closed form by induction

**Claim.** Σₖ₌₁ⁿ k² = n(n + 1)(2n + 1)/6.

**Base case.** n = 1: 1 = 1 · 2 · 3/6.

**Inductive step.** Assume the formula for n. Peel off the last term:

Σₖ₌₁ⁿ⁺¹ k² = n(n + 1)(2n + 1)/6 + (n + 1)²
= (n + 1)[n(2n + 1) + 6(n + 1)]/6
= (n + 1)(2n² + 7n + 6)/6
= (n + 1)(n + 2)(2n + 3)/6,

which is the formula with n + 1 in place of n. ∎ The format is explained in [proof by induction](/blog/proof-by-induction-step-by-step/).

## Beyond single sums

**Double sums** add over two indices: Σᵢ₌₁ⁿ Σⱼ₌₁ⁿ 1 = n², the number of pairs (i, j). Swapping the order of summation is allowed for finite sums, since both orders add the same finite set of terms.

**Product notation** works the same way with Π for products: Πₖ₌₁ⁿ k = n!.

**Infinite sums**, such as the geometric series 1 + x + x² + ⋯ = 1/(1 − x) (which converges for |x| < 1), are the raw material of [generating functions](/blog/generating-functions-explained/), and sums of earlier terms define many [recurrence relations](/blog/recurrence-relations-explained/).

## Sums to evaluate

1. Evaluate Σₖ₌₁²⁰ k. (210.)
2. Evaluate Σₖ₌₀⁹ 3 · 2ᵏ. (3 × 1,023 = 3,069.)
3. Rewrite Σₖ₌₂⁸ (k − 2)² with an index starting at 0. (Σⱼ₌₀⁶ j².)

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a unit on induction and algorithms and another on recurrences, each with lessons and knowledge checks. Find it among our [education apps](/apps/category/education-brain/), and the related guides in the [discrete math hub](/blog/topics/discrete-math/).
