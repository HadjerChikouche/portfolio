'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import ArrowLink from '@/components/ui/ArrowLink';

export default function AboutTeaser() {
  const t = useTranslations('about');
  const locale = useLocale();

  const stats = [
    { n: '4+', label: t('stats.experience') },
    { n: '5+', label: t('stats.projects') },
    { n: '3', label: t('stats.industries') },
  ];

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-muted uppercase tracking-widest font-sans mb-6">
            {t('title')}
          </p>
          <p className="font-display font-600 text-2xl md:text-3xl leading-snug tracking-tight">
            {t('teaser')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-border">
            {stats.map(({ n, label }) => (
              <div key={n}>
                <p className="font-display font-800 text-3xl">{n}</p>
                <p className="text-xs text-muted font-sans mt-1">{label}</p>
              </div>
            ))}
          </div>

          <ArrowLink href={`/${locale}/about`} className="self-start text-sm">
            {t('cta')}
          </ArrowLink>
        </motion.div>
      </div>
    </section>
  );
}
