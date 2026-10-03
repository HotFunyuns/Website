import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed, formatPercent } from '@/lib/tools/format.mjs';
import { PER_MINUTES, USAGE_FREE_THROW_WEIGHT, playerRates } from '@/lib/tools/basketball-player.mjs';

// An illustrative bench line — not a real player — that is also the
// calculator's default: 24 minutes, 14 points on 5-for-11 shooting (one three)
// and 3-for-4 free throws, with the team's totals for the same game.
const LINE = {
  minutes: 24,
  points: 14,
  fieldGoals: 5,
  fieldGoalAttempts: 11,
  freeThrows: 3,
  freeThrowAttempts: 4,
  offensiveRebounds: 1,
  defensiveRebounds: 4,
  assists: 3,
  steals: 1,
  blocks: 0,
  turnovers: 2,
  personalFouls: 2,
};
const TEAM = { minutes: 240, fieldGoalAttempts: 88, freeThrowAttempts: 22, turnovers: 13 };

const one = (value: number) => formatFixed(value, 1);

export default function Per36Explainer() {
  const r = playerRates(LINE, TEAM);
  const playerPlays = LINE.fieldGoalAttempts + USAGE_FREE_THROW_WEIGHT * LINE.freeThrowAttempts + LINE.turnovers;
  const teamPlays = TEAM.fieldGoalAttempts + USAGE_FREE_THROW_WEIGHT * TEAM.freeThrowAttempts + TEAM.turnovers;
  return (
    <>
      <ExplainerSection id="formulas" title="The formulas">
        <Formula label="Per 36 minutes">stat per 36 = stat ÷ minutes played × {PER_MINUTES}</Formula>
        <Formula label="Usage percentage">
          USG% = 100 × (FGA + {USAGE_FREE_THROW_WEIGHT} × FTA + TOV) × (team minutes ÷ 5) ÷ (MP × (team FGA +{' '}
          {USAGE_FREE_THROW_WEIGHT} × team FTA + team TOV))
        </Formula>
        <Formula label="Game Score">
          GmSc = PTS + 0.4 × FG − 0.7 × FGA − 0.4 × (FTA − FT) + 0.7 × ORB + 0.3 × DRB + STL + 0.7 × AST + 0.7 × BLK −
          0.4 × PF − TOV
        </Formula>
        <Formula label="Assist-to-turnover ratio">AST/TO = assists ÷ turnovers</Formula>
        <p>
          The first three are Basketball-Reference’s published formulas; the assist-to-turnover ratio is defined in the
          NBA’s stat glossary. Usage counts a player’s “plays” as shots, free-throw attempts at {USAGE_FREE_THROW_WEIGHT}{' '}
          each (the weight true shooting uses) and turnovers, then compares them with the team’s plays while the player
          was on the floor — which is why the team’s minutes are divided by five. Game Score is John Hollinger’s, built to
          give “a rough measure of a player’s productivity for a single game”.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked example">
        <p>
          An illustrative line — not a real player — of {LINE.points} points in {LINE.minutes} minutes off the bench:{' '}
          {LINE.fieldGoals}-for-{LINE.fieldGoalAttempts} shooting with one three, {LINE.freeThrows}-for-
          {LINE.freeThrowAttempts} at the line, {r.rebounds} rebounds, {LINE.assists} assists, {LINE.steals} steal,{' '}
          {LINE.turnovers} turnovers and {LINE.personalFouls} fouls.
        </p>
        <DataTable
          caption={`${LINE.minutes} minutes scaled to ${PER_MINUTES}`}
          columns={['Statistic', 'In the game', 'Per 36']}
          rows={[
            ['Points', LINE.points, one(r.per36.points)],
            ['Rebounds', r.rebounds, one(r.per36.rebounds)],
            ['Assists', LINE.assists, one(r.per36.assists)],
            ['Steals', LINE.steals, one(r.per36.steals)],
            ['Turnovers', LINE.turnovers, one(r.per36.turnovers)],
            ['Field-goal attempts', LINE.fieldGoalAttempts, one(r.per36.fieldGoalAttempts)],
          ]}
        />
        <p>
          The team took {TEAM.fieldGoalAttempts} shots and {TEAM.freeThrowAttempts} free throws and committed{' '}
          {TEAM.turnovers} turnovers in {TEAM.minutes} team minutes. The player used {formatFixed(playerPlays, 2)} plays (
          {LINE.fieldGoalAttempts} + {USAGE_FREE_THROW_WEIGHT} × {LINE.freeThrowAttempts} + {LINE.turnovers}) against the
          team’s {formatFixed(teamPlays, 2)}, but was on the floor for only {LINE.minutes} of the {TEAM.minutes / 5}{' '}
          minutes, so usage is {formatPercent(r.usage ?? 0, 1)} — more than the 20% an even split among the five
          players on the floor would give.
        </p>
        <DataTable
          caption="The single-number summaries"
          columns={['Measure', 'Result']}
          rows={[
            ['Usage rate', formatPercent(r.usage ?? 0, 1)],
            ['Game Score', one(r.gameScore)],
            ['Assist-to-turnover ratio', formatFixed(r.assistToTurnover ?? 0, 2)],
          ]}
        />
        <p>
          A Game Score of {one(r.gameScore)} sits at the “average performance” mark on Basketball-Reference’s scale. The
          per-36 line — {one(r.per36.points)} points and {one(r.per36.rebounds)} rebounds — is the same{' '}
          {LINE.minutes} minutes stretched to {PER_MINUTES}; whether the player could keep that rate for the extra{' '}
          {PER_MINUTES - LINE.minutes} minutes is the part no box score can show.
        </p>
      </ExplainerSection>

      <ExplainerSection id="checked" title="How the code is checked">
        <p>
          The calculator’s functions are tested against figures Basketball-Reference prints. Three season lines from the
          same 2004-05 team page its four-factors article uses reproduce the usage rates it shows — 19.0, 21.3 and 28.3 —
          and the per-36 numbers beside them, and four single-game lines from a game log reproduce its Game Scores of
          24.2, 22.7, 23.9 and 6.0.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What these numbers leave out">
        <BulletList
          items={[
            'Role and opposition. Per-36 rates assume the same production over more minutes, in a bigger role, against whoever the extra minutes would be played against.',
            'Sample size. Over a few minutes, one hot or cold stretch dominates the rate.',
            'Efficiency. Usage measures how much a player shoots and turns the ball over, not how well. Read it beside true shooting percentage.',
            'Weights. Usage’s 0.44 and Game Score’s coefficients are estimates published by their authors, not measurements.',
            'Most defence. Only steals, blocks, defensive rebounds and fouls appear in a box score.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/tools/basketball/true-shooting-percentage-calculator/" className="link-accent">
            true shooting calculator
          </Link>{' '}
          covers the efficiency side, and the{' '}
          <Link href="/blog/basketball-advanced-stats-explained/" className="link-accent">
            basketball advanced stats explainer
          </Link>{' '}
          puts usage and the per-possession view in context.
        </p>
      </ExplainerSection>
    </>
  );
}
