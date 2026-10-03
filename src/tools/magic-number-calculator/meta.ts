import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'magic-number-calculator',
  sport: 'multi-sport',
  alsoFor: ['baseball', 'basketball', 'football'],
  order: 6,
  title: 'Magic number calculator, with elimination number, games behind and winning percentage',
  shortTitle: 'Magic number',
  summary: 'The magic number to clinch, the trailing team’s elimination number, games behind and winning percentages for a two-team race.',
  metaTitle: 'Magic Number Calculator: Clinch and Elimination',
  metaDescription:
    'Work out a team’s magic number to clinch, the trailing team’s elimination number, games behind and winning percentage, with the tiebreaker caveat.',
  intro: [
    'A magic number counts how close a leading team is to clinching: the combination of its own wins and its closest rival’s losses that leaves the rival unable to catch up. Each leader win takes one off, and so does each rival loss.',
    'Enter the length of the season and both teams’ records. The calculator gives the magic number by the formula in MLB’s glossary, the trailing team’s elimination number, games behind, each team’s winning percentage and the most wins each can still reach — and shows how holding the tiebreaker changes the count.',
  ],
  primaryApp: 'baseball-draft-gm-team',
  appContext:
    '{app} looks at a season from the other end: you draft nine players and a coach, and its season simulator returns a projected record over 162 games.',
  relatedArticles: [
    'how-do-nhl-standings-work',
    'how-do-nfl-playoffs-work',
    'baseball-draft-gm-guide',
    'baseball-stats-explained-for-beginners',
    'understanding-sports-sim-probability',
    'how-football-draft-order-works',
  ],
  relatedTools: ['pythagorean-expectation-calculator', 'perfect-season-calculator'],
  faqs: [
    {
      question: 'How is the magic number calculated?',
      answer:
        'MLB’s glossary gives it as games remaining + 1 − (losses by the second-place team − losses by the first-place team). When both teams play the same number of games, that is the same as the season’s length + 1 − the leader’s wins − the rival’s losses. A leader win or a rival loss each take one off.',
    },
    {
      question: 'What is the elimination number?',
      answer:
        'The same count seen from the trailing team’s side — MLB’s glossary also calls it the tragic number. When it reaches zero, the trailing team can no longer finish ahead of the leader.',
    },
    {
      question: 'Does the tiebreaker change the magic number?',
      answer:
        'It can. The “+ 1” in the formula makes the leader finish strictly ahead. If the leader would win a tie in the standings — where a league breaks ties by a rule such as head-to-head record, as the NFL’s published procedures do — finishing level is enough, so the number is one smaller. That adjustment is derived from the formula, not stated in MLB’s glossary, so check your league’s own tiebreaker rules.',
    },
    {
      question: 'How are games behind worked out?',
      answer:
        'As the average of how far a team trails the leader in the win column and in the loss column, as Milton Eisner set out for SABR. Trailing by 4 wins and 1 loss is 2½ games behind. When teams have played different numbers of games it can mislead: Eisner’s own example has a team trailing on percentage while “ahead” by half a game.',
    },
    {
      question: 'How do tied games count?',
      answer:
        'Baseball’s rulebook works winning percentage out from wins and losses alone. The NFL counts a tie as half a win and half a loss for both teams, so 10–6–1 is (10 + ½) ÷ 17 = .618. The calculator shows winning percentages with ties, but gives a magic number only for records without them.',
    },
  ],
  sources: [
    {
      title: 'Magic Number (MN) — glossary',
      publisher: 'MLB.com',
      url: 'https://www.mlb.com/glossary/advanced-stats/magic-number',
      accessed: '2026-10-02',
    },
    {
      title: 'A Truer Measure of ‘Games Behind’ (Baseball Research Journal, 1986), by Milton P. Eisner',
      publisher: 'Society for American Baseball Research',
      url: 'https://sabr.org/journal/article/a-truer-measure-of-games-behind/',
      accessed: '2026-10-02',
    },
    {
      title: 'Official Baseball Rules, 2026 Edition — Rule 9.21(a), percentage of games won and lost',
      publisher: 'Major League Baseball',
      url: 'https://mktg.mlbstatic.com/mlb/official-information/2026-official-baseball-rules.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'NFL Tiebreaking Procedures',
      publisher: 'NFL.com',
      url: 'https://www.nfl.com/standings/tie-breaking-procedures',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
