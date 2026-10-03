import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { allocateStrokes, scoreCard } from '@/lib/tools/stableford.mjs';

// The R&A's Diagram 21.1b card (par 70, 76 strokes, 30 points) and an
// illustrative stroke index laid out as Appendix E recommends.
// scripts/tests/tools-stableford-calculator.test.mjs pins every figure.
const PARS = [4, 3, 4, 4, 3, 5, 4, 4, 5, 3, 4, 4, 3, 5, 3, 5, 3, 4];
const SCORES = [3, 3, 5, 4, 4, 7, 5, 4, 5, 3, 4, 6, 3, 4, 3, 4, 5, 4];
const STROKE_INDEX = [7, 15, 3, 11, 1, 13, 9, 5, 17, 16, 8, 4, 14, 2, 18, 10, 12, 6];
const HANDICAP = 12;

const POINTS_TABLE: [string, number][] = [
  ['More than one over, or no score returned', 0],
  ['One over the fixed score', 1],
  ['The fixed score (par, unless the Committee sets another)', 2],
  ['One under', 3],
  ['Two under', 4],
  ['Three under', 5],
  ['Four under', 6],
];

export default function StablefordExplainer() {
  const scratch = scoreCard({ pars: PARS, strokeIndexes: STROKE_INDEX, scores: SCORES, playingHandicap: 0 });
  const handicap = scoreCard({ pars: PARS, strokeIndexes: STROKE_INDEX, scores: SCORES, playingHandicap: HANDICAP });
  const front = (card: typeof scratch) => card.rows.slice(0, 9).reduce((sum, row) => sum + row.points, 0);
  const back = (card: typeof scratch) => card.rows.slice(9).reduce((sum, row) => sum + row.points, 0);
  const si = Array.from({ length: 18 }, (_, i) => i + 1);
  const twenty = allocateStrokes(si, 20);

  return (
    <>
      <ExplainerSection id="formula" title="The points table">
        <DataTable caption="Rule 21.1b: points for each hole" columns={['Score on the hole', 'Points']} rows={POINTS_TABLE} />
        <Formula label="The same table as a formula">points = max(0, 2 + fixed score − net score)</Formula>
        <p>
          In a handicap competition the handicap strokes are applied to each hole’s score before the points are worked out,
          so the table is read against your net score. The Rules of Handicapping make the link the other way too: net double
          bogey, the most that counts on a hole for handicap purposes, is “the lowest score on a hole for which the player
          would achieve zero Stableford points”.
        </p>
      </ExplainerSection>

      <ExplainerSection id="strokes" title="Where your handicap strokes fall">
        <Formula label="Strokes on a hole, Playing Handicap PH over 18 holes">
          floor(PH ÷ 18), plus 1 more if the hole’s stroke index ≤ (PH mod 18)
        </Formula>
        <p>
          Appendix E of the Rules of Handicapping gives strokes in stroke-index order, and above 18 the order repeats:
          stroke index 1 counts again as 19, 37 and 55. A Playing Handicap of 20 therefore gives one stroke on every hole
          and a second on the holes with stroke index {twenty.findIndex((s) => s === 2) + 1} and{' '}
          {twenty.lastIndexOf(2) + 1}. For nine holes,
          strokes are taken in ascending order of the holes’ 18-hole stroke indexes, and a plus-handicap player gives
          strokes back starting at the hole with the highest index — Appendix E says this for nine-hole play, and the
          calculator applies the same order over 18 holes.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked examples">
        <p>
          The R&A illustrates scratch Stableford in the Rules of Golf with a full card: a par-70 course played in{' '}
          {scratch.gross} strokes. Scored hole by hole it comes to {front(scratch)} points out and {back(scratch)} in —{' '}
          {scratch.points} in all, as the R&A’s diagram shows. The six over par costs exactly six points against the{' '}
          {scratch.netParPoints} that net par on every hole would earn.
        </p>
        <p>
          The same card with a Playing Handicap of {HANDICAP}, using an illustrative stroke index laid out as Appendix E
          recommends — odd numbers on the front nine, even on the back:
        </p>
        <DataTable
          caption={`Diagram 21.1b’s card with a Playing Handicap of ${HANDICAP}`}
          columns={['Hole', 'Par', 'Stroke index', 'Strokes', 'Score', 'Net', 'Points']}
          rows={handicap.rows.map((row) => [
            row.hole,
            row.par,
            row.strokeIndex,
            row.strokes === 0 ? '—' : `+${row.strokes}`,
            row.gross ?? 'x',
            row.net ?? '—',
            row.points,
          ])}
        />
        <p>
          Twelve strokes on stroke index 1 to 12 turn {scratch.points} points into {handicap.points}: {front(handicap)} out
          and {back(handicap)} in, {handicap.points - handicap.netParPoints} better than net par. Hole 6 still scores
          nothing: with no stroke there, a 7 on a par 5 is a net double bogey.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What it does not do">
        <BulletList
          items={[
            'Work out your Playing Handicap. Use the course handicap calculator for that, then enter the figure here.',
            'Apply a different fixed score. If your Committee sets a target other than par on a hole, enter that target as the hole’s par.',
            'Penalties that cost a hole’s points under Rule 21.1c — enter an x for that hole instead.',
            'Team and four-ball Stableford, which combine players’ scores in ways a single card cannot show.',
          ]}
        />
        <p>
          For how Stableford compares with other formats, read{' '}
          <Link href="/blog/golf-tournament-formats/" className="link-accent">
            golf tournament formats
          </Link>
          ; to turn a Handicap Index into a Playing Handicap, use the{' '}
          <Link href="/tools/golf/course-handicap-calculator/" className="link-accent">
            course handicap calculator
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
