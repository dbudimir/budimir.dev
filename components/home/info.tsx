'use client';

import { useState } from 'react';
import styled from 'styled-components';
import CopyIcon from '../icons/copy';
import LinkIcon from '../icons/link';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    gap: var(--spacing-sm);
  }

  .contact-info {
    display: flex;
    width: max-content;
    margin-bottom: var(--spacing-sm);
    line-height: 1;
  }

  .list-row {
    display: flex;
    align-items: center;
    height: 20px;
    width: max-content;
    text-decoration: none;
    color: var(--color-black);
    cursor: pointer;

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

  .email-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;

    .email-toggle {
      display: flex;
      align-items: center;
      height: 20px;
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
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        max-width: 0;
        animation: slideReveal 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
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
`;

const Info = () => {
  const [showCopied, setShowCopied] = useState(false);

  const copyEmail = () => {
    setShowCopied(true);
    navigator.clipboard.writeText('dav.budimir@gmail.com');
    setTimeout(() => {
      setShowCopied(false);
    }, 2500);
  };

  return (
    <InfoContainer>
      <b className="contact-info">contact info</b>

      <span className={`email-wrapper`}>
        <button type="button" onClick={copyEmail} className="show-email">
          email <CopyIcon />
          {showCopied && <div className="copied-indicator">Copied dav.budimir@gmail.com </div>}
        </button>
      </span>

      <a className="list-row" href="https://github.com/dbudimir" target="_blank" rel="noopener noreferrer">
        github
        <LinkIcon />
      </a>

      <a
        className="list-row"
        href="https://www.linkedin.com/in/davidbudimir/"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin
        <LinkIcon />
      </a>
    </InfoContainer>
  );
};

export default Info;
