---
{
  "title": "Primes and the Fundamental Theorem of Arithmetic: Why Factorisation Is Unique",
  "metaTitle": "Fundamental Theorem of Arithmetic, With Proof",
  "description": "Every integer above 1 is a product of primes in exactly one way. Why that needs proof, how existence and uniqueness are shown, and what it tells you.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "number theory", "prime numbers", "proofs"],
  "primaryKeyword": "fundamental theorem of arithmetic",
  "secondaryKeywords": [
    "unique prime factorization",
    "prime factorization proof",
    "euclid's lemma",
    "number of divisors formula",
    "gcd and lcm from prime factorization"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is prime factorization unique",
    "how many divisors does 360 have",
    "example where unique factorization fails",
    "prove every integer greater than 1 has a prime factorization"
  ],
  "aiSearchQuestions": [
    "What is the fundamental theorem of arithmetic?",
    "Why is prime factorization unique?",
    "How do you prove the fundamental theorem of arithmetic?",
    "How do you count the divisors of a number from its prime factorization?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "strong-induction-vs-weak-induction",
    "euclidean-algorithm-explained",
    "proof-by-contradiction-explained",
    "why-divisibility-rules-work",
    "squares-cubes-and-roots",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Every integer greater than 1 can be written as a product of primes in exactly one way, apart from the order of the factors.",
    "Existence follows by strong induction: a number that is not prime splits into two smaller factors, each already a product of primes.",
    "Uniqueness rests on Euclid's lemma: if a prime divides a product, it divides one of the factors.",
    "From a factorisation 2ᵃ · 3ᵇ · 5ᶜ ⋯ you can read off the number of divisors, (a + 1)(b + 1)(c + 1)⋯, and gcds and lcms by taking minimum and maximum exponents.",
    "Uniqueness is not automatic: in the number system {1, 5, 9, 13, …}, 441 factors in two different ways."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the fundamental theorem of arithmetic?",
      "answer": "The statement that every integer greater than 1 can be written as a product of one or more primes, and that this factorisation is unique apart from the order of the factors. For example, 360 = 2³ × 3² × 5, and no other combination of primes multiplies to 360."
    },
    {
      "question": "Why is 1 not a prime number?",
      "answer": "Partly so that factorisation stays unique. If 1 were prime, 6 = 2 × 3 = 1 × 2 × 3 = 1 × 1 × 2 × 3 and so on, giving infinitely many factorisations. Excluding 1, a prime is an integer greater than 1 whose only positive divisors are 1 and itself."
    },
    {
      "question": "How do you count the divisors of a number?",
      "answer": "Write its prime factorisation, add 1 to each exponent and multiply. 360 = 2³ × 3² × 5¹ has (3 + 1)(2 + 1)(1 + 1) = 24 divisors, because a divisor is formed by choosing an exponent of 2 from 0 to 3, of 3 from 0 to 2 and of 5 from 0 to 1."
    },
    {
      "question": "What is Euclid's lemma?",
      "answer": "If a prime p divides a product ab, then p divides a or p divides b. It is the key step in proving that prime factorisations are unique, and it fails for non-primes: 6 divides 4 × 9 = 36 but divides neither 4 nor 9."
    }
  ],
  "sources": [
    {
      "title": "Fundamental Theorem of Arithmetic",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/FundamentalTheoremofArithmetic.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "3.1 Prime and Composite Numbers (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/3-1-prime-and-composite-numbers",
      "accessed": "2026-10-24"
    },
    {
      "title": "Mathematical Induction: Existence of Prime Factorizations (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-induction.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Primes are the building blocks of the integers under multiplication, and the fundamental theorem of arithmetic is the precise statement of that idea. MathWorld gives it in one sentence: every positive integer except 1 can be represented in exactly one way, apart from rearrangement, as a product of one or more primes. It is also called the unique factorisation theorem.

The statement feels obvious after years of factor trees. It is worth proving anyway, because the "exactly one way" part is not automatic, and the proof shows which property of primes makes it true.

## The statement, unpacked

A **prime** is an integer greater than 1 whose only positive divisors are 1 and itself: 2, 3, 5, 7, 11, 13, … An integer greater than 1 that is not prime is **composite**.

The theorem makes two claims about every integer n > 1:

1. **Existence:** n is a prime or a product of primes.
2. **Uniqueness:** any two such products for n use the same primes the same number of times.

So 360 = 2³ × 3² × 5, and however you factor 360, whether 4 × 90, 8 × 45 or 10 × 36, you end up with three 2s, two 3s and one 5. OpenStax's *Contemporary Mathematics* states the theorem in this form and builds factor trees to find factorisations by hand.

## Existence, by strong induction

Suppose every integer from 2 to k is a prime or a product of primes. Consider k + 1. If it is prime, done. Otherwise k + 1 = ab with 2 ≤ a, b ≤ k, and by assumption a and b are products of primes, so k + 1 is too.

This is a [strong induction](/blog/strong-induction-vs-weak-induction/) proof, because the factors a and b can be anywhere below k + 1. *Applied Discrete Structures* uses exactly this theorem to illustrate the course-of-values form of induction.

## Uniqueness, through Euclid's lemma

**Euclid's lemma.** If a prime p divides a product ab, then p divides a or p divides b.

One standard proof uses Bézout's identity from the [Euclidean algorithm](/blog/euclidean-algorithm-explained/). If p does not divide a, then gcd(p, a) = 1, since p's only divisors are 1 and p. So 1 = px + ay for some integers x and y. Multiply by b: b = pbx + aby. The prime p divides both terms on the right (the second because p divides ab), so p divides b.

The lemma is special to primes. 6 divides 4 × 9 = 36 but divides neither 4 nor 9.

**Uniqueness.** Suppose n = p₁p₂⋯pᵣ = q₁q₂⋯qₛ, two prime factorisations. Then p₁ divides the product q₁⋯qₛ, so by Euclid's lemma, applied repeatedly, p₁ divides some qⱼ. Since qⱼ is prime, p₁ = qⱼ. Cancel it from both sides and repeat. Each prime on the left matches one on the right, so the two lists are the same up to order. MathWorld describes the theorem as a corollary of the first of Euclid's theorems, which is this lemma.

## Uniqueness can fail

To see that uniqueness is a real theorem, look at a number system where it fails. Take the numbers that leave remainder 1 when divided by 4:

H = {1, 5, 9, 13, 17, 21, 25, 29, 33, …}

Products of numbers in H stay in H. Call an element of H "prime in H" if it cannot be written as a product of two smaller elements of H other than 1. Then 9, 21 and 49 are all prime in H: 9 = 3 × 3, but 3 is not in H, and likewise 21 = 3 × 7 and 49 = 7 × 7. Yet

441 = 9 × 49 = 21 × 21,

two different factorisations into H-primes. What is missing is Euclid's lemma: 21 divides 9 × 49 but divides neither 9 nor 49. Ordinary integers have the lemma, and that is why their factorisations are unique.

## What a factorisation tells you

Write n = p₁^e₁ × p₂^e₂ × ⋯ × pₖ^eₖ.

**Divisors.** Every divisor has the form p₁^f₁ ⋯ pₖ^fₖ with 0 ≤ fᵢ ≤ eᵢ, so the number of divisors is (e₁ + 1)(e₂ + 1)⋯(eₖ + 1). For 360 = 2³ × 3² × 5: 4 × 3 × 2 = 24 divisors.

**gcd and lcm.** Take the smaller exponent of each prime for the gcd and the larger for the lcm. With 360 = 2³ × 3² × 5 and 84 = 2² × 3 × 7:

- gcd = 2² × 3 = 12
- lcm = 2³ × 3² × 5 × 7 = 2,520

For large numbers the Euclidean algorithm is faster, because factorising is hard, but for small ones this is the clearest method.

**Perfect squares.** n is a perfect square exactly when every exponent is even, which is why 360 is not one; our guide to [squares, cubes and roots](/blog/squares-cubes-and-roots/) has the arithmetic side of this.

**Irrationality.** If √2 = a/b, then a² = 2b². The number of 2s in the factorisation of a² is even, and in 2b² it is odd. Unique factorisation makes that impossible, which gives a second proof of the classic result in [proof by contradiction](/blog/proof-by-contradiction-explained/).

## Factorisation exercises

1. Factorise 1,001 and 1,024. (7 × 11 × 13 and 2¹⁰.)
2. How many divisors does 1,000 = 2³ × 5³ have? (16.)
3. Find gcd(756, 1,080) by factorising. (756 = 2² × 3³ × 7, 1,080 = 2³ × 3³ × 5, so the gcd is 2² × 3³ = 108.)

Primes and factorisation belong to the number theory and modular arithmetic unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). Browse our [education apps](/apps/category/education-brain/), see [why divisibility rules work](/blog/why-divisibility-rules-work/) for quick tests of small prime factors, or continue in the [discrete math hub](/blog/topics/discrete-math/).
