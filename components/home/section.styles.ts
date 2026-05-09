import styled from 'styled-components';
import { sectionContentStackStyles, sectionCoverStyles } from '../shared/section-item.styles';

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .cover {
    ${sectionCoverStyles}
  }

  .content {
    ${sectionContentStackStyles}
    margin-bottom: var(--spacing-xl);

    .project {
      display: flex;
      width: 100%;
      overflow: hidden;
      flex-direction: column;

      &.open {
        .project-content {
          margin: 0 0 var(--spacing-xl);
          max-height: 800px;
          transition: var(--transition-slow);
        }
      }

      .project-content {
        max-height: 0;
        margin: 0;
        transition: all 0.25s ease-out;
        overflow: hidden;

        .description {
          margin: var(--spacing-md) 0;
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: var(--font-size-sm);
          max-width: 600px;
        }

        .stack {
          margin: var(--spacing-lg) 0 0;
          width: 100%;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          font-size: var(--font-size-2xs);
          max-width: 600px;

          b {
            font-weight: var(--font-weight-normal);
          }

          span {
            border: 1px solid gray;
            padding: 2px 4px;
            font-size: var(--font-size-2xs);
            line-height: 1.2;
            border-radius: 4px;
            color: gray;
          }
        }

        .tag-row {
          margin: var(--spacing-lg) 0 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
          font-size: 14px;
          max-width: 600px;

          .links,
          .tags {
            display: flex;
            width: max-content;
            gap: 6px;
            flex-wrap: wrap;
            text-transform: lowercase;
          }

          .tags {
            color: gray;
          }

          .link {
            display: flex;
            align-items: center;

            a {
              text-decoration: none;
            }
          }
        }
      }
    }
  }
`;

export default SectionContainer;
