import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from './Icon';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'muted';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'border-border bg-surface-hover text-text-secondary',
  primary: 'border-primary/30 bg-primary/10 text-primary',
  success: 'border-success/30 bg-success/10 text-success',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  danger: 'border-danger/30 bg-danger/10 text-danger',
  muted: 'border-border bg-transparent text-text-muted',
};

export interface BadgeProps {
  variant?: BadgeVariant;
  icon?: string;
  children: ReactNode;
}

export function Badge({ variant = 'default', icon, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-qfull border px-2 py-0.5 text-xs whitespace-nowrap',
        VARIANT_CLASSES[variant],
      )}
    >
      {icon && <Icon name={icon} size={11} />}
      {children}
    </span>
  );
}
