---
{
  "title": "Working Backwards: Solving a Problem From Its Answer",
  "metaTitle": "Working Backwards: Solving From the Answer",
  "description": "Know where a process ended but not where it started? Invert each step and reverse the order. Worked chains, the order trap, and how to check a result.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "tags": [
    "problem solving",
    "logic puzzles",
    "arithmetic",
    "heuristics",
    "reverse calculation"
  ],
  "primaryKeyword": "working backwards math problems",
  "secondaryKeywords": [
    "reverse calculation problems",
    "think of a number puzzles",
    "backward induction puzzle",
    "undo the steps problem",
    "problem solving strategy working backwards"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you solve a think of a number puzzle",
    "why do you reverse the order when undoing steps",
    "how to find the original price after two changes",
    "what is backward induction in a counter game"
  ],
  "aiSearchQuestions": [
    "How does working backwards solve a problem?",
    "Why do you have to reverse the order of the steps?",
    "How do you undo a chain of operations?",
    "Where is working backwards useful outside maths?"
  ],
  "demandTier": "unverified-medium",
  "hubs": [
    "logic-and-pattern-puzzles"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "missing-number-problems",
    "percentages-in-your-head",
    "mental-math-tricks-that-work"
  ],
  "takeaways": [
    "Working backwards is a two-part move: replace each operation with its inverse, and apply those inverses in the opposite order to the one the problem describes.",
    "The order reversal is the step people skip. Undoing the first operation first gives a number that looks reasonable and is wrong, which is why every answer needs a forward check.",
    "A forward check is complete. Run your candidate answer through the original steps, and if it lands on the stated result, you are done.",
    "Percentage changes reverse by division rather than subtraction, so a price reduced by 20 per cent is restored by dividing by 0.8, not by adding 20 per cent back.",
    "In take-away games the same idea becomes backward induction: work out which positions are losing from the end of the game, then steer the opponent into them.",
    "Working backwards is a heuristic, not an algorithm. It helps when the end state is known and the start is not, and it offers nothing when both ends are open."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does working backwards mean in maths?",
      "answer": "It means starting from the stated result and undoing the process that produced it, one step at a time, until you reach the unknown starting value. Each operation is replaced by its inverse, and the inverses are applied in the reverse of the original order. It is the natural method whenever a problem tells you where something ended but not where it began."
    },
    {
      "question": "Why do you reverse the order of the steps?",
      "answer": "Because the last operation is the only one sitting directly between you and the result. If a number was multiplied and then had seven subtracted, the seven is the outermost layer, so adding seven back is the only move available. Undoing the multiplication first would apply it to a figure that still carries the subtraction, which is not the number you multiplied."
    },
    {
      "question": "How do I check a working-backwards answer?",
      "answer": "Run it forwards. Take the value you found, apply the original steps in the original order, and see whether you land on the stated result. This is a complete check for a single unknown, so there is no need to redo the reverse chain. If the forward run misses, the most likely cause is an inverse applied in the wrong order."
    },
    {
      "question": "Is working backwards the same as solving an equation?",
      "answer": "They overlap. Writing the chain as an equation and isolating the unknown produces exactly the same steps in the same order, so the two are the same procedure in different notation. Working backwards is usually faster in your head because you never write the expression down; solving as an equation is safer once there is more than one unknown or the chain branches."
    }
  ],
  "sources": [
    {
      "title": "Working Backwards at KS2",
      "publisher": "NRICH, University of Cambridge",
      "url": "https://nrich.maths.org/working-backwards-ks2",
      "accessed": "2026-09-21"
    },
    {
      "title": "Problem-Solving Skills",
      "publisher": "NRICH, University of Cambridge",
      "url": "https://nrich.maths.org/problem-solving-skills",
      "accessed": "2026-09-21"
    },
    {
      "title": "Heuristics and semantic spaces for the analysis of students' work in mathematical problem solving",
      "publisher": "Educational Studies in Mathematics, via PubMed Central",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10957671/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Problem of the Week",
      "publisher": "Centre for Education in Mathematics and Computing, University of Waterloo",
      "url": "https://cemc.uwaterloo.ca/resources/potw",
      "accessed": "2026-09-21"
    }
  ]
}
---

When a problem tells you where a process finished but not where it started, the method is to undo the process: replace each operation with its inverse, then apply those inverses in the opposite order to the one the problem describes. Both halves matter. Inverting the operations without reversing the order is the single most common way to get a working-backwards problem wrong, and it fails quietly, because the wrong answer looks entirely reasonable.

Working backwards is a general heuristic rather than a technique for one puzzle type. NRICH, the mathematics education project in the Faculty of Mathematics at the University of Cambridge, lists it alongside trial and improvement as one of the core problem-solving approaches it teaches, with whole collections of tasks chosen because they yield to it. In the research literature it is the stock example of a *general* heuristic — a method with broad reach, as against a domain-specific trick. A 2024 paper by Stéphane Favier and Jean-Luc Dorier in *Educational Studies in Mathematics* names it in exactly that role, while adopting a definition of heuristics worth keeping in mind: devices used on the assumption of being helpful, which do not guarantee a solution.

## Invert the steps, then reverse the order

Take a chain: think of a number, multiply it by 4, subtract 7, then halve the result. The answer is 16.5.

