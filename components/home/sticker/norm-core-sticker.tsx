'use client';

import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import styled from 'styled-components';
import { stickerSkewCss } from '../../shared/sticker-skew.styles';
import { StickerBadgeRow } from './badge-row';
import { StickerIconRow } from './icon-row';
import { StickerTextStack } from './text-stack';

const StickerPerspective = styled.div`
  display: inline-block;
  transform: scale(0.95) translateY(-12px) translateX(-12px);
`;

const StickerRoot = styled.section`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  color: var(--color-black);
  line-height: 1;
  max-width: min(100%, 26rem);
  ${stickerSkewCss}
`;

const StickerBody = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

/**
 * Single layer: `backdrop-filter` + `mask` so blur fades out toward the sticker interior (like black → black → transparent, but `to right`).
 * `--sticker-edge-fade`: strip width from the right. `--sticker-edge-blur-strength`: multiplier on base blur.
 * `--sticker-edge-mask-solid-start`: where the mask reaches full opacity (0–100%, default 55%) so the outer edge can stay “fully blurred”.
 */
const StickerEdgeBlur = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: var(--sticker-edge-fade, 40%);
  pointer-events: none;
  overflow: visible;

  -webkit-backdrop-filter: blur(calc(var(--sticker-edge-blur-px, .5px) * var(--sticker-edge-blur-strength, 1)));
  backdrop-filter: blur(calc(var(--sticker-edge-blur-px, .5px) * var(--sticker-edge-blur-strength, 1)));

  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) var(--sticker-edge-mask-solid-start, 55%),
    rgba(0, 0, 0, 1) 100%
  );
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) var(--sticker-edge-mask-solid-start, 55%),
    rgba(0, 0, 0, 1) 100%
  );
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
`;

export type NormCoreStickerProps = ComponentPropsWithoutRef<typeof StickerPerspective> & {
  /**
   * When false, edge blur layers are not rendered.
   * @default true
   */
  edgeBlur?: boolean;
  /**
   * Width of the fade zone from the sticker’s right edge (CSS value).
   * Sets `--sticker-edge-fade`. Examples: `32%`, `min(7rem, 45%)`.
   * @default (via CSS) 38%
   */
  edgeFade?: string;
  /**
   * Unitless multiplier on `--sticker-edge-blur-px` (default 8px).
   * Sets `--sticker-edge-blur-strength`.
   * @default 1
   */
  edgeBlurStrength?: number;
  /** Base blur radius in px before strength. Sets `--sticker-edge-blur-px`. @default 8 */
  edgeBlurPx?: number;
  /**
   * Where the mask reaches full black along the strip (0% = inner edge, 100% = outer).
   * Sets `--sticker-edge-mask-solid-start`. Example: `"70%"` for a longer soft ramp, `"100%"` for a linear fade with no flat zone.
   */
  edgeMaskSolidStart?: string;
};

export function NormCoreSticker({
  style,
  edgeBlur = true,
  edgeFade,
  edgeBlurStrength,
  edgeBlurPx,
  edgeMaskSolidStart,
  ...props
}: NormCoreStickerProps) {
  const vars: CSSProperties = {
    ...(edgeFade != null ? { ['--sticker-edge-fade' as string]: edgeFade } : {}),
    ...(edgeBlurStrength != null ? { ['--sticker-edge-blur-strength' as string]: edgeBlurStrength } : {}),
    ...(edgeBlurPx != null ? { ['--sticker-edge-blur-px' as string]: `${edgeBlurPx}px` } : {}),
    ...(edgeMaskSolidStart != null ? { ['--sticker-edge-mask-solid-start' as string]: edgeMaskSolidStart } : {}),
  };

  return (
    <StickerPerspective style={{ ...vars, ...style }} {...props}>
      <StickerRoot aria-label="David Budimir — intro">
        <StickerBody>
          <StickerTextStack />
          <StickerBadgeRow />
          <StickerIconRow />
        </StickerBody>
        {edgeBlur ? <StickerEdgeBlur aria-hidden /> : null}
      </StickerRoot>
    </StickerPerspective>
  );
}
