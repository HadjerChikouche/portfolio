'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/${locale}/work/${project.slug}`} className="group block">
        {/* Color block */}
        <div
          className="w-full aspect-[4/3] mb-5 overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ backgroundColor: project.coverColor }}
        />

        {/* Meta */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-700 text-xl tracking-tight group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs text-muted font-sans mt-1 shrink-0 ml-4">{project.year}</span>
        </div>

        <p className="text-sm text-muted font-sans mb-3 line-clamp-2">
          {project.subtitle[locale as 'en' | 'fr']}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.type.map((tag) => (
            <span key={tag} className="text-xs border border-border px-2 py-0.5 text-muted font-sans">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
