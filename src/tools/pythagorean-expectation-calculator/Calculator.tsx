'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField } from '@/components/tools/fields';
import { formatFixed, formatRate, isBlank, parseNumber, roundHalfUp } from '@/lib/tools/format.mjs';
import { PYTHAGOREAN_PRESETS, pythagoreanExpectation, validatePythagorean } from '@/lib/tools/pythagorean.mjs';

const CUSTOM = 'custom';

// The illustrative season used in the worked example below — not a real team.
const DEFAULTS = {
  preset: 'baseball-reference',
  exponent: '2',
  pointsFor: '800',
  pointsAgainst: '700',
  games: '162',
  actualWins: '',
  gamesRemaining: '',
};

const signed = (value: number, decimals: number) => {
  const text = formatFixed(Math.abs(value), decimals);
  return value > 0 ? `+${text}` : value < 0 ? `−${text}` : text;
};

export default function PythagoreanCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const preset = PYTHAGOREAN_PRESETS.find((p) => p.id === raw.preset);
  const input = {
    pointsFor: parseNumber(raw.pointsFor),
    pointsAgainst: parseNumber(raw.pointsAgainst),
    exponent: preset ? preset.exponent : parseNumber(raw.exponent),
    games: parseNumber(raw.games),
    actualWins: isBlank(raw.actualWins) ? null : parseNumber(raw.actualWins),
    gamesRemaining: isBlank(raw.gamesRemaining) ? null : parseNumber(raw.gamesRemaining),
  };
  const errors = validatePythagorean(input);
  const r = errors.length === 0 ? pythagoreanExpectation(input) : null;
  const wins = r ? roundHalfUp(r.expectedWins, 0) : 0;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate expected winning percentage"
      intro="Use totals from the same games: runs for baseball, points for basketball, goals for hockey."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <SelectField
              id="py-preset"
              label="Exponent"
              value={raw.preset}
              onChange={set('preset')}
              options={[
                ...PYTHAGOREAN_PRESETS.map((p) => ({ value: p.id, label: p.label })),
                { value: CUSTOM, label: 'Custom exponent' },
              ]}
              hint="Each preset is the exponent a cited source publishes. Choose Custom for any other."
            />
          </div>
          {raw.preset === CUSTOM && (
            <NumberField id="py-exponent" label="Custom exponent" value={raw.exponent} onChange={set('exponent')} inputMode="decimal" />
          )}
          <NumberField id="py-for" label="Scored (runs, points or goals for)" value={raw.pointsFor} onChange={set('pointsFor')} inputMode="decimal" />
          <NumberField
            id="py-against"
            label="Allowed (runs, points or goals against)"
            value={raw.pointsAgainst}
            onChange={set('pointsAgainst')}
            inputMode="decimal"
          />
          <NumberField id="py-games" label="Games played" value={raw.games} onChange={set('games')} />
          <NumberField
            id="py-wins"
            label="Actual wins (optional)"
            value={raw.actualWins}
            onChange={set('actualWins')}
            hint="To compare the real record with the expectation."
          />
          <NumberField
            id="py-remaining"
            label="Games remaining (optional)"
            value={raw.gamesRemaining}
            onChange={set('gamesRemaining')}
            hint="With actual wins, shows where the record ends up at the expected rate."
          />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {r && (
          <ResultList
            headline
            items={[
              { label: 'Expected winning percentage', value: formatRate(r.winPct) },
              { label: 'Expected wins', value: formatFixed(r.expectedWins, 1), note: `of ${input.games}` },
              { label: 'As a record', value: `${wins}–${input.games - wins}` },
              ...(r.winsAboveExpected === null
                ? []
                : [{ label: 'Actual wins vs expected', value: signed(r.winsAboveExpected, 1) }]),
              ...(r.projectedFinalWins === null || r.projectedFinalGames === null
                ? []
                : [
                    {
                      label: 'Final wins at the expected rate',
                      value: formatFixed(r.projectedFinalWins, 1),
                      note: `of ${r.projectedFinalGames} — a hypothetical, not a forecast`,
                    },
                  ]),
              { label: 'Exponent used', value: String(input.exponent) },
            ]}
          />
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
