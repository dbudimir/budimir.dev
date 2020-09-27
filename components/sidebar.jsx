import styled from 'styled-components'

const SidebarContainer = styled.div`
   align-items: flex-end;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   font-family: Quicksand, sans-serif;
   font-weight: 500;
   height: 100vh;
   padding: 120px 12px 12px;

   span {
      padding: 2px 6px;
      background: #f8f8fa;
      border-radius: 4px;
      margin: 0 0 12px 12px;
   }

   .spacer {
      flex-basis: 100%;
   }

   .social-links {
      display: flex;
      flex-direction: column;

      img {
         margin-bottom: 12px;
         filter: brightness(1.4);
      }

      .avatar {
         img {
            width: 28px;
            border-radius: 100px;
            filter: brightness(1.2);

            &:hover {
               width: 200px;
               position: absolute;
               bottom: 0;
               left: 12px;
            }
         }
      }
   }
`

const Sidebar = () => {
   console.log('side bar')

   return (
      <SidebarContainer>
         <span>about</span>
         <span>projects</span>
         <span>design</span>
         <span>video</span>
         <span>resume</span>
         <div className="spacer" />
         <div className="social-links">
            <a href="https://github.com/dbudimir" target="_blank" rel="noopener noreferrer">
               <img src="/static/icons/github.svg" alt="github-icon" />
            </a>
            <a href="https://www.linkedin.com/in/davidbudimir/" target="_blank" rel="noopener noreferrer">
               <img src="/static/icons/linkedin.svg" alt="linkedin-icon" />
            </a>
            <a href="https://www.instagram.com/dbudi/" target="_blank" rel="noopener noreferrer">
               <img src="/static/icons/instagram.svg" alt="instagram-icon" />
            </a>
            <div className="avatar">
               <img src="/static/images/profile-pic.jpg" alt="David Budimir" />
               <span>this is what I look like</span>
            </div>
         </div>
      </SidebarContainer>
   )
}

export default Sidebar
