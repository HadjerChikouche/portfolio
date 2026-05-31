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
  const ta = useTranslations('a11y');
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
      <div
        className="flex flex-wrap gap-2 mb-16 pb-8 border-b border-border"
        role="group"
        aria-label={ta('workFilters')}
      >
        {ALL_TYPES.filter((type) => countFor(type) > 0).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActive(type)}
            aria-pressed={active === type}
            className={cn(
              'group/filter inline-flex items-center gap-1.5 text-xs font-sans rounded-full px-4 py-2 border transition-all duration-200',
              active === type
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted hover:border-foreground hover:text-foreground'
            )}
          >
            {labelMap[type]}
            <span
              className={cn(
                'tabular-nums text-[0.65rem] rounded-full px-1.5 py-px',
                active === type ? 'bg-background/20' : 'bg-foreground/[0.04] group-hover/filter:bg-foreground/[0.08]'
              )}
            >
              {countFor(type)}
            </span>
          </button>
        ))}
      </div>

      {/* Grid — 2-up editorial layout gives each project real weight */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
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
