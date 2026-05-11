'use client';

import styled from 'styled-components';

const HeroNameRoot = styled.div`
  display: block;
  position: relative;
  isolation: isolate;
`;

const HeroNameInner = styled.div`
  position: relative;
  z-index: 0;
`;

export function HeroName() {
  return (
    <HeroNameRoot className="hero-name">
      <HeroNameInner>
        <h1>david budimir</h1>
      </HeroNameInner>
    </HeroNameRoot>
  );
}
