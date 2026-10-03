import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed } from '@/lib/tools/format.mjs';
import {
  DIFFERENTIALS_TABLE,
  MAX_HANDICAP_INDEX,
  STANDARD_SLOPE,
  formatHandicap,
  handicapIndex,
  scoreDifferential,
} from '@/lib/tools/golf.mjs';

// An illustrative golfer — not a real player. The same values are the
// calculator's defaults.
const ROUND = { adjustedGrossScore: 92, courseRating: 71.5, slopeRating: 128, pcc: 0 };
const DIFFERENTIALS = [18.1, 20.4, 16.9, 22.0, 19.3];

const describeRow = (row: (typeof DIFFERENTIALS_TABLE)[number]) =>
  row.use === 1 ? 'Lowest 1' : `Average of lowest ${row.use}`;

export default function HandicapIndexExplainer() {
  const differential = scoreDifferential(ROUND);
  const index = handicapIndex(DIFFERENTIALS);
  return (
    <>
      <ExplainerSection id="step-1" title="Step 1: the score differential">
        <Formula label="Rule 5.1a">
          score differential = ({STANDARD_SLOPE} ÷ Slope Rating) × (adjusted gross score − Course Rating − PCC)
        </Formula>
        <p>
          The adjusted gross score is your 18-hole score after the handicap adjustments, such as capping a hole at net
          double bogey. The Course Rating is what a scratch player is expected to shoot from those tees; the Slope Rating
          reflects how much harder the course plays for a bogey golfer than for a scratch golfer, with {STANDARD_SLOPE}{' '}
          as the standard. PCC is the playing conditions calculation, an adjustment from −1.0 to +3.0 for days when
          course or weather conditions significantly changed scoring. The result is rounded to the nearest tenth, with .5
          rounded up.
        </p>
        <p>
          Example: a score of {ROUND.adjustedGrossScore} from tees rated {formatFixed(ROUND.courseRating, 1)} /{' '}
          {ROUND.slopeRating}, with no PCC adjustment, gives ({STANDARD_SLOPE} ÷ {ROUND.slopeRating}) × (
          {ROUND.adjustedGrossScore} − {formatFixed(ROUND.courseRating, 1)}) = {formatFixed(differential.exact, 3)}, which
          rounds to <strong className="text-ink-900">{formatFixed(differential.rounded, 1)}</strong>.
        </p>
      </ExplainerSection>

      <ExplainerSection id="step-2" title="Step 2: the Handicap Index">
        <p>
          With 20 differentials, the Handicap Index is the average of the lowest eight of the most recent twenty (Rule
          5.2b). With fewer, Rule 5.2a’s table decides how many of the lowest to use and whether to adjust the result:
        </p>
        <DataTable
          caption="Rules of Handicapping 5.2a and 5.2b"
          columns={['Differentials in the record', 'Used in the calculation', 'Adjustment']}
          rows={DIFFERENTIALS_TABLE.map((row) => [
            row.from === row.to ? String(row.from) : `${row.from} to ${row.to}`,
            describeRow(row),
            row.adjustment === 0 ? '0' : formatFixed(row.adjustment, 1),
          ])}
        />
        <p>
          The result is rounded to the nearest tenth, and no Handicap Index can exceed {formatFixed(MAX_HANDICAP_INDEX, 1)}
          . Example: with five differentials — {DIFFERENTIALS.map((d) => formatFixed(d, 1)).join(', ')} — the table says
          to use the lowest one with no adjustment, so the Handicap Index is{' '}
          <strong className="text-ink-900">{formatHandicap(index.index, 1)}</strong>. To use it on a particular course,
          the{' '}
          <Link href="/tools/golf/course-handicap-calculator/" className="link-accent">
            course handicap calculator
          </Link>{' '}
          takes the next step.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What this calculator cannot do">
        <p>
          An official Handicap Index is calculated by your handicap provider from your full scoring record, and some of
          the rules depend on information this page does not have:
        </p>
        <BulletList
          items={[
            'The soft cap and hard cap, which limit how fast an index can rise compared with your Low Handicap Index — the lowest of the previous 365 days.',
            'Exceptional-score reductions, applied when a differential is at least 7.0 strokes better than your index at the time.',
            'Adjustments made by a Handicap Committee.',
            '9-hole scores, which are converted under rules of their own.',
          ]}
        />
        <p>
          Treat the result as an estimate. For what the number means in practice, read{' '}
          <Link href="/blog/golf-handicap-for-beginners/" className="link-accent">
            golf handicaps for beginners
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
