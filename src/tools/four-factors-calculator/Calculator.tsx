'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField, parseAll } from '@/components/tools/fields';
import { formatFixed, formatInteger, formatPercent, formatRate, parseNumber, roundHalfUp } from '@/lib/tools/format.mjs';
import { factorEdges, teamEfficiency, validateGame } from '@/lib/tools/basketball-team.mjs';

// Basketball-Reference's four-factors example: one NBA team's 2004-05 regular
// season and its opponents' totals. The worked example below uses it too.
const TEAM_DEFAULTS = {
  fieldGoals: '3,351',
  fieldGoalAttempts: '7,018',
  threePointers: '796',
  freeThrows: '1,556',
  freeThrowAttempts: '2,080',
  offensiveRebounds: '967',
  defensiveRebounds: '2,652',
  turnovers: '1,125',
};
const OPPONENT_DEFAULTS = {
  fieldGoals: '3,328',
  fieldGoalAttempts: '7,485',
  threePointers: '494',
  freeThrows: '1,320',
  freeThrowAttempts: '1,775',
  offensiveRebounds: '1,233',
  defensiveRebounds: '2,550',
  turnovers: '1,131',
};

type LineField = keyof typeof TEAM_DEFAULTS;

const LINE_FIELDS: { key: LineField; label: string }[] = [
  { key: 'fieldGoals', label: 'Field goals made (FGM)' },
  { key: 'fieldGoalAttempts', label: 'Field-goal attempts (FGA)' },
  { key: 'threePointers', label: 'Three-pointers made (3PM)' },
  { key: 'freeThrows', label: 'Free throws made (FTM)' },
  { key: 'freeThrowAttempts', label: 'Free-throw attempts (FTA)' },
  { key: 'offensiveRebounds', label: 'Offensive rebounds (ORB)' },
  { key: 'defensiveRebounds', label: 'Defensive rebounds (DRB)' },
  { key: 'turnovers', label: 'Turnovers (TOV)' },
];

type Edge = 'team' | 'opponent' | 'even';

function signed(value: number) {
  const rounded = roundHalfUp(value, 1);
  if (rounded > 0) return `+${rounded.toFixed(1)}`;
  if (rounded < 0) return `−${Math.abs(rounded).toFixed(1)}`;
  return '0.0';
}

function LineFields({
  prefix,
  legend,
  values,
  onChange,
}: {
  prefix: string;
  legend: string;
  values: Record<LineField, string>;
  onChange: (key: LineField) => (value: string) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-ink-200 p-5">
      <legend className="px-1.5 text-sm font-semibold text-ink-800">{legend}</legend>
      <div className="grid gap-4">
        {LINE_FIELDS.map((field) => (
          <NumberField
            key={field.key}
            id={`${prefix}-${field.key}`}
            label={field.label}
            value={values[field.key]}
            onChange={onChange(field.key)}
            inputMode="decimal"
          />
        ))}
      </div>
    </fieldset>
  );
}

