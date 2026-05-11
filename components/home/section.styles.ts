import styled from 'styled-components';
import { projectContentBodyText, sectionContentStackStyles, sectionCoverStyles } from '../shared/section-item.styles';

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .cover {
    ${sectionCoverStyles}
  }

  .content {
    ${sectionContentStackStyles}

    .project {
      display: flex;
      width: 100%;
      overflow: hidden;
      flex-direction: column;

      &.open {
        .project-content {
          max-height: 800px;
          transition: var(--transition-slow);
          padding-bottom: var(--spacing-lg);
          margin-bottom: var(--spacing-md);

          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 12px;
            height: 1px;
            background: rgba(69, 69, 69, 0.45);
          }
        }
      }

      .project-content {
        position: relative;
        max-height: 0;
        margin: 0;
        transition: all 0.25s ease-out;
        overflow: hidden;

        .job-detail-head {
          margin-top: var(--spacing-md);
          max-width: 100%;
          display: flex;
          flex-wrap: nowrap;
          align-items: baseline;
          gap: 0.35em 0.65em;
          font-size: var(--font-size-xs);
          line-height: 1.35;
          white-space: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }

        .job-role {
          margin: 0;
          flex-shrink: 0;
          font-weight: var(--font-weight-bold);
        }

        .job-meta-secondary {
          flex-shrink: 0;
          color: var(--color-gray-mid);
          font-weight: var(--font-weight-normal);
        }

        .job-meta-sep {
          flex-shrink: 0;
          color: var(--color-gray-mid);
          opacity: 0.55;
          user-select: none;
        }

        .description {
          margin: var(--spacing-md) 0;
          ${projectContentBodyText}
        }

        .bullets {
          margin: 0 0 var(--spacing-sm) 0;
          ${projectContentBodyText}
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);

          span {
            flex-shrink: 0;
            display: inline-block;
            transform: translateY(.4em);
          }
        }

        .image-row {
          width: 100%;
          display: flex;
          align-items: stretch;
          gap: 6px;
          overflow-x: auto;
          margin: var(--spacing-xl) 0 0 0;
          padding-bottom: var(--spacing-md);
          padding-left: 10px;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */

          &::-webkit-scrollbar {
            display: none; /* Chrome/Safari/Opera */
          }
        }

        .stack {
          margin: var(--spacing-lg) 0 0;
          width: 100%;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          font-size: var(--font-size-2xs);
          max-width: var(--content-max-width);

          b {
            font-weight: var(--font-weight-normal);
          }

          span {
            border: 1px solid var(--color-gray-mid);
            padding: 2px 4px;
            font-size: var(--font-size-2xs);
            line-height: 1.2;
            border-radius: 4px;
            color: var(--color-gray-mid);
          }
        }

        .tag-row {
          margin: var(--spacing-lg) 0 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
          font-size: 12px;
          max-width: var(--content-max-width);

          .links,
          .tags {
            display: flex;
            width: max-content;
            gap: 6px;
            flex-wrap: wrap;
          }

          .tags {
            color: var(--color-gray-mid);
          }

          .link {
            display: inline-flex;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
        }
      }
    }
  }
`;

export default SectionContainer;
