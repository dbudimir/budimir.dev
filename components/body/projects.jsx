import YouTube from 'react-youtube'
import styled from 'styled-components'
import data from '../../data/projects'

const ProjectContainer = styled.div`
   .project-item {
      padding-bottom: 24px;
      margin-bottom: 24px;
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
            max-width: 580px;
            overflow: scroll;

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
                     transform: scale(1.005);
                     height: 240px;
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
         }
      }
   }

   .tags {
      margin-bottom: 24px;

      span {
         background: #badbfa;
         border-radius: 4px;
         margin-right: 6px;
         font-weight: 600;
         padding: 2px 6px;
         text-transform: uppercase;
         font-size: 14px;
      }
   }

   a {
      font-weight: 600;
      margin: 0 12px 12px 0;
   }
`

const Projects = () => {
   console.log('test')

   return (
      <ProjectContainer>
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
                              images.map((image) => (
                                 <div className="video-image-container">
                                    <img src={image.src} alt={image.alt} />
                                 </div>
                              ))
                           }
                        </div>
                     </div>
                     <div className="fade" />
                  </div>
                  {
                     // Description
                     description.map((line) => (
                        <p>{line}</p>
                     ))
                  }
                  <div className="tags">
                     {
                        // Tags
                        tags.map((tag) => (
                           <span>{tag}</span>
                        ))
                     }
                  </div>
                  {
                     // Links
                     links.map((link) => (
                        <a href={link.url}>{link.linkText}</a>
                     ))
                  }
               </div>
            )
         })}
      </ProjectContainer>
   )
}

export default Projects
