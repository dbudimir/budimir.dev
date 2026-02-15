import styled from 'styled-components';

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .cover {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: var(--spacing-md);
    line-height: 1;
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-xl);

    @media screen and (max-width: 768px) {
      gap: var(--spacing-sm);
    }

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
          font-size: 16px;
          max-width: 600px;
        }

        .stack {
          margin: var(--spacing-lg) 0 0;
          width: 100%;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          font-size: 14px;
          max-width: 600px;

          b {
            font-weight: var(--font-weight-normal);
          }

          span {
            border: 1px solid gray;
            padding: 2px 4px;
            font-size: var(--font-size-xs);
            line-height: 1;
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
