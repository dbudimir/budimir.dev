/* eslint-disable react/jsx-no-comment-textnodes */
import TagManager from "react-gtm-module";
import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import data from "../data/employers";

// Components
import Body from "../components/body/body.jsx";
import SocialLinks from "../components/social.jsx";

// Tag Manager
const tagManagerArgs = { gtmId: "GTM-5KZP39S" };

const IndexContainer = styled.div`
  scroll-behavior: smooth;
  padding: 0 12px;

  .header {
    position: fixed;
    display: flex;
    width: 100%;
    left: 0;
    background: #ffe7a1;
    box-sizing: border-box;
    font-size: 18px;
    font-weight: 700;
    justify-content: space-between;
    padding: 5px 12px 4px;
    z-index: 999;
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
      font-weight: 500;

      @media screen and (max-width: 540px) {
        display: none;
      }
    }

    .spacer {
      width: 100%;
    }
  }

  .employer {
    border: 2px solid #a7f3d0;
    background-color: #e6faf0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 12px;
    border-radius: 18px;

    .employer-content {
      margin: 24px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      span {
        font-size: 18px;
        font-weight: 400;
      }

      .emp-logo {
        background: url(../../static/images/brush-stroke-1.png) no-repeat center
          center;
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
    margin: 160px auto 120px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      position: relative;
      font-size: 48px;
      line-height: 1;
      margin: 0 0 12px;
      padding: 0 12px;
      text-align: center;
      width: 100%;
      text-align: center;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 80%;
        opacity: 0.6;
        z-index: -1;
        background: url(../../static/images/brush-stroke-2.png) no-repeat center
          center;
        background-size: 90% 80%;
      }
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
      gap: 18px;

      a {
        align-items: center;
        background: #fffae6;
        border: 1px solid #ffe7a1;
        border-radius: 6px;
        border: 2px solid transparent;
        box-shadow: rgba(0, 0, 0, 0.04) 1px 6px 12px 0px;
        color: #393939;
        display: block;
        font-weight: 600;
        padding: 4px 8px;
        text-decoration: none;
        transition: all 0.25s ease;
        font-size: 15px;
        font-weight: 500;

        &:hover,
        &.active {
          background-color: #ffe7a1;
          transform: scale(1.1);
        }

        img {
          height: 18px;
          margin-left: 8px;
        }
      }

      .resume-button {
        display: flex;
        min-width: 120px;
      }

      &.show {
        opacity: 1;
        top: 100px;
        transform: translateY(0px);

        @media screen and (max-width: 940px) {
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
    max-width: 580px;
  }
`;

const Index = (props) => {
  const { company } = props;
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
    window.addEventListener(
      "scroll",
      () => setShowHeader(window.pageYOffset > 250),
      { passive: true }
    );
  }, []);

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
        <meta
          property="og:image"
          content="https://www.budimir.dev/static/images/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://www.budimir.dev/static/images/og-image.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`header ${showHeader && "show"}`}>
        <span>David Budimir</span>
        <div className="info">
          <span>// software engineer // designer</span>
        </div>
        <div className="spacer" />
        <span className="contact">dav.budimir@gmail.com</span>
      </div>

      {
        // Company
        company && data[company] && (
          <div className="employer">
            <div className="employer-content">
              <span>Welcome hiring team from {data[company].company}</span>
              <img
                className="emp-logo"
                src={data[company].logo.src}
                alt={data[company].logo.alt}
              />
              <span>Meet your next {data[company].role}</span>
            </div>
          </div>
        )
      }

      <div className="about-me">
        <h1>David Budimir</h1>
        <div>
          <span>// software engineer</span> <span>// designer</span>
        </div>
      </div>
      <div className="layout">
        <Body showHeader={showHeader} />
      </div>
      <SocialLinks />
    </IndexContainer>
  );
};

export async function getServerSideProps(context) {
  return {
    props: { company: context.query.company || null },
  };
}

export default Index;
