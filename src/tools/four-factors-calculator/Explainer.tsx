import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed, formatInteger, formatPercent, formatRate } from '@/lib/tools/format.mjs';
import {
  FOUR_FACTOR_WEIGHTS,
  POSS_FREE_THROW_WEIGHT,
  POSS_REBOUND_FACTOR,
  TOV_FREE_THROW_WEIGHT,
  teamEfficiency,
} from '@/lib/tools/basketball-team.mjs';

// Basketball-Reference's own four-factors example: one NBA team's 2004-05
// regular season against its opponents. The calculator starts on it too.
const SEASON = {
  team: {
    fieldGoals: 3351,
    fieldGoalAttempts: 7018,
    threePointers: 796,
    freeThrows: 1556,
    freeThrowAttempts: 2080,
    offensiveRebounds: 967,
    defensiveRebounds: 2652,
    turnovers: 1125,
  },
  opponent: {
    fieldGoals: 3328,
    fieldGoalAttempts: 7485,
    threePointers: 494,
    freeThrows: 1320,
    freeThrowAttempts: 1775,
    offensiveRebounds: 1233,
    defensiveRebounds: 2550,
    turnovers: 1131,
  },
  teamMinutes: 19780,
};

export default function FourFactorsExplainer() {
  const e = teamEfficiency(SEASON);
  const { team, opponent } = SEASON;
  return (
    <>
      <ExplainerSection id="formulas" title="The formulas">
        <Formula label="Shooting">eFG% = (FG + 0.5 × 3P) ÷ FGA</Formula>
        <Formula label="Turnovers">TOV% = TOV ÷ (FGA + {TOV_FREE_THROW_WEIGHT} × FTA + TOV)</Formula>
        <Formula label="Rebounding">ORB% = ORB ÷ (ORB + opponent DRB)</Formula>
        <Formula label="Free throws">FT/FGA = FT ÷ FGA</Formula>
        <p>
          Each factor is measured for both teams, so a team’s defence is its opponent’s numbers. Basketball-Reference
          reports the approximate weight Oliver assigned each one:
        </p>
        <DataTable
          caption="Dean Oliver’s approximate weights"
          columns={['Factor', 'Weight']}
          rows={FOUR_FACTOR_WEIGHTS.map((f) => [f.label, formatPercent(f.weight, 0)])}
        />
        <p>
          The weights are his estimates of how much each factor matters, not a formula for combining them, so the
          calculator shows the factors side by side instead of adding them up.
        </p>
        <Formula label="Possessions (estimated)">
          ½ × [(FGA + {POSS_FREE_THROW_WEIGHT} × FTA − {POSS_REBOUND_FACTOR} × ORB ÷ (ORB + opp. DRB) × (FGA − FG) +
          TOV) + the same for the opponent]
        </Formula>
        <Formula label="Pace">pace = 48 × possessions ÷ (team minutes ÷ 5)</Formula>
        <Formula label="Ratings">
          ORtg = 100 × points ÷ possessions · DRtg = 100 × opponent points ÷ possessions · net = ORtg − DRtg
        </Formula>
        <p>
          The possession formula is Basketball-Reference’s. It estimates possessions from each side’s box score and
          averages the two, so both teams get the same number; the ratings follow the NBA glossary’s definitions. Pace
          uses 48 minutes, or 40 for the WNBA, as Basketball-Reference does.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked example: Basketball-Reference’s own">
        <p>
          Basketball-Reference works the four factors through for one NBA team’s 2004-05 regular season. The same
          totals, run through the calculator’s code, give its published figures:
        </p>
        <DataTable
          caption="The four factors for a 2004-05 season"
          columns={['Factor', 'Calculation', 'Result']}
          rows={[
            [
              'Offensive eFG%',
              `(${formatInteger(team.fieldGoals)} + 0.5 × ${team.threePointers}) ÷ ${formatInteger(team.fieldGoalAttempts)}`,
              formatRate(e.team.effectiveFieldGoalPct),
            ],
            [
              'Defensive eFG%',
              `(${formatInteger(opponent.fieldGoals)} + 0.5 × ${opponent.threePointers}) ÷ ${formatInteger(opponent.fieldGoalAttempts)}`,
              formatRate(e.opponent.effectiveFieldGoalPct),
            ],
            [
              'Offensive TOV%',
              `${formatInteger(team.turnovers)} ÷ (${formatInteger(team.fieldGoalAttempts)} + 0.44 × ${formatInteger(team.freeThrowAttempts)} + ${formatInteger(team.turnovers)})`,
              formatRate(e.team.turnoverPct),
            ],
            [
              'Defensive TOV%',
              `${formatInteger(opponent.turnovers)} ÷ (${formatInteger(opponent.fieldGoalAttempts)} + 0.44 × ${formatInteger(opponent.freeThrowAttempts)} + ${formatInteger(opponent.turnovers)})`,
              formatRate(e.opponent.turnoverPct),
            ],
            [
              'ORB%',
              `${team.offensiveRebounds} ÷ (${team.offensiveRebounds} + ${formatInteger(opponent.defensiveRebounds)})`,
              formatRate(e.team.offensiveReboundPct),
            ],
            [
              'DRB%',
              `${formatInteger(team.defensiveRebounds)} ÷ (${formatInteger(opponent.offensiveRebounds)} + ${formatInteger(team.defensiveRebounds)})`,
              formatRate(e.defensiveReboundPct),
            ],
            [
              'Offensive FT/FGA',
              `${formatInteger(team.freeThrows)} ÷ ${formatInteger(team.fieldGoalAttempts)}`,
              formatRate(e.team.freeThrowRate),
            ],
            [
              'Defensive FT/FGA',
              `${formatInteger(opponent.freeThrows)} ÷ ${formatInteger(opponent.fieldGoalAttempts)}`,
              formatRate(e.opponent.freeThrowRate),
            ],
          ]}
        />
        <p>
          The team out-shot its opponents and got to the line more often, while committing turnovers at a slightly
          higher rate and rebounding fewer of its own misses than they did. The biggest gap was in shooting, the factor
          Oliver weighted most.
        </p>
        <p>
          Over {formatInteger(SEASON.teamMinutes)} team minutes, the possession estimate comes to{' '}
          {formatFixed(e.possessions, 1)}. The team scored {formatInteger(e.points)} points and allowed{' '}
          {formatInteger(e.opponentPoints)}. That reproduces the offensive rating, defensive rating and pace
          Basketball-Reference prints on the same team’s season page:
        </p>
        <DataTable
          caption="Possessions, pace and ratings"
          columns={['Measure', 'Calculation', 'Result']}
          rows={[
            ['Offensive rating', `100 × ${formatInteger(e.points)} ÷ ${formatFixed(e.possessions, 1)}`, formatFixed(e.offensiveRating, 1)],
            ['Defensive rating', `100 × ${formatInteger(e.opponentPoints)} ÷ ${formatFixed(e.possessions, 1)}`, formatFixed(e.defensiveRating, 1)],
            ['Net rating', 'ORtg − DRtg', formatFixed(e.netRating, 1)],
            ['Pace', `48 × ${formatFixed(e.possessions, 1)} ÷ (${formatInteger(SEASON.teamMinutes)} ÷ 5)`, formatFixed(e.pace, 1)],
          ]}
        />
      </ExplainerSection>

      <ExplainerSection id="limits" title="What the four factors leave out">
        <BulletList
          items={[
            'Possessions are estimated. Different formulas give slightly different counts, and every rating inherits the difference.',
            'The weights are approximate. Oliver’s 40/25/20/15 split says shooting matters most, not exactly how much a point of eFG% is worth against a point of TOV%.',
            'Why, not just what. The factors show where a game was won — they do not show whether the shots were open, which player turned it over, or how the rebounds were lost.',
            'One game is a small sample. A handful of possessions can swing any factor; a season settles them.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/blog/basketball-advanced-stats-explained/" className="link-accent">
            basketball advanced stats explainer
          </Link>{' '}
          covers the per-possession view at player level, and the{' '}
          <Link href="/blog/how-to-build-a-balanced-basketball-roster/" className="link-accent">
            guide to building a balanced roster
          </Link>{' '}
          looks at the team-building side of the same factors.
        </p>
      </ExplainerSection>
    </>
  );
}
