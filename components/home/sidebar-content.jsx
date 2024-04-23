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
  margin-bottom: 24px;

  > img {
    background-color: #454545;
    padding: 12px;
    margin-bottom: 6px;
  }

  .name {
    h1,
    h3 {
      margin: 0;
      width: 100%;
    }

    line-height: 1;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;

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

  .resume {
    display: flex;
    width: max-content;
    cursor: pointer;

    a {
      display: flex;
      text-decoration: none;
      color: #000000;
      border-bottom: 6px solid rgb(255, 231, 161);
      border-left: 6px solid rgb(255, 231, 161);
      line-height: 1;
    }

    svg {
      transition: ease-in-out 0.2s;
      transform: translateY(2px);
      height: 12px;
    }

    &:hover {
      svg {
        transition: ease-in-out 0.2s;
        transform: translateY(2px) scale(1.2);
      }
    }
  }

  .contact {
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media screen and (max-width: 768px) {
      gap: 8px;
    }

    .contact-info {
      display: flex;
      width: max-content;
      border-bottom: 6px solid rgb(255, 231, 161);
      border-left: 6px solid rgb(255, 231, 161);
      margin-bottom: 8px;
      line-height: 1;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #000000;
      cursor: pointer;
      width: max-content;

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
        </div>

        <div className="info">
          <div>
            software engineer <span>({dayjs("2019-05-01").fromNow(true)})</span>
          </div>
          <div>
            designer <span>(7 years)</span>
          </div>
          <div>
            saas marketing & seo <span>(8 years)</span>
          </div>
        </div>

        <b className="resume">
          <a
            href="../static/pdfs/david-budimir-resume-2024-05.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>

          <LinkIcon />
        </b>

        <div className="contact">
          <b className="contact-info">contact info</b>
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
