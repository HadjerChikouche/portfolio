import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * The single inline-link vocabulary for the site: label + arrow that nudges
 * right on hover, accent on hover. Replaces the assortment of raw "→" glyphs
 * so every text CTA shares one optical weight and one interaction.
 *
 * Buttons (bordered, fill-on-hover) remain a separate, deliberate tier.
 */
export default function ArrowLink({
  href,
  children,
  className,
  iconClassName,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 font-sans transition-colors hover:text-accent',
        className
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        strokeWidth={2}
        className={cn(
          'w-4 h-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1',
          iconClassName
        )}
      />
    </Link>
  );
}
