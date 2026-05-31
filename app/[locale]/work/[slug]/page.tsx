import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectBySlug, projects } from '@/lib/projects';
import { getReadableTextColor } from '@/lib/utils';
import CaseStudyContent from './CaseStudyContent';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.title} — Hadjer Chikouche`;
  const description = project.description[locale as 'en' | 'fr'];
  return {
    title,
    description,
    openGraph: { title, description, type: 'article' },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: 'work' });

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const heroText = getReadableTextColor(project.coverColor);
  const isLightText = heroText === '#ffffff';

  return (
    <article className="pt-24">
      {/* Hero */}
      <div
        className="w-full h-[60vh] flex items-end relative overflow-hidden"
        style={{ backgroundColor: project.coverColor }}
      >
        {project.coverImage && (
          project.coverImage.endsWith('.svg') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.coverImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-center" />
          ) : (
            <Image src={project.coverImage} alt={project.title} fill className="object-cover object-center" priority sizes="100vw" />
          )
        )}
        {/* gradient so the text reads cleanly over the image */}
        {project.coverImage && (
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)' }}/>
        )}
        <div className="relative max-w-6xl mx-auto px-6 pb-12 w-full" style={{ color: project.coverImage ? '#ffffff' : heroText }}>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.type.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 font-sans"
                style={{ border: `1px solid ${isLightText ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'}` }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display font-800 text-5xl md:text-7xl tracking-tight">
            {project.title}
          </h1>
          <p className="font-sans text-lg mt-3" style={{ opacity: 0.7 }}>
            {project.subtitle[locale as 'en' | 'fr']}
          </p>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: t('role'), value: project.role[locale as 'en' | 'fr'] },
            { label: t('duration'), value: project.duration[locale as 'en' | 'fr'] },
            { label: t('platform'), value: project.platform },
            { label: t('tools'), value: project.tools.join(', ') },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-muted uppercase tracking-widest font-sans mb-1">{label}</p>
              <p className="text-sm font-sans">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MDX Content */}
      <CaseStudyContent slug={slug} locale={locale} description={project.description[locale as 'en' | 'fr']} />

      {/* Next project */}
      <div className="border-t border-border mt-24">
        <Link
          href={`/${locale}/work/${nextProject.slug}`}
          className="group block max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-foreground/[0.02] transition-colors"
        >
          <div>
            <p className="text-xs text-muted uppercase tracking-widest font-sans mb-2">
              {t('nextProject')}
            </p>
            <h3 className="font-display font-700 text-3xl md:text-4xl tracking-tight group-hover:text-accent transition-colors duration-300">
              {nextProject.title}
            </h3>
          </div>
          <span className="text-3xl group-hover:translate-x-2 transition-transform duration-300">→</span>
        </Link>
      </div>
    </article>
  );
}
