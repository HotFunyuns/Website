---
{
  "title": "Solving a Logic Grid Puzzle Step by Step",
  "metaTitle": "How to Solve Logic Grid Puzzles",
  "description": "A worked method for grid logic puzzles: mark negatives first, propagate every positive across its row and column, and use counting when elimination stalls.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "tags": [
    "logic puzzles",
    "deduction",
    "problem solving",
    "constraint satisfaction",
    "puzzle strategy"
  ],
  "primaryKeyword": "how to solve logic grid puzzles",
  "secondaryKeywords": [
    "how to do grid logic puzzles",
    "logic grid puzzle strategy",
    "zebra puzzle method",
    "elimination grid technique",
    "logic puzzles for adults"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you fill in a logic puzzle grid",
    "what do you do when a logic puzzle stalls",
    "why does marking a positive fill a whole row",
    "what is a zebra puzzle"
  ],
  "aiSearchQuestions": [
    "How do you solve a logic grid puzzle?",
    "What is the first step in a grid logic puzzle?",
    "What do you do when elimination stops working?",
    "Why is a logic grid puzzle called a constraint satisfaction problem?"
  ],
  "demandTier": "unverified-medium",
  "hubs": [
    "logic-and-pattern-puzzles"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "mental-math-tricks-that-work",
    "working-memory-and-training",
    "estimation-techniques-explained"
  ],
  "takeaways": [
    "A logic grid puzzle is a constraint satisfaction problem: a set of variables, a domain of possible values for each, and clues that rule combinations out until exactly one arrangement survives.",
    "Mark negatives before positives. Most clues tell you what is not true, and a grid that records every negative will hand you the positives on its own.",
    "Every positive you write costs you a whole row and a whole column, because each value is used exactly once. Failing to propagate a positive is the most common reason a solve stalls.",
    "When direct elimination runs out, count. If two of three pairings in a category are fixed, the third is forced without any clue mentioning it.",
    "Mental Math & Memory Games has no logic grid mode. The nearest thing in the app is rule-finding in its number pattern and missing number drills, which is a different task."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a logic grid puzzle?",
      "answer": "A puzzle in which several categories - people, places, times, objects - must be matched one to one using a list of clues. The grid is a bookkeeping device that records every possible pairing so you can eliminate them systematically. They are also called zebra puzzles, and they are a standard example of a constraint satisfaction problem in computer science."
    },
    {
      "question": "What is the first thing to do with a new puzzle?",
      "answer": "Read every clue and mark only what it definitively rules out, without trying to solve anything. Negatives are cheap and safe; guesses are not. Once every clue's negative content is on the grid, the positives usually appear without further work, and you will not have committed to anything you cannot justify."
    },
    {
      "question": "Why does one confirmed pairing eliminate so much?",
      "answer": "Because the matching is one to one. If Bo is in Leeds, nobody else can be in Leeds and Bo cannot be anywhere else, so a single tick clears the rest of its row and the rest of its column. Skipping that propagation is the single most common cause of a puzzle appearing unsolvable when it is not."
    },
    {
      "question": "What do you do when elimination stops producing anything?",
      "answer": "Count. If a category has three values and two of them are already committed elsewhere, the third is forced even though no clue says so directly. This counting argument is what unlocks most apparent dead ends, and it is worth trying before you resort to assuming a value and testing for contradiction."
    },
    {
      "question": "Does Mental Math & Memory Games have logic grid puzzles?",
      "answer": "No. The app ships arithmetic and memory drills, including number pattern and missing number modes that involve rule finding, but it contains no logic grid mode, no zebra puzzles and no verbal deduction items. This article is here for the reader rather than as a description of the product."
    }
  ],
  "sources": [
    {
      "title": "A framework for step-wise explaining how to solve constraint satisfaction problems",
      "publisher": "arXiv (arXiv:2006.06343); published version in Artificial Intelligence",
      "url": "https://arxiv.org/abs/2006.06343",
      "accessed": "2026-09-21"
    },
    {
      "title": "The Rough Guide to Constraint Propagation",
      "publisher": "arXiv (arXiv:cs/9909009); Proceedings of the 5th International Conference on Principles and Practice of Constraint Programming",
      "url": "https://arxiv.org/abs/cs/9909009",
      "accessed": "2026-09-21"
    },
    {
      "title": "Reasoning: Identifying Opportunities",
      "publisher": "NRICH, Millennium Mathematics Project, University of Cambridge",
      "url": "https://nrich.maths.org/articles/reasoning-identifying-opportunities",
      "accessed": "2026-09-21"
    }
  ]
}
---

The method for a logic grid puzzle is short enough to state up front: record every negative before you write a single positive, propagate each positive across its whole row and column the moment you write it, and when elimination stalls, count what is left rather than guessing. Everything else is bookkeeping. This article works an original puzzle through that procedure so you can see where each step comes from.

One thing to clear up before starting. Mental Math & Memory Games, which we build at Reign Creative, has **no logic grid mode**. It ships arithmetic and memory drills, including number pattern and missing number puzzles that involve finding a rule, and nothing in it resembles the puzzle below. This piece exists because the question is worth answering, not because it describes a feature.

## What the grid is actually for

