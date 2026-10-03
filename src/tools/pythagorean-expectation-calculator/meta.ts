import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'pythagorean-expectation-calculator',
  sport: 'multi-sport',
  alsoFor: ['baseball', 'basketball', 'hockey'],
  order: 1,
  title: 'Pythagorean expectation calculator: expected wins from points, runs or goals',
  shortTitle: 'Pythagorean expectation',
  summary: 'The winning percentage and record a team’s points scored and allowed imply, with sourced exponents.',
  metaTitle: 'Pythagorean Expectation Calculator: Expected Wins',
  metaDescription:
    'Estimate the winning percentage and record a team’s runs, points or goals imply, compare it with the real record, with sourced exponents for each sport.',
  intro: [
    'Bill James noticed that a baseball team’s winning percentage tracks the ratio of runs scored to runs allowed, and wrote the relationship in a form that resembles the Pythagorean theorem. The same idea has been applied to other sports with exponents fitted to their scoring.',
    'Its common use is as a check on a record. A team that wins well beyond what its scoring margin implies is usually read as having overperformed, and MLB’s glossary uses exactly that reading to explain why such a team should not be expected to repeat its record. Enter the real wins too, and the calculator shows the gap.',
  ],
  primaryApp: 'baseball-draft-gm-team',
  appContext:
    '{app} asks a related question from the other direction: it projects the record a roster you draft would post over 162 games, from roster quality, position fit, hitting, pitching, speed, defence and coaching.',
  relatedArticles: [
    'regression-to-the-mean-in-sports',
    'understanding-sports-sim-probability',
    'how-sports-simulation-engines-work',
    'baseball-draft-gm-guide',
    'rebuild-vs-retool',
  ],
  relatedTools: ['batting-average-calculator', 'true-shooting-percentage-calculator'],
  faqs: [
    {
      question: 'Which exponent should I use?',
      answer:
        'The one fitted to your sport and your data source. Bill James’s original exponent was 2; Baseball-Reference uses 1.83 for baseball, Basketball-Reference uses 14 for basketball, an exponent it fitted to basketball results, and Alan Ryder’s 2004 hockey analysis applies James’s formula with an exponent of 2 to goals. For any other sport, use the exponent your reference publishes.',
    },
    {
      question: 'What does it mean when a team beats its Pythagorean record?',
      answer:
        'That it has won more games than its scoring margin would normally produce. MLB’s glossary uses the 2018 Seattle Mariners: 89-73 in reality, against a Pythagorean record of 77-85 as calculated by Baseball-Reference.',
    },
    {
      question: 'Does it work for American football or soccer?',
      answer:
        'The idea can be applied to any sport with a scoring margin, but draws and overtime complicate it, and we have not been able to open a published source for an American football or soccer exponent to verify one. Use the custom exponent if your source gives one.',
    },
    {
      question: 'Is the result a prediction?',
      answer:
        'No. It describes what a set of results implies about a team’s underlying strength. The rest-of-season figure only shows what the record would be if the team kept winning at that rate — a hypothetical, not a forecast of any game, and not betting guidance.',
    },
  ],
  sources: [
    {
      title: 'Pythagorean Winning Percentage',
      publisher: 'MLB.com Glossary',
      url: 'https://www.mlb.com/glossary/advanced-stats/pythagorean-winning-percentage',
      accessed: '2026-10-02',
    },
    {
      title: 'Glossary — Pythagorean wins',
      publisher: 'Basketball-Reference.com (Sports Reference)',
      url: 'https://www.basketball-reference.com/about/glossary.html',
      accessed: '2026-10-02',
    },
    {
      title: 'Win Probabilities (2004) — the Pythagorean relationship applied to hockey',
      publisher: 'Alan Ryder, Hockey Analytics',
      url: 'https://www.hockeyanalytics.com/Research_files/Win_Probabilities.pdf',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
