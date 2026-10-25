---
{
  "title": "Discrete Math Cheat Sheet: The Laws, Formulas and Definitions on One Page",
  "metaTitle": "Discrete Math Cheat Sheet: Laws, Formulas, Definitions",
  "description": "The core of a first discrete math course in one reference: logic laws, proof methods, set identities, counting formulas, number theory and graph facts.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "cheat sheet", "formulas", "exam revision"],
  "primaryKeyword": "discrete math cheat sheet",
  "secondaryKeywords": [
    "discrete math formulas",
    "laws of logic table",
    "counting formulas permutations combinations",
    "discrete math definitions list",
    "graph theory formulas"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "discrete math formula sheet for final exam",
    "list of logical equivalences",
    "set identities list",
    "discrete math quick reference"
  ],
  "aiSearchQuestions": [
    "What formulas do I need for a discrete math exam?",
    "What are the main laws of logic?",
    "What are the key counting formulas in discrete math?",
    "What graph theory facts should I memorise?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "how-to-study-for-a-discrete-math-exam",
    "logical-equivalence-explained",
    "permutations-vs-combinations",
    "graph-theory-basics",
    "modular-arithmetic-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The laws of logic and the set identities are the same laws in two notations; learn one table and translate.",
    "The four basic counting formulas are nᵏ, n!/(n − k)!, C(n, k) and C(n + k − 1, k), chosen by whether order matters and repetition is allowed.",
    "In number theory, congruences survive addition, subtraction and multiplication, but division needs an inverse, which exists only when gcd(a, n) = 1.",
    "Key graph facts: the degree sum is 2E, a tree has n − 1 edges, Euler circuits need all degrees even, and planar graphs satisfy V − E + F = 2.",
    "A cheat sheet is a revision tool: writing it from memory is the studying, and the definitions must be exact."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What should be on a discrete math cheat sheet?",
      "answer": "The laws of logic and quantifier negation, the proof templates, set identities, function and relation definitions, the counting formulas, the main probability rules, congruence rules and theorems in number theory, the method for linear recurrences, and the core graph theory facts. Definitions should be written exactly."
    },
    {
      "question": "Which counting formula should I use?",
      "answer": "Ask two questions: does order matter, and is repetition allowed? Ordered with repetition: nᵏ. Ordered without: n!/(n − k)!. Unordered without: C(n, k). Unordered with repetition: C(n + k − 1, k). Overlapping conditions call for inclusion–exclusion."
    },
    {
      "question": "Are the laws of logic the same as the laws of set theory?",
      "answer": "Yes, in different notation. Union corresponds to or, intersection to and, complement to not, the universal set to true and the empty set to false. So De Morgan's laws, the distributive laws and the absorption laws each have a logic form and a set form."
    }
  ],
  "sources": [
    {
      "title": "The Laws of Logic (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-logic-laws.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Laws of Set Theory (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-laws-of-set-theory.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Combinations and Permutations (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_counting-combperm.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

This page collects the core of a first discrete mathematics course: the laws, formulas and definitions that come up again and again. Use it as a checklist rather than a substitute for understanding. One way to revise with a cheat sheet is to cover it, write your own version from memory, and then compare; the [exam study plan](/blog/how-to-study-for-a-discrete-math-exam/) builds that into a two-week schedule. Each section links to a full guide.

## Logic

**Connectives.** p ∧ q (and), p ∨ q (inclusive or), ¬p (not), p → q (false only when p is true and q false), p ↔ q (true when p and q match).

**Laws** ([proving equivalences](/blog/logical-equivalence-explained/)). The table follows *Applied Discrete Structures*, writing 1 for true and 0 for false.

| Law | Statement |
| --- | --- |
| Commutative, associative | Order and grouping of ∧, ∨ do not matter |
| Distributive | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r); p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) |
| Identity, null | p ∨ 0 ≡ p, p ∧ 1 ≡ p; p ∧ 0 ≡ 0, p ∨ 1 ≡ 1 |
| Negation, idempotent | p ∨ ¬p ≡ 1, p ∧ ¬p ≡ 0; p ∨ p ≡ p ∧ p ≡ p |
| Absorption | p ∨ (p ∧ q) ≡ p; p ∧ (p ∨ q) ≡ p |
| De Morgan | ¬(p ∧ q) ≡ ¬p ∨ ¬q; ¬(p ∨ q) ≡ ¬p ∧ ¬q |
| Conditional | p → q ≡ ¬p ∨ q ≡ ¬q → ¬p; ¬(p → q) ≡ p ∧ ¬q |

**Quantifiers.** ¬∀x P(x) ≡ ∃x ¬P(x); ¬∃x P(x) ≡ ∀x ¬P(x). Flip each quantifier when negating nested statements; never change their order.

**Valid argument forms.** Modus ponens (p → q, p ⊢ q); modus tollens (p → q, ¬q ⊢ ¬p); hypothetical syllogism (p → q, q → r ⊢ p → r); disjunctive syllogism (p ∨ q, ¬p ⊢ q). Invalid look-alikes: affirming the consequent and denying the antecedent.

## Proof methods

| To prove | Method | First line |
| --- | --- | --- |
| p → q | Direct | Assume p |
| p → q | Contrapositive | Assume ¬q; aim for ¬p |
| P | Contradiction | Assume ¬P; aim for any contradiction |
| ∀n ≥ n₀ P(n) | Induction | Base case P(n₀); assume P(k), prove P(k + 1) |
| ∃x P(x) | Construction | Exhibit an x and check it |
| ¬∀x P(x) | Counterexample | Exhibit one x with ¬P(x) |

