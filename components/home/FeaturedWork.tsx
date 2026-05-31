'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { getFeaturedProjects } from '@/lib/projects';

export default function FeaturedWork() {
  const t = useTranslations('featured');
  const locale = useLocale();
  const featured = getFeaturedProjects();

  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <div className="flex items-end justify-between mb-16">
        <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t('title')}</h2>
        <Link
          href={`/${locale}/work`}
          className="text-sm text-muted hover:text-foreground transition-colors hidden md:block"
        >
          {t('viewAll')} →
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        {featured.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} locale={locale} t={t} />
        ))}
      </div>

      <div className="mt-12 md:hidden">
        <Link
          href={`/${locale}/work`}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          {t('viewAll')} →
        </Link>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  locale,
  t,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
  index: number;
  locale: string;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/${locale}/work/${project.slug}`} className="group block">
        <div className="flex flex-col md:flex-row gap-0 border border-border hover:border-foreground transition-colors duration-300 overflow-hidden">
          {/* Color block */}
          <div
            className="w-full md:w-64 h-48 md:h-auto shrink-0 transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ backgroundColor: project.coverColor }}
          />

          {/* Content */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs text-muted uppercase tracking-widest font-sans">
                  {project.year}
                </span>
                <div className="flex flex-wrap gap-2 justify-end">
                  {project.type.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border border-border px-2 py-0.5 font-sans text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="font-display font-700 text-3xl md:text-4xl tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-sans text-muted leading-relaxed max-w-xl">
                {project.description[locale as 'en' | 'fr']}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-8 text-sm font-sans text-foreground">
              <span className="group-hover:mr-2 transition-all duration-300">{t('viewCase')}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
