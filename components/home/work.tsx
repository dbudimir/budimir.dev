'use client';

import Image from 'next/image';
import { useState } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import projects from '../../data/projects';
import type { Project } from '../../types';
import LinkIcon from '../icons/link';
import ProjectButton from '../shared/project-button';
import SectionContainer from './section.styles';

const WorkContainer = styled(SectionContainer)`
  .content .project .project-content {
    .image-row {
      width: 100%;
      display: flex;
      gap: 6px;
      overflow-x: auto;
      margin: var(--spacing-xl) 0 0 0;
      padding-bottom: var(--spacing-md);
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */

      &::-webkit-scrollbar {
        display: none; /* Chrome/Safari/Opera */
      }

      > * {
        margin-left: 10px;
        border: 2px solid var(--color-border);
        border-radius: 20px;
        max-height: 250px;

        iframe {
          border-radius: 20px;
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
            <ProjectButton
              title={project.h3}
              description={project.description[0]}
              isOpen={openProjects.has(i)}
              onClick={() => toggleProject(i)}
            />

            <div className="project-content">
              <p className="description">
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
                      <LinkIcon style={{ height: 14 }} />
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
