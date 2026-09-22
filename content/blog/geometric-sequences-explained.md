---
{
  "title": "Geometric Sequences: Constant Ratio, Explained",
  "metaTitle": "Geometric Sequence Explained: Ratio and Sum",
  "description": "How to spot a constant ratio, why the nth-term rule uses an exponent, and what negative ratios and ratios below one do to a sequence.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "geometric sequences",
    "number patterns",
    "exponential growth",
    "series",
    "mental math"
  ],
  "primaryKeyword": "geometric sequence explained",
  "secondaryKeywords": [
    "geometric progression explained",
    "geometric sequence formula",
    "common ratio",
    "exponential growth sequence",
    "geometric series sum"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you find the common ratio of a sequence",
    "what happens when the common ratio is negative",
    "why does an infinite geometric series have a finite sum"
  ],
  "aiSearchQuestions": [
    "What is a geometric sequence?",
    "How do you find the common ratio?",
    "Why does an infinite geometric series add up to a finite number?"
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
    "arithmetic-sequences-explained",
    "percentages-in-your-head"
  ],
  "takeaways": [
    "A geometric sequence multiplies by the same number at every step, so the diagnostic move is dividing consecutive terms rather than subtracting them.",
    "The nth term is a × r to the power n − 1, and the exponent counts multiplication steps in exactly the way the n − 1 in an arithmetic rule counts addition steps.",
    "A negative common ratio makes the signs alternate, which is a giveaway that people routinely misread as two interleaved sequences.",
    "A ratio between −1 and 1 makes terms shrink, and an infinite run of shrinking terms can add up to a finite total.",
    "A difference table never settles on a geometric sequence, so if your differences keep growing in proportion, switch tests immediately rather than differencing again."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How do you find the common ratio of a geometric sequence?",
      "answer": "Divide any term by the one before it. In 6, 18, 54, 162 the divisions 18 ÷ 6, 54 ÷ 18 and 162 ÷ 54 all give 3, so the common ratio is 3. Do the division at more than one place in the sequence before committing, because a single agreement can be a coincidence while three in a row essentially never is."
    },
    {
      "question": "What does a negative common ratio do?",
      "answer": "It flips the sign at every step, so terms alternate between positive and negative. In 5, −10, 20, −40 the ratio is −2, and the sixth term is 5 × (−2) to the fifth power, which is −160. Sequences like this are often misread as two separate sequences woven together, so check for a single negative ratio before splitting anything."
    },
    {
      "question": "Why does an infinite geometric series have a finite sum?",
      "answer": "Because when the ratio is between −1 and 1, each term is a fixed fraction of the one before, so the total creeps towards a ceiling it never passes. With 80, 20, 5, 1.25 and a ratio of one quarter, the infinite total is 80 divided by 0.75, which is 320/3, about 106.67. The terms never stop, but what they add adds less and less."
    },
    {
      "question": "Is compound growth a geometric sequence?",
      "answer": "Yes. A balance growing at a fixed percentage per period multiplies by the same factor each period, which is the definition of a geometric sequence. A rise of 20% means a ratio of 1.2, and a fall of 20% means a ratio of 0.8. Treating percentage growth as though it added a fixed amount each period is one of the most common numeracy errors there is."
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
      "title": "A000079: Powers of 2, a(n) = 2^n",
      "publisher": "The On-Line Encyclopedia of Integer Sequences, OEIS Foundation Inc.",
      "url": "https://oeis.org/A000079",
      "accessed": "2026-09-21"
    },
    {
      "title": "Zeno of Elea (490 BC - 425 BC) - Biography",
      "publisher": "MacTutor History of Mathematics Archive, University of St Andrews",
      "url": "https://mathshistory.st-andrews.ac.uk/Biographies/Zeno_of_Elea/",
      "accessed": "2026-09-21"
    }
  ]
}
---

**A geometric sequence multiplies by the same number at every step. That number is the common ratio, usually written r, and the test for it is division rather than subtraction.** The University of Waterloo's CEMC [sequences and series toolkit](https://cemc.uwaterloo.ca/sites/default/files/documents/2024/SequencesSeries.html) gives the general term as a × r raised to the power n − 1, and the finite sum as a(1 − rⁿ)/(1 − r), with a separate infinite form once |r| is below 1.

This is the second family in [the number sequence puzzle catalogue](/blog/number-sequence-puzzles-explained/), and it is worth separating from [the constant-difference family](/blog/arithmetic-sequences-explained/) for one practical reason: the diagnostic move is different, and using the wrong one wastes the time you were trying to save.

## Divide, do not subtract

Take 6, 18, 54, 162. The differences are 12, 36, 108 — growing, and not obviously helpful. The ratios are 18 ÷ 6 = 3, 54 ÷ 18 = 3, 162 ÷ 54 = 3. Constant, so the sequence is geometric with a = 6 and r = 3.

