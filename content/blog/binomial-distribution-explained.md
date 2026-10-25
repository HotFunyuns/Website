---
{
  "title": "The Binomial Distribution: Counting Successes in Repeated Trials",
  "metaTitle": "Binomial Distribution Explained, with Worked Examples",
  "description": "When a fixed number of independent trials each succeed with the same chance, the count of successes is binomial. Formula, mean, variance and examples.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "probability", "binomial distribution", "statistics"],
  "primaryKeyword": "binomial distribution",
  "secondaryKeywords": [
    "binomial probability formula",
    "binomial distribution mean and variance",
    "binomial distribution examples",
    "conditions for a binomial experiment",
    "probability of at least k successes"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "probability of guessing 3 out of 10 multiple choice",
    "binomial probability at least one success",
    "why the binomial formula uses n choose k",
    "when is a situation not binomial"
  ],
  "aiSearchQuestions": [
    "What is the binomial distribution?",
    "What is the binomial probability formula?",
    "What are the conditions for a binomial experiment?",
    "What are the mean and variance of a binomial distribution?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "binomial-theorem-and-pascals-triangle",
    "expected-value-explained",
    "conditional-probability-and-bayes",
    "permutations-vs-combinations",
    "percentiles-and-standard-scores",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A binomial experiment has a fixed number n of independent trials, each a success or failure with the same success probability p.",
    "The probability of exactly k successes is C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ.",
    "C(n, k) counts which trials are the successes; the powers give the probability of any one such pattern.",
    "The mean is np and the variance np(1 − p).",
    "For 'at least one success', use the complement: 1 − (1 − p)ⁿ."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the binomial probability formula?",
      "answer": "P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ, the probability of exactly k successes in n independent trials that each succeed with probability p. For 10 multiple-choice guesses with 4 options each, P(exactly 3 right) = C(10, 3)(0.25)³(0.75)⁷ ≈ 0.250."
    },
    {
      "question": "What are the conditions for a binomial distribution?",
      "answer": "A fixed number of trials, two possible outcomes per trial, the same success probability on every trial, and independent trials. Drawing cards without replacement breaks independence, and counting until the first success breaks the fixed number of trials."
    },
    {
      "question": "What are the mean and variance of a binomial distribution?",
      "answer": "The mean is np and the variance is np(1 − p), so the standard deviation is √(np(1 − p)). Guessing on 10 four-option questions gives a mean of 2.5 correct and a variance of 1.875."
    },
    {
      "question": "How do I find the probability of at least one success?",
      "answer": "Subtract the probability of no successes from 1: P(X ≥ 1) = 1 − (1 − p)ⁿ. The chance of at least one six in 4 rolls of a die is 1 − (5/6)⁴ ≈ 0.518."
    }
  ],
  "sources": [
    {
      "title": "4.3 Binomial Distribution (Introductory Statistics 2e)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/introductory-statistics-2e/pages/4-3-binomial-distribution",
      "accessed": "2026-10-24"
    },
    {
      "title": "7.10 The Binomial Distribution (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/7-10-the-binomial-distribution",
      "accessed": "2026-10-24"
    },
    {
      "title": "Binomial Distribution",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/BinomialDistribution.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Flip a coin 10 times and count the heads. Guess on 10 multiple-choice questions and count the right answers. Test 20 parts and count the defective ones. Each is the same structure: repeated independent attempts, each a success or a failure, and a count of successes. The probabilities of those counts form the **binomial distribution**.

## When a situation is binomial

OpenStax's *Introductory Statistics* lists three characteristics of a binomial experiment:

1. **A fixed number of trials,** n.
2. **Two possible outcomes per trial,** called success and failure, with the success probability p the same on every trial.
3. **Independent trials,** repeated under identical conditions, so one outcome does not help predict another.

The random variable X is the number of successes in the n trials. A single trial of this kind is a Bernoulli trial, named after Jacob Bernoulli, who studied them in the late 1600s.

**Not binomial:**

- Drawing 5 cards and counting hearts, *without* replacement: the probability changes after each draw, so the trials are not independent.
- Rolling until the first six: the number of trials is not fixed.
- Counting how many of 10 people choose each of three options: more than two outcomes.

## The formula, and where it comes from

The probability of exactly k successes is

**P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ.**

Each part has a job.

- **pᵏ(1 − p)ⁿ⁻ᵏ** is the probability of one particular pattern with k successes, say success on the first k trials and failure on the rest. Independence lets the probabilities multiply.
- **C(n, k)** counts the patterns: the number of ways to choose which k of the n trials are the successes. Every pattern has the same probability, so multiply.

The coefficient is the binomial coefficient from [the binomial theorem](/blog/binomial-theorem-and-pascals-triangle/), and that is no coincidence: the probabilities are the terms of the expansion of (p + (1 − p))ⁿ, which is why they add up to 1ⁿ = 1.

## Worked example: guessing on a quiz

Ten multiple-choice questions, four options each, every answer a pure guess, so n = 10 and p = 0.25.

**Exactly 3 right:**

P(X = 3) = C(10, 3)(0.25)³(0.75)⁷ = 120 × 0.015625 × 0.1335 ≈ **0.250**.

**None right:** (0.75)¹⁰ ≈ 0.056.

**At least 5 right**, enough to pass a 50% threshold: add P(X = 5) through P(X = 10), which comes to about **0.078**. Guessing passes fewer than 1 attempt in 12.

**At least 6 right:** about 0.020.

The expected number correct is np = 10 × 0.25 = 2.5.

## Worked example: free throws

A player makes 80% of free throws, independently. In 5 attempts:

- All 5: (0.8)⁵ = 0.328.
- At least 4: C(5, 4)(0.8)⁴(0.2) + (0.8)⁵ = 0.4096 + 0.3277 = 0.737.

## Mean and variance

For a binomial random variable,

**mean μ = np** and **variance σ² = np(1 − p),**

both given by OpenStax. The mean follows directly from linearity of expectation: X is the sum of n indicator variables, one per trial, each with expected value p. The [expected value guide](/blog/expected-value-explained/) explains that argument. The variance also adds across independent trials, and each trial contributes p(1 − p).

For the quiz, the standard deviation is √1.875 ≈ 1.37 correct answers. Measuring a result in standard deviations from the mean is the idea behind standard scores, covered in [percentiles and standard scores](/blog/percentiles-and-standard-scores/).

## The complement trick

"At least one success" is the complement of "no successes":

**P(X ≥ 1) = 1 − (1 − p)ⁿ.**

At least one six in 4 rolls: 1 − (5/6)⁴ ≈ 0.518. At least one six in 24 rolls of two dice, looking for a double six: 1 − (35/36)²⁴ ≈ 0.491. These two bets look alike, yet they fall on opposite sides of an even chance, a good reminder to calculate rather than guess.

## The shape of the distribution

With p = 0.5, the distribution is symmetric around n/2; 10 fair coin flips give exactly 5 heads with probability C(10, 5)/2¹⁰ ≈ 0.246, the most likely single count but still less than one chance in four. With p far from 0.5, it leans toward 0 or n. For large n it takes on the familiar bell shape; MathWorld derives the normal distribution approximation to the binomial from this behaviour.

## A checklist

1. Check the conditions: fixed n, two outcomes, constant p, independence.
2. Identify n, p and the k (or range of k) you need.
3. Apply the formula, or the complement for "at least one".
4. Sanity-check against the mean np.

Probabilities of repeated trials build on the counting in [permutations versus combinations](/blog/permutations-vs-combinations/) and the conditional reasoning in [conditional probability and Bayes' theorem](/blog/conditional-probability-and-bayes/). The probability unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) can be practised with its topic and timed quizzes. Our [education apps](/apps/category/education-brain/) list it with the rest of the collection; the [discrete math hub](/blog/topics/discrete-math/) has the other probability guides.
