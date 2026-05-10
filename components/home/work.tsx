'use client';

import Image from 'next/image';
import { useState } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import projects from '../../data/projects';
import type { VideoSource } from '../../types';
import LinkIcon from '../icons/link';
import ProjectButton from '../shared/project-button';
import SectionContainer from './section.styles';

/** Fixed height matches most project thumbs (242 in data); keeps every slot the same visual size. */
const THUMB_H = 242;

const YOUTUBE_OPTS = {
  height: '240',
  width: '420',
  playerVars: { autoplay: 0, showinfo: 0 },
} as const;

const ThumbSlot = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
  height: ${THUMB_H}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;

  /* next/image wraps the img in a span; stretch it so the img can use height: 100% */
  & > span {
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 100% !important;
    width: auto !important;
    max-width: none !important;
  }

  img {
    display: block;
    width: auto !important;
    height: 100% !important;
    max-height: none !important;
    object-fit: contain;
  }

  video,
  iframe {
    max-height: 100%;
    border-radius: 10px;
  }
`;

const WorkContainer = styled(SectionContainer)`
  .content .project .project-content {
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
  }
`;

interface VideoMediaProps {
  video: VideoSource;
}

const VideoMedia = ({ video }: VideoMediaProps) => {
  switch (video.kind) {
    case 'mp4':
      return (
        <video autoPlay loop muted playsInline preload="none">
          <source src={video.src} type="video/mp4" />
        </video>
      );
    case 'youtube':
      return <YouTube videoId={video.id} className="video" opts={YOUTUBE_OPTS} />;
  }
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
          <div key={project.title} className={`project ${openProjects.has(i) ? 'open' : ''}`}>
            <ProjectButton
              title={project.title}
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
                {project.video ? (
                  <ThumbSlot>
                    <VideoMedia video={project.video} />
                  </ThumbSlot>
                ) : null}
                {project.images.map(image => (
                  <ThumbSlot key={image.alt}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      height={image.height}
                      width={image.width}
                      sizes="(max-width: 900px) 70vw, 480px"
                    />
                  </ThumbSlot>
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
