---
{
  "title": "Lattice and Line Multiplication: Two Grid Methods, One Idea",
  "metaTitle": "Lattice and Line Multiplication Methods",
  "description": "The lattice grid and the crossing-lines trick are the same place-value bookkeeping in two costumes. Here is how each works, and where both stop being useful.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "mental math",
    "multiplication",
    "place value",
    "history of mathematics"
  ],
  "primaryKeyword": "lattice multiplication method",
  "secondaryKeywords": [
    "line multiplication method",
    "stick multiplication",
    "lattice method explained",
    "grid multiplication",
    "napier's bones"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how does lattice multiplication work",
    "why do the diagonals work in lattice multiplication",
    "how does the line multiplication trick work",
    "when does line multiplication stop working"
  ],
  "aiSearchQuestions": [
    "How does lattice multiplication work?",
    "Why do you add along the diagonals?",
    "How does the crossing-lines multiplication trick work?",
    "Are grid multiplication methods useful for mental arithmetic?"
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
    "cross-multiplication-in-one-pass",
    "mental-math-training-guide"
  ],
  "takeaways": [
    "Lattice multiplication and line multiplication compute the same thing: every digit-by-digit product, sorted into columns by place value, then totalled with carries.",
    "The diagonals in a lattice are not decoration — each diagonal collects the cells whose place values are equal, which is why reading along them produces the digits of the answer.",
    "Line multiplication counts intersections, so it collapses as soon as a digit is large: a digit pair of 8 and 9 asks you to count 72 crossings by eye.",
    "Both methods need paper and both are slower than a good mental method, which makes them teaching devices for place value rather than calculation shortcuts.",
    "Napier's bones, published in 1617 and held in museum collections today, mechanise the lattice layout so that multiplication requires only addition along the diagonals."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How does lattice multiplication work?",
      "answer": "You draw a grid with one digit heading each column and each row, write the product of the two digits in every cell split by a diagonal, then add along the diagonals from the bottom right, carrying leftwards. The digits you read off in order are the answer."
    },
    {
      "question": "Why do you add along the diagonals?",
      "answer": "Because each diagonal groups the cells with the same place value. A tens digit multiplied by a units digit contributes to the tens column, and every cell that does so lies on the same diagonal, so adding along it is the same as totalling one place-value column."
    },
    {
      "question": "Does line multiplication work for any numbers?",
      "answer": "It is correct for any digits but unusable for large ones. The count at each crossing group is the product of two digits, so 8 and 9 means counting 72 intersections, which is slower and far more error-prone than simply recalling that 8 times 9 is 72."
    },
    {
      "question": "Are these methods worth learning as an adult?",
      "answer": "As calculation methods, rarely — both need paper and both are slower than a good mental method. As explanations they are valuable, because they make the place-value structure of multiplication visible in a way the column algorithm hides."
    }
  ],
  "sources": [
    {
      "title": "Napier's rods",
      "publisher": "MacTutor History of Mathematics, University of St Andrews",
      "url": "https://mathshistory.st-andrews.ac.uk/Extras/Napier_rods/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Napier's Bones (object 1905-111)",
      "publisher": "Science Museum Group Collection",
      "url": "https://collection.sciencemuseumgroup.org.uk/objects/co60130/napiers-bones",
      "accessed": "2026-09-21"
    },
    {
      "title": "Multiplication Series: Illustrating Number Properties With Arrays",
      "publisher": "Way, J., NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/articles/multiplication-series-illustrating-number-properties-arrays",
      "accessed": "2026-09-21"
    }
  ]
}
---

Lattice multiplication and the crossing-lines trick look nothing alike, and they are the same method. Both compute every digit-by-digit product, sort those products into columns by place value, and total the columns with carries. The lattice sorts them with diagonals; the lines sort them by position on the page. Neither is a mental method — both need paper — and both are better understood as ways of making place value visible than as shortcuts.

## The one idea underneath both

Multiplying 47 by 36 means multiplying every digit of one number by every digit of the other and keeping track of what each product is worth. There are four such products, and their worth is fixed by the places the digits came from.

The table below lists the four digit products in 47 × 36 with the place value each carries.

| Digits | Product | Places multiplied | Contribution |
| --- | --- | --- | --- |
| 4 × 3 | 12 | tens × tens | 1,200 |
| 7 × 3 | 21 | units × tens | 210 |
| 4 × 6 | 24 | tens × units | 240 |
| 7 × 6 | 42 | units × units | 42 |

Totalling the right-hand column: 1,200 + 210 + 240 + 42 = **1,692**.

Every grid method is a device for organising that table so you do not have to think about the place values explicitly. The organisation is the whole contribution; the arithmetic is unchanged.

## The lattice, cell by cell

Draw a two-by-two grid. Head the columns with 4 and 7, the digits of 47. Head the rows with 3 and 6, the digits of 36. Split each cell with a diagonal running from its top right to its bottom left.

In each cell write the product of that cell's column digit and row digit, tens above the diagonal and units below. Cell (3, 4) holds 12 as 1 and 2. Cell (3, 7) holds 21 as 2 and 1. Cell (6, 4) holds 24 as 2 and 4. Cell (6, 7) holds 42 as 4 and 2.

Now add along the diagonal strips, starting at the bottom right:

