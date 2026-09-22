---
{
  "title": "How a Three-by-Three Matrix Puzzle Is Built",
  "metaTitle": "How a 3x3 Matrix Reasoning Puzzle Is Built",
  "description": "Matrix reasoning items are built from a few named rules running across rows and down columns. How the attributes, the rules and the wrong options are chosen.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "logic puzzles",
    "pattern recognition",
    "reasoning items",
    "puzzle design",
    "abstract reasoning"
  ],
  "primaryKeyword": "matrix reasoning explained",
  "secondaryKeywords": [
    "matrix reasoning test",
    "3x3 matrix puzzle",
    "progressive matrices explained",
    "row and column rules",
    "matrix puzzle strategy"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how are matrix reasoning items constructed",
    "what rules are used in a 3x3 matrix puzzle",
    "how are wrong answers chosen in a matrix item",
    "why do matrix puzzles get harder"
  ],
  "aiSearchQuestions": [
    "How is a matrix reasoning item built?",
    "What rules appear in a 3x3 matrix puzzle?",
    "How are the wrong answer options designed?",
    "What makes one matrix item harder than another?"
  ],
  "demandTier": "unverified-medium",
  "hubs": [
    "logic-and-pattern-puzzles"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "visual-pattern-puzzles",
    "analogy-puzzles-explained",
    "do-brain-training-apps-work"
  ],
  "takeaways": [
    "A three-by-three matrix item shows eight filled cells and one blank, and the missing entry is fixed by rules that must hold along every row and down every column.",
    "Published item banks vary a short list of attributes — typically shape, colour, size and position — and the number of attributes changing at once is the main lever on difficulty.",
    "The recurring rule types are constant along a line, stepwise progression, adding or subtracting elements between cells, and distributing three values so each appears once per row and column.",
    "Wrong options are not random. They are built by taking the correct answer and getting one rule wrong at a time, which is why a plausible option usually means you have missed a rule.",
    "Checking rows only is the standard failure. A rule that survives the rows and breaks in the columns was never the rule.",
    "Mental Math & Memory Games contains no matrix items and no figural items of any kind; its Number Pattern Challenge rehearses rule-finding in one dimension instead."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is matrix reasoning?",
      "answer": "Matrix reasoning is a puzzle format in which a grid of figures follows rules that hold along each row and down each column, with one cell left blank. The solver works out the rules from the filled cells and selects the figure that completes them. Because the figures are abstract shapes rather than words or numbers, the format is used where the aim is to pose a rule-discovery problem without relying on vocabulary."
    },
    {
      "question": "What rules appear in matrix puzzles?",
      "answer": "Four families cover most items. A value can stay constant along a row, step through a progression such as one, two, three, be added or subtracted between cells so that two figures combine into a third, or be distributed so that each of three values appears exactly once in every row and column. Harder items simply apply more than one of these at the same time to different attributes."
    },
    {
      "question": "Why is it not enough to check the rows?",
      "answer": "Because a rule invented to fit three cells of a single row will often fit by accident. The columns are a second, independent test of the same hypothesis, and a genuine rule survives both. If a candidate rule works across the rows but produces a contradiction down a column, it was a coincidence rather than the rule the item was built on."
    },
    {
      "question": "Does Mental Math & Memory Games have matrix puzzles?",
      "answer": "No. The app ships no matrix items, no shape items and no figural items at all. Its catalogue is arithmetic and memory, and the closest thing to rule discovery is the Number Pattern Challenge, which asks you to find the rule behind a run of numbers. That rehearses the same habit in one dimension, but it is not a matrix puzzle and the app is not an assessment of any kind."
    }
  ],
  "sources": [
    {
      "title": "The matrix reasoning item bank (MaRs-IB): novel, open-access abstract reasoning items for adolescents and adults",
      "publisher": "Royal Society Open Science, via PubMed Central",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6837216/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Automatic Generation of Figural Analogies With the IMak Package",
      "publisher": "Frontiers in Psychology, via PubMed Central",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6087760/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Automatic Generation of Number Series Reasoning Items of High Difficulty",
      "publisher": "Frontiers in Psychology, via PubMed Central",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6491774/",
      "accessed": "2026-09-21"
    }
  ]
}
---

A three-by-three matrix puzzle is a grid of nine cells with eight of them filled and one blank, where the contents of the cells change according to rules that hold along every row and down every column. Your job is to recover the rules and pick the figure that satisfies all of them. Seen from the setter's side rather than the solver's, these items are far less mysterious than they look: a small list of attributes is varied, a short list of rules is applied, and the wrong options are manufactured by breaking those rules one at a time.

Before going further, one honest statement, because this hub is attached to an app. Mental Math & Memory Games, which is our own app, contains no matrix items and no figural items of any kind. Its catalogue is arithmetic and memory practice, and nothing in it assesses anything. If you came here looking for matrix practice inside our app, it is not there, and this article is written to explain the format rather than to sell anything.

## What an item is made of

Start with the raw material. The MaRs-IB, an open-access bank of 80 abstract reasoning items published in *Royal Society Open Science* by Chierchia and colleagues in 2019, is a useful worked example precisely because its construction is documented. Each item is an incomplete three-by-three matrix with four response options, and the figures vary along four attributes: **shape, colour, size and position** within the cell.

