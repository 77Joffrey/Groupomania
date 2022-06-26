import React from 'react'

import styled from "styled-components";
import Log from "../components/Log";
import colors from "../utils/style/colors";

import loginPic from "../assets/log_pic.jpg";

const ProfilPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;
  height: 550px;
`;

const LogContainer = styled.section`
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  margin : auto;
  width : 90%;
  height : 500px
  background-color : #fff
`;
const LogFormContainer = styled.div`
  display: flex;
  flex-direction : row;
  justify-content : center;
  width: 35%;
  height: 100%;
  margin: 0;
  background-color: ${colors.secondary};
  border-radius: 30px;
`;
const LoginPicContainer = styled.div`
  display : flex  
  width : 50%;
`;

const LoginPic = styled.img`
  width: 70%;
  height: 100%;
  border-radius : 30px;
`;

const Login = (props) => {

if(props.signin === true){
   window.location = '/'
}

  return (
    <ProfilPageContainer>
      <LogContainer>
        <LogFormContainer>
          <Log />
        </LogFormContainer>
        <LoginPicContainer>
          <LoginPic src={loginPic} alt="login_pic" />
        </LoginPicContainer>
      </LogContainer>
    </ProfilPageContainer>
  );
};

export default Login;
