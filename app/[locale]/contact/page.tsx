import { getTranslations } from 'next-intl/server';
import ContactForm from './ContactForm';
import Availability from '@/components/ui/Availability';

const AVAILABLE = true;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const title = `${t('title')} — Hadjer Chikouche`;
  const description = t('subtitle');
  return { title, description, openGraph: { title, description } };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <Availability
            available={AVAILABLE}
            label={AVAILABLE ? t('available') : t('notAvailable')}
            className="mb-8"
            labelClassName="text-xs font-sans text-muted uppercase tracking-widest"
          />

          <h1 className="font-display font-800 text-5xl md:text-7xl tracking-tight leading-none mb-8">
            {t('title')}
          </h1>

          <p className="font-sans text-muted text-lg leading-relaxed mb-12">{t('subtitle')}</p>

          <div className="space-y-3">
            <a
              href="mailto:chikouche.hadjer@gmail.com"
              className="block font-display font-600 text-xl hover:text-accent transition-colors"
            >
              chikouche.hadjer@gmail.com
            </a>
            <div className="flex gap-6 text-sm text-muted font-sans">
              <a
                href="https://linkedin.com/in/hadjer-chikouche"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <ContactForm />
      </div>
    </div>
  );
}
