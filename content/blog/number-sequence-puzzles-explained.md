---
{
  "title": "Number Sequence Puzzles, Explained From the Rule Up",
  "metaTitle": "Number Sequence Puzzles: Find the Rule",
  "description": "A catalogue of the rule types behind number sequence puzzles, a first-pass procedure that beats guessing, and the honest limit of every such puzzle.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "number sequences",
    "pattern puzzles",
    "problem solving",
    "mental math",
    "logic puzzles"
  ],
  "primaryKeyword": "number sequence puzzles",
  "secondaryKeywords": [
    "number sequence puzzles with answers",
    "number pattern puzzles",
    "how to solve number sequences",
    "number series questions",
    "sequence puzzle types"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you find the rule in a number sequence",
    "what are the types of number sequences",
    "what comes next in a number sequence and why",
    "do number sequence puzzles have one answer"
  ],
  "aiSearchQuestions": [
    "How do I solve a number sequence puzzle?",
    "What are the main types of number sequence rules?",
    "Does a number sequence puzzle always have one correct answer?"
  ],
  "demandTier": "unverified-high",
  "hubs": [
    "logic-and-pattern-puzzles"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "mental-math-tricks-that-work",
    "mental-math-training-guide",
    "working-memory-and-training"
  ],
  "takeaways": [
    "A number sequence puzzle asks you to recover the rule that generated a list and apply it once more, so the work is rule-finding rather than arithmetic.",
    "Almost every sequence you will meet belongs to one of six families: constant difference, constant ratio, recursive, interleaved, polynomial, and position or digit rules.",
    "Build a difference table before you guess. Subtracting consecutive terms costs seconds and immediately rules out or confirms the two largest families.",
    "If differences are not constant, divide instead of subtract; if ratios are not constant either, test whether each term is built from earlier terms.",
    "No finite list of numbers determines a unique continuation. Puzzles are answerable only because of a shared convention that the intended rule is the simplest one consistent with the terms shown."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the fastest way to start a number sequence puzzle?",
      "answer": "Write the differences between consecutive terms underneath the sequence before you try to see anything. If those differences are all the same, the rule adds a constant and you are finished in seconds. If they grow steadily, take differences again. Only when the difference table refuses to settle should you switch to dividing consecutive terms to test for a constant ratio."
    },
    {
      "question": "How do I know whether a sequence is arithmetic or geometric?",
      "answer": "Subtract, then divide. An arithmetic sequence has a constant difference between consecutive terms, so 4, 11, 18, 25 is arithmetic with a difference of 7. A geometric sequence has a constant ratio, so 6, 18, 54, 162 is geometric with a ratio of 3. Running both tests takes under half a minute and settles the question without any guesswork."
    },
    {
      "question": "Can a number sequence puzzle have more than one correct answer?",
      "answer": "Mathematically, yes. Any finite list of numbers can be continued by infinitely many different rules, so the next term is never forced by the data alone. Puzzles work because the setter fixes a rule in advance and everyone agrees that the intended answer is the simplest rule that fits the terms shown. That convention is the whole reason the question is answerable."
    },
    {
      "question": "Do number sequence puzzles measure intelligence?",
      "answer": "No. Solving sequence puzzles is a specific skill that improves with exposure to the common rule families, much like recognising chess openings. Standardised psychological assessment is a separate activity with published norms, a manual and qualified administration. A puzzle you solve on your phone is practice or entertainment, and reading anything further into a score is not supported."
    }
  ],
  "sources": [
    {
      "title": "Welcome to the On-Line Encyclopedia of Integer Sequences",
      "publisher": "The OEIS Foundation Inc.",
      "url": "https://oeis.org/wiki/Welcome",
      "accessed": "2026-09-21"
    },
    {
      "title": "Pattern Sniffing",
      "publisher": "NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/articles/pattern-sniffing",
      "accessed": "2026-09-21"
    },
    {
      "title": "Sequences and Series",
      "publisher": "Centre for Education in Mathematics and Computing, University of Waterloo",
      "url": "https://cemc.uwaterloo.ca/sites/default/files/documents/2024/SequencesSeries.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "A000127: Maximal number of regions obtained by joining n points around a circle by straight lines",
      "publisher": "The On-Line Encyclopedia of Integer Sequences, OEIS Foundation Inc.",
      "url": "https://oeis.org/A000127",
      "accessed": "2026-09-21"
    }
  ]
}
---

