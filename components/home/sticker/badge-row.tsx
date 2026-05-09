'use client';

import styled from 'styled-components';

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
  font-weight: 400;
  font-size: ${p => p.$fontSize};
`;

export function StickerBadgeRow() {
  return (
    <Root>
      <BadgeOuter>
        <BadgeLabel style={{ letterSpacing: '-0.08em' }} $fontSize="1.0125rem">
          SE7
        </BadgeLabel>
      </BadgeOuter>
      <BadgeOuter $double>
        <span>
          <BadgeLabel style={{ letterSpacing: '-0.08em' }} $fontSize="1.0125rem">
            D8
          </BadgeLabel>
        </span>
      </BadgeOuter>
      <BadgeOuter>
        <BadgeLabel style={{ lineHeight: '.8' }} $fontSize="0.9rem">
          MK
          <br />
          TG
        </BadgeLabel>
      </BadgeOuter>
    </Root>
  );
}
