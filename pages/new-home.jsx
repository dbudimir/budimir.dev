import Head from "next/head";

import styled from "styled-components";

// Components

import SidebarContent from "../components/home/sidebar-content.jsx";
import Body from "../components/body/body.jsx";
import BodyContent from "../components/home/body-conent";

const Container = styled.div`
  scroll-behavior: smooth;
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  height: 100vh;
  overflow: hidden;

  .left-col {
    width: 275px;
    overflow: hidden;
  }

  .right-col {
    flex-grow: 1;
    overflow: scroll;
    overflow-x: hidden;
    width: calc(100% - 275px);
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: unset;

    .right-col {
      width: 100%;
      overflow: unset;

      .spacer {
        display: none;
      }
      /* > div {
        height: unset;
      } */
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

      <div className="left-col">
        <SidebarContent />
      </div>

      <div className="right-col">
        <BodyContent />
      </div>
    </Container>
  );
};

export async function getServerSideProps(context) {
  return {
    props: { company: context.query.company || null },
  };
}

export default Index;
