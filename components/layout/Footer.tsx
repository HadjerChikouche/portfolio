import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const ta = useTranslations('a11y');
  const locale = useLocale();

  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display font-700 text-sm tracking-widest uppercase mb-1">HC</p>
          <p className="text-xs text-muted">{t('designed')}</p>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm text-muted" aria-label={ta('footerNav')}>
          <Link href={`/${locale}/work`} className="hover:text-foreground transition-colors">
            {tNav('work')}
          </Link>
          <Link href={`/${locale}/about`} className="hover:text-foreground transition-colors">
            {tNav('about')}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-foreground transition-colors">
            {tNav('contact')}
          </Link>
        </nav>

        <div className="flex gap-4 text-sm text-muted">
          <a
            href="https://linkedin.com/in/hadjer-chikouche"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:chikouche.hadjer@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>

        <p className="text-xs text-muted">© {new Date().getFullYear()} {t('rights')}</p>
      </div>
    </footer>
  );
}
