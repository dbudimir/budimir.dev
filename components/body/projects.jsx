// Utils
import { useEffect, useRef } from "react";
import Image from "next/image";
import YouTube from "react-youtube";
import styled from "styled-components";
import data from "../../data/projects";
import { jobs } from "../../data/jobs";

// Components
import Nav from "./nav";
import LinkIcon from "../icons/link";

// Style
const ProjectContainer = styled.div`
  position: relative;
  padding-bottom: 200px;

  .work-history {
    scroll-behavior: smooth;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: max-content;
    margin: 24px auto 48px;

    h2 {
      margin: 0;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120%;
        height: 100%;
        opacity: 0.6;
        z-index: -1;
        background: url(../../static/images/brush-stroke-2.png) no-repeat center
          center;
        background-size: 100% 20%;
      }
    }

    span {
      font-size: 14px;
      font-weight: 500;

      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }

  #work {
    padding-top: 100px;
    margin-top: -60px;
  }

  #jobs {
    padding-top: 100px;
    margin-top: -60px;
  }

  .project-item {
    padding-bottom: 12px;
    margin-bottom: 32px;
    border-bottom: 1px solid #eeeef1;
    position: relative;
    overflow: hidden;
    padding-top: 60px;
    margin-top: -60px;

    h3 {
      text-transform: uppercase;
      margin: 0 0 12px 0;
    }

    .outer-container {
      position: relative;
      border-radius: 12px;
      max-width: 100%;
      width: 580px;
      overflow: scroll;
      overflow-y: hidden; /* Hide vertical scrollbar */

      /* width */
      ::-webkit-scrollbar {
        height: 4px;
        border-radius: 12px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #ffffff;

        border-radius: 12px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #a7f3d0;
        border-radius: 12px;
      }

      .image-slider {
        display: inline-flex;
        padding: 12px 12px 18px;

        .video-image-container {
          margin-right: 18px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);
          border-radius: 12px;
          overflow: hidden;
          width: max-content;
          display: flex;
          align-items: center;

          img {
            transform: scaleY(1.02) scaleX(1.01);
          }

          video,
          iframe {
            transform: scale(1.01);
            height: 240px;
            object-fit: scale-down;

            @media screen and (max-width: 768px) {
              height: 180px;
            }
          }

          iframe {
            @media screen and (max-width: 768px) {
              max-width: 300px;
            }
          }
        }
      }
    }

    .fade {
      background: #ffffff;
      top: 102px;
      box-shadow: rgb(0 0 0 / 44%) -4px 0px 17px 0px;
      height: 242px;
      margin: 12px 0px;
      position: absolute;
      right: -4px;
      width: 4px;
      z-index: 10;

      @media screen and (max-width: 768px) {
        height: 180px;
      }
    }
  }

  .tags {
    margin-top: 12px;
    margin-bottom: 18px;
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;

    span {
      background: #eeeef1;
      border-radius: 4px;
      margin-right: 6px;
      font-weight: 600;
      padding: 2px 6px;
      text-transform: uppercase;
      font-size: 14px;
      margin-bottom: 6px;
    }
  }

  .link {
    display: inline-flex;
    align-items: center;
    margin: 0 12px 12px 0;
    width: max-content;
    border: 1px solid #eeeef1;
    padding: 4px 12px;
    border-radius: 8px;
    transition: all 0.25s ease;

    a {
      font-weight: 600;
      text-decoration: none;
      color: #393939;
      font-weight: 600;
      margin-right: 8px;
    }

    svg {
      height: 14px;
      width: 14px;
    }

    &:hover {
      transform: scale(1.05);
      background-color: #eeeef1;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    }
  }

  .job-item {
    margin-bottom: 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 24px;
    border-bottom: 1px solid #eeeef1;

    .col {
      display: flex;
      flex-direction: column;
      margin-bottom: 18px;
      align-items: flex-start;
    }

    h3 {
      margin: 0px;
      width: 100%;

      span {
        font-size: 14px;
        font-weight: 500;
      }
    }

    .desc {
      margin-bottom: 18px;
    }

    a {
      color: #393939;
      text-decoration: none;
      font-weight: 600;
    }
  }
`;

const Projects = ({ showHeader, showNav, showProjectMenu }) => {
  //
  const workList = useRef(null);
  const jobsList = useRef(null);

  return (
    <ProjectContainer>
      <Nav
        data={data}
        showHeader={showHeader}
        showNav={showNav}
        showProjectMenu={showProjectMenu}
        jobsList={jobsList}
      />

      <div className="work-history" id="work" ref={workList}>
        <h2>Work Samples</h2>
      </div>
      {data.map(({ h3, videoId, images, description, tags, links }, i) => (
        <div className="project-item" key={h3} id={`project${i}`}>
          <div className="fade" />
          <h3>{h3}</h3>
          <div className="outer-container">
            <div className="image-slider">
              {
                // MP4 video type
                videoId === "squad" && (
                  <div className="video-image-container">
                    <video autoPlay loop muted playsInline preload="auto">
                      <source
                        src="../../static/images/squad-mini-demo.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )
              }
              {
                // MP4 video type
                videoId === "greywing" && (
                  <div className="video-image-container">
                    <video autoPlay loop muted playsInline preload="auto">
                      <source
                        src="../../static/images/grey-wing-ipad-demo.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )
              }
              {
                // Video if we have it
                videoId && videoId !== "squad" && videoId !== "greywing" && (
                  <div className="video-image-container">
                    <YouTube
                      videoId={videoId}
                      className="video"
                      opts={{
                        height: "240",
                        width: "420",
                        playerVars: { autoplay: 0, showinfo: 0 },
                      }}
                    />
                  </div>
                )
              }
              {
                // All images
                images.map((image) => (
                  <div className="video-image-container" key={image.alt}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      height={image.height}
                      width={image.width}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          {
            // Description
            description.map((line, index) => (
              <p key={index}>{line}</p>
            ))
          }
          <div className="tags">
            {
              // Tags
              tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))
            }
          </div>
          {
            // Links
            links.map((link, index) => (
              <div className="link" key={index}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.linkText}
                </a>
                <LinkIcon />
              </div>
            ))
          }
        </div>
      ))}
      <div className="work-history job-history" id="jobs" ref={jobsList}>
        <h2>Professional History</h2>
      </div>
      {jobs.map((job, index) => (
        <div className="job-item" key={index}>
          <div className="col">
            <h3>
              {job.company} <span>{job.companySubTitle}</span>
            </h3>
            <span className="role">{job.role}</span>
          </div>
          <div className="col">
            <span className="location">{job.location}</span>
            <span className="dates">{job.dates}</span>
          </div>
          <span className="desc">{job.desc}</span>
          <div className="link">
            <a href={job.link.url} target="_blank" rel="noreferrer">
              {job.link.linkText}
            </a>
            <LinkIcon />
          </div>
        </div>
      ))}
    </ProjectContainer>
  );
};

export default Projects;
