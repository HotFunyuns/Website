---
{
  "title": "Expected Value and Linearity of Expectation: The Shortcut That Solves Hard Counting Problems",
  "metaTitle": "Expected Value and Linearity of Expectation, Explained",
  "description": "Expected value is a probability-weighted average. How to compute it, why expectations add even for dependent events, and how indicator variables help.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "probability", "expected value", "random variables"],
  "primaryKeyword": "expected value discrete math",
  "secondaryKeywords": [
    "linearity of expectation",
    "indicator random variables",
    "expected value formula",
    "expected value of a die roll",
    "expected number of fixed points"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "expected number of rolls to get a six",
    "expected number of empty boxes",
    "coupon collector expected value",
    "does linearity of expectation need independence"
  ],
  "aiSearchQuestions": [
    "What is expected value in probability?",
    "What is linearity of expectation?",
    "How do indicator random variables work?",
    "How many times do you expect to roll a die before getting a six?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "conditional-probability-and-bayes",
    "binomial-distribution-explained",
    "derangements-explained",
    "birthday-problem-explained",
    "big-o-notation-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "The expected value of a random variable is the sum of each value times its probability: the long-run average over many repetitions.",
    "Linearity of expectation says E[X + Y] = E[X] + E[Y] always, even when X and Y depend on each other.",
    "Writing a count as a sum of 0-or-1 indicator variables turns many hard expectation problems into one-line calculations.",
    "The expected value need not be a possible outcome: a fair die averages 3.5.",
    "Expected value describes the average, not the risk; two games with the same expectation can behave very differently."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is expected value?",
      "answer": "The probability-weighted average of a random variable's values: multiply each possible value by its probability and add. For a fair six-sided die, (1 + 2 + 3 + 4 + 5 + 6)/6 = 3.5. Over many repetitions, the average outcome approaches the expected value."
    },
    {
      "question": "What is linearity of expectation?",
      "answer": "The rule that the expected value of a sum is the sum of the expected values, E[X + Y] = E[X] + E[Y], and that E[cX] = cE[X]. It holds whether or not the variables are independent, which is what makes it so useful."
    },
    {
      "question": "What is an indicator random variable?",
      "answer": "A variable that is 1 if an event happens and 0 if not. Its expected value is just the probability of the event. Counting something as a sum of indicators, one per possible occurrence, lets linearity give the expected count directly."
    },
    {
      "question": "How many rolls does it take on average to get a six?",
      "answer": "Six. When each attempt succeeds with probability p, independently, the expected number of attempts until the first success is 1/p. For a six on a fair die, p = 1/6, so the expectation is 6 rolls."
    }
  ],
  "sources": [
    {
      "title": "7.11 Expected Value (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/7-11-expected-value",
      "accessed": "2026-10-24"
    },
    {
      "title": "Expectation Value",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/ExpectationValue.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "6.042J Mathematics for Computer Science, Spring 2015: Readings",
      "publisher": "MIT OpenCourseWare",
      "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/pages/readings/",
      "accessed": "2026-10-24"
    }
  ]
}
---

Probability tells you how likely each outcome is. Expected value boils that whole picture down to one number: the average you would see over many repetitions. It is how games are judged fair or unfair, how algorithms are analysed on average, and, through one remarkable property, how some counting problems that look very hard are solved in a line.

## A probability-weighted average

For a random variable X that takes values x₁, x₂, … with probabilities p₁, p₂, …,

E[X] = x₁p₁ + x₂p₂ + ⋯

Multiply each value by its probability and add. OpenStax's *Contemporary Mathematics* gives the same definition in terms of the values of an experiment's outcomes, and works the standard first example: a single roll of a fair die has expected value (1 + 2 + 3 + 4 + 5 + 6)/6 = **3.5**.

That example makes an important point at once. You can never roll a 3.5. The expected value is an average, not a prediction of any single outcome.

## Judging a game

You pay to play a game: roll a die, win $4 if it shows a six, lose $1 otherwise. Your expected gain is

E = 4 · (1/6) + (−1) · (5/6) = −1/6 ≈ −$0.17

