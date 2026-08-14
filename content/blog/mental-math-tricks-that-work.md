---
{
  "title": "Mental Math Tricks That Actually Work, and the Conditions Where They Break",
  "metaTitle": "Mental Math Tricks That Actually Work",
  "description": "Base-100 multiplication, percentage reversal, unit conversion and root estimation — every method worked through, with the case where each one fails.",
  "status": "published",
  "publishedAt": "2026-08-13",
  "updatedAt": "2026-08-13",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "mental math",
    "arithmetic",
    "study methods",
    "estimation",
    "brain training"
  ],
  "primaryKeyword": "mental math tricks",
  "secondaryKeywords": [
    "fast multiplication tricks",
    "how to calculate percentages in your head",
    "estimate square root mentally",
    "divisibility rule for 7",
    "convert miles to kilometers in your head"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to multiply two numbers close to 100 in your head",
    "how to reverse a percentage increase mentally",
    "quick way to convert celsius to fahrenheit accurately",
    "why does a 20 percent drop then a 20 percent rise not cancel"
  ],
  "aiSearchQuestions": [
    "What are the most useful mental math tricks?",
    "How do I multiply numbers near 100 in my head?",
    "How do I work out the original price before a discount?",
    "How can I estimate a square root without a calculator?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "mental-math-training-guide",
    "spaced-repetition-for-language-learning",
    "world-history-timeline-guide"
  ],
  "takeaways": [
    "Every method here is ordinary algebra rearranged, which is why each one has a stated condition — a trick you cannot state the condition for is a trick you will eventually misapply.",
    "The base-100 method turns multiplication of two numbers near 100 into one subtraction and one small product, and its only awkward case is when that small product exceeds 99 and has to carry.",
    "Percentage changes multiply rather than add, which is why a 20% fall followed by a 20% rise leaves you 4% down and why reversing a change means dividing rather than subtracting.",
    "Estimating a square root well needs one guess and one averaging step; from 8, the estimate for the square root of 60 lands within about half a tenth of a percent.",
    "Speed comes from having practised a method until it is retrieval rather than reasoning, which is a training problem rather than a knowledge problem."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the fastest way to multiply two numbers near 100?",
      "answer": "Work from how far each sits below 100. For 97 x 94 the shortfalls are 3 and 6. Subtract one shortfall from the other number: 97 - 6 = 91. Multiply the shortfalls: 3 x 6 = 18. Put them together for 9,118. The only complication is when the product of the shortfalls reaches 100 or more, in which case the excess carries into the leading part."
    },
    {
      "question": "How do I find the original price before a discount?",
      "answer": "Divide rather than subtract. A price of 60 after 25% off came from 60 divided by 0.75, which is 80. Adding 25% back to 60 would give 75, which is wrong, because the 25% was taken from the larger original figure, not from the reduced one."
    },
    {
      "question": "Why does a 20% drop followed by a 20% rise not get you back to where you started?",
      "answer": "Because percentage changes multiply. Starting at 100, a 20% drop gives 80, and a 20% rise on 80 gives 96, not 100 — the rise is calculated on a smaller base than the fall was. The two only cancel if the second change is applied to the same starting figure as the first, which is not what sequential changes do."
    },
    {
      "question": "How do I estimate a square root in my head?",
      "answer": "Guess, then average your guess with the number divided by the guess. For the square root of 60, start at 8: 60 divided by 8 is 7.5, and the average of 8 and 7.5 is 7.75. That is already within about 0.05% of the true value of roughly 7.746. Repeating the step improves it further. This is Newton's method applied to square roots."
    },
    {
      "question": "Is there a divisibility test for 7?",
      "answer": "Yes. Split off the last digit, double it, and subtract the result from the number formed by the remaining digits. For 371 the last digit is 1, doubled to 2, and the remaining digits form 37, so the test gives 37 - 2 = 35. Since 35 is divisible by 7, so is 371. MathWorld lists this among several tests for 7. For longer numbers, repeat the step until the result is small enough to recognise."
    },
    {
      "question": "Does practising tricks make you better at maths generally?",
      "answer": "Practising a specific method makes you faster and more accurate at that method and at closely related problems. Broad claims beyond that are contested in the research literature, and we do not make them. Mental Math & Memory Games is built to drill arithmetic and track speed and accuracy, which is what a drill can honestly deliver."
    }
  ],
  "sources": [
    {
      "title": "Divisibility Tests",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/DivisibilityTests.html",
      "accessed": "2026-08-09"
    },
    {
      "title": "Newton's Method",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/NewtonsMethod.html",
      "accessed": "2026-08-09"
    },
    {
      "title": "Square Root",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/SquareRoot.html",
      "accessed": "2026-08-09"
    },
    {
      "title": "Binomial Theorem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/BinomialTheorem.html",
      "accessed": "2026-08-09"
    },
    {
      "title": "NIST Special Publication 811: Guide for the Use of the International System of Units (SI)",
      "publisher": "National Institute of Standards and Technology",
      "url": "https://www.nist.gov/pml/special-publication-811",
      "accessed": "2026-08-09"
    },
    {
      "title": "Unit Conversion",
      "publisher": "NIST Office of Weights and Measures",
      "url": "https://www.nist.gov/pml/owm/metric-si/unit-conversion",
      "accessed": "2026-08-09"
    }
  ]
}
---

