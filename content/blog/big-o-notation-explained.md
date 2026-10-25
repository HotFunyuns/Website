---
{
  "title": "Big-O Notation for Discrete Math Students: Definitions, Proofs and Common Classes",
  "metaTitle": "Big-O Notation Explained: Definition, Proofs, Classes",
  "description": "What f(n) = O(g(n)) means, how to prove it by finding constants c and k, how big-Omega and big-Theta differ, and the growth classes that algorithms fall into.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "algorithms", "big-o notation", "complexity"],
  "primaryKeyword": "big o notation",
  "secondaryKeywords": [
    "big o notation definition",
    "how to prove big o",
    "big omega and big theta",
    "big o complexity classes",
    "order of growth"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "find c and k to prove big o",
    "prove n squared is not big o of n",
    "is 3n plus 4 big o of n squared",
    "log n vs n log n growth"
  ],
  "aiSearchQuestions": [
    "What does big-O notation mean?",
    "How do you prove that f(n) is O(g(n))?",
    "What is the difference between big-O, big-Omega and big-Theta?",
    "What are the common big-O complexity classes?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "recurrence-relations-explained",
    "expected-value-explained",
    "euclidean-algorithm-explained",
    "dijkstras-algorithm-explained",
    "predicates-and-quantifiers",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "f(n) = O(g(n)) means there are positive constants c and k with f(n) ≤ c·g(n) for every n ≥ k: g bounds f from above, up to a constant factor, eventually.",
    "To prove a big-O claim, exhibit specific c and k and show the inequality; to disprove one, show no constant can work.",
    "Big-Omega gives a lower bound and big-Theta a tight bound, both above and below.",
    "Constants and lower-order terms are dropped: 5n² + 3n + 7 is Θ(n²).",
    "The common classes, from slowest-growing to fastest, are 1, log n, n, n log n, n², n³, 2ⁿ and n!."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does big-O notation mean?",
      "answer": "f(n) = O(g(n)) means that for all large enough n, f(n) is at most a constant multiple of g(n). Formally, there exist positive constants c and k with 0 ≤ f(n) ≤ c·g(n) for every n ≥ k. It describes how a cost grows as the input size grows, ignoring constant factors."
    },
    {
      "question": "How do you prove that a function is O(n²)?",
      "answer": "Find constants that make the inequality true. For n² + 3n + 4, when n ≥ 1 each term is at most a multiple of n², so n² + 3n + 4 ≤ n² + 3n² + 4n² = 8n². Taking c = 8 and k = 1 completes the proof."
    },
    {
      "question": "What is the difference between big-O, big-Omega and big-Theta?",
      "answer": "Big-O is an upper bound, big-Omega a lower bound, and big-Theta both at once. 3n + 4 is O(n²), since n² eventually exceeds it, but it is not Θ(n²); it is Θ(n). NIST notes that big-O is often misused to mean 'equal to', and that 'equal to' is what big-Theta expresses."
    },
    {
      "question": "Is O(log n) faster than O(n)?",
      "answer": "For large inputs, yes: log n grows far more slowly than n. Doubling n adds only a constant to log n but doubles n itself. Binary search, which halves the search range each step, takes logarithmic time, while scanning a list item by item takes linear time."
    }
  ],
  "sources": [
    {
      "title": "big-O notation (Dictionary of Algorithms and Data Structures)",
      "publisher": "National Institute of Standards and Technology (NIST)",
      "url": "https://xlinux.nist.gov/dads/HTML/bigOnotation.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Analysis of Algorithms (Algorithms, 4th edition, Sedgewick and Wayne)",
      "publisher": "Princeton University",
      "url": "https://algs4.cs.princeton.edu/14analysis/",
      "accessed": "2026-10-24"
    },
    {
      "title": "6.042J Mathematics for Computer Science, Spring 2015: Readings",
      "publisher": "MIT OpenCourseWare",
      "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/pages/readings/",
      "accessed": "2026-10-24"
    },
    {
      "title": "Euclidean Algorithm",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/EuclideanAlgorithm.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Big-O notation is how computer scientists compare algorithms without timing them on a particular machine. It describes how a cost, usually running time or memory, grows as the input gets larger, and it deliberately ignores constant factors that depend on hardware. In a discrete math course it is treated as what it is underneath: a precise statement with quantifiers, which can be proved and disproved like any other.

## The formal definition

NIST's Dictionary of Algorithms and Data Structures gives the formal version:

**f(n) = O(g(n)) means there are positive constants c and k such that 0 ≤ f(n) ≤ c·g(n) for all n ≥ k.** The values of c and k must be fixed for the function f and must not depend on n.

Read it as: **eventually** (from some k on), f is **at most a constant multiple** of g. Both qualifiers matter. "Eventually" lets small inputs behave however they like. "A constant multiple" means 100n and n are treated as the same rate of growth.

In quantifier form, f(n) = O(g(n)) is ∃c ∃k ∀n ≥ k (f(n) ≤ c·g(n)). The order of the quantifiers is what forces c and k to be chosen *before* n, the point stressed in [predicates and quantifiers](/blog/predicates-and-quantifiers/).

## Proving a big-O claim

To prove f(n) = O(g(n)), exhibit a c and a k, then verify the inequality.

**Claim.** n² + 3n + 4 = O(n²).

**Proof.** For n ≥ 1 we have n ≤ n² and 1 ≤ n², so

n² + 3n + 4 ≤ n² + 3n² + 4n² = 8n².

Take c = 8 and k = 1. ∎

Many other constants also work; NIST's own example notes that n² + 3n + 4 < 2n² once n is larger than 10. Any valid pair proves the claim. The bounding trick, replacing each lower-order term by a multiple of the highest power, works for every polynomial.

## Disproving a big-O claim

To show f(n) is **not** O(g(n)), you must show that no constants work, which is the negation of an existential statement.

**Claim.** n² is not O(n).

**Proof.** Suppose there were c and k with n² ≤ cn for all n ≥ k. Dividing by n gives n ≤ c for all n ≥ k. But n = max(k, ⌈c⌉ + 1) is at least k and greater than c, a contradiction. ∎

This is a [proof by contradiction](/blog/proof-by-contradiction-explained/), and its structure, "whatever constant you pick, a large enough n beats it", is the template for every disproof.

## Big-Omega and big-Theta

| Notation | Meaning | Informally |
| --- | --- | --- |
| f = O(g) | f(n) ≤ c·g(n) eventually | f grows no faster than g |
| f = Ω(g) | f(n) ≥ c·g(n) eventually, for some c > 0 | f grows at least as fast as g |
| f = Θ(g) | Both O(g) and Ω(g) | f and g grow at the same rate |

Big-O alone is only an upper bound, so it can be loose. NIST notes that 3n + 4 is, strictly speaking, O(n²) too, and that big-O is often misused to mean "equal to" rather than "less than". So when "this algorithm is O(n)" is meant as a tight bound, the precise statement is Θ(n).

## The rules you actually use

- **Drop constant factors:** 7n³ is Θ(n³).
- **Keep only the fastest-growing term:** n³ + 1000n² is Θ(n³).
- **Sums of steps add, and the biggest wins:** an O(n) step followed by an O(n²) step is O(n²) overall.
- **Nested loops multiply:** a loop of n iterations containing a loop of n iterations is O(n²).
- **Logarithm bases do not matter:** log₂ n and log₁₀ n differ by a constant factor, so both are Θ(log n).

## The common growth classes

Sedgewick and Wayne's *Algorithms* observes that, because programs are built from a few structures (statements, conditionals, loops, nesting and method calls), the order of growth of a cost is very often one of just a few functions of the problem size. In order:

| Growth | Name | Typical source |
| --- | --- | --- |
| 1 | Constant | Reading one array entry |
| log n | Logarithmic | Binary search: halving the range each step |
| n | Linear | One pass over the input |
| n log n | Linearithmic | Mergesort: halving, then a linear merge at each level |
| n² | Quadratic | Comparing every pair |
| n³ | Cubic | Checking every triple, as in brute-force 3-sum |
| 2ⁿ | Exponential | Trying every subset |
| n! | Factorial | Trying every ordering |

The jumps are enormous. With n = 1,000, log₂ n is about 10, n² is a million and 2ⁿ has more than 300 digits. NIST's entry draws the practical lesson: quicksort, O(n log n) on average, running on a small desktop computer can beat bubble sort, O(n²), running on a supercomputer if there are a lot of numbers to sort. Sedgewick and Wayne make the same point by replacing a brute-force 3-sum, which uses about N³/2 array accesses, with a method built on mergesort and binary search that runs in time proportional to N² log N.

## Where these bounds come from

Running times of recursive algorithms are usually found by setting up and solving [recurrence relations](/blog/recurrence-relations-explained/): mergesort's T(n) = 2T(n/2) + n solves to Θ(n log n). Average-case running times are [expected values](/blog/expected-value-explained/) over random inputs. And some classical algorithms come with their own analysis; for the [Euclidean algorithm](/blog/euclidean-algorithm-explained/), MathWorld reports Lamé's result that the number of steps is at most about five times the number of digits in the smaller number, which is why it is fast even for huge numbers.

## Big-O mistakes to avoid

1. **Treating O as "equals".** It is an upper bound; say Θ when you mean tight.
2. **Letting c depend on n.** "f(n) ≤ n · g(n)" is not a big-O bound unless n is part of g.
3. **Ignoring the "eventually".** A bound that fails for small n can still be valid; a bound that fails for infinitely many large n cannot.
4. **Comparing algorithms only by big-O on small inputs.** Constants matter in practice when n is small.

Big-O belongs with the induction and algorithms unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). The app is listed with our [education apps](/apps/category/education-brain/), and graph algorithms such as [Dijkstra's algorithm](/blog/dijkstras-algorithm-explained/) come later in the [discrete math hub](/blog/topics/discrete-math/).
