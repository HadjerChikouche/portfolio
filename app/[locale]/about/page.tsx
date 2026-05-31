import { getTranslations } from 'next-intl/server';

const tools = [
  'Figma', 'FigJam', 'Framer', 'ProtoPie',
  'Maze', 'Hotjar', 'Optimal Workshop', 'Useberry',
  'Notion', 'Jira', 'HTML/CSS', 'Storybook',
];

const experience = [
  { year: 'Oct 2025 – Present', role: 'Product Owner', company: 'Spuerkeess' },
  { year: 'Dec 2024 – Sep 2025', role: 'IT Consultant', company: 'Abylsen' },
  { year: 'Oct 2023 – Jun 2024', role: 'UX Researcher & UX Designer', company: 'FlexFret' },
  { year: 'Mar 2023 – Jun 2023', role: 'Product Designer', company: 'Candide' },
  { year: 'Jan 2022 – Sep 2023', role: 'UX Researcher & UX Designer', company: 'Ocus' },
  { year: 'Sep 2019 – Sep 2020', role: 'DevOps Engineer', company: 'EDF' },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const title = `${t('title')} — Hadjer Chikouche`;
  const description = t('bio1');
  return { title, description, openGraph: { title, description } };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const principles = [
    { title: t('p1title'), body: t('p1body') },
    { title: t('p2title'), body: t('p2body') },
    { title: t('p3title'), body: t('p3body') },
  ];

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="mb-24 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs text-muted uppercase tracking-widest font-sans mb-4">{t('title')}</p>
          <h1 className="font-display font-800 text-5xl md:text-7xl tracking-tight leading-none mb-8">
            Hadjer
            <br />
            Chikouche
          </h1>
          <a
            href="/case-studies/cv.pdf"
            download
            className="inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-sm font-sans hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {t('downloadCV')} ↓
          </a>
        </div>

        <div className="space-y-6 pt-4">
          <p className="font-sans text-lg leading-relaxed">{t('bio1')}</p>
          <p className="font-sans text-muted leading-relaxed">{t('bio2')}</p>
        </div>
      </div>

      {/* Philosophy */}
      <div className="mb-24">
        <p className="text-xs text-muted uppercase tracking-widest font-sans mb-8">{t('philosophy')}</p>
        <div className="grid md:grid-cols-3 gap-0 border border-border">
          {principles.map(({ title, body }, i) => (
            <div key={i} className={`p-8 ${i < 2 ? 'md:border-r border-border border-b md:border-b-0' : ''}`}>
              <p className="text-xs text-muted font-sans mb-4">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-display font-700 text-xl mb-3">{title}</h3>
              <p className="text-sm text-muted font-sans leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="mb-24">
        <p className="text-xs text-muted uppercase tracking-widest font-sans mb-8">{t('tools')}</p>
        <div className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span key={tool} className="border border-border px-3 py-1.5 text-sm font-sans text-muted hover:border-foreground hover:text-foreground transition-colors cursor-default">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <p className="text-xs text-muted uppercase tracking-widest font-sans mb-8">{t('experience')}</p>
        <div className="space-y-0 border border-border">
          {experience.map(({ year, role, company }, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 gap-6 px-8 py-6 ${i < experience.length - 1 ? 'border-b border-border' : ''}`}
            >
              <p className="text-sm text-muted font-sans">{year}</p>
              <p className="text-sm font-sans font-500">{role}</p>
              <p className="text-sm font-display font-700">{company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
