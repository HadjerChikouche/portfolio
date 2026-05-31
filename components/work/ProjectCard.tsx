'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('work');

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/${locale}/work/${project.slug}`} className="group block">
        {/* Index / year — editorial top rail */}
        <div className="flex items-center justify-between border-t border-border pt-3 mb-4">
          <span className="font-display font-700 text-xs text-muted tabular-nums tracking-widest transition-colors duration-300 group-hover:text-foreground">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs text-muted font-sans tabular-nums">{project.year}</span>
        </div>

        {/* Thumbnail */}
        <div
          className="w-full aspect-[16/10] mb-6 overflow-hidden relative"
          style={{ backgroundColor: project.coverColor }}
        >
          {project.coverImage &&
            (project.coverImage.endsWith('.svg') ? (
              // Decorative — the project title sits right below as real text, so an
              // alt here would be announced twice. Empty alt keeps it out of the a11y tree.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
              />
            ) : (
              <Image
                src={project.coverImage}
                alt=""
                fill
                className="object-cover object-center transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ))}

          {/* Hover affordance — view case study */}
          <div className="absolute inset-0 flex items-end p-5 opacity-0 translate-y-2 transition-all duration-500 ease-out-expo group-hover:opacity-100 group-hover:translate-y-0 bg-gradient-to-t from-black/40 to-transparent">
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-600 text-white">
              {t('viewCase')}
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </span>
          </div>
        </div>

        {/* Meta */}
        <h3 className="font-display font-700 text-2xl md:text-3xl tracking-tight mb-2 transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>

        <p className="text-base text-muted font-sans mb-4 max-w-md line-clamp-2">
          {project.subtitle[locale as 'en' | 'fr']}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.type.map((tag) => (
            <span
              key={tag}
              className="text-xs border border-border px-2.5 py-1 text-muted font-sans transition-colors duration-300 group-hover:border-foreground/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
