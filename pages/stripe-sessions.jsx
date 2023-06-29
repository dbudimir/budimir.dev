/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";

const PageContainer = styled.div`
  height: 3000px;
  .header-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .header-text {
      font-size: 200px;
      line-height: 1;
      font-weight: 900;
      display: flex;
      gap: 50px;
    }
  }
`;

const StripeSessions = (props) => {
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      setScrollDistance(window.scrollY);
    });

    // if (window !== undefined) {
    //   const cnv = document.getElementById("cnv");
    //   cnv.width = 1000;
    //   cnv.height = 1000;
    //   const ctx = cnv.getContext("2d");
    //   ctx.font = "bold 22px sans-serif";
    //   const text = "SESSIONS";

    //   for (let i = 0; i < text.length; i++) {
    //     ctx.fillText(text[i], 400, 200);
    //     ctx.rotate(0.1);
    //   }
    // }
  }, []);

  useEffect(() => {
    rotateText(scrollDistance);
  }, [scrollDistance]);

  const getOpacity = (scrollDistance) => {
    const scrollDistanceOpacity = 3 * (scrollDistance / 1000);

    return 1 - scrollDistanceOpacity;
  };

  const getScale = (scrollDistance) => {
    return 1 + scrollDistance / 1500;
  };

  const rotateText = (scrollDistance) => {
    const row1 = document.getElementById("row1");
    const row2 = document.getElementById("row2");

    const scrollRotationEnd = scrollDistance / 50;
    const scrollRotationCenter = scrollDistance / 75;

    const scrollSkew = Number(scrollDistance / 1000);
    const scrollSkewCenter = Number(scrollDistance / 1500);

    console.log("scroll skew", scrollSkew);
    console.log(-scrollDistance);

    const lettersRow1 = Array.from(row1.children);
    const lettersRow2 = Array.from(row2.children);

    lettersRow1[0].style.transform = `skew(-${scrollSkew}rad)`;
    lettersRow2[0].style.transform = `skew(-${scrollSkew}rad)`;

    lettersRow1[1].style.transform = `skew(-${scrollSkewCenter}rad)`;
    lettersRow2[1].style.transform = `skew(-${scrollSkewCenter}rad)`;

    lettersRow1[2].style.transform = `skew(${scrollSkewCenter}rad)`;
    lettersRow2[2].style.transform = `skew(${scrollSkewCenter}rad)`;

    lettersRow1[3].style.transform = `skew(${scrollSkew}rad)`;
    lettersRow2[3].style.transform = `skew(${scrollSkew}rad)`;
  };

  return (
    <PageContainer>
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

      <div className="header-container">
        <div
          className="header-text-container"
          style={{
            opacity: getOpacity(scrollDistance),
            transform: `scale(${getScale(scrollDistance)})`,
          }}
        >
          {/* <canvas id="cnv" /> */}
          <div id="row1" className="header-text">
            {["S", "E", "S", "S"].map((letter, i) => {
              return <span key={i}>{letter}</span>;
            })}
          </div>
          <div id="row2" className="header-text">
            {["I", "O", "N", "S"].map((letter, i) => {
              return <span key={i}>{letter}</span>;
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export async function getServerSideProps(context) {
  return {
    props: { company: context.query.company || null },
  };
}

export default StripeSessions;
