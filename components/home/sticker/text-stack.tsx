'use client';

import styled from 'styled-components';

import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, PROJECTS_URL } from '../../../lib/contact';
import Star from '../../icons/star';
import Sun from '../../icons/sun';
import { IconArrow } from '../../shared/icon-arrow';
import { Tagline } from '../../shared/tagline';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const SocialRow = styled(Tagline)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65em;
  font-size: var(--font-size-2xs);
`;

const SocialLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 3px;
    border-radius: 2px;
  }
`;

const SocialSep = styled.span`
  opacity: 0.45;
  user-select: none;
`;

const NameRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.45em;
  margin: auto;
  font-size: var(--font-size-2xs);
`;

const NameTagline = styled(Tagline)`
  margin: 0;
  font-size: inherit;
`;

const NameIconTrail = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.18em;
  opacity: 0.88;
`;

/** Superscript degree mark after lat/lng (WGS 84), 371 Edgecombe Ave, New York, NY 10031 */
const DegreeSup = styled.sup`
  font-size: 1em;
  line-height: 0;
  position: relative;
  top: 0.25em;
  margin-left: 0.02em;
`;

export function StickerTextStack() {
  return (
    <Root>
      <NameRow>
        <NameTagline aria-label="Coordinates for 371 Edgecombe Avenue, New York, NY 10031">давид будимир</NameTagline>
        <NameIconTrail aria-hidden>
          <Sun size={12} />
          <IconArrow>→</IconArrow>
          <Star size={12} />
        </NameIconTrail>
      </NameRow>
      <Tagline
        style={{ fontSize: 'var(--font-size-2xs)', margin: 'auto' }}
        aria-label="Coordinates 40.8279599 degrees north, 73.9409963 degrees west"
      >
        40.8279599
        <DegreeSup aria-hidden>°</DegreeSup>, -73.9409963
        <DegreeSup aria-hidden>°</DegreeSup>
      </Tagline>

      <SocialRow>
        <SocialLink href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          github
        </SocialLink>
        <SocialSep aria-hidden>·</SocialSep>
        <SocialLink href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          linkedin
        </SocialLink>
        <SocialSep aria-hidden>·</SocialSep>
        <SocialLink href={PROJECTS_URL} target="_blank" rel="noopener noreferrer">
          77 projects
        </SocialLink>
      </SocialRow>
    </Root>
  );
}
