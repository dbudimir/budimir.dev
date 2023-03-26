import { useEffect, useRef } from "react";

import styled from "styled-components";

const NavContainer = styled.div`
  opacity: 0;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  height: 0;
  margin-left: -230px;
  position: sticky;
  transition: transform 0.5s, opacity 0.5s;
  width: 200px;
  transform: translateX(-2000px);

  .nav-link {
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
    margin-bottom: 18px;

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

  /* Work Samples Items */
  .work-samples-nav {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    font-size: 12px;

    animation: shrink 0.3s ease-out forwards;

    .project-link {
      color: #000000;
      text-decoration: none;

      &:last-of-type {
        margin-bottom: 18px;
      }

      &:hover {
        -webkit-text-stroke: 0.5px #eaffd1;
      }
    }

    &.show {
      animation: grow 1s ease-in-out;
    }

    &.hide {
      max-height: 0px;
      opacity: 0;
      animation: shrink 1s ease-in-out;
    }
  }

  @keyframes grow {
    0% {
      opacity: 0;
      max-height: 0;
    }
    60% {
      opacity: 0;
      max-height: 0px;
    }
    100% {
      opacity: 1;
      max-height: 1000px;
    }
  }
  // prettier-ignore
  @keyframes shrink { from { opacity: 1; max-height: 1000px; } to { opacity: 0; max-height: 0; } }

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

      &:not(.show-on-mobile) {
        display: none;
      }
    }
  }

  &.show-on-mobile {
    position: fixed;
    opacity: 1;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    padding: 24px;
    border-radius: 10px;
    margin-left: unset;
    transition: transform 0.5s, opacity 0.5s;
    width: max-content;
    height: auto;
    background-color: #ffffff;
    border: 2px solid #a7f3d0;
    z-index: 100;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    animation: slideRight 0.5s ease-in-out;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 15%);
  }

  @keyframes slideRight {
    from {
      left: -500px;
    }
    to {
      left: -12px;
    }
  }
`;

const Nav = ({ data, showHeader, showNav, showProjectMenu, jobsList }) => {
  const workButton = useRef(null);
  const jobButton = useRef(null);
  const resumeButton = useRef(null);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        const options = [workButton, jobButton].map((button) => {
          button.current.classList.contains("active") &&
            button.current.classList.remove("active");

          return button;
        });

        const activeOption =
          window.pageYOffset > jobsList.current.offsetTop
            ? options[1]
            : options[0];

        activeOption.current.classList.add("active");
      },
      { passive: true }
    );
  }, []);

  return (
    <NavContainer
      className={`nav ${showHeader && "show"} ${showNav && "show-on-mobile"}`}
    >
      {[
        { text: 'Work Samples', className: 'work-button', href: '/#work', target: null, ref: workButton, icon: null }, // prettier-ignore
        { text: 'Professional History', className: 'job-history-button', href: '/#jobs', target: null, ref: jobButton, icon: null }, // prettier-ignore
        { text: 'View Resume', className: 'resume-button', href: '../static/pdfs/david-budimir-resume-04-2023.pdf', target: '_blank', ref: resumeButton, icon: <img src="../static/icons/pdf-icon.png" alt="View resume" /> }, // prettier-ignore
      ].map(({ text, icon, className, href, target, ref }, i) => (
        <>
          <a
            key={i}
            className={`nav-link ${className}`}
            href={href}
            ref={ref}
            target={target}
          >
            {text}
            {icon}
          </a>
          {text === "Work Samples" && (
            <div
              className={`work-samples-nav ${
                showNav || showProjectMenu ? "show" : "hide"
              }`}
            >
              {data.map((item, j) => {
                return (
                  <a className={"project-link"} href={`/#project${j}`}>
                    {item.h3}
                  </a>
                );
              })}
            </div>
          )}
        </>
      ))}
    </NavContainer>
  );
};

export default Nav;
