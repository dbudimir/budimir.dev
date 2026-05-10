import type { ReactNode } from 'react';
import LinkIcon from '../icons/link';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  iconSize?: number;
}

export function ExternalLink({ href, children, className, iconSize = 12 }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <LinkIcon size={iconSize} />
    </a>
  );
}