per play. Over many plays you lose about 17 cents a game on average, even though you will win sometimes. A game is called fair when the expected gain is zero.

Expected value describes the average and nothing else. A game that pays $100 with probability 1/100 and a game that pays $1 for certain both have expected value $1, but they feel very different, because their spread of outcomes differs. Measuring that spread is what variance is for.

## Linearity: expectations add, always

The most useful working fact about expected value is

**E[X + Y] = E[X] + E[Y]** and **E[cX] = c · E[X]**

for any random variables X and Y and any constant c, **whether or not X and Y are independent.** MathWorld puts it as the statement that expectation is a linear operator. Its power is that it lets you split a complicated random quantity into simple pieces.

**Two dice.** The expected total is 3.5 + 3.5 = 7, with no need to list 36 outcomes.

**Dependence does not matter.** Let X be the number on a die and Y = 7 − X, the number on the bottom face. X and Y are completely dependent, yet E[X + Y] = 3.5 + 3.5 = 7, which is correct: the faces always sum to 7.

## Indicator variables

An **indicator** variable Iₐ is 1 if event A happens and 0 if not. Its expected value is

E[Iₐ] = 1 · P(A) + 0 · P(not A) = P(A).

Combine indicators with linearity and many counting problems collapse.

**Expected heads.** In n coin flips, let Iⱼ be 1 if flip j is heads. The number of heads is I₁ + ⋯ + Iₙ, so its expectation is n · (1/2) = n/2.

**Fixed points of a shuffle.** Shuffle n cards. How many do you expect to stay in their original position? Let Iⱼ be 1 if card j stays put; P = 1/n. The expected number is n · (1/n) = **1**, for every n. Computing this directly would need the full distribution of fixed points, a hard problem related to [derangements](/blog/derangements-explained/). Linearity ignores the dependence between cards and gets the answer instantly.

**Empty boxes.** Throw 10 balls independently into 10 boxes. A given box stays empty with probability (9/10)¹⁰, so the expected number of empty boxes is 10 · (0.9)¹⁰ ≈ **3.49**.

**Shared birthdays.** Among n people, how many pairs share a birthday, on average? Each of the C(n, 2) pairs matches with probability 1/365, so the expectation is C(n, 2)/365. For 23 people, that is 253/365 ≈ 0.69 pairs, one way to see why the [birthday problem](/blog/birthday-problem-explained/) has such a surprising answer.

## Waiting for a success

If each attempt succeeds with probability p, independently, the expected number of attempts until the first success is **1/p**. Rolling for a six takes 6 rolls on average; flipping for heads takes 2.

This gives the **coupon collector** result. To collect all n types of coupon when each purchase gives a random one, the wait for each new type is a separate waiting problem: after collecting k types, a new one appears with probability (n − k)/n, taking n/(n − k) purchases on average. By linearity, the total expected number of purchases is

n(1 + 1/2 + 1/3 + ⋯ + 1/n).

For a six-sided die, getting every face takes 6 · (1 + 1/2 + ⋯ + 1/6) = **14.7** rolls on average.

## Where expectations come from in computer science

Average-case running time is an expected value: the number of steps an algorithm takes, averaged over random inputs or random choices. Linearity lets you compute it by summing the expected cost of each step. Comparing those averages for large inputs is the job of [big-O notation](/blog/big-o-notation-explained/).

## Expectation errors

1. **Expecting the expected value.** It is an average; a single trial can land far from it.
2. **Multiplying expectations of dependent variables.** E[XY] = E[X]E[Y] needs independence. Sums never do.
3. **Forgetting negative payoffs.** Include the cost of playing as a negative value.
4. **Confusing E[X²] with E[X]².** They differ unless X is constant; the gap is the variance.

For the probability theory underneath, start with [conditional probability and Bayes' theorem](/blog/conditional-probability-and-bayes/); for repeated independent trials, the [binomial distribution](/blog/binomial-distribution-explained/) has expected value np.

Expectation belongs to the probability unit of [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/). Browse our [education apps](/apps/category/education-brain/), or continue in the [discrete math hub](/blog/topics/discrete-math/).
