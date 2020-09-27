import { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import data from '../data/employers'

// Components
import Body from '../components/body/body.jsx'
import SideBar from '../components/sidebar.jsx'

const IndexContainer = styled.div`
   font-family: Quicksand, sans-serif;
   .header {
      background: #fff096;
      box-sizing: border-box;

      font-size: 18px;
      font-weight: 700;
      justify-content: space-between;
      padding: 4px 12px;
      display: none;
      visibility: hidden;
      width: 100vw;
      z-index: 2;
      align-items: center;

      &.show {
         visibility: visible;
         display: flex;
         animation: fadeInNav 0.5s ease-out;
         position: sticky;
         top: 0;
         box-shadow: rgba(0, 0, 0, 0.04) 1px 6px 12px 0;

         /* prettier-ignore */
         @keyframes fadeInNav {
            0% { transform: scaleY(0); opacity: 0; top: -100px; }
            100% { transform: scaleY(1); opacity: 1; top: 0; }
         }
      }

      span {
         min-width: max-content;
      }

      .info {
         display: flex;

         span {
            font-weight: 500;
            font-size: 14px;
            margin-left: 12px;
         }
      }

      .contact {
         font-size: 14px;
      }

      .spacer {
         width: 100%;
      }
   }

   .employer {
      background: #fff096;

      margin-bottom: 32px;
      display: flex;
      justify-content: center;

      .employer-content {
         width: 700px;
         margin: 24px;
         padding: 12px;
         display: flex;
         flex-direction: column;
         align-items: center;

         span {
            font-size: 22px;
            font-weight: 600;
         }

         .emp-logo {
            max-width: 250px;
            display: block;
            margin: 12px 0;
            padding: 24px 64px;
            position: relative;
            background: url(../../static/images/brush-stroke-1.png) no-repeat center center;
            background-size: 100% 80%;
            }
         }

         .avatar {
            max-height: 40px;
            border-radius: 100px;
            display: inline-block;
         }
      }
   }

   .about-me {
      margin: 48px auto;
      width: max-content;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
         margin: 0;
         padding: 0 12px;
         background: url(../../static/images/brush-stroke-2.png) no-repeat center center;
         background-size: 100% 80%;
         transform: translateX(-12px);
         font-size: 48px;
         text-align: center;
      }

      span {
         margin-right: 12px;
         font-size: 14px;
      }
   }

   .layout {
      display: flex;
      position: relative;
      justify-content: center;
   }
`

const Index = (props) => {
   const { company } = props
   const [showHeader, setShowHeader] = useState(false)

   const handleScroll = () => {
      window.pageYOffset > 200 ? setShowHeader(true) : setShowHeader(false)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   console.log(company)
   console.log(data[company].logo)

   return (
      <IndexContainer>
         <Head>
            <title>David Budimir</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <div className={`header ${showHeader && 'show'}`}>
            <span>David Budimir</span>
            <div className="info">
               <span>// developer</span>
               <span>// designer</span>
               <span>// marketing swiss-army-knife</span>
            </div>
            <div className="spacer" />
            <span className="contact">dav.budimir@gmail.com</span>
         </div>
         {company && (
            <div className="employer">
               <div className="employer-content">
                  <span>Welcome hiring managers from {data[company].company}</span>
                  <img className="emp-logo" src={data[company].logo.src} alt={data[company].logo.alt} />
                  <span>Meet your next Front End Developer </span>
                  {/* <img className="avatar" src="/static/images/profile-pic.jpg" alt="David Budimir" /> */}
               </div>
            </div>
         )}

         <div className="about-me">
            <h1>David Budimir</h1>
            <div>
               <span>developer</span>
               <span>// designer</span>
               <span>// marketing swiss-army-knife</span>
            </div>
         </div>
         <div className="layout">
            <SideBar />
            <Body />
         </div>
      </IndexContainer>
   )
}

export async function getServerSideProps(context) {
   return {
      props: { company: context.query.company || null },
   }
}

export default Index
