'use client';

import { useState } from 'react';
import styled from 'styled-components';
import CopyIcon from '../icons/copy';
import LinkIcon from '../icons/link';
import { sectionContentStackStyles, sectionCoverStyles, sectionItemRowText } from '../shared/section-item.styles';

const InfoContainer = styled.div`
  .section-heading {
    ${sectionCoverStyles}
  }

  .section-items {
    ${sectionContentStackStyles}
  }

  .list-row {
    ${sectionItemRowText}
    display: flex;
    align-items: center;
    min-height: 1.25em;
    width: max-content;
    text-decoration: none;
    color: var(--color-black);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    /* Avoid font: inherit shorthand — it resets font-size after sectionItemRowText. */
    font-family: inherit;
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
      font-size: var(--font-size-2xs);
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
      <div className="section-heading">
        <b>contact info</b>
      </div>

      <div className="section-items">
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
      </div>
    </InfoContainer>
  );
};

export default Info;
