import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'draft-lottery-simulator',
  sport: 'multi-sport',
  alsoFor: ['basketball', 'baseball'],
  order: 5,
  title: 'Draft lottery simulator: every team’s chance of every pick, with seeded draws',
  shortTitle: 'Draft lottery',
  summary: 'Exact pick-by-pick chances for a weighted draft lottery — MLB’s 2026 odds or your own league’s — plus repeatable simulated draws.',
  metaTitle: 'Draft Lottery Simulator: Pick Chances and Draws',
  metaDescription:
    'Simulate a weighted draft lottery with MLB’s published 2026 odds or your league’s own, and see each team’s exact chance of landing every pick.',
  intro: [
    'In a weighted draft lottery the worst teams get the best chances, but the draw can still move any team up or down. This simulator lists every team’s exact chance of every pick, then lets you run one draw or thousands to watch those chances play out.',
    'It starts on Major League Baseball’s 2026 lottery as MLB published it. Change the teams and odds for your own league — a fantasy league, a classroom draw, a what-if — and the chances update as you type.',
  ],
  primaryApp: 'pro-basketball-draft-gm-mode',
  appContext:
    '{app} starts at the draft board too: you build a roster from the available pool, weigh value against fit, and take the team through a full 82-game season and the playoff race.',
  relatedArticles: [
    'nba-playoff-format',
    'how-does-the-nhl-draft-work',
    'how-draft-lotteries-work',
    'how-football-draft-order-works',
    'rebuild-vs-retool',
    'expansion-drafts-explained',
  ],
  relatedTools: ['draft-order-generator', 'magic-number-calculator'],
  faqs: [
    {
      question: 'How does a weighted draft lottery work?',
      answer:
        'Each team is given a share of the chances — combinations of numbered balls, in the NBA’s and MLB’s drawings — with more for worse records. Each draw picks one of the teams not yet drawn in proportion to its share; NBA.com describes discarding and redrawing any combination that belongs to a team already drawn. After the drawn picks, the other teams follow in reverse order of their records.',
    },
    {
      question: 'Why can the worst team fall several places?',
      answer:
        'Because every team that is drawn ahead of it pushes it down one place. In MLB’s 2026 lottery six picks were drawn, so the worst eligible team could fall to seventh. Under the NBA’s format for 2026, with four picks drawn, the worst team had a 14.0% chance of the first pick but a 47.9% chance of picking fifth.',
    },
    {
      question: 'Which leagues have presets?',
      answer:
        'Only MLB’s 2026 lottery, the one current official odds table we could check together with the rules needed to model it. The NBA has approved a new “3-2-1 Lottery” from 2027 whose announcement does not say how its pick floors are applied, and we could not open an official current odds table for the NHL. Enter any league’s odds yourself as a custom lottery.',
    },
    {
      question: 'Are the chances calculated or simulated?',
      answer:
        'Calculated. The table works out every possible order of draws exactly, which takes a fraction of a second for the MLB preset. The simulation buttons are there to show single draws and to let you see a few thousand lotteries land close to the exact figures. Very large lotteries are simulated only.',
    },
    {
      question: 'Can I use it for my own league?',
      answer:
        'Yes. List the teams worst record first, give each one its odds — a percentage, a number of combinations or balls, or “ineligible” — and set how many picks the draw decides. A seed makes a draw repeatable, so everyone in the league can check it.',
    },
  ],
  sources: [
    {
      title: 'Odds for 2026 MLB Draft Lottery',
      publisher: 'MLB.com',
      url: 'https://www.mlb.com/news/odds-for-2026-mlb-draft-lottery',
      accessed: '2026-10-02',
    },
    {
      title: 'MLB Draft lottery unlike any other — base odds, six picks, eligibility',
      publisher: 'MLB.com',
      url: 'https://www.mlb.com/news/mlb-draft-lottery-unlike-any-other',
      accessed: '2026-10-02',
    },
    {
      title: 'NBA Draft Lottery: How it works, odds and where to watch',
      publisher: 'NBA.com',
      url: 'https://www.nba.com/news/nba-draft-lottery-explainer',
      accessed: '2026-10-02',
    },
    {
      title: 'NBA Board of Governors approves new Draft Lottery system to address tanking',
      publisher: 'NBA.com',
      url: 'https://www.nba.com/news/nba-board-governors-approve-new-draft-lottery-system',
      accessed: '2026-10-02',
    },
    {
      title: 'NHL Draft Lottery changes announced for 2021',
      publisher: 'NHL.com',
      url: 'https://www.nhl.com/news/nhl-draft-lottery-changes-announced-for-2021-322838154',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
