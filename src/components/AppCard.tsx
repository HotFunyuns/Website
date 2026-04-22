'use client';

import { motion } from 'framer-motion';
import type { AppInfo } from '@/data/apps';

interface AppCardProps {
  app: AppInfo;
  index: number;
}

export default function AppCard({ app, index }: AppCardProps) {
  const statusColors: Record<string, string> = {
    Published: 'border-green-400/30 bg-green-400/10 text-green-300',
    'In Development': 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    'Coming Soon': 'border-blue-400/30 bg-blue-400/10 text-blue-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group glass-card-hover flex flex-col p-6"
    >
      {/* App icon */}
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${app.gradient} text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          {app.icon}
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColors[app.status]}`}
        >
          {app.status}
        </span>
      </div>

      {/* Content */}
      <h3 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-brand-300">
        {app.name}
      </h3>
      <span className="mb-3 text-xs font-medium uppercase tracking-wider text-surface-200/40">
        {app.category}
      </span>
      <p className="flex-1 text-sm leading-relaxed text-surface-200/60">
        {app.description}
      </p>

      {/* Play Store link area */}
      <div className="mt-5 border-t border-white/5 pt-4">
        {app.playStoreUrl ? (
          <a
            href={app.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
          >
            View on Google Play
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm text-surface-200/30">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Store link coming soon
          </span>
        )}
      </div>
    </motion.div>
  );
}
