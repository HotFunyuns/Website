---
{
  "title": "The Monty Hall Problem: Why Switching Wins Two Times in Three",
  "metaTitle": "The Monty Hall Problem: Why Switching Wins 2/3",
  "description": "Three doors, one car, and a host who opens a goat door. Why switching wins with probability 2/3, shown by listing cases, by Bayes' theorem and with 100 doors.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "probability", "monty hall", "bayes theorem"],
  "primaryKeyword": "monty hall problem",
  "secondaryKeywords": [
    "monty hall problem explained",
    "why switching is better in monty hall",
    "monty hall bayes theorem",
    "monty hall 100 doors",
    "monty hall assumptions"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "is monty hall 50 50 after a door is opened",
    "monty hall problem with four doors",
    "what if the host opens a door at random",
    "simulate the monty hall problem"
  ],
  "aiSearchQuestions": [
    "Why should you switch doors in the Monty Hall problem?",
    "Isn't it 50/50 once one door is opened?",
    "How do you solve the Monty Hall problem with Bayes' theorem?",
    "Does the answer change if the host opens a door at random?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "conditional-probability-and-bayes",
    "expected-value-explained",
    "birthday-problem-explained",
    "common-reasoning-mistakes",
    "knights-and-knaves-puzzles",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "If the host always opens a goat door you did not pick and always offers a switch, switching wins the car with probability 2/3 and staying wins with 1/3.",
    "Staying wins only when your first pick was the car, which happens 1 time in 3; the host's reveal cannot change that.",
    "Listing the three equally likely car positions, or applying Bayes' theorem, gives the same 2/3.",
    "The answer depends on the host's rules: if the host opens a door at random and happens to reveal a goat, switching and staying are equally good.",
    "With 100 doors and 98 opened goats, switching wins 99 times in 100, which makes the logic easier to see."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why is switching better in the Monty Hall problem?",
      "answer": "Your first pick is the car with probability 1/3, and staying wins only in that case. The other 2/3 of the time the car is behind one of the two doors you did not pick, and the host, who knows where it is, opens the other one. Switching then always wins, so it wins 2/3 of the time."
    },
    {
      "question": "Once a door is opened, isn't it 50/50?",
      "answer": "No, because the host's choice is not random. He must avoid your door and the car. When your first pick is a goat, he is forced to leave the car closed, so the remaining door carries all of the original 2/3. Two closed doors do not have to be equally likely."
    },
    {
      "question": "Does the answer change if the host doesn't know where the car is?",
      "answer": "Yes. If the host opens one of the other doors at random and it happens to show a goat, switching and staying each win with probability 1/2. The 2/3 answer depends on the host knowingly avoiding the car and always making the offer."
    },
    {
      "question": "What happens with more doors?",
      "answer": "With n doors and the host opening one goat door, staying wins with probability 1/n and switching to a particular other door wins with probability (n − 1)/(n(n − 2)). With 4 doors that is 1/4 for staying and 3/8 for switching, so switching is still better."
    }
  ],
  "sources": [
    {
      "title": "Monty Hall Problem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/MontyHallProblem.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Bayes' Theorem",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/BayesTheorem.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "7.9 Conditional Probability and the Multiplication Rule (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/7-9-conditional-probability-and-the-multiplication-rule",
      "accessed": "2026-10-24"
    }
  ]
}
---

There are three doors. Behind one is a car; behind the other two, goats. You pick a door, say door 1. The host, who knows where the car is, opens another door, say door 3, to reveal a goat, and offers you the chance to switch to door 2. Should you?

MathWorld, which names the puzzle after the host of the game show *Let's Make a Deal*, gives the answer plainly: yes. Staying wins the car with probability 1/3; switching wins with probability 2/3. MathWorld itself calls the result counterintuitive: two closed doors look as if they should be equally likely, and the reasons they are not are worth understanding.

## The rules that matter

The answer depends on how the host behaves, so state it precisely. In the standard version:

1. The car is placed behind a door at random.
2. You pick a door.
3. The host **always** opens a door that you did not pick and that hides a goat. If he has a choice of two goat doors, he picks either with equal chance.
4. The host **always** offers the switch.

