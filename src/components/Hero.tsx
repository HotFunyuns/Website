'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="hero-gradient noise-overlay relative flex min-h-screen items-center overflow-hidden">
      {/* Animated orbs */}
      <div className="glow-orb left-1/4 top-1/4 h-96 w-96 bg-brand-500/20 animate-pulse-glow" />
      <div
        className="glow-orb right-1/4 bottom-1/4 h-80 w-80 bg-cyan-500/15 animate-pulse-glow"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="glow-orb left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-violet-500/10 animate-pulse-glow"
        style={{ animationDelay: '3s' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-narrow relative z-10 mx-auto px-4 py-32 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            Mobile App Development Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          We Build Apps
          <br />
          <span className="gradient-text">People Love to Use</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg text-surface-200/70 sm:text-xl"
        >
          Reign Creative LLC designs and develops polished mobile applications
          and digital products — focused on quality, usability, and experiences
          that matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/apps/" className="btn-primary px-8 py-3.5 text-base">
            View Our Apps
          </Link>
          <Link href="/support/" className="btn-secondary px-8 py-3.5 text-base">
            Contact Support
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="mx-auto h-10 w-6 rounded-full border-2 border-white/20 p-1"
          >
            <div className="h-2 w-full rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
