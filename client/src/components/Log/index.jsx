import React from "react";
import { useState } from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";

import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const LogFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-envenly;
  align-items: center;
  width: 40%;
  height: 100%;
  margin: 0;
  background-color: ${colors.secondary};
  border-radius: 30px;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    flex-direction: row;
    justify-content: space-envenly;
    width: 100%;
    height: 45%;
  }
  @media screen and (max-width: 599px) {
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 55%;
  }
`;

const LoginChoiceStyle = styled.ul`
  width: 80%;
  height: 30%;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    width: 40%;
    height: 50%;
  }
  @media screen and (max-width: 599px) {
    width: 40%;
    height: 20%;
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
      <LoginChoiceStyle>
        <li onClick={handleMods} id="register" className="log-btn btn-active">
          S'inscrire
        </li>
        <li onClick={handleMods} id="login" className="log-btn btn-active">
          Se connecter
        </li>
      </LoginChoiceStyle>
      {signUpMod ? <SignUpForm /> : null}
      {signInMod ? <SignInForm /> : null}
    </LogFormContainer>
  );
};

export default Log;
