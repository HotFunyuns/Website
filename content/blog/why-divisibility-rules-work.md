---
{
  "title": "Why the Divisibility Rules Work",
  "metaTitle": "Why Divisibility Rules Actually Work",
  "description": "Every divisibility rule is a statement about what powers of ten leave behind. Here is the reasoning for 2, 3, 4, 5, 6, 8, 9, 10 and 11, worked out.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "mental math",
    "divisibility",
    "number theory",
    "modular arithmetic"
  ],
  "primaryKeyword": "why divisibility rules work",
  "secondaryKeywords": [
    "divisibility rules explained",
    "divisibility rule for 3 proof",
    "digit sum rule",
    "why does the 9 rule work",
    "divisibility by 11 rule"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does adding the digits test divisibility by 3",
    "why do only the last two digits matter for 4",
    "why is the rule for 3 the same as the rule for 9",
    "why does 11 use an alternating sum"
  ],
  "aiSearchQuestions": [
    "Why does the digit sum test work for 3 and 9?",
    "Why do only the last two digits matter for divisibility by 4?",
    "Why is there no simple rule for 7?",
    "Can a divisibility rule give you the quotient?"
  ],
  "demandTier": "unverified-medium",
  "hubs": [
    "mental-math"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "mental-division-tricks",
    "mental-math-training-guide",
    "simplifying-fractions-quickly"
  ],
  "takeaways": [
    "Every divisibility rule is a statement about the remainder a power of ten leaves when divided by that number, which is why the rules look so different from one another.",
    "Because 10, 100 and 1,000 are each one more than a multiple of 9, a number and its digit sum always leave the same remainder on division by 9 — and 3 divides 9, so the same argument covers both rules at once.",
    "Only the last two digits matter for 4 because 100 is a multiple of 4, and only the last three matter for 8 because 1,000 is a multiple of 8.",
    "Composite rules such as the one for 6 work only when the factors share no common divisor: passing the tests for 4 and 6 does not make a number divisible by 24.",
    "No divisibility rule ever produces a quotient. They answer a yes-or-no question, which makes them tools for deciding whether a fraction will reduce, not tools for dividing."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why does adding the digits test divisibility by 3?",
      "answer": "Because every power of ten is one more than a multiple of 3. Writing 10 as 9 + 1, 100 as 99 + 1 and 1,000 as 999 + 1 splits any number into a chunk that is obviously a multiple of 3 plus the sum of its digits. The chunk contributes nothing to the remainder, so the number and its digit sum behave identically."
    },
    {
      "question": "Why is the rule for 9 the same as the rule for 3?",
      "answer": "It is the same argument twice. The leftover chunk is built from 9, 99 and 999, which are multiples of 9 and therefore also multiples of 3. So the digit sum decides divisibility by both numbers; all that changes is which threshold you test the digit sum against."
    },
    {
      "question": "Why does divisibility by 11 use an alternating sum?",
      "answer": "Because 10 leaves a remainder of minus one on division by 11. That makes 100 leave plus one, 1,000 leave minus one, and so on, alternating indefinitely. Each digit therefore enters the remainder with a sign that flips by place value, which is exactly what the alternating sum computes."
    },
    {
      "question": "Can a divisibility rule tell you the answer to the division?",
      "answer": "No. Every rule here returns a yes or a no and nothing else. That is not a defect, it is the design: the cheapest useful question in arithmetic is often whether a division will come out clean, because that decides whether a fraction reduces or whether a factor-splitting route is available."
    }
  ],
  "sources": [
    {
      "title": "Divisibility Tests",
      "publisher": "NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/articles/divisibility-tests",
      "accessed": "2026-09-21"
    },
    {
      "title": "An Introduction to Modular Arithmetic",
      "publisher": "NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/articles/introduction-modular-arithmetic",
      "accessed": "2026-09-21"
    },
    {
      "title": "Divisibility Tests",
      "publisher": "MathWorld — A Wolfram Resource",
      "url": "https://mathworld.wolfram.com/DivisibilityTests.html",
      "accessed": "2026-09-21"
    }
  ]
}
---

Every divisibility rule you have ever been taught is the same statement in different clothes: it describes what a power of ten leaves behind when you divide it by the number you are testing. Ten is one more than a multiple of nine, so digit sums work for 9 and 3. One hundred is exactly a multiple of four, so everything above the last two digits vanishes. Ten is a multiple of two, five and ten, so only the final digit survives.

Learn that one idea and the rules stop being a list to memorise. [How to divide in your head](/blog/mental-division-tricks/) sets out the working rules and warns about using them correctly; this article is about why each one is true.

## The single idea: what a power of ten leaves behind

When we ask whether 4,275 is divisible by 9, we are really asking about the remainder. And a number written in decimal is a sum of place values: 4,275 is 4 × 1,000 plus 2 × 100 plus 7 × 10 plus 5.

So the remainder of the whole number is built from the remainders of 1,000, 100 and 10. If those remainders are simple, the rule is simple. If they are not, there is no simple rule — which is exactly why 7 has no clean digit test and 9 has a beautiful one.

Mathematicians write this with congruences: two numbers are congruent modulo n when they leave the same remainder on division by n. NRICH introduces the notation through a clock face, where 13 o'clock and 1 o'clock are the same position, and that picture is enough to follow everything below without any further machinery.

## Why the digit sum works for 3 and 9

Write each power of ten as a nine-ish number plus one: 10 = 9 + 1, 100 = 99 + 1, 1,000 = 999 + 1. NRICH makes the point directly — every power of ten is one more than a multiple of nine.

Now expand 4,275 using that:

`4,275 = 4 × (999 + 1) + 2 × (99 + 1) + 7 × (9 + 1) + 5`

Separate the two kinds of term:

