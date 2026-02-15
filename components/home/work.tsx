'use client';

import Image from 'next/image';
import { useState } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import projects from '../../data/projects';
import type { Project } from '../../types';
import ChevronIcon from '../icons/chevron';
import LinkIcon from '../icons/link';

const WorkContainer = styled.div`
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

    b {
      border-bottom: 6px solid var(--color-accent);
      border-left: 6px solid var(--color-accent);
    }
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

      :not(.open) {
        .project-title {
          transition: all 0.25s ease-out;

          svg {
            display: none;
          }
        }
      }

      &.open {
        .project-title {
          transition: all 0.25s ease-out;

          :not(#project0) {
            margin-top: var(--spacing-md);
          }

          h4 {
            font-weight: var(--font-weight-bold);
          }

          .title-description {
            display: none;
          }
        }

        .project-content {
          margin: 0 0 var(--spacing-xl);
          max-height: 800px;
          transition: var(--transition-slow);
        }
      }

      .project-title {
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

        h4 {
          margin: 0;
          min-width: max-content;
          font-weight: var(--font-weight-normal);
          text-transform: lowercase;
          pointer-events: none;
        }

        span {
          flex-grow: 1;
          overflow: visible;
          text-transform: lowercase;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--color-gray);
          font-size: var(--font-size-xs);
          -webkit-text-size-adjust: none;
          pointer-events: none;
        }

        svg {
          pointer-events: none;
          transform: rotate(180deg) translateY(-2px);
          height: 16px;
        }

        &:hover {
          cursor: pointer;

          h4 {
            text-decoration: underline;
          }

          span {
            color: gray;
          }
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

            svg {
              height: 14px;
            }
          }
        }

        .image-row {
          width: 100%;
          display: flex;
          gap: 6px;
          overflow-x: scroll;
          margin: var(--spacing-xl) 0 0 0;
          padding-bottom: var(--spacing-md);

          > * {
            margin-left: 10px;
            border: 2px solid var(--color-border);
            border-radius: 20px;
            max-height: 250px;

            iframe {
              border-radius: 20px;
            }
          }

          ::-webkit-scrollbar {
            height: 2px;
            border-radius: 12px;
          }

          ::-webkit-scrollbar-track {
            background: var(--color-background);
            border-radius: 12px;
          }

          ::-webkit-scrollbar-thumb {
            background: var(--color-accent);
            border-radius: 12px;
          }
        }
      }
    }
  }
`;

interface VideoMediaProps {
  videoId: Project['videoId'];
}

const VideoMedia = ({ videoId }: VideoMediaProps) => {
  if (videoId === 'squad') {
    return (
      <video autoPlay loop muted playsInline preload="auto">
        <source src="../../static/images/squad-mini-demo.mp4" type="video/mp4" />
      </video>
    );
  }

  if (videoId === 'greywing') {
    return (
      <video autoPlay loop muted playsInline preload="auto">
        <source src="../../static/images/grey-wing-ipad-demo.mp4" type="video/mp4" />
      </video>
    );
  }

  if (videoId) {
    return (
      <YouTube
        videoId={videoId}
        className="video"
        opts={{
          height: '240',
          width: '420',
          playerVars: { autoplay: 0, showinfo: 0 },
        }}
      />
    );
  }

  return null;
};

const Work = () => {
  const [openProjects, setOpenProjects] = useState<Set<number>>(new Set());

  const toggleProject = (index: number) => {
    setOpenProjects(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <WorkContainer>
      <div className="cover">
        <b>work samples</b>
      </div>
      <div className="content">
        {projects.map((project, i) => (
          <div key={project.h3} className={`project ${openProjects.has(i) ? 'open' : ''}`}>
            <button type="button" onClick={() => toggleProject(i)} className="project-title">
              <h4>{project.h3}</h4>
              <span className="title-description">{project.description[0]}</span>
              <ChevronIcon />
            </button>

            <div className="project-content">
              <p className="description">
                →{' '}
                {project.description.map(line => (
                  <span key={line}>{line} </span>
                ))}
              </p>

              <div className="image-row">
                <VideoMedia videoId={project.videoId} />
                {project.images.map(image => (
                  <Image key={image.alt} src={image.src} alt={image.alt} height={image.height} width={image.width} />
                ))}
              </div>

              <div className="tags stack">
                {project.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="tag-row">
                <div className="links">
                  {project.links.map(link => (
                    <div className="link" key={link.url}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.linkText}
                      </a>
                      <LinkIcon />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WorkContainer>
  );
};

export default Work;
