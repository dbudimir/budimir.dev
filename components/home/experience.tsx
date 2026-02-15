'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { jobs } from '../../data/jobs';
import LinkIcon from '../icons/link';
import ProjectButton from '../shared/project-button';
import SectionContainer from './section.styles';

const ExperienceContainer = styled(SectionContainer)`
  .content .project .project-content {
    .bullets {
      margin: 0 0 var(--spacing-sm) 0;
      font-size: 14px;
      max-width: 600px;
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);

      span {
        font-size: 10px;
        transform: translateY(3px);
      }
    }
  }
`;

const Experience = () => {
  const [openJobs, setOpenJobs] = useState<Set<number>>(new Set());

  const toggleJob = (index: number) => {
    setOpenJobs(prev => {
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
    <ExperienceContainer>
      <div className="cover">
        <b>experience</b>
      </div>
      <div className="content">
        {jobs.map((job, i) => (
          <div key={job.company} className={`project ${openJobs.has(i) ? 'open' : ''}`}>
            <ProjectButton
              title={<>{job.company} {job.companySubTitle}</>}
              description={job.role}
              isOpen={openJobs.has(i)}
              onClick={() => toggleJob(i)}
            />

            <div className="project-content">
              <p className="description">{job.desc}</p>

              {job.bullets?.map(bullet => (
                <p className="bullets" key={bullet}>
                  <span>→</span> {bullet}
                </p>
              ))}

              {job.tags && job.tags.length > 0 && (
                <div className="tags stack">
                  {job.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}

              <div className="tag-row">
                <div className="tags">
                  <span className="location">{job.location}</span>
                  <span className="dates">{job.dates}</span>
                </div>
                <div className="links">
                  <div className="link">
                    <a href={job.link.url} target="_blank" rel="noreferrer">
                      {job.link.linkText}
                    </a>
                    <LinkIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ExperienceContainer>
  );
};

export default Experience;
