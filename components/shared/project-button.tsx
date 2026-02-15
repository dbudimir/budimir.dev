import type { ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ChevronIcon from '../icons/chevron';

interface ProjectButtonProps {
  title: ReactNode;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}

const Title = styled.h4<{ $isOpen: boolean }>`
  margin: 0;
  min-width: max-content;
  font-weight: var(--font-weight-normal);   
  text-transform: lowercase;
  pointer-events: none;
  line-height: 1;
  ${({ $isOpen }) => $isOpen && 'text-decoration: underline;'}
`;

const TitleDescription = styled.span<{ $isOpen: boolean }>`
  flex-grow: 1;
  overflow: visible;
  text-transform: lowercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-gray);
  font-size: var(--font-size-xs);
  -webkit-text-size-adjust: none;
  pointer-events: none;
  ${({ $isOpen }) => $isOpen && 'display: none;'}
  line-height: 1;
`;

const chevronBounce = keyframes`
  0%, 100% { transform: rotate(180deg) translateY(-2px); }
  30% { transform: rotate(180deg) translateY(1px); }
  60% { transform: rotate(180deg) translateY(-1px); }
`;

const StyledButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: flex-end;
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
    {isOpen && <ChevronIcon style={{ pointerEvents: 'none', height: 16 }} />}
  </StyledButton>
);

export default ProjectButton;
