---
{
  "title": "Recurrence Relations: Setting Them Up and Solving the Linear Ones",
  "metaTitle": "Recurrence Relations: How to Set Up and Solve Them",
  "description": "How to model a problem with a recurrence relation and solve linear ones with constant coefficients, including repeated roots and a constant extra term.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "recurrence relations", "sequences", "algorithms"],
  "primaryKeyword": "recurrence relations",
  "secondaryKeywords": [
    "characteristic equation recurrence",
    "solving linear recurrence relations",
    "homogeneous recurrence relation",
    "recurrence relation repeated root",
    "tower of hanoi recurrence"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to find a closed form for a recurrence",
    "solve a_n = 5a_(n-1) - 6a_(n-2)",
    "bit strings with no two consecutive 1s recurrence",
    "nonhomogeneous recurrence particular solution"
  ],
  "aiSearchQuestions": [
    "What is a recurrence relation?",
    "How do you solve a linear recurrence relation with constant coefficients?",
    "What do you do when the characteristic equation has a repeated root?",
    "How do you set up a recurrence relation for a counting problem?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "generating-functions-explained",
    "proof-by-induction-step-by-step",
    "fibonacci-and-recursive-sequences",
    "big-o-notation-explained",
    "strong-induction-vs-weak-induction",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A recurrence relation defines each term of a sequence from earlier terms; with enough initial conditions it determines the sequence completely.",
    "For aₙ = c₁aₙ₋₁ + c₂aₙ₋₂, solve the characteristic equation r² = c₁r + c₂; distinct roots r₁, r₂ give aₙ = A·r₁ⁿ + B·r₂ⁿ.",
    "A repeated root r gives aₙ = (A + Bn)rⁿ.",
    "Use the initial conditions to find the constants, then check the formula against a computed term.",
    "To set up a recurrence for a counting problem, split the objects of size n by what happens at the first or last step."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a recurrence relation?",
      "answer": "An equation that gives each term of a sequence in terms of earlier terms, such as aₙ = aₙ₋₁ + aₙ₋₂. Together with initial conditions, such as a₀ = 0 and a₁ = 1, it determines every term. A closed form is a formula for aₙ that does not refer to earlier terms."
    },
    {
      "question": "How do you solve a linear recurrence with constant coefficients?",
      "answer": "Write the characteristic equation by replacing aₙ with rⁿ and dividing by the lowest power: for aₙ = 5aₙ₋₁ − 6aₙ₋₂ it is r² − 5r + 6 = 0, with roots 2 and 3. The general solution is A·2ⁿ + B·3ⁿ, and the initial conditions fix A and B."
    },
    {
      "question": "What if the characteristic equation has a repeated root?",
      "answer": "If r is a double root, the general solution is aₙ = (A + Bn)rⁿ. For aₙ = 4aₙ₋₁ − 4aₙ₋₂ the characteristic equation is (r − 2)² = 0, so aₙ = (A + Bn)2ⁿ."
    },
    {
      "question": "How do I handle a constant term, as in aₙ = 2aₙ₋₁ + 1?",
      "answer": "Find one particular solution, often a constant c with c = 2c + 1, so c = −1. Add the general solution of the version without the constant, A·2ⁿ, to get aₙ = A·2ⁿ − 1, then use the initial condition to find A."
    }
  ],
  "sources": [
    {
      "title": "Solving Recurrence Relations (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_recurrence.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Recurrence Relations (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-recurrence-relations.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Recurrence Relation",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/RecurrenceRelation.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

A recurrence relation describes a sequence by saying how each term follows from the ones before it. "Each year the population doubles and 100 are added." "Each Fibonacci number is the sum of the previous two." Recurrences are the natural way to describe anything built step by step, and Levin's *Discrete Mathematics: An Open Introduction* notes that it is often easier to find a recursive definition than a closed formula.

This guide covers the two halves of working with them: **setting one up** from a problem, and **solving** it to get a closed-form formula.

## The vocabulary

- A **recurrence relation** gives aₙ in terms of earlier terms: aₙ = 2aₙ₋₁ + 1.
- **Initial conditions** give the first term or terms: a₁ = 1.
- A **closed form** gives aₙ directly: aₙ = 2ⁿ − 1.

A recurrence that reaches back k terms needs k initial conditions. aₙ = aₙ₋₁ + aₙ₋₂ needs two, which is why the Fibonacci sequence is defined by F₀ = 0 and F₁ = 1, the convention in Levin's *Discrete Mathematics: An Open Introduction*.

## Setting up a recurrence

The method: think about how an object of size n is built from smaller ones, usually by looking at the first or last step.

**Tower of Hanoi.** Moving n discs from one peg to another, never placing a larger disc on a smaller one, requires moving the top n − 1 discs out of the way, moving the largest disc, and moving the n − 1 discs back on top. So the minimum number of moves satisfies

Hₙ = 2Hₙ₋₁ + 1, with H₁ = 1.

**Bit strings with no two consecutive 1s.** Let bₙ count them. A valid string of length n either ends in 0, preceded by any valid string of length n − 1, or ends in 01, preceded by any valid string of length n − 2. So

bₙ = bₙ₋₁ + bₙ₋₂, with b₁ = 2 (0, 1) and b₂ = 3 (00, 01, 10).

The sequence runs 2, 3, 5, 8, 13, …, Fibonacci numbers shifted along. Our guide to [Fibonacci and recursive sequences](/blog/fibonacci-and-recursive-sequences/) covers where else that sequence turns up.

## Solving: linear, homogeneous, constant coefficients

The type solved in this guide, second-order linear with constant coefficients, has the form

aₙ = c₁aₙ₋₁ + c₂aₙ₋₂,

with constants c₁ and c₂. Levin's book calls the method below the characteristic root technique, and *Applied Discrete Structures* develops the same method for finite order linear relations.

**Step 1: guess aₙ = rⁿ.** Substituting gives rⁿ = c₁rⁿ⁻¹ + c₂rⁿ⁻², and dividing by rⁿ⁻² leaves the **characteristic equation**

r² − c₁r − c₂ = 0.

**Step 2: find the roots.** If they are distinct, r₁ and r₂, the general solution is

aₙ = A·r₁ⁿ + B·r₂ⁿ.

**Step 3: fit the initial conditions** to find A and B.

**Worked example.** Solve aₙ = 5aₙ₋₁ − 6aₙ₋₂ with a₀ = 1, a₁ = 4.

- Characteristic equation: r² − 5r + 6 = 0, so (r − 2)(r − 3) = 0 and r = 2, 3.
- General solution: aₙ = A·2ⁿ + B·3ⁿ.
- n = 0: A + B = 1. n = 1: 2A + 3B = 4. So B = 2 and A = −1.
- Closed form: **aₙ = 2·3ⁿ − 2ⁿ.**

**Check** a term the recurrence computes directly: a₂ = 5 × 4 − 6 × 1 = 14, and the formula gives 2 × 9 − 4 = 14. Always do this; it catches an arithmetic slip in step 3 at once.

## Repeated roots

If the characteristic equation has a double root r, the solution rⁿ alone is not enough, and the general solution becomes

aₙ = (A + Bn)rⁿ.

**Worked example.** aₙ = 4aₙ₋₁ − 4aₙ₋₂, with a₀ = 1 and a₁ = 6.

- r² − 4r + 4 = (r − 2)² = 0, a double root at 2.
- aₙ = (A + Bn)2ⁿ. n = 0 gives A = 1; n = 1 gives (1 + B)·2 = 6, so B = 2.
- **aₙ = (1 + 2n)2ⁿ.** Check: a₂ = 4 × 6 − 4 × 1 = 20 and (1 + 4) × 4 = 20.

## Adding a constant term

A recurrence such as Hₙ = 2Hₙ₋₁ + 1 is non-homogeneous because of the + 1. Solve it in two parts.

1. **A particular solution.** Try a constant c: c = 2c + 1 gives c = −1.
2. **The homogeneous part.** Hₙ = 2Hₙ₋₁ has solution A·2ⁿ.
3. **Combine and fit.** Hₙ = A·2ⁿ − 1. With H₁ = 1, 2A − 1 = 1, so A = 1.

So the Tower of Hanoi needs **2ⁿ − 1** moves: 7 for three discs, 1,023 for ten. You can confirm a guessed closed form like this with a [proof by induction](/blog/proof-by-induction-step-by-step/), and when a recurrence calls on two earlier terms, the proof uses [strong induction](/blog/strong-induction-vs-weak-induction/).

## The Fibonacci closed form

For Fₙ = Fₙ₋₁ + Fₙ₋₂, the characteristic equation r² − r − 1 = 0 has roots φ = (1 + √5)/2 and ψ = (1 − √5)/2. Fitting F₀ = 0 and F₁ = 1 gives Binet's formula,

Fₙ = (φⁿ − ψⁿ)/√5.

Since |ψ| < 1, the second term shrinks quickly, so Fₙ is the nearest integer to φⁿ/√5, and the sequence grows by a factor of about 1.618 each step.

## Recurrences in algorithm analysis

Divide-and-conquer algorithms give a different family. An algorithm that splits a problem of size n into two halves, solves each half, and combines the results with n further steps satisfies T(n) = 2T(n/2) + n. This is not a constant-coefficient recurrence in n, so characteristic roots do not apply directly; unrolling it for n a power of 2 with T(1) = 0 gives T(n) = n log₂ n (for example T(8) = 24), the kind of growth rate expressed in [big-O notation](/blog/big-o-notation-explained/).

For recurrences the characteristic method cannot handle, and for a second route to the ones it can, see [generating functions](/blog/generating-functions-explained/).

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a recurrences unit, with lessons, knowledge checks and topic quizzes. It belongs to our [education app collection](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) lists the neighbouring guides.
