import type { ToolMeta } from '../types';

const glossary = (title: string, path: string) => ({
  title,
  publisher: 'MLB.com Glossary',
  url: `https://www.mlb.com/glossary/${path}`,
  accessed: '2026-10-02',
});

const meta: ToolMeta = {
  id: 'era-calculator',
  sport: 'baseball',
  alsoFor: [],
  order: 2,
  title: 'ERA calculator: ERA, WHIP, K/9, BB/9, K/BB and FIP',
  shortTitle: 'Pitching stats',
  summary: 'ERA (for nine-inning or shorter games), WHIP, rate stats and FIP from a pitcher’s line.',
  metaTitle: 'ERA Calculator: ERA, WHIP, K/9, BB/9 and FIP',
  metaDescription:
    'Calculate ERA for nine- or seven-inning games, WHIP, K/9, BB/9, HR/9, K/BB and FIP from a pitcher’s line, with innings entered as a box score writes them.',
  intro: [
    'Earned-run average is defined in the Official Baseball Rules; WHIP, the per-nine rates and the strikeout-to-walk ratio are the statistics usually printed beside it. All of them are scaled to innings, and innings are where most hand calculations go wrong: 6.1 innings in a box score means six and one-third, not six and one-tenth.',
    'This calculator takes innings the way box scores write them, can scale ERA to a shorter regulation game, and adds fielding independent pitching when you supply — or work out — the season’s constant.',
  ],
  primaryApp: 'baseball-draft-gm-team',
  appContext:
    '{app} compares pitchers on ERA and WHIP, among other numbers, before you draft them, and its Franchise GM Mode has you manage the rotation and bullpen.',
  relatedArticles: [
    'fip-vs-era',
    'what-is-era-in-baseball',
    'what-is-whip-in-baseball',
    'baseball-pitching-roles-explained',
    'baseball-stats-explained-for-beginners',
  ],
  relatedTools: ['batting-average-calculator', 'pythagorean-expectation-calculator'],
  faqs: [
    {
      question: 'Why does 6.1 innings mean six and one-third?',
      answer:
        'Each out recorded is one-third of an inning, so box scores write one extra out as .1 and two as .2. The calculator converts 6.1 to 6⅓ before doing any arithmetic, and it rejects a value such as 6.3, because the third out completes the inning.',
    },
    {
      question: 'How do I calculate ERA for a seven-inning game?',
      answer:
        'Multiply earned runs by seven instead of nine before dividing by innings pitched. The Official Baseball Rules always use nine, but some leagues that play shorter games scale ERA to their own game length, so the calculator shows the nine-inning figure and, if you choose a shorter game, the scaled one beside it.',
    },
    {
      question: 'Why does ERA count only earned runs?',
      answer:
        'Because runs that score with the aid of an error or a passed ball are not charged to the pitcher as earned. ERA is earned runs multiplied by nine and divided by innings pitched — the rulebook’s own example is 3 earned runs in 9⅓ innings for an ERA of 2.89.',
    },
    {
      question: 'What is FIP, and where does its constant come from?',
      answer:
        'Fielding independent pitching uses only home runs, walks, hit batters and strikeouts — the outcomes fielders have least to do with — weighted 13, 3, 3 and −2 per inning, then adds a constant that puts the result on the league’s ERA scale. The FanGraphs Sabermetrics Library notes the constant is generally around 3.10 and shows how to derive it from league totals, which the calculator can do for you.',
    },
    {
      question: 'Does WHIP count hit batters?',
      answer:
        'No. WHIP is walks plus hits divided by innings pitched. Hit batters, errors and batters who reach on a fielder’s choice are not part of it.',
    },
  ],
  sources: [
    {
      title: 'Official Baseball Rules, 2026 Edition — Rule 9.21(e), earned-run average',
      publisher: 'Major League Baseball',
      url: 'https://mktg.mlbstatic.com/mlb/official-information/2026-official-baseball-rules.pdf',
      accessed: '2026-10-02',
    },
    glossary('Earned Run Average (ERA)', 'standard-stats/earned-run-average'),
    glossary('Innings Pitched (IP)', 'standard-stats/innings-pitched'),
    glossary('Walks And Hits Per Inning Pitched (WHIP)', 'standard-stats/walks-and-hits-per-inning-pitched'),
    glossary('Strikeouts Per Nine Innings (K/9)', 'advanced-stats/strikeouts-per-nine-innings'),
    glossary('Walks Per Nine Innings (BB/9)', 'advanced-stats/walks-per-nine-innings'),
    glossary('Home Runs Per Nine Innings (HR/9)', 'advanced-stats/home-runs-per-nine-innings'),
    glossary('Strikeout-to-walk Ratio (K/BB)', 'advanced-stats/strikeout-to-walk-ratio'),
    {
      title: 'FIP',
      publisher: 'FanGraphs Sabermetrics Library',
      url: 'https://library.fangraphs.com/pitching/fip/',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
