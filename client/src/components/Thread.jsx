import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post_actions";
import Card from "./Post/Card";
import CreatePost from "./Post/CreatePost";

import { isEmpty } from "../utils/tools";
import styled from "styled-components";
import colors from "../utils/style/colors";
import { UserIdContext } from "./AppContext";


const ThreadContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    background-color : ${colors.secondary}
`

const ThreadContentContainer = styled.ul`
    margin : 0 ;
    padding : 0;
    width : 600px
`
const ThreadTitle = styled.h2`
    display : flex;
    align-self : flex-start;
    margin-left : 15px
`

const Thread = () => {
    const [loadPosts, setLoadPosts] = useState(true)
    const [addPost, setAddPost] = useState(false)
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postsReducer)
    const {userId, pseudo} = useContext(UserIdContext)

useEffect(() => {
    if(loadPosts){
        dispatch(getPosts())
        setLoadPosts(false)
    }

}, [dispatch, loadPosts]);

const handleAddPost = () => {
    setAddPost(true)
}

  return (
        <section>
            <button onClick={handleAddPost} className="btn-active" >Ajouter</button>
            {
                addPost ? <CreatePost cle={userId} pseudo={pseudo} /> : null
            }
        <ThreadContainer>
            <ThreadTitle>Fil d'actualité</ThreadTitle>
        <ThreadContentContainer>
            {!isEmpty(posts[0]) && posts.map((post) => {
                return <Card post={post} /* postid={post._id} *//>
            })
            }
        </ThreadContentContainer>
            
        </ThreadContainer>
        </section>

  )
};

export default Thread;
