import styled from 'styled-components'

const SidebarContainer = styled.div`
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   font-family: Quicksand, sans-serif;
   font-weight: 500;
   height: max-content;
   max-width: 120px;
   padding: 12px 24px 12px;
   position: sticky;
   top: 50px;
   align-items: flex-end;
   justify-content: start;

   span {
      padding: 2px 6px;
      background: #f8f8fa;
      border-radius: 4px;
      margin: 0 0 12px 12px;
      font-size: 18px;
   }

   .spacer {
      flex-basis: 100%;
   }

   .social-links {
      margin-top: 12px;
      display: flex;
      flex-direction: column;

      img {
         margin-bottom: 12px;
      }

      .avatar {
         img {
            width: 24px;
            border-radius: 100px;

            &:hover {
               width: 200px;
               position: absolute;
               bottom: 0;
               left: 12px;
            }
         }

         span {
            display: none;
         }
      }
   }
`

const Sidebar = () => {
   console.log('side bar')

   return (
      <SidebarContainer>
         <span>about</span>
         <span>work</span>
         <span>resume</span>
         {/* <div className="spacer" /> */}
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
