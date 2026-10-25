---
{
  "title": "Conditional Probability and Bayes' Theorem, with a Worked Test Example",
  "metaTitle": "Conditional Probability and Bayes' Theorem, Explained",
  "description": "How conditional probability works, how to reverse it with Bayes' theorem, and why a test that catches 95% of faults can still be wrong most of the time.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "probability", "bayes theorem", "conditional probability"],
  "primaryKeyword": "conditional probability bayes theorem",
  "secondaryKeywords": [
    "bayes theorem example",
    "conditional probability formula",
    "law of total probability",
    "independent events probability",
    "base rate fallacy"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to use bayes theorem step by step",
    "probability of a and b given b",
    "false positive paradox explained",
    "difference between p(a given b) and p(b given a)"
  ],
  "aiSearchQuestions": [
    "What is conditional probability?",
    "How do you use Bayes' theorem?",
    "What is the difference between P(A | B) and P(B | A)?",
    "Why can a positive result from an accurate test still be unlikely to be right?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "monty-hall-problem-explained",
    "expected-value-explained",
    "binomial-distribution-explained",
    "permutations-vs-combinations",
    "birthday-problem-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "P(A | B), the probability of A given B, is P(A and B) divided by P(B): restrict attention to the outcomes where B happened.",
    "Events are independent when P(A | B) = P(A), equivalently P(A and B) = P(A)P(B).",
    "Bayes' theorem reverses a conditional: P(A | B) = P(B | A)P(A)/P(B), with P(B) found by the law of total probability.",
    "When the thing being tested for is rare, most positive results can be false even from an accurate test; this is the base-rate effect.",
    "Converting probabilities to counts out of 10,000 makes Bayes problems easier to set up and check."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is conditional probability?",
      "answer": "The probability of an event given that another event has happened. It is computed by restricting the sample space to the outcomes where the given event occurred: P(A | B) = P(A and B)/P(B). Rolling two dice, the chance of a total of 10 is 3/36, but given the first die shows 5 it is 1/6."
    },
    {
      "question": "What does Bayes' theorem say?",
      "answer": "It turns P(B | A) into P(A | B): P(A | B) = P(B | A) · P(A)/P(B). It is used when you know how likely the evidence is under each explanation and want to know how likely each explanation is given the evidence."
    },
    {
      "question": "Is P(A | B) the same as P(B | A)?",
      "answer": "No, and they can be very different. The probability that a card is a king given it is a face card is 4/12, but the probability that a card is a face card given it is a king is 1. Bayes' theorem is the formula that connects the two."
    },
    {
      "question": "What is the base rate fallacy?",
      "answer": "Ignoring how common something is when interpreting evidence for it. If only 1% of items are faulty, even a test that flags 95% of faulty items and only 2% of good ones produces more false alarms than true ones, because good items vastly outnumber faulty ones."
    }
  ],
  "sources": [
    {
      "title": "7.9 Conditional Probability and the Multiplication Rule (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/7-9-conditional-probability-and-the-multiplication-rule",
      "accessed": "2026-10-24"
    },
    {
      "title": "Bayes' Theorem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/BayesTheorem.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Conditional Probability",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/ConditionalProbability.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Probabilities change when you learn something. Before two dice are rolled, a total of 10 has probability 3/36. Roll the first die and see a 5, and the chance of a 10 becomes 1/6. Conditional probability is the arithmetic of that update, and Bayes' theorem is the tool for running it in reverse. OpenStax's *Contemporary Mathematics* opens its section on the topic with exactly this dice example.

## Conditional probability

The probability of A **given** B is

P(A | B) = P(A and B) / P(B), provided P(B) > 0.

The idea: once B is known to have happened, the outcomes outside B no longer matter. Restrict to the outcomes in B and ask what fraction of them are also in A.

**Dice.** Let A be "the total is 10" and B be "the first die shows 5". P(B) = 6/36. P(A and B) = 1/36, since only (5, 5) works. So P(A | B) = (1/36)/(6/36) = 1/6. If instead the first die shows 3, a total of 10 is impossible: P(A | first die 3) = 0.

**Cards.** Draw one card from a standard deck. The probability it is a king given it is a face card (jack, queen or king) is 4/12 = 1/3. The probability it is a face card given it is a king is 1. The two conditionals are different, so swapping P(A | B) for P(B | A) changes the answer completely.

## The multiplication rule and independence

Rearranging the definition gives the **multiplication rule**:

P(A and B) = P(B) · P(A | B).

**Drawing without replacement.** Two cards from a deck: the probability both are aces is (4/52) · (3/51) = 12/2,652 = 1/221. The second factor is conditional, because one ace is gone.

Events are **independent** when knowing one tells you nothing about the other: P(A | B) = P(A), or equivalently P(A and B) = P(A) · P(B). Two separate dice are independent. Two cards drawn without replacement are not.

## The law of total probability

If B₁, …, Bₖ split the possibilities into cases that cannot overlap, then

P(A) = P(A | B₁)P(B₁) + ⋯ + P(A | Bₖ)P(Bₖ).

In words: work out the chance of A in each case, weight by how likely each case is, and add. This is what makes Bayes' theorem usable.

## Bayes' theorem

MathWorld describes Bayes' theorem as expressing a conditional probability in terms of its reverse and the corresponding marginal probabilities:

**P(A | B) = P(B | A) · P(A) / P(B).**

It follows in one line from the multiplication rule written both ways: P(A and B) = P(A | B)P(B) = P(B | A)P(A).

## A worked test example

A factory makes chips, and **1%** of them are faulty. An automated test flags **95%** of faulty chips. It also wrongly flags **2%** of good chips. A chip is flagged. What is the probability it is actually faulty?

Let F be "faulty" and T be "flagged". We know P(F) = 0.01, P(T | F) = 0.95 and P(T | not F) = 0.02.

**Step 1: total probability of a flag.**

P(T) = 0.95 · 0.01 + 0.02 · 0.99 = 0.0095 + 0.0198 = 0.0293.

**Step 2: Bayes.**

P(F | T) = 0.0095 / 0.0293 ≈ **0.324**.

Only about a third of flagged chips are faulty, even though the test catches 95% of faults.

**The same calculation as counts.** Imagine 10,000 chips.

| | Flagged | Not flagged | Total |
| --- | ---: | ---: | ---: |
| Faulty | 95 | 5 | 100 |
| Good | 198 | 9,702 | 9,900 |
| Total | 293 | 9,707 | 10,000 |

Of the 293 flagged chips, 95 are faulty: 95/293 ≈ 32.4%. The table makes the reason visible. Faulty chips are rare, so the 2% false-alarm rate applied to 9,900 good chips produces more flags than the 95% detection rate applied to 100 faulty ones.

This is the **base-rate effect**: when the thing being looked for is rare, a positive result is weaker evidence than the test's accuracy suggests. The same arithmetic applies to spam filters, fraud alerts and any screening test.

**What a second test does.** If a flagged chip is retested independently and flagged again, run Bayes again with the new prior P(F) = 0.324: P(F | two flags) = (0.95 · 0.324)/(0.95 · 0.324 + 0.02 · 0.676) ≈ 0.958. Independent evidence accumulates: one flag left the chip probably good, two make it probably faulty.

## A checklist for Bayes problems

1. Name the events and write down every probability you are given, as P(something | something).
2. Identify which conditional you want and which one you have; they are usually reversed.
3. Find P(evidence) with the law of total probability.
4. Apply Bayes.
5. Sanity-check with counts out of 10,000.

The [Monty Hall problem](/blog/monty-hall-problem-explained/) is a famous puzzle that this checklist solves cleanly. Conditional probabilities also feed into [expected value](/blog/expected-value-explained/) calculations and into the [binomial distribution](/blog/binomial-distribution-explained/), where independent trials multiply.

Probability is the eighth unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/), and its topic quizzes and review of missed questions can be used to practise problems like these. It sits with our other [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) groups the probability guides together.
