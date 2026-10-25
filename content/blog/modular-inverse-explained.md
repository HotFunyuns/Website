---
{
  "title": "Modular Inverses with the Extended Euclidean Algorithm",
  "metaTitle": "Modular Inverse: How to Find It with Extended Euclid",
  "description": "Find the inverse of a modulo n with the extended Euclidean algorithm, see when none exists, use the prime shortcut, and solve ax ≡ b (mod n).",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "number theory", "modular inverse", "euclidean algorithm"],
  "primaryKeyword": "modular inverse",
  "secondaryKeywords": [
    "extended euclidean algorithm",
    "how to find modular inverse",
    "multiplicative inverse mod n",
    "bezout's identity",
    "solve linear congruence"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "inverse of 17 mod 43",
    "when does a modular inverse exist",
    "modular inverse using fermat's little theorem",
    "solve 17x congruent to 5 mod 43"
  ],
  "aiSearchQuestions": [
    "What is a modular inverse?",
    "How do you find a modular inverse with the extended Euclidean algorithm?",
    "When does a number have an inverse modulo n?",
    "How do you solve a linear congruence?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "euclidean-algorithm-explained",
    "modular-arithmetic-explained",
    "chinese-remainder-theorem-explained",
    "fermats-little-theorem-and-rsa",
    "function-composition-and-inverses",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The inverse of a modulo n is a number x with ax ≡ 1 (mod n); it exists exactly when gcd(a, n) = 1.",
    "The extended Euclidean algorithm writes 1 = ax + ny, and then x, reduced mod n, is the inverse.",
    "Example: 17 × 38 = 646 = 15 × 43 + 1, so the inverse of 17 modulo 43 is 38.",
    "For a prime modulus p, Fermat's little theorem gives the inverse directly as aᵖ⁻² mod p.",
    "Once you have the inverse, ax ≡ b (mod n) is solved by multiplying both sides by it."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a modular inverse?",
      "answer": "A number x such that ax ≡ 1 (mod n). It plays the role of 1/a in arithmetic mod n. For example, the inverse of 3 modulo 7 is 5, because 3 × 5 = 15 = 2 × 7 + 1."
    },
    {
      "question": "When does a modular inverse exist?",
      "answer": "Exactly when a and n are relatively prime, gcd(a, n) = 1. If they share a factor d > 1, every multiple of a is also a multiple of d, so ax − 1 can never be a multiple of n. For example, 6 has no inverse modulo 15."
    },
    {
      "question": "How do you find a modular inverse quickly?",
      "answer": "Run the Euclidean algorithm on a and n, then work backwards to write 1 = ax + ny. The coefficient x, reduced mod n, is the inverse. For a prime modulus p you can instead compute aᵖ⁻² mod p by repeated squaring."
    },
    {
      "question": "How do I solve 17x ≡ 5 (mod 43)?",
      "answer": "Find the inverse of 17 modulo 43, which is 38, and multiply both sides by it: x ≡ 5 × 38 = 190 ≡ 18 (mod 43). Check: 17 × 18 = 306 = 7 × 43 + 5."
    }
  ],
  "sources": [
    {
      "title": "Modular Inverse",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/ModularInverse.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Greatest Common Divisors and the Integers Modulo n: Bézout's Lemma (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-gcds-and-zsubn.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Introduction to Number Theory: Solving Congruences (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_addtops-numbth.html",
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

In ordinary arithmetic, dividing by 3 means multiplying by 1/3. Modular arithmetic has no fractions, but it has something that does the same job: a number that multiplies with 3 to give 1. Modulo 7 that number is 5, since 3 × 5 = 15 ≡ 1. It is called the **modular inverse** of 3, and finding inverses is how you "divide" when working mod n, which is why they matter in everything from solving congruences to RSA encryption.

## The definition and when it exists

The inverse of a modulo n is an integer x with

ax ≡ 1 (mod n).

It exists **if and only if gcd(a, n) = 1.** MathWorld states it this way: a nonzero integer has an inverse modulo n if and only if the two are relatively prime. Modulo 4, for example, 2 has no inverse, since 2x is always even and so never leaves remainder 1. The reason is short. If d = gcd(a, n) > 1, then d divides both a and n, so d divides ax − kn for any integers x and k. That expression can never equal 1, so ax ≡ 1 (mod n) has no solution.

So modulo a prime p, every number from 1 to p − 1 has an inverse; modulo 5, MathWorld lists the inverses of 1, 2, 3 and 4 as 1, 3, 2 and 4. Modulo a composite number, only the numbers coprime to it do. Modulo 15, for example, 6 has no inverse because gcd(6, 15) = 3.

## Method: the extended Euclidean algorithm

The [Euclidean algorithm](/blog/euclidean-algorithm-explained/) finds gcd(a, n). Running its steps backwards writes the gcd as a combination ax + ny, the result *Applied Discrete Structures* states as Bézout's lemma. When the gcd is 1,

ax + ny = 1, so ax ≡ 1 (mod n),

and x is the inverse.

**Worked example: the inverse of 17 modulo 43.**

Forward, the Euclidean algorithm:

| Division | Remainder |
| --- | ---: |
| 43 = 2 × 17 + 9 | 9 |
| 17 = 1 × 9 + 8 | 8 |
| 9 = 1 × 8 + 1 | 1 |

The gcd is 1, so an inverse exists. Now work backwards, writing each remainder in terms of the earlier numbers:

1. 1 = 9 − 8
2. 8 = 17 − 9, so 1 = 9 − (17 − 9) = 2 × 9 − 17
3. 9 = 43 − 2 × 17, so 1 = 2 × (43 − 2 × 17) − 17 = 2 × 43 − 5 × 17

So −5 × 17 ≡ 1 (mod 43). The inverse is −5, or **38** after adding 43. **Check:** 17 × 38 = 646 = 15 × 43 + 1.

Always do the check. Sign errors in the back-substitution are the usual mistake, and a single multiplication catches them.

## A second example: the inverse of 7 modulo 26

A modulus of 26, one remainder for each letter of the alphabet, is a natural choice for letter-shuffling puzzles, and the back-substitution takes one more step than before.

- 26 = 3 × 7 + 5
- 7 = 1 × 5 + 2
- 5 = 2 × 2 + 1

Back-substitute: 1 = 5 − 2 × 2 = 5 − 2 × (7 − 5) = 3 × 5 − 2 × 7 = 3 × (26 − 3 × 7) − 2 × 7 = 3 × 26 − 11 × 7.

So the inverse of 7 is −11 ≡ **15** (mod 26). Check: 7 × 15 = 105 = 4 × 26 + 1.

## Shortcut for a prime modulus

If p is prime and a is not a multiple of p, [Fermat's little theorem](/blog/fermats-little-theorem-and-rsa/) says aᵖ⁻¹ ≡ 1 (mod p). Then a × aᵖ⁻² ≡ 1, so

**a⁻¹ ≡ aᵖ⁻² (mod p).**

Modulo 7, the inverse of 3 is 3⁵ = 243 ≡ 5, as found at the start. For large primes, compute the power by repeated squaring, covered in [modular arithmetic](/blog/modular-arithmetic-explained/). The extended Euclidean algorithm also works for composite moduli, so it is the general-purpose method.

## Solving a linear congruence

To solve ax ≡ b (mod n) when gcd(a, n) = 1, multiply both sides by the inverse of a:

x ≡ a⁻¹ · b (mod n).

**Example.** Solve 17x ≡ 5 (mod 43). The inverse of 17 is 38, so x ≡ 5 × 38 = 190 ≡ 190 − 172 = **18** (mod 43). Check: 17 × 18 = 306 = 7 × 43 + 5.

Levin's *Discrete Mathematics: An Open Introduction* solves small congruences such as 3x + 2 ≡ 4 (mod 5) both by trying every remainder and by algebra with congruences. Trying every remainder is fine for a modulus of 5; for a modulus of 43 it means up to 43 trials, and the inverse is quicker.

**When gcd(a, n) = d > 1.** Then ax ≡ b (mod n) has a solution only if d divides b. For 6x ≡ 9 (mod 15), d = 3 divides 9, so divide everything by 3 to get 2x ≡ 3 (mod 5), whose solution is x ≡ 4 (mod 5), giving three solutions mod 15: 4, 9 and 14. For 6x ≡ 5 (mod 15), 3 does not divide 5, so there is no solution.

## Where modular inverses are used

- **Solving systems of congruences,** in the construction behind the [Chinese remainder theorem](/blog/chinese-remainder-theorem-explained/).
- **RSA,** where, in MathWorld's description, the private and public keys are chosen so that their product is congruent to 1 modulo the totient of the product of the two primes.
- **Undoing a function.** Multiplying by an inverse undoes multiplication, exactly as in [composition and inverse functions](/blog/function-composition-and-inverses/): the map x ↦ ax is a bijection on the remainders mod n precisely when a is invertible.

## Inverses to find

1. Find the inverse of 5 modulo 12. (5 × 5 = 25 ≡ 1, so 5 is its own inverse.)
2. Find the inverse of 11 modulo 26. (19, since 11 × 19 = 209 = 8 × 26 + 1.)
3. Does 9 have an inverse modulo 12? Explain.
4. Solve 8x ≡ 3 (mod 13).

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a unit on number theory and modular arithmetic, with lessons, knowledge checks and topic quizzes. Find it with our [education apps](/apps/category/education-brain/), and the full number theory sequence in the [discrete math hub](/blog/topics/discrete-math/).
