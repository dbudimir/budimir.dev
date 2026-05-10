import { css } from 'styled-components';

/**
 * Right-edge backdrop blur strip with a horizontal mask fade (inner → outer).
 *
 * CSS custom properties (set on this element or an ancestor):
 * `--sticker-edge-fade` — strip width from the right (default 40%).
 * `--sticker-edge-blur-px` — base blur radius before strength (default `.5px` in the calc).
 * `--sticker-edge-blur-strength` — unitless multiplier on blur (default 1).
 * `--sticker-edge-mask-solid-start` — where the mask reaches full opacity, 0–100% (default 55%).
 */
export const stickerEdgeBlurCss = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: var(--sticker-edge-fade, 40%);
  pointer-events: none;
  overflow: visible;

  -webkit-backdrop-filter: blur(calc(var(--sticker-edge-blur-px, 0.5px) * var(--sticker-edge-blur-strength, 1)));
  backdrop-filter: blur(calc(var(--sticker-edge-blur-px, 0.5px) * var(--sticker-edge-blur-strength, 1)));

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
