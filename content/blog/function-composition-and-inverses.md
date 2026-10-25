---
{
  "title": "Composition and Inverse Functions: When an Inverse Exists and How to Find It",
  "metaTitle": "Function Composition and Inverses in Discrete Math",
  "description": "How to compose functions, why order matters, when a function has an inverse, and how to find and check one, with examples on finite sets and the integers.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "functions", "inverse functions", "composition"],
  "primaryKeyword": "inverse function discrete math",
  "secondaryKeywords": [
    "function composition discrete math",
    "when does a function have an inverse",
    "composition of functions is associative",
    "inverse of a composition",
    "identity function"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "is g of f the same as f of g",
    "how to find the inverse of a function on a finite set",
    "inverse of g composed with f",
    "composition of injections is an injection proof"
  ],
  "aiSearchQuestions": [
    "How do you compose two functions?",
    "When does a function have an inverse?",
    "Is function composition commutative?",
    "What is the inverse of a composition of functions?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "injective-surjective-bijective",
    "cartesian-product-explained",
    "modular-inverse-explained",
    "properties-of-relations",
    "how-to-write-a-direct-proof",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "(g ∘ f)(x) = g(f(x)): apply f first, then g, and the composition is only defined when f's outputs lie in g's domain.",
    "Composition is associative but not commutative: h ∘ (g ∘ f) = (h ∘ g) ∘ f, while g ∘ f and f ∘ g usually differ.",
    "A function has an inverse exactly when it is a bijection, and the inverse undoes it: f⁻¹(f(x)) = x and f(f⁻¹(y)) = y.",
    "To find an inverse, solve y = f(x) for x, then check both compositions give the identity.",
    "The inverse of a composition reverses the order: (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does g ∘ f mean?",
      "answer": "The composition 'g after f': (g ∘ f)(x) = g(f(x)). You apply f to x first, then apply g to the result. It requires every output of f to be a valid input of g."
    },
    {
      "question": "Is function composition commutative?",
      "answer": "No. With f(x) = x + 1 and g(x) = 2x, g(f(x)) = 2x + 2 but f(g(x)) = 2x + 1. Composition is associative, though, so a chain of three or more functions can be grouped either way without changing the result."
    },
    {
      "question": "When does a function have an inverse?",
      "answer": "When it is a bijection: one-to-one, so each output comes from a single input, and onto, so every element of the codomain has an input to return to. If either property fails, there is no function that undoes it on the whole codomain."
    },
    {
      "question": "What is the inverse of g ∘ f?",
      "answer": "f⁻¹ ∘ g⁻¹, provided f and g are both bijections. Undoing 'f then g' means undoing g first and then f, in the same way that taking off shoes and socks reverses the order you put them on."
    }
  ],
  "sources": [
    {
      "title": "Function Composition (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-function-composition.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Functions (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_intro-functions.html",
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

Functions become much more useful once you can chain them together and, sometimes, run them backwards. Composition is the chaining; the inverse is the running backwards. Both are short definitions with a few traps, mostly to do with order.

## Composition: one function after another

Given f: A → B and g: B → C, the composition g ∘ f: A → C is defined by

(g ∘ f)(x) = g(f(x)).

Read it "g after f" or "g of f of x". The function written on the right acts first. *Applied Discrete Structures* defines it with exactly these domains and codomains: the outputs of f must land in the set where g is defined, or the composition does not exist.

**Example on a finite set.** Let A = {1, 2, 3}, with f(1) = 2, f(2) = 3, f(3) = 3 and g(1) = 1, g(2) = 1, g(3) = 2.

| x | f(x) | g(f(x)) | g(x) | f(g(x)) |
| --- | --- | --- | --- | --- |
| 1 | 2 | 1 | 1 | 2 |
| 2 | 3 | 2 | 1 | 2 |
| 3 | 3 | 2 | 2 | 3 |

Compare the third and fifth columns: g ∘ f and f ∘ g are different functions.

**Example on the integers.** With f(n) = n + 1 and g(n) = 2n:

- (g ∘ f)(n) = g(n + 1) = 2n + 2
- (f ∘ g)(n) = f(2n) = 2n + 1

Composition is **not commutative**. Order matters, and swapping it changes the answer.

## What composition does preserve

Composition **is associative**: for any f, g and h with compatible domains, h ∘ (g ∘ f) = (h ∘ g) ∘ f, because both sides send x to h(g(f(x))). So a chain like h ∘ g ∘ f needs no brackets.

*Applied Discrete Structures* states two more facts, leaving their proofs as exercises; both are worth being able to reproduce:

- **The composition of injections is an injection.** If g(f(a)) = g(f(b)), then f(a) = f(b) because g is one-to-one, and a = b because f is one-to-one.
- **The composition of surjections is a surjection.** For any c ∈ C, pick b with g(b) = c, then a with f(a) = b; then g(f(a)) = c.

Together these show the composition of two bijections is a bijection. The definitions behind them are in [injective, surjective and bijective functions](/blog/injective-surjective-bijective/).

## The identity function

For any set A, the identity function i_A(x) = x leaves everything where it is. It plays the role in composition that 1 plays in multiplication: f ∘ i_A = f and i_B ∘ f = f for any f: A → B.

## Inverses: running a function backwards

A function g: B → A is the **inverse** of f: A → B if

g(f(x)) = x for every x ∈ A, and f(g(y)) = y for every y ∈ B.

In other words, g ∘ f = i_A and f ∘ g = i_B. The inverse is written f⁻¹. Note that f⁻¹ means the inverse function, not 1/f.

**When does an inverse exist?** Exactly when f is a bijection.

- If f were not injective, two inputs a ≠ b would share an output y, and f⁻¹(y) would have to equal both.
- If f were not surjective, some y would have no input, and f⁻¹(y) would have nothing to be.

MathWorld defines a bijection as a transformation that is both one-to-one and onto, which is precisely the condition for "undo" to be a function.

## Finding an inverse

**On a finite set,** reverse every arrow. *Applied Discrete Structures* uses this example: on A = {1, 2, 3}, f(1) = 2, f(2) = 3, f(3) = 1. Reversing the arrows gives f⁻¹(2) = 1, f⁻¹(3) = 2, f⁻¹(1) = 3.

**With a formula,** write y = f(x) and solve for x.

*Example.* f: ℝ → ℝ, f(x) = 5x − 3. From y = 5x − 3, x = (y + 3)/5, so f⁻¹(y) = (y + 3)/5. Check both directions:

- f⁻¹(f(x)) = ((5x − 3) + 3)/5 = x
- f(f⁻¹(y)) = 5 · (y + 3)/5 − 3 = y

The check matters because solving for x can hide a domain problem. The same formula on the integers, f: ℤ → ℤ, is injective but not surjective (y = 0 would need x = 3/5), so it has no inverse there.

**Restricting the domain.** g(x) = x² is not a bijection on ℝ, but restricted to [0, ∞) → [0, ∞) it is, with inverse √y. Likewise eˣ: ℝ → (0, ∞) has inverse ln y.

**Inverses in modular arithmetic.** On the remainders {0, 1, …, 6} under multiplication mod 7, the function x ↦ 3x is a bijection, and its inverse is x ↦ 5x, because 3 · 5 = 15 ≡ 1. Finding such inverses systematically is the subject of [modular inverses](/blog/modular-inverse-explained/).

## The inverse of a composition

If f and g are both bijections, then

(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.

To undo "f, then g", undo g first, then undo f. The familiar analogy is getting dressed: socks then shoes, so to undress, shoes then socks. A one-line check: (f⁻¹ ∘ g⁻¹) ∘ (g ∘ f) = f⁻¹ ∘ (g⁻¹ ∘ g) ∘ f = f⁻¹ ∘ f = i, using associativity.

## Four errors with composition and inverses

1. **Applying the left function first.** In g ∘ f, f acts first.
2. **Assuming every function has an inverse.** Check it is a bijection between the stated domain and codomain.
3. **Checking only one composition.** On infinite sets especially, g ∘ f = i alone does not make g the inverse; you need f ∘ g = i as well.
4. **Writing (g ∘ f)⁻¹ = g⁻¹ ∘ f⁻¹.** The order reverses.

Levin's *Discrete Mathematics: An Open Introduction* is a good companion for the underlying definitions of domain, codomain and range. Functions belong to the sets, functions and countability unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), whose lessons include knowledge checks; it is listed with our [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) links the neighbouring topics.
