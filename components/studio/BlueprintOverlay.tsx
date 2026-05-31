'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const COLUMNS = 12;

/**
 * A full-bleed "blueprint" overlay that exposes the layout system behind the
 * site: a 12-column grid drawn inside the *same* container the real content
 * uses (max-w-6xl / px-6), the container edge guides, an 8px baseline rhythm,
 * and the display type scale. Because everything is rem-based, the grid stays
 * aligned even when the studio's base-scale control changes the root font size.
 *
 * Purely decorative — pointer-events-none + aria-hidden so it never interferes
 * with the page underneath or with assistive tech.
 */
export default function BlueprintOverlay() {
  const t = useTranslations('studio');

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[58] pointer-events-none"
    >
      {/* 8px baseline rhythm */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, var(--color-accent) 0, var(--color-accent) 1px, transparent 1px, transparent 8px)',
        }}
      />

      {/* Column grid — matched to the real layout container */}
      <div className="relative h-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 h-full">
          {Array.from({ length: COLUMNS }).map((_, i) => (
            <div
              key={i}
              className="h-full opacity-[0.07]"
              style={{ background: 'var(--color-accent)' }}
            />
          ))}
        </div>

        {/* Container edge guides */}
        <span
          className="absolute inset-y-0 left-6 w-px opacity-30"
          style={{ background: 'var(--color-accent)' }}
        />
        <span
          className="absolute inset-y-0 right-6 w-px opacity-30"
          style={{ background: 'var(--color-accent)' }}
        />

        {/* Grid spec */}
        <div
          className="absolute top-20 left-6 font-mono text-[10px] uppercase tracking-widest"
          style={{ color: 'var(--color-accent)' }}
        >
          {COLUMNS} {t('columns')} · 24px {t('gutter')} · 72rem max
        </div>

        {/* Type scale legend */}
        <div
          className="absolute bottom-8 left-6 font-mono text-[10px] tracking-wide hidden sm:flex flex-col gap-0.5"
          style={{ color: 'var(--color-accent)' }}
        >
          <span className="uppercase tracking-widest opacity-70 mb-1">{t('typeScale')}</span>
          <span>10xl · 10rem</span>
          <span>9xl · 8rem</span>
          <span>8xl · 6rem</span>
          <span>7xl · 4.5rem</span>
        </div>
      </div>
    </motion.div>
  );
}
