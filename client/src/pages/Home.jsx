import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UserIdContext } from "../components/AppContext"

import Thread from "../components/Thread";
import Login from './Login';

const Home = () => {

  const userId = useContext(UserIdContext);
  const dispatch = useDispatch()


/* if(userId){
  console.log(userId);
  console.log();
} */

  return (
    <div /* home container */>
      {
        userId.userId !== null ? ( 
        <Thread /> 
        ) :
        (
         <Login />
         )
      }

    </div>
  );
};

export default Home;
