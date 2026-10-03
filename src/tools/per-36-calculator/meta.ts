import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'per-36-calculator',
  sport: 'basketball',
  alsoFor: [],
  order: 2,
  title: 'Per-36 calculator, with usage rate, Game Score and assist-to-turnover ratio',
  shortTitle: 'Per-36 and usage rate',
  summary: 'Per-36 rates, usage percentage, Game Score and assist-to-turnover ratio from one player’s box-score line.',
  metaTitle: 'Per 36 Calculator: Usage Rate, Game Score, AST/TO',
  metaDescription:
    'Scale a basketball stat line to 36 minutes and work out usage rate, Game Score and assist-to-turnover ratio, with each formula and its limits shown.',
  intro: [
    'Raw totals reward minutes. A reserve who scores 14 in 24 minutes and a starter who scores 18 in 38 are not doing the same thing, and per-36 rates put them on one footing. Usage rate adds the other half of the picture: how much of the team’s offence ran through the player while they were on the floor.',
    'Enter one game, per-game averages or season totals. Game Score and the assist-to-turnover ratio come from the same line; add the team’s totals to see usage.',
  ],
  primaryApp: 'pro-basketball-my-career-sim',
  appContext:
    '{app} follows one player you create from youth basketball to the pros, and its Live Sim hands you the key possessions — take the shot or move it on, lock down your matchup or call for help.',
  relatedArticles: [
    'player-efficiency-rating-explained',
    'basketball-advanced-stats-explained',
    'basketball-career-sim-guide',
    'how-to-build-a-balanced-basketball-roster',
    'basketball-draft-gm-guide',
  ],
  relatedTools: ['true-shooting-percentage-calculator', 'four-factors-calculator', 'pythagorean-expectation-calculator'],
  faqs: [
    {
      question: 'How do you calculate per-36 stats?',
      answer:
        'Divide the statistic by minutes played and multiply by 36 — the definition Basketball-Reference uses. A player with 14 points in 24 minutes is scoring 21.0 points per 36.',
    },
    {
      question: 'What is usage rate in basketball?',
      answer:
        'An estimate of the share of a team’s plays a player used while on the floor. Field-goal attempts, free-throw attempts (weighted at 0.44 each) and turnovers are compared with the team’s over the same stretch of minutes, using Basketball-Reference’s formula.',
    },
    {
      question: 'What is a good Game Score?',
      answer:
        'Basketball-Reference describes the scale as similar to points scored: 40 is an outstanding performance and 10 an average one. Game Score was designed to rate a single game, not a season.',
    },
    {
      question: 'Why can per-36 numbers mislead?',
      answer:
        'They assume a player would keep the same rate over more minutes, in the same role and against the same opponents, and none of that is guaranteed. Over a handful of minutes, one good or bad stretch also moves the figures a long way.',
    },
    {
      question: 'How is assist-to-turnover ratio calculated?',
      answer:
        'Assists divided by turnovers: three assists and two turnovers is 1.50. With no turnovers there is nothing to divide by, so the calculator shows a dash instead of a number.',
    },
  ],
  sources: [
    {
      title: 'Glossary — Per 36 Minutes, Usg% and GmSc',
      publisher: 'Basketball-Reference.com (Sports Reference)',
      url: 'https://www.basketball-reference.com/about/glossary.html',
      accessed: '2026-10-02',
    },
    {
      title: 'Stat Glossary — AST/TO',
      publisher: 'NBA.com',
      url: 'https://www.nba.com/stats/help/glossary',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