A logic grid puzzle asks you to match several categories one to one — three people to three cities to three drinks, say — from clues that mostly tell you what is *not* the case. Computer scientists recognise the shape immediately: it is a constraint satisfaction problem, a set of variables with a domain of possible values each, narrowed by constraints until one assignment survives. A research framework for explaining such solutions describes its own scope as "the problem of step-wise explaining how to solve constraint satisfaction problems, with a use case on logic grid puzzles", which is a fair description of what your pencil is doing.

The grid itself is a memory aid, and that is not a trivial point. Holding nine possible pairings and their statuses in your head is beyond what anyone can keep straight — the capacity limits involved are covered in [our guide to working memory](/blog/working-memory-and-training/). Writing them down converts a memory problem into a reading problem.

## The puzzle

Three colleagues — Ada, Bo and Chen — each work in a different city and each ordered a different drink. The cities are Leeds, Madrid and Nagoya. The drinks are coffee, tea and juice.

1. The person based in Leeds ordered coffee.
2. The person based in Nagoya ordered tea.
3. Chen is not based in Madrid.
4. Bo did not order juice.
5. Chen did not order coffee.

Work it yourself before reading on. The solution below uses only the four moves described in this article.

## Step one: mark the negatives

Clues 3, 4 and 5 are pure negatives, and they go straight onto the grid: Chen is not in Madrid, Bo did not have juice, Chen did not have coffee.

Clues 1 and 2 look like positives, but notice what they actually assert. They do not name a person. They connect a city to a drink, which is a positive in the city-to-drink block and a source of negatives everywhere else: Leeds is not tea and not juice, Nagoya is not coffee and not juice.

Resisting the urge to start guessing at people is the discipline the whole method rests on. NRICH, the mathematics education project at the University of Cambridge, lists "working systematically" first among the problem-solving skills its reasoning material develops, and describes logical reasoning as one of the eight contexts in which reasoning is required. Systematic is not a personality trait here; it is the technique.

## Step two: count when the clues run out

You now know Leeds is coffee and Nagoya is tea. No clue mentions Madrid's drink at all.

It does not need to. There are three cities and three drinks, matched one to one. Two of the three pairings are fixed, so **Madrid must be juice** — forced by arithmetic rather than by evidence. This counting argument is the move that unlocks most apparent dead ends, and it is worth reaching for before you start assuming values and testing for contradictions.

The table below shows the city-to-drink block once that deduction is in place, with a tick for a confirmed pairing and a cross for an eliminated one.

| | Coffee | Tea | Juice |
| --- | --- | --- | --- |
| **Leeds** | yes | no | no |
| **Madrid** | no | no | yes |
| **Nagoya** | no | yes | no |

## Step three: chain a negative through a known pairing

Clue 5 says Chen did not order coffee. Coffee is Leeds. Therefore **Chen is not in Leeds.**

That inference is the engine of the whole puzzle type, and it has a formal name. Constraint propagation is the process of using one constraint to shrink the possible values of another variable, then repeating; Krzysztof Apt's survey of the field frames the standard algorithms as instances of a single generic procedure that keeps applying reductions until nothing more can be removed. You are running that procedure by hand.

Combine the new negative with clue 3 — Chen is not in Madrid — and only one city is left. **Chen is in Nagoya**, and since Nagoya is tea, **Chen ordered tea.**

## Step four: propagate every positive immediately

This is where most solves go wrong. Writing "Chen — Nagoya" and moving on wastes most of its value. A confirmed pairing in a one-to-one matching kills an entire row and an entire column: nobody else can be in Nagoya, and Chen cannot be anywhere else.

So cross Ada and Bo out of Nagoya now, before reading another clue.

With that done, clue 4 finishes the puzzle. Bo did not order juice, and juice is Madrid, so Bo is not in Madrid. Bo is not in Nagoya either. **Bo is in Leeds**, and therefore ordered coffee. Ada takes the only remaining city, Madrid, and the only remaining drink, juice.

The solution is Ada in Madrid with juice, Bo in Leeds with coffee, Chen in Nagoya with tea. Check it against all five clues; every one holds, and no clue was used twice or ignored.

## Turning the method into a habit

The four moves, in the order you should reach for them:

- **Negatives first.** Extract every elimination before you commit to anything.
- **Chain through known pairings.** A negative about a drink becomes a negative about a city as soon as the drink and city are linked.
- **Propagate positives at once.** One tick, one cleared row, one cleared column, every time.
- **Count when stuck.** Two of three fixed forces the third.

Only if all four are exhausted is assumption-and-contradiction appropriate, and a well-constructed puzzle rarely requires it.

If you enjoy this kind of structured rule-finding, the numerical relative is worth reading next: [our guide to number sequence puzzles](/blog/number-sequence-puzzles-explained/) covers the equivalent procedure for sequences, where the unknown is a rule rather than a matching. You will also find the broader set of puzzle articles in the [logic and pattern puzzles hub](/blog/topics/logic-and-pattern-puzzles/) and the wider [education and brain section](/blog/category/education-brain/).

For practice that does exist in our app rather than in this article, the number pattern and missing number drills on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/) exercise rule-finding under a timer, and the untimed accuracy mode with its explanations is the better fit if you want to slow down and check your reasoning. Neither is a logic grid, and neither is a test of anything — the app records score, accuracy, streak and response time on its own drills and makes no claims beyond that. If you want to see how the same care applies to arithmetic shortcuts, [our article on mental math tricks and where they break](/blog/mental-math-tricks-that-work/) is built on the same principle: know why the step is valid before you trust it.
