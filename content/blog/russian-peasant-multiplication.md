---
{
  "title": "Russian Peasant Multiplication, and Why Dropping the Remainders Works",
  "metaTitle": "Russian Peasant Multiplication Explained",
  "description": "Halve one number, double the other, discard remainders, then add the rows where the halved side is odd. It works because that column is binary.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "tags": [
    "mental math",
    "multiplication",
    "binary",
    "history of mathematics"
  ],
  "primaryKeyword": "russian peasant multiplication",
  "secondaryKeywords": [
    "doubling and halving algorithm",
    "egyptian multiplication",
    "binary multiplication by hand",
    "peasant multiplication explained",
    "why does russian peasant work"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does russian peasant multiplication work",
    "what happens to the remainders when you halve",
    "how is russian peasant multiplication related to binary",
    "how did ancient egyptians multiply"
  ],
  "aiSearchQuestions": [
    "How does Russian peasant multiplication work?",
    "Why can you ignore the remainders when halving?",
    "Is Russian peasant multiplication the same as doubling and halving?",
    "What is the connection to binary numbers?"
  ],
  "demandTier": "unverified-medium",
  "hubs": [
    "mental-math"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "multiplication-shortcuts-explained",
    "mental-math-training-guide",
    "lattice-and-line-multiplication"
  ],
  "takeaways": [
    "This is not the doubling-and-halving shortcut that keeps the product constant at every step; here the running product changes, and the discarded remainders are the reason the method works.",
    "Halve one number repeatedly, discarding remainders, while doubling the other, then add only the doubled values whose halved partner is odd.",
    "Reading the halving column for oddness writes the first factor in binary, and each row of the doubling column is the second factor times a power of two.",
    "The algebra is two cases: if n is even, n times m equals half of n times double m, and if n is odd, it equals m plus that same expression applied to n minus one.",
    "The method needs no multiplication table above two, which is why it survives as a demonstration of binary rather than as a fast route to an answer."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How does Russian peasant multiplication work?",
      "answer": "Write the two numbers side by side. Repeatedly halve the left one, throwing away any remainder, while doubling the right one, until the left reaches one. Then cross out every row where the left number is even, and add what is left in the right column. That total is the product."
    },
    {
      "question": "Why can you throw away the remainders?",
      "answer": "Because the rows you keep pay them back. Halving an odd number loses a half of the multiplier, and that row is exactly the row you keep, so the lost amount is added in separately. The keeping rule is not a patch on the halving; the two steps are one mechanism."
    },
    {
      "question": "Is this the same as doubling and halving?",
      "answer": "No. The familiar shortcut halves one factor and doubles the other so that the product stays the same at every step, and it needs both operations to divide exactly. This method allows the product to change and repairs it by adding the rows with an odd halved value."
    },
    {
      "question": "What has it got to do with binary?",
      "answer": "The pattern of odd and even values in the halving column is the binary expansion of the first factor read from the bottom up. Each row of the doubling column is the second factor multiplied by a power of two, so adding the rows marked odd sums exactly the powers of two that make up the first factor."
    }
  ],
  "sources": [
    {
      "title": "Mathematics in Egyptian Papyri",
      "publisher": "O'Connor, J. J. & Robertson, E. F., MacTutor History of Mathematics, University of St Andrews",
      "url": "https://mathshistory.st-andrews.ac.uk/HistTopics/Egyptian_papyri/",
      "accessed": "2026-09-21"
    },
    {
      "title": "An overview of Egyptian mathematics",
      "publisher": "O'Connor, J. J. & Robertson, E. F., MacTutor History of Mathematics, University of St Andrews",
      "url": "https://mathshistory.st-andrews.ac.uk/HistTopics/Egyptian_mathematics/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Binary Squares",
      "publisher": "NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/problems/binary-squares",
      "accessed": "2026-09-21"
    }
  ]
}
---

This is not the doubling-and-halving shortcut where 14 × 35 becomes 7 × 70. That one preserves the product at every step and only works when the halving divides exactly. Russian peasant multiplication deliberately breaks the product: it halves with remainders thrown away, which changes the running value, and then repairs the damage by adding back particular rows. The discarded remainders are not a rounding error tolerated by the method — they are the mechanism.

## The procedure

Write the two numbers at the head of two columns. Halve the left one repeatedly, discarding any remainder, until it reaches 1. Double the right one the same number of times. Then keep only the rows where the left number is **odd**, and add the right-hand entries of those rows.

The table below runs the procedure for **37 × 46**, halving the left column and doubling the right until the left reaches one, with each row marked according to whether its left-hand value is odd.

| Halve | Double | Keep? |
| --- | --- | --- |
| 37 | 46 | odd — keep |
| 18 | 92 | even |
| 9 | 184 | odd — keep |
| 4 | 368 | even |
| 2 | 736 | even |
| 1 | 1,472 | odd — keep |

Adding the kept rows: 46 + 184 + 1,472 = **1,702**.

Check it independently: 37 × 46 = (37 × 40) + (37 × 6) = 1,480 + 222 = 1,702.

A second, smaller case. The same two columns for **23 × 19** produce a different pattern of kept rows, because 23 stays odd for longer on the way down.

| Halve | Double | Keep? |
| --- | --- | --- |
| 23 | 19 | odd — keep |
| 11 | 38 | odd — keep |
| 5 | 76 | odd — keep |
| 2 | 152 | even |
| 1 | 304 | odd — keep |

