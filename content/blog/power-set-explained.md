---
{
  "title": "Power Sets: Why a Set with n Elements Has 2ⁿ Subsets",
  "metaTitle": "Power Set Explained: Why n Elements Give 2ⁿ Subsets",
  "description": "The power set of a set is the set of all its subsets. How to list one without missing any, three proofs that it has 2ⁿ elements, and the traps with ∅ and {∅}.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "set theory", "power set", "counting"],
  "primaryKeyword": "power set",
  "secondaryKeywords": [
    "power set of a set example",
    "number of subsets of a set",
    "power set of empty set",
    "power set cardinality 2 to the n",
    "subsets vs proper subsets"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to list all subsets of a set",
    "why does a set with n elements have 2 to the n subsets",
    "power set of the power set of the empty set",
    "how many subsets with exactly k elements"
  ],
  "aiSearchQuestions": [
    "What is a power set?",
    "How many subsets does a set with n elements have?",
    "What is the power set of the empty set?",
    "How do you list all the subsets of a set?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "set-operations-explained",
    "binomial-theorem-and-pascals-triangle",
    "countable-vs-uncountable-sets",
    "number-bases-and-binary",
    "proof-by-induction-step-by-step",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The power set P(A) is the set of all subsets of A, including the empty set and A itself.",
    "A set with n elements has 2ⁿ subsets, because each element is independently either in or out of a subset.",
    "Subsets of {a₁, …, aₙ} correspond one-to-one with n-bit binary strings, which is how programs list them.",
    "The number of subsets with exactly k elements is C(n, k), and adding these over k gives 2ⁿ.",
    "P(∅) = {∅} has one element, and a power set is always strictly larger than the original set, even for infinite sets."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the power set of {a, b, c}?",
      "answer": "The set of all eight of its subsets: ∅, {a}, {b}, {c}, {a, b}, {a, c}, {b, c} and {a, b, c}. It includes the empty set and the whole set, which are the two subsets easiest to leave out."
    },
    {
      "question": "Why does a set with n elements have 2ⁿ subsets?",
      "answer": "To build a subset, decide for each element whether to include it. That is n independent yes-or-no choices, and by the multiplication principle there are 2 × 2 × ⋯ × 2 = 2ⁿ ways to make them, each giving a different subset."
    },
    {
      "question": "What is the power set of the empty set?",
      "answer": "{∅}, a set with one element. The empty set has exactly one subset, itself, so P(∅) = {∅}. This matches the formula: 2⁰ = 1."
    },
    {
      "question": "How many proper subsets does a set with n elements have?",
      "answer": "2ⁿ − 1, because a proper subset is any subset except the set itself. A set with 3 elements has 8 subsets and 7 proper subsets. The empty set counts among them: OpenStax notes that ∅ is a proper subset of every set except itself."
    }
  ],
  "sources": [
    {
      "title": "Cartesian Products and Power Sets (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-cartesian_Products_and_Power_Sets.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Power Set",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/PowerSet.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Binomial Coefficients (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_counting-binom.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "1.2 Subsets (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/1-2-subsets",
      "accessed": "2026-10-24"
    }
  ]
}
---

The power set of a set A, written P(A) or 2^A, is the set of all subsets of A. That is essentially *Applied Discrete Structures*' definition, and it is short enough to hide two things worth noticing: the elements of a power set are themselves sets, and every power set includes both the empty set and A itself.

MathWorld adds the fact this article is about: a set with n elements has a power set with 2ⁿ elements.

## Listing a power set without missing anything

For A = {a, b, c}, organise the subsets by size:

| Size | Subsets | Count |
| ---: | --- | ---: |
| 0 | ∅ | 1 |
| 1 | {a}, {b}, {c} | 3 |
| 2 | {a, b}, {a, c}, {b, c} | 3 |
| 3 | {a, b, c} | 1 |
| | **Total** | **8** |

So P({a, b, c}) = {∅, {a}, {b}, {c}, {a, b}, {a, c}, {b, c}, {a, b, c}}, with 8 = 2³ elements.

Listing by size is the safest hand method, because you can check each row's count independently. The counts 1, 3, 3, 1 are a row of Pascal's triangle, which is not a coincidence.

## Three proofs that |P(A)| = 2ⁿ

Each proof shows a different way of thinking, and each is worth knowing.

