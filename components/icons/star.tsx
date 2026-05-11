import type { SVGProps } from 'react';

interface StarProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
}

export default function Star({ size = 24, ...props }: StarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 47 39"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      <path d="M24.2705 14.7532L0.629051 8.41846C0.518859 8.38893 0.453108 8.53731 0.549 8.59911L22.5122 22.7532L19.0761 37.4795C19.0547 37.5711 19.1602 37.6389 19.2346 37.5813L30.0122 29.2532L41.7751 37.5853C41.8528 37.6402 41.9561 37.566 41.9287 37.4749L37.5122 22.7532L46.3156 14.9279C46.3843 14.8668 46.3411 14.7532 46.2492 14.7532H33.0122L28.1205 0.567336C28.0882 0.473634 27.9539 0.478976 27.9292 0.574949L24.2705 14.7532Z" />
    </svg>
  );
}
