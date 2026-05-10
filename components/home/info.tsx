'use client';

import styled from 'styled-components';
import { CONTACT_EMAIL } from '../../lib/contact';
import { useCopyEmail } from '../../lib/hooks/use-copy-email';
import CopyIcon from '../icons/copy';
import { ExternalLink } from '../shared/external-link';
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
  const { showCopied, copyEmail } = useCopyEmail();

  return (
    <InfoContainer>
      <div className="section-heading">
        <b>contact info</b>
      </div>

      <div className="section-items">
        <button type="button" onClick={copyEmail} className="list-row email-row">
          email <CopyIcon size={12} />
          {showCopied && <div className="copied-indicator">copied {CONTACT_EMAIL} </div>}
        </button>

        <ExternalLink className="list-row" href="https://github.com/dbudimir">
          github
        </ExternalLink>

        <ExternalLink className="list-row" href="https://www.linkedin.com/in/davidbudimir/">
          linkedin
        </ExternalLink>
      </div>
    </InfoContainer>
  );
};

export default Info;