**A number sequence puzzle gives you a list of numbers and asks for the next one. The real task is not arithmetic — it is recovering the rule that produced the list, then applying that rule once more.** Almost every sequence you will meet in a puzzle book, an aptitude paper or a phone game belongs to one of six rule families, and there is a first-pass procedure that identifies the family far faster than staring at the numbers does.

This guide is the entry point for everything else in the [logic and pattern puzzles](/blog/topics/logic-and-pattern-puzzles/) collection. It covers the families, the procedure, and the caveat that most puzzle sources leave out: a finite list of numbers never has one mathematically forced continuation.

## Build a difference table before you guess

The single most useful habit is mechanical. Write the sequence down, then write the gaps between consecutive terms underneath it, shifted half a place to the right. That row is the first differences. If it is constant, you are finished. If it is not constant, take differences of that row too.

Take 3, 8, 17, 30, 47:

- First differences: 5, 9, 13, 17
- Second differences: 4, 4, 4

The second row is constant, which tells you immediately that the generating rule is a quadratic in the position number, and that the next first difference must be 21. The next term is 47 + 21 = **68**. You have not guessed anything, and you did not need to find the formula to extend the list. NRICH's [pattern sniffing](https://nrich.maths.org/articles/pattern-sniffing) material makes the same point from the teaching side: pattern spotting becomes reliable only when a learner has a reason for what they are seeing, rather than a hunch.

Differences cost seconds and rule out or confirm the two largest families straight away. Guessing costs the whole puzzle when you guess wrong.

## The six rule families

Nearly everything reduces to these. Each example below is original and worked through in full.

**1. Constant difference (arithmetic).** Each term adds the same amount. In 7, 12, 17, 22, 27 the difference is 5 throughout, so the next term is 32. The [full treatment of the constant-difference family](/blog/arithmetic-sequences-explained/) derives the nth-term rule rather than asserting it.

**2. Constant ratio (geometric).** Each term multiplies by the same amount. In 5, 15, 45, 135 the ratio is 3, so the next term is 405. The diagnostic move here is division, not subtraction — a difference table on a geometric sequence produces another geometric sequence and never settles. Negative ratios and ratios below 1 behave differently enough to justify [a separate article on constant-ratio sequences](/blog/geometric-sequences-explained/).

**3. Recursive.** Each term is built from earlier terms rather than from its position. In 2, 5, 7, 12, 19 each term after the second is the sum of the two before it: 2 + 5 = 7, 5 + 7 = 12, 7 + 12 = 19, so the next term is 12 + 19 = **31**. Recursion is the third thing to test, because it explains sequences where neither differences nor ratios are constant. [Fibonacci and the wider recursive family](/blog/fibonacci-and-recursive-sequences/) cover the variants.

**4. Interleaved.** Two independent sequences are woven together, and the puzzle looks chaotic until you split it. In 3, 100, 6, 90, 12, 80, 24, 70 the odd positions are 3, 6, 12, 24 (doubling) and the even positions are 100, 90, 80, 70 (subtracting 10). The ninth term belongs to the doubling strand, so it is **48**. The tell is a sequence that rises and falls alternately, or one whose differences alternate in sign without settling.

**5. Polynomial.** The rule is a formula in the position number of degree two or higher. The 3, 8, 17, 30, 47 example above is one; so is 2, 6, 12, 20, 30, where the terms are n(n + 1) and the second differences are a constant 2. Difference tables are the general-purpose tool for this family, and [the difference-table procedure](/blog/finding-the-rule-in-a-number-pattern/) turns it into an algorithm.

