---
{
  "title": "Finding the Rule: Difference Tables and Second Differences",
  "metaTitle": "Number Pattern Rules: Difference Tables",
  "description": "A mechanical method for finding the rule behind a number pattern when inspection fails, using difference tables, constant rows and degree counting.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "number patterns",
    "difference tables",
    "nth term",
    "problem solving",
    "polynomials"
  ],
  "primaryKeyword": "number pattern rules",
  "secondaryKeywords": [
    "number sequence rules",
    "second differences",
    "finite difference method",
    "how to find the nth term",
    "polynomial sequence rule"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you find the rule of a number pattern",
    "what do second differences tell you",
    "how to find the nth term of a quadratic sequence"
  ],
  "aiSearchQuestions": [
    "How do I find the rule behind a number pattern?",
    "What do second differences tell you about a sequence?",
    "How do you get the formula from a difference table?"
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
    "estimation-techniques-explained"
  ],
  "takeaways": [
    "A difference table turns rule-finding from a guessing game into a procedure: subtract consecutive terms, then keep subtracting until a row goes constant.",
    "The row number where the table goes constant is the degree of the polynomial rule — row one means linear, row two means quadratic, row three means cubic.",
    "You can extend a sequence from the table alone, by adding the constant row back up through the table, without ever finding the formula.",
    "To get the formula, divide the constant row by the factorial of its row number to obtain the leading coefficient, subtract that term, and repeat on what is left.",
    "A table that never goes constant means the rule is not polynomial — switch to testing for a constant ratio, recursion or two interleaved sequences."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a difference table?",
      "answer": "It is the sequence written out with the gaps between consecutive terms underneath it, then the gaps between those gaps underneath again, and so on. Each row has one fewer entry than the row above. The point is to keep going until a row becomes constant, because that tells you what kind of rule generated the original list and lets you extend it reliably."
    },
    {
      "question": "What do second differences tell you?",
      "answer": "A constant second-difference row means the rule is a quadratic in the position number. It also gives you the leading coefficient directly: divide the constant by 2, since 2 is 2 factorial. For a sequence whose second differences are all 4, the rule contains 2n squared, and subtracting that leaves a simpler sequence you can finish by inspection."
    },
    {
      "question": "Can you extend a sequence without finding the formula?",
      "answer": "Yes, and it is usually faster. Extend the constant row by one entry, then work upwards, adding each row's new value to the last entry of the row above. For 3, 8, 17, 30, 47 the second differences are a constant 4, so the next first difference is 17 + 4 = 21, and the next term is 47 + 21 = 68. No algebra was required at any point."
    },
    {
      "question": "What if the difference table never settles?",
      "answer": "Then the rule is not a polynomial in the position number, and further rows will not help. Switch tests: divide consecutive terms to check for a constant ratio, try building each term from the two or three before it to check for recursion, and split the sequence by odd and even positions to check for two interleaved strands."
    }
  ],
  "sources": [
    {
      "title": "Divided Differences",
      "publisher": "NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/articles/divided-differences",
      "accessed": "2026-09-21"
    },
    {
      "title": "Sequences and Series",
      "publisher": "Centre for Education in Mathematics and Computing, University of Waterloo",
      "url": "https://cemc.uwaterloo.ca/sites/default/files/documents/2024/SequencesSeries.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "Finite Differences (CS 418 course text)",
      "publisher": "The Grainger College of Engineering, University of Illinois Urbana-Champaign",
      "url": "https://courses.grainger.illinois.edu/cs418/fa2025/text/finite-differences.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "Quadratic Patterns",
      "publisher": "NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/problems/quadratic-patterns",
      "accessed": "2026-09-21"
    }
  ]
}
---

**When you cannot see the rule behind a number pattern, stop looking and build a difference table.** Write the gaps between consecutive terms underneath the sequence, then the gaps between those gaps, and keep going. The row where the table goes constant tells you what kind of rule produced the list, and it lets you extend the sequence correctly without ever writing down a formula.

This is the most transferable technique in [the number sequence puzzle catalogue](/blog/number-sequence-puzzles-explained/). That guide classifies the rule families; this one is the algorithm to reach for when classification by eye has failed.

## The table, step by step

Take 3, 8, 17, 30, 47. Lay it out with each row of differences shifted half a place right, so each entry sits between the two it came from.

| Row | Values |
| --- | --- |
| Sequence | 3, 8, 17, 30, 47 |
| First differences | 5, 9, 13, 17 |
| Second differences | 4, 4, 4 |

The table above shows the sequence and the two rows of differences derived from it. The second row is constant, so the table has settled at depth two.

T. W. Körner's NRICH article on [divided differences](https://nrich.maths.org/articles/divided-differences) states the general result behind this: repeatedly differencing a polynomial of degree m produces a row of zeros after at most m + 1 passes. The University of Illinois course text on [finite differences](https://courses.grainger.illinois.edu/cs418/fa2025/text/finite-differences.html) puts the same fact the other way round — the finite difference of any polynomial is a polynomial of one lower degree — which is why repeated differencing walks the degree down to a constant and then to zero.

