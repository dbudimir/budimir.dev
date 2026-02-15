'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import Image from 'next/image';
import styled from 'styled-components';
import LinkIcon from '../icons/link';
import Experience from './experience';
import Info from './info';
import Work from './work';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);

  > img {
    
    
    
  }

  .name {
    h1,
    h3 {
      margin: 0;
      width: 100%;
    }

    line-height: 1;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);

    div {
      display: flex;
      align-items: first baseline;
      gap: var(--spacing-xs);

      span {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
      }
    }
  }

  .resume {
    display: flex;
    width: max-content;
    cursor: pointer;

    a {
      display: flex;
      text-decoration: none;
      color: var(--color-black);
      line-height: 1;
    }

    svg {
      transition: var(--transition);
      transform: translateY(2px);
      height: 12px;
    }

    &:hover {
      svg {
        transition: var(--transition);
        transform: translateY(2px) scale(1.2);
      }
    }
  }
`;

const Content = () => {
  return (
    <ContentContainer>
      <Image src="/static/images/cap.png" alt="David Budimir" height="100" width="100" />

      <div className="name">
        <h1>david budimir</h1>
      </div>

      <div className="info">
        <div>
          software engineer <span>({dayjs('2019-05-01').fromNow(true)})</span>
        </div>
        <div>
          designer <span>(7 years)</span>
        </div>
        <div>
          saas marketing & seo <span>(8 years)</span>
        </div>
      </div>

      <b className="resume">
        <a href="../static/pdfs/david-budimir-resume.pdf" target="_blank" rel="noopener noreferrer">
          resume
        </a>
        <LinkIcon />
      </b>

      <Info />
      <Experience />
      <Work />
    </ContentContainer>
  );
};

export default Content;