Most collections of mental arithmetic tricks share two problems: the examples are chosen to make the method look better than it is, and nobody tells you when it stops working. Every method below is worked through with arithmetic you can check line by line, and every one is stated with the case where it fails or becomes slower than the ordinary approach.

## What separates a method from a party trick

A mental arithmetic shortcut is ordinary algebra with the middle steps precomputed. That is the whole story, and it has a practical consequence: every genuine method has a **condition** attached — a range of inputs where it applies and outside which it either stops helping or produces a wrong answer.

The tricks that circulate without their conditions are the ones that get people into trouble. So every method below is stated with the case where it fails, and every example has been worked so you can check it rather than take it on trust.

This article assumes you already have the foundations. Round-and-compensate, complements, the easy multipliers, multiplying by 11, squaring numbers ending in 5, difference of squares, one-percent anchoring and casting out nines are covered in our [guide to mental math training](/blog/mental-math-training-guide/). What follows is the next layer.

## Multiplying numbers near 100

This is the highest-value method most people have never seen. It works when both numbers sit near a round base — 100 is the useful one for everyday arithmetic.

**Both numbers below 100.** Write down how far each falls short.

`97 x 94` — shortfalls of 3 and 6.

1. Cross-subtract: `97 - 6 = 91`. (Taking `94 - 3` gives the same 91, which is a built-in check.)
2. Multiply the shortfalls: `3 x 6 = 18`.
3. Join them: **9,118**.

Verify it the long way if you like: `97 x 90 = 8,730`, `97 x 4 = 388`, total 9,118.

**Squaring is the same move.** `97²` — shortfall 3. So `97 - 3 = 94`, and `3² = 9`, giving **9,409**.

**Both numbers above 100.** Use the excess and add instead of subtract.

`108 x 106` — excesses 8 and 6. `108 + 6 = 114`, and `8 x 6 = 48`, giving **11,448**. Check: `10,800 + 648 = 11,448`.

**The condition, and the case everyone gets wrong.** The second part occupies two digit positions. If the product of the shortfalls reaches 100, it overflows and has to carry.

`88 x 85` — shortfalls 12 and 15. `88 - 15 = 73`. `12 x 15 = 180`. Since 180 exceeds 99, the extra hundred carries: `73 + 1 = 74`, leaving 80. Answer **7,480**. Check: `88 x 80 = 7,040`, plus `88 x 5 = 440`, total 7,480.

That carry is why the method loses its appeal once the numbers drift far from 100. Within roughly ten either side it is very fast; beyond about fifteen you are doing a two-digit multiplication anyway.

**Why it works.** Expanding `(100 - a)(100 - b)` gives `10,000 - 100a - 100b + ab`, which is `100(100 - a - b) + ab`. The first bracket is the cross-subtraction and `ab` is the shortfall product — the algebra is just the binomial expansion with the arithmetic done in advance.

## Same tens digit, units adding to ten

A close relative, and a generalisation of the squaring-numbers-ending-in-5 rule.

When two two-digit numbers share a tens digit and their units digits sum to 10, multiply the tens digit by the next whole number up, then append the product of the units digits.

`43 x 47` — `4 x 5 = 20`, `3 x 7 = 21` → **2,021**. Check: `1,720 + 301 = 2,021`.

`62 x 68` — `6 x 7 = 42`, `2 x 8 = 16` → **4,216**. Check: `4,340 - 124 = 4,216`.

**Condition:** both parts are required. Same tens digit *and* units summing to exactly 10. And the units product needs two digit places, so `61 x 69` gives `42` then `09` → 4,209, not 429. Squaring a number ending in 5 is simply the case where both units digits are 5.

## Squaring an awkward number by shifting to an easy product

