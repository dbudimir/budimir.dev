'use client';

import styled from 'styled-components';
import { jobs } from '../../data/jobs';
import { useToggleSet } from '../../lib/hooks/use-toggle-set';
import { ExternalLink } from '../shared/external-link';
import ProjectButton from '../shared/project-button';
import { TagList } from '../shared/tag-list';
import SectionContainer from './section.styles';

const ExperienceContainer = styled(SectionContainer)`
  .content .project .project-content {
    .bullets {
      margin: 0 0 var(--spacing-sm) 0;
      font-family: var(--font-geist-sans), system-ui, sans-serif;
      font-size: var(--font-size-sm);
      max-width: 600px;
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);

      span {
        flex-shrink: 0;
        transform: translateY(2px);
      }
    }
  }
`;

const Experience = () => {
  const [openJobs, toggleJob] = useToggleSet<number>();

  return (
    <ExperienceContainer>
      <div className="cover">
        <b>experience</b>
      </div>
      <div className="content">
        {jobs.map((job, i) => (
          <div key={job.company} className={`project ${openJobs.has(i) ? 'open' : ''}`}>
            <ProjectButton
              title={
                <>
                  {job.company} {job.companySubTitle}
                </>
              }
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

              {job.tags && job.tags.length > 0 && <TagList tags={job.tags} />}

              <div className="tag-row">
                <div className="tags">
                  <span className="location">{job.location}</span>
                  <span className="dates">{job.dates}</span>
                </div>

                <div className="links">
                  <ExternalLink className="link" href={job.link.url} iconSize={14}>
                    {job.link.linkText}
                  </ExternalLink>
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
