/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import data from "../data/employers";

// Components
import MenuIcon from "../components/menu-icon.jsx";
import Body from "../components/body/body.jsx";
import SocialLinks from "../components/social.jsx";

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

      span {
        font-weight: 500;
        font-size: 14px;
        margin-left: 12px;
      }

      @media screen and (max-width: 768px) {
        /* display: none; */
        font-size: 11px;

        span {
          font-weight: 500;
          font-size: 12px;
          margin-left: 12px;
        }
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
    margin-top: 10px;
    border-radius: 30px;

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
        height: 150%;
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
  }

  .about-me,
  .layout {
    max-width: 580px;
  }
`;

const Index = (props) => {
  const { company } = props;
  const [showHeader, setShowHeader] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showProjectMenu, setShowProjectMenu] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        setShowHeader(window.pageYOffset > 250);
        setShowProjectMenu(window.pageYOffset > 1000);
      },
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
          <span>dav.budimir@gmail.com</span>
        </div>
        <div className="spacer" />
      </div>

      {
        // Company
        company && data[company] && (
          <div className="employer">
            <div className="employer-content">
              <span>Welcome {data[company].company} team</span>
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

      {/* <MenuIcon showNav={showNav} setShowNav={setShowNav} /> */}

      <div className="about-me">
        <h1>David Budimir</h1>
        <div>
          <span>// software engineer</span>
          <span>// designer</span>
          <span>// marketing swiss-army-knife</span>
        </div>
      </div>
      <div className="layout">
        <Body
          showHeader={showHeader}
          showNav={showNav}
          showProjectMenu={showProjectMenu}
        />
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