The difference-of-squares identity in the [training guide](/blog/mental-math-training-guide/) turns a product into a square. Run it the other way and it turns an awkward square into an easy product plus a small correction: `n² = (n - d)(n + d) + d²`.

Pick `d` to land on a round number.

`43²` → shift down 3 to 40: `40 x 46 = 1,840`, plus `3² = 9` → **1,849**.
`68²` → shift up 2 to 70: `70 x 66 = 4,620`, plus `2² = 4` → **4,624**.

**Condition:** you must *add* the correction when squaring, and the shift is worth it only if it produces a genuinely easy multiplier. If the nearest round number is more than about 5 away, the correction stops being a small number you can hold.

## Division by awkward-looking divisors

Multiplication shortcuts get all the attention; the division versions are used less and are just as fast.

| To divide by | Do this | Example |
| --- | --- | --- |
| 5 | double, then ÷10 | 340 ÷ 5 → 680 ÷ 10 = **68** |
| 2.5 | ×4, then ÷10 | 170 ÷ 2.5 → 680 ÷ 10 = **68** |
| 25 | ×4, then ÷100 | 1,700 ÷ 25 → 6,800 ÷ 100 = **68** |
| 125 | ×8, then ÷1,000 | 3,000 ÷ 125 → 24,000 ÷ 1,000 = **24** |
| 8 | halve three times | 384 ÷ 8 → 192 → 96 → **48** |
| 15 | ÷ 3, then ÷ 5 | 495 ÷ 15 → 165 ÷ 5 = **33** |

Each rests on the same observation: these divisors are factors of powers of ten, so replacing the division with a multiplication and a decimal shift is exact, not approximate.

## Percentages that are really fractions

One-percent anchoring handles anything. But a handful of percentages are exactly simple fractions, and recognising them converts a multiplication into a division you already know.

| Percentage | Fraction | Worked example |
| --- | --- | --- |
| 12.5% | 1/8 | 12.5% of 248 → 248 ÷ 8 = **31** |
| 37.5% | 3/8 | 37.5% of 96 → 96 ÷ 8 = 12, ×3 = **36** |
| 62.5% | 5/8 | 62.5% of 96 → 12 × 5 = **60** |
| 16⅔% | 1/6 | 1/6 of 342 → **57** |
| 6.25% | 1/16 | 6.25% of 320 → **20** |
| 33⅓% | 1/3 | 1/3 of threefold-friendly numbers |

**Condition:** the fraction route pays off only when the base divides cleanly. 37.5% of 97 is not made easier by eighths; fall back to one-percent anchoring there.

## Percentage changes multiply — this is the important one

More everyday arithmetic goes wrong here than anywhere else in this article.

**Sequential changes do not add.** Start at 100. A 20% fall gives 80. A 20% rise on 80 gives 96, not 100. You are 4% down, because the rise was calculated on a smaller base than the fall.

**Successive discounts do not add either.** "30% off, then a further 20% off" is `0.7 x 0.8 = 0.56` — a 44% total reduction, not 50%.

**Reversing a change means dividing.** If a figure is 130 after a 30% increase, the original is `130 ÷ 1.3 = 100`. If a price is 60 after 25% off, the original is `60 ÷ 0.75 = 80`. Adding 25% to 60 would give 75, and 75 is not the answer.

The mental move is to stop thinking in additions and start thinking in multipliers: down 20% is ×0.8, up 30% is ×1.3, and going backwards means dividing by the multiplier you went forward with.

## Averaging by deviations

To average 87, 92, 79 and 84, do not add them. Anchor at 85 and track only the deviations: `+2, +7, -6, -1`, which sum to `+2`. Divide by 4 for `+0.5`, and add to the anchor: **85.5**.

The numbers you hold in your head are single digits instead of three-digit running totals, which is the entire point. Check: the four values sum to 342, and `342 ÷ 4 = 85.5`.

**Condition:** the values need to cluster. If they are spread across orders of magnitude, the deviations are as big as the numbers and nothing is gained.

## Unit conversions worth memorising

NIST's guidance on SI units gives the exact conversion factors; two of them have unusually convenient mental approximations.

**Miles and kilometres.** One mile is exactly 1.609344 kilometres, following from the international definition of the yard as 0.9144 metre. That ratio sits close to 1.618, which is the limit that consecutive Fibonacci numbers approach — so consecutive Fibonacci numbers convert well enough for conversation:

- 5 miles → about 8 km (exact: 8.05)
- 8 miles → about 13 km (exact: 12.87)
- 13 miles → about 21 km (exact: 20.92)

