---
{
  "title": "The Birthday Problem: Why 23 People Are Enough",
  "metaTitle": "The Birthday Problem: Why 23 People Are Enough",
  "description": "In a group of 23, the chance that two share a birthday is just over 50%. The calculation, a probability table, why intuition misses it, and hash collisions.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "probability", "birthday problem", "hashing"],
  "primaryKeyword": "birthday problem",
  "secondaryKeywords": [
    "birthday paradox",
    "probability two people share a birthday",
    "birthday problem formula",
    "birthday attack hash collisions",
    "how many people for 50 percent shared birthday"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why 23 people for a shared birthday",
    "probability of a shared birthday in a class of 30",
    "how many people to share my birthday",
    "birthday problem approximation e"
  ],
  "aiSearchQuestions": [
    "What is the birthday problem?",
    "Why do only 23 people give a 50% chance of a shared birthday?",
    "How do you calculate the probability of a shared birthday?",
    "What does the birthday problem have to do with hash collisions?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "pigeonhole-principle-examples",
    "conditional-probability-and-bayes",
    "expected-value-explained",
    "permutations-vs-combinations",
    "modular-arithmetic-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "With 23 people and 365 equally likely birthdays, the chance that at least two share one is about 50.7%.",
    "Compute it through the complement: the chance everyone differs is (365/365)(364/365)⋯(343/365).",
    "The surprise comes from counting pairs: 23 people form 253 pairs, each a chance for a match.",
    "Matching a specific birthday, such as yours, needs about 253 people for a 50% chance.",
    "The same mathematics sets how many items can be hashed before a collision becomes likely: roughly the square root of the number of possible values."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the birthday problem?",
      "answer": "The question of how many people must be in a room before it is more likely than not that two share a birthday. Assuming 365 equally likely birthdays, the answer is 23, which gives a probability of about 50.7%."
    },
    {
      "question": "How do you calculate the probability of a shared birthday?",
      "answer": "Find the probability that all birthdays differ, then subtract from 1. The second person avoids the first with probability 364/365, the third avoids both with 363/365, and so on. For n people, P(all different) = (365 × 364 × ⋯ × (366 − n))/365ⁿ."
    },
    {
      "question": "How many people do you need for someone to share my birthday?",
      "answer": "About 253 for a 50% chance. Each other person matches your birthday with probability 1/365, so the chance nobody does among n people is (364/365)ⁿ, which first drops below one half at n = 253."
    },
    {
      "question": "Is the birthday problem affected by birthdays not being evenly spread?",
      "answer": "Uneven spreading can only push the chance of a match up, never down. Uneven birth rates make some dates more common, so the 365-equal-days calculation gives the smallest possible probability and, if anything, underestimates real groups. Twins in the group would raise it further."
    }
  ],
  "sources": [
    {
      "title": "Birthday Problem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/BirthdayProblem.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "7.9 Conditional Probability and the Multiplication Rule (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/7-9-conditional-probability-and-the-multiplication-rule",
      "accessed": "2026-10-24"
    }
  ]
}
---

How many people do you need in a room for it to be more likely than not that two share a birthday? Half of 365, about 180, can sound like a reasonable guess. The answer is **23**. That gap between intuition and arithmetic is why this is sometimes called the birthday paradox, although nothing about it is contradictory once the counting is done carefully.

## The assumptions

The standard version assumes 365 possible birthdays (ignoring 29 February), each equally likely, with different people's birthdays independent. MathWorld sets the problem up the same way: each birthday uniformly distributed over the possible days. Real birthdays are not perfectly uniform, and the effect of that is discussed below.

## The calculation, through the complement

"At least two share" covers many cases: one pair, two pairs, three people on one day, and so on. Its complement, "all birthdays are different", is a single case and much easier.

Line people up one at a time.

- The first person can have any birthday: 365/365.
- The second must avoid the first: 364/365.
- The third must avoid both: 363/365.
- The nth must avoid n − 1 days: (366 − n)/365.

