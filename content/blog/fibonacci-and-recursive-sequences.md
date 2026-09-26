---
{
  "title": "Fibonacci and Other Recursive Sequences",
  "metaTitle": "Fibonacci Sequence and Recursive Sequences",
  "description": "What makes a sequence recursive, how Fibonacci and Lucas numbers differ only in their seeds, and which golden ratio claims actually hold up.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "tags": [
    "fibonacci",
    "recursive sequences",
    "number patterns",
    "golden ratio",
    "problem solving"
  ],
  "primaryKeyword": "fibonacci sequence explained",
  "secondaryKeywords": [
    "fibonacci numbers explained",
    "recursive sequence definition",
    "lucas numbers",
    "golden ratio and fibonacci",
    "sequences defined by earlier terms"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what is a recursive sequence in maths",
    "how do lucas numbers differ from fibonacci numbers",
    "do fibonacci ratios really converge to the golden ratio"
  ],
  "aiSearchQuestions": [
    "What is a recursive sequence?",
    "How is the Fibonacci sequence defined?",
    "What is actually true about Fibonacci and the golden ratio?"
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
    "working-memory-and-training"
  ],
  "takeaways": [
    "A recursive sequence has two halves: a rule that builds each term from earlier terms, and the starting values the rule needs before it can begin.",
    "Fibonacci is the case where each term is the sum of the two before it, with seeds of 0 and 1 in the standard catalogued form.",
    "Change only the seeds and you get a different sequence with the same rule — Lucas numbers start 2, 1 and run 2, 1, 3, 4, 7, 11, 18.",
    "Recursion is the third test to run on a puzzle, after constant differences and constant ratios have both failed.",
    "The ratio of consecutive Fibonacci terms converging to the golden ratio is a demonstrable fact; most popular claims about the golden ratio in art and nature are far weaker and are not repeated here."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What makes a sequence recursive?",
      "answer": "Each term is defined using earlier terms rather than its position in the list. A rule like \"add the previous two terms\" cannot produce anything on its own, so a recursive definition must also supply starting values. Those two parts — the rule and the seeds — are what distinguish recursion from a position formula such as \"the nth term is n squared\"."
    },
    {
      "question": "How is the Fibonacci sequence defined?",
      "answer": "F(n) = F(n − 1) + F(n − 2), with F(0) = 0 and F(1) = 1, which is the definition carried in the On-Line Encyclopedia of Integer Sequences. That produces 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 and onwards. Some sources start the list at 1, 1 instead, which shifts the index but changes none of the numbers after the start."
    },
    {
      "question": "What are Lucas numbers?",
      "answer": "They use the same rule as Fibonacci — each term is the sum of the two before it — but start from 2 and 1 rather than 0 and 1. The result is 2, 1, 3, 4, 7, 11, 18, 29, 47, 76. They are the clearest demonstration that a recursive rule and its starting values are separate ingredients, and that changing the seeds produces a genuinely different sequence."
    },
    {
      "question": "How do I spot recursion in a puzzle?",
      "answer": "Run the two cheap tests first. If consecutive differences are not constant and consecutive ratios are not constant, try adding pairs of earlier terms and see whether the next one falls out. Also test each term against twice or three times its predecessor plus a small constant, since rules of that shape are common and are missed when solvers look only for the Fibonacci pattern."
    }
  ],
  "sources": [
    {
      "title": "A000045: Fibonacci numbers",
      "publisher": "The On-Line Encyclopedia of Integer Sequences, OEIS Foundation Inc.",
      "url": "https://oeis.org/A000045",
      "accessed": "2026-09-21"
    },
    {
      "title": "A000032: Lucas numbers beginning at 2",
      "publisher": "The On-Line Encyclopedia of Integer Sequences, OEIS Foundation Inc.",
      "url": "https://oeis.org/A000032",
      "accessed": "2026-09-21"
    },
    {
      "title": "Fibonacci (1170 - 1250) - Biography",
      "publisher": "MacTutor History of Mathematics Archive, University of St Andrews",
      "url": "https://mathshistory.st-andrews.ac.uk/Biographies/Fibonacci/",
      "accessed": "2026-09-21"
    },
    {
      "title": "The Golden Ratio, Fibonacci Numbers and Continued Fractions",
      "publisher": "NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/articles/golden-ratio-fibonacci-numbers-and-continued-fractions",
      "accessed": "2026-09-21"
    }
  ]
}
---

**A recursive sequence defines each term using the terms before it, rather than using its position in the list.** That makes it a different animal from the constant-difference and constant-ratio families, and it is the reason a difference table on a recursive sequence tends to produce another copy of the same sequence rather than a row of zeros.

Every recursive definition has two halves, and both are load-bearing. There is a rule — "each term is the sum of the previous two" — and there are the starting values the rule needs before it has anything to work with. Swap the seeds and you get a different sequence from the same rule, which is the most useful single fact in this article.

## Fibonacci, precisely

