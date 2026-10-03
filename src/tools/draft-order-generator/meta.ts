import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'draft-order-generator',
  sport: 'multi-sport',
  alsoFor: ['basketball', 'baseball', 'football', 'hockey', 'soccer', 'rugby', 'combat-sports'],
  order: 2,
  title: 'Draft order generator: random, snake and third-round-reversal boards',
  shortTitle: 'Draft order',
  summary: 'A fair random draft order, and every team’s pick numbers in a snake, 3RR or straight draft.',
  metaTitle: 'Draft Order Generator: Random, Snake and 3RR',
  metaDescription:
    'Draw a fair random draft order and list every team’s pick numbers for a snake, third-round-reversal or straight draft, round by round.',
  intro: [
    'Paste in the teams, choose how the order runs from round to round, and draw a random order — or keep the order you entered. The page then lists every pick each team will make, so everyone knows their turns before the draft starts.',
    'The draw uses the Fisher–Yates shuffle, which gives every possible order the same chance, fed by your browser’s cryptographic random number generator. Add a seed instead if the league wants a draw anyone can repeat and check.',
  ],
  primaryApp: 'soccer-draft-gm-xi',
  appContext:
    '{app} is a draft game for soccer: each run offers a fresh set of player choices, and limited drafts, budget challenges and computer battles change what a good squad looks like.',
  relatedArticles: [
    'snake-draft-vs-auction-draft',
    'how-fantasy-draft-strategy-works',
    'how-draft-lotteries-work',
    'what-makes-a-good-draft-board',
  ],
  relatedTools: ['pythagorean-expectation-calculator', 'passer-rating-calculator'],
  faqs: [
    {
      question: 'What is a snake draft?',
      answer:
        'A draft in which the pick order reverses each round — 1 to 10, then 10 to 1, then 1 to 10 again, as ESPN’s fantasy help puts it. The team with the first pick waits longest for its second, which evens out the advantage of picking first.',
    },
    {
      question: 'What is a third-round reversal (3RR) draft?',
      answer:
        'A snake draft in which round three repeats round two’s order instead of reversing again; after that it snakes as usual. The team that picked first now waits longest at the next turn too, which shifts some of the first pick’s advantage back to the end of the order.',
    },
    {
      question: 'Is the random order fair?',
      answer:
        'Without a seed, yes: the Fisher–Yates shuffle gives every order of the teams the same probability, and the random numbers come from your browser’s cryptographic generator with no bias toward any value. A seeded draw is repeatable, which makes it checkable, but it comes from a small pseudo-random generator that cannot produce every possible order once a league is large.',
    },
    {
      question: 'How many picks pass between my turns in a snake draft?',
      answer:
        'In a league of N teams, the team in slot S waits through 2 × (N − S) other picks after each odd-round pick and 2 × (S − 1) after each even-round pick. The two waits always add up to 2 × (N − 1).',
    },
    {
      question: 'Which draft slot is best?',
      answer:
        'None in general. The first slot gets the top player but waits longest for its next turn; a middle slot gets evenly spaced picks; the last slot picks twice in a row at every turn. Which suits a team depends on how the player pool falls into tiers, which a generator cannot know.',
    },
  ],
  sources: [
    {
      title: 'Live Online Snake Drafts',
      publisher: 'ESPN Fan Support',
      url: 'https://support.espn.com/hc/en-us/articles/360000067532-Live-Online-Snake-Drafts',
      accessed: '2026-10-02',
    },
    {
      title: 'Draft Order Help — snake, 3RR and straight drafts',
      publisher: 'Fantasy Postseason',
      url: 'https://www.fantasypostseason.com/help/draft_order',
      accessed: '2026-10-02',
    },
    {
      title: 'Fisher-Yates shuffle',
      publisher: 'NIST Dictionary of Algorithms and Data Structures',
      url: 'https://xlinux.nist.gov/dads/HTML/fisherYatesShuffle.html',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
