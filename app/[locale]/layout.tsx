import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/layout/PageTransition';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CustomCursor />
      <Header />
      <PageTransition>
        <main className="min-h-screen">{children}</main>
      </PageTransition>
      <Footer />
    </NextIntlClientProvider>
  );
}
