import Head from "next/head";

import styled from "styled-components";

// Components
import SidebarContent from "../components/home/sidebar-content.jsx";
import BodyContent from "../components/home/body-conent.jsx";

const Container = styled.div`
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  overflow: hidden;
  padding: 18px;
  //
  --offset: 3px;
  position: relative;
  box-sizing: border-box;

  &:before {
    content: "";
    background: conic-gradient(
      transparent 270deg,
      rgb(255, 231, 161),
      transparent
    );
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    aspect-ratio: 1;
    width: 200%;
    animation: rotate 10s linear infinite;
  }

  /* Overlay */
  &:after {
    content: "";
    background: #ffffff;
    border-radius: inherit;
    position: absolute;
    inset: var(--offset);
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) scale(1.4) rotate(0turn);
    }

    to {
      transform: translate(-50%, -50%) scale(1.4) rotate(1turn);
    }
  }

  .left-col,
  .right-col {
    z-index: 1;
  }

  .left-col {
    overflow: hidden;
  }

  .right-col {
    flex-grow: 1;
    overflow: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: unset;

    .right-col {
      width: 100%;
      overflow: unset;
    }
  }
`;

const Index = (props) => {
  return (
    <Container>
      <Head>
        <title>David Budimir</title>
        <meta
          name="description"
          content="David Budimir is a software engineer, designer, and SaaS marketing expert."
        />
        <meta
          name="og:description"
          content="David Budimir is a software engineer, designer, and SaaS marketing expert."
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

      <div className="left-col">
        <SidebarContent />
      </div>

      <div className="right-col">
        <BodyContent />
      </div>
    </Container>
  );
};

export default Index;
