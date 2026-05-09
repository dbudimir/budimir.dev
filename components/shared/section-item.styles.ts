import { css } from 'styled-components';

/** Matches experience / work section headings (`.cover`). */
export const sectionCoverStyles = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: var(--spacing-md);
  line-height: 1;
`;

/** Vertical rhythm between rows inside a section’s item list (`.content` or contact links). */
export const sectionContentStackStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-sm);
`;

/** Shared label line for contact links and accordion triggers. */
export const sectionItemRowText = css`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
  line-height: 1.25;
  text-transform: lowercase;
`;