Working backwards, the halving came last, so it is undone first:

1. Undo the halving: 16.5 x 2 = 33.
2. Undo the subtraction: 33 + 7 = 40.
3. Undo the multiplication: 40 / 4 = **10**.

Check forwards: 10 x 4 = 40; 40 - 7 = 33; 33 / 2 = 16.5. That is the stated result, so 10 is the answer.

Now do it wrong on purpose, inverting each operation but keeping the original order. Undo the multiplication first: 16.5 / 4 = 4.125. Then undo the subtraction: 4.125 + 7 = 11.125. Then undo the halving: 11.125 x 2 = 22.25. Nothing about 22.25 announces itself as absurd. Only the forward check exposes it: 22.25 x 4 = 89; 89 - 7 = 82; 82 / 2 = 41, which is not 16.5.

That is why the forward check is not optional. For a single unknown it is a complete verification — if your candidate runs forwards onto the stated result, it is the answer, no matter how you found it. The same logic underpins the single-step version of this idea, which we cover separately in [missing number problems](/blog/missing-number-problems/); that article undoes one operation, this one undoes a chain.

## Percentages reverse by dividing, not subtracting

A shop cuts a price by 20 per cent, then takes a further 3 off the reduced figure. The customer pays 45. What was the original price?

Undo the last step first: 45 + 3 = 48. That 48 is what remained after the 20 per cent cut, so it represents 80 per cent of the original. Dividing gives 48 / 0.8 = **60**.

Check forwards: 20 per cent of 60 is 12, leaving 48; taking 3 off leaves 45.

The trap here is subtracting instead of dividing. Adding 20 per cent back to 48 gives 57.6, because that 20 per cent is being calculated on the smaller figure rather than the original. Percentage changes multiply, so reversing one means dividing by the multiplier. Our guide to [percentages in your head](/blog/percentages-in-your-head/) sets out the anchors that make the division tractable without a calculator, and [mental math tricks that actually work](/blog/mental-math-tricks-that-work/) works through why a fall and a rise of the same percentage do not cancel.

## A chain hidden inside a story

Problems rarely arrive labelled "here is a chain of four operations". More often the chain is described as events.

A jug is emptied in three pourings. Each pouring removes half of whatever is in the jug at that moment, plus a further 10 ml. After the third pouring the jug is empty. How much did it hold?

Work from the end. Before the third pouring the jug held some amount whose half, plus 10 ml, emptied it. If half of it plus 10 equals all of it, then 10 ml equals the other half, so it held 20 ml. Before the second pouring, the jug held an amount that fell to 20 ml: half of it minus 10 equals 20, so half of it is 30, so it held 60 ml. Before the first pouring, half minus 10 equals 60, so half is 70, and the jug held **140 ml**.

Check forwards: from 140, remove 70 + 10 = 80, leaving 60. From 60, remove 30 + 10 = 40, leaving 20. From 20, remove 10 + 10 = 20, leaving nothing. The chain closes.

Note what made the backward route easy and the forward route hard. Forwards, the unknown starting amount propagates through three stages and you end up managing an expression. Backwards, every stage starts from a number you already know.

## Backward induction: working back from the end of a game

The same move solves a class of two-player games. Twenty-one counters sit on a table. Players alternate, removing one or two counters each turn, and whoever takes the last counter wins. Who should win?

Reason from the end. Facing 1 or 2 counters, you take them all and win. Facing 3, every move you make leaves 1 or 2 for your opponent, who then wins — so 3 is a losing position for whoever must move. Facing 4 or 5, you can take enough to leave exactly 3, handing your opponent the losing position. Facing 6, you cannot: any move leaves 4 or 5. The pattern is that the multiples of 3 are the losing positions, and 21 is a multiple of 3. The player who moves first therefore loses against accurate play, and the second player's strategy is simply to restore a multiple of 3 every turn.

Nothing about that argument required playing the game forwards. Working back from the terminal position — the definition of backward induction — is what makes the whole strategy visible at once.

## Where it helps, and where it does not

Working backwards is worth trying when the end state is known and the start is not, when every step is individually reversible, and when there is a single unknown. It offers nothing when both ends are open, when a step loses information (squaring, rounding and taking an absolute value all destroy the sign or the detail you would need), or when the process branches. Those are honest limits, and recognising them quickly is most of what separates a usable heuristic from a superstition.

For practice, Mental Math & Memory Games — our own app, built by Reign Creative — ships a **Reverse Calculation** mode that presents exactly this task on a 75-second clock at Easy, Medium and Hard settings, so the chains lengthen as you improve. Because the items are generated rather than drawn from a fixed worksheet, you cannot learn the answers, which is the property that makes repetition useful here. The app records accuracy and response time per run, so you can see whether the order reversal has actually become automatic or whether you are still reasoning it out each time. The modes and the progress record are described on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/).

For graded problems rather than generated ones, the CEMC at the University of Waterloo publishes a free weekly problem set across five grade bands, many of which reward exactly this approach. More of our writing on solving methods sits in the [education and brain training section](/blog/category/education-brain/), the broader taxonomy of puzzle types is in the guide to [number sequence puzzles](/blog/number-sequence-puzzles-explained/), and the full set of reasoning articles is collected in the [logic and pattern puzzles hub](/blog/topics/logic-and-pattern-puzzles/).
