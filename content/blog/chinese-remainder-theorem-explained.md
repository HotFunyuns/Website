---
{
  "title": "The Chinese Remainder Theorem: Solving Simultaneous Congruences",
  "metaTitle": "Chinese Remainder Theorem: Step-by-Step Solving",
  "description": "Find a number with given remainders for several coprime moduli: the theorem, the construction step by step, a sieving shortcut, and when no solution exists.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "number theory", "chinese remainder theorem", "congruences"],
  "primaryKeyword": "chinese remainder theorem",
  "secondaryKeywords": [
    "simultaneous congruences",
    "system of linear congruences",
    "chinese remainder theorem example",
    "chinese remainder theorem proof",
    "pairwise coprime moduli"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "find x congruent to 2 mod 3 3 mod 5 2 mod 7",
    "chinese remainder theorem when moduli are not coprime",
    "chinese remainder theorem step by step",
    "uses of the chinese remainder theorem in cryptography"
  ],
  "aiSearchQuestions": [
    "What is the Chinese remainder theorem?",
    "How do you solve a system of congruences?",
    "What happens if the moduli are not coprime?",
    "Why is the solution unique modulo the product of the moduli?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "modular-inverse-explained",
    "modular-arithmetic-explained",
    "euclidean-algorithm-explained",
    "fermats-little-theorem-and-rsa",
    "cartesian-product-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "If the moduli n₁, …, nₖ are pairwise coprime, the system x ≡ aᵢ (mod nᵢ) has a solution, and it is unique modulo N = n₁n₂⋯nₖ.",
    "The construction: for each i, take Nᵢ = N/nᵢ and its inverse modulo nᵢ, then add up aᵢ · Nᵢ · (inverse).",
    "Example: x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7) gives x ≡ 23 (mod 105).",
    "For small moduli, sieving through one congruence's solutions until the others fit is often quicker.",
    "If the moduli share a factor, the system may have no solution, as with x ≡ 1 (mod 4) and x ≡ 2 (mod 6)."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does the Chinese remainder theorem say?",
      "answer": "If the moduli are pairwise relatively prime, then any choice of remainders is achieved by exactly one number modulo their product. So x ≡ 2 (mod 3) and x ≡ 3 (mod 5) together pin x down to a single class modulo 15, namely x ≡ 8."
    },
    {
      "question": "How do you solve a system of congruences?",
      "answer": "Multiply the moduli to get N. For each congruence x ≡ aᵢ (mod nᵢ), compute Nᵢ = N/nᵢ and an inverse yᵢ of Nᵢ modulo nᵢ. Then x ≡ a₁N₁y₁ + ⋯ + aₖNₖyₖ (mod N). Check the answer against each congruence."
    },
    {
      "question": "What if the moduli are not coprime?",
      "answer": "Then a solution exists only if the remainders agree wherever the moduli overlap: x ≡ a (mod m) and x ≡ b (mod n) are solvable exactly when gcd(m, n) divides a − b. x ≡ 1 (mod 4) and x ≡ 2 (mod 6) fail, because the first makes x odd and the second makes it even."
    },
    {
      "question": "Where is the Chinese remainder theorem used?",
      "answer": "In computing with large numbers by splitting them into remainders modulo several small primes, in the proof that RSA decryption recovers the message, which works modulo each secret prime separately, and in calendar and scheduling problems where several cycles must line up."
    }
  ],
  "sources": [
    {
      "title": "Chinese Remainder Theorem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/ChineseRemainderTheorem.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Modular Inverse",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/ModularInverse.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Introduction to Number Theory (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_addtops-numbth.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Find a number that leaves remainder 2 when divided by 3, remainder 3 when divided by 5, and remainder 2 when divided by 7. Puzzles like this are systems of congruences, and the Chinese remainder theorem says when they can be solved, how many solutions there are, and how to find them.

## What the theorem guarantees

MathWorld states it for two moduli: if m and n are relatively prime positive integers, then for any integers a and b there is an integer x with

x ≡ a (mod m) and x ≡ b (mod n),

and x is uniquely determined modulo mn. Equivalently, every pair of remainder classes modulo m and n corresponds to exactly one remainder class modulo mn.

The general version: if n₁, n₂, …, nₖ are **pairwise** coprime (every two share no factor), the system x ≡ aᵢ (mod nᵢ) has a solution, unique modulo N = n₁n₂⋯nₖ.

"Pairwise" matters. The moduli 6, 10 and 15 have no common factor shared by all three, but each pair does, and the theorem does not apply.

## Why there is exactly one solution modulo N

Take m = 3 and n = 5. There are 15 remainders mod 15, and 3 × 5 = 15 pairs of remainders (mod 3, mod 5). Map each x from 0 to 14 to its pair:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| x mod 3 | 0 | 1 | 2 | 0 | 1 | 2 | 0 | 1 | 2 | 0 | 1 | 2 | 0 | 1 | 2 |
| x mod 5 | 0 | 1 | 2 | 3 | 4 | 0 | 1 | 2 | 3 | 4 | 0 | 1 | 2 | 3 | 4 |

No pair repeats. If two numbers x and y had the same pair, both 3 and 5 would divide x − y, so 15 would, since they are coprime; between 0 and 14 that forces x = y. So the 15 numbers hit the 15 pairs exactly once each: a bijection onto the [Cartesian product](/blog/cartesian-product-explained/) of the two sets of remainders. Reading the table, the pair (2, 3) belongs to x = 8.

## The construction, step by step

Solve x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7).

**Step 1.** N = 3 × 5 × 7 = 105.

**Step 2.** For each modulus, form Nᵢ = N/nᵢ and find its inverse modulo nᵢ.

| i | nᵢ | aᵢ | Nᵢ = N/nᵢ | Nᵢ mod nᵢ | Inverse yᵢ | aᵢNᵢyᵢ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 3 | 2 | 35 | 2 | 2 | 140 |
| 2 | 5 | 3 | 21 | 1 | 1 | 63 |
| 3 | 7 | 2 | 15 | 1 | 1 | 30 |

**Step 3.** Add: 140 + 63 + 30 = 233, and 233 mod 105 = **23**.

**Step 4: check.** 23 = 7 × 3 + 2, 23 = 4 × 5 + 3, 23 = 3 × 7 + 2. All three hold, and every solution is 23 + 105k.

**Why it works.** The term a₁N₁y₁ is ≡ a₁ (mod n₁), because N₁y₁ ≡ 1 there, and ≡ 0 modulo every other nⱼ, because N₁ contains nⱼ as a factor. So each term "switches on" one congruence and leaves the others alone, and the sum satisfies all of them. MathWorld gives the same general formula. The inverses in step 2 come from the method in [modular inverses](/blog/modular-inverse-explained/).

## The sieving shortcut

For small moduli, list the solutions of the congruence with the largest modulus and test them against the others.

x ≡ 2 (mod 7) gives 2, 9, 16, 23, 30, …

- 2: 2 mod 5 = 2, not 3.
- 9: 9 mod 5 = 4.
- 16: 16 mod 5 = 1.
- 23: 23 mod 5 = 3 ✓, and 23 mod 3 = 2 ✓.

At most 3 × 5 = 15 candidates need checking, and here the fourth works. Levin's *Discrete Mathematics: An Open Introduction* shows the same "try the possibilities" approach for small single congruences; it scales badly, which is when the construction earns its keep.

## When the moduli are not coprime

A system with moduli sharing a factor may have no solution at all. x ≡ 1 (mod 4) makes x odd; x ≡ 2 (mod 6) makes x even. No x does both.

The precise condition for two congruences: x ≡ a (mod m) and x ≡ b (mod n) are solvable exactly when gcd(m, n) divides a − b, and then the solution is unique modulo lcm(m, n). For x ≡ 3 (mod 4) and x ≡ 5 (mod 6), gcd = 2 divides 5 − 3 = 2, so there is a solution modulo 12: x ≡ 11 (check: 11 = 2 × 4 + 3 = 6 + 5). The gcd and lcm come from the [Euclidean algorithm](/blog/euclidean-algorithm-explained/).

## Where it is used

- **Big-number arithmetic.** A large number can be stored as its remainders modulo several small coprime numbers. Additions and multiplications are done on the small remainders separately, and the theorem reassembles the result.
- **RSA.** Decryption works modulo n = pq. The proof that it recovers the message checks the result modulo p and modulo q separately and recombines the two with this theorem, as shown in [Fermat's little theorem and RSA](/blog/fermats-little-theorem-and-rsa/).
- **Cycles lining up.** Three events repeating every 3, 5 and 7 days next coincide after lcm = 105 days.

## Systems to solve yourself

1. Solve x ≡ 1 (mod 4), x ≡ 2 (mod 5). (x ≡ 17 (mod 20).)
2. Solve x ≡ 3 (mod 5), x ≡ 4 (mod 7), x ≡ 1 (mod 3). (x ≡ 88 (mod 105).)
3. Does x ≡ 2 (mod 6), x ≡ 3 (mod 9) have a solution?

Congruences belong to the number theory and modular arithmetic unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), the fifth in its sequence. It is listed with our [education apps](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) has the earlier number theory guides, starting with [modular arithmetic](/blog/modular-arithmetic-explained/).
