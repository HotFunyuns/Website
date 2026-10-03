import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'four-factors-calculator',
  sport: 'basketball',
  alsoFor: [],
  order: 3,
  title: 'Four factors calculator, with possessions, pace and offensive, defensive and net rating',
  shortTitle: 'Four factors and net rating',
  summary:
    'Dean Oliver’s four factors for a team and its opponent, plus estimated possessions, pace and offensive, defensive and net rating.',
  metaTitle: 'Four Factors Calculator: Pace and Net Rating',
  metaDescription:
    'Work out Dean Oliver’s four factors for a team and its opponent, plus estimated possessions, pace and offensive, defensive and net rating.',
  intro: [
    'Dean Oliver identified four things a basketball team has to do well: shoot efficiently, avoid turnovers, rebound its misses and get to the free-throw line. Each can be measured from a box score, for a team’s offence and — by measuring its opponent — for its defence.',
    'Enter both teams’ totals for a game or a season to see which factors decided it, along with possessions, pace and the per-100-possession ratings estimated from the same numbers.',
  ],
  primaryApp: 'pro-basketball-draft-gm-mode',
  appContext:
    '{app} has you draft a roster, set rotations and handle trades and contracts across a full 82-game season, where balance and depth carry more weight than any single pick.',
  relatedArticles: [
    'how-to-read-a-basketball-box-score',
    'basketball-advanced-stats-explained',
    'how-to-build-a-balanced-basketball-roster',
    'how-sports-simulation-engines-work',
    'basketball-draft-gm-guide',
  ],
  relatedTools: ['true-shooting-percentage-calculator', 'per-36-calculator', 'pythagorean-expectation-calculator'],
  faqs: [
    {
      question: 'What are the four factors in basketball?',
      answer:
        'Shooting (effective field-goal percentage), turnovers (turnover percentage), rebounding (offensive rebound percentage) and free throws (free throws made per field-goal attempt). Basketball-Reference reports the approximate weights Dean Oliver gave them as 40%, 25%, 20% and 15%.',
    },
    {
      question: 'How are possessions calculated?',
      answer:
        'They are estimated, not counted. This calculator uses Basketball-Reference’s formula, which estimates each team’s possessions from its shots, free-throw attempts, offensive rebounds and turnovers, then averages the two estimates.',
    },
    {
      question: 'What is pace in basketball?',
      answer:
        'An estimate of possessions per 48 minutes. Basketball-Reference divides possessions by the game minutes played — team minutes divided by five — and multiplies by 48, or by 40 for the WNBA.',
    },
    {
      question: 'What is net rating?',
      answer:
        'Offensive rating minus defensive rating — points scored minus points allowed per 100 possessions, as the NBA’s stat glossary defines it. A positive number means the team outscored its opponents per possession.',
    },
    {
      question: 'Why do my ratings differ from other sites?',
      answer:
        'Possessions can be estimated in more than one way, so ratings from different sources rarely match exactly. This page uses Basketball-Reference’s published estimate, and its code reproduces Basketball-Reference’s own figures for one season.',
    },
  ],
  sources: [
    {
      title: 'Four Factors',
      publisher: 'Basketball-Reference.com (Sports Reference)',
      url: 'https://www.basketball-reference.com/about/factors.html',
      accessed: '2026-10-02',
    },
    {
      title: 'Glossary — Poss, Pace, ORtg and DRtg',
      publisher: 'Basketball-Reference.com (Sports Reference)',
      url: 'https://www.basketball-reference.com/about/glossary.html',
      accessed: '2026-10-02',
    },
    {
      title: 'Stat Glossary — OffRtg, DefRtg and NetRtg',
      publisher: 'NBA.com',
      url: 'https://www.nba.com/stats/help/glossary',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
