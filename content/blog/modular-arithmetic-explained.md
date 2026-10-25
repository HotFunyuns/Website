---
{
  "title": "Modular Arithmetic: Clock Maths, Congruences and the Rules That Make It Work",
  "metaTitle": "Modular Arithmetic Explained: Congruences and Rules",
  "description": "Modular arithmetic works with remainders. What a ≡ b (mod n) means, which operations are safe, how to reduce big powers, and where it is used in computing.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "number theory", "modular arithmetic", "congruences"],
  "primaryKeyword": "modular arithmetic",
  "secondaryKeywords": [
    "congruence modulo n",
    "mod arithmetic rules",
    "clock arithmetic",
    "modular exponentiation",
    "negative numbers mod n"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what does a is congruent to b mod n mean",
    "last digit of 7 to the 100",
    "why you can't divide in modular arithmetic",
    "how to compute large powers mod n"
  ],
  "aiSearchQuestions": [
    "What is modular arithmetic?",
    "What does congruent modulo n mean?",
    "Can you divide in modular arithmetic?",
    "How do you find a large power modulo n?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "euclidean-algorithm-explained",
    "modular-inverse-explained",
    "chinese-remainder-theorem-explained",
    "fermats-little-theorem-and-rsa",
    "why-divisibility-rules-work",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "a ≡ b (mod n) means a and b leave the same remainder on division by n, equivalently n divides a − b.",
    "Addition, subtraction and multiplication respect congruence, so you may reduce numbers mod n at any point in a calculation.",
    "Division does not work in general: 2 · 3 ≡ 2 · 8 (mod 10) but 3 ≢ 8 (mod 10); you need a modular inverse, which exists only when gcd(a, n) = 1.",
    "Large powers are reduced by repeated squaring or by finding a small power congruent to 1.",
    "Modular arithmetic underlies clocks, days of the week and RSA public-key cryptography."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does a ≡ b (mod n) mean?",
      "answer": "That a and b have the same remainder when divided by n, or equivalently that n divides a − b. For example, 17 ≡ 2 (mod 5) because both leave remainder 2, and 17 − 2 = 15 is a multiple of 5."
    },
    {
      "question": "Can you divide in modular arithmetic?",
      "answer": "Not in general. 2 × 3 = 6 and 2 × 8 = 16 are congruent mod 10, but 3 and 8 are not, so you cannot cancel the 2. Dividing by a is allowed only when a has a modular inverse, which happens exactly when gcd(a, n) = 1."
    },
    {
      "question": "How do you handle negative numbers mod n?",
      "answer": "Add multiples of n until the result is between 0 and n − 1. So −3 ≡ 2 (mod 5), since −3 + 5 = 2. Programming languages differ here: in JavaScript, for example, -3 % 5 evaluates to -3, so check which convention your language uses."
    },
    {
      "question": "What is the last digit of 7¹⁰⁰?",
      "answer": "1. The last digit is the remainder mod 10. Powers of 7 mod 10 cycle 7, 9, 3, 1, so 7⁴ ≡ 1 (mod 10). Then 7¹⁰⁰ = (7⁴)²⁵ ≡ 1²⁵ = 1."
    }
  ],
  "sources": [
    {
      "title": "Introduction to Number Theory: Remainder Classes and Properties of Congruence (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_addtops-numbth.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Greatest Common Divisors and the Integers Modulo n (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-gcds-and-zsubn.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Congruence",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Congruence.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "RSA Encryption",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/RSAEncryption.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

If it is 9 o'clock now, what time will it be in 5 hours? Two o'clock, not fourteen. A clock counts around a circle of 12 and starts again, and modular arithmetic is the mathematics of exactly that: arithmetic where only the remainder matters. *Applied Discrete Structures* makes the same comparison: the hours of the day are counted mod 12, except that 12 stands in for 0, and military time uses mod 24.

## Congruence

Fix a positive integer n, the **modulus**. Two integers a and b are **congruent modulo n**, written

a ≡ b (mod n),

when they leave the same remainder on division by n. Levin's *Discrete Mathematics: An Open Introduction* uses that definition and notes that many books use an equivalent one instead: n divides a − b. Both say the same thing, and switching between them is often the key step in a proof.

**Examples.**

- 17 ≡ 2 (mod 5): both leave remainder 2, and 17 − 2 = 15 is divisible by 5.
- 100 ≡ 0 (mod 4): 4 divides 100.
- −3 ≡ 2 (mod 5): −3 + 5 = 2, and 5 divides −3 − 2 = −5.

Congruence mod n is an equivalence relation, reflexive, symmetric and transitive, so it splits the integers into n remainder classes. The guide to [equivalence relations and classes](/blog/equivalence-relations-and-classes/) shows the classes for mod 3. *Applied Discrete Structures* collects one representative from each class into ℤₙ = {0, 1, …, n − 1}, the integers modulo n.

## The rules that make it useful

If a ≡ b and c ≡ d (mod n), then

- a + c ≡ b + d (mod n),
- a − c ≡ b − d (mod n),
- a · c ≡ b · d (mod n),
- aᵏ ≡ bᵏ (mod n) for every positive integer k.

In practice this means **you may reduce mod n at any point** in a calculation built from adding, subtracting and multiplying. Numbers never need to get large.

**Example.** What is 1,234 × 5,678 mod 9? Reduce first: 1,234 ≡ 1 (mod 9) and 5,678 ≡ 8 (mod 9), using digit sums. So the product is ≡ 1 × 8 = 8 (mod 9). The digit-sum shortcut is itself a modular fact, explained in [why divisibility rules work](/blog/why-divisibility-rules-work/).

## Division is the exception

You cannot cancel freely. In mod 10,

2 × 3 = 6 and 2 × 8 = 16 ≡ 6, so 2 × 3 ≡ 2 × 8 (mod 10),

but 3 ≢ 8 (mod 10). The 2 cannot be cancelled because 2 and 10 share a factor.

Cancelling a is safe exactly when a has a **multiplicative inverse** mod n, a number a′ with a·a′ ≡ 1 (mod n), and that happens exactly when gcd(a, n) = 1. *Applied Discrete Structures* reflects this: every element of ℤₙ has an additive inverse (n − a for a ≠ 0), but its multiplicative group of integers modulo n keeps only the elements k with gcd(n, k) = 1. Finding inverses uses the [Euclidean algorithm](/blog/euclidean-algorithm-explained/) and is worked through in [modular inverses](/blog/modular-inverse-explained/).

**Solving a congruence.** Solve 4x ≡ 3 (mod 7). Since 4 × 2 = 8 ≡ 1, the inverse of 4 is 2. Multiply both sides by 2: x ≡ 6 (mod 7). Check: 4 × 6 = 24 = 3 × 7 + 3. When the modulus is small, trying each remainder in turn also works; Levin's book shows that trial-and-error approach alongside the algebraic one, which is simpler when the modulus is larger.

## Big powers

**The last digit of 7¹⁰⁰.** The last digit is the value mod 10. Powers of 7 mod 10 go 7, 9, 3, 1, then repeat, since 7⁴ = 2,401 ≡ 1. So 7¹⁰⁰ = (7⁴)²⁵ ≡ 1 (mod 10): the last digit is 1.

**Repeated squaring.** To find 3¹³ mod 7 without a cycle, square repeatedly:

| Power | Value mod 7 |
| --- | --- |
| 3¹ | 3 |
| 3² | 9 ≡ 2 |
| 3⁴ | 2² = 4 |
| 3⁸ | 4² = 16 ≡ 2 |

Since 13 = 8 + 4 + 1, 3¹³ = 3⁸ · 3⁴ · 3¹ ≡ 2 · 4 · 3 = 24 ≡ 3 (mod 7). The number of squarings grows with the number of binary digits of the exponent, about log₂ k for a power k, rather than with k itself. [Fermat's little theorem](/blog/fermats-little-theorem-and-rsa/) gives a shortcut when the modulus is prime.

## Where modular arithmetic is used

- **Calendars.** 100 days after a Monday: 100 ≡ 2 (mod 7), so it is a Wednesday.
- **Clocks.** 21:00 plus a four-hour trip is 25 ≡ 1 (mod 24), so 01:00, the example *Applied Discrete Structures* uses for military time.
- **Cryptography.** MathWorld's description of RSA encryption defines its public and private keys by a congruence and encodes a message by raising it to a power modulo a product of two primes.
- **Simultaneous conditions.** Problems such as "a number that leaves remainder 2 mod 3 and 3 mod 5" are solved by the [Chinese remainder theorem](/blog/chinese-remainder-theorem-explained/).

## Congruence exercises

1. Find 2⁵⁰ mod 7. (2³ = 8 ≡ 1, so 2⁵⁰ = 2⁴⁸ · 2² ≡ 4.)
2. Find −17 mod 6. (−17 + 18 = 1.)
3. Solve 3x ≡ 5 (mod 8). (3 × 3 = 9 ≡ 1, so x ≡ 15 ≡ 7.)
4. Show that every perfect square is congruent to 0 or 1 mod 4.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a unit on number theory and modular arithmetic, broken into topics and lessons with knowledge checks. MathWorld's article on congruence is a handy reference for notation. Find the app among our [education apps](/apps/category/education-brain/), and the full number theory sequence in the [discrete math hub](/blog/topics/discrete-math/).
