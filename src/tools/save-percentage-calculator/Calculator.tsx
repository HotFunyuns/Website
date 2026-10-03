'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, parseAll } from '@/components/tools/fields';
import { formatFixed, formatInteger, formatPercent, formatRate, parseNumber } from '@/lib/tools/format.mjs';
import { REGULATION_MINUTES, goalieStats, validateGoalieLine } from '@/lib/tools/hockey.mjs';

// The illustrative season used in the worked example below — not a real goalie.
const DEFAULTS = { shotsAgainst: '1,800', goalsAgainst: '150', minutes: '3,600', seconds: '0', gameLength: '60' };

export default function SavePercentageCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const line = parseAll(raw, parseNumber);
  const errors = validateGoalieLine(line);
  const s = errors.length === 0 ? goalieStats(line) : null;
  const perLabel = s && s.gameLength !== REGULATION_MINUTES ? `per ${s.gameLength} minutes` : 'per 60 minutes';

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate goalie stats"
      intro="Shots against means shots on goal, which include the goals."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="gk-sa" label="Shots against (SA)" value={raw.shotsAgainst} onChange={set('shotsAgainst')} />
          <NumberField id="gk-ga" label="Goals against (GA)" value={raw.goalsAgainst} onChange={set('goalsAgainst')} />
          <NumberField id="gk-min" label="Minutes played" value={raw.minutes} onChange={set('minutes')} />
          <NumberField
            id="gk-sec"
            label="Plus seconds"
            value={raw.seconds}
            onChange={set('seconds')}
            hint="0 to 59. Leave at 0 for whole minutes."
          />
          <NumberField
            id="gk-length"
            label="Regulation game length (minutes)"
            value={raw.gameLength}
            onChange={set('gameLength')}
            hint="60 is the standard definition. Change it only to compare within a league that plays shorter games."
          />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {s && (
          <ResultList
            headline
            items={[
              { label: 'Save percentage (SV%)', value: formatRate(s.savePct), note: formatPercent(s.savePct, 1) },
              { label: `Goals-against average (${perLabel})`, value: formatFixed(s.goalsAgainstAverage, 2) },
              { label: `Shots faced (${perLabel})`, value: formatFixed(s.shotsAgainstPerGame, 1) },
              { label: 'Saves', value: formatInteger(s.saves) },
              { label: 'Minutes played', value: formatFixed(s.minutesPlayed, 2) },
            ]}
          />
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
