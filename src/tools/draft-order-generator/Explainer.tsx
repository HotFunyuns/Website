import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { isForwardRound, picksForSlot, snakeWaits } from '@/lib/tools/draft.mjs';

// The generator's default league, followed through its first rounds. The 3RR
// figures match the example in Fantasy Postseason's draft help, and
// scripts/tests/tools.test.mjs pins every number below.
const TEAMS = 12;
const SLOT = 5;

export default function DraftOrderExplainer() {
  const snake = picksForSlot({ type: 'snake', teams: TEAMS, slot: SLOT, rounds: 4 });
  const rr = [1, TEAMS].map((slot) => ({
    slot,
    picks: picksForSlot({ type: 'third-round-reversal', teams: TEAMS, slot, rounds: 3 }).map((p) => p.overall),
  }));
  const directions = [1, 2, 3, 4, 5].map((round) => ({
    round,
    snake: isForwardRound('snake', round),
    rr: isForwardRound('third-round-reversal', round),
  }));
  const arrow = (forward: boolean) => (forward ? `1 → ${TEAMS}` : `${TEAMS} → 1`);

  return (
    <>
      <ExplainerSection id="orders" title="The three draft orders">
        <p>
          In a <strong className="text-ink-900">straight</strong> draft, every round runs in the same order. In a{' '}
          <strong className="text-ink-900">snake</strong> draft, the order reverses every round. In a{' '}
          <strong className="text-ink-900">third-round reversal</strong> (3RR) draft, round three repeats round two’s
          order instead of reversing, and the snake resumes from round four:
        </p>
        <DataTable
          caption={`Direction of each round in a ${TEAMS}-team draft`}
          columns={['Round', 'Snake', 'Third-round reversal']}
          rows={directions.map((d) => [d.round, arrow(d.snake), arrow(d.rr)])}
        />
        <Formula label="Overall pick, for slot S in a league of N teams">
          forward round: (round − 1) × N + S · reversed round: (round − 1) × N + (N − S + 1)
        </Formula>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked examples">
        <p>
          A {TEAMS}-team snake draft from slot {SLOT}: the picks, and how many other picks pass before each one.
        </p>
        <DataTable
          caption={`Slot ${SLOT} of ${TEAMS}, snake, rounds 1 to 4`}
          columns={['Round', 'Pick in round', 'Overall pick', 'Picks since your last']}
          rows={snake.map((pick) => [pick.round, pick.pickInRound, pick.overall, pick.round === 1 ? '—' : pick.waitBefore])}
        />
        <p>
          From slot {SLOT}, the waits alternate between {snakeWaits(TEAMS, SLOT).afterOddRound} and{' '}
          {snakeWaits(TEAMS, SLOT).afterEvenRound} picks. In a third-round reversal draft the ends of the order change
          places at the second turn:
        </p>
        <DataTable
          caption={`First three picks in a ${TEAMS}-team third-round reversal draft`}
          columns={['Slot', 'Round 1', 'Round 2', 'Round 3']}
          rows={rr.map((r) => [r.slot, ...r.picks])}
        />
        <p>
          The first slot picks at 1, 24 and 36, while the last slot picks at {TEAMS}, {TEAMS + 1} and {2 * TEAMS + 1} —
          the format gives the end of the order an earlier third-round pick in exchange for the first overall pick.
        </p>
      </ExplainerSection>

      <ExplainerSection id="fairness" title="How the random draw works">
        <p>
          The generator shuffles the team list with the Fisher–Yates algorithm: working from the last position to the
          first, it swaps each team with a team chosen uniformly at random from the positions not yet fixed. Done with
          unbiased random numbers, every possible order is equally likely.
        </p>
        <BulletList
          items={[
            'Without a seed, the random numbers come from your browser’s cryptographic generator, and values that would favour some teams through rounding are discarded and redrawn.',
            'With a seed, the draw is repeatable: the same seed and the same team list always give the same order, so a league can check it afterwards. As NIST’s note on the shuffle points out, a small pseudo-random generator cannot reach every possible order of a large list, so use the unseeded draw when that matters more than repeatability.',
            'Nothing is sent anywhere: the draw happens on your device when you press the button.',
          ]}
        />
      </ExplainerSection>

      <ExplainerSection id="limits" title="What this generator does not do">
        <BulletList
          items={[
            'Weighted lotteries, where worse teams get better odds. Those are explained in the guide to draft lotteries.',
            'Keeper picks, traded picks and auction drafts, which change who picks when in ways a fixed order cannot show.',
            'Choosing players. It tells you when you pick, not whom to pick.',
          ]}
        />
        <p>
          For the strategy side, read{' '}
          <Link href="/blog/snake-draft-vs-auction-draft/" className="link-accent">
            snake draft vs auction draft
          </Link>{' '}
          and{' '}
          <Link href="/blog/what-makes-a-good-draft-board/" className="link-accent">
            what makes a good draft board
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
