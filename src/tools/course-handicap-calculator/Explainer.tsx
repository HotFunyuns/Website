import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed } from '@/lib/tools/format.mjs';
import {
  HANDICAP_ALLOWANCES,
  STANDARD_SLOPE,
  courseHandicap,
  formatHandicap,
  playingHandicap,
} from '@/lib/tools/golf.mjs';

// An illustrative golfer and set of tees — the calculator's defaults.
const INPUT = { handicapIndex: 16.9, slopeRating: 128, courseRating: 71.5, par: 72 };

export default function CourseHandicapExplainer() {
  const ch = courseHandicap(INPUT);
  return (
    <>
      <ExplainerSection id="course-handicap" title="Course handicap">
        <Formula label="Rule 6.1a">
          course handicap = Handicap Index × (Slope Rating ÷ {STANDARD_SLOPE}) + (Course Rating − par)
        </Formula>
        <p>
          The first part scales your index to how much harder these tees play than a course of standard difficulty; the
          second adds the difference between the tees’ Course Rating and par. Where a rounded figure is needed, the result
          is rounded to the nearest whole number with .5 rounded up — but when an allowance follows, the USGA keeps the
          unrounded value and rounds only once, at the end.
        </p>
        <p>
          Example: a Handicap Index of {formatFixed(INPUT.handicapIndex, 1)} on tees rated{' '}
          {formatFixed(INPUT.courseRating, 1)} / {INPUT.slopeRating} with a par of {INPUT.par} gives{' '}
          {formatFixed(INPUT.handicapIndex, 1)} × ({INPUT.slopeRating} ÷ {STANDARD_SLOPE}) + (
          {formatFixed(INPUT.courseRating, 1)} − {INPUT.par}) = {formatFixed(ch.exact, 3)}, a course handicap of{' '}
          <strong className="text-ink-900">{formatHandicap(ch.rounded, 0)}</strong>.
        </p>
      </ExplainerSection>

      <ExplainerSection id="playing-handicap" title="Playing handicap and allowances">
        <Formula label="Rule 6.2a">playing handicap = course handicap (unrounded) × handicap allowance</Formula>
        <p>
          The allowance depends on the format. These are the USGA’s recommendations for formats in which each player
          keeps their own handicap; a committee can set others, and team formats that combine two players’ handicaps use
          different calculations. Applied to the example above:
        </p>
        <DataTable
          caption={`Playing handicap for a course handicap of ${formatFixed(ch.exact, 3)}`}
          columns={['Format', 'Recommended allowance', 'Playing handicap']}
          rows={HANDICAP_ALLOWANCES.map((allowance) => {
            const ph = playingHandicap({ courseHandicapExact: ch.exact, percent: allowance.percent });
            return [allowance.label, `${allowance.percent}%`, formatHandicap(ph.rounded, 0)];
          })}
        />
        <p>
          In match play, after the allowance the lowest playing handicap plays off zero and everyone else receives the
          difference. For a plus handicap, the allowance moves the playing handicap toward zero, rounding included.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What this calculator does not cover">
        <BulletList
          items={[
            '9-hole course handicaps and 18-hole rounds played over the same nine holes, which use their own formulas.',
            'Team formats such as foursomes, greensomes and scrambles, whose allowances combine more than one player’s handicap.',
            'Allowance changes a committee makes for field size or make-up.',
          ]}
        />
        <p>
          To work out the index itself, use the{' '}
          <Link href="/tools/golf/handicap-index-calculator/" className="link-accent">
            Handicap Index calculator
          </Link>
          ; for what a handicap does and does not say about your golf, read{' '}
          <Link href="/blog/golf-handicap-for-beginners/" className="link-accent">
            golf handicaps for beginners
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
