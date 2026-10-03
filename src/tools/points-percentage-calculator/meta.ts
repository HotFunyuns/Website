import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'points-percentage-calculator',
  sport: 'hockey',
  alsoFor: [],
  order: 2,
  title: 'Hockey points percentage calculator, with points pace and magic numbers',
  shortTitle: 'Points percentage and pace',
  summary:
    'Standings points, points percentage, pace over 84 or 82 games, and points-based clinch and elimination numbers against another team.',
  metaTitle: 'Hockey Points Percentage, Pace and Magic Number',
  metaDescription:
    'Turn a hockey record into standings points, points percentage and a points pace over 84 or 82 games, plus clinch and elimination numbers against a rival.',
  intro: [
    'Hockey standings count points, not wins: two for any win, one for a loss in overtime or a shootout, none for a regulation loss. That third result is why a win-loss record does not show where a team stands, and why teams that have played different numbers of games are compared by points percentage.',
    'Enter a record to see its points, points percentage and pace over the NHL’s 84-game 2026-27 schedule and the 82 games of earlier seasons. Add a second team to see how many points stand between your team and finishing ahead of it — or behind it.',
  ],
  primaryApp: 'hockey-draft-gm-manager',
  appContext:
    '{app} turns a drafted starting six and coach into a projected 84-game regular-season record, and its Franchise GM Mode carries one draft across several seasons.',
  relatedArticles: [
    'how-do-nhl-standings-work',
    'nhl-84-game-season',
    'hockey-draft-gm-guide',
    'how-soccer-league-tables-work',
    'understanding-sports-sim-probability',
    'plus-minus-and-hockey-stats',
  ],
  relatedTools: ['magic-number-calculator', 'save-percentage-calculator', 'pythagorean-expectation-calculator'],
  faqs: [
    {
      question: 'How do you calculate points percentage in hockey?',
      answer:
        'Divide standings points by the most points the team could have earned — two for every game played. Fifty wins, 20 regulation losses and six overtime or shootout losses is 106 points from 76 games, or 106 ÷ 152 = .697.',
    },
    {
      question: 'How many points is a win in the NHL?',
      answer:
        'Two, whether it comes in regulation, overtime or a shootout. A team that loses in overtime or a shootout gets one point, and a regulation loss gets none — Rule 78.1 of the NHL’s 2026-27 rulebook.',
    },
    {
      question: 'How many games are in the 2026-27 NHL season?',
      answer:
        'Eighty-four. The NHL’s 2026-27 schedule gives every team 84 regular-season games — 42 at home and 42 away — up from 82. It is the first 84-game season since 1993-94.',
    },
    {
      question: 'What is a points pace?',
      answer:
        'The points a team would finish with if it kept earning them at its current rate: points per game played, multiplied by the games in the season. It extends the season so far; it is arithmetic, not a forecast.',
    },
    {
      question: 'How is a hockey magic number different from a wins-based one?',
      answer:
        'A wins-based magic number counts games won and lost. In hockey an overtime or shootout loss still earns a point, so this calculator counts points: those your team earns, plus those the other team fails to earn — two for each regulation loss, one for each overtime or shootout loss.',
    },
    {
      question: 'Does the magic number account for tie-breakers?',
      answer:
        'Only as far as you tell it. You choose which team finishes ahead if the two end level on points; the calculator does not apply any league’s tie-breaking order.',
    },
  ],
  sources: [
    {
      title: 'National Hockey League Official Rules 2026-2027 — Rule 78.1 and Rule 84.1',
      publisher: 'National Hockey League',
      url: 'https://media.nhl.com/site/asset/public/ext/2026-27/2026-27Rules.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'NHL Stats Glossary — PTS%',
      publisher: 'Hockey-Reference.com (Sports Reference)',
      url: 'https://www.hockey-reference.com/about/glossary.html',
      accessed: '2026-10-02',
    },
    {
      title: 'NHL releases 2026-27 regular-season schedule (84 games per team, up from 82)',
      publisher: 'NHL.com',
      url: 'https://www.nhl.com/news/nhl-releases-2026-27-regular-season-schedule',
      accessed: '2026-10-02',
    },
    {
      title: '10 things to know about 2026-27 NHL regular season',
      publisher: 'NHL.com (NHL Public Relations)',
      url: 'https://www.nhl.com/news/nhl-stats-pack-2026-27-regular-season-schedule',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
