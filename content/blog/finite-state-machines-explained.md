---
{
  "title": "Finite State Machines: States, Transitions and the Strings They Accept",
  "metaTitle": "Finite State Machines Explained, with Worked Examples",
  "description": "A finite state machine reads input one symbol at a time and changes state. How to design one, trace an input, and see what no finite machine can recognise.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "automata", "finite state machines", "computer science"],
  "primaryKeyword": "finite state machine",
  "secondaryKeywords": [
    "deterministic finite automaton",
    "state transition diagram",
    "transition table",
    "finite automaton examples",
    "regular languages"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "dfa that accepts binary numbers divisible by 3",
    "finite state machine for even number of 1s",
    "why can't a finite automaton recognise balanced parentheses",
    "finite state machine with output example"
  ],
  "aiSearchQuestions": [
    "What is a finite state machine?",
    "How do you design a finite automaton for a language?",
    "What is the difference between a state diagram and a transition table?",
    "What can't a finite state machine do?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "boolean-algebra-and-logic-gates",
    "modular-arithmetic-explained",
    "pigeonhole-principle-examples",
    "number-bases-and-binary",
    "countable-vs-uncountable-sets",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "A deterministic finite automaton has finitely many states, an input alphabet, a transition rule, a start state and a set of accepting states.",
    "It reads a string one symbol at a time, moving between states, and accepts the string if it ends in an accepting state.",
    "Design a machine by deciding what each state must remember: for divisibility by 3 in binary, the remainder so far.",
    "Machines with output, such as a vending machine or a parity checker, produce an output with each transition.",
    "Finite memory has limits: by the pigeonhole principle, no finite automaton can check that brackets are balanced."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a finite state machine?",
      "answer": "An abstract machine that is always in one of finitely many states and changes state according to each input symbol it reads. In its accepting form, a deterministic finite automaton, it accepts or rejects whole input strings depending on the state it ends in."
    },
    {
      "question": "How do you design a finite automaton?",
      "answer": "Decide what the machine must remember about the input read so far, using as few distinct cases as possible. Make each case a state, choose the start state, mark the states that should accept, and fill in where each state goes on each symbol. Then trace a few test strings."
    },
    {
      "question": "What is the difference between a state diagram and a transition table?",
      "answer": "They hold the same information. A state diagram draws states as circles and transitions as labelled arrows, with accepting states double-circled. A transition table lists each state as a row and each input symbol as a column, with the next state in each cell."
    },
    {
      "question": "What can't a finite state machine recognise?",
      "answer": "Languages that need unbounded memory, such as strings of n a's followed by n b's or balanced brackets. With k states, two different counts of a's must lead to the same state, so the machine cannot tell them apart and will make a mistake on one of them."
    }
  ],
  "sources": [
    {
      "title": "Automata, Finite-State Machines (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-automata-finite-state-machines.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Finite Automaton",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/FiniteAutomaton.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "6.042J Mathematics for Computer Science, Spring 2015: Course description",
      "publisher": "MIT OpenCourseWare",
      "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/",
      "accessed": "2026-10-24"
    }
  ]
}
---

A turnstile is locked until you pay, then unlocked until you pass. A vending machine remembers how much money has gone in. A text search scans characters looking for a pattern. Each of these remembers only a little about the past and reacts to each new input according to fixed rules. That is a **finite state machine**, one of the "discrete structures" that MIT's Mathematics for Computer Science course description lists alongside graphs and modular arithmetic.

## Five ingredients of an automaton

MathWorld describes a finite automaton as an abstract machine with finitely many internal states that reads an input string one symbol at a time. In its deterministic form it consists of:

1. a finite set of **states**,
2. a finite **input alphabet**, such as {0, 1},
3. a **transition function** saying, for each state and input symbol, which state comes next,
4. a **start state**, and
5. a set of **accepting states**.

The machine starts in the start state, reads the input left to right, follows one transition per symbol, and **accepts** the string if it finishes in an accepting state.

## Example 1: an even number of 1s

Alphabet {0, 1}. Accept strings containing an even number of 1s.

The machine only needs to remember one fact: whether it has seen an even or odd number of 1s so far. Two states:

