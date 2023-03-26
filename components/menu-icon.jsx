import styled from "styled-components";

import Image from "next/image";

const MenuIconContainer = styled.div`
  height: 40px;
  width: 40px;
  position: fixed;
  background: #ffffff;
  top: 10px;
  right: 12px;
  border-radius: 100px;
  z-index: 1000;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid transparent;
  border: 2px solid #ffe7a1;

  &:hover {
    border: 2px solid #ffe7a1;
  }
`;

const name = ({ showNav, setShowNav }) => {
  console.log("new component");

  return (
    <MenuIconContainer onClick={() => setShowNav(!showNav)}>
      <Image
        src={"/static/icons/lemon-icon-circle.png"}
        alt="menu-icon"
        height={32}
        width={32}
      />
    </MenuIconContainer>
  );
};

export default name;
