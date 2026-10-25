---
{
  "title": "Countable vs Uncountable Sets: Cantor's Diagonal Argument in Plain Steps",
  "metaTitle": "Countable vs Uncountable Sets and Cantor's Diagonal",
  "description": "Why the integers and rationals are countable but the reals are not: listing arguments, Cantor's diagonal proof step by step, and what it means for computing.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "set theory", "infinity", "cantor"],
  "primaryKeyword": "countable vs uncountable sets",
  "secondaryKeywords": [
    "cantor diagonal argument",
    "are the rational numbers countable",
    "real numbers are uncountable proof",
    "countably infinite set examples",
    "cardinality of infinite sets"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why are the integers countable",
    "how to show a set is countable",
    "is the set of all finite strings countable",
    "why are there more real numbers than integers"
  ],
  "aiSearchQuestions": [
    "What is the difference between countable and uncountable sets?",
    "How does Cantor's diagonal argument work?",
    "Why are the rational numbers countable?",
    "Are there more real numbers than integers?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "injective-surjective-bijective",
    "power-set-explained",
    "proof-by-contradiction-explained",
    "cartesian-product-explained",
    "finite-state-machines-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A set is countable if it is finite or can be put in one-to-one correspondence with the positive integers, that is, listed as a first, second, third element and so on.",
    "The integers, the even numbers, pairs of positive integers and the rational numbers are all countably infinite, despite looking larger than the natural numbers.",
    "The real numbers are uncountable: Cantor's diagonal argument shows any list of reals misses at least one.",
    "The same diagonal idea shows the power set of any set is strictly larger than the set itself.",
    "There are only countably many computer programs, so there are functions no program can compute."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does it mean for a set to be countable?",
      "answer": "Its elements can be listed in a sequence, first, second, third and so on, so that every element appears at some finite position. Formally, the set is finite or there is a bijection between it and the positive integers. Countable infinite sets are also called denumerable."
    },
    {
      "question": "Why are the rational numbers countable?",
      "answer": "Arrange the positive fractions in a grid by numerator and denominator, then walk through the grid along its diagonals, skipping fractions not in lowest terms. Every fraction is reached after finitely many steps. Interleaving negatives and zero then lists all the rationals."
    },
    {
      "question": "How does Cantor's diagonal argument work?",
      "answer": "Suppose someone lists all real numbers between 0 and 1. Build a new number whose nth decimal digit differs from the nth digit of the nth listed number. It differs from every listed number in at least one place, so it is not on the list, which contradicts the claim that the list was complete."
    },
    {
      "question": "Are there different sizes of infinity?",
      "answer": "Yes. Two sets have the same size when there is a bijection between them. The natural numbers and the rationals have the same size, but the reals are strictly larger, and the power set of the reals is larger still. Cantor's theorem gives an endless sequence of ever larger infinities."
    }
  ],
  "sources": [
    {
      "title": "Properties of Functions: Cardinality and Countable Sets (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-properties-of-functions.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Cantor Diagonal Method",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/CantorDiagonalMethod.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Countable Set",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/CountableSet.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

How do you compare the sizes of two infinite sets? Counting fails, because neither count ever ends. Georg Cantor's answer was to compare by matching: two sets are the same size if their elements can be paired off one-to-one, with nothing left over on either side. That single idea leads to some genuinely surprising results, including the fact that some infinite sets are larger than others.

## Same size means a bijection

Two sets have the **same cardinality** when there is a bijection between them, a pairing that is [one-to-one and onto](/blog/injective-surjective-bijective/).

*Applied Discrete Structures* defines a **countable** set as one that is finite or has the same cardinality as the positive integers. MathWorld uses the same split: countable means finite or denumerable. A countably infinite set is one whose elements can be listed as a first, second, third, … with every element appearing at some finite position and none repeated.

A set that is infinite but not countable is **uncountable**.

## Surprising countable sets

Infinite sets that look bigger than the positive integers need not be.

**The even numbers.** Pair n with 2n: 1 ↔ 2, 2 ↔ 4, 3 ↔ 6, … Every positive integer gets exactly one even partner and vice versa. A set can have the same size as a proper subset of itself; that is one way to define being infinite.

**All the integers.** List them as 0, 1, −1, 2, −2, 3, −3, … Every integer appears, at a finite position. As a formula, the nth term is n/2 when n is even and −(n − 1)/2 when n is odd, starting from n = 1 giving 0.

**Pairs of positive integers.** Arrange ℙ × ℙ, the [Cartesian product](/blog/cartesian-product-explained/) of the positive integers with itself, as a grid, then walk it along diagonals: (1,1); (1,2), (2,1); (1,3), (2,2), (3,1); … Each diagonal is finite, so every pair is reached. *Applied Discrete Structures* uses exactly this example of a "seemingly larger" countable set.

**The rational numbers.** A positive fraction p/q is a pair (p, q), so the diagonal walk lists every positive rational too, skipping repeats such as 2/4. *Applied Discrete Structures* reproduces Cantor's listing, 0, 1, 1/2, 2, 3, 1/3, 1/4, 2/3, 3/2, 4, …, and then interleaves the negatives. So the rationals, which sit densely between any two reals, are no more numerous than the positive integers.

**All finite strings over a finite alphabet.** List them by length, then alphabetically within each length. Every string has some finite length, so it appears. In particular, the set of all computer programs, which are finite strings, is countable.

## Cantor's diagonal argument: the reals are uncountable

Here is the proof that no list can contain every real number between 0 and 1. It is a [proof by contradiction](/blog/proof-by-contradiction-explained/).

**Step 1: assume a complete list exists.** Suppose r₁, r₂, r₃, … lists every real number in (0, 1), each written as an infinite decimal:

| | Decimal expansion |
| --- | --- |
| r₁ | 0.**5**172… |
| r₂ | 0.3**3**41… |
| r₃ | 0.90**8**6… |
| r₄ | 0.141**4**… |

**Step 2: build a new number from the diagonal.** Look at the bold digits, the nth digit of rₙ. Construct x = 0.d₁d₂d₃… by choosing each dₙ to differ from that diagonal digit. A simple rule: dₙ = 4 if the diagonal digit is 5, and dₙ = 5 otherwise. Here the diagonal digits are 5, 3, 8, 4, so x = 0.4555…

**Step 3: x is not on the list.** It differs from r₁ in the first decimal place, from r₂ in the second, and from every rₙ in the nth place. So x ≠ rₙ for every n.

**Step 4: contradiction.** The list was supposed to contain every real in (0, 1), but x is a real in (0, 1) that it misses. So no such list exists, and the reals are uncountable. ∎

The rule uses only the digits 4 and 5 for a reason. Some numbers have two decimal expansions, such as 0.1999… = 0.2000…, and a constructed x ending in repeated 0s or 9s could secretly equal a listed number. Avoiding 0 and 9 rules that out.

MathWorld calls this the Cantor diagonal method and stresses that it is completely general.

## The general version: power sets are bigger

The diagonal idea shows that for any set A, there is no bijection between A and its [power set](/blog/power-set-explained/) P(A). Given any function f from A to P(A), consider D = {a ∈ A : a ∉ f(a)}. If D were f(d) for some d, then d ∈ D exactly when d ∉ D, which is impossible. So D is missed, and f is not onto.

Consequences:

- P(ℕ), the set of all sets of natural numbers, is uncountable.
- There is no largest infinity: P(A) is always larger than A, and P(P(A)) larger still.

## Why computer scientists care

There are countably many programs, since each is a finite string. But there are uncountably many functions from the natural numbers to {0, 1}, because such functions correspond to subsets of ℕ. So there are functions from ℕ to {0, 1} that no program computes: countably many programs cannot cover uncountably many functions. The diagonal construction is the reason, and the same style of argument reappears in computability theory. The [finite state machines guide](/blog/finite-state-machines-explained/) introduces the simplest model of computation where these questions start.

## How to show a set is countable

1. Describe a list that reaches every element at a finite position, or
2. Give an injection from the set into ℕ (or a bijection with a set already known to be countable).

To show a set is uncountable, either run a diagonal argument or find a bijection or injection from a known uncountable set into it.

Countability has a place in the unit title itself: sets, functions and countability is the fourth unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). Browse our [education apps](/apps/category/education-brain/), or go back to the start of the series in the [discrete math hub](/blog/topics/discrete-math/).
