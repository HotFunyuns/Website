---
{
  "title": "How to Write a Direct Proof: A Template and Five Worked Examples",
  "metaTitle": "How to Write a Direct Proof: Template and Examples",
  "description": "A direct proof assumes the hypothesis and reasons forward to the conclusion. A reusable template, five worked proofs and the mistakes that cost marks.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "proofs", "direct proof", "number theory"],
  "primaryKeyword": "how to write a direct proof",
  "secondaryKeywords": [
    "direct proof examples",
    "direct proof discrete math",
    "proof that the sum of two odd numbers is even",
    "how to start a proof",
    "direct proof template"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "direct proof divisibility example",
    "how to prove a subset with a direct proof",
    "what to write in the first line of a proof",
    "difference between scratch work and a proof"
  ],
  "aiSearchQuestions": [
    "How do you write a direct proof?",
    "What is an example of a direct proof?",
    "How do you start a proof in discrete math?",
    "What are common mistakes in direct proofs?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "proof-by-contrapositive-explained",
    "proof-by-contradiction-explained",
    "predicates-and-quantifiers",
    "set-operations-explained",
    "why-divisibility-rules-work",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "To prove p → q directly, assume p, use definitions and known results to reason forward, and finish at q.",
    "A universal statement starts with an arbitrary element: 'Let n be any integer', not a particular number.",
    "Unpack every definition into an equation you can work with, such as n = 2k + 1 for an odd n.",
    "Use a new letter for each new unknown: the k for one odd number and the j for another are different.",
    "Do your scratch work backwards if it helps, but write the final proof forwards from the hypothesis."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a direct proof?",
      "answer": "A proof of an implication p → q that assumes p is true and reasons step by step, using definitions, axioms and earlier results, until q follows. It does not assume anything about q and does not argue by contradiction."
    },
    {
      "question": "How do I start a direct proof?",
      "answer": "Name the objects and state the hypothesis. For 'if n is odd, then n² is odd', write 'Let n be an odd integer. Then n = 2k + 1 for some integer k.' The second sentence unpacks the definition, which is almost always the next step."
    },
    {
      "question": "Why can't I prove something by checking examples?",
      "answer": "Because a universal statement claims something about every case, and examples cover only some. The polynomial n² − n + 41 gives a prime for n = 1 to 40 and a composite number, 41², at n = 41. Examples are for forming a conjecture; the proof must handle an arbitrary case."
    },
    {
      "question": "When should I use a different proof method?",
      "answer": "When the hypothesis gives you little to work with but the negation of the conclusion gives a lot. 'If n² is even, then n is even' is awkward directly and easy by contrapositive. Statements that something is irrational, or that there is no largest prime, are classic candidates for contradiction."
    }
  ],
  "sources": [
    {
      "title": "Proofs: Direct Proof (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_logic-proofs.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Book of Proof, 3rd edition (Richard Hammack)",
      "publisher": "Richard Hammack (open textbook)",
      "url": "https://richardhammack.github.io/BookOfProof/",
      "accessed": "2026-10-24"
    },
    {
      "title": "A Review of Methods of Proof (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-proof-review.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

A direct proof is the most natural kind of argument: start from what you are given and reason forward until you reach what you want. Levin's *Discrete Mathematics: An Open Introduction* calls it the simplest style of proof from a logical point of view, and sums up its format in one line: assume P, explain, explain, explain, therefore Q.

The difficulty is rarely the logic. It is knowing what to write in the "explain" lines. This guide gives a template that handles most first-course proofs and five worked examples of increasing difficulty.

## The template

For a statement of the form "for every x, if P(x) then Q(x)":

1. **Introduce an arbitrary object.** "Let n be an integer." Arbitrary means you assume nothing about n except what the statement allows.
2. **Assume the hypothesis.** "Suppose n is odd."
3. **Unpack the definition.** "Then n = 2k + 1 for some integer k."
4. **Manipulate** using algebra and results you already know.
5. **Repack into the conclusion's definition.** "So n² = 2m + 1 where m is an integer."
6. **State the conclusion.** "Therefore n² is odd."

Steps 3 and 5 do most of the work, which is why definitions matter so much. You cannot prove something is even without knowing that "even" means "equal to 2 times an integer".

| Term | Definition to unpack |
| --- | --- |
| n is even | n = 2k for some integer k |
| n is odd | n = 2k + 1 for some integer k |
| a divides b (a ∣ b) | b = ak for some integer k |
| A ⊆ B | every element of A is an element of B |
| x is rational | x = p/q for integers p, q with q ≠ 0 |

## Example 1: the sum of two odd integers is even

**Proof.** Let m and n be odd integers. Then m = 2a + 1 and n = 2b + 1 for some integers a and b. So m + n = 2a + 2b + 2 = 2(a + b + 1). Since a + b + 1 is an integer, m + n is even. ∎

Note the two different letters, a and b. Writing m = 2k + 1 and n = 2k + 1 would silently assume m = n, and the proof would cover only that special case.

## Example 2: divisibility of a sum

**Claim.** For integers a, b and c, if a ∣ b and a ∣ c, then a ∣ (b + c).

**Proof.** Suppose a ∣ b and a ∣ c. Then b = aj and c = ak for some integers j and k. So b + c = aj + ak = a(j + k). Since j + k is an integer, a ∣ (b + c). ∎

This one fact explains why many [divisibility rules](/blog/why-divisibility-rules-work/) work: split a number into parts each divisible by the divisor, and the whole is divisible too.

## Example 3: using an earlier result

**Claim.** If n is odd, then n² − 1 is divisible by 8.

**Scratch work.** Try n = 3, 5, 7: 8, 24, 48. All multiples of 8. Promising.

**Proof.** Let n be odd, so n = 2k + 1 for some integer k. Then n² − 1 = 4k² + 4k = 4k(k + 1). The integers k and k + 1 are consecutive, so one of them is even, and therefore k(k + 1) = 2m for some integer m. Hence n² − 1 = 4 · 2m = 8m, which is divisible by 8. ∎

The step "one of two consecutive integers is even" is a separate small fact; in a written proof you either cite it or prove it in a line, by cases on whether k is even or odd.

## Example 4: a set inclusion

**Claim.** If A ⊆ B and B ⊆ C, then A ⊆ C.

**Proof.** Suppose A ⊆ B and B ⊆ C. Let x be any element of A. Since A ⊆ B, x ∈ B. Since B ⊆ C, x ∈ C. So every element of A is in C, which means A ⊆ C. ∎

This "element-chasing" pattern is how almost every set identity is proved: take an arbitrary element of one side and show it belongs to the other. The [set operations guide](/blog/set-operations-explained/) uses it for unions and intersections.

## Example 5: an inequality

**Claim.** For every real number x > 0, x + 1/x ≥ 2.

**Scratch work, backwards.** x + 1/x ≥ 2 ⇔ x² + 1 ≥ 2x (multiplying by x > 0) ⇔ x² − 2x + 1 ≥ 0 ⇔ (x − 1)² ≥ 0, which is always true.

**Proof, forwards.** Let x > 0. Since a square is never negative, (x − 1)² ≥ 0, so x² − 2x + 1 ≥ 0 and x² + 1 ≥ 2x. Dividing by the positive number x gives x + 1/x ≥ 2. ∎

The scratch work starts from the conclusion, which is fine for finding the idea but is not a proof: it assumes what it wants to show. The written proof starts from something known to be true and moves forward. Every step must be reversible or forward-pointing, and here dividing by x is legitimate because x > 0.

## Mistakes that cost marks

1. **Proving by example.** Checking n = 3, 5 and 7 is evidence, not proof. Levin's book gives the classic warning: n² − n + 41 produces only primes for the first values of n you try (in fact for every n from 1 to 40), yet n = 41 gives 41² = 1681.
2. **Reusing a letter.** Two odd numbers need two different integers in their definitions.
3. **Assuming the conclusion.** Starting from "n² is odd" to prove "n² is odd" is circular.
4. **Skipping the definition.** "n is odd, so n² is odd" restates the claim. Unpack, compute, repack.
5. **Losing the quantifier.** "Let n = 5" proves something about 5 only. Use an arbitrary n; the [predicates and quantifiers guide](/blog/predicates-and-quantifiers/) explains why that justifies a "for all" conclusion.

## When to choose another method

A direct proof works best when the hypothesis gives you something concrete to compute with. When it does not, two indirect methods help. [Proof by contrapositive](/blog/proof-by-contrapositive-explained/) proves ¬q → ¬p instead, which is often easier when the conclusion is a negative statement or when knowing about n² gives you little about n. [Proof by contradiction](/blog/proof-by-contradiction-explained/) assumes the whole statement fails and derives an impossibility, the usual route for irrationality and "there is no largest" results. Richard Hammack's free *Book of Proof*, approved by the American Institute of Mathematics' Open Textbook Initiative, gives each method its own chapter and is a good source of further exercises.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a proof techniques unit, broken into topics and lessons with knowledge checks; it is listed with our other [education apps](/apps/category/education-brain/). The [discrete math hub](/blog/topics/discrete-math/) has the other proof guides.
