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

// Rule 6.2a/1's own illustration of double rounding: Course Rating 71.0, Slope
// Rating 125, par 71, four-ball stroke play at 85%, two players at 8.6 and 10.3.
const ROUNDING_TEES = { slopeRating: 125, courseRating: 71.0, par: 71 };
const ROUNDING_PLAYERS = [
  { name: 'Player A', handicapIndex: 8.6 },
  { name: 'Player B', handicapIndex: 10.3 },
];
const FOUR_BALL = 85;

// Illustrative 9-hole ratings for an 18-hole round played over the same nine
// (Rule 6.1a note): the formula doubles the 9-hole Course Rating and par.
const NINE = { slopeRating: 126, courseRating: 35.6, par: 36 };

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

      <ExplainerSection id="rounding" title="Why the allowance comes before the rounding">
        <p>
          It is tempting to round the course handicap first and then take a percentage of it. Rule 6.2a/1 explains why
          the USGA does not: rounding twice can give two players whose indexes are nearly two strokes apart the same
          playing handicap. This is the rule’s own example — tees rated {formatFixed(ROUNDING_TEES.courseRating, 1)} /{' '}
          {ROUNDING_TEES.slopeRating}, par {ROUNDING_TEES.par}, four-ball stroke play at {FOUR_BALL}% — worked through by
          this calculator’s code:
        </p>
        <DataTable
          caption="Rounding once versus rounding twice (Rule 6.2a/1)"
          columns={['', 'Handicap Index', 'Course handicap', 'Rounded first, then 85%', 'Unrounded, then 85%']}
          rows={ROUNDING_PLAYERS.map((player) => {
            const ch = courseHandicap({ ...ROUNDING_TEES, handicapIndex: player.handicapIndex });
            const twice = playingHandicap({ courseHandicapExact: ch.rounded, percent: FOUR_BALL });
            const once = playingHandicap({ courseHandicapExact: ch.exact, percent: FOUR_BALL });
            return [
              player.name,
              formatFixed(player.handicapIndex, 1),
              formatFixed(ch.exact, 3),
              formatHandicap(twice.rounded, 0),
              formatHandicap(once.rounded, 0),
            ];
          })}
        />
        <p>
          Rounded twice, both players would play off the same number; rounded once, at the end, they are two strokes
          apart, which is what their indexes say. The USGA notes that the two methods give the same answer about three
          times in four, which is why the difference is easy to miss. The calculator above always keeps the unrounded
          course handicap until the allowance has been applied.
        </p>
      </ExplainerSection>

      <ExplainerSection id="same-nine" title="Eighteen holes over the same nine">
        <p>
          On a nine-hole course with no 18-hole rating, a round of 18 holes played twice over the same tees uses the
          nine-hole ratings, with the Course Rating and par each doubled:
        </p>
        <Formula label="Rule 6.1a, note">
          course handicap = Handicap Index × (9-hole Slope Rating ÷ {STANDARD_SLOPE}) + (2 × 9-hole Course Rating − 2 ×
          9-hole par)
        </Formula>
        <p>
          With nine-hole ratings of {formatFixed(NINE.courseRating, 1)} / {NINE.slopeRating} and a par of {NINE.par}, the
          same {formatFixed(INPUT.handicapIndex, 1)} index gives{' '}
          {(() => {
            const ch = courseHandicap({
              handicapIndex: INPUT.handicapIndex,
              slopeRating: NINE.slopeRating,
              courseRating: NINE.courseRating * 2,
              par: NINE.par * 2,
            });
            return (
              <>
                {formatFixed(ch.exact, 3)}, a course handicap of{' '}
                <strong className="text-ink-900">{formatHandicap(ch.rounded, 0)}</strong>
              </>
            );
          })()}
          . To use the calculator for this case, enter the nine-hole Slope Rating as it is, and twice the nine-hole
          Course Rating and par.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What this calculator does not cover">
        <BulletList
          items={[
            'Course handicaps for a 9-hole round, which use their own formula.',
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
