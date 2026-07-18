import type { ComponentType } from 'react';

/**
 * Shape produced by `import.meta.glob('*.mdx', { eager: true })` when using
 * @mdx-js/rollup with remark-frontmatter + remark-mdx-frontmatter: each module
 * exports the compiled MDX body as `default` and the parsed frontmatter as
 * a named export.
 */
export interface MDXModule<Frontmatter> {
  default: ComponentType;
  frontmatter: Frontmatter;
}

export type GlobbedModules<Frontmatter> = Record<string, MDXModule<Frontmatter>>;
