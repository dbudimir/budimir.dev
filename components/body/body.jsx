import styled from "styled-components";

// Components
import Projects from "./projects";

const BodyContainer = styled.div`
  padding: 12px;
  width: 100%;
  scroll-behavior: smooth;
  max-width: 520px;
`;

const Body = ({ showHeader, showNav, showProjectMenu }) => (
  <BodyContainer>
    <Projects
      showHeader={showHeader}
      showNav={showNav}
      showProjectMenu={showProjectMenu}
    />
  </BodyContainer>
);

export default Body;
