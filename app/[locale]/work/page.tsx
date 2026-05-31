import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { projects } from '@/lib/projects';
import WorkGrid from './WorkGrid';
import Availability from '@/components/ui/Availability';

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
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
      {/* Header — editorial split: title/intro left, meta rail right */}
      <header className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-8 lg:items-end">
        <div className="lg:col-span-8">
          <p className="text-xs text-muted uppercase tracking-widest font-sans mb-5">
            {String(projects.length).padStart(2, '0')} {t('count')}
          </p>
          <h1 className="font-display font-800 text-5xl md:text-7xl tracking-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-muted font-sans text-lg max-w-xl">{t('subtitle')}</p>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end lg:text-right">
          <Availability label={tn('available')} className="text-sm font-sans text-foreground" />
        </div>
      </header>

      <WorkGrid projects={projects} />

      {/* Closing CTA — anchors the page and drives to contact */}
      <section className="mt-32 border-t border-border pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <h2 className="font-display font-800 text-4xl md:text-6xl tracking-tight max-w-2xl">
          {t('ctaTitle')}
        </h2>
        <Link
          href={`/${locale}/contact`}
          className="group inline-flex items-center gap-2 font-sans font-600 text-lg shrink-0 border-b-2 border-foreground pb-1 transition-colors duration-300 hover:text-accent hover:border-accent"
        >
          {tn('contact')}
          <ArrowUpRight
            className="w-5 h-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </Link>
      </section>
    </div>
  );
}
