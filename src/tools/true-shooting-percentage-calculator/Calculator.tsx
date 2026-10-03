'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion } from '@/components/tools/fields';
import { formatFixed, formatInteger, formatPercent, isBlank, parseNumber } from '@/lib/tools/format.mjs';
import { shootingEfficiency, validateShootingLine } from '@/lib/tools/basketball.mjs';

// The illustrative line used in the worked example below — not a real player.
const DEFAULTS = {
  fieldGoals: '10',
  fieldGoalAttempts: '20',
  threePointers: '4',
  threePointAttempts: '9',
  freeThrows: '6',
  freeThrowAttempts: '8',
};

export default function TrueShootingCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const line = {
    fieldGoals: parseNumber(raw.fieldGoals),
    fieldGoalAttempts: parseNumber(raw.fieldGoalAttempts),
    threePointers: parseNumber(raw.threePointers),
    threePointAttempts: isBlank(raw.threePointAttempts) ? null : parseNumber(raw.threePointAttempts),
    freeThrows: parseNumber(raw.freeThrows),
    freeThrowAttempts: parseNumber(raw.freeThrowAttempts),
  };
  const errors = validateShootingLine(line);
  const s = errors.length === 0 ? shootingEfficiency(line) : null;
  const pct = (value: number | null) => (value === null ? '—' : formatPercent(value, 1));

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate shooting efficiency"
      intro="Field goals include three-pointers, exactly as a box score counts them."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="sh-fg" label="Field goals made (FGM)" value={raw.fieldGoals} onChange={set('fieldGoals')} />
          <NumberField id="sh-fga" label="Field-goal attempts (FGA)" value={raw.fieldGoalAttempts} onChange={set('fieldGoalAttempts')} />
          <NumberField id="sh-3p" label="Three-pointers made (3PM)" value={raw.threePointers} onChange={set('threePointers')} />
          <NumberField
            id="sh-3pa"
            label="Three-point attempts (3PA)"
            value={raw.threePointAttempts}
            onChange={set('threePointAttempts')}
            hint="Only needed for 3P%. Leave empty to skip it."
          />
          <NumberField id="sh-ft" label="Free throws made (FTM)" value={raw.freeThrows} onChange={set('freeThrows')} />
          <NumberField id="sh-fta" label="Free-throw attempts (FTA)" value={raw.freeThrowAttempts} onChange={set('freeThrowAttempts')} />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {s && (
          <>
            <ResultList
              headline
              items={[
                { label: 'True shooting % (TS%)', value: formatPercent(s.trueShootingPct, 1) },
                { label: 'Effective field-goal % (eFG%)', value: formatPercent(s.effectiveFieldGoalPct, 1) },
                { label: 'Field-goal % (FG%)', value: formatPercent(s.fieldGoalPct, 1) },
                { label: 'Three-point % (3P%)', value: pct(s.threePointPct) },
                { label: 'Free-throw % (FT%)', value: pct(s.freeThrowPct) },
                { label: 'Points', value: formatInteger(s.points) },
              ]}
            />
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              {formatInteger(s.points)} points from {formatFixed(s.trueShootingAttempts, 2)} true shooting attempts
              (field-goal attempts plus 0.44 × free-throw attempts).
            </p>
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
