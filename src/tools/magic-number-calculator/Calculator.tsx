'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField } from '@/components/tools/fields';
import { formatRate, isBlank, parseNumber } from '@/lib/tools/format.mjs';
import { formatGamesBehind, race, validateRace } from '@/lib/tools/standings.mjs';

// The illustrative race in the worked example below — not real teams.
const DEFAULTS = {
  seasonGames: '162',
  leaderWins: '92',
  leaderLosses: '60',
  leaderTies: '',
  trailerWins: '88',
  trailerLosses: '64',
  trailerTies: '',
  tiebreaker: 'no',
};

const legendClass = 'font-display text-base font-semibold text-ink-950';

export default function MagicNumberCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const ties = (text: string) => (isBlank(text) ? 0 : parseNumber(text));
  const input = {
    seasonGames: parseNumber(raw.seasonGames),
    leader: { wins: parseNumber(raw.leaderWins), losses: parseNumber(raw.leaderLosses), ties: ties(raw.leaderTies) },
    trailer: { wins: parseNumber(raw.trailerWins), losses: parseNumber(raw.trailerLosses), ties: ties(raw.trailerTies) },
    leaderHoldsTiebreaker: raw.tiebreaker === 'yes',
  };
  const errors = validateRace(input);
  const r = errors.length === 0 ? race(input) : null;

  let headline = { label: 'Magic number', value: '—', note: '' };
  if (r) {
    if (r.magic === null) headline = { label: 'Magic number', value: 'n/a', note: 'records with ties are not covered' };
    else if (r.status === 'clinched') headline = { label: 'Magic number', value: '0', note: 'clinched' };
    else if (r.status === 'cannot-clinch')
      headline = { label: 'Magic number', value: String(r.magic), note: 'more than the games left — cannot clinch' };
    else headline = { label: 'Magic number', value: String(r.magic), note: 'leader wins + trailing team losses' };
  }

  const statement = !r
    ? ''
    : r.magic === null
      ? 'With tied games on either record, clinching depends on half-games, which this formula does not handle.'
      : r.status === 'clinched'
        ? input.leaderHoldsTiebreaker
          ? 'Clinched: the trailing team can at best draw level, and the leader holds the tiebreaker.'
          : 'Clinched: the trailing team can no longer finish ahead or level.'
        : r.status === 'cannot-clinch'
          ? 'The first-place team cannot clinch on its own results: the other team already has at least as many wins as it can reach.'
          : `Any combination of ${r.magic} first-place wins and trailing-team losses clinches${
              input.leaderHoldsTiebreaker ? ', counting the tiebreaker' : ''
            }.`;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate a magic number"
      intro="Both teams’ records so far, in a season where they play the same number of games."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="mn-season"
            label="Games in the season"
            value={raw.seasonGames}
            onChange={set('seasonGames')}
            hint="162 in Major League Baseball."
          />
          <SelectField
            id="mn-tiebreaker"
            label="Does the first-place team hold the tiebreaker?"
            value={raw.tiebreaker}
            onChange={set('tiebreaker')}
            options={[
              { value: 'no', label: 'No, or not known' },
              { value: 'yes', label: 'Yes — a tie in the standings goes its way' },
            ]}
          />
        </div>
        <fieldset className="mt-6">
          <legend className={legendClass}>First-place team</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NumberField id="mn-lw" label="Wins" value={raw.leaderWins} onChange={set('leaderWins')} />
            <NumberField id="mn-ll" label="Losses" value={raw.leaderLosses} onChange={set('leaderLosses')} />
            <NumberField id="mn-lt" label="Ties (optional)" value={raw.leaderTies} onChange={set('leaderTies')} />
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className={legendClass}>Trailing team</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NumberField id="mn-tw" label="Wins" value={raw.trailerWins} onChange={set('trailerWins')} />
            <NumberField id="mn-tl" label="Losses" value={raw.trailerLosses} onChange={set('trailerLosses')} />
            <NumberField id="mn-tt" label="Ties (optional)" value={raw.trailerTies} onChange={set('trailerTies')} />
          </div>
        </fieldset>
      </form>

      <ResultRegion errors={errors}>
        {r && (
          <>
            <ResultList
              headline
              items={[
                headline,
                { label: 'Elimination number, trailing team', value: r.magic === null ? 'n/a' : String(r.magic) },
                { label: 'Games behind', value: formatGamesBehind(r.gamesBehind) },
                {
                  label: 'Winning percentage',
                  value: `${r.winPctLeader === null ? '—' : formatRate(r.winPctLeader)} · ${
                    r.winPctTrailer === null ? '—' : formatRate(r.winPctTrailer)
                  }`,
                  note: 'first · trailing',
                },
                { label: 'Games left', value: `${r.remainingLeader} · ${r.remainingTrailer}`, note: 'first · trailing' },
                { label: 'Most wins possible', value: `${r.maxWinsLeader} · ${r.maxWinsTrailer}`, note: 'first · trailing' },
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-ink-700">{statement}</p>
            {r.hasTies && (
              <p className="mt-2 text-xs leading-relaxed text-ink-500">
                Winning percentages count each tie as half a win and half a loss, as the NFL does. Games behind uses wins
                and losses only.
              </p>
            )}
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
