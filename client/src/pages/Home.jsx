import React, { useState, useContext, useEffect } from "react";
import { UserIdContext } from "../components/AppContext";
import styled from "styled-components";
import axios from "axios";

import Thread from "../components/Thread";
import Login from "./Login";

const HomeContainer = styled.div`
  width: 100%;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios({
        methode: "get",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
      })
        .then((res) => {
          const getPosts = res.data;
          setPosts(getPosts);
        })
        .catch((err) => {});
    };

    fetchPosts();
  }, []);
  console.log(posts);
  const userId = useContext(UserIdContext);

  return (
    <HomeContainer>
      {userId.userId !== null ? <Thread posts={posts} /> : <Login />}
    </HomeContainer>
  );
};

export default Home;
