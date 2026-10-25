---
{
  "title": "Set Operations Explained: Union, Intersection, Difference and Complement",
  "metaTitle": "Set Operations: Union, Intersection, Difference, Complement",
  "description": "Union, intersection, difference, complement and symmetric difference, each defined with a Venn picture and a worked example, plus how to prove set identities.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "set theory", "venn diagrams", "sets"],
  "primaryKeyword": "set operations",
  "secondaryKeywords": [
    "union and intersection of sets",
    "set difference",
    "complement of a set",
    "symmetric difference",
    "set identities proof"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what is a minus b in sets",
    "how to prove a set identity by element chasing",
    "difference between element of and subset of",
    "number of elements in a union of two sets"
  ],
  "aiSearchQuestions": [
    "What are the basic set operations?",
    "What is the difference between union and intersection?",
    "How do you prove two sets are equal?",
    "What is the symmetric difference of two sets?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "de-morgans-laws-explained",
    "inclusion-exclusion-principle",
    "power-set-explained",
    "cartesian-product-explained",
    "how-to-write-a-direct-proof",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A ∪ B contains everything in A or B; A ∩ B contains what is in both; A − B contains what is in A but not B; the complement Aᶜ contains everything in the universal set that is not in A.",
    "Union behaves like logical or, intersection like and, and complement like not, which is why the set laws mirror the laws of logic.",
    "To prove two sets are equal, show each is a subset of the other by taking an arbitrary element of one and showing it lies in the other.",
    "For finite sets, |A ∪ B| = |A| + |B| − |A ∩ B|, the simplest case of inclusion–exclusion.",
    "Keep ∈ and ⊆ apart: an element belongs to a set; a set is a subset of another set."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between union and intersection?",
      "answer": "The union A ∪ B contains every element that is in A, in B or in both. The intersection A ∩ B contains only the elements in both. For A = {1, 2, 3} and B = {3, 4}, the union is {1, 2, 3, 4} and the intersection is {3}."
    },
    {
      "question": "What does A − B mean for sets?",
      "answer": "The set difference, the elements of A that are not in B. It is also written A \\ B and called the complement of B relative to A. Order matters: {1, 2, 3} − {3, 4} = {1, 2}, while {3, 4} − {1, 2, 3} = {4}."
    },
    {
      "question": "How do you prove two sets are equal?",
      "answer": "Show that each is a subset of the other. Take an arbitrary element of the first set and use the definitions to show it belongs to the second, then do the reverse. For many identities the two directions can be written as one chain of if-and-only-if steps."
    },
    {
      "question": "What is the symmetric difference of two sets?",
      "answer": "The elements in exactly one of the two sets: A ⊕ B = (A ∪ B) − (A ∩ B). For A = {1, 3, 8} and B = {2, 4, 8}, it is {1, 2, 3, 4}. It corresponds to exclusive or in logic."
    }
  ],
  "sources": [
    {
      "title": "Basic Set Operations (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-basic_Set_Operations.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "1.4 Set Operations with Two Sets (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/1-4-set-operations-with-two-sets",
      "accessed": "2026-10-24"
    },
    {
      "title": "Sets (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_intro-sets.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Sets are collections of distinct objects, and the operations on them are how discrete mathematics combines, compares and filters collections. They are also the vocabulary for everything that follows: functions and relations are defined as sets, probability events are sets, and graphs are pairs of sets.

## The five operations

Throughout, let the universal set be U = {1, 2, …, 10}, with A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}.

| Operation | Notation | Definition | Example |
| --- | --- | --- | --- |
| Union | A ∪ B | x is in A or in B (or both) | {1, 2, 3, 4, 5, 6, 7} |
| Intersection | A ∩ B | x is in A and in B | {4, 5} |
| Difference | A − B | x is in A and not in B | {1, 2, 3} |
| Complement | Aᶜ | x is in U and not in A | {6, 7, 8, 9, 10} |
| Symmetric difference | A ⊕ B | x is in exactly one of A and B | {1, 2, 3, 6, 7} |

A few notes on the table:

- **Union is inclusive.** OpenStax's *Contemporary Mathematics* makes the logical link explicit: intersection is a logical "and", and union an "or" in the inclusive sense.
- **Difference is not symmetric.** B − A = {6, 7}, not {1, 2, 3}. *Applied Discrete Structures* calls B − A the complement of A relative to B; some books write A \ B.
- **The complement depends on U.** With U = {1, …, 10}, Aᶜ has five elements. With U the set of all positive integers, it is infinite. Always know your universal set.
- **Symmetric difference** can be written (A ∪ B) − (A ∩ B), or (A − B) ∪ (B − A). It is the set version of exclusive or.

Two sets with no elements in common, A ∩ B = ∅, are called **disjoint**.

## Picturing them with Venn diagrams

Draw two overlapping circles inside a rectangle for U. The overlap is A ∩ B. Both circles together are A ∪ B. The part of circle A outside the overlap is A − B. Everything outside circle A is Aᶜ. The two crescent-shaped regions, without the overlap, are A ⊕ B.

Venn diagrams are good for building intuition and checking an identity on paper. A drawing, though, shows one arrangement of the sets, while the element-by-element argument below covers every arrangement, so treat the picture as a check and the argument as the proof.

## Logic in disguise

Each operation is defined by a logical connective, so every law of logic has a set counterpart.

| Set law | Logic law it comes from |
| --- | --- |
| A ∪ B = B ∪ A | p ∨ q ≡ q ∨ p |
| A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) |
| (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ | ¬(p ∨ q) ≡ ¬p ∧ ¬q |
| A − B = A ∩ Bᶜ | p ∧ ¬q |
| (Aᶜ)ᶜ = A | ¬¬p ≡ p |

The third row is one of [De Morgan's laws](/blog/de-morgans-laws-explained/), and it is used in the proof below.

## Proving a set identity

The standard method: two sets are equal when each is a subset of the other, so take an arbitrary element of one side and show it is in the other, then reverse.

**Claim.** A − (B ∪ C) = (A − B) ∩ (A − C).

**Proof.** Let x be any element.

x ∈ A − (B ∪ C)
⇔ x ∈ A and x ∉ B ∪ C
⇔ x ∈ A and x ∉ B and x ∉ C (by De Morgan's law)
⇔ (x ∈ A and x ∉ B) and (x ∈ A and x ∉ C)
⇔ x ∈ A − B and x ∈ A − C
⇔ x ∈ (A − B) ∩ (A − C).

Every step is an equivalence, so the two sets have exactly the same elements. ∎

When a step only works one way, split the proof into the two subset directions. This "element chasing" is the same technique as Example 4 in our [direct proof guide](/blog/how-to-write-a-direct-proof/).

## Counting elements

For finite sets, write |A| for the number of elements. Adding |A| and |B| counts the overlap twice, so

|A ∪ B| = |A| + |B| − |A ∩ B|.

In the example above, 5 + 4 − 2 = 7, which matches the seven elements of A ∪ B. OpenStax gives the same formula for the cardinality of a union, and it is the two-set case of the [inclusion–exclusion principle](/blog/inclusion-exclusion-principle/), which extends it to three or more sets.

## Five slips with sets and how to avoid them

1. **Confusing ∈ with ⊆.** 3 ∈ {1, 2, 3}, but {3} ⊆ {1, 2, 3}. The number 3 is not a subset, and the set {3} is not an element.
2. **Treating ∅ and {∅} as the same.** ∅ has no elements; {∅} has one element, which happens to be the empty set. This matters for [power sets](/blog/power-set-explained/).
3. **Forgetting order in differences.** A − B and B − A are usually different.
4. **Listing repeats.** {1, 1, 2} is the same set as {1, 2}; sets ignore repetition and order. Ordered pairs, used in [Cartesian products](/blog/cartesian-product-explained/), do not.
5. **Leaving the universal set unstated** when taking complements.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a unit on sets, functions and countability, with lessons and knowledge checks. See our [education apps](/apps/category/education-brain/) for more, or the [discrete math hub](/blog/topics/discrete-math/) for the next topics in order.
