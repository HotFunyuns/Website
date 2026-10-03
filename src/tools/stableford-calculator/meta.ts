import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'stableford-calculator',
  sport: 'golf',
  alsoFor: [],
  order: 3,
  title: 'Stableford calculator: points per hole from your strokes and Playing Handicap',
  shortTitle: 'Stableford points',
  summary: 'Stableford points hole by hole and in total, with Playing Handicap strokes allocated by stroke index.',
  metaTitle: 'Stableford Calculator: Points With Handicap Strokes',
  metaDescription:
    'Score a Stableford card hole by hole: allocate Playing Handicap strokes by stroke index, then apply the Rule 21.1 points table for 18 or 9 holes.',
  intro: [
    'Stableford scores each hole with points rather than strokes: two for a net par, one for a net bogey, three for a net birdie, and nothing once a hole goes worse than net bogey. The highest total wins, and one disastrous hole costs at most two points.',
    'Enter the card — par, stroke index and your strokes for each hole — and your Playing Handicap. The calculator gives your handicap strokes on each hole by stroke index, then scores every hole by the points table in Rule 21.1 of the Rules of Golf.',
  ],
  primaryApp: 'golf-career-simulator',
  appContext:
    '{app} is a golf career game decided by course management: you choose how to play each hole from the lie, the distance and the wind, across multi-round events with cuts, leaderboards and playoffs.',
  relatedArticles: [
    'match-play-scoring-explained',
    'golf-tournament-formats',
    'golf-scoring-explained',
    'golf-handicap-for-beginners',
    'golf-course-management-basics',
  ],
  relatedTools: ['course-handicap-calculator', 'handicap-index-calculator'],
  faqs: [
    {
      question: 'How are Stableford points worked out?',
      answer:
        'Rule 21.1b compares your score on each hole with a fixed target score, which is par unless the Committee sets another: two points for the fixed score, one for one over, three for one under, four for two under, five for three under and six for four under. More than one over, or no score at all, earns nothing. In a handicap competition your handicap strokes come off each hole’s score first.',
    },
    {
      question: 'How are handicap strokes given out?',
      answer:
        'By stroke index, as Appendix E of the Rules of Handicapping describes. With a Playing Handicap of 12 you receive a stroke on the holes with stroke index 1 to 12. Above 18, the order repeats — stroke index 1 counts again as 19 — so a Playing Handicap of 20 gives one stroke on every hole and two on stroke index 1 and 2.',
    },
    {
      question: 'What does a score of 36 points mean?',
      answer:
        'It is what net par on every hole scores over 18 holes: two points a hole. Finishing above 36 means you played better than net par overall; below 36, worse. Over nine holes the equivalent figure is 18.',
    },
    {
      question: 'What happens if I pick up on a hole?',
      answer:
        'You score zero points for it. Rule 21.1b says a player who does not hole out gets no points for the hole, and encourages players to stop once their score can no longer earn a point. Enter an “x” for that hole.',
    },
    {
      question: 'Does it work for nine holes and plus handicaps?',
      answer:
        'Yes. For nine holes, Appendix E takes the strokes in ascending order of the holes’ 18-hole stroke indexes, which the calculator does whether you enter those indexes or a 1–9 allocation. A plus handicap gives strokes back from the hole with the highest stroke index; Appendix E says so for nine-hole play, and the calculator uses the same order over 18 holes.',
    },
  ],
  sources: [
    {
      title: 'Rules of Golf, Rule 21 — Other Forms of Individual Stroke Play and Match Play (21.1 Stableford)',
      publisher: 'The R&A',
      url: 'https://www.randa.org/en/rog/the-rules-of-golf/rule-21',
      accessed: '2026-10-02',
    },
    {
      title: 'Rules of Handicapping — Appendix E: Stroke Index Allocation',
      publisher: 'The R&A',
      url: 'https://www.randa.org/en/roh/appendices/appendix-e',
      accessed: '2026-10-02',
    },
    {
      title: 'Rules of Handicapping — Rule 3: Adjusting Hole Scores (net double bogey)',
      publisher: 'The R&A',
      url: 'https://www.randa.org/en/roh/the-rules-of-handicapping/rule-3',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
