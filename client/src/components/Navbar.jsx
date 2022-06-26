import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import mainLogo from "../assets/main_logo.png";
import login_icon from "../assets/login_icon.png";
import Logout from "./Log/Logout";
import { UserIdContext } from "./AppContext";
import colors from "../utils/style/colors";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  border-bottom : 3px ${colors.tertiary} solid
`;

const NavContentList = styled.ul`
  display : flex;
  flex-direction: row;
  align-items : center;
  margin : auto 0 auto 0;
  height: 70px;
`

const Navbar = () => {
  const userId = useContext(UserIdContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <NavContainer /* container */>
        <Link to={"/"} /* logo container*/>
          <img src={mainLogo} alt="main_logo" height="70em" />
        </Link>
        {userId.userId !== null ? (
          <NavContentList>
            <li className="welcome">
                <h5 style={{margin : 0}}>Bienvenue <span style={{textTransform : "upperCase"}}>{userData.pseudo}</span></h5>
            </li>
            <Logout />
          </NavContentList>
        ) : (null)}
      </NavContainer>
    </nav>
  );
};

export default Navbar;
