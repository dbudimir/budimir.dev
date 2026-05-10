'use client';

import styled from 'styled-components';
import { stickerEdgeBlurCss } from '../shared/sticker-edge-blur.styles';
import { stickerSkewCss } from '../shared/sticker-skew.styles';

const HeroNameRoot = styled.div`
  display: none;

  @media (min-width: 769px) {
    display: block;
  }

  position: relative;
  isolation: isolate;
  ${stickerSkewCss}
  margin-left: -12px;
`;

const HeroNameInner = styled.div`
  position: relative;
  z-index: 0;
`;

const HeroNameEdgeBlur = styled.div`
  ${stickerEdgeBlurCss}
`;

export function HeroName() {
  return (
    <HeroNameRoot className="hero-name">
      <HeroNameInner>
        <h1>david budimir</h1>
      </HeroNameInner>
      <HeroNameEdgeBlur aria-hidden />
    </HeroNameRoot>
  );
}
