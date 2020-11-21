// Utils
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import data from '../../data/projects'
import jobs from '../../data/jobs'

// Components
import LinkIcon from '../icons/link'

// Style
const ProjectContainer = styled.div`
   position: relative;
   padding-bottom: 200px;

   .work-history {
      scroll-behavior: smooth;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: url(../../static/images/brush-stroke-2.png) no-repeat center bottom;
      background-size: 100% 20%;
      width: max-content;
      margin: 24px auto 48px;

      h2 {
         margin: 0;
         margin-right: 12px;
      }

      span {
         font-size: 14px;
         font-weight: 500;

         @media screen and (max-width: 768px) {
            display: none;
         }
      }
   }

   .job-history {
      margin-top: 48px;
   }

   .project-item {
      padding-bottom: 12px;
      margin-bottom: 32px;
      border-bottom: 1px solid #eeeef1;

      h3 {
         text-transform: uppercase;
         margin: 0 0 12px 0;
      }

      .outer-container {
         position: relative;
         box-shadow: inset rgb(0 0 0 / 11%) -2px 0px 12px 0px;
         border-radius: 12px;
         overflow: hidden;

         .image-outer {
            max-width: 100%;
            width: 580px;
            overflow: auto;

            .image-slider {
               display: inline-flex;
               padding: 12px;

               .video-image-container {
                  margin-right: 18px;
                  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);
                  border-radius: 12px;
                  overflow: hidden;
                  display: flex;

                  img,
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
            bottom: 0px;
            box-shadow: rgb(0 0 0 / 44%) -4px 0px 17px 0px;
            height: 242px;
            margin: 12px 0px;
            position: absolute;
            right: -4px;
            width: 4px;

            @media screen and (max-width: 768px) {
               height: 180px;
            }
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
         /* background: #badbfa; */
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
      }

      h3 {
         margin: 0px;
         width: 100%;
      }

      .desc {
         margin-bottom: 18px;
      }

      a {
         color: #393939;
         text-decoration: none;
         font-weight: 600;
      }

      &:last-of-type {
         padding-bottom: 72px;
      }
   }
`

const Projects = ({ showHeader }) => {
   const workButton = useRef(null)
   const jobButton = useRef(null)
   const resumeButton = useRef(null)
   //
   const workList = useRef(null)
   const jobsList = useRef(null)

   const mouseOver = (e, ref) => {
      console.log(window.innerWidth)

      e.stopPropagation()

      const elm = ref.current

      const bounds = e.target.getBoundingClientRect()

      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top

      const cursFromCenterX = elm.offsetWidth / 2 - x
      const cursFromCenterY = elm.offsetHeight / 2 - y

      e.target.tagName !== 'IMG' &&
         window.innerWidth > 768 &&
         elm.setAttribute(
            'style',
            `transform: perspective(100px) rotateX(${cursFromCenterY / 4}deg) rotateY(${-(
               cursFromCenterX / 30
            )}deg) translateZ(6px); -webkit-transform: perspective(100px) rotateX(${
               cursFromCenterY / 4
            }deg) rotateY(${-(cursFromCenterX / 30)}deg) translateZ(6px);`
         )
   }

   const mouseLeave = (e, ref) => { ref.current.setAttribute('style', '') } // prettier-ignore

   const activeArea = () => {
      // console.log(window.pageYOffset > workList.current.offsetTop)

      window.pageYOffset > workList.current.offsetTop && window.pageYOffset < jobsList.current.offsetTop
         ? workButton.current.classList.add('active')
         : workButton.current.classList.remove('active')
      //

      window.pageYOffset > jobsList.current.offsetTop
         ? jobButton.current.classList.add('active')
         : jobButton.current.classList.remove('active')
   }

   useEffect(() => {
      window.addEventListener('scroll', activeArea, { passive: true })
   }, [])

   return (
      <ProjectContainer>
         <div className={`nav ${showHeader && 'show'}`}>
            <a
               className="work-button"
               href="/#work"
               ref={workButton}
               onMouseMove={(e) => mouseOver(e, workButton)}
               onMouseLeave={(e) => mouseLeave(e, workButton)}
            >
               Work Samples
            </a>
            <a
               className="job-history-button"
               href="/#jobs"
               ref={jobButton}
               onMouseMove={(e) => mouseOver(e, jobButton)}
               onMouseLeave={(e) => mouseLeave(e, jobButton)}
            >
               Professional History
            </a>
            <a
               className="resume-button"
               href="../static/pdfs/david-budimir-resume.pdf"
               target="_blank"
               ref={resumeButton}
               onMouseMove={(e) => mouseOver(e, resumeButton)}
               onMouseLeave={(e) => mouseLeave(e, resumeButton)}
            >
               View Resume
               <img src="../static/icons/pdf-icon.png" alt="View resume" />
            </a>
         </div>
         <div className="work-history" id="work" ref={workList}>
            <h2>Work Samples</h2>
         </div>
         {data.map((project) => {
            const { h3, videoId, images, description, tags, links } = project

            return (
               <div className="project-item" key={h3}>
                  <h3>{h3}</h3>
                  <div className="outer-container">
                     <div className="image-outer">
                        <div className="image-slider">
                           {
                              // MP4 video type
                              videoId === 'squad' && (
                                 <div className="video-image-container">
                                    <video autoPlay loop muted playsInline>
                                       <source src="../../static/images/squad-mini-demo.mp4" type="video/mp4" />
                                    </video>
                                 </div>
                              )
                           }
                           {
                              // Video if we have it
                              videoId && videoId !== 'squad' && (
                                 <YouTube
                                    videoId={videoId}
                                    className="video"
                                    containerClassName="video-image-container"
                                    opts={{ height: '240', width: '420', playerVars: { autoplay: 0, showinfo: 0 } }}
                                 />
                              )
                           }
                           {
                              // All images
                              images.map((image) => {
                                 console.log(image.src)
                                 return (
                                    <div className="video-image-container" key={image.alt}>
                                       <img src={image.src} alt={image.alt} />
                                    </div>
                                 )
                              })
                           }
                        </div>
                     </div>
                     <div className="fade" />
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
            )
         })}
         <div className="work-history job-history" id="jobs" ref={jobsList}>
            <h2>Professional History</h2>
         </div>
         {jobs.map((job, index) => (
            <div className="job-item" key={index}>
               <div className="col">
                  <h3>{job.company}</h3>
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
   )
}

export default Projects
