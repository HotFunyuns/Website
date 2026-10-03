import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'true-shooting-percentage-calculator',
  sport: 'basketball',
  alsoFor: [],
  order: 1,
  title: 'True shooting percentage calculator, with eFG%, FG%, 3P% and FT%',
  shortTitle: 'True shooting',
  summary: 'True shooting, effective field-goal and the plain shooting percentages from one box-score line.',
  metaTitle: 'True Shooting Percentage Calculator (TS% and eFG%)',
  metaDescription:
    'Calculate true shooting percentage, effective field-goal percentage and FG%, 3P% and FT% from a basketball box-score line, with every step shown.',
  intro: [
    'Field-goal percentage treats a layup and a three-pointer as the same thing. Effective field-goal percentage and true shooting percentage correct that in two steps: the first gives a made three the extra credit its extra point deserves, the second also counts free throws.',
    'Enter one shooting line to see all of them side by side — and how far apart they can be for the same player.',
  ],
  primaryApp: 'pro-basketball-my-career-sim',
  appContext:
    'In {app} the court view shows the score, player stats, momentum and positioning as each possession plays out, and your player’s career runs from youth basketball to the pros.',
  relatedArticles: [
    'player-efficiency-rating-explained',
    'how-to-read-a-basketball-box-score',
    'basketball-advanced-stats-explained',
    'basketball-career-sim-guide',
    'how-to-build-a-balanced-basketball-roster',
    'basketball-draft-gm-guide',
  ],
  relatedTools: ['pythagorean-expectation-calculator', 'draft-order-generator'],
  faqs: [
    {
      question: 'What is the difference between TS% and eFG%?',
      answer:
        'Effective field-goal percentage adjusts field-goal percentage for three-pointers only. True shooting percentage also includes free throws, so it describes a player’s scoring efficiency across every way they score.',
    },
    {
      question: 'Does true shooting include free throws?',
      answer:
        'Yes — that is the difference from eFG%. True shooting compares all points scored, free throws included, with an estimate of the shooting chances used: field-goal attempts plus 0.44 times free-throw attempts, the weighting in Basketball-Reference’s formula.',
    },
    {
      question: 'Why are free-throw attempts multiplied by 0.44?',
      answer:
        'A trip to the free-throw line usually involves more than one attempt, so counting every attempt as a full shooting chance would overstate how many chances a player used. The formula published by Basketball-Reference, which this calculator follows, counts each free-throw attempt as 0.44 of a shot.',
    },
    {
      question: 'Can true shooting percentage be over 100%?',
      answer:
        'Yes, in very small samples. A player who goes 1-for-1 from three scores 3 points from one shot, which is 150%. Over a full season the figure settles into a much narrower range.',
    },
    {
      question: 'Why is there no points field?',
      answer:
        'Because points follow from the line: two for every field goal, one more for every three-pointer, and one for every free throw made. Working them out from the line means they can never disagree with it.',
    },
  ],
  sources: [
    {
      title: 'Glossary — FG%, 3P%, FT%, eFG%, TS% and TSA',
      publisher: 'Basketball-Reference.com (Sports Reference)',
      url: 'https://www.basketball-reference.com/about/glossary.html',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
