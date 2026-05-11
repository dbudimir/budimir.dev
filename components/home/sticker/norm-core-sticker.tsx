'use client';

import type { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import Hat from '../../icons/hat';
import { StickerBadgeRow } from './badge-row';
import { StickerTextStack } from './text-stack';

const StickerPerspective = styled.div`
  display: inline-block;
  transform: scale(0.95);
`;

const StickerRoot = styled.section`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  color: var(--color-black);
  line-height: 1;
  max-width: min(100%, 26rem);
`;

const StickerHat = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: var(--color-black);

  svg {
    display: block;
    height: 1.6rem;
    width: auto;
  }
`;

const StickerBody = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

export type NormCoreStickerProps = ComponentPropsWithoutRef<typeof StickerPerspective>;

export function NormCoreSticker({ ...props }: NormCoreStickerProps) {
  return (
    <StickerPerspective {...props}>
      <StickerRoot aria-label="David Budimir — intro">
        <StickerBody>
          <StickerHat aria-hidden>
            <Hat />
          </StickerHat>
          <StickerTextStack />
          <StickerBadgeRow />
        </StickerBody>
      </StickerRoot>
    </StickerPerspective>
  );
}
