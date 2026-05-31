'use client';

import { motion } from 'framer-motion';

/**
 * A subtle scroll-into-view reveal, matched to the home page's motion language
 * (same easing, fade + small rise). Used to bring the otherwise-flat inner
 * pages up to the same level of polish.
 *
 * Reduced motion is handled by the global MotionConfig (reducedMotion="user"):
 * the transform is dropped and only the opacity fade remains — a designed
 * alternate, not a dead stop.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
