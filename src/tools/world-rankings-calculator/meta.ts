import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'world-rankings-calculator',
  sport: 'rugby',
  alsoFor: [],
  order: 1,
  title: 'World Rugby rankings calculator: the points exchange for any result',
  shortTitle: 'World Rugby rankings',
  summary:
    'The rating points two teams exchange for each possible result under World Rugby’s rankings method, as it stands since 1 July 2026.',
  metaTitle: 'World Rugby Rankings Calculator (Points Exchange)',
  metaDescription:
    'See how many World Rugby ranking points two teams exchange for each possible result, under the method in force since home weighting ended on 1 July 2026.',
  intro: [
    'World Rugby’s men’s and women’s rankings work by points exchange: after a full international, the two teams swap rating points, and whatever one gains the other loses. How many depends on the gap between their ratings, the result, whether the winner won by more than 15 points, and whether it was a Rugby World Cup match.',
    'Since 1 July 2026 the home side is no longer treated as three points stronger than its rating. Enter two ratings to see the exchange for all five possible outcomes under the current method.',
  ],
  primaryApp: 'rugby-draft-pro-league',
  appContext:
    '{app} has you draft forwards, backs and goal kickers from a pool of more than 1,000 players, then run a club through a 24-match season under rugby union scoring.',
  relatedArticles: [
    'how-rugby-scoring-works',
    'rugby-union-vs-rugby-league',
    'rugby-draft-and-squad-building',
    'how-tennis-ranking-points-work',
  ],
  relatedTools: ['draft-order-generator'],
  faqs: [
    {
      question: 'How are World Rugby ranking points calculated?',
      answer:
        'By exchange. The gap between the two ratings sets what each result is worth: between evenly rated sides a win moves 1 point, a favourite 10 or more points ahead gains nothing for winning, and a side 10 or more points behind gains 2 for a win. A margin of more than 15 multiplies the exchange by 1.5, and a Rugby World Cup match doubles it.',
    },
    {
      question: 'Is home advantage still part of the World Rugby rankings?',
      answer:
        'Not since 1 July 2026. Until then the home side was treated as three rating points better than it was. World Rugby announced the change on 18 June 2026, citing how many international matches are now played at centralised or neutral venues.',
    },
    {
      question: 'Can a team lose ranking points for winning?',
      answer:
        'No. World Rugby’s explanation says sides “can’t win points for losing, or lose points for winning”. A favourite already 10 or more points clear gains nothing at all for a win.',
    },
    {
      question: 'How much can one match change a rating?',
      answer:
        'Two points at most before the weightings. A win by more than 15 raises that to 3, and a Rugby World Cup match doubles it, so 6 is the most any single result can move.',
    },
    {
      question: 'Do draws change the rankings?',
      answer:
        'Usually. In a draw the higher-rated side gives the lower-rated one a tenth of the gap between them, up to a full point, so only two teams on identical ratings exchange nothing.',
    },
    {
      question: 'Where do the ratings come from?',
      answer:
        'From World Rugby’s published rankings. This calculator ships no ratings — you enter the two you want to compare. Published ratings are rounded to two decimals, so a result can differ from World Rugby’s by 0.01.',
    },
  ],
  sources: [
    {
      title:
        'Rankings Explanation (page dated 14 November 2014; it still describes the home weighting removed on 1 July 2026)',
      publisher: 'World Rugby',
      url: 'https://www.world.rugby/rankings/explanation',
      accessed: '2026-10-02',
    },
    {
      title: 'New World Rugby Rankings criteria (18 June 2026): home weighting removed from 1 July 2026',
      publisher: 'World Rugby',
      url: 'https://www.world.rugby/news/1044762/new-world-rugby-rankings-criteria',
      accessed: '2026-10-02',
    },
    {
      title: 'Men’s rankings update, 13 July 2026 (a pre-match rating used to check the method)',
      publisher: 'World Rugby',
      url: 'https://www.world.rugby/news/1045589/england-and-scotland-trade-places-in-world-rugby-mens-rankings',
      accessed: '2026-10-02',
    },
    {
      title: 'Men’s rankings update, 20 July 2026 (a rating change used to check the method)',
      publisher: 'World Rugby',
      url: 'https://www.world.rugby/news/1045740/italy-drop-out-of-top-10-in-world-rugby-mens-rankings',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
