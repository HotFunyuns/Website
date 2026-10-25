---
{
  "title": "The Pigeonhole Principle: Simple Statement, Surprising Proofs",
  "metaTitle": "Pigeonhole Principle: Statement, Proof and Examples",
  "description": "If more than n items go into n boxes, some box holds two. The general version, how to choose the boxes, and seven worked examples from socks to compression.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "combinatorics", "pigeonhole principle", "proofs"],
  "primaryKeyword": "pigeonhole principle",
  "secondaryKeywords": [
    "pigeonhole principle examples",
    "generalized pigeonhole principle",
    "pigeonhole principle proof",
    "pigeonhole principle problems with solutions",
    "pigeonhole principle in computer science"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how many socks to guarantee a matching pair",
    "choose 6 numbers from 1 to 10 two add to 11",
    "two integers with difference divisible by n",
    "why no compression can shrink every file"
  ],
  "aiSearchQuestions": [
    "What is the pigeonhole principle?",
    "What is the generalized pigeonhole principle?",
    "How do you solve pigeonhole principle problems?",
    "How is the pigeonhole principle used in computer science?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "injective-surjective-bijective",
    "proof-by-contradiction-explained",
    "modular-arithmetic-explained",
    "ramsey-numbers-introduction",
    "birthday-problem-explained",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "If more than n objects are placed in n boxes, at least one box contains at least two objects.",
    "Generalised: if N objects go into n boxes, some box holds at least ⌈N/n⌉ of them.",
    "The art is choosing the boxes: remainders, pairs that sum to a target, or regions of a shape.",
    "The principle proves existence without saying which box is crowded or where.",
    "In function terms, there is no injection from a larger finite set into a smaller one."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the pigeonhole principle?",
      "answer": "If more objects are placed into boxes than there are boxes, at least one box must contain two or more objects. With 13 people and 12 months, at least two people share a birth month. It sounds obvious, but choosing clever boxes turns it into a powerful proof technique."
    },
    {
      "question": "What is the generalized pigeonhole principle?",
      "answer": "If N objects are placed into n boxes, some box contains at least ⌈N/n⌉ objects, where ⌈ ⌉ means round up. With 25 people and 12 months, some month has at least ⌈25/12⌉ = 3 birthdays."
    },
    {
      "question": "How do I know what the pigeons and holes are?",
      "answer": "The pigeons are the things you have more of, often the objects chosen in the problem. The holes are categories with the property you want two pigeons to share: the same remainder, a pair that sums to a target, or the same small region. If there are more pigeons than holes, two share a hole and the property follows."
    },
    {
      "question": "How is the pigeonhole principle used in computer science?",
      "answer": "It shows that hash functions must have collisions when there are more possible keys than hash values, and that no lossless compression scheme can shorten every file, because there are fewer short files than long ones. Both are the same counting fact: no function from a larger finite set to a smaller one is one-to-one."
    }
  ],
  "sources": [
    {
      "title": "Properties of Functions: The Pigeonhole Principle (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-properties-of-functions.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Proofs (Discrete Mathematics: An Open Introduction, 3rd edition, Oscar Levin)",
      "publisher": "Open Math Books",
      "url": "https://discrete.openmathbooks.org/dmoi3/sec_logic-proofs.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

The pigeonhole principle says that if 10 pigeons fly into 9 holes, some hole gets at least two pigeons. *Applied Discrete Structures* calls it an obvious, common-sense statement with numerous applications, and adds a warning that applies to the rest of this guide: never underestimate the importance of simple ideas. Used with the right choice of "holes", it proves results that look nothing like pigeons.

## The statement and its proof

**Pigeonhole principle.** If more than n objects are placed into n boxes, at least one box contains at least two objects.

Levin's *Discrete Mathematics: An Open Introduction* proves it by contradiction in two lines. Suppose every box contained at most one object. Then there would be at most n objects, but there are more than n. So some box holds at least two.

**Generalised version.** If N objects go into n boxes, some box contains at least ⌈N/n⌉ objects (N/n rounded up). If every box had fewer, the total would be at most n(⌈N/n⌉ − 1), which is less than N. *Applied Discrete Structures* states it for functions: if f maps a finite set X to a finite set Y and |X| > k|Y|, some element of Y is the image of at least k + 1 elements of X.

That function version gives a useful translation: **no function from a larger finite set to a smaller one can be one-to-one.** The [injective, surjective and bijective guide](/blog/injective-surjective-bijective/) uses it.

## Seven examples, from easy to clever

**1. Birth months.** Among 13 people, two share a birth month: 13 people, 12 months. Among 25 people, at least ⌈25/12⌉ = 3 share one. Note what is *not* claimed: nothing says which month, or that any month is empty.

**2. Socks in the dark.** A drawer holds black and white socks. How many must you take to be sure of a matching pair? Three. The boxes are the two colours; three socks in two colours force a pair. Two socks are not enough, since one could be each colour.

**3. Pairs that sum to 11.** Choose any 6 numbers from 1 to 10. Then two of them add up to 11. The trick is the boxes: {1, 10}, {2, 9}, {3, 8}, {4, 7}, {5, 6}. Each number lies in exactly one box, and 6 numbers in 5 boxes put two in the same box, which sum to 11. With only 5 numbers it can fail: 1, 2, 3, 4, 5.

**4. Differences divisible by 7.** Among any 8 integers, two have a difference divisible by 7. Boxes: the remainders 0 to 6 on division by 7. Eight integers, seven remainders, so two share a remainder, and integers with the same remainder differ by a multiple of 7. This remainder trick is everywhere in number theory; [modular arithmetic](/blog/modular-arithmetic-explained/) explains why equal remainders mean the difference is divisible.

**5. Points in a square.** Place 5 points anywhere in a 1-by-1 square. Then two of them are at most √2/2 ≈ 0.707 apart. Boxes: cut the square into four 1/2-by-1/2 squares. Five points in four small squares put two in the same one, and two points in a square of side 1/2 are at most its diagonal, √2/2, apart.

**6. Handshakes at a party.** At any party of n ≥ 2 people, two people shook the same number of hands. Each person shook between 0 and n − 1 hands, n possible values. But 0 and n − 1 cannot both occur: someone who shook everyone's hand rules out someone who shook nobody's. So the n people have at most n − 1 possible values, and two share one. In graph terms, every simple graph with at least two vertices has two vertices of equal degree.

**7. Compression.** No lossless compression program can make every file shorter. There are 2ⁿ files of exactly n bits, but only 2ⁿ − 1 files shorter than n bits (2⁰ + 2¹ + ⋯ + 2ⁿ⁻¹). If every n-bit file were mapped to a shorter one, two different files would share a compressed form and could not both be recovered. So any lossless compressor that shortens some files must leave others the same length or make them longer.

## How to set up a pigeonhole proof

1. **Identify what you have too many of.** These are the pigeons: people, numbers, points.
2. **Design the boxes** so that two pigeons in one box have the property you want: same remainder, sum of 11, close together.
3. **Count.** Check there are more pigeons than boxes, or use ⌈N/n⌉ for the general version.
4. **Conclude** that two pigeons share a box, and translate back.

Step 2 is the creative part. If the boxes are not obvious, ask: what would two objects need to have in common for the conclusion to follow? The answer is the box.

## Related ideas

The pigeonhole principle guarantees a collision once objects outnumber boxes. The [birthday problem](/blog/birthday-problem-explained/) asks the probabilistic question instead: how likely is a collision long before that point? With 365 possible birthdays, pigeonhole needs 366 people for certainty, but 23 people already give better than even odds.

At the far end of the subject, [Ramsey theory](/blog/ramsey-numbers-introduction/) is pigeonhole reasoning applied repeatedly: in any group of six people, three are mutual acquaintances or three are mutual strangers, and the proof starts with a pigeonhole step.

[Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) has a combinatorics unit and a proof techniques unit, each with lessons and knowledge checks. It is listed with our [education apps](/apps/category/education-brain/), and the [discrete math hub](/blog/topics/discrete-math/) collects the other counting guides.
