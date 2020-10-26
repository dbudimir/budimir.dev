import TagManager from 'react-gtm-module'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import data from '../data/employers'

// Components
import Body from '../components/body/body.jsx'
import SocialLinks from '../components/social.jsx'

// Tag Manager
const tagManagerArgs = { gtmId: 'GTM-5KZP39S' }

const IndexContainer = styled.div`
   font-family: Quicksand, sans-serif;
   scroll-behavior: smooth;

   .header {
      position: sticky;
      display: flex;
      background: #fff096;
      box-sizing: border-box;
      font-size: 18px;
      font-weight: 700;
      justify-content: space-between;
      padding: 5px 12px 4px;
      z-index: 2;
      align-items: center;
      top: 0px;
      transition: transform 0.5s ease-in-out;
      transform: translateY(-100px);

      &.show {
         transform: translateY(0px);
         box-shadow: rgba(0, 0, 0, 0.04) 1px 6px 12px 0;
      }

      span {
         min-width: max-content;
      }

      .info {
         display: flex;

         @media screen and (max-width: 768px) {
            display: none;
         }

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
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: -32px;
      margin-bottom: 32px;

      .employer-content {
         margin: 24px;
         padding: 12px;
         display: flex;
         flex-direction: column;
         align-items: center;
         text-align: center;

         span {
            font-size: 18px;
            font-weight: 600;
         }

         .emp-logo {
            background: url(../../static/images/brush-stroke-1.png) no-repeat center center;
            background-size: 100% 80%;
            display: block;
            margin: 12px 0;
            max-width: 70%;
            padding: 24px 64px;
            position: relative;
            width: 220px;
         }
      }

      .avatar {
         max-height: 40px;
         border-radius: 100px;
         display: inline-block;
      }
   }

   .about-me {
      margin: 136px auto 120px;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
         background: url(../../static/images/brush-stroke-2.png) no-repeat center center;
         background-size: 100% 80%;
         font-size: 48px;
         line-height: 1;
         margin: 0 0 12px;
         padding: 0 12px;
         text-align: center;
      }

      div {
         display: flex;
         flex-wrap: wrap;
         justify-content: center;

         span {
            margin-right: 12px;
            font-size: 14px;
         }
      }
   }

   .layout {
      display: flex;
      position: relative;
      justify-content: center;
      margin: 0 auto;

      .nav {
         opacity: 0;
         align-items: flex-end;
         display: flex;
         flex-direction: column;
         height: 0;
         margin-left: -230px;
         position: sticky;
         transition: transform 0.5s, opacity 0.5s;
         width: 200px;
         transform: translateY(2000px);

         a {
            align-items: center;
            background: #fff096;
            border-radius: 6px;
            border: 2px solid transparent;
            box-shadow: rgba(0, 0, 0, 0.04) 1px 6px 12px 0px;
            color: #393939;
            display: block;
            font-weight: 600;
            margin-bottom: 18px;
            padding: 4px 8px;
            text-decoration: none;
            transition: border 0.25s ease;
            width: fit-content;
            font-size: 15px;

            &:hover,
            &.active {
               border: 2px solid #393939;
            }

            img {
               height: 18px;
               margin-left: 8px;
            }
         }

         .resume-button {
            display: flex;
         }

         &.show {
            opacity: 1;
            top: 100px;
            transform: translateY(0px);

            @media screen and (max-width: 768px) {
               margin-left: 0;
               z-index: 200;
               top: calc(100% - 124px);
               width: 100%;

               a {
                  display: none;
               }

               .resume-button {
                  border-radius: 10px;
                  box-shadow: rgba(0, 0, 0, 0.14) 1px 6px 12px 0px;
                  box-sizing: border-box;
                  display: flex;
                  font-size: 18px;
                  justify-content: center;
                  margin: 0 auto;
                  padding: 12px 32px;
                  width: 100%;
                  min-height: 50px;

                  img {
                     height: 24px;
                     margin-left: 12px;
                  }
               }
            }
         }
      }
   }

   .about-me,
   .layout {
      width: 60%;
      max-width: 580px;

      @media screen and (max-width: 768px) {
         width: 96%;
      }
   }
`

const Index = (props) => {
   const { company } = props
   const [showHeader, setShowHeader] = useState(false)

   const handleScroll = () => {
      window.pageYOffset > 250 ? setShowHeader(true) : setShowHeader(false)
   }

   useEffect(() => {
      TagManager.initialize(tagManagerArgs)
      window.addEventListener('scroll', handleScroll, { passive: true })
   }, [])

   return (
      <IndexContainer>
         <Head>
            <title>David Budimir</title>
            <meta
               name="description"
               content="David Budimir is a software developer, designer, and marketing swiss-army-knife."
            />
            <meta
               name="og:description"
               content="David Budimir is a software developer, designer, and marketing swiss-army-knife."
            />
            <meta property="og:image" content="https://www.budimir.dev/static/images/og-image.png" />
            <meta name="twitter:image" content="https://www.budimir.dev/static/images/og-image.png" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <div className={`header ${showHeader && 'show'}`}>
            <span>David Budimir</span>
            <div className="info">
               <span>developer // designer // marketing swiss-army-knife</span>
            </div>
            <div className="spacer" />
            <span className="contact">dav.budimir@gmail.com</span>
         </div>

         {
            // Company
            company && data[company] && (
               <div className="employer">
                  <div className="employer-content">
                     <span>Welcome hiring managers from {data[company].company}</span>
                     <img className="emp-logo" src={data[company].logo.src} alt={data[company].logo.alt} />
                     <span>Meet your next {data[company].role}</span>
                  </div>
               </div>
            )
         }

         <div className="about-me">
            <h1>David Budimir</h1>
            <div>
               <span>// developer </span>
               <span> // designer</span>
               <span> // marketing swiss-army-knife</span>
            </div>
         </div>
         <div className="layout">
            <Body showHeader={showHeader} />
         </div>
         <SocialLinks />
      </IndexContainer>
   )
}

export async function getServerSideProps(context) {
   return {
      props: { company: context.query.company || null },
   }
}

export default Index
