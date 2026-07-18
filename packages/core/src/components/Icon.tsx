import type { LucideProps } from 'lucide-react';
import { resolveIcon } from '../lib/icons';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = resolveIcon(name);
  // Icons are decorative by default (the adjacent text carries the meaning);
  // callers that use an icon standalone should pass their own aria-label.
  const isLabelled = props['aria-label'] != null || props['aria-labelledby'] != null;
  return <LucideIcon aria-hidden={isLabelled ? undefined : true} {...props} />;
}
