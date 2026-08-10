/** Dates are authored as plain ISO days, so they must be read back in UTC or a
 *  westward timezone shifts every article back by one day. */
export function formatPostDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
