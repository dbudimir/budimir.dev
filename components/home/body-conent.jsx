import { useRef, createRef } from "react";
import Image from "next/image";
import YouTube from "react-youtube";

import LinkIcon from "../../components/icons/link.jsx";
import data from "../../data/projects";
import { jobs } from "../../data/jobs";

import styled from "styled-components";
import Chevron from "../icons/chevron";

const BodyContentContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;

  .cover {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 12px;
    line-height: 1;

    b {
      border-bottom: 6px solid rgb(255, 231, 161);
      border-left: 6px solid rgb(255, 231, 161);
    }
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    @media screen and (max-width: 768px) {
      gap: 8px;
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
            margin-top: 12px;
          }

          h4 {
            font-weight: 700;
          }

          .title-description {
            display: none;
          }
        }

        .project-content {
          margin: 0px 0 24px;
          max-height: 800px;
          transition: all 0.35s ease-out;
        }
      }

      .project-title {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        gap: 4px;

        h4 {
          margin: 0;
          min-width: max-content;
          font-weight: 400;
          text-transform: lowercase;
          pointer-events: none;
        }

        span {
          flex-grow: 1;
          overflow: hidden;
          text-transform: lowercase;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: visible;
          color: #b0aeae;
          font-size: 12px;
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
          margin: 12px 0;
          font-size: 16px;
          max-width: 600px;
        }

        .bullets {
          margin: 0 0 8px 0px;
          font-size: 14px;
          max-width: 600px;
          display: flex;
          align-items: flex-start;
          gap: 12px;

          span {
            font-size: 10px;
            transform: translateY(3px);
          }
        }

        .stack {
          margin: 18px 0 0;
          width: 100%;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          font-size: 14px;
          flex-wrap: wrap;
          max-width: 600px;

          b {
            font-weight: 400;
          }

          span {
            border: 1px solid gray;
            padding: 2px 4px;
            font-size: 12px;
            line-height: 1;
            border-radius: 4px;
            color: gray;
          }
        }

        .tag-row {
          margin: 18px 0 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
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
          margin: 24px 0 0 0;
          padding-bottom: 12px;

          > * {
            margin-left: 10px;
            border: 2px solid #eeeef1;
            border-radius: 20px;
            max-height: 250px;

            iframe {
              border-radius: 20px;
            }
          }

          /* width */
          ::-webkit-scrollbar {
            height: 2px;
            border-radius: 12px;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            background: #ffffff;
            border-radius: 12px;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: rgb(255, 231, 161);
            border-radius: 12px;
          }
        }

        .spacer {
          height: 2px;
          width: 25%;
          background-color: #454545;
          margin: 24px 0;
        }
      }
    }
  }
`;

const BodyContent = (props) => {
  const projectRefs = useRef([null]);
  const jobRefs = useRef([null]);

  const onProjectClick = (e, type) => {
    e.preventDefault();

    const id = e.target.id.slice(-1);
    const selectedItem =
      type === "project"
        ? projectRefs.current[id].current
        : jobRefs.current[id].current;

    if (selectedItem.classList.contains("open")) {
      selectedItem.classList.remove("open");
    } else {
      selectedItem.classList.add("open");
    }
  };

  return (
    <BodyContentContainer>
      <div className="spacer" />
      <div className="cover">
        <b>experience</b>
      </div>
      <div className="content">
        {jobs.map((job, i) => {
          jobRefs.current[i] = jobRefs.current[i] || createRef();

          return (
            <div key={`job${i}`} ref={jobRefs.current[i]} className="project">
              <div
                onClick={(e) => onProjectClick(e, "job")}
                id={`project${i}`}
                className="project-title "
              >
                <h4>
                  {job.company} {job.companySubTitle}
                </h4>
                <span className="title-description">{job.role}</span>
                <Chevron className="chevron" />
              </div>
              <div className="project-content">
                <p className="description">{job.desc}</p>
                {job.bullets &&
                  job.bullets.map((bullet, i) => (
                    <p className="bullets" key={i}>
                      <span>→</span> {bullet}
                    </p>
                  ))}

                {job.tags?.length && (
                  <div className="tags stack">
                    {
                      // Tags
                      job.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))
                    }
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
          );
        })}
      </div>
      <div className="cover">
        <b>work samples</b>
      </div>
      <div className="content">
        {data.map((project, i) => {
          projectRefs.current[i] = projectRefs.current[i] || createRef();

          return (
            <div
              key={`project${i}`}
              ref={projectRefs.current[i]}
              className="project"
            >
              <div
                onClick={(e) => onProjectClick(e, "project")}
                id={`project${i}`}
                className="project-title"
              >
                <h4>{project.h3}</h4>
                <span className="title-description">
                  {project.description[0]}
                </span>
                <Chevron />
              </div>

              <div className="project-content">
                {/* Description */}
                <p className="description">
                  →{" "}
                  {project.description.map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </p>

                {/* Images */}
                <div className="image-row">
                  {
                    // MP4 video type
                    project.videoId === "squad" && (
                      <video autoPlay loop muted playsInline preload="auto">
                        <source
                          src="../../static/images/squad-mini-demo.mp4"
                          type="video/mp4"
                        />
                      </video>
                    )
                  }
                  {
                    // MP4 video type
                    project.videoId === "greywing" && (
                      <video autoPlay loop muted playsInline preload="auto">
                        <source
                          src="../../static/images/grey-wing-ipad-demo.mp4"
                          type="video/mp4"
                        />
                      </video>
                    )
                  }
                  {
                    // Video if we have it
                    project.videoId &&
                      project.videoId !== "squad" &&
                      project.videoId !== "greywing" && (
                        <YouTube
                          videoId={project.videoId}
                          className="video"
                          opts={{
                            height: "240",
                            width: "420",
                            playerVars: { autoplay: 0, showinfo: 0 },
                          }}
                        />
                      )
                  }
                  {
                    // All images
                    project.images.map((image) => (
                      <Image
                        key={image.alt}
                        src={image.src}
                        alt={image.alt}
                        height={image.height}
                        width={image.width}
                      />
                    ))
                  }
                </div>

                <div className="tags stack">
                  {
                    // Tags
                    project.tags.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))
                  }
                </div>

                <div className="tag-row">
                  {/* Links */}
                  <div className="links">
                    {project.links.map((link, index) => (
                      <div className="link" key={index}>
                        <a href={link.url} target="_blank" rel="noreferrer">
                          {link.linkText}
                        </a>
                        <LinkIcon />
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="spacer"></div> */}
              </div>
            </div>
          );
        })}
      </div>
    </BodyContentContainer>
  );
};

export default BodyContent;
