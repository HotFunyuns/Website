'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion } from '@/components/tools/fields';
import { formatInteger, formatRate, isBlank, parseNumber } from '@/lib/tools/format.mjs';
import { battingStats, validateBattingLine } from '@/lib/tools/baseball.mjs';

// The illustrative season used in the worked example below — not a real player.
const DEFAULTS = {
  atBats: '600',
  hits: '180',
  doubles: '35',
  triples: '3',
  homeRuns: '30',
  walks: '70',
  hitByPitch: '5',
  sacrificeFlies: '5',
  strikeouts: '110',
};

export default function BattingStatsCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const line = {
    atBats: parseNumber(raw.atBats),
    hits: parseNumber(raw.hits),
    doubles: parseNumber(raw.doubles),
    triples: parseNumber(raw.triples),
    homeRuns: parseNumber(raw.homeRuns),
    walks: parseNumber(raw.walks),
    hitByPitch: parseNumber(raw.hitByPitch),
    sacrificeFlies: parseNumber(raw.sacrificeFlies),
    strikeouts: isBlank(raw.strikeouts) ? null : parseNumber(raw.strikeouts),
  };
  const errors = validateBattingLine(line);
  const s = errors.length === 0 ? battingStats(line) : null;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate batting stats"
      intro="Hits include doubles, triples and home runs. Enter 0 for anything that does not apply."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="bat-ab" label="At-bats (AB)" value={raw.atBats} onChange={set('atBats')} />
          <NumberField id="bat-h" label="Hits (H)" value={raw.hits} onChange={set('hits')} />
          <NumberField id="bat-2b" label="Doubles (2B)" value={raw.doubles} onChange={set('doubles')} />
          <NumberField id="bat-3b" label="Triples (3B)" value={raw.triples} onChange={set('triples')} />
          <NumberField id="bat-hr" label="Home runs (HR)" value={raw.homeRuns} onChange={set('homeRuns')} />
          <NumberField id="bat-bb" label="Walks (BB)" value={raw.walks} onChange={set('walks')} />
          <NumberField id="bat-hbp" label="Hit by pitch (HBP)" value={raw.hitByPitch} onChange={set('hitByPitch')} />
          <NumberField
            id="bat-sf"
            label="Sacrifice flies (SF)"
            value={raw.sacrificeFlies}
            onChange={set('sacrificeFlies')}
            hint="Sacrifice bunts are left out entirely."
          />
          <NumberField
            id="bat-k"
            label="Strikeouts (K)"
            value={raw.strikeouts}
            onChange={set('strikeouts')}
            hint="Only needed for BABIP. Leave empty to skip it."
          />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {s && (
          <>
            <ResultList
              headline
              items={[
                {
                  label: 'Slash line (AVG/OBP/SLG)',
                  value: `${formatRate(s.avg)}/${formatRate(s.obp)}/${formatRate(s.slg)}`,
                },
                { label: 'Batting average (AVG)', value: formatRate(s.avg) },
                { label: 'On-base percentage (OBP)', value: formatRate(s.obp) },
                { label: 'Slugging percentage (SLG)', value: formatRate(s.slg) },
                { label: 'On-base plus slugging (OPS)', value: formatRate(s.ops) },
                { label: 'Isolated power (ISO)', value: formatRate(s.iso) },
                {
                  label: 'BABIP',
                  value: s.babip === null ? '—' : formatRate(s.babip),
                  note: s.babip === null ? (line.strikeouts === null ? 'needs strikeouts' : 'no balls in play') : undefined,
                },
              ]}
            />
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              {formatInteger(s.totalBases)} total bases from {formatInteger(s.singles)} singles and the extra-base hits.
              On base {formatInteger(s.timesOnBase)} times in {formatInteger(s.onBaseDenominator)} opportunities
              counted by Rule 9.21(f).
            </p>
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
