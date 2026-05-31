'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  // Hide over surfaces that opt out (e.g. the studio panel) — mix-blend-difference
  // over a backdrop-blur reads as a smudge there.
  const [hidden, setHidden] = useState(false);

  const x = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const y = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
      const overOptOut = !!(e.target as Element | null)?.closest?.('[data-hide-cursor]');
      setHidden((prev) => (prev === overOptOut ? prev : overOptOut));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 w-5 h-5 rounded-full border border-foreground pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ x, y }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.15 }}
    />
  );
}
