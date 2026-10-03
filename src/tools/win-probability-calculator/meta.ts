import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'win-probability-calculator',
  sport: 'tennis',
  alsoFor: [],
  order: 1,
  title: 'Tennis win probability calculator: from points on serve to games, sets and matches',
  shortTitle: 'Tennis win probability',
  summary: 'The chance of holding serve and of winning a tie-break, a set and the match, from each player’s share of points won on serve.',
  metaTitle: 'Tennis Win Probability Calculator: Games to Matches',
  metaDescription:
    'From each player’s chance of winning a point on serve, calculate the chance of holding serve and of winning a tie-break, a set and the match.',
  intro: [
    'Tennis scoring nests points inside games, games inside sets and sets inside a match, and each layer magnifies a small edge. A player who wins 62% of points on serve against an opponent who wins 60% is only slightly better point by point, yet wins a best-of-five match about five times in eight.',
    'Enter each player’s chance of winning a point on their own serve and choose the format. The calculator follows Newton and Keller’s published model, in which every point is independent and the two chances stay fixed all match, and works out each probability exactly.',
  ],
  primaryApp: 'tennis-career-sim',
  appContext:
    '{app} resolves its matches at the points that matter: you decide how to serve, return, defend and attack under pressure, with your attributes, style and preparation setting what is on the table.',
  relatedArticles: [
    'tennis-stats-explained',
    'tennis-tiebreak-rules',
    'playing-the-big-points-in-tennis',
    'tennis-scoring-for-beginners',
    'understanding-sports-sim-probability',
    'serve-and-volley-strategy',
  ],
  relatedTools: ['elo-rating-calculator', 'perfect-season-calculator'],
  faqs: [
    {
      question: 'How does a small edge on serve become a big edge in a match?',
      answer:
        'Each layer of the scoring compounds it. With 62% of points won on serve against 60%, the better server holds 77.6% of service games to 73.6%, wins 56.8% of sets and 62.6% of best-of-five matches. A longer match gives the better player more chances to show it.',
    },
    {
      question: 'What does the model assume?',
      answer:
        'That every point is independent and each player’s chance of winning a point on serve stays the same all match — Newton and Keller’s “iid” assumption. Real points are not quite like that: pressure, fatigue and tactics all matter. Newton and Keller cite an analysis of four years of Wimbledon data finding that the departure from this assumption is small for most purposes.',
    },
    {
      question: 'Does it matter who serves first?',
      answer:
        'Not in this model. Newton and Keller proved that the chance of winning a set, and so a match, is the same whoever serves first, and the calculator’s exact figures agree for every format it offers.',
    },
    {
      question: 'Which formats can it handle?',
      answer:
        'Best of three or best of five sets, with a seven-point tie-break at six games all. The final set can instead be an advantage set or a 10-point match tie-break, and games can be played with No-Ad scoring, where deuce is settled by one deciding point — the alternatives in the ITF Rules of Tennis.',
    },
    {
      question: 'Is the result a prediction?',
      answer:
        'No. It shows what two fixed serving percentages imply under a simple model, which is useful for understanding how tennis scoring works. It does not forecast any real match and is not betting guidance.',
    },
  ],
  sources: [
    {
      title: 'Probability of Winning at Tennis I. Theory and Data (Studies in Applied Mathematics 114:241–269, 2005)',
      publisher: 'Paul K. Newton and Joseph B. Keller (copy hosted for a University of Pennsylvania course)',
      url: 'https://www.cis.upenn.edu/~bhusnur4/cit592_fall2013/NeKe2005.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'ITF Rules of Tennis, 2021 edition — Rules 5 and 6 and Appendix V (No-Ad, match tie-break)',
      publisher: 'International Tennis Federation',
      url: 'https://www.itftennis.com/media/4421/2021-rules-of-tennis-english.pdf',
      accessed: '2026-10-02',
    },
    {
      title: '1.3.6.6.18. Binomial Distribution — e-Handbook of Statistical Methods',
      publisher: 'NIST/SEMATECH',
      url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
