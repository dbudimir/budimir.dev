import type { ReactNode } from 'react';

interface TagRowProps {
  children: ReactNode;
}

/** Row below tags: external links, styled via `.project-content .tag-row` in section styles. */
export function TagRow({ children }: TagRowProps) {
  return (
    <div className="tag-row">
      <div className="links">{children}</div>
    </div>
  );
}
