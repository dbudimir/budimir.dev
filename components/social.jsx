/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import styled from 'styled-components'

const SidebarContainer = styled.div`
   bottom: 0;
   box-sizing: border-box;
   display: flex;
   flex-direction: row;
   font-family: Quicksand, sans-serif;
   font-weight: 500;
   height: 40px;
   height: max-content;
   justify-content: center;
   left: 0;
   padding: 12px 24px 12px;
   position: sticky;
   width: 100%;
   background: #ffffff;

   @media screen and (max-width: 768px) {
      padding: 24px 24px 28px;
   }

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
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
      align-items: center;

      a {
         height: 24px;
      }

      img {
         margin: 0 24px;
         width: 22px;
         height: 22px;
         filter: brightness(0.1);
      }

      .avatar {
         img {
            width: 22px;
            height: 22px;
            border-radius: 100px;
            filter: unset;
            border: 2px solid #393939;
         }

         span {
            display: none;
         }
      }
   }

   .showAv {
      visibility: visible;
      display: flex;
      position: fixed;
      width: 100%;
      bottom: 0px;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 100%;
      box-shadow: rgba(0, 0, 0, 0.04) 1px 6px 12px 0;
      animation: slideIn 2.5s forwards;

      @keyframes slideIn {
         0% {
            bottom: -500px;
         }
         10% {
            bottom: 0px;
         }
         90% {
            bottom: 0px;
         }
         100% {
            bottom: -1000px;
         }
      }

      img {
         border: 10px solid #393939;
         filter: unset;
         width: 60%;
         max-width: 300px;
         height: auto;
         max-height: 300px;
         border-radius: 100%;
      }

      span {
         display: block;
         animation: bounce-7 0.2s infinite alternate;
         color: #000000;
         height: auto;
         width: 60%;
         max-width: 320px;
         margin: -60px 0 0 0;
         text-align: center;
         background: none;
         font-weight: 600;
         font-size: 28px;
         background: #eeeef1;
         background-color: rgba(0, 0, 0, 0.8);

         @keyframes bounce-7 {
            0% {
               color: #fce48b;
            }
            100% {
               transform: translate(0px, 4px) scale(1.02);
               color: #b57ed3;
            }
         }
      }
   }
`

const Sidebar = () => {
   const [showAv, setShowAv] = useState(false)

   const showMe = () => {
      setShowAv(true)
      setTimeout(() => {
         setShowAv(false)
      }, 2500)
   }

   return (
      <SidebarContainer>
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
            <div className="avatar" onClick={(e) => showMe(e)}>
               <img src="/static/images/profile-pic.jpg" alt="David Budimir" />
               <span>this is what I look like</span>
            </div>
            {showAv && (
               <div className={showAv && 'showAv'}>
                  <img src="/static/images/profile-pic.jpg" alt="David Budimir" />
                  <span>This is what I look like</span>
               </div>
            )}
         </div>
      </SidebarContainer>
   )
}

export default Sidebar
