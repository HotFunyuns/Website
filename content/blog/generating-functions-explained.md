---
{
  "title": "Generating Functions: Turning a Sequence into an Algebra Problem",
  "metaTitle": "Generating Functions Explained for Discrete Math",
  "description": "A generating function stores a sequence as the coefficients of a power series. How to build one, the core identities, and how to count and solve recurrences.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "generating functions", "combinatorics", "recurrence relations"],
  "primaryKeyword": "generating functions",
  "secondaryKeywords": [
    "ordinary generating function",
    "generating function of a sequence",
    "solving recurrence relations with generating functions",
    "generating functions counting problems",
    "1/(1-x) generating function"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to find the generating function for a sequence",
    "coefficient extraction generating function",
    "ways to make change generating function",
    "partial fractions generating functions"
  ],
  "aiSearchQuestions": [
    "What is a generating function?",
    "How do you use generating functions to solve a recurrence relation?",
    "How do generating functions help with counting problems?",
    "What is the generating function for 1, 1, 1, 1, …?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "recurrence-relations-explained",
    "stars-and-bars-explained",
    "binomial-theorem-and-pascals-triangle",
    "catalan-numbers-explained",
    "sequences-and-summation-notation",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The generating function of a sequence a₀, a₁, a₂, … is A(x) = a₀ + a₁x + a₂x² + ⋯; the sequence is stored in the coefficients.",
    "The basic identity is 1/(1 − x) = 1 + x + x² + ⋯, and 1/(1 − cx) generates 1, c, c², ….",
    "Multiplying generating functions combines choices: the coefficient of xⁿ in a product counts the ways to split n between the factors.",
    "To solve a recurrence, multiply it by xⁿ, sum, solve for A(x), then use partial fractions to read off the coefficients.",
    "The variable x is a placeholder: treated as a formal power series, the generating function needs no convergence for counting."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a generating function?",
      "answer": "A power series whose coefficients are the terms of a sequence: the sequence a₀, a₁, a₂, … has generating function a₀ + a₁x + a₂x² + ⋯. It packages an infinite sequence into one algebraic object that can be added, multiplied and simplified."
    },
    {
      "question": "What is the generating function for 1, 1, 1, …?",
      "answer": "1/(1 − x), because 1 + x + x² + x³ + ⋯ is a geometric series with ratio x. Similarly 1/(1 − 2x) generates 1, 2, 4, 8, …, and 1/(1 − x)² generates 1, 2, 3, 4, …."
    },
    {
      "question": "How do generating functions solve recurrence relations?",
      "answer": "Multiply the recurrence by xⁿ and sum over n. Shifted sums become multiples of A(x), giving an equation you can solve for A(x). Splitting the result into partial fractions turns it into geometric series whose coefficients give the closed form."
    },
    {
      "question": "Why does multiplying generating functions count combinations?",
      "answer": "When you multiply (Σ aᵢxⁱ)(Σ bⱼxʲ), the coefficient of xⁿ is the sum of aᵢbⱼ over all i + j = n. If aᵢ counts ways to do a first task with size i and bⱼ a second with size j, that sum counts the ways to do both with total size n."
    }
  ],
  "sources": [
    {
      "title": "Generating Functions (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_addtops-genfun.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Generating Function",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/GeneratingFunction.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

A generating function is a way of writing down an infinite sequence as a single object you can do algebra with. The sequence a₀, a₁, a₂, … becomes the power series

A(x) = a₀ + a₁x + a₂x² + a₃x³ + ⋯

The powers of x are only labels: the coefficient of xⁿ is the nth term. Once a sequence is packaged this way, adding, multiplying and simplifying the series answers questions about the sequence, including counting problems and recurrences that are awkward to attack directly. Levin's *Discrete Mathematics: An Open Introduction* covers building generating functions, manipulating them and using them to solve recurrence relations, which is the route followed here.

## The one identity everything starts from

The geometric series gives

**1/(1 − x) = 1 + x + x² + x³ + ⋯,**

the generating function of 1, 1, 1, 1, …. Every other basic generating function comes from it.

| Generating function | Sequence | How |
| --- | --- | --- |
| 1/(1 − x) | 1, 1, 1, 1, … | Geometric series |
| 1/(1 − 2x) | 1, 2, 4, 8, … | Replace x by 2x |
| 1/(1 + x) | 1, −1, 1, −1, … | Replace x by −x |
| x/(1 − x) | 0, 1, 1, 1, … | Multiply by x: shift right |
| 1/(1 − x)² | 1, 2, 3, 4, … | Differentiate 1/(1 − x) |
| (1 + x)ⁿ | C(n, 0), C(n, 1), …, C(n, n) | Binomial theorem |
| 1/(1 − x)ᵏ | C(n + k − 1, k − 1) for n = 0, 1, … | Stars and bars |

Two operations are worth naming. **Multiplying by x shifts** the sequence one place to the right. **Multiplying by 1/(1 − x) takes partial sums**: the coefficient of xⁿ in A(x)/(1 − x) is a₀ + a₁ + ⋯ + aₙ.

The last row is the [stars and bars](/blog/stars-and-bars-explained/) count, and the sixth is the [binomial theorem](/blog/binomial-theorem-and-pascals-triangle/) seen from a new angle.

## Counting with products

Multiplying generating functions combines independent choices. The coefficient of xⁿ in A(x)B(x) is

a₀bₙ + a₁bₙ₋₁ + ⋯ + aₙb₀,

the number of ways to split a total of n between the two choices.

**Example: making change.** In how many ways can you make 10 cents from 1-cent, 2-cent and 5-cent coins? Each coin type contributes a factor listing how much value it can supply:

- 1-cent coins: 1 + x + x² + x³ + ⋯ = 1/(1 − x)
- 2-cent coins: 1 + x² + x⁴ + ⋯ = 1/(1 − x²)
- 5-cent coins: 1 + x⁵ + x¹⁰ + ⋯ = 1/(1 − x⁵)

The answer is the coefficient of x¹⁰ in 1/((1 − x)(1 − x²)(1 − x⁵)). Expanding by hand is easiest by sorting on the number of 5-cent coins: with none, 0 to 5 two-cent coins, 6 ways; with one, 0 to 2 two-cent coins, 3 ways; with two, 1 way. Total: **10**.

The generating function earns its keep when the questions change. Restrictions become changes to the factors: "at most three 2-cent coins" replaces 1/(1 − x²) with 1 + x² + x⁴ + x⁶, and the same product machinery handles it.

## Solving a recurrence

Take the Tower of Hanoi recurrence aₙ = 2aₙ₋₁ + 1 with a₀ = 0.

**Step 1: multiply by xⁿ and sum** over n ≥ 1:

Σ aₙxⁿ = 2 Σ aₙ₋₁xⁿ + Σ xⁿ.

**Step 2: rewrite each sum in terms of A(x).** The left side is A(x) − a₀ = A(x). The first sum on the right is 2x·A(x). The last is x/(1 − x). So

A(x) = 2x·A(x) + x/(1 − x).

**Step 3: solve for A(x):**

A(x) = x/((1 − x)(1 − 2x)).

**Step 4: partial fractions.** Write x/((1 − x)(1 − 2x)) = P/(1 − x) + Q/(1 − 2x). Then x = P(1 − 2x) + Q(1 − x). Putting x = 1 gives P = −1; putting x = 1/2 gives Q = 1. So

A(x) = 1/(1 − 2x) − 1/(1 − x).

**Step 5: read off coefficients.** The coefficient of xⁿ is 2ⁿ − 1. So aₙ = **2ⁿ − 1**, the same answer as the characteristic-root method in [recurrence relations](/blog/recurrence-relations-explained/).

For this recurrence the characteristic method is quicker. Generating functions win when the recurrence is harder: when the extra term is a more complicated function of n, or when it is a convolution such as the one that defines the [Catalan numbers](/blog/catalan-numbers-explained/), Cₙ₊₁ = Σ CᵢCₙ₋ᵢ, which turns into a quadratic equation for the generating function.

## Do we need the series to converge?

For counting, no. MathWorld defines a generating function as a formal power series whose coefficients give the sequence, and in that formal setting x is a placeholder, not a number to substitute. The identities above hold as statements about coefficients. Analytic questions only matter when you want to estimate how fast the coefficients grow.

## A short practice set

1. Find the sequence generated by 1/(1 − 3x). (1, 3, 9, 27, …)
2. Find the generating function for 0, 1, 2, 3, …. (x/(1 − x)².)
3. Use a product of three factors to count solutions of a + b + c = 6 with a ≤ 2 and b, c unrestricted. (The coefficient of x⁶ in (1 + x + x²)/(1 − x)², which is 7 + 6 + 5 = 18.)
4. Solve aₙ = 3aₙ₋₁ with a₀ = 2 using generating functions. (A(x) = 2/(1 − 3x), so aₙ = 2·3ⁿ.)

Sums written with sigma notation, used throughout this guide, are covered in [summation notation](/blog/sequences-and-summation-notation/). Recurrences have their own unit in [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), the ninth, between probability and graph theory. It is in our [education app collection](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) collects the related counting guides.
