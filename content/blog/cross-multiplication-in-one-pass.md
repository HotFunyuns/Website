---
{
  "title": "Vertically and Crosswise: Two-Digit Products in a Single Pass",
  "metaTitle": "Vertically and Crosswise Multiplication",
  "description": "A digit-by-digit multiplication that produces the answer right to left with running carries, instead of building partial products and adding them at the end.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "mental math",
    "multiplication",
    "arithmetic strategies",
    "place value"
  ],
  "primaryKeyword": "vedic multiplication vertically and crosswise",
  "secondaryKeywords": [
    "cross multiplication pattern",
    "mental foil",
    "two digit multiplication one line",
    "digit by digit multiplication",
    "vedic maths two digit"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how does vertically and crosswise multiplication work",
    "how to multiply two digit numbers in one line",
    "why does the cross multiplication pattern work",
    "how to extend crosswise multiplication to three digits"
  ],
  "aiSearchQuestions": [
    "What is the vertically and crosswise multiplication method?",
    "How do you multiply two two-digit numbers in one pass?",
    "Why does the crosswise pattern give the right answer?",
    "Does the crosswise method work for three-digit numbers?"
  ],
  "demandTier": "unverified-high",
  "hubs": [
    "mental-math"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "multiplication-shortcuts-explained",
    "mental-math-training-guide",
    "times-tables-memorisation"
  ],
  "takeaways": [
    "Vertically and crosswise produces the digits of the answer directly, right to left, rather than building partial products and adding them at the end.",
    "For a two-digit product there are exactly three columns: the units product, the sum of the two cross products, and the tens product, each with a carry passed leftwards.",
    "The carry out of the middle column is frequently larger than nine, which is the step that catches people out and the reason the method needs practice rather than just understanding.",
    "The method is the ordinary expansion of a product with the terms sorted by place value, so it generalises to any number of digits by adding more columns.",
    "It only pays if times-table recall is instant, because the middle column needs two products and an addition before the previous carry is even applied."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the vertically and crosswise method?",
      "answer": "It is a multiplication procedure that generates the answer one digit at a time from the right. For two-digit numbers you take the product of the units digits, then the sum of the two cross products, then the product of the tens digits, carrying leftwards between the columns as you go."
    },
    {
      "question": "How is it different from the usual mental method?",
      "answer": "The familiar method splits one number into tens and ones, multiplies each part, and adds the partial products at the end. This method never forms a partial product. It computes each digit of the answer in place, which means less is held in memory but each column is a small sum rather than a single lookup."
    },
    {
      "question": "Why does the crosswise pattern give the right answer?",
      "answer": "Because expanding (10a + b)(10c + d) gives 100ac + 10(ad + bc) + bd. The three terms are the hundreds, tens and units contributions, and the three columns of the method are exactly those three terms with any overflow carried to the next column."
    },
    {
      "question": "Does it extend beyond two digits?",
      "answer": "Yes. A three-digit by three-digit product has five columns instead of three, and each column collects every pair of digits whose place values multiply to that column's place value. The bookkeeping grows quickly, which is why most people stop at three digits without writing anything down."
    }
  ],
  "sources": [
    {
      "title": "Multiplication Series: Illustrating Number Properties With Arrays",
      "publisher": "Way, J., NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/articles/multiplication-series-illustrating-number-properties-arrays",
      "accessed": "2026-09-21"
    },
    {
      "title": "An overview of Indian mathematics",
      "publisher": "O'Connor, J. J. & Robertson, E. F., MacTutor History of Mathematics, University of St Andrews",
      "url": "https://mathshistory.st-andrews.ac.uk/HistTopics/Indian_mathematics/",
      "accessed": "2026-09-21"
    },
    {
      "title": "National curriculum in England: mathematics programmes of study",
      "publisher": "Department for Education (GOV.UK)",
      "url": "https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study",
      "accessed": "2026-09-21"
    }
  ]
}
---

This is not the method where you split a number into tens and ones, multiply each piece and add the results at the end. That general approach — 43 × 27 as 40 × 27 plus 3 × 27 — is covered in [multiplication shortcuts and why they work](/blog/multiplication-shortcuts-explained/). Vertically and crosswise is a genuinely different procedure: it produces the digits of the answer one at a time, from the right, with carries running leftwards, and it never forms a partial product at all.

## The three columns

For two two-digit numbers, write the digits as *a b* and *c d*, so the numbers are 10*a* + *b* and 10*c* + *d*. The answer is built in three columns.

1. **Units column:** *b* × *d*. Write the units digit, carry the rest.
2. **Middle column:** (*a* × *d*) + (*b* × *c*), plus the carry. Write the units digit, carry the rest.
3. **Left column:** *a* × *c*, plus the carry. Write all of it.

The first is "vertically" — the two units digits, one above the other. The second is "crosswise" — the two diagonal products, added. The third is vertically again, on the tens.

**43 × 27.** Here *a* = 4, *b* = 3, *c* = 2, *d* = 7.

- Units: 3 × 7 = 21. Write **1**, carry 2.
- Middle: (4 × 7) + (3 × 2) = 28 + 6 = 34, plus the carry of 2 is 36. Write **6**, carry 3.
- Left: 4 × 2 = 8, plus the carry of 3 is 11. Write **11**.

Reading the columns: **1,161**.

**52 × 31.**

- Units: 2 × 1 = 2. Write **2**, carry 0.
- Middle: (5 × 1) + (2 × 3) = 5 + 6 = 11. Write **1**, carry 1.
- Left: 5 × 3 = 15, plus 1 is 16.

