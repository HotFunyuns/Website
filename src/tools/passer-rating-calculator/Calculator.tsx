'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, parseAll } from '@/components/tools/fields';
import { formatFixed, formatPercent, parseNumber } from '@/lib/tools/format.mjs';
import {
  PASSER_RATING_COMPONENT_CAP,
  ncaaPassingEfficiency,
  passerRating,
  validatePasserLine,
} from '@/lib/tools/football.mjs';

// Starts on the NFL Record & Fact Book's own worked example, so the page's
// first result is one a reader can check against the cited source.
const DEFAULTS = { attempts: '502', completions: '343', yards: '4,643', touchdowns: '45', interceptions: '6' };

export default function PasserRatingCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const line = parseAll(raw, parseNumber);
  const errors = validatePasserLine(line);
  const nfl = errors.length === 0 ? passerRating(line) : null;
  const ncaa = errors.length === 0 ? ncaaPassingEfficiency(line) : null;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate passer rating"
      intro="Season, game or career totals all work. Yards are passing yards; commas are fine."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="pr-attempts" label="Pass attempts" value={raw.attempts} onChange={set('attempts')} />
          <NumberField id="pr-completions" label="Completions" value={raw.completions} onChange={set('completions')} />
          <NumberField id="pr-yards" label="Passing yards" value={raw.yards} onChange={set('yards')} />
          <NumberField id="pr-touchdowns" label="Touchdown passes" value={raw.touchdowns} onChange={set('touchdowns')} />
          <NumberField id="pr-interceptions" label="Interceptions" value={raw.interceptions} onChange={set('interceptions')} />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {nfl && ncaa && (
          <>
            <ResultList
              headline
              items={[
                { label: 'NFL passer rating', value: formatFixed(nfl.rating, 1), note: 'out of 158.3' },
                {
                  label: 'Completion component',
                  value: formatFixed(nfl.components.completion, 3),
                  note: `${formatPercent(nfl.completionPct / 100, 1)} completed`,
                },
                {
                  label: 'Yards component',
                  value: formatFixed(nfl.components.yards, 3),
                  note: `${formatFixed(nfl.yardsPerAttempt, 2)} yards per attempt`,
                },
                {
                  label: 'Touchdown component',
                  value: formatFixed(nfl.components.touchdowns, 3),
                  note: `${formatPercent(nfl.touchdownPct / 100, 2)} of attempts`,
                },
                {
                  label: 'Interception component',
                  value: formatFixed(nfl.components.interceptions, 3),
                  note: `${formatPercent(nfl.interceptionPct / 100, 2)} of attempts`,
                },
                { label: 'NCAA passing efficiency', value: formatFixed(ncaa.rating, 2), note: 'college formula' },
              ]}
            />
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              Each NFL component runs from 0 to {PASSER_RATING_COMPONENT_CAP}; the rating is their sum, divided by six
              and multiplied by 100. The NCAA figure follows its manual’s procedure, carrying each percentage to two
              decimal places.
            </p>
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
