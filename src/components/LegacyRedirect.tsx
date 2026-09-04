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
 */
export default function LegacyRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return null;
}
