---
{
  "title": "The Inclusion–Exclusion Principle: Counting Overlaps Without Double-Counting",
  "metaTitle": "Inclusion–Exclusion Principle, Explained with Examples",
  "description": "Inclusion–exclusion counts a union of overlapping sets: add the sets, subtract pairwise overlaps, add back triple overlaps. Formulas and four worked problems.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "counting", "combinatorics", "inclusion-exclusion"],
  "primaryKeyword": "inclusion exclusion principle",
  "secondaryKeywords": [
    "inclusion exclusion three sets",
    "principle of inclusion exclusion examples",
    "how many numbers divisible by 2 3 or 5",
    "counting surjections with inclusion exclusion",
    "venn diagram counting problems"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "inclusion exclusion formula for 3 sets",
    "how many integers from 1 to 100 are not divisible by 2 3 or 5",
    "number of onto functions formula",
    "why do you add back the triple intersection"
  ],
  "aiSearchQuestions": [
    "What is the inclusion–exclusion principle?",
    "What is the inclusion–exclusion formula for three sets?",
    "How do you count numbers divisible by at least one of several numbers?",
    "How is inclusion–exclusion used to count onto functions?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "set-operations-explained",
    "derangements-explained",
    "stars-and-bars-explained",
    "injective-surjective-bijective",
    "permutations-vs-combinations",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "For two sets, |A ∪ B| = |A| + |B| − |A ∩ B|: adding the sets counts the overlap twice, so subtract it once.",
    "For three sets, add the three sets, subtract the three pairwise overlaps and add back the triple overlap.",
    "In general the signs alternate: add single sets, subtract pairs, add triples, and so on.",
    "Many 'at least one' problems are easiest as total minus 'none', where 'none' is found by inclusion–exclusion.",
    "The same method counts onto functions, derangements and integers coprime to n."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the inclusion–exclusion principle?",
      "answer": "A rule for counting the elements in a union of overlapping sets. Add the sizes of the sets, subtract the sizes of all pairwise intersections, add the sizes of all triple intersections, and continue alternating. Each element ends up counted exactly once."
    },
    {
      "question": "What is the inclusion–exclusion formula for three sets?",
      "answer": "|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|. The triple intersection is added back because it was added three times and then subtracted three times."
    },
    {
      "question": "How many numbers from 1 to 100 are divisible by 2, 3 or 5?",
      "answer": "74. There are 50 multiples of 2, 33 of 3 and 20 of 5; subtract 16 multiples of 6, 10 of 10 and 6 of 15; add back 3 multiples of 30. 50 + 33 + 20 − 16 − 10 − 6 + 3 = 74, so 26 numbers are divisible by none of them."
    },
    {
      "question": "Why does inclusion–exclusion count each element exactly once?",
      "answer": "An element in exactly r of the sets is counted C(r, 1) − C(r, 2) + C(r, 3) − ⋯ times. By the binomial theorem that alternating sum equals 1 for every r ≥ 1, so every element of the union is counted once."
    }
  ],
  "sources": [
    {
      "title": "Additive and Multiplicative Principles: Principle of Inclusion/Exclusion (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_counting-addmult.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Advanced Counting Using PIE (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_advPIE.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Inclusion-Exclusion Principle",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Inclusion-ExclusionPrinciple.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Counting the elements of one set is easy. Counting the elements of a union of sets that overlap is where people go wrong, because adding the sizes counts the shared elements more than once. The inclusion–exclusion principle is the bookkeeping that fixes this. Levin's *Discrete Mathematics: An Open Introduction* describes it as a process of adding in, then taking out, then adding back in, and so on, and abbreviates it PIE.

## Two sets

If A and B overlap, |A| + |B| counts every element of A ∩ B twice. Subtract it once:

|A ∪ B| = |A| + |B| − |A ∩ B|.

**Example.** In a class of 30, 18 students play a sport and 12 play an instrument, and 7 do both. Then 18 + 12 − 7 = 23 do at least one, and 30 − 23 = 7 do neither.

That last step, total minus the union, is the most useful habit in this topic. Questions asking for "neither" or "none" are inclusion–exclusion problems in disguise.

## Three sets

With three sets, subtracting the pairwise overlaps takes away too much, and the triple overlap has to be added back:

|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.

To see why, follow an element that is in all three sets. It is counted three times in the first sum, subtracted three times in the second, and so would be counted zero times without the final term. An element in exactly two sets is counted twice, subtracted once: once in total. An element in one set is counted once.

**Example: languages.** Of 40 students, 18 take French, 15 Spanish and 12 German. Six take French and Spanish, 5 French and German, 4 Spanish and German, and 2 take all three. Then

18 + 15 + 12 − 6 − 5 − 4 + 2 = 32

take at least one language, and 8 take none. Filling in a three-circle Venn diagram from the centre outwards is a good check: 2 in the middle, then 4, 3 and 2 in the pairwise-only regions, then the single-language regions.

## The general formula

For n sets, add all the single sets, subtract all pairwise intersections, add all triple intersections, subtract all quadruple intersections, and so on, ending with the intersection of all n with sign (−1)ⁿ⁺¹. MathWorld gives this general form, and notes that the principle was used by Nicholas Bernoulli to count derangements.

Why does it work? An element in exactly r of the sets is counted

C(r, 1) − C(r, 2) + C(r, 3) − ⋯ ± C(r, r)

times. By the binomial theorem, (1 − 1)ʳ = 0 = 1 − C(r, 1) + C(r, 2) − ⋯, so the alternating sum above equals exactly 1. Every element of the union is counted once.

## Worked problem 1: divisibility

**How many integers from 1 to 100 are divisible by 2, 3 or 5?**

Let A₂, A₃, A₅ be the multiples of 2, 3 and 5 up to 100. A number is in A₂ ∩ A₃ exactly when it is a multiple of 6, and so on.

| Set | Count |
| --- | ---: |
| Multiples of 2 | 50 |
| Multiples of 3 | 33 |
| Multiples of 5 | 20 |
| Multiples of 6 | 16 |
| Multiples of 10 | 10 |
| Multiples of 15 | 6 |
| Multiples of 30 | 3 |

So 50 + 33 + 20 − 16 − 10 − 6 + 3 = **74** numbers are divisible by at least one of them, and 100 − 74 = 26 by none.

The same calculation for divisors of a number gives Euler's totient. The integers from 1 to 30 sharing no factor with 30 = 2 · 3 · 5 number 30 − (15 + 10 + 6) + (5 + 3 + 2) − 1 = 8.

## Worked problem 2: bit strings

**How many 8-bit strings start with 1 or end with 00?** Starting with 1: 2⁷ = 128. Ending with 00: 2⁶ = 64. Both: 2⁵ = 32. Answer: 128 + 64 − 32 = 160.

## Worked problem 3: onto functions

**How many functions from a 5-element set onto a 3-element set {a, b, c}?**

There are 3⁵ = 243 functions in all. Count the ones that miss at least one output. Functions missing a: 2⁵ = 32, and likewise for b and c. Missing both a and b: 1⁵ = 1, and likewise for the other two pairs. Missing all three: 0. So

243 − (3 · 32) + (3 · 1) − 0 = 150

functions are onto. This "total minus the bad ones" pattern is how [surjections](/blog/injective-surjective-bijective/) are usually counted.

## Worked problem 4: upper limits in distributions

Levin's book applies PIE to distribution problems with a cap. Distributing 10 identical sweets to 3 children with no child getting more than 4: without the cap, [stars and bars](/blog/stars-and-bars-explained/) gives C(12, 2) = 66 ways. If one particular child gets at least 5, give that child 5 first and distribute the other 5 freely: C(7, 2) = 21 ways, times 3 children. Two children can both get 5 or more only by getting exactly 5 each, leaving the third with none: 1 way for each of the 3 pairs. Three children with 5 or more would need 15. So 66 − 63 + 3 = **6** ways. (Check: the distributions are the arrangements of 4, 4, 2 and 4, 3, 3, three of each.)

## Recognising an inclusion–exclusion problem

- The question says "at least one", "none", "neither" or "not divisible by any".
- The conditions overlap: a number can be a multiple of both 2 and 3.
- The intersections are easier to count than the union.

The most famous application is counting [derangements](/blog/derangements-explained/), permutations in which nothing stays in its original place, which follows from the formula with n sets.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a combinatorics unit, broken into topics and lessons with knowledge checks, and topic and timed quizzes for practice. The app is listed with our [education and brain-training apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) has the rest of the counting series.