**6. Position and digit rules.** The rule refers to something other than the previous terms. In 1, 2, 6, 24, 120 the ratios are 2, 3, 4, 5 — each term multiplies by its own position, so the next term is 120 × 6 = **720**. Other members of this family use digit counts, digit sums, or the number's written form. These are the hardest to spot because the difference table gives no help at all; the signal is usually that the terms grow far too fast, or far too irregularly, for the first five families.

## A worked example, start to finish

Take 4, 6, 12, 14, 28, 30. Run the procedure rather than the intuition.

Differences: 2, 6, 2, 14, 2. Not constant, and the alternation is the clue — every second gap is exactly 2. Ratios: 1.5, 2, 1.167, 2, 1.07. Also not constant, but a 2 appears in the same alternating positions.

Split the sequence by position. Odd positions give 4, 12, 28. Even positions give 6, 14, 30. Neither strand is obviously arithmetic or geometric, but the two strands are related: each even-position term is 2 more than the odd-position term before it (4 + 2 = 6, 12 + 2 = 14, 28 + 2 = 30), and each odd-position term is double the even-position term before it (6 × 2 = 12, 14 × 2 = 28).

So the operations alternate: add 2, then double, then add 2 again. Continuing from 30, doubling gives **60**, and adding 2 gives 62. Check the rule against every term you were given before you commit to it — that check is the part people skip, and it is the part that catches a rule that happens to fit the last two terms only.

## No finite sequence has a unique continuation

This is the honest caveat, and it matters more than it first appears. For any finite list of numbers, and for any value you would like to come next, a rule exists that produces the given terms and then that value. The classic demonstration is the sequence 1, 2, 4, 8, 16. Doubling says 32. But the number of regions a circle is cut into when you join n points on its edge by straight lines runs 1, 2, 4, 8, 16, 31, 57, 99 — catalogued in the On-Line Encyclopedia of Integer Sequences as [A000127](https://oeis.org/A000127), with the closed formula (n⁴ − 6n³ + 23n² − 18n + 24)/24. Both rules fit the first five terms perfectly. Only one of them is "obvious", and obviousness is a convention, not a proof.

A puzzle is therefore answerable because its setter fixed a rule in advance and because solvers agree to prefer the simplest rule consistent with what is shown. [Why a sequence puzzle can have more than one defensible answer](/blog/sequences-with-more-than-one-answer/) develops that point properly. For now, the practical consequence is modest and useful: when your rule fits every term shown and is simple, submit it, and do not assume that a different published answer means you were wrong about the mathematics.

## Where practice fits, and what it is not

Rule-finding gets faster with exposure, because the six families above are a small catalogue and recognition replaces search. That is the same mechanism that makes memorised times tables useful, as [the mental math methods guide](/blog/mental-math-training-guide/) sets out, and it is the sense in which the [broader collection of mental arithmetic techniques](/blog/mental-math-tricks-that-work/) is worth drilling.

Mental Math & Memory Games, our own app built by Reign Creative, ships one drill aimed squarely at this skill: Number Pattern Challenge, a 75-second mode with Easy, Medium and Hard settings in which you identify a rule and supply a missing value. Its technique library includes a pattern-recognition entry whose premise is simply that spotting the pattern replaces calculating it. To be plain about the limits: the app's pattern work is numeric only. There are no shape or figural items, no matrix grids and no logic-grid puzzles in it, so it is practice for one dimension of this subject rather than all of it. It is also a game, not an assessment — it records score, accuracy, streak and response time on its own drills and makes no claim about intelligence. You can see the full mode list on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and the wider question of what a reasoning score does and does not represent is covered in [what IQ tests actually measure](/blog/what-iq-tests-actually-measure/).

If holding several intermediate values while you test a rule is the part that breaks down, that is a capacity problem rather than a pattern problem, and [working memory and what training does to it](/blog/working-memory-and-training/) is the better next read. More of this subject is collected in the [education and brain training section](/blog/category/education-brain/).