There is a useful warning sign here. Differencing a geometric sequence produces another geometric sequence with the same ratio, so a difference table on this family never settles no matter how many rows you take. If your first differences are themselves growing in proportion rather than by a fixed amount, stop differencing and start dividing.

The simplest member of the family is doubling. The powers of 2 — 1, 2, 4, 8, 16, 32, 64, 128 — are catalogued as [A000079](https://oeis.org/A000079) in the On-Line Encyclopedia of Integer Sequences, where the entry notes that these numbers appear on Old Babylonian cuneiform tablets, which makes them among the oldest recorded mathematical objects of any kind.

## The nth term: counting multiplications

The rule is built the same way the arithmetic one is, by counting steps.

- Term 1 is a. No multiplications yet.
- Term 2 is a × r. One multiplication.
- Term n is a × rⁿ⁻¹. n − 1 multiplications.

For 6, 18, 54, 162 the rule is 6 × 3ⁿ⁻¹. The seventh term is 6 × 3⁶ = 6 × 729 = **4,374**. Check the rule at n = 1 before using it: 6 × 3⁰ = 6, correct.

The sum of the first six terms, from the formula, is 6(3⁶ − 1)/(3 − 1) = 6 × 728 ÷ 2 = **2,184**. Adding the terms directly gives 6 + 18 + 54 + 162 + 486 + 1,458, which totals 2,184 as well. Verifying a formula against a direct addition once, on a short run, is worth the thirty seconds; it catches an off-by-one in the exponent that would otherwise survive into every later answer.

## Negative ratios alternate

A negative r flips the sign at every step. Take 5, −10, 20, −40: the ratio is −2 throughout, because −10 ÷ 5, 20 ÷ −10 and −40 ÷ 20 all give −2.

The sixth term is 5 × (−2)⁵ = 5 × (−32) = **−160**. Odd exponents keep the negative, even exponents cancel it, so the signs run positive, negative, positive, negative from the first term onwards.

This is the family's most commonly misread shape. A sequence that swings above and below zero looks like two interleaved strands, and solvers split it before testing for a single negative ratio. Run the division test first — it is one step and it resolves the question outright.

## Ratios below one shrink, and the shrinking can be added up

When r sits between −1 and 1, terms get smaller. Take 80, 20, 5, 1.25, where r = ¼. The terms never reach zero, but they lose three-quarters of their size at every step, and the running total approaches a ceiling: 80 ÷ (1 − 0.25) = 80 ÷ 0.75 = 320/3, or about **106.67**.

The oldest argument in this territory is Zeno's dichotomy paradox. MacTutor's biography of [Zeno of Elea](https://mathshistory.st-andrews.ac.uk/Biographies/Zeno_of_Elea/) sets out the version in which reaching a destination requires first reaching the midpoint, then the midpoint of what remains, and so on without end. The distances covered are ½, ¼, ⅛ and onwards — a geometric sequence with a = ½ and r = ½, whose infinite sum is 0.5 ÷ 0.5 = 1, exactly the whole journey. MacTutor is careful to note that the mathematical sum does not dispose of the philosophical puzzle, which is still discussed; what it does show is that infinitely many positive terms can total a finite amount.

## The everyday version: percentages are ratios

Any quantity changing by a fixed percentage per period is geometric. A 20% rise is a ratio of 1.2; a 20% fall is a ratio of 0.8. This is why a 20% rise followed by a 20% fall does not return you to where you started — 100 becomes 120, then 96 — a point developed in detail in [percentages in your head](/blog/percentages-in-your-head/).

It is also why long-run growth questions cannot be answered by adding. Something growing 7% a year has a ratio of 1.07, so after ten years it is multiplied by 1.07¹⁰, roughly 1.97 — close to double, and nothing like the 70% that adding would suggest. Recognising that a described change is a ratio rather than a difference is the single highest-value use of this family outside puzzles.

## Practising the distinction

The skill worth building is not the formulas; it is the reflex of running both tests. Subtract first, and if the gaps are not constant, divide. If neither settles, the rule is probably recursive or interleaved, which is covered in [the guide to finding a rule with difference tables](/blog/finding-the-rule-in-a-number-pattern/).

Mental Math & Memory Games, our own app from Reign Creative, drills the arithmetic underneath this rather than the theory: Multiplication Rush and Division Dash for the ratio work, and the 75-second Number Pattern Challenge for rule-finding itself. Its 49-technique library includes a doubling-and-halving entry with a worked example and a named common mistake. Two honest limits are worth stating: the app has no figural, matrix or logic-grid content of any kind, and nothing in it is presented as a test — it records score, accuracy, streak and response time on its own drills and makes no claim about intelligence. The [app page](/apps/mental-math-memory-games/) lists what ships. More sequence material is gathered in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/), and the wider subject sits in the [education and brain training section](/blog/category/education-brain/).
