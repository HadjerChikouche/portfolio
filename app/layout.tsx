import type { Metadata } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hadjer Chikouche — UX/UI & Product Designer',
  description:
    'Portfolio of Hadjer Chikouche, UX/UI and Product Designer crafting thoughtful digital experiences.',
  openGraph: {
    title: 'Hadjer Chikouche — UX/UI & Product Designer',
    description: 'Crafting thoughtful digital experiences.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${syne.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
