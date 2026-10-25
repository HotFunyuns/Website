---
{
  "title": "Injective, Surjective and Bijective Functions: How to Tell Them Apart",
  "metaTitle": "Injective, Surjective, Bijective: How to Tell Them Apart",
  "description": "One-to-one, onto, or both? Definitions, worked examples on finite and infinite sets, how to prove each property, and how to count each kind of function.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "functions", "bijections", "proofs"],
  "primaryKeyword": "injective surjective bijective",
  "secondaryKeywords": [
    "one to one and onto functions",
    "how to prove a function is injective",
    "how to prove a function is surjective",
    "bijective function examples",
    "number of injective functions"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "is f(x) = x squared injective",
    "difference between codomain and range",
    "how many onto functions from a set of 4 to a set of 2",
    "why a bijection has an inverse"
  ],
  "aiSearchQuestions": [
    "What is the difference between injective, surjective and bijective functions?",
    "How do you prove that a function is one-to-one?",
    "How do you prove that a function is onto?",
    "How many injective functions are there between two finite sets?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "function-composition-and-inverses",
    "cartesian-product-explained",
    "pigeonhole-principle-examples",
    "countable-vs-uncountable-sets",
    "inclusion-exclusion-principle",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Injective (one-to-one): different inputs always give different outputs; f(a) = f(b) forces a = b.",
    "Surjective (onto): every element of the codomain is the output of at least one input, so the range equals the codomain.",
    "Bijective: both at once, so every element of the codomain is hit exactly once, and the function has an inverse.",
    "Whether a function is injective or surjective depends on its domain and codomain, not just its formula: x² is neither on the real numbers but is a bijection from [0, ∞) to [0, ∞).",
    "Between finite sets, an injection needs |A| ≤ |B|, a surjection needs |A| ≥ |B|, and a bijection needs |A| = |B|."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between injective and surjective?",
      "answer": "Injective means no two inputs share an output. Surjective means no element of the codomain is left without an input. A function can be one, both or neither: f(n) = 2n on the integers is injective but not surjective, since odd numbers are never outputs."
    },
    {
      "question": "How do you prove a function is injective?",
      "answer": "Assume f(a) = f(b) and show that a = b. For f(n) = 3n + 5, 3a + 5 = 3b + 5 gives 3a = 3b and so a = b. To show a function is not injective, find two different inputs with the same output."
    },
    {
      "question": "How do you prove a function is surjective?",
      "answer": "Take an arbitrary element y of the codomain and find an input x with f(x) = y, then check it lies in the domain. For f(x) = 3x + 5 on the real numbers, x = (y − 5)/3 works for every real y. Over the integers it fails, since y = 0 would need x = −5/3."
    },
    {
      "question": "Is f(x) = x² injective?",
      "answer": "Not on the real numbers, because f(−2) = f(2) = 4. It also is not surjective onto the reals, since no x gives −1. Restrict the domain and codomain to [0, ∞) and it becomes a bijection, whose inverse is the square root."
    }
  ],
  "sources": [
    {
      "title": "Functions (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_intro-functions.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Properties of Functions (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-properties-of-functions.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Injection",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Injection.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Surjection",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Surjection.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Bijection",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Bijection.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

A function f: A → B assigns each element of the domain A exactly one element of the codomain B. That rule allows two kinds of untidiness: two inputs can share an output, and some elements of B can be left unused. Injective and surjective are the names for functions that avoid each kind, and a bijective function avoids both.

## The three definitions

| Property | Also called | Definition | Failure looks like |
| --- | --- | --- | --- |
| Injective | One-to-one | f(a) = f(b) implies a = b | Two inputs with the same output |
| Surjective | Onto | For every b ∈ B there is an a ∈ A with f(a) = b | An element of B that is never an output |
| Bijective | One-to-one correspondence | Injective and surjective | Either failure |

The set of outputs actually produced is the **range** (or image). Levin's *Discrete Mathematics: An Open Introduction* describes a surjection as a function where everything in the codomain is in the range. The codomain is part of the function's definition, so the same formula can be onto one codomain and not another.

## Four examples on small sets

Let A = {1, 2, 3} and B = {a, b, c}.

| f(1) | f(2) | f(3) | Injective? | Surjective? |
| --- | --- | --- | --- | --- |
| a | b | c | Yes | Yes: bijective |
| a | a | b | No: 1 and 2 share a | No: c is missed |
| b | c | a | Yes | Yes: bijective |

And with B = {a, b} instead, f(1) = a, f(2) = b, f(3) = a is surjective (both outputs used) but not injective. With three inputs and two outputs, no function can be injective: two inputs must share. That is the [pigeonhole principle](/blog/pigeonhole-principle-examples/) at work.

## Examples on the integers and reals

| Function | Domain → codomain | Injective | Surjective |
| --- | --- | --- | --- |
| f(n) = 2n | ℤ → ℤ | Yes | No: odd numbers are missed |
| g(n) = ⌊n/2⌋ | ℤ → ℤ | No: g(4) = g(5) = 2 | Yes: g(2m) = m |
| h(n) = n + 3 | ℤ → ℤ | Yes | Yes |
| s(x) = x² | ℝ → ℝ | No: s(−2) = s(2) | No: −1 is missed |
| s(x) = x² | [0, ∞) → [0, ∞) | Yes | Yes |
| e(x) = eˣ | ℝ → ℝ | Yes | No: no negative outputs |
| e(x) = eˣ | ℝ → (0, ∞) | Yes | Yes |

The last four rows make the key point: changing the domain or codomain changes the answer. Always state both before classifying a function.

## Proving each property

**Injective.** Assume f(a) = f(b) and derive a = b.

*Example.* f: ℝ → ℝ, f(x) = 3x + 5. If 3a + 5 = 3b + 5, then 3a = 3b, so a = b. Injective.

**Not injective.** Exhibit two different inputs with the same output. One pair is enough.

**Surjective.** Take an arbitrary y in the codomain, solve f(x) = y for x, and check that x lies in the domain.

*Example.* For f(x) = 3x + 5 on ℝ, x = (y − 5)/3 is a real number for every real y, and f(x) = y. Surjective, so bijective.

*Counter-example.* The same formula on ℤ → ℤ is not surjective: y = 0 would need x = −5/3, which is not an integer.

**Not surjective.** Exhibit one element of the codomain that no input reaches, and say why.

These are [direct proofs](/blog/how-to-write-a-direct-proof/) built on the definitions; *Applied Discrete Structures* defines injectivity as a ≠ b ⇒ f(a) ≠ f(b) and notes that the equivalent form f(a) = f(b) ⇒ a = b is often more convenient to prove, because it tells you what to assume and what to reach.

## Counting functions between finite sets

Let |A| = m and |B| = n.

| Kind | How many | Condition |
| --- | --- | --- |
| All functions | nᵐ | none |
| Injections | n(n − 1)⋯(n − m + 1) = n!/(n − m)! | m ≤ n |
| Bijections | n! | m = n |
| Surjections | By inclusion–exclusion | m ≥ n |

For example, from a 3-element set to a 5-element set there are 5³ = 125 functions, of which 5 · 4 · 3 = 60 are injective. Surjections are harder: from a 5-element set onto a 3-element set there are 150, a count worked out in the [inclusion–exclusion guide](/blog/inclusion-exclusion-principle/).

The conditions in the last column are worth remembering on their own. An injection from A to B shows A is no bigger than B; a surjection shows A is no smaller; a bijection shows they are the same size. That idea, comparing sizes by matching elements, is how mathematicians compare infinite sets too, as in [countable versus uncountable sets](/blog/countable-vs-uncountable-sets/).

## Why bijections matter: inverses

A function has an inverse exactly when it is a bijection. Injectivity guarantees each output comes from only one input, so "go back" is well defined; surjectivity guarantees every element of the codomain has somewhere to go back to. MathWorld defines a bijection as a transformation that is both one-to-one and onto, and the [composition and inverses guide](/blog/function-composition-and-inverses/) shows how to find the inverse once you know one exists.

Bijections are also the engine of many counting proofs. To count a set, find a bijection with a set that is easier to count, as with subsets and bit strings.

## A quick test with arrow diagrams

Draw the domain on the left, the codomain on the right, and an arrow for each input.

- Two arrows into the same point on the right: not injective.
- A point on the right with no arrow: not surjective.
- Exactly one arrow into every point on the right: bijective.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a unit on sets, functions and countability, broken into topics and lessons with knowledge checks. It is part of our [education app collection](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) lists the related guides.
