'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const line: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: EASE },
  }),
};

export default function Hero() {
  const t = useTranslations('hero');
  const tf = useTranslations('featured');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 px-6 max-w-6xl mx-auto">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-display font-800 leading-none tracking-tight text-[clamp(3.5rem,10vw,9rem)] text-foreground mb-12"
      >
        <span className="block overflow-hidden">
          <motion.span variants={line} className="block">
            Hadjer
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span variants={line} className="block">
            Chikouche
          </motion.span>
        </span>
      </motion.h1>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <motion.p
            custom={0.5}
            variants={fade}
            initial="hidden"
            animate="show"
            className="text-muted font-sans text-sm uppercase tracking-widest mb-3"
          >
            {t('role')}
          </motion.p>
          <motion.p
            custom={0.65}
            variants={fade}
            initial="hidden"
            animate="show"
            className="font-sans text-xl md:text-2xl text-foreground max-w-md leading-relaxed"
          >
            {t('tagline')}
          </motion.p>
        </div>

        <motion.div custom={0.8} variants={fade} initial="hidden" animate="show">
          <Link
            href={`/${locale}/work`}
            className="group inline-flex items-center gap-3 border border-foreground px-6 py-3 font-sans text-sm tracking-wide hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {tf('title')}
            <ArrowRight
              aria-hidden="true"
              strokeWidth={2}
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-out-expo"
            />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        custom={1.1}
        variants={fade}
        initial="hidden"
        animate="show"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-muted opacity-50"
        />
      </motion.div>
    </section>
  );
}
