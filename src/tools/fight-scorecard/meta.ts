import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'fight-scorecard',
  sport: 'combat-sports',
  alsoFor: [],
  order: 2,
  title: 'Fight scorecard: score a boxing or MMA bout round by round',
  shortTitle: 'Fight scorecard',
  summary:
    'Score three judges’ cards round by round under the 10-point must system, add point deductions, and see the decision.',
  metaTitle: 'Boxing and MMA Scorecard Calculator (10-Point Must)',
  metaDescription:
    'Score a boxing or MMA bout on three judges’ cards, add point deductions, and see the totals and the decision: unanimous, split, majority or a draw.',
  intro: [
    'Boxing and MMA judges score every round on its own under the 10-point must system: ten points to the round’s winner, nine or fewer to the loser, and 10-10 only for a rare even round. The referee’s point deductions come off the offender’s score, and the three totals decide the bout.',
    'Score a bout round by round to see each card’s total and the decision it produces — unanimous, split or majority, or one of the three kinds of draw. The page holds no real fighters or bouts; it scores the rounds you enter.',
  ],
  primaryApp: 'mma-boxing-fight-draft',
  appContext:
    '{app} settles bouts with separate simulators: its mixed martial arts bouts end by knockout, technical knockout, submission or decision, and its boxing simulator adds draws and judges’ scorecards.',
  relatedArticles: [
    'boxing-rules-for-beginners',
    'ko-vs-tko-how-fights-end',
    'boxing-scoring-explained',
    'how-mma-judging-criteria-work',
    'how-boxing-records-are-written',
    'mma-boxing-fight-draft-guide',
  ],
  relatedTools: ['weight-class-finder'],
  faqs: [
    {
      question: 'How does the 10-point must system work?',
      answer:
        'Each judge gives the winner of every round 10 points and the loser 9 or fewer. A round with nothing between the fighters is scored 10-10, which the ABC’s MMA rules call rare and its boxing judge manual says should rarely happen. The round scores are added up at the end.',
    },
    {
      question: 'What is the difference between a split and a majority decision?',
      answer:
        'In a split decision two judges score the bout for one fighter and the third for the other. In a majority decision two judges score it for the same fighter and the third scores it a draw. Those are the definitions in the ABC’s unified rules.',
    },
    {
      question: 'When is a fight a draw?',
      answer:
        'When no fighter wins a majority of the three cards: all three level (a unanimous draw), two level (a majority draw), or one card each way and one level (a split draw). Nevada’s boxing rule puts it plainly — if there is no majority, the decision is a draw.',
    },
    {
      question: 'How do point deductions work?',
      answer:
        'The referee takes points away for fouls, and they come off the offending fighter’s score on every judge’s card. Under the ABC’s unified rules, an intentional foul that causes an injury costs two points, and that deduction is mandatory.',
    },
    {
      question: 'When is a round scored 10-8?',
      answer:
        'In MMA, when a fighter wins by a large margin through damage, dominance and duration. In boxing, the ABC’s judge manual treats a knockdown as a 10-8 round in most cases, as well as an extremely one-sided round without one; two knockdowns usually make it 10-7.',
    },
  ],
  sources: [
    {
      title: 'Unified Rules of Mixed Martial Arts (amended 5 August 2026) — Judging Criteria and Types of Decisions',
      publisher: 'Association of Boxing Commissions and Combative Sports',
      url: 'https://www.abcboxing.com/wp-content/uploads/2026/08/Unified-Rules-of-MMA-8.2026.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'Unified Rules of Boxing (amended 3 August 2016)',
      publisher: 'Association of Boxing Commissions',
      url: 'https://www.abcboxing.com/wp-content/uploads/2016/10/unified_rules_boxing_rev_august2016.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'Boxing Judge Manual (rev. 06/2024) — Calculating the score; Scoring a foul/penalty',
      publisher: 'Association of Boxing Commissions and Combative Sports',
      url: 'https://www.abcboxing.com/wp-content/uploads/2025/10/ABC-BOXING-JUDGE-MANUAL.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'Nevada Administrative Code 467.612 (judging boxing) and 467.7968 (results of MMA contests)',
      publisher: 'Nevada Legislature (Nevada Athletic Commission regulations)',
      url: 'https://www.leg.state.nv.us/NAC/NAC-467.html',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
