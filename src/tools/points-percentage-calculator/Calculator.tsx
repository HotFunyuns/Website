'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField, parseAll } from '@/components/tools/fields';
import { formatFixed, formatInteger, formatRate, isBlank, parseNumber } from '@/lib/tools/format.mjs';
import {
  SEASON_GAMES_2026_27,
  SEASON_GAMES_PREVIOUS,
  magicNumbers,
  pointsNeeded,
  recordStats,
  validateRecord,
  validateSeason,
} from '@/lib/tools/hockey-standings.mjs';

// The illustrative late-season records used in the worked examples below —
// not real teams. Both have played 76 of 84 games.
const YOU_DEFAULTS = { wins: '50', losses: '20', overtimeLosses: '6' };
const THEM_DEFAULTS = { wins: '44', losses: '28', overtimeLosses: '4' };

type RecordField = keyof typeof YOU_DEFAULTS;
type Tiebreak = 'you' | 'them';

const RECORD_FIELDS: { key: RecordField; label: string }[] = [
  { key: 'wins', label: 'Wins (W)' },
  { key: 'losses', label: 'Regulation losses (L)' },
  { key: 'overtimeLosses', label: 'Overtime and shootout losses (OTL)' },
];

function RecordFields({
  prefix,
  values,
  onChange,
}: {
  prefix: string;
  values: Record<RecordField, string>;
  onChange: (key: RecordField) => (value: string) => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {RECORD_FIELDS.map((field) => (
        <NumberField
          key={field.key}
          id={`${prefix}-${field.key}`}
          label={field.label}
          value={values[field.key]}
          onChange={onChange(field.key)}
        />
      ))}
    </div>
  );
}

/** "3 points", "1 point". */
const points = (n: number) => `${formatInteger(n)} ${Math.abs(n) === 1 ? 'point' : 'points'}`;

