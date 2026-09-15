'use client';

import { useEffect } from 'react';

/**
 * Redirects a retired URL to its replacement **without adding a history entry**.
 *
 * `location.replace()` is deliberate. A `<meta http-equiv="refresh">` or a
 * `location.href` assignment can leave the retired URL in the session history,
 * so pressing Back from the destination returns here and is immediately sent
 * forward again — a loop the visitor cannot escape with the Back button. That
 * is the behaviour Google's spam policies prohibit, and it is trivially
 * avoidable: replacing the current entry means Back goes wherever the visitor
 * actually came from.
 *
 * The page renders normal, readable content around this component, so a visitor
 * without JavaScript gets an explanation and a link rather than a blank screen.
 *
 * Why this and not something better — the alternatives, and why each is worse
 * on this host (the site is a static export on GitHub Pages):
 *
 * - **HTTP 301.** The right answer, and impossible here. GitHub Pages serves
 *   static files and the only redirect it issues is appending a trailing slash
 *   to a directory. It runs no middleware and ignores `vercel.json` and
 *   `public/_headers`. A real 301 needs a host that can redirect; that is an
 *   owner decision, recorded in docs/url-normalization-audit.md.
 * - **`<meta http-equiv="refresh" content="0;url=…">`.** Zero-delay meta
 *   refresh is what Google's spam policies single out, and it is also the
 *   variant that leaves the retired URL in session history — the Back-button
 *   trap described above.
 * - **`noindex` on the retired page.** Contradicts the `rel=canonical` that
 *   does the consolidating. Google's guidance is to use one or the other; a
 *   page that is both noindex and canonical to somewhere else is dropped
 *   without its signals being passed on, which strands the old URL's value.
 * - **Deleting the route.** The URL would start returning 404 and every
 *   external link to it would die.
 *
 * So the consolidation is carried by the `rel=canonical` in the page head —
 * that is the canonicalisation mechanism, and it is a mechanism Google
 * supports. This component is only the visitor-facing convenience on top of it,
 * sending a human to the page they meant to reach. The page's content, its
 * canonical and its `og:url` all say the same thing, which is what keeps this
 * honest rather than cloaking.
 */
export default function LegacyRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return null;
}
