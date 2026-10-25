import Link from 'next/link';
import { companyInfo } from '@/data/apps';
import { NONBINDING_NOTICE } from '@/data/partnerships';
import type { DisclaimerKind } from '@/lib/blog/types';

/**
 * Wording is deliberately conservative: we build tracking tools, not medical or
 * language instruction, and none of this content is professionally reviewed.
 * Claiming otherwise would be a false credential.
 */
const COPY: Record<Exclude<DisclaimerKind, 'none'>, { title: string; body: React.ReactNode }> = {
  health: {
    title: 'Not medical advice',
    body: (
      <>
        This article is general information about nutrition tracking, not medical, dietary or
        clinical advice, and it is not written or reviewed by a doctor or registered dietitian. Talk
        to a qualified healthcare professional before changing how you eat, especially if you are
        pregnant, managing a medical condition or taking medication. Sources are listed at the end of
        the article.
      </>
    ),
  },
  language: {
    title: 'About this language guide',
    body: (
      <>
        This article describes how our beginner course is structured and what learners can expect. It
        is not a substitute for instruction from a fluent speaker or a qualified teacher, and it has
        not been reviewed by a native speaker. Where we describe a writing system or pronunciation,
        the sources we used are listed at the end of the article.
      </>
    ),
  },
  comparison: {
    title: 'How we compare apps',
    body: (
      <>
        We publish this app, so treat our view as interested rather than neutral. Details about other
        apps come from their public store listings and official documentation on the research date
        shown, and they change without notice — check the current listing before deciding. All
        product names and trademarks belong to their respective owners, and no affiliation or
        endorsement is implied. Our full{' '}
        <Link href="/editorial-policy/" className="link-accent">
          editorial policy
        </Link>{' '}
        explains the process.
      </>
    ),
  },
  wellness: {
    title: 'Not medical advice',
    body: (
      <>
        This article is general information about relaxation and breathing practice, not medical or
        mental-health advice, and it is not written or reviewed by a doctor or therapist. Breathing
        exercises are not a treatment for anxiety, sleep problems or any medical condition. Stop and
        breathe normally if an exercise makes you dizzy or uncomfortable, and talk to a qualified
        healthcare professional before starting breath-holding exercises if you are pregnant or have a
        heart, lung or other medical condition, or if symptoms persist. Sources are listed at the end
        of the article.
      </>
    ),
  },
  finance: {
    title: 'Education, not advice',
    body: (
      <>
        This article explains how markets and trading work in general. It is not investment, tax or
        legal advice, it does not recommend any security or strategy, and nothing in it predicts prices
        or returns. Investing involves risk, including the loss of the money you invest. Rules and
        figures here are US-focused and dated where they appear, and they change: check current rules
        with official sources such as Investor.gov and FINRA, and talk to a licensed professional about
        decisions involving your own money. Our trading app is a simulator that uses virtual money only.
      </>
    ),
  },
  partnership: {
    title: 'About this page',
    body: (
      <>
        {NONBINDING_NOTICE} It describes an app {companyInfo.name} owns and publishes; nothing here is
        a statement about revenue, downloads or users. See{' '}
        <Link href="/partnerships/" className="link-accent">
          partnerships at Reign Creative
        </Link>{' '}
        for how discussions work.
      </>
    ),
  },
};

export default function ArticleDisclaimer({
  kind,
  researchDate,
}: {
  kind: DisclaimerKind;
  researchDate?: string;
}) {
  if (kind === 'none') return null;
  const copy = COPY[kind];

  return (
    <aside
      aria-label={copy.title}
      className="my-8 rounded-2xl border border-gold-300 bg-gold-50 p-6 sm:p-7"
    >
      <h2 className="font-display text-base font-semibold text-ink-950">{copy.title}</h2>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{copy.body}</p>
      {kind === 'comparison' && researchDate && (
        <p className="mt-3 text-sm text-ink-500">
          Competitor details researched on{' '}
          <time dateTime={researchDate}>
            {new Date(`${researchDate}T00:00:00Z`).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
          .
        </p>
      )}
    </aside>
  );
}
