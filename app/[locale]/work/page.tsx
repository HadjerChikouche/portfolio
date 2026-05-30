import { getTranslations } from 'next-intl/server';
import { projects } from '@/lib/projects';
import WorkGrid from './WorkGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'work' });
  const title = `${t('title')} — Hadjer Chikouche`;
  const description = t('subtitle');
  return { title, description, openGraph: { title, description } };
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'work' });

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
      <div className="mb-16">
        <p className="text-xs text-muted uppercase tracking-widest font-sans mb-4">
          {String(projects.length).padStart(2, '0')} {t('count')}
        </p>
        <h1 className="font-display font-800 text-5xl md:text-7xl tracking-tight mb-4">
          {t('title')}
        </h1>
        <p className="text-muted font-sans text-lg max-w-lg">{t('subtitle')}</p>
      </div>

      <WorkGrid projects={projects} />
    </div>
  );
}
