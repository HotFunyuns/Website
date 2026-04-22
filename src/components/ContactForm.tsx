'use client';

import { useState, useCallback, useRef, type FormEvent } from 'react';
import { companyInfo } from '@/data/apps';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const SUBMIT_COOLDOWN_MS = 3000;

function sanitizeText(input: string): string {
  return input
    .replace(/[<>&"'/\\]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

function isValidEmail(email: string): boolean {
  if (email.length > MAX_EMAIL_LENGTH) return false;
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const lastSubmitTime = useRef(0);

  const validate = useCallback((): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    const name = sanitizeText(form.name);
    if (!name) newErrors.name = 'Name is required.';
    else if (name.length > MAX_NAME_LENGTH)
      newErrors.name = `Name must be under ${MAX_NAME_LENGTH} characters.`;

    const email = sanitizeText(form.email);
    if (!email) newErrors.email = 'Email is required.';
    else if (!isValidEmail(email)) newErrors.email = 'Please enter a valid email address.';

    const subject = sanitizeText(form.subject);
    if (!subject) newErrors.subject = 'Subject is required.';
    else if (subject.length > MAX_SUBJECT_LENGTH)
      newErrors.subject = `Subject must be under ${MAX_SUBJECT_LENGTH} characters.`;

    const message = sanitizeText(form.message);
    if (!message) newErrors.message = 'Message is required.';
    else if (message.length > MAX_MESSAGE_LENGTH)
      newErrors.message = `Message must be under ${MAX_MESSAGE_LENGTH} characters.`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Honeypot: if filled, silently reject (bots fill hidden fields)
    if (honeypot) return;

    // Rate limit: prevent rapid re-submission
    const now = Date.now();
    if (now - lastSubmitTime.current < SUBMIT_COOLDOWN_MS) return;

    if (!validate()) return;

    lastSubmitTime.current = now;

    const sanitizedSubject = encodeURIComponent(sanitizeText(form.subject));
    const sanitizedBody = encodeURIComponent(
      `Name: ${sanitizeText(form.name)}\nEmail: ${sanitizeText(form.email)}\n\n${sanitizeText(form.message)}`
    );

    window.location.href = `mailto:${companyInfo.supportEmail}?subject=${sanitizedSubject}&body=${sanitizedBody}`;
    setSubmitted(true);
  };

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="mb-4 text-4xl">✉️</div>
        <h3 className="mb-2 text-xl font-semibold text-white">Opening Your Email Client</h3>
        <p className="text-surface-200/60">
          Your email app should open with a pre-filled message. If it doesn&apos;t, please email us
          directly at{' '}
          <a
            href={`mailto:${companyInfo.supportEmail}`}
            className="text-brand-400 underline transition-colors hover:text-brand-300"
            rel="noopener noreferrer"
          >
            {companyInfo.supportEmail}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-secondary mt-6"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const fieldClasses = (field: keyof ContactFormData) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-surface-200/30 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 ${
      errors[field]
        ? 'border-red-400/50 focus:border-red-400'
        : 'border-white/10 focus:border-brand-400/50'
    }`;

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-5 p-6 sm:p-8" noValidate>
      {/* Honeypot field — hidden from users, catches automated bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-surface-200/80">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            className={fieldClasses('name')}
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-surface-200/80">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            maxLength={MAX_EMAIL_LENGTH}
            className={fieldClasses('email')}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-surface-200/80">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          value={form.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          maxLength={MAX_SUBJECT_LENGTH}
          className={fieldClasses('subject')}
          placeholder="How can we help?"
        />
        {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-surface-200/80">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          className={`${fieldClasses('message')} resize-none`}
          placeholder="Tell us about your question, issue, or feedback..."
        />
        <div className="mt-1 flex justify-between">
          {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
          <p className="ml-auto text-xs text-surface-200/30">
            {form.message.length}/{MAX_MESSAGE_LENGTH}
          </p>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full py-3.5 text-base">
        Send Message
      </button>

      <p className="text-center text-xs text-surface-200/40">
        This opens your default email client with a pre-filled message. No data is stored on our servers.
      </p>
    </form>
  );
}
