import type { ComponentType } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { resolveBrandIcon } from './brand-icons';

const FALLBACK_ICON_NAME = 'HelpCircle';

/**
 * Resolves an icon by its string name (as written in JSON/MDX frontmatter).
 * Checks the brand-logo registry first — lucide-react dropped every brand
 * icon (GitHub, LinkedIn...) for trademark reasons — then falls back to
 * lucide-react, then a generic icon if nothing matches.
 */
export function resolveIcon(name: string | undefined): ComponentType<LucideProps> {
  const registry = LucideIcons as unknown as Record<string, LucideIcon>;

  if (name) {
    const brand = resolveBrandIcon(name);
    if (brand) return brand as unknown as ComponentType<LucideProps>;
    if (registry[name]) return registry[name];
  }

  return registry[FALLBACK_ICON_NAME]!;
}