These multiply, by the multiplication rule for probabilities covered in OpenStax's *Contemporary Mathematics*, because each step is conditional on the earlier ones being distinct:

P(all different) = (365 × 364 × ⋯ × (366 − n))/365ⁿ,

and P(at least one shared birthday) = 1 − P(all different). In factorial form, the numerator is 365!/(365 − n)!, the number of ways to give n people distinct birthdays in order, a permutation count from [permutations versus combinations](/blog/permutations-vs-combinations/).

## The numbers

| People | Chance of a shared birthday |
| ---: | ---: |
| 10 | 11.7% |
| 20 | 41.1% |
| 23 | 50.7% |
| 30 | 70.6% |
| 40 | 89.1% |
| 50 | 97.0% |
| 57 | 99.0% |
| 70 | 99.9% |

At 23 people the chance first passes one half. A class of 30 has a better than two-in-three chance. By 70 a match is close to certain, even though the [pigeonhole principle](/blog/pigeonhole-principle-examples/) only *guarantees* one at 366.

MathWorld also gives the answer for larger coincidences: 88 people are needed for an even chance that three share a birthday, and 187 for four.

## Why intuition gets it wrong

The intuitive guess compares people with days. The right comparison is **pairs** with days. A match can happen between any two people, and 23 people form

C(23, 2) = 253 pairs.

Each pair matches with probability 1/365, so there are 253 chances at a 1-in-365 event. The expected number of matching pairs is 253/365 ≈ 0.69, as the [expected value guide](/blog/expected-value-explained/) shows using linearity, and a probability of about one half follows naturally.

A handy approximation makes this precise. For small probabilities, each pair avoids a match with probability about e^(−1/365), and treating the pairs as roughly independent gives

P(no match) ≈ e^(−n(n − 1)/730).

For n = 23 that is e^(−0.693) ≈ 0.500, close to the exact value of about 0.493. Setting the exponent equal to ln 2 shows the 50% point grows like the square root of the number of days: about 1.18√365 ≈ 22.5.

## Matching your own birthday is different

If the question is "will anyone here share **my** birthday?", only the pairs that include you count, n − 1 of them rather than C(n, 2). Each other person misses your birthday with probability 364/365, so

P(nobody shares mine) = (364/365)ⁿ,

which first drops below one half at **n = 253**. Confusing "some pair matches" with "someone matches me" is exactly the error behind the intuitive guess.

## Real birthdays

Births are not spread perfectly evenly across the year; MathWorld notes that in the United States September runs more than 6% above the average. Unevenness can only increase the chance of a match. For a single pair this is easy to check: two people match with probability p₁² + p₂² + ⋯ + p₃₆₅², where pₖ is the chance of being born on day k, and that sum is smallest when every pₖ equals 1/365. The same holds for groups of any size, so the uniform model gives the *smallest* possible probability, and the table above is, if anything, an underestimate for real groups.

## Hash collisions and the birthday attack

The same mathematics governs **hash collisions** in computing. A hash function maps items into N possible values, like people into days. A collision, two items with the same hash, becomes likely after only about √N items, not N/2. For a 32-bit hash with about 4.3 billion values, an even chance of a collision arrives after roughly 77,000 items.

The same square-root rule applies to an attacker searching for any two inputs with the same hash, a "birthday attack": the effort is on the order of the square root of the number of possible outputs, not the number itself. Hashing itself is built on remainders, the arithmetic covered in [modular arithmetic](/blog/modular-arithmetic-explained/).

## Try it

Check the table for your own group size, or compute it step by step: multiply 365/365 × 364/365 × … for n terms and subtract from 1. For a deeper look at combining probabilities this way, see [conditional probability and Bayes' theorem](/blog/conditional-probability-and-bayes/).

Probability questions like this one belong to the probability unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). It is part of our [education app collection](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) links the counting guides that the calculation relies on.
