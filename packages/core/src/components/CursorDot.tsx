import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-active]';

/**
 * A small signal-cyan dot that trails the real cursor with spring inertia.
 * Skipped entirely on touch/coarse-pointer devices and when the OS requests
 * reduced motion — it's a decorative companion to the native cursor, never
 * a replacement for it, so nothing about page usability depends on it.
 */
export function CursorDot() {
  const prefersReducedMotion = useReducedMotion();
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 28, stiffness: 350, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setSupported(true);

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [prefersReducedMotion, x, y]);

  if (!supported) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 h-6 w-6 rounded-full bg-primary"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 'var(--qf-z-cursor)',
      }}
      animate={{ scale: active ? 1 : 0.35, opacity: active ? 0.85 : 0.5 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
