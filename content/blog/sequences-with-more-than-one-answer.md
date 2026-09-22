---
{
  "title": "When a Sequence Puzzle Has More Than One Right Answer",
  "metaTitle": "Sequence Puzzles With More Than One Answer",
  "description": "Why a finite list of numbers never forces a single continuation, the convention that makes sequence puzzles answerable anyway, and how to check yours.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "number sequences",
    "puzzle design",
    "underdetermination",
    "problem solving",
    "logic puzzles"
  ],
  "primaryKeyword": "sequence puzzles with multiple answers",
  "secondaryKeywords": [
    "what comes next in the sequence answer",
    "underdetermined sequence",
    "is there only one answer to a sequence puzzle",
    "ambiguous number series",
    "simplest rule principle"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why do sequence puzzles have more than one answer",
    "can 1 2 4 8 16 be followed by 31",
    "how do puzzle setters decide the correct answer"
  ],
  "aiSearchQuestions": [
    "Can a number sequence puzzle have more than one correct answer?",
    "Why is 31 a defensible answer after 1, 2, 4, 8, 16?",
    "What makes one sequence rule the intended one?"
  ],
  "demandTier": "unverified-low",
  "hubs": [
    "logic-and-pattern-puzzles"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "number-sequence-puzzles-explained",
    "finding-the-rule-in-a-number-pattern",
    "do-brain-training-apps-work"
  ],
  "takeaways": [
    "No finite list of numbers determines a unique next term; for any value you choose, a rule exists that produces the given terms and then that value.",
    "The standard demonstration is 1, 2, 4, 8, 16, where the doubling answer of 32 and the circle-region answer of 31 both fit every term shown.",
    "Sequence puzzles are answerable because of a convention, not a proof: the intended answer is the simplest rule consistent with the terms displayed.",
    "You can construct a counter-rule yourself by adding a term that vanishes at every position shown, which takes one line of algebra and settles the point.",
    "A practical consequence is that a marked-wrong answer is sometimes a defensible rule that was not the setter's, so check your rule against every given term before assuming you made an error."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Is there really more than one right answer to a sequence puzzle?",
      "answer": "Mathematically, yes. Given any finite list of terms and any value you would like next, you can write a rule that produces the listed terms and then that value. The puzzle only has a single answer because the setter chose a rule beforehand and solvers agree to prefer the simplest rule that fits. That agreement is a convention about puzzles, not a fact about numbers."
    },
    {
      "question": "Why can 1, 2, 4, 8, 16 be followed by 31?",
      "answer": "Because 1, 2, 4, 8, 16, 31, 57, 99 is the count of regions a circle is divided into when n points on its edge are joined by straight lines. The On-Line Encyclopedia of Integer Sequences catalogues it as A000127 with the formula (n⁴ − 6n³ + 23n² − 18n + 24)/24. Both that rule and simple doubling reproduce the first five terms exactly."
    },
    {
      "question": "How do I know which rule the setter intended?",
      "answer": "Prefer the simplest rule that fits every term shown, and prefer it strongly. Simplicity in practice means fewer moving parts: a constant difference beats a quadratic, a quadratic beats a quartic, and a rule that uses only the numbers given beats one that needs outside knowledge. If two simple rules both fit, the puzzle is genuinely ambiguous and a good setter would add a term."
    },
    {
      "question": "Does this mean sequence puzzles are unfair?",
      "answer": "No, it means they are governed by a convention that should be stated rather than assumed. Adding more terms narrows the field quickly, and most well-made puzzles show enough terms that only one simple rule survives. The honest framing is that you are being asked for the most economical explanation of the data, which is a reasonable and useful thing to practise."
    }
  ],
  "sources": [
    {
      "title": "A000127: Maximal number of regions obtained by joining n points around a circle by straight lines",
      "publisher": "The On-Line Encyclopedia of Integer Sequences, OEIS Foundation Inc.",
      "url": "https://oeis.org/A000127",
      "accessed": "2026-09-21"
    },
    {
      "title": "Hints for Using The On-Line Encyclopedia of Integer Sequences",
      "publisher": "The OEIS Foundation Inc.",
      "url": "https://oeis.org/hints.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "Simplicity",
      "publisher": "Stanford Encyclopedia of Philosophy, Stanford University",
      "url": "https://plato.stanford.edu/entries/simplicity/",
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

**A finite list of numbers never forces a single continuation. For any terms you are shown and any value you would like to come next, there is a rule that produces both.** Sequence puzzles are answerable anyway, but not because the mathematics settles them — because of a convention: the setter fixed a rule in advance, and everyone agrees that the intended answer is the simplest rule consistent with the terms displayed.

That is not a pedantic caveat. It changes how you should treat a puzzle you got "wrong", how you should judge a puzzle you wrote, and how much weight any sequence score deserves.

## The demonstration everyone should see once

Take 1, 2, 4, 8, 16. Doubling gives 32, and doubling is clearly the simplest rule that fits.

Now count the regions a circle is cut into when you mark n points on its edge and join every pair with straight lines. With one point there is one region. With two points, two. Then four, then eight, then sixteen — and then thirty-one. The On-Line Encyclopedia of Integer Sequences catalogues this as [A000127](https://oeis.org/A000127), listing 1, 2, 4, 8, 16, 31, 57, 99, 163, 256, with the closed formula

(n⁴ − 6n³ + 23n² − 18n + 24)/24

Check it yourself at n = 6: 1,296 − 1,296 + 828 − 108 + 24 = 744, and 744 ÷ 24 = 31. Check n = 5: 625 − 750 + 575 − 90 + 24 = 384, and 384 ÷ 24 = 16. The quartic reproduces every one of the first five terms and then diverges from doubling.

Two rules, both exact on everything shown, different from the sixth term onward. No amount of staring at 1, 2, 4, 8, 16 distinguishes them.

## You can build a counter-rule in one line

The circle-regions example is famous but it can look like a curiosity. The general construction is a single line of algebra, and doing it once removes any lingering sense that the ambiguity is an accident.

Take the sequence 2, 4, 6, 8. The obvious rule is 2n, giving 10 next. Now consider

p(n) = 2n + (n − 1)(n − 2)(n − 3)(n − 4)

At n = 1, 2, 3 and 4, one factor in the product is zero, so the added term vanishes and p(n) is exactly 2n. The first four terms are still 2, 4, 6, 8. At n = 5 the product is 4 × 3 × 2 × 1 = 24, so p(5) = 10 + 24 = **34**. At n = 6 it is 12 + (5 × 4 × 3 × 2) = 12 + 120 = 132.

Nothing about that construction was special to this sequence. Multiply the product term by any coefficient you like and you can land the fifth term wherever you want. This is the reason the general statement holds: a rule can always be made to agree on the visible terms and disagree afterwards.

The same fact appears from the difference-table side. As T. W. Körner's NRICH article on [divided differences](https://nrich.maths.org/articles/divided-differences) shows, repeatedly differencing a polynomial of degree m produces zeros after at most m + 1 passes — which means a table that settles at row two proves your data is *consistent* with a quadratic, not that the generating rule was quadratic. [The difference-table method](/blog/finding-the-rule-in-a-number-pattern/) is a reliable way to find a rule; it is not a proof that you found the rule.

## The convention that rescues the puzzle

What makes a sequence puzzle work is a shared preference for the most economical explanation. The Stanford Encyclopedia of Philosophy's entry on [simplicity](https://plato.stanford.edu/entries/simplicity/), by Alan Baker, treats this as a live and unresolved question rather than a settled principle: simplicity is widely used in theory choice, it is usually invoked with an "other things being equal" clause that is rarely satisfied, and in curve-fitting specifically it trades off against goodness of fit, with overfitting as the failure mode on one side and inaccuracy on the other.

Puzzles are the tidy corner of that problem. The data are exact rather than noisy, so goodness of fit is not in question — every candidate rule fits perfectly — and simplicity is doing all the work on its own. In practice that means preferring fewer moving parts: a constant difference over a quadratic, a quadratic over a quartic, and a rule built only from the numbers shown over one that needs outside knowledge such as prime positions or the spelling of number words.

More terms narrow the field fast. Five terms leave plenty of room; ten terms usually leave one simple rule standing. A setter who shows too few terms has written an ambiguous puzzle, and that is a flaw in the puzzle, not in the solver.

## Checking a sequence against a database

If you want to know what else matches your terms, the OEIS is the place to look. Its [search hints](https://oeis.org/hints.html) advise entering about six terms and starting from the second, since people disagree about where a sequence begins, and warn against entering too many terms because you may have more than the database does. The implication runs the other way too: a very short list matches a large number of entries, which is the ambiguity of this article rendered as a search result.

Searching your own answer is a good habit for a different reason. If your rule produces a sequence with a name and a literature, it is probably the intended one. If it produces nothing at all, it may still be correct, but the simplicity test is worth rerunning.

## What this means for practising and for scores

Three practical consequences.

**A marked-wrong answer is sometimes a defensible rule.** Check your rule against every term you were given. If it fits them all and is genuinely simple, you found a rule — possibly not the setter's. Recording that as a personal failure is a mistake.

**Puzzle skill is rule-vocabulary, not raw reasoning power.** Getting faster at these means recognising more members of the small catalogue in [the guide to number sequence puzzles](/blog/number-sequence-puzzles-explained/). That is a real and useful skill, and it is a narrow one.

**A sequence score is a score on sequences.** It is not a measurement of anything broader. The case for being cautious about what practice scores mean is made at length in [do brain training apps work](/blog/do-brain-training-apps-work/), and it applies here with full force.

## The honest position of a practice app

Mental Math & Memory Games is our own app, built by Reign Creative. Its 75-second Number Pattern Challenge generates items at Easy, Medium and Hard settings, and its Missing Number Puzzle mode asks you to fill a blank in an equation. Items like these are fair for exactly the reason set out above: the generator fixes a rule before it produces the terms, and the intended answer is the simplest one consistent with what you are shown.

Being plain about the rest: the app contains no figural or matrix items and no logic-grid puzzles, and none of its modes is a test, an assessment or an estimate of anything about you. It records score, accuracy, streak, response time and personal bests on its own drills, and those are game statistics. The [app page](/apps/mental-math-memory-games/) lists what ships; the rest of this subject is in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/), and the wider set of guides is in the [education and brain training section](/blog/category/education-brain/).
