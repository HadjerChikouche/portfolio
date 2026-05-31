export interface Project {
  slug: string;
  title: string;
  subtitle: { en: string; fr: string };
  type: string[];
  year: number;
  featured: boolean;
  coverColor: string;
  coverImage?: string;
  description: { en: string; fr: string };
  role: { en: string; fr: string };
  duration: { en: string; fr: string };
  tools: string[];
  platform: string;
}

export const projects: Project[] = [
  {
    slug: 'flexfret',
    title: 'FlexFret',
    subtitle: {
      en: 'Designing a distributed logistics system',
      fr: 'Concevoir un système logistique distribué',
    },
    type: ['Product Design', 'Design System'],
    year: 2026,
    featured: true,
    coverColor: '#1A1A2E',
    coverImage: '/images/flexfret/cover.svg',
    description: {
      en: 'A real-time freight SaaS — 6 state machines, 6 interaction patterns, a domain-driven design system built from distributed system constraints, not visual preferences.',
      fr: 'Un SaaS fret temps réel — 6 state machines, 6 patterns d\'interaction, un design system domain-driven construit à partir des contraintes système distribuées.',
    },
    role: { en: 'Product Designer', fr: 'Product Designer' },
    duration: { en: '6 months', fr: '6 mois' },
    tools: ['Figma', 'FigJam', 'Notion'],
    platform: 'Web App (B2B SaaS)',
  },
  {
    slug: 'ocus',
    title: 'OCUS',
    subtitle: {
      en: 'AI-powered media operations platform',
      fr: 'Plateforme d\'opérations média assistée par IA',
    },
    type: ['UX Research', 'Product Design'],
    year: 2024,
    featured: true,
    coverColor: '#111111',
    coverImage: '/images/ocus/cover.svg',
    description: {
      en: 'Designing AI Image Enhancement for OCUS — an internal media ops platform that shifts QA from universal review to exception-based routing at 10,000-image scale.',
      fr: 'Conception de l\'amélioration d\'image IA pour OCUS — une plateforme d\'opérations média qui fait passer le QA d\'une revue universelle à un routage par exceptions à 10 000 images.',
    },
    role: { en: 'UX/UI Designer', fr: 'UX/UI Designer' },
    duration: { en: '3 months', fr: '3 mois' },
    tools: ['Figma', 'Maze', 'Notion'],
    platform: 'Web App',
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