Answer: **1,612**.

## The carry that catches people out

In ordinary written multiplication a carry is a single digit. Here the middle column can overflow by a lot, because it holds two products and a carry at once.

**68 × 54.**

- Units: 8 × 4 = 32. Write **2**, carry 3.
- Middle: (6 × 4) + (8 × 5) = 24 + 40 = 64, plus 3 is 67. Write **7**, carry 6.
- Left: 6 × 5 = 30, plus 6 is 36.

Answer: **3,672**.

**97 × 86.**

- Units: 7 × 6 = 42. Write **2**, carry 4.
- Middle: (9 × 6) + (7 × 8) = 54 + 56 = 110, plus 4 is 114. Write **4**, carry 11.
- Left: 9 × 8 = 72, plus 11 is 83.

Answer: **8,342**.

A carry of 11 is not a slip. The middle column can reach 9 × 9 + 9 × 9 = 162 before any incoming carry, so carries into the teens are routine with large digits. Anyone who has internalised "carry the one" from column addition will lose digits here until that expectation is unlearned.

The independent check on 97 × 86 is the near-round-number route: 97 × 86 = 100 × 86 − 3 × 86 = 8,600 − 258 = **8,342**. Having a second method available for the same product is the practical way to catch a dropped carry.

## Why it works

Expand the product algebraically:

(10a + b)(10c + d) = 100ac + 10(ad + bc) + bd

Three terms, sorted by place value. The *bd* term contributes to the units, the (*ad* + *bc*) term to the tens, and the *ac* term to the hundreds. The three columns of the method are exactly those three terms, and the carries are what happens when a term is too large to sit in its own place.

That expansion is the distributive property applied twice, and it is the same structure visible in a partitioned array: NRICH's work on illustrating number properties with arrays shows a multiplication split along one factor so that the separate rectangles become the separate products, which is the picture this algorithm computes without drawing.

So the method is not a trick with a hidden justification. It is the standard expansion, with the terms read in a different order from the one most people are taught.

## Extending to three digits

Add columns. For a three-digit by three-digit product there are five, and each column collects every pair of digits whose place values multiply to that column's place value.

**123 × 456**, with digits (1, 2, 3) and (4, 5, 6):

- Units: 3 × 6 = 18. Write **8**, carry 1.
- Tens: (2 × 6) + (3 × 5) = 12 + 15 = 27, plus 1 is 28. Write **8**, carry 2.
- Hundreds: (1 × 6) + (2 × 5) + (3 × 4) = 6 + 10 + 12 = 28, plus 2 is 30. Write **0**, carry 3.
- Thousands: (1 × 5) + (2 × 4) = 5 + 8 = 13, plus 3 is 16. Write **6**, carry 1.
- Ten thousands: 1 × 4 = 4, plus 1 is 5.

Answer: **56,088**.

Check by splitting: 123 × 400 = 49,200 and 123 × 56 = 6,888, and 49,200 + 6,888 = 56,088.

The middle column of a three-digit product needs three products summed before the carry is applied, which is where most people stop doing this without writing the columns down. Two digits is comfortably mental; three is a paper method with a mental flavour.

## Where the name comes from

The phrase "vertically and crosswise" reaches most readers through a twentieth-century book published under the title *Vedic Mathematics*, and the method is popularly associated with that system. Treat the label as a name rather than as a provenance claim. The underlying identity is the ordinary expansion of a product, which appears wherever positional arithmetic is done, and the history of mathematics in South Asia is a field where dating and attribution genuinely are contested — MacTutor's survey of Indian mathematics is explicit about the uncertainty around sources and about the care needed before rewriting a chronology on the strength of one document.

What can be said without qualification is narrower and more useful: the method is correct, it is old in the sense that its algebra is, and nothing about its effectiveness depends on where the name came from.

## What it costs, and when to use the other method

The method's advantage is memory: you hold one carry and one column at a time, and you never hold a 1,080 while working out an 81. Its cost is that the middle column requires two table facts and an addition before the carry is applied, so it is slower than the split-and-add route unless recall is instant. If you hesitate on 7 × 8, the pause happens in the middle of holding a carry, which is the worst possible place for it. That dependency is why [what memorising the times tables actually buys you](/blog/times-tables-memorisation/) is the prerequisite article rather than a companion one.

Use vertically and crosswise when both numbers are genuinely awkward and no shortcut applies. Use the split-and-add method when one number is close to a round figure, and use a specialised shortcut — near a power of ten, ending in five, equidistant from a benchmark — whenever the numbers offer one.

## Practising it

Mental Math & Memory Games, our own app at Reign Creative, carries this method in its technique library alongside its close relatives, each with steps, a worked example and a named common mistake, and the drills to apply it in Multiplication Rush, whose difficulties climb from the 1–9 tables through 1–12, then two-digit by one-digit and two-digit by two-digit products. The untimed Accuracy Trainer is the better setting while the carry handling is still new, since a clock rewards whichever method you already had. The full catalogue is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/).

The sensible progression is to fix the table facts first, then drill two-digit by two-digit products with small digits until the three columns are automatic, then deliberately seek out the large-digit cases where the middle carry exceeds nine. The order in which the methods are worth learning is set out in the [mental math practice guide](/blog/mental-math-training-guide/); the rest of this material sits in the [mental math topic hub](/blog/topics/mental-math/) and under [education and brain training articles](/blog/category/education-brain/).
