---
{
  "title": "If-Then Reasoning and the Two Mistakes Everyone Makes",
  "metaTitle": "If-Then Reasoning: The Two Common Mistakes",
  "description": "From 'if P then Q' only two inferences are valid. The four forms, why the invalid pair feels right, the contrapositive, and what 'only if' actually means.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "tags": [
    "logic",
    "reasoning",
    "critical thinking",
    "conditionals",
    "fallacies"
  ],
  "primaryKeyword": "conditional reasoning explained",
  "secondaryKeywords": [
    "affirming the consequent",
    "denying the antecedent",
    "modus ponens modus tollens",
    "if then logic",
    "contrapositive explained"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what are the four conditional inference forms",
    "why is affirming the consequent invalid",
    "what does only if mean in logic",
    "how do you reverse an if then statement safely"
  ],
  "aiSearchQuestions": [
    "What can you validly infer from an if-then statement?",
    "What is affirming the consequent?",
    "What is the contrapositive and why is it safe?",
    "What does 'only if' mean?"
  ],
  "demandTier": "unverified-low",
  "hubs": [
    "logic-and-pattern-puzzles"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "syllogisms-explained",
    "deductive-reasoning-examples",
    "mental-math-tricks-that-work"
  ],
  "takeaways": [
    "From 'if P then Q' there are exactly two valid moves: given P, conclude Q; and given not-Q, conclude not-P. Everything else is a guess.",
    "The two invalid moves are affirming the consequent — given Q, conclude P — and denying the antecedent — given not-P, conclude not-Q. Both treat a sufficient condition as if it were the only one.",
    "The contrapositive, 'if not-Q then not-P', is the only reversal that preserves meaning. The converse and the inverse are equivalent to each other and to neither the original nor the truth.",
    "'P only if Q' states a necessary condition and points the arrow the other way from 'if P then Q', which is why the phrase causes so much trouble in rules and contracts.",
    "In the standard card-selection experiment the correct choice is the card showing the antecedent and the card showing the false consequent, and most people instead pick the two cards named in the rule.",
    "Mental Math & Memory Games contains no logic mode and no reasoning test; the conditionals worth practising here are the ones attached to arithmetic methods."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What can you validly conclude from 'if P then Q'?",
      "answer": "Two things. If you also know P is true, you can conclude Q — that is modus ponens. If you know Q is false, you can conclude P is false — that is modus tollens. Knowing Q is true tells you nothing about P, and knowing P is false tells you nothing about Q, because the statement never claimed P was the only route to Q."
    },
    {
      "question": "Why can you not reason backwards from the 'then' part of a conditional?",
      "answer": "Because the statement never claimed that the 'if' part was the only route to the 'then' part. If posting a parcel first class means it arrives by Tuesday, a parcel arriving on Tuesday does not show it went first class, since a neighbour might have dropped it round. Reasoning in that direction treats a sufficient condition as though it were the only sufficient condition, and logicians call the move affirming the consequent."
    },
    {
      "question": "What is the contrapositive?",
      "answer": "The contrapositive of 'if P then Q' is 'if not-Q then not-P', and it always says exactly the same thing as the original. The converse, 'if Q then P', and the inverse, 'if not-P then not-Q', are equivalent to each other but not to the original. If you need to turn a conditional round, the contrapositive is the only safe way to do it."
    },
    {
      "question": "What is the difference between 'if' and 'only if'?",
      "answer": "'You may enter if you have a ticket' makes a ticket sufficient. 'You may enter only if you have a ticket' makes it necessary, which is a different and usually weaker promise: the ticket gets you past that condition but there may be others. When both hold, the phrase is 'if and only if', which is the form used for definitions and for exact rules."
    }
  ],
  "sources": [
    {
      "title": "Indicative Conditionals",
      "publisher": "Stanford Encyclopedia of Philosophy",
      "url": "https://plato.stanford.edu/entries/conditionals/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Helping Reasoners Succeed in the Wason Selection Task: When Executive Learning Discourages Heuristic Response but Does Not Necessarily Encourage Logic",
      "publisher": "PLoS One, via PubMed Central",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4388638/",
      "accessed": "2026-09-21"
    },
    {
      "title": "forall x: Calgary. A Free and Open Introduction to Formal Logic",
      "publisher": "Open Logic Project, University of Calgary",
      "url": "https://forallx.openlogicproject.org/",
      "accessed": "2026-09-21"
    }
  ]
}
---

Given a statement of the form "if P then Q", there are exactly two things you may conclude. If P turns out to be true, Q follows. If Q turns out to be false, P must be false. The other two moves people reach for — concluding P from Q, or concluding not-Q from not-P — are invalid, and they are invalid for the same reason: the statement never said that P was the *only* way to get Q.

Take a working example and keep it for the whole article.

> **If a parcel was posted first class, it arrives by Tuesday.**

## The four forms

| Name | You also know | You conclude | Valid? |
| --- | --- | --- | --- |
| Modus ponens | It was posted first class | It arrives by Tuesday | Yes |
| Modus tollens | It did not arrive by Tuesday | It was not posted first class | Yes |
| Affirming the consequent | It arrived by Tuesday | It was posted first class | **No** |
| Denying the antecedent | It was not posted first class | It will not arrive by Tuesday | **No** |

The two invalid rows fail on the same counterexample. Suppose a neighbour walked the parcel round on Monday. It arrived by Tuesday without going first class, which breaks the third row; and it was not posted first class yet still arrived by Tuesday, which breaks the fourth. One scenario kills both, because both errors are the same mistake wearing different clothes: reading a sufficient condition as though it were necessary too.

