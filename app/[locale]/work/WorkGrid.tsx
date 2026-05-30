'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ProjectCard from '@/components/work/ProjectCard';
import { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

const ALL_TYPES = ['All', 'Product Design', 'UX Research', 'Design System', 'Mobile', 'Service Design'];

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations('work.filter');
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter((p) => p.type.includes(active));

  const countFor = (type: string) =>
    type === 'All' ? projects.length : projects.filter((p) => p.type.includes(type)).length;

  const labelMap: Record<string, string> = {
    All: t('all'),
    'Product Design': t('product'),
    'UX Research': t('ux'),
    'Design System': t('system'),
    Mobile: t('mobile'),
    'Service Design': t('service'),
  };

  return (
    <div>
      {/* Filters — only show categories that actually have projects */}
      <div className="flex flex-wrap gap-2 mb-12">
        {ALL_TYPES.filter((type) => countFor(type) > 0).map((type) => (
          <button
            key={type}
            onClick={() => setActive(type)}
            className={cn(
              'text-xs font-sans px-3 py-1.5 border transition-all duration-200',
              active === type
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted hover:border-foreground hover:text-foreground'
            )}
          >
            {labelMap[type]}
            <span className={cn('ml-1.5', active === type ? 'opacity-60' : 'opacity-50')}>
              {countFor(type)}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
