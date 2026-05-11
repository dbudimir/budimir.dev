import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import ChevronIcon from '../icons/chevron';
import { sectionItemRowText } from './section-item.styles';

interface ProjectButtonProps {
  title: ReactNode;
  description: string;
  isOpen: boolean;
  isExperience: boolean;
  onClick: () => void;
}

const Title = styled.h4<{ $isOpen: boolean }>`
  margin: 0;
  min-width: max-content;
  ${sectionItemRowText}
  pointer-events: none;
  ${({ $isOpen }) => $isOpen && 'text-decoration: underline;'}
`;

const TitleDescription = styled.span`
  ${sectionItemRowText}
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  flex-grow: 1;
  min-width: 0;
  overflow: visible;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-gray);
  -webkit-text-size-adjust: none;
  pointer-events: none;
`;

const StyledButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    transform: rotate(180deg) translateY(-0.5px) translateX(-4px);
  }

  &:hover {
    cursor: pointer;

    ${Title} {
      text-decoration: underline;
    }

    ${TitleDescription} {
      color: var(--color-gray);
    }
  }
`;

function RowChevron() {
  return <ChevronIcon size={16} strokeWidth={1.5} style={{ pointerEvents: 'none' }} />;
}

const ProjectButton = ({ title, description, isOpen, isExperience, onClick }: ProjectButtonProps) => {
  /** Work: expanded panel repeats the copy below, so the row shows only a caret. */
  const workOpenCaretOnly = !isExperience && isOpen;

  const trailing: ReactNode = workOpenCaretOnly ? (
    <RowChevron />
  ) : (
    <>
      {description}
      {isOpen && <RowChevron />}
    </>
  );

  return (
    <StyledButton type="button" onClick={onClick} $isOpen={isOpen}>
      <Title $isOpen={isOpen}>{title}</Title>
      <TitleDescription>{trailing}</TitleDescription>
    </StyledButton>
  );
};

export default ProjectButton;
