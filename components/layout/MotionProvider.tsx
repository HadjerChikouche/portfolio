'use client';

import { MotionConfig } from 'framer-motion';

/**
 * RGAA 13.8 / WCAG 2.3.3 — respect the user's "reduce motion" OS setting.
 * The global CSS reduced-motion rule only neutralises CSS transitions/animations;
 * framer-motion runs its animations in JS, so it needs MotionConfig to opt in.
 * `reducedMotion="user"` disables transform & layout animations (the ones that
 * cause vestibular discomfort) while keeping simple opacity fades.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