Total: 19 + 38 + 76 + 304 = **437**, which matches 23 × 20 − 23 = 460 − 23 = 437.

Notice what the procedure never asks for. There is no times table beyond doubling, no carrying into a partial product, and no place-value alignment. Everything is halving, doubling and addition.

## The reason: the left column is binary

Look at the left column of the 37 × 46 table and mark each row odd or even from the bottom upwards: 1 is odd, 2 is even, 4 is even, 9 is odd, 18 is even, 37 is odd. Write those as 1 and 0 from the bottom up and you get 100101, which is 37 in binary — 32 + 4 + 1.

Now look at what the rows are worth. The top row of the doubling column is 46 × 1, the next is 46 × 2, then 46 × 4, 46 × 8, 46 × 16, 46 × 32. Row *k* holds 46 × 2ᵏ.

The three rows kept were the ones at 46 × 1, 46 × 4 and 46 × 32 — the same powers of two that add to 37. So the total is 46 × (1 + 4 + 32) = 46 × 37, which is what was asked for.

The same pattern in the second example: 23 is 10111 in binary, or 16 + 4 + 2 + 1, and the kept rows were 19 × 1, 19 × 2, 19 × 4 and 19 × 16. Every binary number is a sum of distinct powers of two, exactly as every decimal number is a sum of multiples of powers of ten, which is the fact NRICH's work on binary numbers builds on. Repeated halving with remainders discarded is one of the standard ways of extracting those powers.

## The algebra, in two lines

The method also drops out of a two-case recursion, which is worth seeing because it explains the remainders directly.

If *n* is even: *n* × *m* = (*n* ÷ 2) × (2*m*). Nothing is lost, and the row contributes nothing.

If *n* is odd: *n* × *m* = *m* + ((*n* − 1) ÷ 2) × (2*m*). Halving an odd number loses half a unit of *n*, which is worth one whole *m* in the product — so that *m* is banked immediately, which is precisely the rule "keep the row when the left number is odd".

Run it on 23 × 19:

- 23 × 19 = 19 + (11 × 38)
- 11 × 38 = 38 + (5 × 76)
- 5 × 76 = 76 + (2 × 152)
- 2 × 152 = 1 × 304
- 1 × 304 = 304

Collecting the banked terms: 19 + 38 + 76 + 304 = **437**.

The recursion and the binary explanation are the same argument in different clothes. The recursion shows why each odd row owes an *m*; the binary view shows which rows those are.

## The older version: doubling in the Egyptian papyri

Multiplication by repeated doubling is recorded in ancient Egyptian mathematical papyri. MacTutor's account at the University of St Andrews sets out the procedure as it appears in the Rhind papyrus: to multiply two numbers the scribe doubles one of them repeatedly, alongside the running powers of two, then selects the doublings whose powers add to the other number and totals them. Their worked case is 41 × 59, where 32 + 8 + 1 accounts for 41 and the corresponding doubled values total 2,419.

MacTutor's comment on that procedure is the one that matters here: the multiplication is achieved with additions only, and it is a very early use of binary arithmetic. The broader overview of Egyptian mathematics makes the reason explicit — the number system in use made general multiplication and division awkward, so methods were devised that needed only addition.

The label "Russian peasant" attached to the halving-and-doubling version is a popular name of much later date, and it is worth treating as a name rather than a claim about where the method was invented. Doubling-based multiplication appears in more than one tradition, and the papyrus evidence long predates the phrase.

## When to actually use it

Rarely, for speed. For 37 × 46 the six-row table is slower than splitting into 37 × 40 plus 37 × 6, and much slower than a shortcut if the numbers offer one — near a power of ten, ending in five, or with a shared factor. The methods that genuinely save time are collected in [multiplication shortcuts and why they work](/blog/multiplication-shortcuts-explained/).

Where it earns its place is narrower and real. It is the clearest demonstration of binary representation available without a computer, it is a working multiplication algorithm for anyone whose times-table recall is unreliable above two, and it is a good exercise in why an algorithm is correct rather than merely effective. The same instinct — asking what a written procedure is actually recording — applies to the grid methods discussed in [lattice and line multiplication](/blog/lattice-and-line-multiplication/), which turn out to be place-value bookkeeping in disguise.

One practical caution: the discarded remainders make this method unforgiving of a single misread row. If you mark an odd row as even, the error is a whole power of two times the multiplier, which is large. Check the binary reading against the original number before totalling — in the first example, 32 + 4 + 1 must come back to 37.

## Where the app fits

Mental Math & Memory Games, our own app at Reign Creative, has no mode that builds this table for you; it is a pencil-and-paper algorithm, and a timed drill is the wrong container for it. What the app does carry is the method in its technique library, written out with its steps, a worked example and its named common mistake, next to the drills that make its two ingredients automatic: Multiplication Rush and Division Dash cover the doubling and halving, and the untimed Accuracy Trainer runs ten questions at a time with an explanation available when one goes wrong. The full catalogue of math and memory modes is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/).

If you want the method for its own sake, work three or four products on paper, then reconstruct the binary expansion from each table and confirm it matches the original number. That check is the method's real content. For the arithmetic that is actually worth drilling daily, the [mental math practice guide](/blog/mental-math-training-guide/) puts the methods in order, and the rest of this material sits in the [mental math topic hub](/blog/topics/mental-math/) and under [education and brain training articles](/blog/category/education-brain/).
