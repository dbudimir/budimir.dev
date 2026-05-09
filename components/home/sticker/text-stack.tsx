'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CONTACT_EMAIL, CONTACT_EMAIL_COPY_FEEDBACK_MS } from '../../../lib/contact';
import CopyIcon from '../../icons/copy';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const Headline = styled.p`
  margin: 0;
  font-weight: 800;
  font-size: var(--font-size-2xl);
  letter-spacing: 0.05em;
  margin: 12px 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

const copiedTooltip = keyframes`
  0% {
    opacity: 0;
    transform: translate(calc(-100% + 8px), -50%);
  }
  12% {
    opacity: 1;
    transform: translate(calc(-100% - 6px), -50%);
  }
  78% {
    opacity: 1;
    transform: translate(calc(-100% - 6px), -50%);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-100% - 22px), -50%);
  }
`;

const copiedTooltipMobile = keyframes`
  0% {
    opacity: 0;
    transform: translate(26px, -50%);
  }
  12% {
    opacity: 1;
    transform: translate(8px, -50%);
  }
  78% {
    opacity: 1;
    transform: translate(8px, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(34px, -50%);
  }
`;

const EmailButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: baseline;
  flex-direction: row;
  gap: 0.5rem;
  margin: 0;
  max-width: 100%;
  padding: 0;
  font-family: inherit;
  font-weight: 700;
  font-size: var(--font-size-sm);
  letter-spacing: 0.05em;
  color: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &:focus-visible {
    outline: 2px solid var(--color-black);
    outline-offset: 3px;
  }

  .copy-hint {
    flex-shrink: 0;
    line-height: 0;
    opacity: 0;
    pointer-events: none;
    color: inherit;

    svg {
      display: block;
      width: 11px;
      height: 11px;
    }
  }

  &:hover .copy-hint,
  &:focus-visible .copy-hint {
    opacity: 1;
  }

  .copied-indicator {
    position: absolute;
    left: 0;
    top: 50%;
    white-space: nowrap;
    pointer-events: none;
    color: var(--color-text-muted);
    font-size: var(--font-size-2xs);
    animation: ${copiedTooltip} ${CONTACT_EMAIL_COPY_FEEDBACK_MS}ms
      cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }

  @media (max-width: 768px) {
    .copied-indicator {
      left: 100%;
      top: 50%;
      animation: ${copiedTooltipMobile} ${CONTACT_EMAIL_COPY_FEEDBACK_MS}ms
        cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
    }
  }
`;

const Tagline = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: var(--font-size-xs);
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export function StickerTextStack() {
  const [showCopied, setShowCopied] = useState(false);

  const copyEmail = () => {
    setShowCopied(true);
    void navigator.clipboard.writeText(CONTACT_EMAIL);
    window.setTimeout(() => {
      setShowCopied(false);
    }, CONTACT_EMAIL_COPY_FEEDBACK_MS);
  };

  return (
    <Root>
      <Headline>david budimir</Headline>
      <EmailButton type="button" onClick={copyEmail}>
        <span className="copy-hint" aria-hidden={true}>
          <CopyIcon />
        </span>
        {CONTACT_EMAIL}
        {showCopied ? <span className="copied-indicator">Copied!</span> : null}
      </EmailButton>
      <Tagline>{'SOFTWARE // DESIGN // MKTG'}</Tagline>
    </Root>
  );
}
