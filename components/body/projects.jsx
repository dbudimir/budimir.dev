import ReactPlayer from 'react-player'
import styled from 'styled-components'
import data from '../../data/projects'

const ProjectContainer = styled.div`
   margin-bottom: 12px;

   h3 {
      text-transform: uppercase;
   }

   .image-slider {
      display: flex;
      max-width: 580px;
      overflow: scroll;

      img {
         max-height: 240px;
         padding: 12px;
         background: #f8f8fa;
         border-radius: 12px;
         margin-right: 12px;
      }
   }

   .tags {
      margin-bottom: 12px;

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
`

const Projects = () => {
   console.log('test')

   return (
      <ProjectContainer>
         {data.map((project) => (
            <div className="project-item">
               <h3>{project.h3}</h3>
               <div className="image-slider">
                  {<ReactPlayer url="https://www.youtube.com/watch?v=qW8KuYBWwCU" />}
                  {project.images.map((image) => (
                     <img src={image.src} alt={image.alt} />
                  ))}
               </div>
               <p>{project.description}</p>
               <div className="tags">
                  {project.tags.map((tag) => (
                     <span>{tag}</span>
                  ))}
               </div>
               {project.links.map((link) => (
                  <a href={link.url}>{link.linkText}</a>
               ))}
            </div>
         ))}
      </ProjectContainer>
   )
}

export default Projects
