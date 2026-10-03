import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'weight-class-finder',
  sport: 'combat-sports',
  alsoFor: [],
  order: 1,
  title: 'What weight class am I? Boxing and MMA weight class finder',
  shortTitle: 'Weight class finder',
  summary: 'The boxing and MMA weight class for any weight, in pounds and kilograms, from four published weight tables.',
  metaTitle: 'What Weight Class Am I? Boxing and MMA Finder',
  metaDescription:
    'Enter a weight in pounds or kilograms to find its MMA and boxing weight class in four published tables, with every limit in both units and the gap to it.',
  intro: [
    'Weight classes are set by whoever regulates or sanctions a bout, and the published tables do not all agree. In the US, MMA classes follow the Association of Boxing Commissions’ Unified Rules. Boxing has commission schedules and each sanctioning body’s own list — and above 175 lb they part company.',
    'Enter a weight to see where it falls in four published tables, with every limit in pounds and kilograms. The tables describe rule-book limits only; this page gives no advice on making weight.',
  ],
  primaryApp: 'mma-boxing-fight-draft',
  appContext:
    '{app} has you draft fighters across eras and weight classes, with separate mixed martial arts and boxing simulators settling every bout.',
  relatedArticles: [
    'boxing-weight-classes-explained',
    'mma-weight-classes-explained',
    'how-fight-cards-are-built',
    'mma-fantasy-draft-strategy',
    'mma-boxing-fight-draft-guide',
  ],
  relatedTools: ['fight-scorecard'],
  faqs: [
    {
      question: 'What weight class am I in boxing?',
      answer:
        'It depends whose table you use. From 105 to 175 lb, Nevada’s commission schedule and the WBC and IBF ratings lists share the same limits, though not always the same names. Above that, Nevada caps cruiserweight at 195 lb, the WBC and IBF at 200, and the WBC adds bridgerweight up to 224 lb before heavyweight.',
    },
    {
      question: 'What weight class am I in MMA?',
      answer:
        'The Association of Boxing Commissions’ Unified Rules of MMA list 15 classes, from atomweight (up to 105 lb) to super heavyweight (over 265 lb). A weight exactly on a limit belongs to the lighter class: the rules write each one as “over X to Y”.',
    },
    {
      question: 'Do all boxing organisations use the same weight classes?',
      answer:
        'No. Above 175 lb the WBC, the IBF and Nevada’s schedule all differ, and the IBF lists a 102 lb class below the others. Names differ too: at 108, 115, 122, 130, 140 and 154 lb the IBF says “junior” where the WBC says “light” or “super”.',
    },
    {
      question: 'How many kilograms is each weight class?',
      answer:
        'The limits are set in pounds and converted here at exactly 0.45359237 kg per pound, NIST’s figure, then rounded to the nearest gram — the three decimals the WBC uses. Lightweight in MMA, for example, runs to 155 lb, which is 70.307 kg.',
    },
    {
      question: 'Does this tell me what weight I should fight at?',
      answer:
        'No. It shows where a weight falls in published rule books and nothing more — it gives no advice on cutting or gaining weight, and official weigh-ins follow the regulating commission’s own procedures.',
    },
  ],
  sources: [
    {
      title: 'Unified Rules of Mixed Martial Arts (amended 5 August 2026) — Weight Classes',
      publisher: 'Association of Boxing Commissions and Combative Sports',
      url: 'https://www.abcboxing.com/wp-content/uploads/2026/08/Unified-Rules-of-MMA-8.2026.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'Nevada Administrative Code 467.476 — Boxers: weight classes',
      publisher: 'Nevada Legislature (Nevada Athletic Commission regulations)',
      url: 'https://www.leg.state.nv.us/NAC/NAC-467.html',
      accessed: '2026-10-02',
    },
    {
      title: 'Ratings, men’s divisions — each page states its limit (cruiserweight shown)',
      publisher: 'World Boxing Council',
      url: 'https://wbcboxing.com/en/ratings/male/cruiserweight/',
      accessed: '2026-10-02',
    },
    {
      title: 'Ratings — division list with limits',
      publisher: 'International Boxing Federation',
      url: 'https://www.ibf-usba-boxing.com/ratings/',
      accessed: '2026-10-02',
    },
    {
      title: 'NIST Guide to the SI, footnote 22 — the exact pound-to-kilogram factor',
      publisher: 'National Institute of Standards and Technology',
      url: 'https://www.nist.gov/pml/special-publication-811/nist-guide-si-footnotes',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
