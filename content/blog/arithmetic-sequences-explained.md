---
{
  "title": "Arithmetic Sequences: Constant Difference, Explained",
  "metaTitle": "Arithmetic Sequence Explained: Rule and nth Term",
  "description": "What a constant difference is, how the nth-term rule is derived rather than memorised, and why the sum of an arithmetic sequence is just pairing.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "tags": [
    "arithmetic sequences",
    "number patterns",
    "nth term",
    "series",
    "mental math"
  ],
  "primaryKeyword": "arithmetic sequence explained",
  "secondaryKeywords": [
    "arithmetic progression explained",
    "arithmetic sequence formula",
    "nth term of an arithmetic sequence",
    "common difference",
    "arithmetic series sum"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you find the nth term of an arithmetic sequence",
    "why is the arithmetic series sum formula n over 2",
    "what is the common difference in a sequence"
  ],
  "aiSearchQuestions": [
    "What is an arithmetic sequence?",
    "How do you find the nth term of an arithmetic sequence?",
    "Why does the arithmetic series sum formula work?"
  ],
  "demandTier": "unverified-medium",
  "hubs": [
    "logic-and-pattern-puzzles"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "number-sequence-puzzles-explained",
    "geometric-sequences-explained",
    "mental-math-training-guide",
    "common-reasoning-mistakes",
    "missing-number-problems",
    "odd-one-out-puzzles"
  ],
  "takeaways": [
    "An arithmetic sequence adds the same number at every step, and that number is called the common difference.",
    "The nth-term rule is not something to memorise: from the first term you take n − 1 steps to reach term n, which is exactly where a + (n − 1)d comes from.",
    "A constant first-difference row in a difference table is the definition of an arithmetic sequence, which makes the diagnostic test one subtraction per gap.",
    "The sum of a run of terms is the number of terms multiplied by the average of the first and last, because pairing from both ends produces identical totals.",
    "A negative common difference produces a falling sequence, and solving for the term where it crosses zero is a routine inequality rather than a trick."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the common difference in an arithmetic sequence?",
      "answer": "It is the fixed amount added at each step, found by subtracting any term from the one that follows it. In 4, 11, 18, 25 the common difference is 7, because 11 − 4, 18 − 11 and 25 − 18 all give 7. If those subtractions do not all give the same answer, the sequence is not arithmetic and you should test for a constant ratio instead."
    },
    {
      "question": "Why is the nth term a + (n − 1)d and not a + nd?",
      "answer": "Because the first term costs no steps. To reach the second term you add the difference once, to reach the third you add it twice, and to reach term n you add it n − 1 times. Writing a + nd would give you the term after the one you asked for. Checking the formula at n = 1 catches this error immediately, and that check takes two seconds."
    },
    {
      "question": "How do you add up an arithmetic sequence quickly?",
      "answer": "Multiply the number of terms by the average of the first and last term. For the first 20 terms of 4, 11, 18, 25, the twentieth term is 137, so the sum is 20 ÷ 2 × (4 + 137) = 1,410. This works because pairing the first term with the last, the second with the second-last and so on gives pairs that all total the same amount."
    },
    {
      "question": "Are arithmetic sequences the same as linear functions?",
      "answer": "They are closely related. An arithmetic sequence is what you get by sampling a straight-line function at whole-number positions, with the common difference playing the role of the gradient. The difference is that a sequence is defined only at positions 1, 2, 3 and so on, whereas a linear function is defined everywhere between those points."
    }
  ],
  "sources": [
    {
      "title": "Sequences and Series",
      "publisher": "Centre for Education in Mathematics and Computing, University of Waterloo",
      "url": "https://cemc.uwaterloo.ca/sites/default/files/documents/2024/SequencesSeries.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "Carl Friedrich Gauss (1777 - 1855) - Biography",
      "publisher": "MacTutor History of Mathematics Archive, University of St Andrews",
      "url": "https://mathshistory.st-andrews.ac.uk/Biographies/Gauss/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Divided Differences",
      "publisher": "NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/articles/divided-differences",
      "accessed": "2026-09-21"
    }
  ]
}
---

**An arithmetic sequence adds the same number at every step. That number is the common difference, usually written d, and it is the only thing you need in order to extend the sequence, jump to any term without listing the ones before it, or add a whole run of terms at once.** The University of Waterloo's CEMC [sequences and series toolkit](https://cemc.uwaterloo.ca/sites/default/files/documents/2024/SequencesSeries.html) states the defining property plainly: the difference between consecutive terms is constant.

This is the narrowest and most common of the families catalogued in [the guide to number sequence puzzles](/blog/number-sequence-puzzles-explained/). It is worth doing properly, because the two formulas involved are usually handed over as things to memorise when both of them can be reconstructed from scratch in about ten seconds.

## Recognising one: subtract, and see if it settles

The test is one subtraction per gap. Take 4, 11, 18, 25, 32. The gaps are 7, 7, 7, 7. A constant first-difference row is the definition, so this sequence is arithmetic with a = 4 and d = 7.

