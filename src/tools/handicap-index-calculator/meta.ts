import type { ToolMeta } from '../types';

const roh = (title: string, page: string) => ({
  title: `Rules of Handicapping — ${title}`,
  publisher: 'USGA',
  url: `https://www.usga.org/handicapping/roh/Content/rules/${page}`,
  accessed: '2026-10-02',
});

const meta: ToolMeta = {
  id: 'handicap-index-calculator',
  sport: 'golf',
  alsoFor: [],
  order: 1,
  title: 'Golf handicap calculator: estimate your Handicap Index',
  shortTitle: 'Handicap Index',
  summary: 'Score differentials and an estimated Handicap Index under the World Handicap System.',
  metaTitle: 'Golf Handicap Calculator: Handicap Index (WHS)',
  metaDescription:
    'Turn your rounds into score differentials and an estimated Handicap Index under the World Handicap System, including the table for fewer than 20 scores.',
  intro: [
    'The World Handicap System, run by the USGA and The R&A, publishes its formulas in the Rules of Handicapping. This calculator follows them in order: each 18-hole round becomes a score differential, and your lowest differentials become a Handicap Index — using the published table when you have fewer than 20 scores.',
    'The result is an estimate. Only an authorized golf association issues an official Handicap Index, and some of its rules depend on your scoring history, which this page does not have; the explanation below says which.',
  ],
  primaryApp: 'golf-career-simulator',
  appContext:
    '{app} is our golf career game: you make the course-management decision on every shot and chase rankings across tour seasons, rather than timing a swing.',
  relatedArticles: [
    'golf-rules-for-beginners',
    'golf-handicap-for-beginners',
    'golf-scoring-explained',
    'strokes-gained-for-club-golfers',
    'golf-course-management-basics',
  ],
  relatedTools: ['course-handicap-calculator', 'pythagorean-expectation-calculator'],
  faqs: [
    {
      question: 'What is an adjusted gross score?',
      answer:
        'Your gross score, penalty strokes included, after the adjustments the Rules of Handicapping make for handicap purposes — for example, capping any hole at net double bogey, the maximum hole score for handicap purposes. Use the adjusted score, not your raw total, when calculating a differential.',
    },
    {
      question: 'Why does the formula use 113?',
      answer:
        'A course of standard relative difficulty has a Slope Rating of 113. Dividing 113 by your course’s Slope Rating scales the score to that standard, so differentials from easier and harder courses can be compared.',
    },
    {
      question: 'How many scores do I need for a Handicap Index?',
      answer:
        'At least three score differentials, which is where the USGA’s table for fewer than 20 scores begins. Below 20, the table decides how many of your lowest differentials are averaged and whether an adjustment applies; from 20 on, the index is the average of the lowest eight of the most recent twenty.',
    },
    {
      question: 'Is it the best 8 of 20?',
      answer:
        'Yes, once you have 20 scores: the average of the lowest eight score differentials among your most recent twenty, rounded to the nearest tenth. Older scores drop out as new ones are added, which is why the calculator only counts the last 20 you enter.',
    },
    {
      question: 'Does this calculator apply the soft cap and hard cap?',
      answer:
        'No. Those limits compare a new index with your Low Handicap Index — the lowest of the previous 365 days — which this page does not know. It also cannot apply exceptional-score reductions or a committee’s adjustments, so treat the result as an estimate and use the figure from your official handicap provider.',
    },
  ],
  sources: [
    roh('5.1a For an 18-hole Score', '5%201a%20Calculation%20of%20a%20Score%20Differential18Hole.htm'),
    roh('5.2a For Fewer Than 20 Scores', '5%202a%20For%20Fewer%20Than%2020%20Scores.htm'),
    {
      title: 'Rules of Handicapping — 5.2b For 20 Scores',
      publisher: 'USGA',
      url: 'https://www.usga.org/content/usga/home-page/handicapping/roh/Content/rules/5%202b%20For%2020%20Scores.htm',
      accessed: '2026-10-02',
    },
    roh('Appendix G: The Golf Course, Course Rating and Slope Rating', 'Appendix%20G%20Golf%20Course%20CourseRatingSlopeRating.htm'),
    roh('Definitions', 'Definitions.htm'),
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
