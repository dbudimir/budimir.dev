'use client';

import { useLayoutEffect } from 'react';

/** Keeps `--scrollbar-inline-end` in sync so edge-anchored layers can bleed past the stable scrollbar gutter. */
export function ScrollbarInlineSync() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const px = Math.max(0, window.innerWidth - root.clientWidth);
      root.style.setProperty('--scrollbar-inline-end', `${px}px`);
    };

    sync();
    window.addEventListener('resize', sync);
    const ro = new ResizeObserver(sync);
    ro.observe(root);

    return () => {
      window.removeEventListener('resize', sync);
      ro.disconnect();
    };
  }, []);

  return null;
}
