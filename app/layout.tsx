import type { Metadata } from 'next';
import './globals.css';

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

// The <html> / <body> tags live in app/[locale]/layout.tsx so the lang
// attribute can reflect the active locale (RGAA 8.3 — langue de la page).
// This root layout intentionally only passes children through.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
