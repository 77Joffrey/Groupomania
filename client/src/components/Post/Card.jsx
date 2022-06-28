import React, { useEffect, useState, useContext } from "react";
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
  display: flex;
  margin: 15px 0 15px 0;
  padding: 10px;
  width: 100%;
  height: fit-content;
  border: 4px ${colors.tertiary} double;
  border-radius: 10px;
  background-color: #fff;
  cursor: default;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    width: 100%;
  }
  @media screen and (max-width: 599px) {
    width: 90%;
    margin: 15px auto 15px auto;
    justify-content: ;
  }
`;

const CardContentStyle = styled.div`
  width : 100%;
  height : 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content : space-evenly;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    flex-direction : column;
    justify-content : space-evenly;
    align-items : center;
  }
  @media screen and (max-width: 599px) {
    width: 90%;
    margin: 15px auto 15px auto;
    justify-content: space-between;
  }
`;

const CardPictureContainer = styled.div`
  width : 55%;
  height : 50%;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    width: 80%;
    height 50%: 
  }
  @media screen and (max-width: 599px) {
    width : 100%;
    height : 60%;
  }
`

const CardPicture = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    width: 80%;
  }
  @media screen and (max-width: 599px) {
    width : 100%;
    height : 100%;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 90%;
  height: fit-content;
  margin: 5px 0 5px auto;
`;

const CardPosterStyle = styled.h2`
  display: flex;
  align-self: flex-start;
  align-items : center;
  width: 80%;
  margin: 15px auto 15px 10px;
  @media screen and (min-width: 600px) and (max-width: 992px) {
    width: 90%;
  }
  @media screen and (max-width: 599px) {
    width : 100%
  }
`;

const Card = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingUpdatePost, setLoadingUpdatePost] = useState(false);
  const posts = props.posts;
  const post = props.post;

  const { userId, role } = useContext(UserIdContext);

  const handleLoadUpdatePost = (e) => {
    setLoadingUpdatePost(true);
  };
  const handleCancelUpdatePost = (e) => {
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
        }).then(() => {
          window.location = "/";
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    !isEmpty(posts[0]) && setIsLoading(false);
  }, [posts]);

  return (
    <CardContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <CardContentStyle>
          {role === "admin" ? (
            <React.Fragment>
              <CardPosterStyle post={post}>
                {post.posterPseudo} à écrit :
              </CardPosterStyle>
              <p className="post-message">{post.message}</p>
              {post.picture ? (
                <CardPictureContainer>
                  <CardPicture
                    src={`images/posts/${post.picture}`}
                    alt="user_post_pic"
                  />
                </CardPictureContainer>
              ) : null}
              <div>
                {loadingUpdatePost === false ? (
                  <input
                    className="btn-active"
                    type={"button"}
                    value={"Modifier"}
                    onClick={handleLoadUpdatePost}
                  />
                ) : (
                  <input
                    className="btn-active"
                    type={"button"}
                    value={"Annuler"}
                    onClick={handleCancelUpdatePost}
                  />
                )}
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
                Posté : {dateParser(post.createdAt)} <br />
                Mis à jour : {dateParser(post.updatedAt)}
              </div>
            </React.Fragment>
          ) : post.posterId === userId && role === "user" ? (
            <React.Fragment>
              <CardPosterStyle post={post}>
                {post.posterPseudo} à écrit :
              </CardPosterStyle>
              <p className="post-message">{post.message}</p>
              {post.picture ? (
                <CardPictureContainer>
                  <CardPicture
                    src={`images/posts/${post.picture}`}
                    alt="user_post_pic"
                  />
                </CardPictureContainer>
              ) : null}
              <div>
                {loadingUpdatePost === false ? (
                  <input
                    className="btn-active"
                    type={"button"}
                    value={"Modifier"}
                    onClick={handleLoadUpdatePost}
                  />
                ) : (
                  <input
                    className="btn-active"
                    type={"button"}
                    value={"Annuler"}
                    onClick={handleCancelUpdatePost}
                  />
                )}
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
                Posté : {dateParser(post.createdAt)} <br />
                Mis à jour : {dateParser(post.updatedAt)}
              </div>
            </React.Fragment>
          ) : post.posterId !== userId && role === "user" ? (
            <React.Fragment>
              <CardPosterStyle post={post}>
                {post.posterPseudo} à écrit :
              </CardPosterStyle>
              <p className="post-message">{post.message}</p>
              {post.picture ? (
                <CardPictureContainer>
                  <CardPicture
                    src={`images/posts/${post.picture}`}
                    alt="user_post_pic"
                  />
                </CardPictureContainer>
              ) : null}
              <LikeContainer>
                <Like post={post} />
              </LikeContainer>
              <div className="timestamps-style">
                Posté : {dateParser(post.createdAt)} <br />
                Mis à jour : {dateParser(post.updatedAt)}
              </div>
            </React.Fragment>
          ) : null}
        </CardContentStyle>
      )}
    </CardContainer>
  );
};

export default Card;