That short list is typical. Once you know the attribute list, a matrix stops being a picture and becomes a table with four columns of values. The first move on any item is therefore not to look for the pattern but to name what could vary — shape, count, shading, size, orientation, position — and then check each one in turn. Solvers who spot a rule immediately and stop have usually found the rule governing one attribute and missed a second.

## The rule types worth knowing

Across published item banks and the literature on generating items automatically, the same families recur:

- **Constant along a line.** An attribute does not change across a row, though it may differ between rows.
- **Progression.** An attribute steps by a fixed amount: one dot, two dots, three dots; or a shape rotating by the same angle each cell.
- **Addition or subtraction.** Two cells combine to produce the third, with elements of the first two either superimposed or cancelled.
- **Distribution of three.** Three values of one attribute each appear exactly once in every row and every column, in no fixed order.

What makes these families worth learning is that item banks are increasingly built by software from a declared rule list rather than written one at a time. The same approach is used for numerical items: Luning Sun, Yanan Liu and Fang Luo, writing in *Frontiers in Psychology* in 2019, generated number-series items from eighteen item models defined by three stimulus features — the kind of number involved, the kind of arithmetic operation, and how many operations were needed — and found that the number of operations was among the strongest predictors of how hard an item turned out to be. Figural items behave the same way: the rules are few, and what varies is how many of them are running at once.

Here is an original item in the distribution-of-three family. Because these pages carry no images, it is written as a table; read each cell as a description of a figure.

| | Column 1 | Column 2 | Column 3 |
| --- | --- | --- | --- |
| **Row 1** | unfilled circle | half-filled circle | filled circle |
| **Row 2** | half-filled square | filled square | unfilled square |
| **Row 3** | filled triangle | unfilled triangle | **?** |

Two rules are running. Shape is constant along each row — circles, then squares, then triangles — which also means each column contains one of each shape. Shading is distributed: unfilled, half-filled and filled each appear exactly once in every row, and, if you check, exactly once in every column as well. Row three already has filled and unfilled, so the blank is a **half-filled triangle**.

Now check the columns, which is the step most solvers skip. Column one reads unfilled, half-filled, filled. Column two reads half-filled, filled, unfilled. Column three reads filled, unfilled, and the proposed half-filled. Every column holds each shading once. The rule survives both directions, which is what makes it the rule rather than a coincidence.

## Why the wrong options are so tempting

Distractors in a well-made item are generated, not invented. The IMak package, described by Diego Blum and Heinz Holling in *Frontiers in Psychology* in 2018, generates figural items by applying a set of rules — rotations, reflections, the removal of line segments, the movement of a dot — and then builds the options by combining correct and incorrect outcomes for each rule. The correct answer is the option that gets every rule right; each distractor gets at least one wrong.

Applied to the matrix above, the four options would look something like this:

- **Unfilled triangle** — correct shape, wrong shading, and it repeats a shading already used in row three.
- **Half-filled square** — correct shading, wrong shape.
- **Filled circle** — a direct copy of a cell that already appears, which catches people matching surface appearance.
- **Half-filled triangle** — correct.

The practical consequence is worth stating plainly: if two options both look defensible, you have almost certainly identified one rule and missed another. The distractor that feels right is usually the one built by breaking the rule you did not notice.

## How difficulty is engineered

Difficulty in these items is not mainly a matter of obscure rules. It is a matter of how many things change at once. The MaRs-IB authors quantify this as item dimensionality — a count of how many dimensions change simultaneously across the matrix — and report that accuracy falls and response times rise roughly in step with it. One attribute varying is easy; three varying together is hard, even when each individual rule is elementary.

That has a direct bearing on how you work an item. The load is in holding several partial hypotheses at once while you test another, which is a working memory problem as much as a reasoning one. Writing the attribute list down, or naming each rule aloud as you confirm it, removes that load and is the single most useful habit on hard items.

There is also a choice of approach worth making deliberately. You can construct the answer from the grid before looking at the options, or you can work through the options and eliminate. Given how the distractors are generated — each one correct on every rule but one — constructing first is the safer default, because an option that gets all but one rule right is built to survive elimination.

## What you can practise, and where

Matrix items are a format, not a skill you can only acquire by doing them. What transfers is the discipline underneath: list the attributes, form one rule at a time, test it in both directions, and predict the answer before looking at the choices.

Our app rehearses a one-dimensional version of that discipline in its **Number Pattern Challenge** mode, where the task is to find the rule behind a run of numbers rather than a grid of figures. It is an analogue rather than an equivalent, and it is practice, not assessment. The modes and the progress tracking are described on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/). For the general procedure for finding a rule from a short run of terms, start with our guide to [number sequence puzzles](/blog/number-sequence-puzzles-explained/); for the transformation vocabulary that describes what is changing in a figural item, see [visual pattern puzzles](/blog/visual-pattern-puzzles/).

If the reason you are reading this is a broader question about whether puzzle practice does anything, our review of the evidence on [brain training apps](/blog/do-brain-training-apps-work/) is the honest starting point, and the same habit of reading a pattern under time pressure turns up in an unexpected place — our article on [reading boss patterns](/blog/boss-pattern-recognition/) in action games describes the same attribute-listing move applied to something that is moving. The rest of this subject is collected in the [logic and pattern puzzles hub](/blog/topics/logic-and-pattern-puzzles/) and in the wider [education and brain training section](/blog/category/education-brain/).