- The rightmost strip holds only the units of 42: **2**.
- The next strip holds the tens of 42, the units of 21 and the units of 24: 4 + 1 + 4 = **9**.
- The next holds the tens of 21, the tens of 24 and the units of 12: 2 + 2 + 2 = **6**.
- The last holds the tens of 12: **1**.

Read them in order: **1,692**.

Compare that with the place-value table above. The second strip totals 9 tens; the table's tens contributions are 21 and 24, whose units digits are 1 and 4, plus the 4 tens carried out of 42. The diagonals *are* the place-value columns. That is the entire justification, and it is also why a strip summing to more than nine carries into the next strip exactly as a column addition would.

NRICH's work on arrays makes the same structure visible in a different picture: partitioning an array along one factor turns a single multiplication into a set of smaller rectangles whose areas add up, which is what each lattice cell represents.

## Line multiplication, and what the intersections count

For 21 × 13, draw two parallel lines for the 2, then a gap, then one line for the 1 — that is 21. Across them, draw one line for the 1, a gap, then three lines for the 3 — that is 13. The lines cross in three visually distinct clusters: left, middle and right.

- **Left cluster:** 2 lines crossing 1 line = 2 intersections.
- **Middle cluster:** 2 crossing 3, plus 1 crossing 1 = 6 + 1 = 7 intersections.
- **Right cluster:** 1 crossing 3 = 3 intersections.

Read them: **273**. Which is 21 × 13.

The clusters are the same three columns as before: tens × tens on the left, the two cross terms in the middle, units × units on the right.

Carries work the same way. For **24 × 32**: left is 2 × 3 = 6, middle is (2 × 2) + (4 × 3) = 4 + 12 = 16, right is 4 × 2 = 8. Writing 6 | 16 | 8 and carrying the 1 out of the middle gives 7 | 6 | 8, or **768**.

## Where line multiplication falls apart

Counting intersections is only cheap when the digits are small. Take **89 × 97**:

- Left cluster: 8 × 9 = 72 intersections.
- Middle cluster: (8 × 7) + (9 × 9) = 56 + 81 = 137 intersections.
- Right cluster: 9 × 7 = 63 intersections.

Assembling with carries: the right column gives 3 and carries 6; the middle becomes 137 + 6 = 143, giving 3 and carrying 14; the left becomes 72 + 14 = 86. The answer is **8,633**, which checks out as 8,900 − 267.

But nobody counted 137 crossings. Anyone who gets this right did the multiplications and used the lines as a diagram. That is the honest limit of the method: it works as an illustration for digits up to about four, and above that it is a slower way of writing down products you already know. The same is true of the lattice to a lesser degree — it stays usable at any digit size, but it needs a drawn grid, so it competes with written long multiplication rather than with mental arithmetic.

## The grid in a museum case

The lattice layout was mechanised in 1617, when John Napier published a set of numbered rods in a work titled *Rabdologia*. Each rod carries a digit at the top and that digit's multiples down its length, every multiple written in a square split by a diagonal exactly as a lattice cell is. Laying out rods for one number and reading across the row for a digit of the other gives all the partial products at once, and the user adds within the diagonal parallelograms from right to left.

MacTutor's account at the University of St Andrews records the device's mechanics and its publication, and the Science Museum Group's collection description of a set made in England around 1690 puts the point plainly: the multiples are read off by adding the digits in each parallelogram, so multiplication is reduced to addition. Sets in wood, brass and ivory survive in museum collections, and the instrument stayed in use for a long time after its invention.

The names attached to these methods travel badly. "Gelosia" refers to a window grating, after the grid's appearance; line multiplication is popularly associated with Japanese classrooms and with videos that circulated widely online. Those are labels rather than documented origins, and grid arrangements of this kind appear across several mathematical traditions, so it is safer to describe what the method does than to assign it a birthplace.

## What these are actually good for

Neither belongs in a mental toolkit. What they are good for is teaching: both make it impossible to lose track of place value, because place value is what the geometry encodes. A learner who has drawn a lattice for 47 × 36 has seen why 4 × 3 is worth 1,200, which the column algorithm asks them to take on trust.

For actual speed, the methods worth drilling are the ones that exploit the specific numbers in front of you — doubling and halving, near-round-number products, squaring a number ending in five — collected in [multiplication shortcuts and why they work](/blog/multiplication-shortcuts-explained/). For awkward two-digit products with no exploitable structure, the single-pass column method in [vertically and crosswise multiplication](/blog/cross-multiplication-in-one-pass/) does the same job as a lattice with nothing written down.

## Where the app fits

Mental Math & Memory Games, our own app at Reign Creative, has no drawing surface and no grid-multiplication mode; you cannot sketch a lattice or draw lines in it, and it would not be a useful thing for a timed drill to ask. What it does carry is both methods in its technique library, each written out with its steps, a worked example and a named common mistake, alongside the arithmetic drills where the underlying facts get practised — Multiplication Rush across difficulties from the 1–9 tables up to two-digit by two-digit products, and the untimed Accuracy Trainer for working slowly with an explanation available. The full catalogue is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/).

If you are learning these to help someone else understand multiplication, draw them on paper and keep the app for the fact practice that makes any method fast. The order in which methods are worth building is in the [mental math practice guide](/blog/mental-math-training-guide/), with the rest of this material in the [mental math topic hub](/blog/topics/mental-math/) and under [education and brain training articles](/blog/category/education-brain/).
