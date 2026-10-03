import type { ToolMeta } from '../types';

const glossary = (title: string, path: string) => ({
  title,
  publisher: 'MLB.com Glossary',
  url: `https://www.mlb.com/glossary/${path}`,
  accessed: '2026-10-02',
});

const meta: ToolMeta = {
  id: 'batting-average-calculator',
  sport: 'baseball',
  alsoFor: [],
  order: 1,
  title: 'Batting stats calculator: AVG, OBP, SLG, OPS, ISO and BABIP',
  shortTitle: 'Batting stats',
  summary: 'The full slash line, isolated power and BABIP from one hitter’s counting stats.',
  metaTitle: 'Batting Average Calculator: AVG, OBP, SLG, OPS',
  metaDescription:
    'Work out batting average, on-base percentage, slugging, OPS, isolated power and BABIP from a hitter’s line, using the Official Baseball Rules’ formulas.',
  intro: [
    'Batting average, on-base percentage and slugging percentage are defined in Rule 9.21 of MLB’s Official Baseball Rules, and each measures something different: hits per at-bat, times on base per opportunity, and bases per at-bat. OPS adds the last two, isolated power subtracts average from slugging to leave only extra bases, and BABIP looks only at balls put in play.',
    'Enter a hitter’s counting statistics once to get all six, with the totals each one is built from shown alongside. Strikeouts are only needed for BABIP.',
  ],
  primaryApp: 'baseball-career-sim',
  appContext:
    'In {app} the season record keeps hits, home runs, batting average, on-base percentage and slugging for the player you create, and they roll up into career totals.',
  relatedArticles: [
    'babip-explained',
    'ops-plus-vs-wrc-plus',
    'baseball-stats-explained-for-beginners',
    'ops-and-slugging-explained',
    'batting-order-strategy-explained',
    'baseball-draft-gm-guide',
  ],
  relatedTools: ['era-calculator', 'pythagorean-expectation-calculator'],
  faqs: [
    {
      question: 'Are walks counted in batting average?',
      answer:
        'No. A walk is not an at-bat, so it changes neither the top nor the bottom of batting average. Walks do count in on-base percentage, which adds walks and hit-by-pitches to times on base — which is why a patient hitter can have a modest average and a strong on-base percentage.',
    },
    {
      question: 'Do sacrifice flies count as at-bats?',
      answer:
        'No. A sacrifice fly is not an at-bat, so it does not affect batting average or slugging, but Rule 9.21(f) includes sacrifice flies in the denominator of on-base percentage — which is why a sacrifice fly lowers on-base percentage slightly.',
    },
    {
      question: 'Does reaching base on an error count toward OBP?',
      answer:
        'No. Times on base from errors, fielder’s choices and dropped third strikes are not counted, and Rule 9.21(f) tells scorers to ignore a batter awarded first base for interference, obstruction or a shift-restriction violation.',
    },
    {
      question: 'What is BABIP?',
      answer:
        'Batting average on balls in play: hits other than home runs, divided by at-bats minus strikeouts minus home runs plus sacrifice flies. It removes the outcomes the defence has no part in. MLB’s glossary gives the example of a 2-for-5 day with a home run and a strikeout — 1-for-3 on balls in play, a BABIP of .333.',
    },
    {
      question: 'Is OPS a precise measure?',
      answer:
        'It is a convenient shorthand. OPS adds two rates with different denominators, so it weights reaching base and hitting for power by convenience rather than by design. The OPS and slugging explainer covers what it captures and what it misses.',
    },
  ],
  sources: [
    {
      title: 'Official Baseball Rules, 2026 Edition — Rule 9.21, Determining Percentage Records',
      publisher: 'Major League Baseball',
      url: 'https://mktg.mlbstatic.com/mlb/official-information/2026-official-baseball-rules.pdf',
      accessed: '2026-10-02',
    },
    glossary('Batting Average (AVG)', 'standard-stats/batting-average'),
    glossary('On-base Percentage (OBP)', 'standard-stats/on-base-percentage'),
    glossary('Slugging Percentage (SLG)', 'standard-stats/slugging-percentage'),
    glossary('On-base Plus Slugging (OPS)', 'standard-stats/on-base-plus-slugging'),
    glossary('Isolated Power (ISO)', 'advanced-stats/isolated-power'),
    glossary('Batting Average on Balls in Play (BABIP)', 'advanced-stats/babip'),
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
