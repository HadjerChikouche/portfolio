'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'en' ? 'fr' : 'en';
  const localizedHref = (path: string) => `/${locale}${path}`;

  const navLinks = [
    { href: localizedHref('/work'), label: t('work') },
    { href: localizedHref('/about'), label: t('about') },
    { href: localizedHref('/contact'), label: t('contact') },
  ];

  const switchLocale = () => {
    const segments = pathname.split('/');
    segments[1] = otherLocale;
    router.replace(segments.join('/'));
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={localizedHref('')}
          className="font-display font-700 text-sm tracking-widest uppercase hover:text-accent transition-colors"
        >
          HC
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'text-sm font-sans tracking-wide transition-colors hover:text-accent',
                  pathname === href ? 'text-foreground' : 'text-muted'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={switchLocale}
              className="text-xs font-sans text-muted hover:text-foreground transition-colors tracking-widest uppercase border border-border px-2 py-1"
            >
              {otherLocale}
            </button>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={cn('w-6 h-px bg-foreground transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('w-6 h-px bg-foreground transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('w-6 h-px bg-foreground transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-border bg-background"
          >
            <ul className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-display font-600 hover:text-accent transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={switchLocale}
                  className="text-sm text-muted hover:text-foreground transition-colors uppercase tracking-widest"
                >
                  {otherLocale === 'fr' ? 'Français' : 'English'}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
