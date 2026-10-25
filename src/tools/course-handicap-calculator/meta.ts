import type { ToolMeta } from '../types';

const roh = (title: string, page: string) => ({
  title: `Rules of Handicapping — ${title}`,
  publisher: 'USGA',
  url: `https://www.usga.org/handicapping/roh/Content/rules/${page}`,
  accessed: '2026-10-24',
});

const meta: ToolMeta = {
  id: 'course-handicap-calculator',
  sport: 'golf',
  alsoFor: [],
  order: 2,
  title: 'Course handicap calculator, with playing handicap by format',
  shortTitle: 'Course handicap',
  summary: 'The strokes a Handicap Index gives you on a set of tees, and the playing handicap for a format.',
  metaTitle: 'Course Handicap Calculator (and Playing Handicap)',
  metaDescription:
    'Convert a Handicap Index into a course handicap for any set of tees, then a playing handicap with the USGA’s recommended allowance for your format.',
  intro: [
    'A Handicap Index describes your ability on a course of standard difficulty. A course handicap converts it into the number of strokes you receive from the tees you are actually playing, using their Slope Rating, Course Rating and par. A playing handicap then applies the allowance for the format of the day.',
    'Enter your index and the tees’ ratings to get both, with the rounding the Rules of Handicapping require.',
  ],
  primaryApp: 'golf-career-simulator',
  appContext:
    '{app} is our golf career game: you make the course-management decision on every shot and chase rankings across tour seasons, rather than timing a swing.',
  relatedArticles: [
    'how-par-is-determined',
    'match-play-scoring-explained',
    'golf-tournament-formats',
    'golf-handicap-for-beginners',
  ],
  relatedTools: ['handicap-index-calculator', 'stableford-calculator'],
  faqs: [
    {
      question: 'What is the difference between course handicap and playing handicap?',
      answer:
        'A course handicap is the number of strokes you receive from a particular set of tees. A playing handicap applies the handicap allowance for the format being played — 95% for individual stroke play and 100% for individual match play are the USGA’s recommendations — to the unrounded course handicap.',
    },
    {
      question: 'Which course handicap do I use for net double bogey?',
      answer:
        'The rounded one. Rule 6.1a rounds the course handicap, with .5 rounded up, when it is used to apply the maximum hole score for handicap purposes or to deal with a hole that was not played. For a playing handicap, the unrounded value is kept until the allowance has been applied.',
    },
    {
      question: 'Why can my course handicap be higher than my Handicap Index?',
      answer:
        'Because the tees you are playing are harder than standard. A Slope Rating above 113 raises the handicap in proportion, and a Course Rating above par adds the difference on top.',
    },
    {
      question: 'How is match play handled?',
      answer:
        'After the allowance is applied, the player with the lowest playing handicap plays off zero, and the others receive the difference between their playing handicap and that lowest one.',
    },
    {
      question: 'What about plus handicaps?',
      answer:
        'A Handicap Index better than scratch is written with a plus sign and entered here as a negative number. When an allowance is applied, a plus playing handicap moves toward zero, rounding included, as Appendix C describes.',
    },
  ],
  sources: [
    roh('6.1a For an 18-hole Round', '6%201a%2018%20holes.htm'),
    roh('6.2a Standard Calculation', '6%202a%20Standard%20Calculation.htm'),
    roh('Appendix C: Handicap Allowances', 'Appendix%20C%20Handicap%20Allowances.htm'),
    roh('Appendix G: The Golf Course, Course Rating and Slope Rating', 'Appendix%20G%20Golf%20Course%20CourseRatingSlopeRating.htm'),
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-24',
};

export default meta;
