import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'passer-rating-calculator',
  sport: 'football',
  alsoFor: [],
  order: 1,
  title: 'Passer rating calculator: NFL rating and NCAA passing efficiency',
  shortTitle: 'Passer rating',
  summary: 'NFL passer rating with its four components, and NCAA passing efficiency, from one stat line.',
  metaTitle: 'Passer Rating Calculator (NFL and NCAA)',
  metaDescription:
    'Calculate NFL passer rating with all four components, and NCAA passing efficiency, from attempts, completions, yards, touchdowns and interceptions.',
  intro: [
    'Passer rating is the system the NFL has used to rate its passers since 1973: four per-attempt rates — completions, yards, touchdown passes and interceptions — converted to points and combined on a scale that tops out at 158.3. College football rates passers with a different formula, passing efficiency, from the NCAA’s statisticians’ manual.',
    'Enter one stat line to see both, with the NFL rating’s four components laid out so you can tell whether a number is being carried by accuracy, by big gains, by touchdowns or by avoiding interceptions.',
  ],
  primaryApp: 'football-career-sim',
  appContext:
    '{app} follows one quarterback’s career, and its seasons keep the numbers these formulas are built from — passing yards, touchdowns, interceptions and completion percentage.',
  relatedArticles: [
    'what-is-epa-in-football',
    'quarterback-archetypes-explained',
    'reading-a-defense-basics',
    'football-career-sim-guide',
    'football-positions-explained-for-drafting',
  ],
  relatedTools: ['pythagorean-expectation-calculator', 'draft-order-generator'],
  faqs: [
    {
      question: 'What is a good passer rating?',
      answer:
        'The NFL set the scale so that average passing, by the standard it was built against, scores 1.000 in each component — a rating of 66.7 — and calls 2.000 in a component exceptional. Because that standard is fixed rather than re-set each year, a rating means most when you compare it with other passers from the same era.',
    },
    {
      question: 'Why is the highest possible passer rating 158.3?',
      answer:
        'Each component is capped at 2.375. Four capped components add up to 9.5, and 9.5 divided by six and multiplied by 100 is 158.3. Reaching it needs at least 77.5% completions, 12.5 yards per attempt, touchdowns on 11.875% of attempts and no interceptions, all at once.',
    },
    {
      question: 'How is college passing efficiency different?',
      answer:
        'The NCAA formula adds the completion percentage, 8.4 times the yards per attempt and 3.3 times the touchdown percentage, then subtracts twice the interception percentage. It has no cap or floor, and its manual says the multipliers were chosen to make 100 the average rating, so its numbers sit on a different scale from the NFL’s.',
    },
    {
      question: 'Does passer rating include sacks, rushing or fumbles?',
      answer:
        'No. Both formulas use only pass attempts, completions, passing yards, touchdown passes and interceptions. Anything a quarterback does as a runner, and any ball lost other than by interception, is outside them.',
    },
    {
      question: 'How many attempts does a passer need?',
      answer:
        'The NFL formula works for any passer with at least one attempt — the league says so in its own explanation. Leaderboards set minimums before ranking anyone: the NCAA manual, for example, requires an average of 15 attempts per game played to qualify for its national rankings.',
    },
  ],
  sources: [
    {
      title: 'Official 2025 National Football League Record & Fact Book — passer rating explanation',
      publisher: 'National Football League',
      url: 'https://static.clubs.nfl.com/image/upload/patriots/fvc6qgwyqlztq1muztpi.pdf',
      accessed: '2026-10-02',
    },
    {
      title: '2020 NCAA Football Statisticians’ Manual — item 16, pass efficiency, and its sample compilation',
      publisher: 'National Collegiate Athletic Association',
      unlinked:
        'Published at fs.ncaa.org, which serves it only over unencrypted HTTP, so it is cited here by name rather than linked.',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
