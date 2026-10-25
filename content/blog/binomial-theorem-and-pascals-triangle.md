---
{
  "title": "The Binomial Theorem and Pascal's Triangle: Where the Coefficients Come From",
  "metaTitle": "Binomial Theorem and Pascal's Triangle, Explained",
  "description": "Why the coefficients of (x + y)ⁿ are the numbers n choose k, how Pascal's triangle builds them, a worked expansion, and identities you can prove by counting.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "combinatorics", "binomial theorem", "pascals triangle"],
  "primaryKeyword": "binomial theorem",
  "secondaryKeywords": [
    "pascal's triangle",
    "binomial coefficients",
    "binomial expansion example",
    "pascal's rule proof",
    "coefficient of x in binomial expansion"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why are binomial coefficients in pascal's triangle",
    "expand (2x - 3)^4 using the binomial theorem",
    "sum of a row of pascal's triangle",
    "combinatorial proof of pascal's identity"
  ],
  "aiSearchQuestions": [
    "What is the binomial theorem?",
    "How is Pascal's triangle related to the binomial theorem?",
    "How do you find a specific coefficient in a binomial expansion?",
    "Why does each row of Pascal's triangle add up to a power of 2?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "permutations-vs-combinations",
    "binomial-distribution-explained",
    "lattice-paths-counting",
    "power-set-explained",
    "generating-functions-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The binomial theorem says (x + y)ⁿ is the sum of C(n, k) xⁿ⁻ᵏ yᵏ for k from 0 to n.",
    "The coefficient C(n, k) counts the ways to pick y from k of the n factors, which is why combinations appear.",
    "Pascal's triangle builds the coefficients row by row: each entry is the sum of the two entries above it, C(n, k) = C(n − 1, k − 1) + C(n − 1, k).",
    "Setting x = y = 1 shows each row sums to 2ⁿ; setting x = 1 and y = −1 shows the alternating sum is 0.",
    "To find one term of an expansion, write the general term and solve for the k that gives the power you want."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the binomial theorem?",
      "answer": "A formula for expanding a power of a sum: (x + y)ⁿ = C(n, 0)xⁿ + C(n, 1)xⁿ⁻¹y + C(n, 2)xⁿ⁻²y² + ⋯ + C(n, n)yⁿ. The coefficients C(n, k) are binomial coefficients, the same numbers that count combinations."
    },
    {
      "question": "How is Pascal's triangle related to the binomial theorem?",
      "answer": "Row n of Pascal's triangle, counting the top row as row 0, lists the coefficients of (x + y)ⁿ. Row 4 is 1, 4, 6, 4, 1, so (x + y)⁴ = x⁴ + 4x³y + 6x²y² + 4xy³ + y⁴."
    },
    {
      "question": "How do I find the coefficient of x² in (2x − 3)⁴?",
      "answer": "The general term is C(4, k)(2x)⁴⁻ᵏ(−3)ᵏ. For x², take k = 2: C(4, 2) · 2² · (−3)² = 6 · 4 · 9 = 216. The full expansion is 16x⁴ − 96x³ + 216x² − 216x + 81."
    },
    {
      "question": "Why does each row of Pascal's triangle add up to a power of 2?",
      "answer": "Set x = y = 1 in the binomial theorem: 2ⁿ = (1 + 1)ⁿ = C(n, 0) + C(n, 1) + ⋯ + C(n, n). As a counting argument, both sides count the subsets of an n-element set: the right side groups them by size."
    }
  ],
  "sources": [
    {
      "title": "Binomial Coefficients (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_counting-binom.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Binomial Theorem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/BinomialTheorem.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Pascal's Triangle",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/PascalsTriangle.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Combinatorial Proofs (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_comb-proofs.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Multiply out (x + y)² and you get x² + 2xy + y². Do (x + y)³ and you get x³ + 3x²y + 3xy² + y³. The coefficients 1, 2, 1 and 1, 3, 3, 1 are not random: they are the numbers that count combinations. The binomial theorem says exactly which numbers appear for any power, and Pascal's triangle is a quick way to generate them.

## The expansion formula

For any whole number n,

(x + y)ⁿ = C(n, 0)xⁿ + C(n, 1)xⁿ⁻¹y + C(n, 2)xⁿ⁻²y² + ⋯ + C(n, n)yⁿ,

where C(n, k) = n!/(k!(n − k)!) is the number of ways to choose k items from n, as in [permutations versus combinations](/blog/permutations-vs-combinations/). In sigma notation, (x + y)ⁿ = Σ C(n, k) xⁿ⁻ᵏ yᵏ, summed from k = 0 to n. The numbers C(n, k) are called **binomial coefficients** because of this theorem.

## Why combinations appear

Write (x + y)ⁿ as n factors multiplied together:

(x + y)(x + y)(x + y) ⋯ (x + y).

To expand, choose either x or y from each factor and multiply your choices. Every term in the expansion comes from one such set of choices. A term equal to xⁿ⁻ᵏyᵏ comes from choosing y in exactly k of the factors and x in the rest. The number of ways to pick which k factors give y is C(n, k). So xⁿ⁻ᵏyᵏ appears C(n, k) times, and that is its coefficient.

This counting argument is the proof. It is a typical combinatorial proof: instead of manipulating algebra, it shows that both sides count the same thing. Levin's *Discrete Mathematics: An Open Introduction* gives a whole section to proofs of this kind.

## Pascal's triangle

Arrange the binomial coefficients in rows, with row n holding C(n, 0) to C(n, n):

| Row | Entries |
| ---: | --- |
| 0 | 1 |
| 1 | 1 1 |
| 2 | 1 2 1 |
| 3 | 1 3 3 1 |
| 4 | 1 4 6 4 1 |
| 5 | 1 5 10 10 5 1 |
| 6 | 1 6 15 20 15 6 1 |
| 7 | 1 7 21 35 35 21 7 1 |

The rule for building it: each row starts and ends with 1, and every other entry is the sum of the two entries above it. In symbols, that is **Pascal's rule**,

C(n, k) = C(n − 1, k − 1) + C(n − 1, k).

Levin's book states the same recurrence and uses the triangle to read off values such as C(12, 6) = 924.

**Why Pascal's rule holds, by counting.** Choose k people from a group of n that includes Ann. Either Ann is chosen, and the other k − 1 come from the remaining n − 1 people, C(n − 1, k − 1) ways; or Ann is not chosen, and all k come from the other n − 1, C(n − 1, k) ways. Adding the two cases gives C(n, k).

## A worked expansion

**Expand (2x − 3)⁴.** Use x → 2x and y → −3 in the theorem, with the row-4 coefficients 1, 4, 6, 4, 1:

| k | C(4, k) | (2x)⁴⁻ᵏ | (−3)ᵏ | Term |
| ---: | ---: | --- | ---: | --- |
| 0 | 1 | 16x⁴ | 1 | 16x⁴ |
| 1 | 4 | 8x³ | −3 | −96x³ |
| 2 | 6 | 4x² | 9 | 216x² |
| 3 | 4 | 2x | −27 | −216x |
| 4 | 1 | 1 | 81 | 81 |

So (2x − 3)⁴ = 16x⁴ − 96x³ + 216x² − 216x + 81. A quick check: setting x = 1 should give (2 − 3)⁴ = 1, and 16 − 96 + 216 − 216 + 81 = 1. Signs alternate because (−3)ᵏ is negative for odd k, so carry the sign of −3 into every power.

**Finding one term without the rest.** For the coefficient of x⁵ in (x + 2)⁸, the general term is C(8, k)x⁸⁻ᵏ2ᵏ. You need 8 − k = 5, so k = 3: C(8, 3) · 2³ = 56 · 8 = 448.

## Identities that fall out

Substituting values for x and y gives identities with one-line proofs.

- **Row sums.** x = y = 1: C(n, 0) + C(n, 1) + ⋯ + C(n, n) = 2ⁿ. Row 5 sums to 32. Combinatorially, both sides count the subsets of an n-element set, grouped by size on the left; see [power sets](/blog/power-set-explained/).
- **Alternating sums.** x = 1, y = −1: C(n, 0) − C(n, 1) + C(n, 2) − ⋯ = 0 for n ≥ 1. A set has as many even-sized subsets as odd-sized ones. This identity is the reason inclusion–exclusion counts every element exactly once.
- **Symmetry.** C(n, k) = C(n, n − k): choosing k to include is the same as choosing n − k to leave out. The rows read the same backwards.
- **The hockey stick.** C(k, k) + C(k + 1, k) + ⋯ + C(n, k) = C(n + 1, k + 1). In the triangle, a diagonal run of entries sums to the entry just below and to the side of its end.

MathWorld's article on Pascal's triangle lists many more patterns, including the fact that its shallow diagonals sum to the Fibonacci numbers.

## Uses beyond algebra

- **Approximation.** (1.01)¹⁰ = 1 + 10(0.01) + 45(0.0001) + 120(0.000001) + ⋯ ≈ 1.1046 (the exact value is 1.10462…), a way to estimate compound growth by hand.
- **Probability.** The chance of exactly k heads in n fair coin tosses is C(n, k)/2ⁿ. With an unfair coin, the binomial theorem's terms become the [binomial distribution](/blog/binomial-distribution-explained/).
- **Paths on a grid.** The number of shortest routes across an a-by-b grid is C(a + b, a), so Pascal's triangle is also a table of [lattice path counts](/blog/lattice-paths-counting/).
- **Generating functions.** (1 + x)ⁿ is the generating function of row n, an idea developed in [generating functions](/blog/generating-functions-explained/).

Counting questions like these belong to the combinatorics unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), which has topic quizzes and full-length practice exams. It is one of our [education apps](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) has the rest of the counting guides.
