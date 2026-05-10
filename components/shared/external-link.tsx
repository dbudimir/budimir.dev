import type { ReactNode } from 'react';
import LinkIcon from '../icons/link';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  iconSize?: number;
  ariaLabel?: string;
}

export function ExternalLink({ href, children, className, iconSize = 12, ariaLabel }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
      {children}
      <LinkIcon size={iconSize} />
    </a>
  );
}
