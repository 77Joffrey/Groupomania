import React, { useState, useEffect, useContext } from "react";
import Card from "./Post/Card";
import CreatePost from "./Post/CreatePost";

import { isEmpty } from "../utils/tools";
import styled from "styled-components";
import colors from "../utils/style/colors";
import { UserIdContext } from "./AppContext";

const SectionContainer = styled.section`
  width: 100%;
`;

const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.secondary};
  @media screen and (max-width: 599px) {
    width: 100%;
  }
`;

const ThreadContentContainer = styled.ul`
  margin: 0;
  padding: 0;
  width: 800px;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    width: 80%;
  }
  @media screen and (max-width: 599px) {
    width: 100%;
  }
`;

const ThreadTitle = styled.h2`
  display: flex;
  align-self: flex-start;
  margin-left: 15px;
  @media screen and (max-width: 599px) {
    align-self: inherit;
    margin: 5px 0 0 0;
  }
`;

const Thread = (props) => {
  const [loadPosts, setLoadPosts] = useState(true);
  const [addPost, setAddPost] = useState(false);
  const [count, setCount] = useState(5);
  const { userId, pseudo } = useContext(UserIdContext);
  const posts = props.posts;

  useEffect(() => {
    if (loadPosts) {
      setLoadPosts(false);
      setCount(count + 5);
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPosts, /*  dispatch, */ count]);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
    }
  };

  const handleAddPost = () => {
    setAddPost(true);
  };
  const handleCancelPost = () => {
    setAddPost(false);
  };
  return (
    <SectionContainer>
      {addPost === false ? (
        <button onClick={handleAddPost} className="btn-active">
          Ajouter
        </button>
      ) : (
        <React.Fragment>
          <button onClick={handleCancelPost} className="btn-active">
            Annuler
          </button>
          <CreatePost cle={userId} pseudo={pseudo} />
        </React.Fragment>
      )}
      <ThreadContainer>
        <ThreadTitle>Fil d'actualité</ThreadTitle>
        <ThreadContentContainer>
          {!isEmpty(posts[0]) &&
            posts.map((post) => {
              return <Card post={post} posts={posts} />;
            })}
        </ThreadContentContainer>
      </ThreadContainer>
    </SectionContainer>
  );
};

export default Thread;
