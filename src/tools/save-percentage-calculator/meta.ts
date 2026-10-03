import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'save-percentage-calculator',
  sport: 'hockey',
  alsoFor: [],
  order: 1,
  title: 'Save percentage and GAA calculator for goalies',
  shortTitle: 'Save percentage',
  summary: 'Save percentage, goals-against average and shots faced per game from a goalie’s line.',
  metaTitle: 'Save Percentage and GAA Calculator (Hockey)',
  metaDescription:
    'Calculate a goalie’s save percentage, goals-against average and shots faced per game from shots, goals and minutes, with both formulas and their limits.',
  intro: [
    'Save percentage and goals-against average are the two numbers printed beside every goaltender’s name, and they measure different things. Save percentage is per shot: how often the goaltender stopped the puck. Goals-against average is per 60 minutes: how many goals went in during a regulation game’s worth of time, however many shots the defence allowed.',
    'Enter shots, goals and time played to see both, along with the saves and the shot volume they come from — which is usually why the two numbers disagree.',
  ],
  primaryApp: 'hockey-career-sim',
  appContext: 'In {app} you can play a whole career as a goalie, with goaltending among the attributes you develop through training.',
  relatedArticles: [
    'when-to-pull-the-goalie',
    'what-is-expected-goals-in-hockey',
    'hockey-goaltending-explained',
    'plus-minus-and-hockey-stats',
    'hockey-positions-explained',
    'hockey-draft-gm-guide',
  ],
  relatedTools: ['pythagorean-expectation-calculator', 'draft-order-generator'],
  faqs: [
    {
      question: 'How do you calculate save percentage?',
      answer:
        'Divide saves by shots against, where saves are shots against minus goals against. A goalie who faces 30 shots and allows 2 goals has made 28 saves, a save percentage of .933.',
    },
    {
      question: 'How can a goalie with a good save percentage have a poor GAA?',
      answer:
        'Because goals-against average depends on how many shots the defence allows. A goalie stopping 92% of shots concedes 3.2 goals per 60 minutes when facing 40 shots a game, and 2.0 when facing 25. Save percentage isolates the goalie a little more; goals-against average reflects the whole team’s defending.',
    },
    {
      question: 'How is save percentage usually written?',
      answer: 'As a three-decimal number such as .915, meaning 91.5% of shots on goal were saved. The calculator shows both forms.',
    },
    {
      question: 'What counts as minutes played?',
      answer:
        'The time the goalie was actually in the game. A goalie replaced after two periods has played 40 minutes, so goals allowed in that time are scaled up to a 60-minute rate.',
    },
    {
      question: 'What if my league plays shorter games?',
      answer:
        'The standard definition always scales to 60 minutes. If your league plays shorter games, the calculator can also express the same rate per game of your length — useful for comparing goalies within that league, but not with goalies whose GAA uses 60.',
    },
  ],
  sources: [
    {
      title: 'NHL Stats Glossary — GAA, SV and SV%',
      publisher: 'Hockey-Reference.com (Sports Reference)',
      url: 'https://www.hockey-reference.com/about/glossary.html',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
