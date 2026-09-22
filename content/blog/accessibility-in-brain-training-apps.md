---
{
  "title": "Accessibility in Brain Training Apps: Timers, Reveal Speed and Choice",
  "metaTitle": "Accessible Brain Training: Timers and Reveal Speed",
  "description": "The four dials that decide whether a timed drill is usable: an untimed alternative, adjustable reveal speed, a difficulty floor, and no single-sense dependency.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "education-brain",
  "tags": [
    "accessibility",
    "brain training",
    "app design",
    "timers"
  ],
  "primaryKeyword": "accessible brain training apps",
  "secondaryKeywords": [
    "accessible math app",
    "timers and accessibility",
    "adjustable difficulty accessibility",
    "cognitive accessibility app design",
    "no sound game"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "brain training app without a timer",
    "how to make a timed drill accessible",
    "adjustable reveal speed memory game",
    "what does wcag say about time limits"
  ],
  "aiSearchQuestions": [
    "What makes a brain training app accessible?",
    "Do accessibility guidelines allow time limits in games?",
    "Can you practise memory games without a timer?",
    "What should I look for if timed drills are difficult for me?"
  ],
  "demandTier": "unverified-low",
  "hubs": [
    "brain-training-games"
  ],
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "relatedArticles": [
    "do-brain-training-apps-work",
    "choosing-a-difficulty-level",
    "designing-memory-games-beyond-matching-pairs",
    "brain-training-questions-answered",
    "offline-brain-training-apps",
    "warming-up-before-focused-work"
  ],
  "takeaways": [
    "Four things decide whether a timed drill is usable: an untimed route to the same content, a reveal speed you can change, a difficulty that cannot punish a bad run, and no dependence on a single sense.",
    "WCAG's Timing Adjustable criterion allows a time limit where it is essential to the activity, which is why a speed drill is not automatically a failure — but an app with only timed modes has no route in for a large group of people.",
    "In Mental Math & Memory Games the untimed route is Accuracy Trainer: ten questions, no clock, feedback and an explanation after each answer, hints available.",
    "Custom Practice is the most accessibility-relevant mode in the app, because it exposes reveal speed, grid size, content and session length as settings rather than as difficulty side effects.",
    "The app ships no sound assets at all, so nothing in it depends on hearing — which is a design consequence worth stating plainly rather than a feature to advertise."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Do accessibility guidelines forbid timers in games?",
      "answer": "No. WCAG Success Criterion 2.2.1 Timing Adjustable asks that users can turn off, adjust or extend a time limit, but it explicitly exempts limits where removing them would fundamentally change the activity — real-time events and essential timing. A speed drill is a reasonable candidate for that exemption. The accessibility question then becomes whether an untimed route to the same content exists at all."
    },
    {
      "question": "What should I look for if timed drills are difficult for me?",
      "answer": "Look for three things before installing: a mode with no clock that covers the same content, a way to slow down how fast information is shown rather than only how much of it appears, and a difficulty system that does not drop you further down after a bad run. An app that only offers 'easier' as a response to difficulty is offering less practice, not more accessible practice."
    },
    {
      "question": "Is adjustable reveal speed the same as easier difficulty?",
      "answer": "No, and conflating them is a common design error. Reducing the number of items makes the task smaller; slowing the reveal gives you longer to encode the same task. Someone who can hold eight digits but needs longer to read them is served by the second and short-changed by the first. Separating the two dials is what makes a memory drill adjustable rather than just easier."
    },
    {
      "question": "Does this app make any accessibility conformance claim?",
      "answer": "No. Mental Math & Memory Games has not been audited against WCAG or any other standard, and we make no conformance claim for it. This article describes specific design choices that happen to matter for accessibility — an untimed mode, adjustable reveal speed, a difficulty floor, no audio dependency — and readers should judge those for themselves rather than treat them as certification."
    }
  ],
  "sources": [
    {
      "title": "Understanding Success Criterion 2.2.1: Timing Adjustable",
      "publisher": "W3C Web Accessibility Initiative",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "Understanding Success Criterion 2.2.6: Timeouts",
      "publisher": "W3C Web Accessibility Initiative",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/timeouts.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "All Supplemental Guidance",
      "publisher": "W3C Web Accessibility Initiative",
      "url": "https://www.w3.org/WAI/WCAG2/supplemental/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Principles for improving app accessibility",
      "publisher": "Android Developers",
      "url": "https://developer.android.com/guide/topics/ui/accessibility/principles",
      "accessed": "2026-09-21"
    }
  ]
}
---

Four dials decide whether a timed practice drill is usable by someone for whom timed drills are hard: whether an untimed route to the same content exists, whether you can change how fast information is shown rather than only how much of it appears, whether a bad run can push the difficulty below where you wanted it, and whether anything depends on a single sense. An app can be visually tidy, correctly labelled and still fail all four.

