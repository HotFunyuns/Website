'use client';

import { useRef, useState, type FormEvent } from 'react';
import { apps, companyInfo } from '@/data/apps';

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;
const SUBMIT_COOLDOWN_MS = 3000;

const topics = ['General Support', 'App Feedback', 'Technical Issue', 'Privacy Question'] as const;

function sanitizeText(input: string): string {
  return input
    .replace(/[<>&"'/\\]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

const fieldClasses =
  'w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 placeholder-ink-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300/60';

const labelClasses = 'mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-600';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [appName, setAppName] = useState('General / Website');
  const [topic, setTopic] = useState<(typeof topics)[number]>('General Support');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const lastSubmitTime = useRef(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const now = Date.now();
    if (now - lastSubmitTime.current < SUBMIT_COOLDOWN_MS) return;

    const cleanMessage = sanitizeText(message);
    if (!cleanMessage) {
      setError('Please write a short message so we can help.');
      return;
    }
    if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      setError(`Message must be under ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    setError('');
    lastSubmitTime.current = now;

    const cleanName = sanitizeText(name).slice(0, MAX_NAME_LENGTH);
    const subject = encodeURIComponent(`${topic} — ${appName}`);
    const body = encodeURIComponent(
      `Hi Reign Creative team,\n\n${cleanMessage}\n\n—\nName: ${cleanName || 'Not provided'}\nApp: ${appName}\nTopic: ${topic}\n(For technical issues, it helps to include your device model, Android version, and app version.)`
    );

    window.location.href = `mailto:${companyInfo.supportEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card-premium p-8 text-center sm:p-10">
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-300 bg-gold-50 text-2xl"
        >
          ✉
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink-950">
          Opening your email app
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
          Your email client should open with a pre-filled message. If it doesn&apos;t, email us
          directly at{' '}
          <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent">
            {companyInfo.supportEmail}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSubmitted(false)} className="btn-outline btn-sm mt-7">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-premium space-y-6 p-6 sm:p-9" noValidate>
      {/* Honeypot field — hidden from users, catches automated bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Your name <span className="normal-case text-ink-400">(optional)</span>
          </label>
          <input
            id="contact-name"
            type="text"
            maxLength={MAX_NAME_LENGTH}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="contact-topic" className={labelClasses}>
            Topic
          </label>
          <select
            id="contact-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as (typeof topics)[number])}
            className={fieldClasses}
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-app" className={labelClasses}>
          Which app is this about?
        </label>
        <select
          id="contact-app"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          className={fieldClasses}
        >
          <option>General / Website</option>
          {apps.map((app) => (
            <option key={app.slug} value={app.name}>
              {app.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          maxLength={MAX_MESSAGE_LENGTH}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError('');
          }}
          placeholder="Tell us what's happening — for technical issues, include your device model and Android version if you can."
          className={fieldClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'contact-message-error' : undefined}
          required
        />
        {error && (
          <p id="contact-message-error" role="alert" className="mt-2 text-sm font-medium text-crimson-600">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary">
          Compose Email
        </button>
        <p className="text-xs leading-relaxed text-ink-400">
          This opens your email app — nothing is sent from this site directly.
        </p>
      </div>
    </form>
  );
}