**1. The choice argument.** To build a subset of {a₁, …, aₙ}, go through the elements one by one and decide: in or out? Each decision has two options and the decisions are independent, so by the multiplication principle there are 2 × 2 × ⋯ × 2 = 2ⁿ ways to decide. Different decisions give different subsets, and every subset arises from some sequence of decisions. So there are exactly 2ⁿ subsets.

**2. The binary string argument.** Write each subset as an n-bit string, with a 1 in position i if aᵢ is in the subset and 0 if not. For {a, b, c}:

| Subset | String |
| --- | --- |
| ∅ | 000 |
| {c} | 001 |
| {b} | 010 |
| {b, c} | 011 |
| {a} | 100 |
| {a, c} | 101 |
| {a, b} | 110 |
| {a, b, c} | 111 |

This is a one-to-one correspondence between subsets and n-bit strings, and there are 2ⁿ such strings, the numbers from 0 to 2ⁿ − 1 written in binary. It also gives a program a simple way to list every subset: loop a counter from 0 to 2ⁿ − 1 and read its bits as a "bitmask". The [number bases guide](/blog/number-bases-and-binary/) covers binary if it is unfamiliar.

**3. The induction argument.** A set with 0 elements has one subset, ∅, and 2⁰ = 1. Suppose every set with k elements has 2ᵏ subsets, and add a new element x to get a set with k + 1 elements. Each of its subsets either leaves x out, giving one of the 2ᵏ old subsets, or includes x, giving an old subset with x added, another 2ᵏ. Total: 2ᵏ + 2ᵏ = 2ᵏ⁺¹. The [step-by-step induction guide](/blog/proof-by-induction-step-by-step/) explains the format.

## Subsets of a given size

The number of subsets of an n-element set that have exactly k elements is the binomial coefficient C(n, k), read "n choose k". Levin's *Discrete Mathematics: An Open Introduction* introduces binomial coefficients this way, as counts of subsets, and connects them to bit strings with a fixed number of 1s.

Since every subset has some size from 0 to n,

C(n, 0) + C(n, 1) + ⋯ + C(n, n) = 2ⁿ.

For n = 3: 1 + 3 + 3 + 1 = 8. This identity is a row sum of Pascal's triangle, and the [binomial theorem guide](/blog/binomial-theorem-and-pascals-triangle/) proves it a third way, by setting x = y = 1 in (x + y)ⁿ.

## The empty set traps

The empty set is where this topic is easiest to slip.

- **P(∅) = {∅}.** The empty set has one subset, itself. So its power set has one element, matching 2⁰ = 1. It is not empty.
- **P({∅}) = {∅, {∅}}.** The set {∅} has one element (the empty set), so its power set has 2¹ = 2 elements: the empty subset and the whole set.
- **∅ ∈ P(A) and ∅ ⊆ P(A)** are both true, for any A. The first because ∅ is a subset of A; the second because ∅ is a subset of every set.
- **A ∈ P(A)**, but A ⊆ P(A) is usually false. The elements of A are not, in general, subsets of A.

When in doubt, ask whether an expression is an element or a set of elements, and check membership against the definition. The [set operations guide](/blog/set-operations-explained/) covers the ∈ versus ⊆ distinction in more detail.

## Power sets are always bigger

For finite sets, 2ⁿ > n, so a power set always has more elements than the set it came from. Cantor's theorem says the same holds for infinite sets: there is no function from A onto P(A). The proof is a diagonal argument, and it means P(ℕ), the set of all sets of natural numbers, is uncountable, while ℕ is countable. MathWorld states the general version simply: power sets are larger than the sets associated with them. [Countable versus uncountable sets](/blog/countable-vs-uncountable-sets/) explains what "larger" means for infinite sets.

## Subset-counting exercises

1. List P({1, 2}) and P({1, {2}}). How many elements does each have?
2. How many subsets of {1, 2, …, 10} contain the number 1? (Half of them: 2⁹ = 512.)
3. How many subsets of a 6-element set have exactly 2 elements? (C(6, 2) = 15.)
4. Is {∅} ∈ P(P(∅))? (Yes: P(P(∅)) = {∅, {∅}}.)

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a unit on sets, functions and countability, with lessons and knowledge checks. Browse our [education and brain-training apps](/apps/category/education-brain/), or continue through the [discrete math hub](/blog/topics/discrete-math/).
