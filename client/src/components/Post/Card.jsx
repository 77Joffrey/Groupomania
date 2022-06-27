import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { UserIdContext } from "../../components/AppContext";
import axios from "axios";
import swal from "sweetalert";

import Like from "./Like";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import { Loader } from "../../utils/style/loader";
import { isEmpty, dateParser } from "../../utils/tools";
import UpdatePost from "./UpdatePost";

const CardContainer = styled.li`
display : flex;
flex-direction : column;
  margin: 15px 0 15px 0;
  padding: 5px;
  width: 100%;
  height: fit-content;
  border: 4px ${colors.tertiary} double;
  border-radius: 10px;
  background-color: #FFF;
  cursor : default
`;

const CardPicture = styled.img`
  width: 360px;
  height: 250px;
  border-radius: 10px;
`;

const LikeContainer = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
  justify-content : flex-end;
  width : 90%;
  height : fit-content;
  margin : 5px 0 5px auto;
`
const CardPosterStyle = styled.h2`
  display : flex;
  align-self : flex-start;
  width : fit-content;
  margin-left : 10px;
`


const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingUpdatePost, setLoadingUpdatePost] = useState(false);
  const posts = useSelector((state) => state.postsReducer); 
  const { userId, role } = useContext(UserIdContext);


  const loadUpdatePost = (e) => {
    setLoadingUpdatePost(true);
  };
  const cancelUpdatePost = (e) => {
    setLoadingUpdatePost(false);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}`,
      withCredentials: true,
    })
      .then(() => {
        swal({
          title: "Supprimé!",
          text: "Votre post a bien été supprimé!",
          icon: "success",
        })
        .then(() => {
          window.location = "/"
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    !isEmpty(posts[0]) && setIsLoading(false);
  }, [posts]);

  return (
    <CardContainer >
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {role === "admin" ? (
            <React.Fragment>
              <CardPosterStyle post={post}>{post.posterPseudo} à écrit :</CardPosterStyle>
              <p className="post-message">{post.message}</p>
              {post.picture ? (
                <div>
                  <CardPicture src={`images/posts/${post.picture}`} alt="user_post_pic" />
                </div>
              ) : null}
              <div>
              {loadingUpdatePost === false ? (
                <input className="btn-active"
                  type={"button"}
                  value={"Modifier"}
                  onClick={loadUpdatePost}
                /> ) : (
                  <input className="btn-active"
                    type={"button"}
                    value={"Annuler"}
                    onClick={cancelUpdatePost}
                  /> )}
                <input
                  type={"submit"}
                  value={"Supprimer"}
                  onClick={handleDeletePost}
                  className="supprimer btn-active"
                />
                {loadingUpdatePost === true ? (
                  <UpdatePost
                    post={post}
                    postid={post._id}
                    message={post.message}
                    picture={post.picture}
                  />
                ) : null}
              </div>
              <LikeContainer>
                <Like post={post} />
              </LikeContainer>
              <div className="timestamps-style">
                Posté : {dateParser(post.createdAt)} <br/>Mis à jour : {dateParser(post.updatedAt)}
              </div>
            </React.Fragment>
          ) : post.posterId === userId && role === "user" ? (
            <React.Fragment>
              <CardPosterStyle post={post}>{post.posterPseudo} à écrit :</CardPosterStyle>
              <p className="post-message">{post.message}</p>
              {post.picture ? (
                <div>
                  <CardPicture src={`images/posts/${post.picture}`} alt="user_post_pic" />
                </div>
              ) : null}
              <div>
                <input className="btn-active"
                  type={"button"}
                  value={"Modifier"}
                  onClick={loadUpdatePost}
                />
                <input
                  type={"submit"}
                  value={"Supprimer"}
                  onClick={handleDeletePost}
                  className="supprimer btn-active"
                />
                {loadingUpdatePost === true ? (
                  <UpdatePost
                    post={post}
                    postid={post._id}
                    message={post.message}
                    picture={post.picture}
                  />
                ) : null}
              </div>
              <LikeContainer>
                <Like post={post} />
              </LikeContainer>
              <div className="timestamps-style">
                Posté : {dateParser(post.createdAt)} <br/>Mis à jour : {dateParser(post.updatedAt)}
              </div>
            </React.Fragment>
          ) : post.posterId !== userId && role === "user" ? (
            <React.Fragment>
              <CardPosterStyle post={post}>{post.posterPseudo} à écrit :</CardPosterStyle>
              <p className="post-message">{post.message}</p>
              {post.picture ? (
                <div>
                  <CardPicture src={`images/posts/${post.picture}`} alt="user_post_pic" />
                </div>
              ) : null}
              <LikeContainer>
                <Like post={post} />
              </LikeContainer>
              <div className="timestamps-style">
                Posté : {dateParser(post.createdAt)} <br/>Mis à jour : {dateParser(post.updatedAt)}
              </div>
            </React.Fragment>
          ) : null}
        </div>
      )}
    </CardContainer>
  );
};

export default Card;
