---
{
  "title": "Permutations vs Combinations: The One Question That Decides Which to Use",
  "metaTitle": "Permutations vs Combinations: When to Use Each",
  "description": "Ask whether order matters. Formulas for permutations and combinations, why they differ by k!, worked examples, and the four-way table for repetition.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "counting", "combinatorics", "probability"],
  "primaryKeyword": "permutations vs combinations",
  "secondaryKeywords": [
    "permutation formula",
    "combination formula n choose k",
    "when to use permutation or combination",
    "permutations with repetition",
    "combinations with repetition"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how many ways to choose a committee of 3 from 8",
    "how many ways can 8 runners finish first second and third",
    "arrangements of the letters in mississippi",
    "is a lottery a permutation or combination"
  ],
  "aiSearchQuestions": [
    "What is the difference between a permutation and a combination?",
    "How do you know whether to use a permutation or a combination?",
    "What is the formula for n choose k?",
    "How do you count arrangements with repeated letters?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "binomial-theorem-and-pascals-triangle",
    "stars-and-bars-explained",
    "inclusion-exclusion-principle",
    "pigeonhole-principle-examples",
    "conditional-probability-and-bayes",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "Use a permutation when the order of the selected items matters and a combination when it does not.",
    "P(n, k) = n!/(n − k)! counts ordered selections; C(n, k) = n!/(k!(n − k)!) counts unordered ones.",
    "P(n, k) = C(n, k) · k!: every combination of k items can be put in k! orders.",
    "With repetition allowed, ordered selections number nᵏ and unordered ones C(n + k − 1, k).",
    "Arrangements of letters with repeats divide by the factorial of each repeat count: MISSISSIPPI has 11!/(4! 4! 2!) = 34,650."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between a permutation and a combination?",
      "answer": "A permutation is an ordered selection and a combination is an unordered one. Choosing gold, silver and bronze from 8 runners is a permutation, P(8, 3) = 336, because swapping two medallists changes the outcome. Choosing a 3-person committee from 8 is a combination, C(8, 3) = 56."
    },
    {
      "question": "How do I decide whether order matters?",
      "answer": "Swap two of the chosen items and ask whether you get a different outcome. If yes, as with positions, rankings, passwords or seat assignments, order matters and you need a permutation. If no, as with teams, hands of cards or sets of toppings, it is a combination."
    },
    {
      "question": "What is the formula for n choose k?",
      "answer": "C(n, k) = n!/(k!(n − k)!). It counts the ways to choose k items from n distinct items when order does not matter. For example, C(5, 2) = 120/(2 × 6) = 10."
    },
    {
      "question": "Is a lottery draw a permutation or a combination?",
      "answer": "Usually a combination, because the numbers on a ticket match regardless of the order they are drawn. Choosing 6 numbers from 49 gives C(49, 6) = 13,983,816 possible tickets. A game that pays only for numbers in the exact drawn order would be a permutation."
    }
  ],
  "sources": [
    {
      "title": "Combinations and Permutations (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_counting-combperm.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "7.2 Permutations (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/7-2-permutations",
      "accessed": "2026-10-24"
    },
    {
      "title": "7.3 Combinations (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/7-3-combinations",
      "accessed": "2026-10-24"
    }
  ]
}
---

When a counting problem asks you to select some items from a larger collection, the first question to settle is: **does the order of the chosen items matter?** If it does, you are counting permutations. If it does not, you are counting combinations. Get that question right and the formula follows; get it wrong and the answer is off by a factor of k!.

OpenStax's *Contemporary Mathematics* draws the line the same way: the results of a race and the selection of club officers are permutations because order matters, while a hand of cards is a combination because it does not.

## The two formulas

| | Permutations | Combinations |
| --- | --- | --- |
| Counts | Ordered selections of k from n | Unordered selections of k from n |
| Notation | P(n, k), nPk | C(n, k), (n choose k), nCk |
| Formula | n!/(n − k)! | n!/(k!(n − k)!) |
| Same as | n(n − 1)⋯(n − k + 1) | P(n, k)/k! |

Levin's *Discrete Mathematics: An Open Introduction* derives the relationship directly. To make an ordered selection, first choose which k items to use, C(n, k) ways, then arrange them, k! ways. So

