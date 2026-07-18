/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const MDXComponent: ComponentType;
  export default MDXComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const frontmatter: any;
}
