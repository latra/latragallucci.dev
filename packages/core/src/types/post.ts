import type { ComponentType } from 'react';

export interface PostFrontmatter {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  tags?: string[];
  coverImage?: string;
  /** External publication (Medium, dev.to...) instead of a local MDX article. */
  externalUrl?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  Content: ComponentType;
}