The On-Line Encyclopedia of Integer Sequences carries the Fibonacci numbers as [A000045](https://oeis.org/A000045), defined as F(n) = F(n − 1) + F(n − 2) with F(0) = 0 and F(1) = 1. That gives:

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610

Two things trip people up. The first is the starting point: some presentations begin 1, 1 rather than 0, 1, which shifts every index by one without changing any of the numbers after the start. The second is that the rule says nothing about position — F(10) is not calculated from 10, it is calculated from F(9) and F(8). Getting to the hundredth term means walking there, unless you bring in a closed form.

MacTutor's biography of [Fibonacci](https://mathshistory.st-andrews.ac.uk/Biographies/Fibonacci/) at the University of St Andrews records where the sequence entered European mathematics: Leonardo of Pisa published *Liber Abaci* in 1202, a book whose larger contribution was introducing the Hindu-Arabic place-value decimal system and Arabic numerals to European readers. A problem in its third section, about the reproduction of rabbits, generates the sequence in which each number is the sum of the two preceding numbers. The problem was an illustration, not the point of the book.

## Change the seeds, get a different sequence

Keep the rule and start from 2 and 1 instead of 0 and 1. The OEIS catalogues the result as [A000032](https://oeis.org/A000032), the Lucas numbers:

2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123, 199

Check a couple by hand: 3 + 4 = 7, 4 + 7 = 11, 7 + 11 = 18. Same rule, entirely different list. This is the cleanest demonstration available that recursion is a rule *plus* an initial condition, and it is the reason a puzzle that uses "add the previous two" is not automatically a Fibonacci puzzle. In [the sequence puzzle catalogue](/blog/number-sequence-puzzles-explained/), a solver who assumes Fibonacci on seeing the rule will get every term wrong from the first one onwards.

## Recursive shapes other than "add the previous two"

The family is much wider than its famous member. Three worth recognising, all worked through here:

**Double and add one.** 1, 3, 7, 15, 31, 63. Each term is twice the previous one plus 1. It is also 2ⁿ − 1 for n = 1, 2, 3 and so on, which makes it a useful reminder that a sequence can have both a recursive description and a position formula, and that they are equally correct.

**Multiply by the position.** 1, 2, 6, 24, 120, 720. Each term multiplies the previous one by its own index: 1 × 2, 2 × 3, 6 × 4, 24 × 5, 120 × 6. The ratios here are 2, 3, 4, 5, 6 — not constant, but forming an arithmetic sequence of their own, which is the tell.

**Sum of the previous three.** Start at 1, 1, 2 and add the last three each time: 1, 1, 2, 4, 7, 13, 24, 44. Verify one: 4 + 7 + 13 = 24. Rules that look back three or more places are common in puzzle sets precisely because solvers only ever test pairs.

The general diagnostic, and the reason recursion sits third in the procedure, is that it is what remains after differences and ratios have both failed. If the difference row is not constant and the ratio row is not constant, start asking whether terms are being built from each other. If none of the three works, [the difference-table method](/blog/finding-the-rule-in-a-number-pattern/) is the next tool, and [a constant ratio hiding behind an awkward first term](/blog/geometric-sequences-explained/) is worth ruling out too.

## The golden ratio: what is demonstrable, and what is decoration

Divide consecutive Fibonacci numbers and the answers close in on a fixed value:

13 ÷ 8 = 1.625, 21 ÷ 13 ≈ 1.6154, 34 ÷ 21 ≈ 1.6190, 55 ÷ 34 ≈ 1.6176, 89 ÷ 55 ≈ 1.6182

The values alternate above and below and the gaps shrink each time. The limit is the golden ratio, φ = (1 + √5)/2 ≈ 1.6180339887. NRICH's article on [the golden ratio, Fibonacci numbers and continued fractions](https://nrich.maths.org/articles/golden-ratio-fibonacci-numbers-and-continued-fractions) by Toni Beardon shows the convergence and its connection to the iteration φ = 1 + 1/φ, and notes that a general Fibonacci-style sequence is geometric exactly when its first two terms stand in the ratio 1 : ±φ.

The same convergence happens with Lucas numbers: 76 ÷ 47 ≈ 1.6170, and 123 ÷ 76 ≈ 1.6184. That is expected, because the convergence is a property of the recurrence, not of the particular seeds.

That much is mathematics and it holds. A great deal of what is written about the golden ratio elsewhere — that it governs the proportions of classical architecture, the composition of famous paintings, or the shape of the human body — rests on much weaker evidence, involves considerable freedom in choosing what to measure, and is disputed. We are not repeating those claims here. The convergence above is the durable part.

## Practising recursion without pen and paper

Recursive sequences are unusually demanding to hold in your head, because you are carrying two or three live values and updating them at every step. That is a working-memory load rather than an arithmetic one, and [what working memory is and what training does to it](/blog/working-memory-and-training/) covers the distinction properly. Speeding up the addition itself helps, which is the argument in [the mental math methods guide](/blog/mental-math-training-guide/).

Mental Math & Memory Games, our own app built by Reign Creative, drills both halves separately. The 75-second Number Pattern Challenge is the rule-finding drill, while Running Total Memory — a memory mode where numbers appear one at a time and you hold the total — trains the carry-a-value-forward habit that recursion demands. Being plain about what is not there: the app ships no figural or matrix items and no logic-grid puzzles, and none of its modes is an assessment of any kind. It tracks score, accuracy, streak, response time and personal bests on its own drills, and that is the extent of what its numbers mean. The [app page](/apps/mental-math-memory-games/) lists the modes; more of this subject is in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/) and the [education and brain training section](/blog/category/education-brain/).
