---
{
  "title": "Proof by Contradiction: How It Works and When to Reach for It",
  "metaTitle": "Proof by Contradiction: How It Works, with Examples",
  "description": "Proof by contradiction assumes the statement is false and derives an impossibility. Why it is valid, four worked proofs, and how to write the first line.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "proofs", "proof by contradiction", "number theory"],
  "primaryKeyword": "proof by contradiction",
  "secondaryKeywords": [
    "proof by contradiction examples",
    "square root of 2 is irrational proof",
    "infinitely many primes proof",
    "reductio ad absurdum",
    "how to start a proof by contradiction"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does proof by contradiction work",
    "proof by contradiction vs contrapositive",
    "log base 2 of 3 is irrational proof",
    "what to assume in a proof by contradiction of an if then statement"
  ],
  "aiSearchQuestions": [
    "What is proof by contradiction?",
    "Why is proof by contradiction a valid method?",
    "How do you prove the square root of 2 is irrational?",
    "When should you use proof by contradiction instead of a direct proof?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "how-to-write-a-direct-proof",
    "proof-by-contrapositive-explained",
    "negating-quantified-statements",
    "fundamental-theorem-of-arithmetic",
    "tautology-contradiction-contingency",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "To prove P by contradiction, assume ¬P and derive something impossible; since ¬P leads to a falsehood, P must be true.",
    "The first line is the negation of the statement, so getting the negation right is essential: for 'if p then q' it is 'p and not q'.",
    "Contradiction suits statements that are negative or have no obvious starting point: irrationality, infinitude and impossibility results.",
    "The classic examples are the irrationality of √2 and the proof that there are infinitely many primes.",
    "If your contradiction proof never uses the assumption ¬q, it was really a direct or contrapositive proof and is clearer written that way."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why does proof by contradiction work?",
      "answer": "Every statement is either true or false. If assuming P is false leads, by valid steps, to something that cannot be true, then the assumption cannot hold, so P is true. In logical terms, ¬P → F, where F is a contradiction, is equivalent to P."
    },
    {
      "question": "What do I assume when proving 'if p, then q' by contradiction?",
      "answer": "Assume p is true and q is false, which is the negation of the conditional. Then derive a contradiction. Do not assume 'not p'; that is the hypothesis of the inverse, a different statement."
    },
    {
      "question": "What is the difference between proof by contradiction and proof by contrapositive?",
      "answer": "Contrapositive proves ¬q → ¬p directly, ending at a specific target, ¬p. Contradiction assumes p and ¬q together and may end at any impossibility. Every contrapositive proof can be rewritten as a contradiction proof, but the contrapositive version is usually clearer when it is available."
    },
    {
      "question": "Is proof by contradiction the same as reductio ad absurdum?",
      "answer": "Essentially, yes. Reductio ad absurdum, 'reduction to absurdity', is the traditional name for refuting an assumption by showing it leads to an absurd or contradictory consequence. MathWorld describes it as a method of proof that shows a proposition false by showing it results in a contradiction."
    }
  ],
  "sources": [
    {
      "title": "Proofs: Proof by Contradiction (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_logic-proofs.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Reductio ad Absurdum",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/ReductioadAbsurdum.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "A Review of Methods of Proof: Indirect Proof (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-proof-review.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Some statements give you nothing to start from. "√2 is irrational" has no hypothesis to assume and no equation to manipulate; it says that something does not exist. Proof by contradiction handles statements like that by turning them around: suppose the statement is false, follow the consequences, and show they lead somewhere impossible.

Levin's *Discrete Mathematics: An Open Introduction* gives the reasoning in two sentences. If assuming ¬P leads to a contradiction, the only conclusion is that ¬P is false, so P is true. In other words, if it is impossible for P to be false, P must be true.

## The structure

1. **State the assumption.** "Suppose, for contradiction, that P is false." Write out exactly what ¬P says.
2. **Reason forward** from that assumption, using definitions and known results, as in a [direct proof](/blog/how-to-write-a-direct-proof/).
3. **Reach a contradiction**: a statement and its negation, or something known to be false, such as 1 = 0 or "this fraction is in lowest terms and both parts are even".
4. **Conclude.** "This contradiction shows the assumption was false, so P is true."

The logic underneath is the tautology (¬P → F) ↔ P, where F stands for any contradiction. The traditional name is reductio ad absurdum, reduction to absurdity. MathWorld describes it as showing a proposition false by showing that it results in a contradiction, and quotes G. H. Hardy calling it "one of a mathematician's finest weapons".

## Example 1: √2 is irrational

**Proof.** Suppose, for contradiction, that √2 is rational. Then √2 = a/b for integers a and b with b ≠ 0, and we may take the fraction in lowest terms, so a and b have no common factor other than 1.

Squaring gives 2 = a²/b², so a² = 2b². Hence a² is even, and therefore a is even (an odd number has an odd square). Write a = 2k. Then 4k² = 2b², so b² = 2k², and b² is even, so b is even.

Now a and b are both even, so they share the factor 2, contradicting lowest terms. Therefore √2 is irrational. ∎

Two details make this proof work. Choosing lowest terms at the start is allowed because every fraction can be reduced, and it creates the fact that will be contradicted. And "a² even implies a even" is itself a small theorem, best proved by [contrapositive](/blog/proof-by-contrapositive-explained/): if a is odd, a² is odd.

## Example 2: there are infinitely many primes

Levin's book gives this argument as one of its examples of proof by contradiction.

**Proof.** Suppose, for contradiction, that there are only finitely many primes, p₁, p₂, …, pₙ. Let N = p₁p₂⋯pₙ + 1. N is greater than 1, so it has at least one prime factor q. But q is one of p₁, …, pₙ, so q divides the product p₁p₂⋯pₙ. Since q also divides N, it divides the difference N − p₁⋯pₙ = 1. No prime divides 1. This contradiction shows there are infinitely many primes. ∎

A common misreading is that N itself must be prime. It need not be: 2 · 3 · 5 · 7 · 11 · 13 + 1 = 30,031 = 59 × 509. The proof only needs N to have *some* prime factor missing from the list. The fact that every integer above 1 has a prime factor comes from the [fundamental theorem of arithmetic](/blog/fundamental-theorem-of-arithmetic/).

## Example 3: log₂ 3 is irrational

**Proof.** Suppose, for contradiction, that log₂ 3 = a/b with a and b positive integers (it is positive, since 3 > 1). Then 2^(a/b) = 3, so 2ᵃ = 3ᵇ. The left side is even, because a ≥ 1, and the right side is odd, because it is a product of odd numbers. An integer cannot be both even and odd. Therefore log₂ 3 is irrational. ∎

This one is short because the contradiction, even equals odd, appears after one line of algebra. The √2 proof ends the same way, with a parity clash: both parts of a lowest-terms fraction turn out even.

## Example 4: contradiction for an if-then statement

**Claim.** For integers a and b, if a + b is odd, then a is odd or b is odd.

The negation of "if p then q" is "p and not q" (see [negating quantified statements](/blog/negating-quantified-statements/) for why). So assume a + b is odd **and** a and b are both even. Then a = 2j and b = 2k, so a + b = 2(j + k) is even, contradicting the assumption that it is odd. ∎

The error to watch for is assuming the wrong thing. To prove p → q by contradiction you assume p ∧ ¬q, not ¬p. Assuming ¬p proves nothing about the original claim.

## When to reach for contradiction

| Statement looks like | Good first choice |
| --- | --- |
| "If [concrete hypothesis], then [concrete conclusion]" | Direct proof |
| "If …, then …", where the conclusion is negative or "or" | Contrapositive |
| "X is irrational" / "there is no largest …" / "there are infinitely many …" | Contradiction |
| "X is impossible" / "no solution exists" | Contradiction |
| "Some x has property P" | Construct an example |

Contradiction is powerful but easy to overuse. If your proof assumes p and ¬q, then derives ¬p without ever using ¬q again, you have written a contrapositive proof with extra steps; rewrite it directly. And if it derives q from p without using ¬q at all, it was a direct proof all along. *Applied Discrete Structures* labels its contradiction proofs "indirect", and the cleanest proofs use the indirect step only when it earns its place.

## Statements to prove by contradiction

Prove by contradiction: (1) there is no largest even integer; (2) √3 is irrational; (3) if n² is odd then n is odd; (4) there are no integers x and y with 6x + 9y = 1. For (4), notice that 3 divides the left side. Then decide which of them would read better as a contrapositive proof.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a proof techniques unit with lessons and knowledge checks; it is a study aid and does not grade proofs written in your own words the way an instructor would. It is one of our [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) links the full proof series.
