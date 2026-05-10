import type { ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ChevronIcon from '../icons/chevron';
import { sectionItemRowText } from './section-item.styles';

interface ProjectButtonProps {
  title: ReactNode;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}

const Title = styled.h4<{ $isOpen: boolean }>`
  margin: 0;
  min-width: max-content;
  ${sectionItemRowText}
  pointer-events: none;
  ${({ $isOpen }) => $isOpen && 'text-decoration: underline;'}
`;

const TitleDescription = styled.span<{ $isOpen: boolean }>`
  ${sectionItemRowText}
  flex-grow: 1;
  overflow: visible;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-gray);
  -webkit-text-size-adjust: none;
  pointer-events: none;
  ${({ $isOpen }) => $isOpen && 'display: none;'}
`;

const chevronBounce = keyframes`
  0%, 100% { transform: rotate(180deg) translateY(-2px); }
  30% { transform: rotate(180deg) translateY(1px); }
  60% { transform: rotate(180deg) translateY(-1px); }
`;

const StyledButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  min-height: 1.25em;
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
    `}

  svg {
    transform: rotate(180deg) translateY(-1px);
  }

  &:hover {
    cursor: pointer;

    ${Title} {
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
    <Title $isOpen={isOpen}>{title}</Title>
    <TitleDescription $isOpen={isOpen}>{description}</TitleDescription>
    {isOpen && <ChevronIcon size={16} style={{ pointerEvents: 'none' }} />}
  </StyledButton>
);

export default ProjectButton;
