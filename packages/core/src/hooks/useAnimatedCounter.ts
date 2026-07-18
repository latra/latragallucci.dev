import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

/** Animates a number counting up (or down) toward `target`, used for XP/stat counters. */
export function useAnimatedCounter(target: number, durationSeconds = 1): number {
  const [value, setValue] = useState(0);
  const previousTarget = useRef(0);

  useEffect(() => {
    // The imperative `animate()` call doesn't read <MotionConfig reducedMotion>,
    // so reduced-motion preference is checked directly here.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(target);
      previousTarget.current = target;
      return;
    }

    const controls = animate(previousTarget.current, target, {
      duration: durationSeconds,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(latest),
    });
    previousTarget.current = target;
    return () => controls.stop();
  }, [target, durationSeconds]);

  return Math.round(value);
}
