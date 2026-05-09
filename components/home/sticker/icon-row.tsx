'use client';

import styled from 'styled-components';
import GitHubIcon from '../../icons/github';
import LinkedInIcon from '../../icons/linkedin';

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
    outline: 2px solid var(--color-black);
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
  letter-spacing: -0.05em;
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

const Dot = styled.span`
  width: 3.6px;
  height: 3.6px;
  border-radius: 50%;
  border: 1px solid var(--color-black);
  flex-shrink: 0;
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
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
        </DotRow>
      </MonogramBlock>
    </Root>
  );
}
