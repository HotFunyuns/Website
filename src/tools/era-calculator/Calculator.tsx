'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField } from '@/components/tools/fields';
import { formatFixed, isBlank, parseNumber } from '@/lib/tools/format.mjs';
import {
  fipConstantFromLeague,
  formatInnings,
  parseInnings,
  pitchingStats,
  validateLeagueTotals,
  validatePitchingLine,
} from '@/lib/tools/baseball.mjs';

// The illustrative season used in the worked example below — not a real
// pitcher. The FIP constant starts empty: it changes every season, and the page
// will not pretend to know this one.
const DEFAULTS = {
  innings: '180.2',
  earnedRuns: '62',
  hits: '160',
  walks: '50',
  strikeouts: '190',
  homeRuns: '20',
  hitByPitch: '6',
  fipConstant: '',
  gameInnings: '9',
};
const LEAGUE_DEFAULTS = { leagueEra: '', homeRuns: '', walks: '', hitByPitch: '', strikeouts: '', innings: '' };

export default function EraCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const [league, setLeague] = useState(LEAGUE_DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));
  const setLeagueField = (key: keyof typeof LEAGUE_DEFAULTS) => (value: string) =>
    setLeague((prev) => ({ ...prev, [key]: value }));

  const wantsFip = !isBlank(raw.fipConstant);
  const line = {
    outs: parseInnings(raw.innings),
    earnedRuns: parseNumber(raw.earnedRuns),
    hits: parseNumber(raw.hits),
    walks: parseNumber(raw.walks),
    strikeouts: parseNumber(raw.strikeouts),
    homeRuns: isBlank(raw.homeRuns) ? null : parseNumber(raw.homeRuns),
    hitByPitch: wantsFip ? parseNumber(raw.hitByPitch) : null,
    fipConstant: wantsFip ? parseNumber(raw.fipConstant) : null,
    gameInnings: parseNumber(raw.gameInnings),
  };
  const errors = validatePitchingLine(line);
  const s = errors.length === 0 ? pitchingStats(line) : null;

  const leagueStarted = Object.values(league).some((value) => !isBlank(value));
  const leagueInput = {
    leagueEra: parseNumber(league.leagueEra),
    homeRuns: parseNumber(league.homeRuns),
    walks: parseNumber(league.walks),
    hitByPitch: parseNumber(league.hitByPitch),
    strikeouts: parseNumber(league.strikeouts),
    outs: parseInnings(league.innings),
  };
  const leagueErrors = leagueStarted ? validateLeagueTotals(leagueInput) : [];
  const derivedConstant = leagueStarted && leagueErrors.length === 0 ? fipConstantFromLeague(leagueInput) : null;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate ERA and pitching stats"
      intro="Enter innings as a box score prints them: 6.1 is six innings and one out."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="pit-ip"
            label="Innings pitched (IP)"
            value={raw.innings}
            onChange={set('innings')}
            inputMode="decimal"
            hint="Use .1 for one out and .2 for two outs."
          />
          <NumberField id="pit-er" label="Earned runs (ER)" value={raw.earnedRuns} onChange={set('earnedRuns')} />
          <NumberField id="pit-h" label="Hits allowed (H)" value={raw.hits} onChange={set('hits')} />
          <NumberField id="pit-bb" label="Walks (BB)" value={raw.walks} onChange={set('walks')} />
          <NumberField id="pit-k" label="Strikeouts (K)" value={raw.strikeouts} onChange={set('strikeouts')} />
          <NumberField
            id="pit-hr"
            label="Home runs allowed (HR)"
            value={raw.homeRuns}
            onChange={set('homeRuns')}
            hint="Needed for HR/9 and FIP."
          />
          <SelectField
            id="pit-game"
            label="Innings in a regulation game"
            value={raw.gameInnings}
            onChange={set('gameInnings')}
            options={[
              { value: '9', label: '9 (the rulebook definition)' },
              { value: '7', label: '7' },
              { value: '6', label: '6' },
            ]}
            hint="Shorter games also show ERA scaled to that length."
          />
        </div>

        <fieldset className="mt-6 rounded-2xl border border-ink-200 p-4 sm:p-5">
          <legend className="px-1 text-sm font-semibold text-ink-800">Optional: FIP</legend>
          <p className="text-xs leading-relaxed text-ink-500">
            Fielding independent pitching needs hit batters and the season’s FIP constant. Leave the constant empty to
            skip FIP, or work it out from league totals below.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NumberField id="pit-hbp" label="Hit batters (HBP)" value={raw.hitByPitch} onChange={set('hitByPitch')} />
            <NumberField
              id="pit-fipc"
              label="FIP constant"
              value={raw.fipConstant}
              onChange={set('fipConstant')}
              inputMode="decimal"
            />
          </div>

          <details className="mt-5 rounded-xl border border-ink-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-semibold text-ink-800">
              Work out the constant from league totals
            </summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <NumberField id="lg-era" label="League ERA" value={league.leagueEra} onChange={setLeagueField('leagueEra')} inputMode="decimal" />
              <NumberField id="lg-ip" label="League innings" value={league.innings} onChange={setLeagueField('innings')} inputMode="decimal" />
              <NumberField id="lg-hr" label="League home runs" value={league.homeRuns} onChange={setLeagueField('homeRuns')} />
              <NumberField id="lg-bb" label="League walks" value={league.walks} onChange={setLeagueField('walks')} />
              <NumberField id="lg-hbp" label="League hit batters" value={league.hitByPitch} onChange={setLeagueField('hitByPitch')} />
              <NumberField id="lg-k" label="League strikeouts" value={league.strikeouts} onChange={setLeagueField('strikeouts')} />
            </div>
            <div aria-live="polite" className="mt-4 min-h-[2.5rem] text-sm">
              {leagueErrors.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5 text-crimson-700">
                  {leagueErrors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              ) : derivedConstant !== null ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-ink-700">
                    Constant: <strong className="tabular-nums text-ink-950">{formatFixed(derivedConstant, 3)}</strong>
                  </span>
                  <button
                    type="button"
                    className="btn-outline btn-sm"
                    onClick={() => setRaw((prev) => ({ ...prev, fipConstant: formatFixed(derivedConstant, 3) }))}
                  >
                    Use this constant
                  </button>
                </div>
              ) : (
                <span className="text-ink-500">Enter all six league totals for one season.</span>
              )}
            </div>
          </details>
        </fieldset>
      </form>

      <ResultRegion errors={errors}>
        {s && (
          <>
            <ResultList
              headline
              items={[
                { label: 'Earned-run average (ERA)', value: formatFixed(s.era, 2), note: 'per nine innings' },
                ...(s.gameInnings !== 9
                  ? [{ label: `ERA per ${s.gameInnings}-inning game`, value: formatFixed(s.eraPerGame, 2) }]
                  : []),
                { label: 'WHIP', value: formatFixed(s.whip, 2) },
                { label: 'Strikeouts per nine (K/9)', value: formatFixed(s.k9, 1) },
                { label: 'Walks per nine (BB/9)', value: formatFixed(s.bb9, 1) },
                { label: 'Home runs per nine (HR/9)', value: s.hr9 === null ? '—' : formatFixed(s.hr9, 1) },
                {
                  label: 'Strikeout-to-walk (K/BB)',
                  value: s.strikeoutsPerWalk === null ? '—' : formatFixed(s.strikeoutsPerWalk, 2),
                  note: s.strikeoutsPerWalk === null ? 'no walks' : undefined,
                },
                ...(s.fip === null ? [] : [{ label: 'FIP', value: formatFixed(s.fip, 2) }]),
              ]}
            />
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              {formatInnings(line.outs)} innings is {line.outs} outs, or {formatFixed(s.innings, 3)} innings as a decimal.
              {s.fip === null ? ' Add a FIP constant above to calculate FIP.' : ''}
            </p>
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