If that row is not constant, stop treating the sequence as arithmetic. The next two tests are dividing consecutive terms, which detects [a constant ratio](/blog/geometric-sequences-explained/), and taking differences a second time, which detects a quadratic rule. NRICH's article on [divided differences](https://nrich.maths.org/articles/divided-differences) by T. W. Körner sets out the general version of this: repeatedly differencing a polynomial of degree m produces a row of zeros after at most m + 1 passes, so an arithmetic sequence is simply the degree-one case where the first difference row is already flat.

## Deriving the nth-term rule instead of memorising it

You want term number n without writing out everything before it. Count the steps.

- Term 1 is a. Zero steps taken.
- Term 2 is a + d. One step.
- Term 3 is a + 2d. Two steps.
- Term n is a + (n − 1)d. n − 1 steps.

That is the whole derivation. The n − 1 is not a quirk of notation; it is the count of gaps between the first term and the nth, and there is always one fewer gap than there are terms.

Apply it to 4, 11, 18, 25, 32. The rule is 4 + 7(n − 1), which expands to 7n − 3. Check both ends before trusting it: at n = 1, 7 − 3 = 4, correct; at n = 5, 35 − 3 = 32, correct. The twentieth term is 7 × 20 − 3 = **137**, and you never had to write out terms six to nineteen.

The expanded form, 7n − 3, is worth keeping. It shows the common difference sitting where the gradient of a straight line would sit, and the constant −3 as the value the line would take at position zero.

## The sum is pairing, not a formula

The sum of the first n terms of an arithmetic sequence is

**S = n/2 × (first term + last term)**

which is the number of terms multiplied by the average of the two ends. The reason is worth seeing once, because after that the formula is impossible to forget.

Write the run forwards, then write it backwards underneath, and add the two lines column by column. Every column contains one term from the front and its partner the same distance from the back, and every such pair totals the same amount. You have now added the sequence to itself, so halve the result.

MacTutor's biography of [Carl Friedrich Gauss](https://mathshistory.st-andrews.ac.uk/Biographies/Gauss/) records the well-known schoolroom story of exactly this move: his teacher Büttner and his assistant Martin Bartels were reported to be amazed when Gauss summed the integers from 1 to 100 instantly by spotting that the sum was fifty pairs each totalling 101 — giving 5,050. The anecdote is a staple of mathematical folklore and the details vary between retellings, but the method it describes is sound and is the standard derivation of the formula.

For our running example, the sum of the first twenty terms is 20/2 × (4 + 137) = 10 × 141 = **1,410**. The alternative form, n/2 × (2a + (n − 1)d), gives 10 × (8 + 133) = 10 × 141, which agrees. Running a second form as a check costs one line and catches a slipped term count.

## Falling sequences and the point where they cross zero

A negative common difference is not a special case; it is the same rule with a negative d. Take 90, 83, 76, 69, where d = −7.

The nth term is 90 − 7(n − 1) = 97 − 7n. At n = 13 that gives 97 − 91 = **6**. At n = 14 it gives 97 − 98 = **−1**, so the fourteenth term is the first negative one.

Finding that crossing point is a one-line inequality rather than a trick: solve 97 − 7n < 0 to get n > 13.857, and round up to the next whole position. This is the shape of most real questions about depreciating values, countdowns and scheduled reductions, and it is the reason the nth-term rule is worth having in algebraic form rather than as a list.

## Where arithmetic sequences show up in practice

Anything that changes by a fixed amount per period is arithmetic: a fixed monthly repayment reducing a balance, seats added row by row in a fixed increment, or a temperature falling a set amount per thousand metres of altitude. Anything that changes by a fixed *percentage* per period is not — that is a constant-ratio sequence, and treating growth as arithmetic when it is geometric is one of the more expensive everyday errors in numeracy.

The other place this family appears constantly is inside puzzles that are not themselves arithmetic. In 2, 6, 12, 20, 30 the terms are not arithmetic, but their differences — 4, 6, 8, 10 — are. That nesting is exactly what makes [difference tables the general tool for finding a rule](/blog/finding-the-rule-in-a-number-pattern/).

## Practising it without a worksheet

Two habits make this automatic. First, always check a candidate rule at the first and last term you were given, not just at one of them. Second, get comfortable enough with the arithmetic that the rule-finding is the hard part, which is the argument made at length in [the mental math methods guide](/blog/mental-math-training-guide/) and in the [wider set of arithmetic techniques](/blog/mental-math-tricks-that-work/).

Mental Math & Memory Games, our own app, is built by Reign Creative and ships a 75-second Number Pattern Challenge with Easy, Medium and Hard settings, plus a Missing Number Puzzle mode that asks you to fill a blank in an equation. Both are numeric practice drills: the app contains no figural or matrix items and no logic-grid puzzles, and it does not present any of its modes as a test or an assessment of anything. It records score, accuracy, streak and response time so you can see whether rule-finding is actually getting faster. The [app page](/apps/mental-math-memory-games/) lists the modes, more sequence material sits in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/), and the rest of this subject area is in the [education and brain training section](/blog/category/education-brain/).
