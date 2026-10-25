---
{
  "title": "Fermat's Little Theorem and How RSA Uses Modular Arithmetic",
  "metaTitle": "Fermat's Little Theorem and RSA, Explained",
  "description": "Fermat's little theorem says aᵖ⁻¹ ≡ 1 (mod p) for a prime p. How to use it, why it can mislead a primality test, and a toy RSA example worked by hand.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "number theory", "cryptography", "rsa"],
  "primaryKeyword": "fermats little theorem",
  "secondaryKeywords": [
    "fermat's little theorem examples",
    "rsa encryption example",
    "how rsa works",
    "fermat primality test",
    "euler's theorem phi"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "3 to the 100 mod 7 using fermat",
    "rsa example with small primes",
    "why does rsa decryption work",
    "carmichael numbers fermat test"
  ],
  "aiSearchQuestions": [
    "What is Fermat's little theorem?",
    "How do you use Fermat's little theorem to reduce powers?",
    "How does RSA encryption work?",
    "Why does Fermat's test sometimes say a composite number is prime?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "modular-arithmetic-explained",
    "modular-inverse-explained",
    "chinese-remainder-theorem-explained",
    "euclidean-algorithm-explained",
    "fundamental-theorem-of-arithmetic",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Fermat's little theorem: if p is prime and p does not divide a, then aᵖ⁻¹ ≡ 1 (mod p).",
    "It reduces huge exponents: 3¹⁰⁰ ≡ 3⁴ ≡ 4 (mod 7), because 3⁶ ≡ 1.",
    "A number that fails the test is certainly composite, but some composites pass it: 341 passes for base 2, and Carmichael numbers such as 561 pass for every coprime base.",
    "RSA encrypts with c = mᵉ mod n and decrypts with m = cᵈ mod n, where n = pq and d is the inverse of e modulo (p − 1)(q − 1).",
    "RSA's security rests on the difficulty of factoring n; a toy example with tiny primes shows the arithmetic but offers no security."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is Fermat's little theorem?",
      "answer": "If p is a prime and a is an integer not divisible by p, then aᵖ⁻¹ ≡ 1 (mod p). An equivalent form, true for every integer a, is aᵖ ≡ a (mod p). For example, 2¹⁰ = 1,024 = 93 × 11 + 1, so 2¹⁰ ≡ 1 (mod 11)."
    },
    {
      "question": "How do you use Fermat's little theorem to simplify powers?",
      "answer": "Reduce the exponent modulo p − 1. To find 3¹⁰⁰ mod 7, use 3⁶ ≡ 1 (mod 7). Since 100 = 6 × 16 + 4, 3¹⁰⁰ = (3⁶)¹⁶ × 3⁴ ≡ 3⁴ = 81 ≡ 4 (mod 7)."
    },
    {
      "question": "How does RSA use Fermat's little theorem?",
      "answer": "RSA picks primes p and q, sets n = pq, and chooses e and d with ed ≡ 1 modulo (p − 1)(q − 1). Fermat's little theorem, applied modulo p and modulo q, shows that raising mᵉ to the power d returns m, so decryption undoes encryption."
    },
    {
      "question": "Can the Fermat test prove a number is prime?",
      "answer": "No. If aⁿ⁻¹ is not ≡ 1 (mod n), n is definitely composite. But some composite numbers pass: 341 = 11 × 31 satisfies 2³⁴⁰ ≡ 1 (mod 341). Carmichael numbers, such as 561 = 3 × 11 × 17, pass for every base coprime to them."
    }
  ],
  "sources": [
    {
      "title": "Fermat's Little Theorem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/FermatsLittleTheorem.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "RSA Encryption",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/RSAEncryption.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Greatest Common Divisors and the Integers Modulo n (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-gcds-and-zsubn.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Raise a number to a large power and reduce it modulo a prime, and a pattern appears: powers cycle, and they return to 1 at a predictable point. Fermat's little theorem pins down that point. It turns hopeless-looking calculations into a few lines, and it is the mathematical reason the RSA cryptosystem works.

## Statement and a quick check

**If p is prime and a is not a multiple of p, then aᵖ⁻¹ ≡ 1 (mod p).**

Multiplying both sides by a gives a version that holds for every integer a, including multiples of p: aᵖ ≡ a (mod p). MathWorld states both forms.

**Check it.** p = 11, a = 2: 2¹⁰ = 1,024 = 93 × 11 + 1, so 2¹⁰ ≡ 1 (mod 11). p = 7, a = 3: the powers of 3 mod 7 run 3, 2, 6, 4, 5, 1, and the sixth power is 1.

## Why it is true

Take p = 7 and a = 3, and multiply each of 1, 2, 3, 4, 5, 6 by 3, reducing mod 7:

3, 6, 2, 5, 1, 4.

The same six numbers come out, in a different order. That always happens when a is coprime to p, because multiplication by a is invertible mod p, so it can only shuffle the nonzero remainders (see [modular inverses](/blog/modular-inverse-explained/)). So the product of the six results equals the product of the originals:

(3 · 1)(3 · 2)⋯(3 · 6) ≡ 1 · 2 ⋯ 6 (mod 7), that is, 3⁶ · 6! ≡ 6! (mod 7).

Since 6! is coprime to 7, it can be cancelled, leaving 3⁶ ≡ 1. The same argument works for any prime p and any a not divisible by it.

## Using it to reduce powers

Exponents can be reduced modulo p − 1.

**3¹⁰⁰ mod 7.** Since 3⁶ ≡ 1, write 100 = 6 × 16 + 4. Then 3¹⁰⁰ = (3⁶)¹⁶ × 3⁴ ≡ 1 × 81 ≡ **4** (mod 7).

**2²⁰²⁶ mod 13.** Here 2¹² ≡ 1. Since 2026 = 12 × 168 + 10, 2²⁰²⁶ ≡ 2¹⁰ = 1,024 ≡ 1,024 − 78 × 13 = **10** (mod 13).

For a prime modulus, the theorem also gives modular inverses directly: a⁻¹ ≡ aᵖ⁻² (mod p). Repeated squaring, covered in [modular arithmetic](/blog/modular-arithmetic-explained/), computes such powers quickly.

## Fermat's test, and how it fails

Turn the theorem around: if aⁿ⁻¹ is **not** ≡ 1 (mod n) for some a coprime to n, then n is **definitely composite**. That gives a fast test that can expose a composite without factoring it.

But passing the test does not prove primality. 341 = 11 × 31 is composite, yet 2³⁴⁰ ≡ 1 (mod 341); a different base, 3, exposes it, since 3³⁴⁰ is not ≡ 1 (mod 341). Worse, **Carmichael numbers** pass for every base coprime to them. The smallest is 561 = 3 × 11 × 17. So the Fermat test alone can show a number is composite, but it can never certify that a number is prime.

## Euler's generalisation

For a modulus n that is not prime, the role of p − 1 is played by φ(n), the number of integers from 1 to n that are coprime to n. **Euler's theorem** says a^φ(n) ≡ 1 (mod n) whenever gcd(a, n) = 1. For a prime, φ(p) = p − 1, recovering Fermat. For n = pq with p and q distinct primes, φ(n) = (p − 1)(q − 1), and that is the number RSA is built on.

## RSA in miniature

MathWorld describes RSA as using prime factorisation as the trapdoor one-way function in a public-key cryptosystem: multiplying two primes is easy, and cracking the code requires factoring their product.

**Key setup** (with absurdly small primes, for illustration only):

1. Choose primes p = 5 and q = 11. Then n = 55 and (p − 1)(q − 1) = 40.
2. Choose a public exponent e coprime to 40, say e = 3.
3. Find the private exponent d, the inverse of 3 modulo 40: 3 × 27 = 81 = 2 × 40 + 1, so d = 27. The [extended Euclidean algorithm](/blog/euclidean-algorithm-explained/) finds d for real key sizes.

The public key is (n, e) = (55, 3). The private key is d = 27, and p and q are kept secret.

**Encrypt** the message m = 7: c = 7³ mod 55 = 343 mod 55 = **13**.

**Decrypt**: m = 13²⁷ mod 55. Done by repeated squaring, this gives **7**, the original message.

**Why decryption works.** Since ed ≡ 1 (mod 40), ed = 1 + 40k for some k. Modulo 5, Fermat gives m⁴ ≡ 1 for m coprime to 5, so m^(ed) = m · (m⁴)^(10k) ≡ m (mod 5). The same holds modulo 11, using m¹⁰ ≡ 1. A number that is ≡ m modulo both 5 and 11 is ≡ m modulo 55, by the [Chinese remainder theorem](/blog/chinese-remainder-theorem-explained/). (The cases where m is a multiple of 5 or 11 also work out, using the form aᵖ ≡ a.)

**Where the security comes from.** Anyone who could factor n into p and q could compute (p − 1)(q − 1) and then d. With n = 55 that is trivial. Real keys use far larger primes, and MathWorld adds conditions on how they are chosen, such as p − 1 and q − 1 having large prime factors, so that special-purpose factoring methods do not break them easily. The fact that every integer has exactly one prime factorisation, the [fundamental theorem of arithmetic](/blog/fundamental-theorem-of-arithmetic/), is what makes "the" factors of n a well-defined secret.

## Powers and keys to try

1. Find 5²⁰⁰ mod 11. (5¹⁰ ≡ 1, so the answer is 1.)
2. Find 7²²² mod 13. (7¹² ≡ 1 and 222 = 12 × 18 + 6, so compute 7⁶ mod 13.)
3. With n = 55, e = 3 and d = 27, encrypt m = 2, then decrypt your answer.

The congruence rules, inverses and remainders that RSA combines belong to the number theory and modular arithmetic unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). Browse our [education apps](/apps/category/education-brain/), or the [discrete math hub](/blog/topics/discrete-math/) for the full number theory sequence.
