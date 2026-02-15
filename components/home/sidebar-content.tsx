'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import ChevronIcon from '../icons/chevron';
import CopyIcon from '../icons/copy';
import LinkIcon from '../icons/link';

const SidebarContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);

  > img {
    background-color: var(--color-text-muted);
    padding: var(--spacing-md);
    margin-bottom: 6px;
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
      border-bottom: 6px solid var(--color-accent);
      border-left: 6px solid var(--color-accent);
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

  .contact {
    display: flex;
    flex-direction: column;
    /* gap: var(--spacing-xs); */

    @media screen and (max-width: 768px) {
      gap: var(--spacing-sm);
    }

    .contact-info {
      display: flex;
      width: max-content;
      border-bottom: 6px solid var(--color-accent);
      border-left: 6px solid var(--color-accent);
      margin-bottom: var(--spacing-sm);
      line-height: 1;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: var(--color-black);
      cursor: pointer;
      width: max-content;

      &:hover {
        svg {
          opacity: 1;
        }
      }

      svg {
        height: 14px;
        opacity: 0;
      }
    }

    span {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      cursor: pointer;

      .email-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;

        &:hover {
          svg {
            opacity: 1;
          }
        }

        svg {
          width: 14px;
          height: 14px;
          opacity: 0;
        }
      }

      .show-email {
        color: var(--color-text-muted);
        font-size: 14px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-xs);
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;

        svg {
          width: 14px;
        }

        .copied-indicator {
          animation-name: fadeAndBounce;
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          padding: 0 0 0 4px;
        }
      }

      &.email-visible {
        .email-toggle {
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
`;

const SidebarContent = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const copyEmail = () => {
    setShowCopied(true);
    navigator.clipboard.writeText('dav.budimir@gmail.com');
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  return (
    <SidebarContentContainer className="content">
      <Image src="/static/images/lemon.png" alt="David Budimir" height="100" width="100" />

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

      <div className="contact">
        <b className="contact-info">contact info</b>

        <span className={showEmail ? 'email-visible' : ''}>
          <button type="button" className="email-toggle" onClick={() => setShowEmail(!showEmail)}>
            email <ChevronIcon />
          </button>
          {showEmail && (
            <button type="button" onClick={copyEmail} className="show-email">
              dav.budimir@gmail.com <CopyIcon />
              {showCopied && <div className="copied-indicator">Copied !!!</div>}
            </button>
          )}
        </span>

        <a href="https://github.com/dbudimir" target="_blank" rel="noopener noreferrer">
          github
          <LinkIcon />
        </a>
        <a href="https://www.linkedin.com/in/davidbudimir/" target="_blank" rel="noopener noreferrer">
          linkedin
          <LinkIcon />
        </a>
      </div>
    </SidebarContentContainer>
  );
};

export default SidebarContent;
