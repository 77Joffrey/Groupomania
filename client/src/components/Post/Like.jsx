import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

import { UserIdContext } from "../AppContext";

const Like = (props) => {
  const post = props.post;
  const userId = useContext(UserIdContext);
  const [addLikes, setAddLikes] = useState(false);
  const [addDislikes, setAddDislikes] = useState(false);

  useEffect(() => {
    if (post.usersLiked.includes(userId.userId)) setAddLikes(true);
    else setAddLikes(false);
    if (post.usersDisliked.includes(userId.userId)) setAddDislikes(true);
    else setAddDislikes(false);
  }, [userId.userId, post.usersLiked, post.usersDisliked]);

  const handleAddLike = (e) => {
    e.preventDefault();
    if (
      addLikes === false &&
      addDislikes === false &&
      !post.usersLiked.includes(userId.userId)
    ) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/likes`,
        withCredentials: true,
        data: {
          posterId: userId.userId,
        },
      })
        .then(() => {
          swal({
            title: "Ajouté!",
            text: "Le post a bien été liké!",
            icon: "success",
          }).then(() => {
            window.location = "/";
          });
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Attention!",
            text: "Vous n'êtes pas authentifié! Veuillez vous connecter!",
            icon: "error",
          });
          window.location = "/login";
        });
    }
  };

  const handleRmvLike = (e) => {
    e.preventDefault();
    if (addLikes === true && post.usersLiked.includes(userId.userId)) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/likes`,
        withCredentials: true,
        data: {
          posterId: userId.userId,
        },
      })
        .then(() => {
          swal({
            title: "Retiré!",
            text: "Vous avez bien supprimé votre like!",
            icon: "success",
          }).then(() => {
            window.location = "/";
          });
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Attention!",
            text: "Vous n'êtes pas authentifié! Veuillez vous connecter!",
            icon: "error",
          });
          window.location = "/login";
        });
    }
  };

  const handleAddDisLike = (e) => {
    e.preventDefault();
    if (
      addDislikes === false &&
      addLikes === false &&
      !post.usersDisliked.includes(userId.userId)
    ) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/dislikes`,
        withCredentials: true,
        data: {
          posterId: userId.userId,
        },
      })
        .then(() => {
          swal({
            title: "Ajouté!",
            text: "Le post a été disliké!",
            icon: "error",
          }).then(() => {
            window.location = "/";
          });
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Attention!",
            text: "Vous n'êtes pas authentifié! Veuillez vous connecter!",
            icon: "error",
          });
          window.location = "/login";
        });
    }
  };

  const handleRmvDislike = (e) => {
    e.preventDefault();
    if (addDislikes === true && post.usersDisliked.includes(userId.userId)) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/dislikes`,
        withCredentials: true,
        data: {
          posterId: userId.userId,
        },
      })
        .then(() => {
          swal({
            title: "Retiré!",
            text: "Vous avez supprimé votre dislike!",
            icon: "error",
          }).then(() => {
            window.location = "/";
          });
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Attention!",
            text: "Vous n'êtes pas authentifié! Veuillez vous connecter!",
            icon: "error",
          });
          window.location = "/login";
        });
    }
  };

  return (
    <React.Fragment>
      {addLikes === true ? (
        <React.Fragment>
          <img
            src="images/like.jpg"
            alt="like_pic"
            onClick={handleRmvLike}
            className="like-btn-on"
          />
          <span>{post.usersLiked.length}</span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img
            src="images/like.jpg"
            alt="like_pic"
            onClick={handleAddLike}
            className="like-btn-off"
          />
          <span>{post.usersLiked.length}</span>
        </React.Fragment>
      )}
      {addDislikes === true ? (
        <React.Fragment>
          <img
            src="images/dislike.jpg"
            alt="dislike_pic"
            onClick={handleRmvDislike}
            className="dislike-btn-on"
          />
          <span>{post.usersDisliked.length}</span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img
            src="images/dislike.jpg"
            alt="dislike_pic"
            onClick={handleAddDisLike}
            className="dislike-btn-off"
          />
          <span>{post.usersDisliked.length}</span>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Like;
