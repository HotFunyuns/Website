'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField } from '@/components/tools/fields';
import { formatFixed, isBlank, parseNumber } from '@/lib/tools/format.mjs';
import {
  SEASON_PRESETS,
  formatChance,
  formatOneIn,
  seasonOdds,
  validateSeason,
  winChanceForPerfect,
} from '@/lib/tools/perfect-season.mjs';

const CUSTOM = 'custom';

// Starts on the first worked example below: 20 games at 90% a game.
const DEFAULTS = { preset: 'football-top-seed', games: '20', win: '90', draw: '0' };

const withOneIn = (p: number) => {
  const oneIn = formatOneIn(p);
  return oneIn ? `${formatChance(p)} (${oneIn})` : formatChance(p);
};

export default function PerfectSeasonCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const preset = SEASON_PRESETS.find((p) => p.id === raw.preset);
  const input = {
    games: preset ? preset.games : parseNumber(raw.games),
    winPercent: parseNumber(raw.win),
    drawPercent: isBlank(raw.draw) ? 0 : parseNumber(raw.draw),
  };
  const errors = validateSeason(input);
  const r = errors.length === 0 ? seasonOdds(input) : null;
  const n = input.games;
  const hasDraws = input.drawPercent > 0;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate the chance of a perfect season"
      intro="Enter one game’s chances as percentages. The same chances apply to every game."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="space-y-4">
          <SelectField
            id="ps-preset"
            label="Season length"
            value={raw.preset}
            onChange={set('preset')}
            options={[
              ...SEASON_PRESETS.map((p) => ({ value: p.id, label: p.label })),
              { value: CUSTOM, label: 'Custom number of games' },
            ]}
            hint="Games in a season; league lengths come from the sources listed below. The NFL No. 1 seed option adds the three playoff games a top seed plays. Choose Custom for any other run — 40 fights, a cup run, a tournament."
          />
          {raw.preset === CUSTOM && (
            <NumberField id="ps-games" label="Games" value={raw.games} onChange={set('games')} />
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              id="ps-win"
              label="Chance of winning a game (%)"
              value={raw.win}
              onChange={set('win')}
              inputMode="decimal"
            />
            <NumberField
              id="ps-draw"
              label="Chance of a draw (%)"
              value={raw.draw}
              onChange={set('draw')}
              inputMode="decimal"
              hint="Leave at 0 in sports without draws."
            />
          </div>
        </div>
      </form>

      <ResultRegion errors={errors}>
        {r && (
          <ResultList
            headline
            items={[
              { label: `Perfect season (${n}–0)`, value: formatChance(r.perfect), note: formatOneIn(r.perfect) ?? undefined },
              ...(hasDraws ? [{ label: 'Unbeaten (no losses)', value: withOneIn(r.unbeaten) }] : []),
              { label: 'At most one loss', value: withOneIn(r.atMostOneLoss) },
              { label: 'At most two losses', value: withOneIn(r.atMostTwoLosses) },
              {
                label: 'Average record at these chances',
                value: hasDraws
                  ? `${formatFixed(r.expectedWins, 1)}–${formatFixed(r.expectedDraws, 1)}–${formatFixed(r.expectedLosses, 1)}`
                  : `${formatFixed(r.expectedWins, 1)}–${formatFixed(r.expectedLosses, 1)}`,
                note: hasDraws ? 'wins–draws–losses' : 'wins–losses',
              },
              {
                label: `Win chance for an even chance of ${n}–0`,
                value: `${formatFixed(winChanceForPerfect(n, 0.5) * 100, 1)}%`,
                note: 'a game',
              },
            ]}
          />
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
