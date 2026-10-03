import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed } from '@/lib/tools/format.mjs';
import { formatInnings, parseInnings, pitchingStats } from '@/lib/tools/baseball.mjs';

// The Official Baseball Rules' own ERA example, then an illustrative season
// (not a real pitcher). The FIP constant of 3.10 is the figure FanGraphs gives
// as typical — an assumption for the illustration, not the constant of any
// particular season.
const RULEBOOK = { outs: parseInnings('9.1'), earnedRuns: 3, hits: 0, walks: 0, strikeouts: 0 };
const SEASON = {
  outs: parseInnings('180.2'),
  earnedRuns: 62,
  hits: 160,
  walks: 50,
  strikeouts: 190,
  homeRuns: 20,
  hitByPitch: 6,
  fipConstant: 3.1,
};
const SHORT_GAME = { outs: parseInnings('21'), earnedRuns: 7, hits: 0, walks: 0, strikeouts: 0, gameInnings: 7 };

export default function EraExplainer() {
  const rulebook = pitchingStats(RULEBOOK);
  const season = pitchingStats(SEASON);
  const short = pitchingStats(SHORT_GAME);
  const ip = formatFixed(season.innings, 3);
  return (
    <>
      <ExplainerSection id="innings" title="Innings first">
        <p>
          Every one of these statistics divides by innings pitched, and box scores do not write innings as decimals. Each
          out is a third of an inning, so the digit after the point counts outs and can only be 0, 1 or 2:
        </p>
        <DataTable
          caption="Box-score innings and what they mean"
          columns={['Written', 'Outs', 'Innings as a decimal']}
          rows={['6.0', '6.1', '6.2'].map((written) => {
            const outs = parseInnings(written);
            return [written, outs, formatFixed(outs / 3, 3)];
          })}
        />
        <p>
          Dividing by 6.1 instead of 6.333 is the most common way a hand-calculated ERA comes out wrong. The calculator
          converts first and rejects 6.3, which cannot occur.
        </p>
      </ExplainerSection>

      <ExplainerSection id="formulas" title="The formulas">
        <Formula label="Earned-run average (Rule 9.21(e))">ERA = earned runs × 9 ÷ innings pitched</Formula>
        <Formula label="Walks plus hits per inning pitched">WHIP = (walks + hits) ÷ innings pitched</Formula>
        <Formula label="Per nine innings">K/9, BB/9, HR/9 = count × 9 ÷ innings pitched</Formula>
        <Formula label="Strikeout-to-walk ratio">K/BB = strikeouts ÷ walks</Formula>
        <Formula label="Fielding independent pitching">FIP = (13 × HR + 3 × (BB + HBP) − 2 × K) ÷ IP + constant</Formula>
        <Formula label="FIP constant (FanGraphs)">
          constant = league ERA − (13 × lgHR + 3 × (lgBB + lgHBP) − 2 × lgK) ÷ league IP
        </Formula>
        <p>
          ERA and WHIP describe what happened while the pitcher was on the mound, fielders included. The per-nine rates,
          K/BB and FIP lean on the outcomes a pitcher controls most directly. The constant only puts FIP on the same
          scale as the league’s ERA for a season: applied to the league’s own totals, it returns the league ERA.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked examples">
        <p>
          The rulebook’s own example: 3 earned runs in 9⅓ innings is an ERA of {formatFixed(rulebook.era, 2)} — 3 × 9 =
          27, divided by 9.333.
        </p>
        <p>
          A fuller, illustrative season — not a real pitcher — of {formatInnings(SEASON.outs)} innings,{' '}
          {SEASON.earnedRuns} earned runs, {SEASON.hits} hits, {SEASON.walks} walks, {SEASON.strikeouts} strikeouts,{' '}
          {SEASON.homeRuns} home runs and {SEASON.hitByPitch} hit batters, with a FIP constant of{' '}
          {formatFixed(SEASON.fipConstant, 2)} — the figure FanGraphs describes as typical, used here only for
          illustration:
        </p>
        <DataTable
          caption={`Rate statistics for the illustrative season (${formatInnings(SEASON.outs)} innings = ${SEASON.outs} outs)`}
          columns={['Statistic', 'Calculation', 'Result']}
          rows={[
            ['ERA', `${SEASON.earnedRuns} × 9 ÷ ${ip}`, formatFixed(season.era, 2)],
            ['WHIP', `(${SEASON.walks} + ${SEASON.hits}) ÷ ${ip}`, formatFixed(season.whip, 2)],
            ['K/9', `${SEASON.strikeouts} × 9 ÷ ${ip}`, formatFixed(season.k9, 1)],
            ['BB/9', `${SEASON.walks} × 9 ÷ ${ip}`, formatFixed(season.bb9, 1)],
            ['HR/9', `${SEASON.homeRuns} × 9 ÷ ${ip}`, formatFixed(season.hr9 ?? 0, 1)],
            ['K/BB', `${SEASON.strikeouts} ÷ ${SEASON.walks}`, formatFixed(season.strikeoutsPerWalk ?? 0, 2)],
            [
              'FIP',
              `(${13 * SEASON.homeRuns} + ${3 * (SEASON.walks + SEASON.hitByPitch)} − ${2 * SEASON.strikeouts}) ÷ ${ip} + ${formatFixed(SEASON.fipConstant, 2)}`,
              formatFixed(season.fip ?? 0, 2),
            ],
          ]}
        />
        <p>
          In a league with seven-inning games, the same arithmetic uses seven: {SHORT_GAME.earnedRuns} earned runs in{' '}
          {formatInnings(SHORT_GAME.outs)} innings is {formatFixed(short.era, 2)} per nine innings but{' '}
          {formatFixed(short.eraPerGame, 2)} per seven-inning game. Neither number is wrong; they are on different scales,
          so compare pitchers only on the same one.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What these numbers do not tell you">
        <BulletList
          items={[
            'ERA depends on the fielders behind the pitcher and on the official scorer’s rulings about which runs are earned.',
            'WHIP treats a walk and a home run as the same baserunner.',
            'FIP depends on a constant set for each season, so a FIP is only comparable with others built on the same constant.',
            'Relief innings are few, so a reliever’s rates can swing sharply on one bad outing.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/blog/what-is-era-in-baseball/" className="link-accent">
            ERA explainer
          </Link>{' '}
          and the{' '}
          <Link href="/blog/what-is-whip-in-baseball/" className="link-accent">
            WHIP explainer
          </Link>{' '}
          go into where each number misleads.
        </p>
      </ExplainerSection>
    </>
  );
}