Modus ponens is as uncontroversial as inference gets, and the Stanford Encyclopedia of Philosophy's entry on indicative conditionals treats it as foundational while noting a well-known disputed counterexample involving conditionals nested inside conditionals. Modus tollens and contraposition are likewise treated as classical patterns preserved across the main competing theories of the conditional. For everyday reasoning, the two-valid-two-invalid picture is the one to carry.

## The only safe reversal

Every conditional has three relatives, and only one of them is trustworthy.

- **Contrapositive** — "if it did not arrive by Tuesday, it was not posted first class". Always equivalent to the original.
- **Converse** — "if it arrived by Tuesday, it was posted first class". Not equivalent.
- **Inverse** — "if it was not posted first class, it will not arrive by Tuesday". Not equivalent.

The converse and the inverse are equivalent to each other, which is a tidy fact with a practical use: if you catch yourself defending one of them, you are committed to the other, and one of the two is usually obviously wrong.

Arithmetic gives clean cases. "If a number is divisible by 6, it is divisible by 2" is true, and its converse is plainly false — 4 is divisible by 2 and not by 6. By contrast, "a number is divisible by 9 if and only if its digit sum is divisible by 9" runs in both directions, which is exactly why the digit-sum test is usable as a test rather than merely as a hint. Knowing which of the rules in our guide to [mental division](/blog/mental-division-tricks/) are one-directional and which are biconditional is the difference between a shortcut and a mistake.

The same point applies to methods generally. Every shortcut in [mental math tricks that actually work](/blog/mental-math-tricks-that-work/) is stated with a condition attached, and misapplying one is almost always denying the antecedent in disguise: the condition failed, so the method does not apply, which is not the same as the answer being different from what the method would have given.

## The card task, and what it shows

The standard experimental probe for this is a selection task. Four cards lie on a table, each with a letter on one face and a number on the other, showing **A**, **D**, **3** and **7**. The rule to test is: *if there is an A on one side, there is a 3 on the other.* Which cards must you turn over?

The answer is **A** and **7**. Turning A tests whether the rule holds where it applies. Turning 7 tests the only other way the rule could fail — an A hiding behind a card that is not a 3. Turning 3 is useless, because the rule says nothing about what must accompany a 3; turning D is useless for the same reason.

The paper by Sandrine Rossi and colleagues in *PLoS One*, which used this task to study whether training could shift people's answers, describes the characteristic error as selecting A and 3 — a matching bias, in which people pick the items explicitly named in the rule rather than the ones that could falsify it. The authors note that few participants give the correct answer, and report that in their own study not one participant answered correctly before the intervention, with 26.6 per cent doing so afterwards.

The lesson generalises beyond the cards. Testing a rule means looking for the case that would break it, not the case that matches its wording. Confirming instances are cheap; the informative check is the one that could come back negative.

## "Only if", "unless", and necessary versus sufficient

Most real-world trouble with conditionals is vocabulary rather than logic.

- **"P if Q"** means *if Q then P*. Q is sufficient.
- **"P only if Q"** means *if P then Q*. Q is necessary. Note that the arrow points the opposite way from the first case, which is why these two sentences confuse people despite differing by one word.
- **"P unless Q"** is normally read as *if not Q then P*.
- **"P if and only if Q"** asserts both directions. This is the form used for definitions and precise rules.

A membership rule saying "you may vote only if you have paid your subscription" does not promise that paying lets you vote; it promises that not paying stops you. Contracts, eligibility criteria and warranties are full of this distinction, and reading "only if" as "if" is how people end up expecting a guarantee that was never offered. The same asymmetry drives the quantifier version of this problem, treated in our article on [syllogisms](/blog/syllogisms-explained/), where "all A are B" similarly does not convert.

## Why the mistakes are so durable

Both invalid forms have a pragmatic excuse. In ordinary conversation, saying "if you finish your homework you can go out" usually *implies* that not finishing means staying in, because otherwise the condition would be pointless. Listeners are picking up a real conversational signal, not being stupid. The trouble starts when a sentence written to be read literally — a rule, a spec, a contract, a puzzle — is read with that conversational habit still switched on.

There is a second-order oddity worth knowing about. On the standard truth-functional account, "if P then Q" counts as true whenever P is false, which the Stanford Encyclopedia entry describes as logic's first surprise to students, and which the entry treats as one of the main pressure points in the literature on conditionals. That is a genuine open debate about how English conditionals work, not a settled fact to memorise, and the free open textbook *forall x: Calgary* is a good place to see how the formal system handles it.

## What to practise, and what this app is

To be plain about the product this hub sits under: Mental Math & Memory Games, our own app, has no logic mode, no conditional items and nothing that assesses reasoning. It is arithmetic and memory practice. Where it genuinely touches this article is the conditions attached to arithmetic methods — a shortcut that applies only to numbers near a round base, a divisibility test that runs in one direction and not the other — and its untimed **Accuracy Trainer** rounds, which give feedback and an explanation rather than a verdict, are the format in which noticing a misapplied condition is actually possible. The mode list and the statistics the app records are on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/).

For the wider notions of validity and soundness, read [deductive reasoning](/blog/deductive-reasoning-examples/); for rule-finding under uncertainty rather than rule-application under certainty, start with [number sequence puzzles](/blog/number-sequence-puzzles-explained/). Everything in this subject is collected in the [logic and pattern puzzles hub](/blog/topics/logic-and-pattern-puzzles/), and the rest of our writing sits in the [education and brain training section](/blog/category/education-brain/).
