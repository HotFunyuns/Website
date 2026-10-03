import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed, formatRate } from '@/lib/tools/format.mjs';
import { PYTHAGOREAN_PRESETS, pythagoreanExpectation } from '@/lib/tools/pythagorean.mjs';

// Illustrative seasons — not real teams — plus the hockey example from Ryder
// (2004). scripts/tests/tools.test.mjs pins the prose claims below.
const BASEBALL = { pointsFor: 800, pointsAgainst: 700, games: 162 };
const BASKETBALL = { pointsFor: 112 * 82, pointsAgainst: 108 * 82, games: 82 };
const HOCKEY = { pointsFor: 4, pointsAgainst: 3, games: 1 };

const SOURCES: Record<string, string> = {
  'baseball-james': 'MLB.com glossary — Bill James’s original formula',
  'baseball-reference': 'MLB.com glossary — the exponent Baseball-Reference uses',
  'basketball-reference': 'Basketball-Reference glossary — its Pythagorean wins formula',
  'hockey-ryder': 'Ryder (2004), Hockey Analytics — James’s formula interpreted for hockey',
};

const SEASONS: Record<string, { pointsFor: number; pointsAgainst: number; games: number }> = {
  baseball: BASEBALL,
  basketball: BASKETBALL,
  hockey: HOCKEY,
};

export default function PythagoreanExplainer() {
  const rows = PYTHAGOREAN_PRESETS.map((preset) => {
    const season = SEASONS[preset.sport];
    return { preset, season, r: pythagoreanExpectation({ ...season, exponent: preset.exponent }) };
  });
  return (
    <>
      <ExplainerSection id="formula" title="The formula">
        <Formula label="Expected winning percentage">
          win% = scored<sup>x</sup> ÷ (scored<sup>x</sup> + allowed<sup>x</sup>)
        </Formula>
        <Formula label="Expected record">expected wins = win% × games played</Formula>
        <p>
          The exponent <em>x</em> sets how strongly the scoring margin translates into wins. Bill James’s original used 2.
          Later work fitted exponents to each sport’s results; the presets in the calculator are the ones a cited source
          publishes:
        </p>
        <DataTable
          caption="Exponents the calculator offers"
          columns={['Preset', 'Exponent', 'Source']}
          rows={PYTHAGOREAN_PRESETS.map((preset) => [preset.label, preset.exponent, SOURCES[preset.id]])}
        />
        <p>
          There is no American football preset: we could not open a published source for the exponent usually quoted for
          it, so if your reference gives one, enter it as a custom exponent.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked examples">
        <p>
          Two illustrative seasons — not real teams: a baseball club that scored 800 runs and allowed 700 over 162 games,
          and a basketball team that averaged 112 points and allowed 108 over 82 games (9,184 and 8,856 in total). The
          hockey row is Alan Ryder’s own example: four goals for and three against.
        </p>
        <DataTable
          caption="Expected records from the same formula with different exponents"
          columns={['Preset', 'Scored – allowed', 'Expected win%', 'Expected wins']}
          rows={rows.map(({ preset, season, r }) => [
            preset.label,
            `${season.pointsFor.toLocaleString('en-US')} – ${season.pointsAgainst.toLocaleString('en-US')}`,
            formatRate(r.winPct),
            season.games === 1 ? '—' : `${formatFixed(r.expectedWins, 1)} of ${season.games}`,
          ])}
        />
        <p>
          The basketball team outscores its opponents by less than 4% yet projects to win well over half its games: with
          an exponent of 14, small margins carry a lot of weight. In baseball, the 100-run margin is worth about ten wins
          above an even 81–81 record with either exponent.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="How to read it, and its limits">
        <BulletList
          items={[
            'It describes what a season’s results imply about a team’s strength. It does not forecast any game and is not betting guidance.',
            'A record well above the expectation is usually read as overperformance that is unlikely to last; MLB’s glossary uses the 2018 Seattle Mariners to make the point.',
            'Draws, overtime and shootouts complicate the formula in sports that have them.',
            'Early in a season the margin rests on few games, so the expectation is noisy too.',
          ]}
        />
        <p>
          For how simulators turn ratings into results — and why a good team still loses — read{' '}
          <Link href="/blog/understanding-sports-sim-probability/" className="link-accent">
            understanding probability in sports simulations
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
