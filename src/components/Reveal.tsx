'use client';

import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Share of the element that must be on screen before it fades in. */
const THRESHOLD = 0.12;

/**
 * Fades its children in when they scroll into view. `.js .reveal` (globals.css) starts them at
 * opacity 0, so every Reveal must end up with `is-in` or its content stays invisible.
 *
 * An element taller than the visible area divided by THRESHOLD can never have 12 % of itself on
 * screen at once. Waiting for that left such elements at opacity 0 for good: on 2026-11-12 the
 * Baseball Pro Career League privacy policy (12,088 px) was blank on every screen, the general
 * privacy policy on phones and on 900 px-tall desktop windows, and the /app-support/ app list on
 * phones — all present in the HTML, none of it visible. Those elements now reveal as soon as any
 * part of them enters the viewport; everything that can reach 12 % keeps its original trigger.
 */
export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add('is-in');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const visibleHeight = entry.rootBounds?.height ?? window.innerHeight;
          const tooTallForThreshold = entry.boundingClientRect.height * THRESHOLD > visibleHeight;
          if (entry.intersectionRatio >= THRESHOLD || tooTallForThreshold) {
            show();
            observer.disconnect();
            return;
          }
        }
      },
      // 0 as well as THRESHOLD, so an element too tall to reach THRESHOLD still reports entering.
      { threshold: [0, THRESHOLD], rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