**Condition:** this is an approximation, not a conversion. It runs roughly half a percent low and should never be used where the exact factor matters.

**Celsius and Fahrenheit.** The exact relation multiplies by 9/5 and adds 32. The common shortcut — double and add 30 — is only exact at 10 °C, and drifts by 0.2 degrees for every degree away from it. At 30 °C it gives 90 °F against a true 86 °F.

The better version costs one extra step and is exact: **double, subtract 10%, add 32.** At 30 °C: `60 - 6 + 32 = 86`. At 20 °C: `40 - 4 + 32 = 68`. Since `2 - 0.2 = 1.8 = 9/5`, this is not an approximation at all.

## Estimating a square root properly

Guessing between the neighbouring perfect squares is the usual advice and it is weak. One extra step makes it good.

Take a guess, divide the target by the guess, and average the two. This is Newton's method specialised to square roots.

**√60**, starting from 8:

- `60 ÷ 8 = 7.5`
- Average of 8 and 7.5 → **7.75**

The true value is approximately 7.7460, so 7.75 is off by about 0.05%. One more pass — `60 ÷ 7.75 ≈ 7.7419`, averaged with 7.75 — gives 7.7460.

**√30**, starting from 5: `30 ÷ 5 = 6`, average → 5.5. Second pass: `30 ÷ 5.5 ≈ 5.4545`, average → **5.4773**, against a true 5.47723.

**Condition:** the averaging step always overshoots on the high side from a low guess and vice versa, so each pass sandwiches the answer. It converges fast, but "fast" still means you are doing a division, and the division is the expensive part.

## Divisibility by 7

The training guide covers tests for 3, 4, 6, 8 and 11. Seven is the gap, and MathWorld lists several tests for it. The usable one: split off the last digit, double it, and subtract that from the number formed by the remaining digits. Repeat until the result is small enough to recognise.

- `371` → `37 - (2 x 1) = 35`. 35 is divisible by 7, so 371 is. (`371 ÷ 7 = 53`.)
- `6,853` → `685 - 6 = 679` → `67 - 18 = 49`. Divisible. (`6,853 ÷ 7 = 979`.)
- `1,073` → `107 - 6 = 101`. Not divisible, so 1,073 is not. (`7 x 153 = 1,071`.)

**Condition:** the test answers yes or no. It does not give you the quotient, so it is for checking whether a fraction will simplify, not for doing the division.

## One pattern worth knowing for its own sake

The decimal expansion of one-seventh is 0.142857 repeating, and every other seventh is the same six digits rotated to a different starting point:

`1/7 = 0.142857…`, `2/7 = 0.285714…`, `3/7 = 0.428571…`, `4/7 = 0.571428…`, `5/7 = 0.714285…`, `6/7 = 0.857142…`

Memorise the cycle once and all six are available. It is a small thing, and it is the kind of structure that makes arithmetic feel less like a set of unrelated procedures.

## Turning any of this into speed

Knowing a method and being fast with it are different states. The gap between them is retrieval: a method you have to reason through costs several seconds, and the same method drilled to automaticity costs a fraction of one. Nothing in this article gets faster by being read again.

That is a training problem, and it responds to short, frequent, mixed practice — the same principles set out in the [training guide](/blog/mental-math-training-guide/). The same spacing-and-retrieval evidence is covered from the vocabulary side in [spaced repetition for language learning](/blog/spaced-repetition-for-language-learning/), which is the same mechanism applied to a different kind of material.

## Where the app fits

[Mental Math & Memory Games](/apps/mental-math-memory-games/) drills addition, subtraction, multiplication and division with difficulty that climbs as you improve, plus timed sprints, accuracy rounds, survival challenges and boss quizzes, and a daily math challenge. It tracks scores, accuracy, streaks, response time, personal bests and history, and includes techniques for percentages, estimation, number patterns and faster calculation.

Response time is the number worth watching. Score mixes speed and accuracy together, but response time is the cleaner signal of whether a method has crossed from reasoning into retrieval.

The app is free with ads. More like it sit under [education and brain training apps](/apps/category/education-brain/), and our other writing on the subject is collected under [education and brain training articles](/blog/category/education-brain/).

## The short version

Learn the base-100 method, learn that percentage changes multiply, and learn the averaging step for square roots. Those three cover more real situations than the rest of the list combined. And for anything you adopt, learn the condition alongside the method — a shortcut applied outside its range is slower than the long way, because you have to do the long way afterwards anyway.
