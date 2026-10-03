import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatRate } from '@/lib/tools/format.mjs';
import { formatGamesBehind, gamesBehind, race, winningPercentage } from '@/lib/tools/standings.mjs';

// An illustrative race — not real teams — plus Eisner's own column examples.
// scripts/tests/tools-magic-number-calculator.test.mjs pins every figure.
const SEASON = 162;
const LEADER = { wins: 92, losses: 60 };
const TRAILER = { wins: 88, losses: 64 };

// Eisner (1986): how far a team trails in the win and loss columns.
const EISNER = [
  { label: '6 in each column', wins: 6, losses: 6 },
  { label: '4 wins, 1 loss', wins: 4, losses: 1 },
  { label: '2 wins, 3 losses', wins: 2, losses: 3 },
  { label: '−1 wins, 2 losses', wins: -1, losses: 2 },
  { label: '−4 wins, 3 losses (his hypothetical)', wins: -4, losses: 3 },
];

const halves = formatGamesBehind;

export default function MagicNumberExplainer() {
  const r = race({ seasonGames: SEASON, leader: LEADER, trailer: TRAILER });
  const withTiebreaker = race({ seasonGames: SEASON, leader: LEADER, trailer: TRAILER, leaderHoldsTiebreaker: true });
  return (
    <>
      <ExplainerSection id="formula" title="The formulas">
        <Formula label="Magic number (MLB.com glossary)">
          games remaining + 1 − (second-place losses − first-place losses)
        </Formula>
        <Formula label="The same, for a season of G games">G + 1 − leader’s wins − trailing team’s losses</Formula>
        <Formula label="Games behind (Eisner)">((leader’s wins − team’s wins) + (team’s losses − leader’s losses)) ÷ 2</Formula>
        <Formula label="Winning percentage">wins ÷ (wins + losses) · with ties: (wins + ½ ties) ÷ games</Formula>
        <p>
          The magic number counts the leader’s wins and the rival’s losses together because either one closes the gap the
          rival would need to make up. MLB’s glossary measures against the closest competitor — the second-place team in
          the loss column for a division, or the nearest rival for a wild-card place. Seen from the trailing
          team’s side the same count is its elimination, or tragic, number.
        </p>
        <p>
          The winning-percentage line is Rule 9.21(a) of the Official Baseball Rules, with the NFL’s rule for ties: a tie
          counts as half a win and half a loss for both teams.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked example">
        <p>
          An illustrative race, not real teams: in a {SEASON}-game season, the leader is {LEADER.wins}–{LEADER.losses} and
          its closest rival {TRAILER.wins}–{TRAILER.losses}. The leader has {r.remainingLeader} games left.
        </p>
        <DataTable
          caption="The race in numbers"
          columns={['Measure', 'Working', 'Result']}
          rows={[
            ['Magic number', `${r.remainingLeader} + 1 − (${TRAILER.losses} − ${LEADER.losses})`, String(r.magic)],
            ['Same, from the season length', `${SEASON} + 1 − ${LEADER.wins} − ${TRAILER.losses}`, String(r.magic)],
            ['If the leader holds the tiebreaker', `${r.magic} − 1`, String(withTiebreaker.magic)],
            ['Games behind', `((${LEADER.wins} − ${TRAILER.wins}) + (${TRAILER.losses} − ${LEADER.losses})) ÷ 2`, halves(r.gamesBehind)],
            ['Leader’s winning percentage', `${LEADER.wins} ÷ ${LEADER.wins + LEADER.losses}`, formatRate(winningPercentage(LEADER) ?? 0)],
            ['Rival’s most wins possible', `${TRAILER.wins} + ${r.remainingTrailer}`, String(r.maxWinsTrailer)],
          ]}
        />
        <p>
          Any {r.magic} leader wins and rival losses between them clinch: seven leader wins would take it to{' '}
          {LEADER.wins + 7}, past the rival’s best possible {r.maxWinsTrailer}; so would three wins and four rival losses.
        </p>
      </ExplainerSection>

      <ExplainerSection id="tiebreaker" title="The tiebreaker caveat">
        <p>
          The “+ 1” in the formula is there so the leader finishes strictly ahead; with it, a tie in the final standings is
          not enough. Where a league breaks ties by a rule rather than an extra game — the NFL publishes such procedures,
          starting with head-to-head record — a leader that already holds the tiebreaker only needs to finish level, so its
          magic number is one smaller. That adjustment follows from the formula; MLB’s glossary does not state it, so check
          how your league breaks ties before relying on it.
        </p>
      </ExplainerSection>

      <ExplainerSection id="games-behind" title="Games behind, and when it misleads">
        <p>
          Milton Eisner’s 1986 article for SABR defines games behind as the average of how far a team trails the leader in
          the win column and in the loss column, and works through the 1985 All-Star-break standings:
        </p>
        <DataTable
          caption="Eisner’s examples: trailing in the win and loss columns"
          columns={['Trailing by', 'Games behind']}
          rows={EISNER.map((row) => [
            row.label,
            halves(gamesBehind({ wins: 80, losses: 70 }, { wins: 80 - row.wins, losses: 70 + row.losses })),
          ])}
        />
        <p>
          The last row is his warning: when teams have played different numbers of games, a team can trail on winning
          percentage and still be “ahead” by half a game. Players talk about the loss column for the same reason — a
          leader’s loss is a game the trailing team no longer has to win back.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="How to read it, and its limits">
        <BulletList
          items={[
            'It compares two teams. In a race with several, work out the leader’s number against each rival; the largest is the one that matters.',
            'It assumes both teams play the same number of games. Postponed games that are never made up break that assumption.',
            'Records with ties get winning percentages, but no magic number: a tie is half a win, which this formula does not handle.',
            'It counts what is still possible, not what is likely, so it is not a forecast — and not betting guidance.',
          ]}
        />
        <p>
          For what a record says about a team’s underlying strength, try the{' '}
          <Link href="/tools/multi-sport/pythagorean-expectation-calculator/" className="link-accent">
            Pythagorean expectation calculator
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
