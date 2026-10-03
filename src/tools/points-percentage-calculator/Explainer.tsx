import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed, formatRate } from '@/lib/tools/format.mjs';
import {
  POINTS_FOR_OVERTIME_LOSS,
  POINTS_FOR_WIN,
  SEASON_GAMES_2026_27,
  SEASON_GAMES_PREVIOUS,
  magicNumbers,
  pointsNeeded,
  recordStats,
} from '@/lib/tools/hockey-standings.mjs';
import { getToolById, toolPath } from '@/tools/registry';

// Illustrative late-season records — not real teams — that are also the
// calculator's defaults: 76 of 84 games played by both.
const YOU = { wins: 50, losses: 20, overtimeLosses: 6 };
const THEM = { wins: 44, losses: 28, overtimeLosses: 4 };
const SEASON = SEASON_GAMES_2026_27;
const TARGET = 116;

export default function PointsPercentageExplainer() {
  const s = recordStats(YOU, SEASON);
  const goal = pointsNeeded(YOU, SEASON, TARGET);
  const loseTie = magicNumbers({ you: YOU, them: THEM, seasonGames: SEASON, tiebreak: 'them' });
  const winTie = magicNumbers({ you: YOU, them: THEM, seasonGames: SEASON, tiebreak: 'you' });
  // The wins-based magic number calculator is a separate tool; link it once it exists.
  const winsBased = getToolById('magic-number-calculator');
  return (
    <>
      <ExplainerSection id="formulas" title="The formulas">
        <Formula label="Standings points">
          points = {POINTS_FOR_WIN} × wins + {POINTS_FOR_OVERTIME_LOSS} × overtime and shootout losses
        </Formula>
        <Formula label="Points percentage">PTS% = points ÷ (2 × games played)</Formula>
        <Formula label="Pace">pace = points ÷ games played × games in the season</Formula>
        <Formula label="Maximum possible points">max = points + 2 × games remaining</Formula>
        <p>
          Rule 78.1 of the NHL’s 2026-27 rulebook gives two points for a win in regulation, overtime or a shootout, and
          one to the team that loses in overtime or a shootout. Hockey-Reference defines points percentage as points
          divided by the maximum possible. The NHL’s 2026-27 schedule gives every team {SEASON_GAMES_2026_27} games, up
          from {SEASON_GAMES_PREVIOUS}, so the calculator shows the pace over both.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked example: points, percentage and pace">
        <p>
          An illustrative record — not a real team — of {YOU.wins} wins, {YOU.losses} regulation losses and{' '}
          {YOU.overtimeLosses} overtime or shootout losses after {s.gamesPlayed} of {SEASON} games:
        </p>
        <DataTable
          caption={`${YOU.wins}-${YOU.losses}-${YOU.overtimeLosses} after ${s.gamesPlayed} games`}
          columns={['Measure', 'Calculation', 'Result']}
          rows={[
            ['Points', `2 × ${YOU.wins} + ${YOU.overtimeLosses}`, s.points],
            ['Points percentage', `${s.points} ÷ (2 × ${s.gamesPlayed})`, formatRate(s.pointsPct)],
            ['Pace over 84 games', `${s.points} ÷ ${s.gamesPlayed} × 84`, formatFixed(s.pace84, 1)],
            ['Pace over 82 games', `${s.points} ÷ ${s.gamesPlayed} × 82`, formatFixed(s.pace82, 1)],
            ['Maximum possible', `${s.points} + 2 × ${s.gamesRemaining}`, s.maxPoints],
          ]}
        />
        <p>
          To reach {TARGET} points the team needs {goal.needed} of the {goal.available} still available — a points
          percentage of {formatRate(goal.pctOfRemaining ?? 0)} over the last {s.gamesRemaining} games.
        </p>
      </ExplainerSection>

      <ExplainerSection id="magic-numbers" title="Worked example: magic numbers">
        <p>
          Now a second illustrative team, {THEM.wins}-{THEM.losses}-{THEM.overtimeLosses} with {loseTie.them.points}{' '}
          points after the same {loseTie.them.gamesPlayed} games. It can still reach{' '}
          {loseTie.them.maxPoints} (that is, {loseTie.them.points} + 2 × {loseTie.them.gamesRemaining}).
        </p>
        <Formula label="Clinch number">other team’s maximum − your points + 1 (or + 0 if your team wins a tie)</Formula>
        <Formula label="Elimination number">your maximum − other team’s points + 1 (or + 0 if they win a tie)</Formula>
        <DataTable
          caption="The same two records, either tie-break"
          columns={['If level on points', 'Clinch number', 'Elimination number']}
          rows={[
            ['The other team finishes ahead', loseTie.clinch, loseTie.elimination],
            ['Your team finishes ahead', winTie.clinch, winTie.elimination],
          ]}
        />
        <p>
          With the other team holding the tie-break, any mix of points that adds up to {loseTie.clinch} or more settles
          it: a win for your team (2) and one overtime loss for theirs (1), or two regulation losses for them (4 points
          they can no longer earn), and so on. The numbers come from the points rule alone; a tie-break is whatever you tell
          the calculator, because it does not apply any league’s tie-breaking order.
        </p>
        <p>
          {winsBased ? (
            <>
              For sports where every game ends in a win or a loss, the{' '}
              <Link href={toolPath(winsBased)} className="link-accent">
                {winsBased.shortTitle.toLowerCase()} calculator
              </Link>{' '}
              counts games instead of points.
            </>
          ) : (
            <>
              In sports where every game ends in a win or a loss, a magic number counts games instead of points; the
              hockey version has to count points because an overtime loss still earns one.
            </>
          )}
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What these numbers leave out">
        <BulletList
          items={[
            'Schedule. A pace assumes the remaining games look like the ones played; a hard run-in or a soft one changes that.',
            'Tie-breakers. Leagues separate teams level on points with their own criteria, which this calculator does not apply.',
            'Every other team. A magic number here is against one team; a playoff place depends on the whole table.',
            'Other points systems. The arithmetic follows the NHL’s two points for a win and one for an overtime or shootout loss; leagues that award points differently need different sums.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/blog/how-soccer-league-tables-work/" className="link-accent">
            guide to how league tables work
          </Link>{' '}
          covers another sport’s points system and games in hand, and{' '}
          <Link href="/blog/understanding-sports-sim-probability/" className="link-accent">
            understanding sports-sim probability
          </Link>{' '}
          explains why a projected total is less precise than it looks.
        </p>
      </ExplainerSection>
    </>
  );
}
