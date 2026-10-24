'use client';

import { useRef, useState, type FormEvent } from 'react';
import { companyInfo } from '@/data/apps';
import { INQUIRY_TYPES, inquiryLabel, inquirySubject } from '@/data/partnerships';
import { trackBusinessInquiryClick, type InquiryType } from '@/lib/analytics';

const MAX_SHORT = 120;
const MAX_MESSAGE = 3000;
const COOLDOWN_MS = 3000;

function clean(input: string): string {
  return input
    .replace(/[<>&"'/\\]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

const field =
  'w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 placeholder-ink-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300/60';
const label = 'mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-600';

/**
 * The partnership inquiry form. It composes an email in the visitor's own email
 * app — nothing is sent to or stored by this site — and reports one
 * `business_inquiry_click` with the app and inquiry type only, never what was
 * typed. It asks for the six things a first conversation needs and nothing
 * sensitive.
 */
export default function BusinessInquiryForm({ apps }: { apps: { slug: string; name: string }[] }) {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [appSlug, setAppSlug] = useState('portfolio');
  const [type, setType] = useState<InquiryType>('publishing');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [opened, setOpened] = useState(false);
  const last = useRef(0);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (honeypot) return;
    const now = Date.now();
    if (now - last.current < COOLDOWN_MS) return;
    const proposal = clean(message);
    if (!proposal) {
      setError('Please describe what you have in mind in a few sentences.');
      return;
    }
    setError('');
    last.current = now;

    const app = apps.find((a) => a.slug === appSlug);
    const appName = app ? app.name : null;
    const body = [
      `Hello ${companyInfo.name},`,
      '',
      proposal.slice(0, MAX_MESSAGE),
      '',
      '—',
      `Name: ${clean(name).slice(0, MAX_SHORT) || 'Not provided'}`,
      `Organization: ${clean(organization).slice(0, MAX_SHORT) || 'Not provided'}`,
      `Work email for replies: ${clean(email).slice(0, MAX_SHORT) || 'Not provided'}`,
      `About: ${appName ?? 'The Reign Creative portfolio'}`,
      `Inquiry type: ${inquiryLabel(type)}`,
    ].join('\n');

    // Only the app and the inquiry type are reported — never the text above.
    trackBusinessInquiryClick({ appSlug: app ? app.slug : 'portfolio', inquiryType: type, buttonLocation: 'partnerships_form' });
    window.location.href = `mailto:${companyInfo.supportEmail}?subject=${encodeURIComponent(
      inquirySubject(appName, type)
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  if (opened) {
    return (
      <div className="card-premium p-8 text-center sm:p-10" role="status">
        <h3 className="font-display text-2xl font-semibold text-ink-950">Opening your email app</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
          Your message is pre-filled and ready to send from your own email account. If nothing opened,
          write to{' '}
          <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent break-all">
            {companyInfo.supportEmail}
          </a>
          .
        </p>
        <button type="button" onClick={() => setOpened(false)} className="btn-outline btn-sm mt-7">
          Write another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-premium space-y-6 p-6 sm:p-9" noValidate aria-label="Partnership inquiry">
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="inquiry-website">Website</label>
        <input id="inquiry-website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-name" className={label}>
            Your name
          </label>
          <input id="inquiry-name" type="text" autoComplete="name" maxLength={MAX_SHORT} value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="inquiry-org" className={label}>
            Organization
          </label>
          <input id="inquiry-org" type="text" autoComplete="organization" maxLength={MAX_SHORT} value={organization} onChange={(e) => setOrganization(e.target.value)} className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="inquiry-email" className={label}>
          Work email for replies
        </label>
        <input id="inquiry-email" type="email" autoComplete="email" maxLength={MAX_SHORT} value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-app" className={label}>
            App or portfolio
          </label>
          <select id="inquiry-app" value={appSlug} onChange={(e) => setAppSlug(e.target.value)} className={field}>
            <option value="portfolio">The whole portfolio, or several apps</option>
            {apps.map((app) => (
              <option key={app.slug} value={app.slug}>
                {app.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="inquiry-type" className={label}>
            Inquiry type
          </label>
          <select id="inquiry-type" value={type} onChange={(e) => setType(e.target.value as InquiryType)} className={field}>
            {INQUIRY_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="inquiry-message" className={label}>
          What you have in mind
        </label>
        <textarea
          id="inquiry-message"
          rows={5}
          maxLength={MAX_MESSAGE}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError('');
          }}
          className={field}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'inquiry-message-error inquiry-note' : 'inquiry-note'}
          required
        />
        {error && (
          <p id="inquiry-message-error" role="alert" className="mt-2 text-sm font-medium text-crimson-600">
            {error}
          </p>
        )}
        <p id="inquiry-note" className="mt-2 text-xs leading-relaxed text-ink-500">
          Please do not include confidential, financial or personal information in a first message.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary">
          Compose email
        </button>
        <p className="text-xs leading-relaxed text-ink-400">
          This opens your email app. Nothing is sent from this site, and nothing you type is recorded.
        </p>
      </div>
    </form>
  );
}
