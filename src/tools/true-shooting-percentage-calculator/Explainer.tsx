import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed, formatPercent } from '@/lib/tools/format.mjs';
import { TS_FREE_THROW_WEIGHT, shootingEfficiency } from '@/lib/tools/basketball.mjs';

// Basketball-Reference's own eFG% illustration (players A and B), then an
// illustrative line (not a real player) that is also the calculator's default.
const PLAYER_A = { fieldGoals: 4, fieldGoalAttempts: 10, threePointers: 2, freeThrows: 0, freeThrowAttempts: 0 };
const PLAYER_B = { fieldGoals: 5, fieldGoalAttempts: 10, threePointers: 0, freeThrows: 0, freeThrowAttempts: 0 };
const LINE = { fieldGoals: 10, fieldGoalAttempts: 20, threePointers: 4, threePointAttempts: 9, freeThrows: 6, freeThrowAttempts: 8 };

export default function TrueShootingExplainer() {
  const a = shootingEfficiency(PLAYER_A);
  const b = shootingEfficiency(PLAYER_B);
  const s = shootingEfficiency(LINE);
  return (
    <>
      <ExplainerSection id="formulas" title="The formulas">
        <Formula label="Plain percentages">FG% = FGM ÷ FGA · 3P% = 3PM ÷ 3PA · FT% = FTM ÷ FTA</Formula>
        <Formula label="Effective field-goal percentage">eFG% = (FGM + 0.5 × 3PM) ÷ FGA</Formula>
        <Formula label="True shooting percentage">
          TS% = PTS ÷ (2 × TSA), where TSA = FGA + {TS_FREE_THROW_WEIGHT} × FTA
        </Formula>
        <p>
          Effective field-goal percentage adds half a field goal for every made three, because a three is worth one and
          a half times a two. True shooting goes a step further: it compares all the points a player scored with an
          estimate of the shooting chances used to score them, counting each free-throw attempt as{' '}
          {TS_FREE_THROW_WEIGHT} of a shot, as Basketball-Reference’s formula does. Effective field-goal percentage
          ignores free throws entirely.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked examples">
        <p>
          Basketball-Reference’s glossary illustrates eFG% with two players who each score 10 points from field goals: one
          goes 4-for-10 with two threes, the other 5-for-10 with none.
        </p>
        <DataTable
          caption="Same points, different field-goal percentages"
          columns={['Player', 'Line', 'FG%', 'eFG%']}
          rows={[
            ['A', '4-for-10, 2 threes', formatPercent(a.fieldGoalPct, 1), formatPercent(a.effectiveFieldGoalPct, 1)],
            ['B', '5-for-10, 0 threes', formatPercent(b.fieldGoalPct, 1), formatPercent(b.effectiveFieldGoalPct, 1)],
          ]}
        />
        <p>Field-goal percentage prefers player B; effective field-goal percentage, correctly, rates them the same.</p>
        <p>
          Now an illustrative line — not a real player — of 10-for-20 shooting with 4-for-9 from three, and 6-for-8 at
          the free-throw line. That is {s.points} points from {formatFixed(s.trueShootingAttempts, 2)} true shooting
          attempts (20 + {TS_FREE_THROW_WEIGHT} × 8):
        </p>
        <DataTable
          caption="One line, five shooting percentages"
          columns={['Measure', 'Calculation', 'Result']}
          rows={[
            ['FG%', '10 ÷ 20', formatPercent(s.fieldGoalPct, 1)],
            ['3P%', '4 ÷ 9', formatPercent(s.threePointPct ?? 0, 1)],
            ['FT%', '6 ÷ 8', formatPercent(s.freeThrowPct ?? 0, 1)],
            ['eFG%', '(10 + 0.5 × 4) ÷ 20', formatPercent(s.effectiveFieldGoalPct, 1)],
            ['TS%', `${s.points} ÷ (2 × ${formatFixed(s.trueShootingAttempts, 2)})`, formatPercent(s.trueShootingPct, 1)],
          ]}
        />
      </ExplainerSection>

      <ExplainerSection id="limits" title="What shooting percentages leave out">
        <BulletList
          items={[
            'Shot difficulty. A contested pull-up and an open layup count the same; the percentages describe results, not the quality of the looks.',
            'Volume. A high true shooting percentage on a few attempts says less than a good one on many — efficiency and usage have to be read together.',
            'The 0.44 weight is an approximation of how many shooting chances free throws represent, not an exact count.',
            'Anything that is not shooting: passing, defence and rebounding sit outside all of these numbers.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/blog/basketball-advanced-stats-explained/" className="link-accent">
            basketball advanced stats explainer
          </Link>{' '}
          covers the measures that sit alongside these, and the{' '}
          <Link href="/blog/how-to-build-a-balanced-basketball-roster/" className="link-accent">
            guide to building a balanced roster
          </Link>{' '}
          explains why efficient shooters still need the right teammates.
        </p>
      </ExplainerSection>
    </>
  );
}
