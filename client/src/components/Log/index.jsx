import React from "react";
import { useState } from "react";
import styled from "styled-components";

import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

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
    <div>
      <div>
        <ul>
          <li onClick={handleMods} id="register" className='log-btn btn-active'>
            S'inscrire
          </li>
          <li onClick={handleMods} id="login" className='log-btn btn-active'>
            Se connecter
          </li>
        </ul>
        {signUpMod ? <SignUpForm /> : null}
        {signInMod ? <SignInForm /> : null}
      </div>
    </div>
  );
};

export default Log;
