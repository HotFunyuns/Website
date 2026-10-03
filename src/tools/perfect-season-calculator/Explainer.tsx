import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed } from '@/lib/tools/format.mjs';
import { formatChance, formatOneIn, seasonOdds, winChanceForPerfect } from '@/lib/tools/perfect-season.mjs';

// Illustrative chances — not real teams. scripts/tests/tools-perfect-season-
// calculator.test.mjs pins the figures the prose quotes.
const LENGTHS = [20, 82, 162];
const WIN_CHANCES = [80, 90, 95];
const LEAGUE = { games: 38, winPercent: 70, drawPercent: 20 };

const describe = (p: number) => {
  const oneIn = formatOneIn(p);
  return oneIn ? `${formatChance(p)} · ${oneIn}` : formatChance(p);
};

export default function PerfectSeasonExplainer() {
  const league = seasonOdds(LEAGUE);
  return (
    <>
      <ExplainerSection id="formula" title="The formula">
        <Formula label="Perfect season, n games">P(n–0) = w<sup>n</sup></Formula>
        <Formula label="Unbeaten season (no losses)">P(unbeaten) = (w + d)<sup>n</sup></Formula>
        <Formula label="Exactly k losses">
          P(k) = C(n, k) · l<sup>k</sup> · (1 − l)<sup>n − k</sup>
        </Formula>
        <p>
          Here <em>w</em>, <em>d</em> and <em>l</em> are one game’s chances of a win, a draw and a loss, adding up to 1,
          and C(n, k) is the number of ways to choose which <em>k</em> of the <em>n</em> games are lost. The last line is
          the binomial distribution as NIST’s e-Handbook of Statistical Methods writes it, with a loss as one outcome and
          anything else as the other; “at most one loss” adds the cases for 0 and 1.
        </p>
        <p>
          NIST notes that the binomial distribution assumes the chance is fixed for all trials. Here that means the same
          chances in every game, and a result in one game that tells you nothing about the next.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked examples">
        <p>
          Illustrative chances, not real teams. The table shows the chance of winning every game for three season lengths
          and three per-game win chances, with no draws:
        </p>
        <DataTable
          caption="Chance of a perfect season"
          columns={['Win chance a game', ...LENGTHS.map((n) => `${n}–0`)]}
          rows={WIN_CHANCES.map((w) => [
            `${w}%`,
            ...LENGTHS.map((n) => describe(seasonOdds({ games: n, winPercent: w }).perfect)),
          ])}
        />
        <p>
          At 90% a game, 20–0 happens about once in {formatFixed(1 / seasonOdds({ games: 20, winPercent: 90 }).perfect, 1)}{' '}
          seasons, while 162–0 is {formatOneIn(seasonOdds({ games: 162, winPercent: 90 }).perfect)}. Moving from 90% to 95%
          a game turns 162–0 into {formatOneIn(seasonOdds({ games: 162, winPercent: 95 }).perfect)}: small per-game edges
          compound over a long season, and so do small weaknesses. For an even chance of going 162–0 a team would need to
          win about {formatFixed(winChanceForPerfect(162, 0.5) * 100, 1)}% of its games; for 20–0, about{' '}
          {formatFixed(winChanceForPerfect(20, 0.5) * 100, 1)}%.
        </p>
        <p>
          With draws, perfect and unbeaten come apart. In a {LEAGUE.games}-game season where a side wins{' '}
          {LEAGUE.winPercent}% of games and draws {LEAGUE.drawPercent}%, winning every game is{' '}
          {formatOneIn(league.perfect)}, but losing none is {describe(league.unbeaten)}: the draws carry most of the
          unbeaten chance.
        </p>
      </ExplainerSection>

      <ExplainerSection id="season-lengths" title="Where the season lengths come from">
        <BulletList
          items={[
            '162 games: Major League Baseball’s regular season, from the comment to Rule 9.22(a) of the Official Baseball Rules.',
            '82 games: the NBA’s regular season, from its 2026-27 schedule announcement.',
            '17 games: the NFL’s regular season, from the scheduling formula in its Record & Fact Book.',
            '20 games: the same 17 plus three playoff wins. The Fact Book’s postseason schedule gives the No. 1 seed in each conference the only bye, so a top seed plays three playoff games, the last of them the Super Bowl.',
            '38 games: arithmetic rather than one league’s rule — a 20-team league in which every side plays the other 19 home and away.',
          ]}
        />
        <p>Any other length — a 40-fight career, a cup run, a short season — works as a custom number of games.</p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="How to read it, and its limits">
        <BulletList
          items={[
            'Opponents differ. A real schedule mixes strong and weak opponents, home and away games, and rest and travel, so one chance for every game is a simplification.',
            'Games are not independent. Injuries, form and squad rotation link one game to the next, which the model ignores.',
            'A per-game win chance is itself an estimate. Small changes to it move the result a long way over a long season, as the table shows.',
            'The result is an illustration of how chances compound, not a forecast of any team’s season and not betting guidance.',
          ]}
        />
        <p>
          For why even a dominant simulated team loses, and how simulators turn ratings into results, read{' '}
          <Link href="/blog/understanding-sports-sim-probability/" className="link-accent">
            understanding probability in sports simulations
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
