import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import mainLogo from "../assets/main_logo.png";
import Logout from "./Log/Logout";
import { UserIdContext } from "./AppContext";
import colors from "../utils/style/colors";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  border-bottom: 3px ${colors.tertiary} solid;
  @media screen and (max-width: 599px) {
    flex-direction: column;
  }
`;

const NavContentList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto 0 auto 0;
  width: fit-content;
  height: 50px;
  @media screen and (max-width: 599px) {
    width: 90%;
    justify-content: space-between;
  }
`;
const NavLogo = styled.img`
  height: 5em;
  @media screen and (max-width: 599px) {
    width: 100%;
    height: 90px;
  }
`;

const Navbar = () => {
  const userId = useContext(UserIdContext);

  return (
    <nav>
      <NavContainer>
        <Link to={"/"}>
          <NavLogo src={mainLogo} alt="main_logo" />
        </Link>
        {userId.userId !== null ? (
          <NavContentList>
            <li className="welcome">
              <h5 style={{ margin: 0 }}>
                Bienvenue{" "}
                <span style={{ textTransform: "upperCase" }}>
                  {userId.pseudo}
                </span>
              </h5>
            </li>
            <Logout />
          </NavContentList>
        ) : null}
      </NavContainer>
    </nav>
  );
};

export default Navbar;