P(n, k) = C(n, k) · k!.

The extra k! in the denominator of C(n, k) is exactly the number of orders that a combination ignores.

## The test: swap two items

Imagine you have made a selection. Swap two of the chosen items. Is it a different outcome?

- **Gold, silver and bronze from 8 runners.** Swapping the gold and silver medallists is a different result. Order matters: P(8, 3) = 8 · 7 · 6 = **336**.
- **A committee of 3 from 8 people.** Swapping two members leaves the same committee. Order does not matter: C(8, 3) = 336/3! = **56**.

The two answers differ by 3! = 6, the number of ways to order three people. That factor is the whole difference between the two concepts.

## Worked examples

**Seating 5 people in a row of 5 chairs.** Every arrangement uses everyone, and order matters: P(5, 5) = 5! = 120.

**Choosing 2 pizza toppings from 10.** Pepperoni-and-mushroom is the same pizza as mushroom-and-pepperoni: C(10, 2) = 45.

**President, treasurer and secretary from a club of 20.** Distinct roles make order matter: P(20, 3) = 20 · 19 · 18 = 6,840.

**A 5-card poker hand from 52 cards.** The order you were dealt the cards is irrelevant: C(52, 5) = 2,598,960.

**A lottery ticket of 6 numbers from 49.** Again unordered: C(49, 6) = 13,983,816. Dividing 1 by this gives the chance of one ticket matching, which is how combinations feed into probability; see [conditional probability and Bayes' theorem](/blog/conditional-probability-and-bayes/) for where that leads.

## When repetition is allowed

So far each item could be chosen at most once. Allowing repetition gives a four-way table.

| | Order matters | Order does not matter |
| --- | --- | --- |
| **No repetition** | P(n, k) = n!/(n − k)! | C(n, k) |
| **Repetition allowed** | nᵏ | C(n + k − 1, k) |

- **Ordered, with repetition:** a 4-digit PIN uses digits 0–9 with repeats allowed and order mattering: 10⁴ = 10,000.
- **Unordered, with repetition:** choosing 3 scoops from 5 ice-cream flavours, repeats allowed, order irrelevant: C(5 + 3 − 1, 3) = C(7, 3) = 35. This is the [stars and bars](/blog/stars-and-bars-explained/) method.

## Arrangements with repeated items

How many different strings can be made by rearranging the letters of MISSISSIPPI? There are 11 letters, but swapping two S's changes nothing. Divide by the number of ways to rearrange each repeated letter among itself:

11!/(4! · 4! · 2! · 1!) = 39,916,800/1,152 = **34,650**

(4 I's, 4 S's, 2 P's and 1 M). The same reasoning gives C(n, k) itself: arranging k identical "chosen" markers and n − k identical "not chosen" markers.

## Counting errors to avoid

1. **Using a permutation for a group.** Teams, committees and hands are unordered.
2. **Using a combination when roles differ.** Positions such as captain and vice-captain make order matter.
3. **Forgetting repetition.** When repeated characters are allowed, as in the PIN example, the answer is nᵏ, not P(n, k).
4. **Adding when you should multiply.** Independent stages multiply: choosing a 2-person committee from 6 men and another from 5 women gives C(6, 2) · C(5, 2) = 15 · 10 = 150.
5. **Double-counting overlapping cases.** "At least one" problems often need [inclusion–exclusion](/blog/inclusion-exclusion-principle/) or the complement.

## Where the numbers come from

The values C(n, k) form Pascal's triangle, and they are the coefficients in the expansion of (x + y)ⁿ, which is why they are also called binomial coefficients. The [binomial theorem guide](/blog/binomial-theorem-and-pascals-triangle/) explains that connection. And if you put more than n objects into n boxes, some box gets two, a counting fact simple enough to state in a line and powerful enough to need its own guide: the [pigeonhole principle](/blog/pigeonhole-principle-examples/).

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a combinatorics unit with lessons and knowledge checks, plus topic and timed quizzes. It sits with our other [education apps](/apps/category/education-brain/); the [discrete math hub](/blog/topics/discrete-math/) lists the full counting sequence.