export default function PointsPercentageCalculator() {
  const [you, setYou] = useState(YOU_DEFAULTS);
  const [them, setThem] = useState(THEM_DEFAULTS);
  const [season, setSeason] = useState(String(SEASON_GAMES_2026_27));
  const [customGames, setCustomGames] = useState('');
  const [target, setTarget] = useState('');
  const [tiebreak, setTiebreak] = useState<Tiebreak>('them');

  const seasonGames = season === 'other' ? parseNumber(customGames) : Number(season);
  const seasonErrors = validateSeason(seasonGames);
  const yourRecord = parseAll(you, parseNumber);
  const yourErrors = validateRecord(yourRecord, seasonGames, 'Your team');
  const targetPoints = isBlank(target) ? null : parseNumber(target);
  const targetErrors: string[] = [];
  if (targetPoints !== null && (!Number.isInteger(targetPoints) || targetPoints < 0 || targetPoints > 1000)) {
    targetErrors.push('Points target: enter a whole number of points, or leave it empty.');
  }
  const errors = [...seasonErrors, ...yourErrors, ...targetErrors];
  const s = errors.length === 0 ? recordStats(yourRecord, seasonGames) : null;
  const goal = s && targetPoints !== null ? pointsNeeded(yourRecord, seasonGames, targetPoints) : null;

  const themStarted = Object.values(them).some((value) => !isBlank(value));
  const theirRecord = parseAll(them, parseNumber);
  const themErrors = themStarted && errors.length === 0 ? validateRecord(theirRecord, seasonGames, 'Other team') : [];
  const m =
    s && themStarted && themErrors.length === 0
      ? magicNumbers({ you: yourRecord, them: theirRecord, seasonGames, tiebreak })
      : null;

  const extraPace = s && seasonGames !== SEASON_GAMES_2026_27 && seasonGames !== SEASON_GAMES_PREVIOUS;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate points, pace and magic numbers"
      intro="Wins include overtime and shootout wins. Regulation and overtime losses are entered separately, because only the second earns a point."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <fieldset className="rounded-2xl border border-ink-200 p-5">
          <legend className="px-1.5 text-sm font-semibold text-ink-800">Your team</legend>
          <RecordFields prefix="pp-you" values={you} onChange={(key) => (value) => setYou((prev) => ({ ...prev, [key]: value }))} />
        </fieldset>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <SelectField
            id="pp-season"
            label="Games in the season"
            value={season}
            onChange={setSeason}
            options={[
              { value: String(SEASON_GAMES_2026_27), label: `${SEASON_GAMES_2026_27} (NHL, 2026-27)` },
              { value: String(SEASON_GAMES_PREVIOUS), label: `${SEASON_GAMES_PREVIOUS} (NHL, 1995-96 to 2025-26)` },
              { value: 'other', label: 'Another length' },
            ]}
          />
          <NumberField
            id="pp-target"
            label="Points target (optional)"
            value={target}
            onChange={setTarget}
            hint="See how many of the remaining points it takes."
          />
          {season === 'other' && (
            <NumberField id="pp-games" label="Season length (games)" value={customGames} onChange={setCustomGames} />
          )}
        </div>

        <fieldset className="mt-6 rounded-2xl border border-ink-200 p-5">
          <legend className="px-1.5 text-sm font-semibold text-ink-800">Optional: another team, for magic numbers</legend>
          <p className="mb-4 text-xs leading-relaxed text-ink-500">Clear its record to skip the comparison.</p>
          <RecordFields prefix="pp-them" values={them} onChange={(key) => (value) => setThem((prev) => ({ ...prev, [key]: value }))} />
          <div className="mt-4">
            <SelectField
              id="pp-tiebreak"
              label="Level on points, who finishes ahead?"
              value={tiebreak}
              onChange={(value) => setTiebreak(value as Tiebreak)}
              options={[
                { value: 'them', label: 'The other team' },
                { value: 'you', label: 'Your team' },
              ]}
              hint="Not sure? Keep the other team: that gives the safe clinch number. Leagues break ties with their own criteria, which this calculator does not apply."
            />
          </div>
          <div aria-live="polite" className="mt-3 text-sm">
            {themErrors.length > 0 && (
              <ul className="list-disc space-y-1 pl-5 text-crimson-700">
                {themErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        </fieldset>
      </form>

      <ResultRegion errors={errors}>
        {s && (
          <>
            <ResultList
              headline
              items={[
                {
                  label: 'Points percentage (PTS%)',
                  value: formatRate(s.pointsPct),
                  note: `${points(s.points)} from ${s.gamesPlayed} ${s.gamesPlayed === 1 ? 'game' : 'games'}`,
                },
                { label: 'Pace over 84 games', value: formatFixed(s.pace84, 1) },
                { label: 'Pace over 82 games', value: formatFixed(s.pace82, 1) },
                ...(extraPace ? [{ label: `Pace over ${seasonGames} games`, value: formatFixed(s.pace, 1) }] : []),
                { label: 'Games remaining', value: formatInteger(s.gamesRemaining) },
                { label: 'Maximum possible points', value: formatInteger(s.maxPoints) },
                ...(goal && targetPoints !== null
                  ? [
                      {
                        label: `Points needed for ${formatInteger(targetPoints)}`,
                        value: goal.reached ? 'Reached' : formatInteger(goal.needed),
                        note: goal.reached
                          ? undefined
                          : !goal.possible
                            ? 'more than the games left allow'
                            : goal.pctOfRemaining !== null
                              ? `${formatRate(goal.pctOfRemaining)} of the ${formatInteger(goal.available)} left`
                              : undefined,
                      },
                    ]
                  : []),
              ]}
            />
            {m && (
              <div className="mt-6 border-t border-ink-200 pt-4">
                <ResultList
                  items={[
                    {
                      label: 'Clinch number (finish ahead of them)',
                      value: m.clinched ? 'Clinched' : m.eliminated ? 'Not possible' : formatInteger(m.clinch),
                    },
                    {
                      label: 'Elimination number (finish behind them)',
                      value: m.eliminated ? 'Eliminated' : m.clinched ? 'Not possible' : formatInteger(m.elimination),
                    },
                  ]}
                />
                <p className="mt-4 text-xs leading-relaxed text-ink-500">
                  {m.clinched || m.eliminated
                    ? `Your team has ${points(m.you.points)} and can reach ${formatInteger(m.you.maxPoints)}; the other team has ${points(m.them.points)} and can reach ${formatInteger(m.them.maxPoints)}.`
                    : `Any mix of points your team earns and points the other team fails to earn (2 for each regulation loss, 1 for each overtime or shootout loss) that adds up to ${formatInteger(m.clinch)} puts your team ahead for good. The other team can reach ${formatInteger(m.them.maxPoints)}.`}
                </p>
              </div>
            )}
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
