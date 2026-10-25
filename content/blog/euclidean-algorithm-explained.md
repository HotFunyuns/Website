---
{
  "title": "The Euclidean Algorithm: Finding a GCD by Hand, and Why It Works",
  "metaTitle": "Euclidean Algorithm: Find a GCD Step by Step",
  "description": "Find the greatest common divisor of two numbers by repeated division with remainder. Worked examples, why it works, how fast it is, and the extended version.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "number theory", "euclidean algorithm", "gcd"],
  "primaryKeyword": "euclidean algorithm",
  "secondaryKeywords": [
    "how to find gcd using euclidean algorithm",
    "greatest common divisor",
    "euclidean algorithm example",
    "why the euclidean algorithm works",
    "gcd and lcm relationship"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "gcd of 1071 and 462",
    "how many steps does the euclidean algorithm take",
    "euclidean algorithm worst case fibonacci",
    "euclidean algorithm in python"
  ],
  "aiSearchQuestions": [
    "How does the Euclidean algorithm find the greatest common divisor?",
    "Why does the Euclidean algorithm work?",
    "How many steps does the Euclidean algorithm take?",
    "What is the extended Euclidean algorithm used for?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "modular-inverse-explained",
    "modular-arithmetic-explained",
    "fundamental-theorem-of-arithmetic",
    "big-o-notation-explained",
    "simplifying-fractions-quickly",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The Euclidean algorithm uses gcd(a, b) = gcd(b, r), where r is the remainder of a divided by b, and repeats until the remainder is 0.",
    "The last nonzero remainder is the greatest common divisor: gcd(1071, 462) = 21.",
    "It works because every common divisor of a and b also divides r = a − qb, so the pairs (a, b) and (b, r) share the same divisors.",
    "It is fast: the number of steps is at most five times the number of digits of the smaller number, with consecutive Fibonacci numbers as the worst case.",
    "Running the steps backwards, the extended algorithm writes the gcd as ax + by, which is how modular inverses are found."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How does the Euclidean algorithm work?",
      "answer": "Divide the larger number by the smaller and keep the remainder. Replace the pair with (smaller number, remainder) and repeat. When the remainder reaches 0, the last nonzero remainder is the gcd. For 252 and 198: remainders 54, 36, 18, then 0, so gcd = 18."
    },
    {
      "question": "Why does the Euclidean algorithm give the correct answer?",
      "answer": "If a = qb + r, any number dividing both a and b also divides r = a − qb, and any number dividing both b and r also divides a = qb + r. So (a, b) and (b, r) have exactly the same common divisors and the same greatest one. Each step keeps the gcd and makes the numbers smaller."
    },
    {
      "question": "How many steps does the Euclidean algorithm take?",
      "answer": "Few. By Lamé's theorem the number of division steps is at most five times the number of decimal digits in the smaller number, and the worst case is a pair of consecutive Fibonacci numbers. Even for numbers with hundreds of digits it finishes in a few thousand steps at most."
    },
    {
      "question": "How do you find the lcm using the gcd?",
      "answer": "For positive integers a and b, lcm(a, b) = ab/gcd(a, b). With gcd(252, 198) = 18, lcm(252, 198) = 252 × 198/18 = 2,772."
    }
  ],
  "sources": [
    {
      "title": "Euclidean Algorithm",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/EuclideanAlgorithm.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Greatest Common Divisors and the Integers Modulo n: The Euclidean Algorithm (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-gcds-and-zsubn.html",
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

The greatest common divisor of two integers, gcd(a, b), is the largest integer that divides both. You can find it by factorising both numbers, but for large numbers factorising is slow. *Applied Discrete Structures* puts it bluntly: as early as Euclid's time it was known that factorisation wasn't the best way to compute greatest common divisors. The better way is the Euclidean algorithm, which MathWorld notes was given, for rational numbers, in Book VII of Euclid's *Elements*.

## The idea in one line

If a = qb + r with 0 ≤ r < b, then

**gcd(a, b) = gcd(b, r).**

So replace the pair (a, b) by the smaller pair (b, r), and repeat. The numbers shrink every step, and when the remainder becomes 0, gcd(g, 0) = g gives the answer: **the last nonzero remainder is the gcd.**

## Worked example 1: gcd(1071, 462)

| Step | Division | Remainder |
| ---: | --- | ---: |
| 1 | 1071 = 2 × 462 + 147 | 147 |
| 2 | 462 = 3 × 147 + 21 | 21 |
| 3 | 147 = 7 × 21 + 0 | 0 |

The last nonzero remainder is 21, so gcd(1071, 462) = 21. Check: 1071 = 21 × 51 and 462 = 21 × 22, and 51 and 22 share no factor. As a bonus, 1071/462 simplifies to 51/22: dividing by the gcd is a reliable way to [simplify a fraction](/blog/simplifying-fractions-quickly/) with large numbers.

## Worked example 2: gcd(252, 198)

| Step | Division | Remainder |
| ---: | --- | ---: |
| 1 | 252 = 1 × 198 + 54 | 54 |
| 2 | 198 = 3 × 54 + 36 | 36 |
| 3 | 54 = 1 × 36 + 18 | 18 |
| 4 | 36 = 2 × 18 + 0 | 0 |

So gcd(252, 198) = 18.

## Why it works

Suppose a = qb + r.

- If d divides a and b, then d divides a − qb = r. So every common divisor of a and b is a common divisor of b and r.
- If d divides b and r, then d divides qb + r = a. So every common divisor of b and r is a common divisor of a and b.

The two pairs have exactly the same common divisors, so they have the same greatest one. Each step preserves the gcd while making the numbers smaller, and since remainders are non-negative integers that strictly decrease, the process must stop. That last argument, a decreasing sequence of natural numbers cannot go on forever, is the well-ordering idea behind [induction](/blog/proof-by-induction-step-by-step/).

## How fast is it?

Very fast. MathWorld records Lamé's result that the number of steps is never more than five times the number of decimal digits in the smaller number, and that the worst case occurs for two consecutive Fibonacci numbers. For instance, gcd(89, 55) takes nine divisions (89, 55, 34, 21, 13, 8, 5, 3, 2, 1, each remainder the previous Fibonacci number), against at most 5 × 2 = 10 allowed by the bound.

In the language of [big-O notation](/blog/big-o-notation-explained/), the number of steps grows linearly with the number of digits, that is, logarithmically with the size of the numbers. That is why the algorithm stays practical even for numbers with hundreds of digits.

## In code

The recursive form is a direct translation of the key identity:

```
gcd(a, b):
    if b == 0: return a
    return gcd(b, a mod b)
```

It does not even need a ≥ b. If a < b, the first call computes a mod b = a and simply swaps the pair.

## gcd and lcm

For positive integers, gcd(a, b) × lcm(a, b) = a × b. So the least common multiple comes free: lcm(252, 198) = 252 × 198/18 = 2,772. Under the "divides" ordering, the gcd and lcm are the greatest lower bound and least upper bound of the two numbers, which is how they appear in [Hasse diagrams](/blog/partial-orders-and-hasse-diagrams/).

## The extended Euclidean algorithm

Running the divisions backwards expresses the gcd as a combination of the original numbers. From example 1:

21 = 462 − 3 × 147 and 147 = 1071 − 2 × 462, so

21 = 462 − 3 × (1071 − 2 × 462) = 7 × 462 − 3 × 1071.

That gcd(a, b) can always be written as ax + by for some integers x and y is **Bézout's lemma**, which *Applied Discrete Structures* states and proves. A key use is finding modular inverses: if gcd(a, n) = 1, then ax + ny = 1, so ax ≡ 1 (mod n) and x is the inverse of a. [Modular inverses with the extended Euclidean algorithm](/blog/modular-inverse-explained/) works through the table method.

## Three gcds to compute

1. Find gcd(391, 299). (Remainders 92, 23, 0: the gcd is 23.)
2. Find gcd(144, 89) and count the steps. Why so many?
3. Write gcd(252, 198) = 18 as 252x + 198y.

The gcd belongs to the number theory and modular arithmetic unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), which pairs naturally with the [rules of modular arithmetic](/blog/modular-arithmetic-explained/). Levin's open textbook covers the same ground in its introduction to number theory. Browse our [education apps](/apps/category/education-brain/), or see the [discrete math hub](/blog/topics/discrete-math/) for the full number theory sequence.
