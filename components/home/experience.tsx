'use client';

import styled from 'styled-components';
import { jobs } from '../../data/jobs';
import { useToggleSet } from '../../lib/hooks/use-toggle-set';
import { ExternalLink } from '../shared/external-link';
import { IconArrow } from '../shared/icon-arrow';
import ProjectButton from '../shared/project-button';
import { TagList } from '../shared/tag-list';
import { TagRow } from '../shared/tag-row';
import SectionContainer from './section.styles';

const ExperienceSection = styled(SectionContainer)`
  font-family: var(--font-geist-mono), ui-monospace, monospace;

  .project-content .description,
  .project-content .bullets {
    font-family: var(--font-geist-mono), ui-monospace, monospace;
  }

  .project-content .tag-row,
  .project-content .stack {
    font-family: var(--font-geist-mono), ui-monospace, monospace;
  }
`;

/** Smaller, muted line next to the company name (e.g. acquisition context). */
const CompanySubtitle = styled.span`
  font-size: var(--font-size-2xs);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-normal);
  letter-spacing: 0.03em;
  vertical-align: baseline;
`;

const Experience = () => {
  const [openJobs, toggleJob] = useToggleSet<number>();

  return (
    <ExperienceSection>
      <div className="cover">
        <b>experience</b>
      </div>
      <div className="content">
        {jobs.map((job, i) => (
          <div key={job.company} className={`project ${openJobs.has(i) ? 'open' : ''}`}>
            <ProjectButton
              title={
                <>
                  {job.company}
                  {job.companySubTitle ? (
                    <>
                      {' '}
                      <CompanySubtitle>{job.companySubTitle}</CompanySubtitle>
                    </>
                  ) : null}
                </>
              }
              description={job.role}
              isExperience={true}
              isOpen={openJobs.has(i)}
              onClick={() => toggleJob(i)}
            />

            <div className="project-content">
              <div className="job-detail-head">
                <span className="job-meta-secondary location">{job.location}</span>
                <span className="job-meta-sep" aria-hidden>
                  ·
                </span>
                <span className="job-meta-secondary dates">{job.dates}</span>
              </div>

              <p className="description">{job.desc}</p>

              {job.bullets?.map(bullet => (
                <p className="bullets" key={bullet}>
                  <IconArrow aria-hidden>→</IconArrow> {bullet}
                </p>
              ))}

              {job.tags && job.tags.length > 0 && <TagList tags={job.tags} />}

              <TagRow>
                <ExternalLink className="link" href={job.link.url}>
                  {job.link.linkText}
                </ExternalLink>
              </TagRow>
            </div>
          </div>
        ))}
      </div>
    </ExperienceSection>
  );
};

export default Experience;
