import type { ToolMeta } from '../types';

const meta: ToolMeta = {
  id: 'elo-rating-calculator',
  sport: 'multi-sport',
  alsoFor: ['soccer', 'combat-sports', 'tennis'],
  order: 4,
  title: 'Elo rating calculator: expected score, K-factor and rating change for any sport',
  shortTitle: 'Elo rating',
  summary: 'The expected score and rating change for one result, by Elo’s formula, FIDE’s chess regulations or FIFA’s world ranking method.',
  metaTitle: 'Elo Rating Calculator: Expected Score and K-Factor',
  metaDescription:
    'Calculate the expected score and rating change for any result with Elo’s formula, FIDE’s published table and K-factors, or FIFA’s world ranking method.',
  intro: [
    'An Elo rating turns the gap between two ratings into an expected score — the average result the stronger side should achieve against the weaker — and then moves both ratings by how far the actual result beat or missed that expectation. Chess federations use it, and FIFA’s men’s world ranking is built on it.',
    'Choose a method, enter the two ratings and the result, and the calculator shows each side’s expected score and new rating. Each method follows its publisher’s own rules: Elo’s formula as US Chess states it, FIDE’s table and K-factors, or FIFA’s weighting by the importance of the match.',
  ],
  primaryApp: 'mma-boxing-fight-draft',
  appContext:
    '{app} weighs ratings, records, eras and weight classes when you draft, and its simulators settle each bout on style as well as ratings — so, just as an expected score below 1 implies, the higher-rated fighter does not always get the nod.',
  relatedArticles: [
    'how-the-fifa-world-ranking-works',
    'how-sports-simulation-engines-work',
    'understanding-sports-sim-probability',
    'style-matchups-in-a-fight-simulator',
    'how-tennis-ranking-points-work',
  ],
  relatedTools: ['perfect-season-calculator', 'win-probability-calculator'],
  faqs: [
    {
      question: 'What is an expected score in Elo?',
      answer:
        'The average score a player is expected to make against an opponent, counting a win as 1, a draw as ½ and a loss as 0. Glickman and Jones’s example: a player rated 1500 against one rated 1700 has a long-run expected score of about 0.24. Where draws are possible it is not the same as a win probability.',
    },
    {
      question: 'What K-factor should I use?',
      answer:
        'The one your rating system sets. FIDE uses 40 for players new to its list and for juniors rated under 2300, 20 for players rated under 2400, and 10 once a player has reached 2400. US Chess works its K out from the number of games a rating is based on, and FIFA uses the importance of the match, from 5 to 60, in the same place. A larger K makes ratings move faster.',
    },
    {
      question: 'Why does FIDE use a table instead of the formula?',
      answer:
        'FIDE’s rating regulations convert the rating difference into an expected score with a published table, table 8.1.2, and count a difference of more than 400 points as 400 for players rated below 2650. The table and the formula give similar figures: a 200-point gap is .76 in the table and .760 by the formula.',
    },
    {
      question: 'How does FIFA’s ranking use Elo?',
      answer:
        'FIFA’s “SUM” method adds or subtracts I × (W − We) after each match, where I is the importance of the match, W the result and We the expected result on a 600-point scale. A penalty shoot-out counts as 0.75 for the winner and 0.5 for the loser, and teams do not lose points in the knockout rounds of a final competition. FIFA’s own example: a team on 1300 that beats a team on 1500 in a qualifier gains 17 points.',
    },
    {
      question: 'Is an expected score a prediction?',
      answer:
        'It is what two ratings imply about the average result, nothing more. Ratings lag behind form and injuries, and one game is a small sample. Use it to understand how a rating system responds to results — not to forecast a game, and not as betting guidance.',
    },
  ],
  sources: [
    {
      title: 'Rating the chess rating system (Chance, 12(2), 21–28, 1999) — the Elo formula and its update',
      publisher: 'Mark E. Glickman and Albyn C. Jones',
      url: 'https://www.glicko.net/research/chance.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'The US Chess Rating System (2020) — standard winning expectancy and rating formula',
      publisher: 'US Chess Federation (Mark E. Glickman and Thomas Doan)',
      url: 'https://new.uschess.org/sites/default/files/media/documents/the-us-chess-rating-system-revised-september-2020.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'FIDE Rating Regulations effective from 1 March 2024 — table 8.1.2 and rules 8.3.1–8.3.4',
      publisher: 'FIDE Handbook',
      url: 'https://handbook.fide.com/chapter/B022024',
      accessed: '2026-10-02',
    },
    {
      title: 'Revision of the FIFA / Coca-Cola World Ranking — the SUM formula',
      publisher: 'FIFA',
      url: 'https://digitalhub.fifa.com/m/f99da4f73212220/original/edbm045h0udbwkqew35a-pdf.pdf',
      accessed: '2026-10-02',
    },
    {
      title: 'Men’s ranking procedure',
      publisher: 'FIFA (Inside FIFA)',
      url: 'https://inside.fifa.com/fifa-rankings/world-ranking/procedure-men',
      accessed: '2026-10-02',
    },
  ],
  publishedAt: '2026-10-02',
  updatedAt: '2026-10-02',
};

export default meta;
