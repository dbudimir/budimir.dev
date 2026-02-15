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
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    gap: var(--spacing-xs);

    &:hover {
      svg {
        opacity: 1;
      }
    }

    svg {
      opacity: 0;
    }

    &.email-row {
        svg {
          opacity: 1;
        }
    }

    .copied-indicator {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      max-width: 0;
      animation: slideReveal 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
      padding: 0 0 0 4px;
      color: var(--color-text-muted);
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

      <button type="button" onClick={copyEmail} className="list-row email-row">
        email <CopyIcon style={{ width: 12 }} />
        {showCopied && <div className="copied-indicator">copied dav.budimir@gmail.com </div>}
      </button>

      <a className="list-row" href="https://github.com/dbudimir" target="_blank" rel="noopener noreferrer">
        github
        <LinkIcon style={{ height: 12, width: 12 }} />
      </a>

      <a
        className="list-row"
        href="https://www.linkedin.com/in/davidbudimir/"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin
        <LinkIcon style={{ height: 12, width: 12 }} />
      </a>
    </InfoContainer>
  );
};

export default Info;
