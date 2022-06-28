import React from "react";
import { useState } from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";

import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const LogFormContainer = styled.div`
  display: flex;
  flex-direction : column;
  justify-content : space-envenly;
  align-items : center;
  width: 40%;
  height: 100%;
  margin: 0;
  background-color: ${colors.secondary};
  border-radius: 30px;
  @media screen and (min-width: 599px) and (max-width: 992px) {
    display : flex;
    flex-direction: row;
    width: 100%;
  height: 100%;
  }
`;

const Log = () => {
  const [signUpMod, setSignUpMod] = useState(true);
  const [signInMod, setSignInMod] = useState(false);

  const handleMods = (e) => {
    if (e.target.id === "register") {
      setSignInMod(false);
      setSignUpMod(true);
    } else if (e.target.id === "login") {
      setSignInMod(true);
      setSignUpMod(false);
    }
  };

  return (

      <LogFormContainer>
        <ul>
          <li onClick={handleMods} id="register" className="log-btn btn-active">
            S'inscrire
          </li>
          <li onClick={handleMods} id="login" className="log-btn btn-active">
            Se connecter
          </li>
        </ul>
        {signUpMod ? <SignUpForm /> : null}
        {signInMod ? <SignInForm /> : null}
      </LogFormContainer>

  );
};

export default Log;
