import React, { useState, useContext, useEffect } from "react";
import { UserIdContext } from "../components/AppContext";
import axios from "axios";

import Thread from "../components/Thread";
import Login from "./Login";

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
  const userId = useContext(UserIdContext);

  return (
    <React.Fragment>
      {userId.userId !== null ? <Thread posts={posts} /> : <Login />}
    </React.Fragment>
  );
};

export default Home;
