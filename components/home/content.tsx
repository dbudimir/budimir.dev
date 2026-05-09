'use client';

import Image from 'next/image';
import styled from 'styled-components';
import LinkIcon from '../icons/link';
import Experience from './experience';
import Frit from './frit';
import { NormCoreSticker } from './sticker';
import Work from './work';

const HeroIntro = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xl);
  width: 100%;

  @media (min-width: 769px) {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 0;
  }
`;

/** Out of flow on wide layouts so body text aligns to the image width only. */
const NormCoreStickerSlot = styled.div`
  flex-shrink: 0;

  @media (min-width: 769px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }
`;

const HeroFigure = styled.figure`
  position: relative;
  display: inline-block;
  margin: 0;
  flex-shrink: 0;

  img {
    position: relative;
    z-index: 1;
    display: block;
  }
`;

const HeroName = styled.div`
  display: none;

  @media (min-width: 769px) {
    display: block;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: var(--spacing-md) 0;

  .resume {
    display: flex;
    width: max-content;
    align-items: center;
    cursor: pointer;

    a {
      display: flex;
      text-decoration: none;
      color: var(--color-black);
      line-height: 1;
    }

    &:hover {
      svg {
        transform: scale(1.2);
      }
    }
  }
`;

const Content = () => {
  return (
    <HeroFigure>
      <Frit />
      <ContentContainer>
        <HeroIntro>
          {/* <div> */}
          {/* <Image
              style={{ marginBottom: '24px' }}
              src="/static/images/cap.webp"
              alt="David Budimir"
              height="45"
              width="80"
              priority
            /> */}

          <HeroName>
            <h1>david budimir</h1>
          </HeroName>
          {/* </div> */}

          <NormCoreStickerSlot>
            <NormCoreSticker />
          </NormCoreStickerSlot>
        </HeroIntro>

        <b className="resume">
          <a href="../static/pdfs/david-budimir-resume.pdf" target="_blank" rel="noopener noreferrer">
            resume
            <LinkIcon style={{ transition: 'var(--transition)', height: 12 }} />
          </a>
        </b>

        <Experience />
        <Work />
      </ContentContainer>
    </HeroFigure>
  );
};

export default Content;
