'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, parseAll } from '@/components/tools/fields';
import { formatFixed, formatPercent, isBlank, parseNumber } from '@/lib/tools/format.mjs';
import {
  parseMinutes,
  playerRates,
  validatePlayerLine,
  validateTeamTotals,
} from '@/lib/tools/basketball-player.mjs';

// The illustrative bench line used in the worked example below — not a real player.
const DEFAULTS = {
  minutes: '24',
  points: '14',
  fieldGoals: '5',
  fieldGoalAttempts: '11',
  freeThrows: '3',
  freeThrowAttempts: '4',
  offensiveRebounds: '1',
  defensiveRebounds: '4',
  assists: '3',
  steals: '1',
  blocks: '0',
  turnovers: '2',
  personalFouls: '2',
};
const TEAM_DEFAULTS = { minutes: '240', fieldGoalAttempts: '88', freeThrowAttempts: '22', turnovers: '13' };

type Field = keyof typeof DEFAULTS;
type TeamField = keyof typeof TEAM_DEFAULTS;

const FIELDS: { key: Exclude<Field, 'minutes'>; id: string; label: string }[] = [
  { key: 'points', id: 'p36-pts', label: 'Points (PTS)' },
  { key: 'fieldGoals', id: 'p36-fg', label: 'Field goals made (FGM)' },
  { key: 'fieldGoalAttempts', id: 'p36-fga', label: 'Field-goal attempts (FGA)' },
  { key: 'freeThrows', id: 'p36-ft', label: 'Free throws made (FTM)' },
  { key: 'freeThrowAttempts', id: 'p36-fta', label: 'Free-throw attempts (FTA)' },
  { key: 'offensiveRebounds', id: 'p36-orb', label: 'Offensive rebounds (ORB)' },
  { key: 'defensiveRebounds', id: 'p36-drb', label: 'Defensive rebounds (DRB)' },
  { key: 'assists', id: 'p36-ast', label: 'Assists (AST)' },
  { key: 'steals', id: 'p36-stl', label: 'Steals (STL)' },
  { key: 'blocks', id: 'p36-blk', label: 'Blocks (BLK)' },
  { key: 'turnovers', id: 'p36-tov', label: 'Turnovers (TOV)' },
  { key: 'personalFouls', id: 'p36-pf', label: 'Personal fouls (PF)' },
];

const TEAM_FIELDS: { key: TeamField; id: string; label: string; hint?: string }[] = [
  { key: 'minutes', id: 'p36-tm-mp', label: 'Team minutes', hint: 'Five players’ minutes: 240 for one regulation game.' },
  { key: 'fieldGoalAttempts', id: 'p36-tm-fga', label: 'Team field-goal attempts' },
  { key: 'freeThrowAttempts', id: 'p36-tm-fta', label: 'Team free-throw attempts' },
  { key: 'turnovers', id: 'p36-tm-tov', label: 'Team turnovers' },
];

const one = (value: number) => formatFixed(value, 1);

export default function Per36Calculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const [team, setTeam] = useState(TEAM_DEFAULTS);
  const set = (key: Field) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));
  const setTeamField = (key: TeamField) => (value: string) => setTeam((prev) => ({ ...prev, [key]: value }));

  const { minutes: rawMinutes, ...counts } = raw;
  const line = { minutes: parseMinutes(rawMinutes), ...parseAll(counts, parseNumber) };
  const errors = validatePlayerLine(line);

  const teamStarted = Object.values(team).some((value) => !isBlank(value));
  const teamTotals = parseAll(team, parseNumber);
  const teamErrors = teamStarted && errors.length === 0 ? validateTeamTotals(teamTotals, line) : [];
  const useTeam = teamStarted && errors.length === 0 && teamErrors.length === 0;

  const r = errors.length === 0 ? playerRates(line, useTeam ? teamTotals : null) : null;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate per-36 rates and usage"
      intro="Use one game, per-game averages or season totals — the same span for every field."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="p36-mp"
            label="Minutes played (MP)"
            value={raw.minutes}
            onChange={set('minutes')}
            inputMode="text"
            hint="Decimal minutes such as 34.5, or 34:30 as a box score prints them."
          />
          {FIELDS.map((field) => (
            <NumberField
              key={field.key}
              id={field.id}
              label={field.label}
              value={raw[field.key]}
              onChange={set(field.key)}
              inputMode="decimal"
            />
          ))}
        </div>

        <fieldset className="mt-6 rounded-2xl border border-ink-200 p-5">
          <legend className="px-1.5 text-sm font-semibold text-ink-800">Optional: usage rate</legend>
          <p className="text-xs leading-relaxed text-ink-500">
            Usage compares the player’s plays with the team’s over the same games. Clear these four fields to skip it.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {TEAM_FIELDS.map((field) => (
              <NumberField
                key={field.key}
                id={field.id}
                label={field.label}
                value={team[field.key]}
                onChange={setTeamField(field.key)}
                inputMode="decimal"
                hint={field.hint}
              />
            ))}
          </div>
          <div aria-live="polite" className="mt-3 text-sm">
            {teamErrors.length > 0 && (
              <ul className="list-disc space-y-1 pl-5 text-crimson-700">
                {teamErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        </fieldset>
      </form>

      <ResultRegion errors={errors}>
        {r && (
          <>
            <ResultList
              headline
              items={[
                { label: 'Points per 36 minutes', value: one(r.per36.points) },
                { label: 'Rebounds per 36', value: one(r.per36.rebounds) },
                { label: 'Assists per 36', value: one(r.per36.assists) },
                { label: 'Steals per 36', value: one(r.per36.steals) },
                { label: 'Blocks per 36', value: one(r.per36.blocks) },
                { label: 'Turnovers per 36', value: one(r.per36.turnovers) },
                { label: 'Field-goal attempts per 36', value: one(r.per36.fieldGoalAttempts) },
                {
                  label: 'Usage rate (USG%)',
                  value: r.usage === null ? '—' : formatPercent(r.usage, 1),
                  note: r.usage === null ? 'add team totals' : undefined,
                },
                { label: 'Game Score', value: one(r.gameScore) },
                {
                  label: 'Assist-to-turnover ratio',
                  value: r.assistToTurnover === null ? '—' : formatFixed(r.assistToTurnover, 2),
                  note: r.assistToTurnover === null ? 'no turnovers' : undefined,
                },
              ]}
            />
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              {r.projectsBeyondMinutes
                ? `The line covers ${one(line.minutes)} minutes, so the per-36 figures assume the same rate over minutes that were not played.`
                : `Scaled from ${one(line.minutes)} minutes.`}{' '}
              Game Score is built for a single game; per-game averages give the average Game Score.
            </p>
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