`4,275 = [4 × 999 + 2 × 99 + 7 × 9] + (4 + 2 + 7 + 5)`

The bracket is unmistakably a multiple of 9. It contributes nothing to the remainder. What is left is 4 + 2 + 7 + 5 = 18 — the digit sum. So 4,275 and 18 leave the same remainder on division by 9, and since 18 is a multiple of 9, so is 4,275. Checking: 9 × 475 = 4,275.

**And 3 comes free.** The bracket is built out of 9, 99 and 999, every one of which is a multiple of 3 as well as of 9. The same separation therefore proves the same thing for 3. The rules for 3 and 9 are not two rules; they are one rule with two thresholds, which is why they always agree about the bracket and only ever disagree about the digit sum.

This is also the reason the test cannot hand you a quotient. The argument throws away the bracket entirely, and the bracket is where almost all of the number was.

## Why only the last two digits matter for 4

Every number splits as (a multiple of 100) plus (its last two digits). NRICH states the consequence plainly: since 100 = 4 × 25, any multiple of 100 is already a multiple of 4, so the hundreds and everything above them are irrelevant.

**7,316** is 7,300 + 16. The 7,300 is 73 hundreds, so it is divisible by 4 whatever 73 happens to be. That leaves 16, which is 4 × 4. So 7,316 is divisible by 4, and indeed 4 × 1,829 = 7,316.

The rule for 8 is the same sentence with one more digit, because 1,000 = 8 × 125. **12,504** splits as 12,000 + 504, and 504 = 8 × 63, so the whole number is divisible by 8: 8 × 1,563 = 12,504.

You can see the pattern generalising. A test that looks at the last k digits exists exactly when 10^k is a multiple of the divisor — which happens only for divisors built from 2s and 5s. That is a real constraint, not an accident, and it is why no amount of cleverness produces a last-digits rule for 3 or 7.

## Why 2, 5 and 10 need only the final digit

Ten is divisible by 2, by 5 and by 10. So is every higher power of ten. That means the entire number above the units digit contributes a multiple of each of them, and the units digit alone decides the question. This is the shortest proof in the set and the reason these three rules feel so obviously true that nobody asks why.

## Why 6 is not its own rule, and where that reasoning breaks

Six factorises as 2 × 3, and those two factors share no common divisor. A number divisible by both is therefore divisible by their product, so the test for 6 is simply the test for 2 and the test for 3 run together.

The same shortcut gives you 12 (test 3 and 4) and 15 (test 3 and 5) without any new work. MathWorld's table of tests is built on exactly this kind of decomposition.

**The trap is coprimality.** The factors must share no common divisor. Four and six both divide 12, but 12 is not divisible by 24 — because 4 and 6 share a factor of 2, so passing both tests only guarantees divisibility by 12, their least common multiple, not by 24. Anyone extending the composite shortcut has to check that condition first.

## Why 11 uses an alternating sum

Eleven is the interesting case, because ten leaves a remainder of minus one rather than plus one. MathWorld records the consequence: 10 ≡ −1, 100 ≡ 1, 1,000 ≡ −1 modulo 11, alternating forever. Each digit therefore enters the remainder with a sign that flips by place value, and adding the digits with alternating signs is precisely the test.

**90,728**, taken from the units end: 8 − 2 + 7 − 0 + 9 = 22. Twenty-two is a multiple of 11, so 90,728 is too, and 11 × 8,248 = 90,728.

Seven has no comparably short rule for the same reason 11 does: the remainders of successive powers of ten modulo 7 cycle through six different values rather than two, so there is no short repeating pattern to exploit. The workable test for 7 involves repeated reduction rather than a single pass, and [mental math tricks that actually work](/blog/mental-math-tricks-that-work/) sets it out with examples.

## What the rules are actually for

Because no rule produces a quotient, their real uses are all decisions rather than calculations.

- **Will this fraction reduce?** The dominant use. Scanning 2, 5, then 3 and 9 costs almost nothing and tells you where to start cancelling — which is the ordering argument in [simplifying a fraction quickly](/blog/simplifying-fractions-quickly/).
- **Is a factor-splitting route available?** Dividing by 24 is painful; dividing by 8 and then by 3 is not, but only if 8 divides cleanly.
- **Is this answer plausible?** A product of two even numbers that comes out odd is wrong, and you know it without checking anything else.

The broader set of division methods, including the ones that do produce quotients, is in the [mental math training guide](/blog/mental-math-training-guide/). The rest of this subject area sits under [mental math](/blog/topics/mental-math/) and, more broadly, [education and brain training](/blog/category/education-brain/).

## Practising the rules until the scan is automatic

Knowing why a rule works and being fast with it are different states, and only the second one helps you at speed. [Mental Math & Memory Games](/apps/mental-math-memory-games/) — our own app, built by Reign Creative — includes a Divisibility Rules entry in its techniques library covering the set it teaches: 2 for even numbers, 3 for a digit sum divisible by three, 4 for the last two digits, 5 for a final 0 or 5, 6 for passing both the 2 and 3 tests, 9 for a digit sum divisible by nine, and 10 for a final zero. Each technique in that library carries its steps, a worked example, a "best for" note, a named common mistake and a two-question mini quiz, plus a link that opens a specific mode at a specific difficulty.

The drill that exercises the rules in anger is Division Dash, a 60-second timed mode whose difficulty settings run from Small numbers through Exact division, Multiples and Larger dividend to Mixed division. Exact division is the one that rewards a fast scan, because every item is chosen to come out clean and the rules tell you so before you start dividing.

The app is a practice and entertainment product — an educational game rather than a course or a standardised assessment of anything — and the figures it records are game statistics: score, accuracy, streak, response time and personal bests on the modes you play.
