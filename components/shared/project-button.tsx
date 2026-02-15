import type { ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ChevronIcon from '../icons/chevron';

interface ProjectButtonProps {
  title: ReactNode;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}

const TitleDescription = styled.span<{ $hidden: boolean }>`
  flex-grow: 1;
  overflow: visible;
  text-transform: lowercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-gray);
  font-size: var(--font-size-xs);
  -webkit-text-size-adjust: none;
  pointer-events: none;
  ${({ $hidden }) => $hidden && 'display: none;'}
`;

const chevronBounce = keyframes`
  0%, 100% { transform: rotate(180deg) translateY(-2px); }
  30% { transform: rotate(180deg) translateY(1px); }
  60% { transform: rotate(180deg) translateY(-1px); }
`;

const StyledButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  min-height: 20px;
  gap: var(--spacing-xs);
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  text-align: left;
  width: 100%;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transition: all 0.25s ease-out;

      h4 {
        font-weight: var(--font-weight-bold);
      }
    `}

  h4 {
    margin: 0;
    min-width: max-content;
    font-weight: var(--font-weight-normal);
    text-transform: lowercase;
    pointer-events: none;
  }

  svg {
    pointer-events: none;
    transform: rotate(180deg) translateY(-1px);
    height: 16px;
  }

  &:hover {
    cursor: pointer;

    h4 {
      text-decoration: underline;
    }

    ${TitleDescription} {
      color: gray;
    }

    ${({ $isOpen }) =>
      $isOpen &&
      css`
        svg {
          animation: ${chevronBounce} 0.4s ease-in-out;
        }
      `}
  }
`;

const ProjectButton = ({ title, description, isOpen, onClick }: ProjectButtonProps) => (
  <StyledButton type="button" onClick={onClick} $isOpen={isOpen}>
    <h4>{title}</h4>
    <TitleDescription $hidden={isOpen}>{description}</TitleDescription>
    {isOpen && <ChevronIcon />}
  </StyledButton>
);

export default ProjectButton;
