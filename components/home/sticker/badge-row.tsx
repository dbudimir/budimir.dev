'use client';

import styled, { keyframes } from 'styled-components';

/** Full monogram-dot loop (seconds). */
const DOT_CYCLE_S = 8;
const DOT_COUNT = 8;
/** Seconds per dot: hidden → visible (sequential). */
const DOT_REVEAL_S = 0.7;
/** Hold with every dot filled before clearing together. */
const DOT_HOLD_FILLED_S = 1;
/** Fade all dots empty together. */
const DOT_CLEAR_S = 0.3;
/* Remaining slice of DOT_CYCLE_S is a short empty beat before repeat. */

const pct = (seconds: number) => `${(seconds / DOT_CYCLE_S) * 100}%`;

function monogramDotKeyframes(index: number) {
  const start = index * DOT_REVEAL_S;
  const end = (index + 1) * DOT_REVEAL_S;
  const holdEnd = DOT_COUNT * DOT_REVEAL_S + DOT_HOLD_FILLED_S;
  const clearEnd = holdEnd + DOT_CLEAR_S;

  return keyframes`
    0%,
    ${pct(start)} {
      opacity: 0;
    }
    ${pct(end)} {
      opacity: 1;
    }
    ${pct(holdEnd)} {
      opacity: 1;
    }
    ${pct(clearEnd)} {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  `;
}

const dotKfs = Array.from({ length: DOT_COUNT }, (_, i) => monogramDotKeyframes(i));

const MONOGRAM_DOT_KEYS = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'] as const;

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: calc(0.9 * var(--spacing-sm));
  margin-top: calc(0.9 * var(--spacing-2xs));
`;

const badgeDiameter = '2.097rem';

const BadgeOuter = styled.div<{ $double?: boolean }>`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: ${badgeDiameter};
  height: ${badgeDiameter};
  border-radius: 50%;
  border: 1px solid var(--color-black);
  box-sizing: border-box;
  background: transparent;

  ${p =>
    p.$double &&
    `
    padding: 2px;
    & > span {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid var(--color-black);
      display: grid;
      place-items: center;
      box-sizing: border-box;
    }
  `}
`;

const BadgeLabel = styled.span<{ $fontSize: string }>`
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: 400;
  font-size: ${p => p.$fontSize};
`;

/** Digits or short suffix inside a badge label, drawn smaller than the main letters. */
export const StickerBadgeNumber = styled.span`
  font-size: 0.75em;
  line-height: 1;
  font-weight: inherit;
  vertical-align: 0.08em;
`;

const MonogramBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: calc(0.9 * var(--spacing-xs));
  margin-left: auto;
  transform: scale(1.25) translateY(12px);
`;

const MonogramText = styled.span`
  font-weight: 800;
  font-size: 1.6875rem;
  letter-spacing: var(--letter-spacing-tight);
  line-height: 0.85;
  user-select: none;
`;

const MonogramOutline = styled.span`
  color: transparent;
  -webkit-text-stroke: 1px var(--color-black);
`;

const MonogramSolid = styled.span`
  margin-left: -0.02em;
`;

const DotRow = styled.div`
  display: flex;
  gap: 2.7px;
  align-items: center;
`;

/** Per-index animation so we don’t rely on :nth-child + animation-name (easy to end up with no animation → dots stuck at opacity 0). */
const MonogramDot = styled.span<{ $i: number }>`
  width: 3.6px;
  height: 3.6px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid var(--color-black);
  opacity: 0;
  animation: ${({ $i }) => dotKfs[$i]} ${DOT_CYCLE_S}s ease-in-out infinite both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

export function StickerBadgeRow() {
  return (
    <Root>
      <BadgeOuter aria-label="Software Engineer, 7+ years">
        <BadgeLabel style={{ letterSpacing: 'var(--letter-spacing-tighter)' }} $fontSize="1.0125rem">
          SE
          <StickerBadgeNumber>7</StickerBadgeNumber>
        </BadgeLabel>
      </BadgeOuter>
      <BadgeOuter $double aria-label="Designer, 8+ years">
        <span>
          <BadgeLabel style={{ letterSpacing: 'var(--letter-spacing-tighter)' }} $fontSize="1.0125rem">
            D<StickerBadgeNumber>8</StickerBadgeNumber>
          </BadgeLabel>
        </span>
      </BadgeOuter>
      <BadgeOuter aria-label="Marketing">
        <BadgeLabel style={{ lineHeight: '.8', transform: 'translateY(1px)' }} $fontSize="0.9rem">
          MK
          <br />
          TG
        </BadgeLabel>
      </BadgeOuter>
      <MonogramBlock aria-hidden>
        <MonogramText>
          <MonogramOutline>D</MonogramOutline>
          <MonogramSolid>b</MonogramSolid>
        </MonogramText>
        <DotRow>
          {MONOGRAM_DOT_KEYS.map((key, i) => (
            <MonogramDot key={key} $i={i} />
          ))}
        </DotRow>
      </MonogramBlock>
    </Root>
  );
}
