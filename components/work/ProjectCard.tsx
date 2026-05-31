'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/${locale}/work/${project.slug}`} className="group block">
        {/* Thumbnail */}
        <div
          className="w-full aspect-[4/3] mb-5 overflow-hidden transition-transform duration-700 group-hover:scale-[1.02] relative"
          style={{ backgroundColor: project.coverColor }}
        >
          {project.coverImage && (
            project.coverImage.endsWith('.svg') ? (
              // Decorative — the project title sits right below as real text, so an
              // alt here would be announced twice. Empty alt keeps it out of the a11y tree.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
            ) : (
              <Image src={project.coverImage} alt="" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            )
          )}
        </div>

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