## Reading the degree off the constant row

The row number where the table settles is the degree of the rule.

- Constant at row one: the rule is linear, and the sequence has a constant difference.
- Constant at row two: the rule is quadratic.
- Constant at row three: the rule is cubic.

For 3, 8, 17, 30, 47, constancy at row two means a quadratic rule. That single fact eliminates every other family at once — the sequence is not geometric, not recursive, and not two strands interleaved — and it took three subtractions to establish.

## Extending without the formula

You often do not need the rule at all. Extend the constant row by one entry, then work back up, adding each new entry to the last value of the row above.

The second differences continue 4, 4, 4, **4**. So the next first difference is 17 + 4 = **21**. So the next term is 47 + 21 = **68**.

That is the whole procedure for "what comes next", and it is both faster and less error-prone than deriving a formula and substituting into it. It also generalises: if the table settles at row three, add the constant into the third row, carry it up to the second, then to the first, then to the sequence.

## Getting the actual formula

When you do want the rule, the constant row gives you the leading coefficient directly. Divide the constant by the factorial of its row number.

For our example, the second differences are 4, and 2 factorial is 2, so the leading term is (4 ÷ 2)n² = 2n². Now subtract that term from the sequence, position by position:

- 2n² at n = 1 to 5 is 2, 8, 18, 32, 50.
- Sequence minus 2n²: 3 − 2 = 1, 8 − 8 = 0, 17 − 18 = −1, 30 − 32 = −2, 47 − 50 = −3.

What remains is 1, 0, −1, −2, −3, which is a constant-difference sequence with d = −1 and first term 1 — so it equals 2 − n, using [the nth-term rule for a constant-difference sequence](/blog/arithmetic-sequences-explained/).

The full rule is therefore **2n² − n + 2**. Check every term you were given, not just one: n = 1 gives 2 − 1 + 2 = 3; n = 2 gives 8 − 2 + 2 = 8; n = 3 gives 18 − 3 + 2 = 17; n = 4 gives 32 − 4 + 2 = 30; n = 5 gives 50 − 5 + 2 = 47. All correct. At n = 6 it gives 72 − 6 + 2 = **68**, which agrees with the table-based answer, as it must.

NRICH's [quadratic patterns](https://nrich.maths.org/problems/quadratic-patterns) material approaches the same territory from the other direction, asking solvers to express a pattern numerically, in words, algebraically and diagrammatically — a useful discipline, because a rule you can only state as a formula is a rule you have not fully understood.

## A cubic, to show the method scales

Take 0, 6, 24, 60, 120, 210.

- First differences: 6, 18, 36, 60, 90
- Second differences: 12, 18, 24, 30
- Third differences: 6, 6, 6

Constant at row three, so the rule is cubic. The leading coefficient is 6 ÷ 3! = 6 ÷ 6 = 1, giving n³. Subtracting n³ (1, 8, 27, 64, 125, 216) from the sequence leaves −1, −2, −3, −4, −5, −6, which is −n.

The rule is **n³ − n**. At n = 7 that gives 343 − 7 = **336**. The table agrees: the next third difference is 6, so the next second difference is 36, the next first difference is 90 + 36 = 126, and the next term is 210 + 126 = 336.

## When the table refuses to settle

A table that keeps producing new, non-constant rows is telling you the rule is not a polynomial in the position number. Differencing further will not rescue it.

Three specific alternatives, in the order worth testing. Divide consecutive terms, which detects [a constant ratio](/blog/geometric-sequences-explained/) — and note that differencing a geometric sequence produces another geometric sequence, so the table can look "almost" settled forever. Try building each term from the two or three before it, which detects [recursion](/blog/fibonacci-and-recursive-sequences/). Split the sequence into odd and even positions, which detects two interleaved strands.

There is also a limit worth stating honestly. A constant row proves the data you have is *consistent* with a polynomial of that degree; it does not prove the setter used that rule. [Why a sequence puzzle can have more than one defensible answer](/blog/sequences-with-more-than-one-answer/) sets out why, and it is not a technicality.

## Practising the procedure

The method is mechanical, so what limits you is arithmetic speed and the reliability of your subtraction — a slipped sign one row down corrupts everything above it. Sanity-checking magnitudes as you go, in the way described in [estimation techniques that make mental math useful](/blog/estimation-techniques-explained/), catches most of those before they propagate, and the broader speed work in [the mental math methods guide](/blog/mental-math-training-guide/) makes the table cheap enough to build casually.

Mental Math & Memory Games, our own app from Reign Creative, ships the drills for that underlying arithmetic — Subtraction Sprint and Mixed Operations for the table itself, and the 75-second Number Pattern Challenge for rule-finding. Two things it does not ship, stated plainly: there are no figural or matrix items and no logic-grid puzzles in it, and none of its modes is a test or an assessment. It records score, accuracy, streak and response time on its own drills, nothing more. See the [app page](/apps/mental-math-memory-games/) for what is in it, the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/) for the rest of this subject, and the [education and brain training section](/blog/category/education-brain/) for everything else.
