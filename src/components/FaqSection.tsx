import type { AppFaq } from '@/data/apps';
import Reveal from './Reveal';

interface FaqSectionProps {
  faqs: AppFaq[];
  title?: string;
}

export default function FaqSection({ faqs, title = 'Frequently asked questions' }: FaqSectionProps) {
  return (
    <section aria-labelledby="faq-heading">
      <Reveal>
        <p className="eyebrow">Good to know</p>
        <h2 id="faq-heading" className="display-title mt-4 text-3xl sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-9 space-y-3.5">
        {faqs.map((faq, i) => (
          <Reveal key={faq.question} delay={i * 60}>
            <details className="faq-item">
              <summary>{faq.question}</summary>
              <div className="-mt-1 px-6 pb-5 text-sm leading-relaxed text-ink-500">
                {faq.answer}
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