export default function FourFactorsCalculator() {
  const [team, setTeam] = useState(TEAM_DEFAULTS);
  const [opponent, setOpponent] = useState(OPPONENT_DEFAULTS);
  const [teamMinutes, setTeamMinutes] = useState('19,780');
  const [paceBasis, setPaceBasis] = useState('48');

  const input = {
    team: parseAll(team, parseNumber),
    opponent: parseAll(opponent, parseNumber),
    teamMinutes: parseNumber(teamMinutes),
    paceBasis: Number(paceBasis),
  };
  const errors = validateGame(input);
  const e = errors.length === 0 ? teamEfficiency(input) : null;
  const edges = e ? factorEdges(e.team, e.opponent) : null;

  const pct = (value: number | undefined) => (value === undefined ? '—' : formatPercent(value, 1));
  const rate = (value: number | undefined) => (value === undefined ? '—' : formatRate(value));
  const factorRows: { label: string; team: string; opponent: string; edge: Edge | null }[] = [
    {
      label: 'Shooting (eFG%)',
      team: pct(e?.team.effectiveFieldGoalPct),
      opponent: pct(e?.opponent.effectiveFieldGoalPct),
      edge: edges?.shooting ?? null,
    },
    {
      label: 'Turnovers (TOV%)',
      team: pct(e?.team.turnoverPct),
      opponent: pct(e?.opponent.turnoverPct),
      edge: edges?.turnovers ?? null,
    },
    {
      label: 'Rebounding (ORB%)',
      team: pct(e?.team.offensiveReboundPct),
      opponent: pct(e?.opponent.offensiveReboundPct),
      edge: edges?.rebounding ?? null,
    },
    {
      label: 'Free throws (FT/FGA)',
      team: rate(e?.team.freeThrowRate),
      opponent: rate(e?.opponent.freeThrowRate),
      edge: edges?.freeThrows ?? null,
    },
  ];
  // The better side's figure is bold, with the word spelled out for screen readers.
  const cell = (value: string, better: boolean) =>
    better ? (
      <strong className="font-semibold text-ink-950">
        {value}
        <span className="sr-only"> (better)</span>
      </strong>
    ) : (
      value
    );

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate the four factors and ratings"
      intro="Use one game or a whole season, the same span for both teams. Points are worked out from the field goals, threes and free throws."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <LineFields
            prefix="ff-team"
            legend="Team"
            values={team}
            onChange={(key) => (value) => setTeam((prev) => ({ ...prev, [key]: value }))}
          />
          <LineFields
            prefix="ff-opp"
            legend="Opponent"
            values={opponent}
            onChange={(key) => (value) => setOpponent((prev) => ({ ...prev, [key]: value }))}
          />
          <NumberField
            id="ff-minutes"
            label="Team minutes"
            value={teamMinutes}
            onChange={setTeamMinutes}
            inputMode="decimal"
            hint="Five players’ minutes: 240 for one 48-minute game. The example is a full season."
          />
          <SelectField
            id="ff-pace"
            label="Pace per"
            value={paceBasis}
            onChange={setPaceBasis}
            options={[
              { value: '48', label: '48 minutes (Basketball-Reference’s formula)' },
              { value: '40', label: '40 minutes (as it uses for the WNBA)' },
            ]}
          />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {e && (
          <ResultList
            headline
            items={[
              { label: 'Net rating', value: signed(e.netRating), note: 'per 100 possessions' },
              { label: 'Offensive rating', value: formatFixed(e.offensiveRating, 1) },
              { label: 'Defensive rating', value: formatFixed(e.defensiveRating, 1) },
              { label: 'Possessions (estimated)', value: formatFixed(e.possessions, 1) },
              { label: `Pace (per ${e.paceBasis} minutes)`, value: formatFixed(e.pace, 1) },
              { label: 'Points', value: `${formatInteger(e.points)}–${formatInteger(e.opponentPoints)}` },
            ]}
          />
        )}
      </ResultRegion>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-200">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="caption-top px-4 pb-2 pt-4 text-left text-sm font-medium text-ink-700">
            The four factors, each side’s offence
          </caption>
          <thead>
            <tr className="border-b border-ink-300 bg-cream-100 text-xs uppercase tracking-[0.08em] text-ink-500">
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Factor
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Team
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Opponent
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {factorRows.map((row) => (
              <tr key={row.label} className="border-b border-ink-200 last:border-0">
                <th scope="row" className="px-4 py-2.5 font-medium text-ink-800">
                  {row.label}
                </th>
                <td className="px-4 py-2.5 text-ink-700">{cell(row.team, row.edge === 'team')}</td>
                <td className="px-4 py-2.5 text-ink-700">{cell(row.opponent, row.edge === 'opponent')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-500">
        The better figure in each row is in bold: higher is better for eFG%, ORB% and FT/FGA, lower for TOV%. The
        opponent’s ORB% and the team’s defensive rebound percentage add up to 100%: the team’s DRB% is{' '}
        {pct(e?.defensiveReboundPct)}.
      </p>
    </CalculatorCard>
  );
}
