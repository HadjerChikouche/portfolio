import { cn } from '@/lib/utils';

/**
 * The site-wide "availability" signal — a single accent dot that pings when
 * available. One implementation so the Work and Contact pages stay in sync
 * (previously each rolled its own, and Contact used an off-palette green).
 * Server-safe: the ping is a CSS-only, motion-safe Tailwind variant.
 */
export default function Availability({
  available = true,
  label,
  className,
  labelClassName,
}: {
  available?: boolean;
  label: string;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {available && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
        )}
        <span
          className={cn(
            'relative inline-flex h-2 w-2 rounded-full',
            available ? 'bg-accent' : 'bg-muted'
          )}
        />
      </span>
      <span className={labelClassName}>{label}</span>
    </span>
  );
}
