'use client';

import styled, { keyframes } from 'styled-components';
import { CONTACT_EMAIL, CONTACT_EMAIL_COPY_FEEDBACK_MS } from '../../lib/contact';
import { useCopyEmail } from '../../lib/hooks/use-copy-email';
import CopyIcon from '../icons/copy';

const copiedTooltip = keyframes`
  0% {
    opacity: 0;
    transform: translate(4px, -50%);
  }
  12% {
    opacity: 1;
    transform: translate(10px, -50%);
  }
  78% {
    opacity: 1;
    transform: translate(10px, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(22px, -50%);
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
  font-weight: 500;
  font-size: var(--font-size-sm);
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
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
    outline: var(--focus-ring);
    outline-offset: 3px;
  }

  .copy-hint {
    flex-shrink: 0;
    line-height: 0;
    opacity: 0;
    pointer-events: none;
    color: var(--color-text-muted);

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
    left: 100%;
    top: 50%;
    margin-left: 0.35rem;
    white-space: nowrap;
    pointer-events: none;
    color: var(--color-text-muted);
    font-size: var(--font-size-2xs);
    animation: ${copiedTooltip} ${CONTACT_EMAIL_COPY_FEEDBACK_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
`;

export function CopyEmailButton() {
  const { showCopied, copyEmail } = useCopyEmail();

  return (
    <EmailButton type="button" onClick={copyEmail}>
      {CONTACT_EMAIL}
      <span className="copy-hint" aria-hidden={true}>
        <CopyIcon />
      </span>
      {showCopied ? <span className="copied-indicator">Copied!</span> : null}
    </EmailButton>
  );
}
