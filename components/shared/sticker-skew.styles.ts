import { css } from 'styled-components';

/**
 * Shared "sticker skew" — slight perspective tilt + skew used across page elements
 * (sticker, resume row, section headings, project triggers) for a uniform look.
 *
 * Override defaults via these CSS custom properties on the element or any ancestor:
 * --sticker-perspective, --sticker-transform-origin,
 * --sticker-rotate-x, --sticker-rotate-y, --sticker-rotate-z,
 * --sticker-skew-x, --sticker-skew-y.
 *
 * Apply to a "trigger" element (heading, button) — not to its container — so revealed
 * content nested as a sibling stays unskewed for legibility.
 */
export const stickerSkewCss = css`
  transform-style: preserve-3d;
  transform-origin: var(--sticker-transform-origin, 50% 50%);
  transform: perspective(var(--sticker-perspective, 1000px))
    rotateX(var(--sticker-rotate-x, 2deg))
    rotateY(var(--sticker-rotate-y, 2deg))
    rotateZ(var(--sticker-rotate-z, 0deg))
    skew(var(--sticker-skew-x, 0), var(--sticker-skew-y, -2.5deg))
    translateX(10px);
`;
