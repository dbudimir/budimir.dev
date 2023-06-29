const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

import { useState, useRef } from "react";
import Image from "next/image";

import LinkIcon from "../../components/icons/link.jsx";
import CopyIcon from "../../components/icons/copy.jsx";
import ChevronIcon from "../../components/icons/chevron.jsx";

import styled from "styled-components";

const SidebarContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  > img {
    filter: grayscale(30%);
  }

  .name,
  .info,
  .contact {
    box-sizing: border-box;
    padding: 0px 0 0 12px;
  }

  .name {
    h1,
    h3 {
      margin: 0;
      width: 100%;
    }

    h3 {
      color: #454545;
    }
  }

  .info {
    div {
      display: flex;
      align-items: first baseline;
      gap: 4px;
      span {
        color: #454545;
        font-size: 12px;
      }
    }
  }

  .contact {
    display: flex;
    flex-direction: column;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #000000;
      cursor: pointer;

      &:hover {
        svg {
          opacity: 1;
        }
      }

      svg {
        height: 14px;
        opacity: 0;
      }
    }

    span {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      cursor: pointer;

      div {
        display: flex;
        align-items: center;
        gap: 6px;

        &:hover {
          svg {
            opacity: 1;
          }
        }

        svg {
          width: 14px;
          height: 14px;
          opacity: 0;
        }
      }

      .show-email {
        margin-bottom: 8px;
        color: #454545;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;

        svg {
          width: 14px;
        }

        .copied-indicator {
          animation-name: fadeAndBounce;
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          padding: 0 0 0 4px;
        }
      }

      &.email-visible {
        div {
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
`;

const SidebarContent = (props) => {
  const emailAddress = useRef(null);

  const [showEmail, setShowEmail] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const copyEmail = () => {
    setShowCopied(true);
    navigator.clipboard.writeText("dav.budimir@gmail.com");
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  return (
    <>
      <SidebarContentContainer className="content">
        <Image
          src="/static/images/lemon.png"
          alt="David Budimir"
          height="100"
          width="100"
        />
        <div className="name">
          <h1>DAVID BUDIMIR</h1>
          <h3>давид будимир</h3>
        </div>

        <div className="info">
          <div>
            software engineer <span>({dayjs("2019-05-01").fromNow(true)})</span>
          </div>
          <div>
            designer <span>(7 years)</span>
          </div>
          <div>
            saas marketing <span>(8 years)</span>
          </div>
        </div>

        <div className="contact">
          <b>
            <a
              className="resume"
              href="../static/pdfs/david-budimir-resume-04-2023.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              resume
              <LinkIcon />
            </a>
          </b>
          <br />
          <b>contact info ↴</b>
          <span className={`${showEmail ? "email-visible" : ""}`}>
            <div onClick={() => setShowEmail(!showEmail)}>
              email <ChevronIcon />
            </div>
            {showEmail && (
              <span
                ref={emailAddress}
                onClick={copyEmail}
                className="show-email"
              >
                dav.budimir@gmail.com <CopyIcon />
                {showCopied && (
                  <div className="copied-indicator">Copied !!!</div>
                )}
              </span>
            )}
          </span>
          <a
            href="https://github.com/dbudimir"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
            <LinkIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/davidbudimir/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
            <LinkIcon />
          </a>
        </div>
      </SidebarContentContainer>
    </>
  );
};

export default SidebarContent;
