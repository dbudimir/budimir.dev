'use client';

import Image from 'next/image';
import styled from 'styled-components';
import projects from '../../data/projects';
import { useToggleSet } from '../../lib/hooks/use-toggle-set';
import type { VideoSource } from '../../types';
import { ExternalLink } from '../shared/external-link';
import ProjectButton from '../shared/project-button';
import { TagList } from '../shared/tag-list';
import { TagRow } from '../shared/tag-row';
import SectionContainer from './section.styles';

/** Fixed height matches most project thumbs (242 in data); keeps every slot the same visual size. */
const THUMB_H = 242;

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
      return (
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title="YouTube video player"
          width="420"
          height="240"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
  }
};

const Work = () => {
  const [openProjects, toggleProject] = useToggleSet<number>();

  return (
    <SectionContainer>
      <div className="cover">
        <b>work samples</b>
      </div>
      <div className="content">
        {projects.map((project, i) => (
          <div key={project.title} className={`project ${openProjects.has(i) ? 'open' : ''}`}>
            <ProjectButton
              title={project.title}
              description={project.description[0]}
              onClick={() => toggleProject(i)}
              isExperience={false}
              isOpen={openProjects.has(i)}
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

              <TagList tags={project.tags} />

              <TagRow>
                {project.links.map(link => (
                  <ExternalLink key={link.url} className="link" href={link.url}>
                    {link.linkText}
                  </ExternalLink>
                ))}
              </TagRow>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Work;
