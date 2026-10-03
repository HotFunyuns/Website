'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField } from '@/components/tools/fields';
import { formatFixed, parseNumber } from '@/lib/tools/format.mjs';
import { FINAL_SET_TYPES, matchProbabilities, validateTennis } from '@/lib/tools/tennis.mjs';

// Starts on the worked example below: 62% against 60%, best of five.
const DEFAULTS = { pA: '62', pB: '60', bestOf: '5', finalSet: 'tiebreak', games: 'advantage' };

const pct = (p: number) => `${formatFixed(p * 100, 1)}%`;

export default function TennisWinProbabilityCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const pAPercent = parseNumber(raw.pA);
  const pBPercent = parseNumber(raw.pB);
  const errors = validateTennis({ pAPercent, pBPercent });
  const finalSet = (FINAL_SET_TYPES.find((t) => t.id === raw.finalSet)?.id ?? 'tiebreak') as
    | 'tiebreak'
    | 'advantage'
    | 'match-tiebreak';
  const r =
    errors.length === 0
      ? matchProbabilities({
          pA: pAPercent / 100,
          pB: pBPercent / 100,
          bestOf: raw.bestOf === '3' ? 3 : 5,
          finalSet,
          noAd: raw.games === 'no-ad',
        })
      : null;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate match win probability"
      intro="Each player’s share of points won on their own serve, as a percentage."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="tw-pa"
            label="Player A: points won on serve (%)"
            value={raw.pA}
            onChange={set('pA')}
            inputMode="decimal"
          />
          <NumberField
            id="tw-pb"
            label="Player B: points won on serve (%)"
            value={raw.pB}
            onChange={set('pB')}
            inputMode="decimal"
          />
          <SelectField
            id="tw-best-of"
            label="Match length"
            value={raw.bestOf}
            onChange={set('bestOf')}
            options={[
              { value: '3', label: 'Best of three sets' },
              { value: '5', label: 'Best of five sets' },
            ]}
          />
          <SelectField
            id="tw-games"
            label="Games"
            value={raw.games}
            onChange={set('games')}
            options={[
              { value: 'advantage', label: 'Advantage scoring' },
              { value: 'no-ad', label: 'No-Ad: one point at deuce' },
            ]}
          />
        </div>
        <div className="mt-4">
          <SelectField
            id="tw-final-set"
            label="Final set"
            value={raw.finalSet}
            onChange={set('finalSet')}
            options={FINAL_SET_TYPES.map((t) => ({ value: t.id, label: t.label }))}
            hint="Every other set has a seven-point tie-break at six games all. A 10-point match tie-break replaces the final set."
          />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {r && (
          <>
            <ResultList
              headline
              items={[
                { label: 'Player A wins the match', value: pct(r.matchA) },
                { label: 'Player B wins the match', value: pct(1 - r.matchA) },
                { label: 'A holds serve', value: pct(r.holdA) },
                { label: 'B holds serve', value: pct(r.holdB) },
                { label: 'A wins a tie-break', value: pct(r.tiebreakA), note: 'seven points' },
                { label: 'A wins a set', value: pct(r.setA), note: 'tie-break set' },
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              Most likely score in sets:{' '}
              {r.scores
                .slice()
                .sort((x, y) => y.p - x.p)
                .slice(0, 3)
                .map((s) => `${s.score} (${pct(s.p)})`)
                .join(', ')}
              . Scores are from player A’s side.
            </p>
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