| State | On 0 | On 1 |
| --- | --- | --- |
| Even (start, accepting) | Even | Odd |
| Odd | Odd | Even |

**Trace 10110:** Even →1→ Odd →0→ Odd →1→ Even →1→ Odd →0→ Odd. It ends in Odd: rejected, correctly, since the string has three 1s.

*Applied Discrete Structures* includes a parity-checking machine of this kind among its examples, alongside a vending machine and a binary adder.

## Example 2: binary numbers divisible by 3

Accept binary strings whose value is a multiple of 3. The key design question is: what must the machine remember? Not the whole number, only its **remainder mod 3**. Reading one more bit b turns a number x into 2x + b, so the remainder r becomes (2r + b) mod 3.

| State (remainder) | On 0 | On 1 |
| --- | --- | --- |
| 0 (start, accepting) | 0 | 1 |
| 1 | 2 | 0 |
| 2 | 1 | 2 |

**Trace 110 (six):** 0 →1→ 1 →1→ 0 →0→ 0. Accepted.
**Trace 101 (five):** 0 →1→ 1 →0→ 2 →1→ 2. Rejected; five leaves remainder 2.

The arithmetic behind the table is [modular arithmetic](/blog/modular-arithmetic-explained/), and the reading of bits left to right is the place-value idea from [number bases and binary](/blog/number-bases-and-binary/). The same design gives a k-state machine for divisibility by any k.

## Example 3: strings ending in 01

Accept binary strings that end with 01. The machine remembers how much of the pattern "01" it has just seen.

| State | Meaning | On 0 | On 1 |
| --- | --- | --- | --- |
| A (start) | No progress | B | A |
| B | Just read 0 | B | C |
| C (accepting) | Just read 01 | B | A |

**Trace 1001:** A →1→ A →0→ B →0→ B →1→ C. Accepted. The same idea, one state per amount of the pattern matched so far, builds a machine for any fixed ending.

## Machines with output

Some definitions attach an **output** to each transition instead of, or as well as, accepting states. *Applied Discrete Structures* defines finite-state machines this way, with an input set, an output set and a rule for the output, and models a simple vending machine that dispenses packets of gum. A traffic light controller, a turnstile and a serial binary adder, which outputs one sum bit per pair of input bits while its state remembers the carry, all fit this pattern. The adder connects to the half adder built from gates in [Boolean algebra and logic gates](/blog/boolean-algebra-and-logic-gates/).

## What finite machines cannot do

Finite memory is a real limit. Consider the strings aⁿbⁿ: some number of a's followed by the same number of b's.

**Claim.** No finite automaton accepts exactly these strings.

**Proof.** Suppose a machine with k states did. Feed it a, aa, aaa, …, up to k + 1 a's. That is k + 1 strings and only k states, so by the [pigeonhole principle](/blog/pigeonhole-principle-examples/) two of them, aⁱ and aʲ with i ≠ j, leave the machine in the same state. From that state, reading bⁱ must lead to acceptance, because aⁱbⁱ is in the language. But then aʲbⁱ is accepted too, although i ≠ j. Contradiction. ∎

The same argument shows balanced brackets cannot be checked by a finite automaton: a string of n opening brackets must be followed by exactly n closing ones. The languages that finite automata *can* recognise are called **regular languages**, and MathWorld notes that nondeterministic automata, which may have several possible next states, recognise exactly the same class.

## Designing your own

1. Decide what must be remembered, and find the fewest distinct cases.
2. Make one state per case; choose the start state.
3. Mark the accepting states.
4. Fill in every transition: each state needs exactly one arrow for every symbol.
5. Trace strings that should be accepted and strings that should not.

**Practice.** Design machines for: strings with no two consecutive 1s (three states, one a "dead" state); strings whose length is a multiple of 3; binary numbers divisible by 4 (the last two bits must be 00).

Machines like these are where computability starts: there are only countably many machines but uncountably many languages, so uncountably many languages are recognised by no machine at all, an argument from [countable versus uncountable sets](/blog/countable-vs-uncountable-sets/). For practice across the whole course, [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has topic quizzes and a review of missed questions. Browse our [education apps](/apps/category/education-brain/), or the [discrete math hub](/blog/topics/discrete-math/) for related guides.
