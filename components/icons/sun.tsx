import type { SVGProps } from 'react';

interface SunProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
}

export default function Sun({ size = 24, ...props }: SunProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      <line x1="23" x2="23" y2="45" />
      <line x1="6.64645" y1="38.6464" x2="38.4663" y2="6.82664" />
      <line y1="22.5" x2="45" y2="22.5" />
      <line x1="7.35355" y1="6.64645" x2="39.1734" y2="38.4663" />
    </svg>
  );
}
