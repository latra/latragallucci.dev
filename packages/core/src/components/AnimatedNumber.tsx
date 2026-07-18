import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

export interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  format?: (value: number) => string;
}

export function AnimatedNumber({ value, duration = 1, className, format }: AnimatedNumberProps) {
  const animated = useAnimatedCounter(value, duration);
  return <span className={className}>{format ? format(animated) : animated.toLocaleString('en-US')}</span>;
}
