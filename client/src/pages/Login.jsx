import React from "react";

import styled from "styled-components";
import Log from "../components/Log";

import loginPic from "../assets/log_pic.jpg";

const ProfilPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 85%;
`;

const LogContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
  width: 70%;
  height: 65%;
  background-color: #fff;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    flex-direction: column;
    width: 80%;
  }
  @media screen and (max-width: 599px) {
    flex-direction: column;
    width: 90%;
    height: 90%;
  }
`;

const LoginPicContainer = styled.div`
  display: flex;
  width: 55%;
  height: 100%;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    width: 100%;
    height: 55%;
  }
  @media screen and (max-width: 599px) {
    width: 100%;
    height: 40%;
  }
`;

const LoginPic = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  object-fit: cover;
`;

const Login = (props) => {
  if (props.signin === true) {
    window.location = "/";
  }

  return (
    <ProfilPageContainer>
      <LogContainer>
        <Log />
        <LoginPicContainer>
          <LoginPic src={loginPic} alt="login_pic" />
        </LoginPicContainer>
      </LogContainer>
    </ProfilPageContainer>
  );
};

export default Login;