Rule 3 is the key. The host's choice carries information because it is constrained by where the car is.

## Explanation 1: list the cases

Suppose you pick door 1. The car is equally likely to be behind each door.

| Car behind | Host opens | Staying gives | Switching gives |
| --- | --- | --- | --- |
| Door 1 | Door 2 or 3 | Car | Goat |
| Door 2 | Door 3 (forced) | Goat | Car |
| Door 3 | Door 2 (forced) | Goat | Car |

Each row has probability 1/3. Staying wins in one row; switching wins in two. So switching wins with probability 2/3.

The table shows why the reveal does not help the "stay" strategy. Staying wins exactly when your first pick was right, and that was decided, with probability 1/3, before the host did anything. MathWorld makes the same point: whatever you picked, the host can always show a goat, so his reveal cannot raise the chance that your original door is right.

## Explanation 2: Bayes' theorem

You picked door 1 and the host opened door 3. Let Cₖ be "the car is behind door k" and H be "the host opens door 3".

- If the car is behind door 1, the host chooses door 2 or 3 at random: P(H | C₁) = 1/2.
- If it is behind door 2, the host must open door 3: P(H | C₂) = 1.
- If it is behind door 3, he cannot open it: P(H | C₃) = 0.

By the law of total probability, P(H) = (1/3)(1/2) + (1/3)(1) + (1/3)(0) = 1/2. Then, by Bayes' theorem,

P(C₂ | H) = P(H | C₂)P(C₂)/P(H) = (1 × 1/3)/(1/2) = **2/3**,

and P(C₁ | H) = (1/2 × 1/3)/(1/2) = **1/3**.

This is the method from [conditional probability and Bayes' theorem](/blog/conditional-probability-and-bayes/), and it shows exactly where the asymmetry comes from: the host is twice as likely to open door 3 when the car is behind door 2 as when it is behind door 1.

## Explanation 3: imagine 100 doors

Pick one door out of 100. The host, who knows where the car is, opens 98 of the other 99 doors, all goats, leaving one closed. Do you keep your original door or take the one he conspicuously left shut?

Your first pick was right with probability 1/100. The other 99/100 of the time, the car is somewhere among the 99 doors you did not choose, and the host has carefully avoided it, so it is behind the one door he left. Switching wins 99 times in 100. The three-door game is the same reasoning with smaller numbers.

## When the answer changes

**The host opens a door at random.** Suppose the host does not know where the car is, opens one of the other two doors at random, and it happens to show a goat. Now the reveal is lucky rather than informed. Running the same Bayes calculation with P(H | C₂) = 1/2 instead of 1 gives P(C₁ | H) = P(C₂ | H) = 1/2. Switching neither helps nor hurts.

**The host offers a switch only sometimes.** If he offers the switch only when your first pick is the car, switching always loses. The 2/3 answer needs him to offer it every time, regardless.

These variations are why the rules have to be stated before the answer: two people silently assuming different host rules can both calculate correctly and still disagree.

## More doors, one reveal

With n doors and the host opening just one goat door, staying still wins with probability 1/n. Switching to one particular remaining door wins with probability

((n − 1)/n) × (1/(n − 2)),

because your first pick must be wrong and the car is then equally likely to be behind any of the n − 2 doors that remain closed. For 4 doors that is 3/8, against 1/4 for staying. MathWorld discusses a four-door generalisation in which the host opens more doors in turn.

## Check it yourself

The puzzle is easy to simulate. Deal three cards face down, one red for the car; pick one; have a friend who can see the cards turn over a black card you did not pick; record whether staying or switching would win. After 30 rounds, switching should have won about 20 times. The long-run frequency approaching 2/3 is the [expected value](/blog/expected-value-explained/) idea in action.

The Monty Hall problem sits naturally beside other probability surprises such as the [birthday problem](/blog/birthday-problem-explained/), and beside reasoning traps covered in [common reasoning mistakes](/blog/common-reasoning-mistakes/). [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a probability unit, with lessons, knowledge checks and topic quizzes. It is listed with our [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) has the related guides.