This is not a summary of WCAG. It is the shorter list that actually separates a brain training app you can use from one you cannot, with the relevant guidance cited where it applies.

## Dial one: is there a route in with no clock?

WCAG Success Criterion 2.2.1, Timing Adjustable, asks that a user be able to turn off a time limit, extend it substantially, or be warned and given a chance to extend. It also carves out an exception: a limit is allowed where extending it would fundamentally change the information or functionality — real-time events, and activities where the timing is essential. A speed drill is a genuine candidate for that exception. Removing the clock from a 60-second sprint does not produce an accessible sprint; it produces a different exercise.

That makes the honest accessibility question a different one. Not *can this timer be turned off*, but **does the same content exist somewhere without a timer at all**.

In Mental Math & Memory Games — our own app, built by Reign Creative — that route is Accuracy Trainer: ten questions, no countdown, feedback and an explanation after every answer, and hints available on request. The arithmetic is the same arithmetic. What changes is that the exercise ends when you finish rather than when a clock does.

An app whose entire catalogue is timed has not made a hard design choice; it has simply excluded everyone who cannot work to a clock, including people who could do every question given twenty seconds instead of six.

## Dial two: can you slow the reveal, not just shrink the task?

This is the distinction most memory apps get wrong. Reducing the number of items makes the task smaller. Slowing down how long the items stay on screen gives you longer to encode the same task. They are different needs, and someone who can hold eight digits but reads more slowly is badly served by being handed four digits instead.

In this app the two are separated. The seven memory difficulty levels move both dials together as you climb — Beginner shows three or four items on a 2×2 grid with a slow reveal; Champion shows up to twenty items on grids up to 7×7 with the fastest reveal, and the reveal window narrows from around 900 milliseconds at the bottom of the ladder to about 400 at the top. But **Custom Practice** breaks them apart, letting you set content, game type, session length, grid size and reveal speed independently.

Custom Practice is, for this purpose, the most accessibility-relevant mode in the app: it is the only place where "give me the same size task, more slowly" is expressible. If you are evaluating a different app, look for the same capability under whatever name it uses. If reveal speed only moves as a side effect of difficulty, it is not adjustable.

## Dial three: can a bad run drop you below where you meant to be?

Adaptive difficulty is helpful right up to the point where it starts punishing a bad day. In this app, adaptive adjustment lengthens the task by one step after three correct answers in a row and shortens it by one after two misses in a row — but it is clamped so that a bad patch can never drop below the floor of the level you chose.

That clamp matters more than it sounds. Without one, a run of misses caused by fatigue, interruption or a tremor can walk the difficulty down to something trivially easy, and the app then spends the rest of the session confirming a conclusion it drew from noise. A floor means the worst case is a hard session, not a demoralising one.

The related question — where to set that floor in the first place — is covered in [choosing a difficulty level](/blog/choosing-a-difficulty-level/), and it is genuinely a separate decision from anything in this article.

## Dial four: does anything depend on a single sense?

Android's own accessibility guidance is explicit that apps should use cues other than colour alone to distinguish elements, suggesting shape, size, text, pattern or haptic feedback as alternatives. The general principle behind it — never route essential information through one channel — is the one worth carrying.

Mental Math & Memory Games ships no sound assets whatsoever, so nothing in it depends on hearing. That is a consequence of how it was built rather than an accessibility feature we set out to provide, and it is worth stating as the fact it is. On the other side, the app is portrait-only, which is a genuine constraint for anyone using a device mounted in landscape or a keyboard case, and no amount of framing improves that.

The colour-dependency question is live in the memory modes specifically, because the higher levels deliberately mix similar shades as part of the difficulty. Where colour is the content of the task rather than its decoration, the honest answer is that the letter, number and mixed content families exist and do not use colour at all.

## What none of this amounts to

We have not audited this app against WCAG, and we make no conformance claim for it. Four design choices that happen to matter for accessibility are not a certification, and nobody should read them as one.

The W3C's supplemental guidance for cognitive and learning disabilities — developed beyond the WCAG requirements themselves — is a better place to look for the full picture, covering familiar design, consistent controls, error prevention and reducing reliance on memory in processes. Success Criterion 2.2.6, Timeouts, adds the related point that users should be warned about inactivity that could cost them data.

For the design side of memory formats specifically, [designing memory games beyond matching pairs](/blog/designing-memory-games-beyond-matching-pairs/) covers the format choices that sit underneath the accessibility ones, and the evidence framing for the whole category is in [our brain training explainer](/blog/do-brain-training-apps-work/). More sits in the [brain training games hub](/blog/topics/brain-training-games/) and the [education and brain category](/blog/category/education-brain/); the mode list is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/).
