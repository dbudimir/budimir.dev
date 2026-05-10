'use client';

import styled, { keyframes } from 'styled-components';
import GitHubIcon from '../../icons/github';
import LinkedInIcon from '../../icons/linkedin';

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
  align-items: flex-end;
  justify-content: space-between;
  margin-top: -11px;
  gap: calc(0.9 * clamp(var(--spacing-md), 4vw, var(--spacing-xl)));
  position: relative;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-black);

  svg {
    display: block;
    height: 1.2375rem;
    width: auto;
  }

  &:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

const MonogramBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(0.9 * var(--spacing-xs));
  transform: scale(0.945);
  align-items: flex-end;
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

export function StickerIconRow() {
  return (
    <Root>
      <IconLink href="https://github.com/dbudimir" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <GitHubIcon />
      </IconLink>
      <IconLink
        href="https://www.linkedin.com/in/davidbudimir/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </IconLink>

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