## Sets

A ∪ B (or), A ∩ B (and), A − B (in A, not B), Aᶜ (not in A, relative to U), A ⊕ B (exactly one). The set laws mirror the logic laws: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ, A − B = A ∩ Bᶜ, and so on; *Applied Discrete Structures* tabulates the set laws in their own section, and each one matches a law in the logic table above. Prove set equality by showing each side is a subset of the other.

|P(A)| = 2ⁿ for |A| = n. |A × B| = |A| · |B|. |A ∪ B| = |A| + |B| − |A ∩ B|.

## Functions and relations

- **Injective:** f(a) = f(b) ⇒ a = b. **Surjective:** every b has some a with f(a) = b. **Bijective:** both; exactly the functions with inverses.
- **Relation properties:** reflexive (aRa), symmetric (aRb ⇒ bRa), antisymmetric (aRb ∧ bRa ⇒ a = b), transitive (aRb ∧ bRc ⇒ aRc).
- **Equivalence relation:** reflexive, symmetric, transitive; its classes partition the set.
- **Partial order:** reflexive, antisymmetric, transitive; drawn as a Hasse diagram.

## Counting

| Selecting k from n | No repetition | Repetition allowed |
| --- | --- | --- |
| Order matters | P(n, k) = n!/(n − k)! | nᵏ |
| Order does not matter | C(n, k) = n!/(k!(n − k)!) | C(n + k − 1, k) |

Levin's *Discrete Mathematics: An Open Introduction* derives the link P(n, k) = C(n, k) · k!. See [permutations versus combinations](/blog/permutations-vs-combinations/).

- **Binomial theorem:** (x + y)ⁿ = Σ C(n, k)xⁿ⁻ᵏyᵏ; Pascal's rule C(n, k) = C(n − 1, k − 1) + C(n − 1, k).
- **Pigeonhole:** N objects in n boxes put at least ⌈N/n⌉ in some box.
- **Inclusion–exclusion (3 sets):** |A ∪ B ∪ C| = Σ|A| − Σ|A ∩ B| + |A ∩ B ∩ C|.
- **Derangements:** Dₙ = n! Σ (−1)ᵏ/k!, about n!/e.
- **Catalan numbers:** Cₙ = C(2n, n)/(n + 1).

## Probability

P(A | B) = P(A ∩ B)/P(B). Independence: P(A ∩ B) = P(A)P(B). Bayes: P(A | B) = P(B | A)P(A)/P(B). Expected value E[X] = Σ x·P(X = x), and E[X + Y] = E[X] + E[Y] always. Binomial: P(X = k) = C(n, k)pᵏ(1 − p)ⁿ⁻ᵏ, mean np, variance np(1 − p).

## Number theory

- **Congruence:** a ≡ b (mod n) ⇔ n ∣ (a − b). Addition, subtraction, multiplication and powers respect it; division needs an inverse ([modular arithmetic](/blog/modular-arithmetic-explained/)).
- **Euclidean algorithm:** gcd(a, b) = gcd(b, a mod b); gcd × lcm = ab.
- **Inverse:** a⁻¹ mod n exists ⇔ gcd(a, n) = 1; find it with the extended Euclidean algorithm.
- **Fermat:** p prime, p ∤ a ⇒ aᵖ⁻¹ ≡ 1 (mod p).
- **Chinese remainder theorem:** pairwise coprime moduli give a unique solution modulo their product.
- **Fundamental theorem of arithmetic:** unique prime factorisation; number of divisors = Π(eᵢ + 1).

## Recurrences

aₙ = c₁aₙ₋₁ + c₂aₙ₋₂: solve r² = c₁r + c₂. Distinct roots: A·r₁ⁿ + B·r₂ⁿ. Repeated root r: (A + Bn)rⁿ. Fit constants to the initial conditions and check one term.

## Graphs

- **Handshake lemma:** Σ deg(v) = 2E; the number of odd-degree vertices is even ([graph basics](/blog/graph-theory-basics/)).
- **Kₙ** has n(n − 1)/2 edges; **Kₘ,ₙ** has mn.
- **Trees:** connected, acyclic, n − 1 edges, a unique path between any two vertices.
- **Euler:** for a connected graph, circuit ⇔ all degrees even; path ⇔ exactly 0 or 2 odd vertices.
- **Hamiltonian:** no simple test; Dirac: every degree ≥ n/2 (n ≥ 3) guarantees a cycle.
- **Bipartite** ⇔ 2-colourable ⇔ no odd cycle.
- **Planar:** V − E + F = 2; E ≤ 3V − 6 (E ≤ 2V − 4 without triangles); K₅ and K₃,₃ are not planar.
- **Colouring:** χ(Kₙ) = n; planar graphs need at most 4 colours.
- **Algorithms:** Kruskal and Prim for minimum spanning trees; Dijkstra for shortest paths with nonnegative weights.

## Practising with it

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) covers the same ground in ten units, from logic and reasoning to graph theory, with topic, timed and adaptive quizzes and full-length practice exams to test whether the sheet is in your head rather than on paper. It is one of our [education apps](/apps/category/education-brain/), and every section above has a full guide in the [discrete math hub](/blog/topics/discrete-math/).
