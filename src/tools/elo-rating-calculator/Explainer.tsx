import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed } from '@/lib/tools/format.mjs';
import { eloUpdate, expectedScore, fideExpectedHundredths, fideUpdate, fifaUpdate } from '@/lib/tools/elo.mjs';

// Glickman and Jones's example (1500 against 1700), FIFA's own example (1300
// beats 1500 in a qualifier) and an illustrative FIDE game.
// scripts/tests/tools-elo-rating-calculator.test.mjs pins every figure below.
const GAPS = [0, 50, 100, 200, 300, 400, 600];

const signed = (value: number, decimals: number) => {
  const text = formatFixed(Math.abs(value), decimals);
  return value > 0 ? `+${text}` : value < 0 ? `−${text}` : text;
};

export default function EloExplainer() {
  const gj = eloUpdate({ ratingA: 1500, ratingB: 1700, scoreA: 1, k: 20 });
  const fide = fideUpdate({ ratingA: 2100, ratingB: 2300, scoreA: 0.5, kA: 20, kB: 10 });
  const fifa = fifaUpdate({ pointsA: 1300, pointsB: 1500, wA: 1, wB: 0, importance: 25, knockout: false });
  return (
    <>
      <ExplainerSection id="formula" title="The formula">
        <Formula label="Expected score of A against B">
          E<sub>A</sub> = 1 ÷ (1 + 10<sup>−(R<sub>A</sub> − R<sub>B</sub>) ÷ 400</sup>)
        </Formula>
        <Formula label="New rating after the game">
          R′<sub>A</sub> = R<sub>A</sub> + K × (S<sub>A</sub> − E<sub>A</sub>)
        </Formula>
        <p>
          <em>S</em> is the actual score — 1 for a win, ½ for a draw, 0 for a loss — and <em>K</em> sets how far a single
          result can move a rating. These are formulas (1) and (2) in Glickman and Jones’s account of the Elo system, and
          the “standard winning expectancy” and rating formula in US Chess’s published rating procedure. With one K for
          both sides, what one side gains the other loses.
        </p>
        <p>
          The expected score is an average, not a win probability: a player expected to score 0.24 may get there through
          draws as well as wins. Glickman and Jones make the point that the formula is a probability only when every game
          has a winner.
        </p>
      </ExplainerSection>

      <ExplainerSection id="methods" title="Three published versions">
        <DataTable
          caption="How the three methods differ"
          columns={['Method', 'Expected score', 'How much a result counts', 'Rounding and limits']}
          rows={[
            [
              'Elo’s formula',
              'Formula, 400-point scale',
              'K — US Chess works it out from the games a rating is based on',
              'None in the formula itself',
            ],
            [
              'FIDE (chess)',
              'Table 8.1.2, in hundredths',
              'K = 40, 20 or 10 by experience and rating',
              'Gap capped at 400 below 2650; change rounded, .5 away from zero',
            ],
            [
              'FIFA (SUM)',
              'Formula, 600-point scale',
              'Match importance I, from 5 to 60',
              'Shoot-out 0.75 / 0.5; no points lost in final-competition knockout rounds',
            ],
          ]}
        />
        <p>The three convert the same rating gaps into similar, but not identical, expected scores:</p>
        <DataTable
          caption="Expected score of the higher-rated side, by rating gap"
          columns={['Rating gap', 'Elo’s formula (400)', 'FIDE table', 'FIFA (600)']}
          rows={GAPS.map((gap) => [
            gap,
            formatFixed(expectedScore(1500 + gap, 1500), 3),
            formatFixed(fideExpectedHundredths(2000 + gap, 2000) / 100, 2),
            formatFixed(expectedScore(1500 + gap, 1500, 600), 3),
          ])}
        />
        <p>
          The FIDE column is for a player rated below 2650, so the 600-point gap counts as 400. On FIFA’s wider scale the
          same gap is worth less: 200 points is {formatFixed(expectedScore(1700, 1500, 600), 3)} rather than{' '}
          {formatFixed(expectedScore(1700, 1500), 3)}.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked examples">
        <p>
          <strong className="text-ink-900">Elo’s formula.</strong> Glickman and Jones’s example pairs players rated 1500
          and 1700: the 1500 player’s expected score is {formatFixed(gj.expectedA, 3)} — their “about 0.24”. If the 1500
          player wins and K is 20, the change is 20 × (1 − {formatFixed(gj.expectedA, 3)}) ={' '}
          {signed(gj.changeA, 1)}, and the 1700 player loses the same.
        </p>
        <p>
          <strong className="text-ink-900">FIDE.</strong> An illustrative game: a player rated 2100 with K = 20 draws with
          one rated 2300 with K = 10. The 200-point gap reads .{fideExpectedHundredths(2100, 2300)} and .
          {fideExpectedHundredths(2300, 2100)} from table 8.1.2, so the lower-rated player gains (0.5 − 0.24) × 20 ={' '}
          {formatFixed(fide.exactChangeA, 1)}, rounded to {signed(fide.changeA, 0)}, and the higher-rated player loses (0.5
          − 0.76) × 10 = {formatFixed(fide.exactChangeB, 1)}, rounded to {signed(fide.changeB, 0)}. With different K values
          the two changes do not cancel.
        </p>
        <p>
          <strong className="text-ink-900">FIFA.</strong> FIFA’s own example: a team on 1300 points beats a team on 1500
          in a continental qualifier, where I = 25. Its expected result is {formatFixed(fifa.expectedA, 3)}, so it gains 25
          × (1 − {formatFixed(fifa.expectedA, 3)}) = {formatFixed(fifa.changeA, 2)} points — the 17 FIFA quotes — and moves
          to {formatFixed(fifa.newA, 2)}, while the other team drops to {formatFixed(fifa.newB, 2)}.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="How to read it, and its limits">
        <BulletList
          items={[
            'Ratings are estimates built from past results. They trail behind changes in form, fitness or line-ups.',
            'None of these formulas includes home advantage, and none says how likely a draw is — only the average score.',
            'K is a choice. A high K reacts quickly to results and is noisy; a low K is stable and slow.',
            'Each method here follows its publisher’s rules for one game. Real systems add more, such as FIDE’s rating periods and limits on K over many games.',
            'An expected score describes what two ratings imply. It is not a forecast and not betting guidance.',
          ]}
        />
        <p>
          For how simulators use ratings without letting them decide everything, read{' '}
          <Link href="/blog/how-sports-simulation-engines-work/" className="link-accent">
            how sports simulation engines work
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
