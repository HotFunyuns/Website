import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'perfect-season-calculator',
  sport: 'multi-sport',
  alsoFor: ['basketball', 'baseball', 'football', 'soccer', 'combat-sports'],
  order: 3,
  title: 'Perfect season calculator: how likely is 20–0, 40–0 or an unbeaten season?',
  shortTitle: 'Perfect season',
  summary: 'The chance of a perfect or unbeaten season from one game’s chance of a win (and of a draw), with the assumptions stated.',
  metaTitle: 'Perfect Season Calculator: Chance of Going Unbeaten',
  metaDescription:
    'Work out the chance of a perfect or unbeaten season from a team’s chance of winning each game, for 17, 20, 38, 82 or 162 games, with the maths shown.',
  intro: [
    'A perfect season needs every game won, and the chances multiply. A team that wins nine games in ten goes 20–0 roughly once in every eight tries, and 162–0 about once in 26 million: the same team, a very different result, purely because of length.',
    'Enter one game’s chance of a win — and of a draw, in sports that have them — and the calculator shows the chance of a perfect season, an unbeaten one, and a season with at most one or two losses. It treats every game as having the same chances and the games as independent of each other, which no real season is; the limits below explain what that leaves out.',
  ],
  primaryApp: 'mma-boxing-fight-draft',
  appContext:
    '{app} is built around the same target: forty fights without a loss. Its simulators settle each bout on style, ratings and weight class, so the higher-rated fighter does not always get the nod — which is why getting a stable to 40–0 is the whole challenge.',
  relatedArticles: [
    'has-any-team-gone-82-0',
    'has-any-team-gone-162-0',
    'understanding-sports-sim-probability',
    'how-sports-simulation-engines-work',
    'how-soccer-league-tables-work',
    'style-matchups-in-a-fight-simulator',
  ],
  relatedTools: ['pythagorean-expectation-calculator', 'elo-rating-calculator'],
  faqs: [
    {
      question: 'How is the chance of a perfect season calculated?',
      answer:
        'By multiplying the chance of winning each game. With the same chance w in every game and games independent of each other, a perfect season of n games has probability w to the power n. This is the binomial distribution’s chance of n successes in n trials, as set out in NIST’s e-Handbook of Statistical Methods.',
    },
    {
      question: 'What is the difference between a perfect season and an unbeaten one?',
      answer:
        'A perfect season wins every game; an unbeaten one loses none, so draws are allowed. With a win chance w and a draw chance d per game, an unbeaten season of n games has probability (w + d) to the power n. In sports without draws the two are the same number.',
    },
    {
      question: 'Why does the length of the season matter so much?',
      answer:
        'Because every extra game is another chance to lose, and the chances compound. At 90% a game, 20–0 happens about once in 8.2 seasons, while 162–0 is about 1 in 25.9 million. Raising the per-game chance to 95% makes 162–0 about 1 in 4,060 — still rare, but thousands of times less so.',
    },
    {
      question: 'What win chance would give an even chance of a perfect season?',
      answer:
        'The n-th root of one half. For a 20-game season that is about 96.6% a game; for 162 games it is about 99.6%. The calculator shows the figure for the season length you choose.',
    },
    {
      question: 'Is the result a prediction?',
      answer:
        'No. It shows what one simple model implies: the same chances in every game and no link between one game and the next. Real teams face stronger and weaker opponents, travel, rest and injuries, so treat the result as an illustration of how chances compound — not a forecast, and not betting guidance.',
    },
  ],
  sources: [
    {
      title: '1.3.6.6.18. Binomial Distribution — e-Handbook of Statistical Methods',
      publisher: 'NIST/SEMATECH',
      url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm',
      accessed: '2026-10-02',
    },
    {
      title: 'Official Baseball Rules, 2026 Edition — Rule 9.22(a) Comment (a 162-game schedule)',
      publisher: 'Major League Baseball',
      url: 'https://mktg.mlbstatic.com/mlb/official-information/2026-official-baseball-rules.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'NBA announces schedule for 2026-27 season (82 games each)',
      publisher: 'NBA.com',
      url: 'https://www.nba.com/news/2026-27-nba-regular-season-schedule',
      accessed: '2026-10-02',
    },
    {
      title: 'Official 2025 NFL Record & Fact Book — scheduling formula and postseason seeding',
      publisher: 'National Football League',
      url: 'https://static.clubs.nfl.com/image/upload/patriots/fvc6qgwyqlztq1muztpi.pdf',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
