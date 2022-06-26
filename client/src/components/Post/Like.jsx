import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";

import { UserIdContext } from "../AppContext";
import { isEmpty } from "../../utils/tools";

const Like = (props) => {
  const post = props.post;
  const [loadPosts, setLoadPosts] = useState(true);
  const userId = useContext(UserIdContext);
  const [addLikes, setAddLikes] = useState(false);
  const [addDislikes, setAddDislikes] = useState(false);
  const posts = useSelector((state) => state.postsReducer);

  const checkUserLiked = [];
  posts.forEach((element) => {
    checkUserLiked.push(element.usersLiked.includes(userId.userId));
  });
  console.log(checkUserLiked);
  const checkUserDisLiked = [];
  posts.forEach((element) => {
    checkUserDisLiked.push(element.usersLiked.includes(userId.userId));
  });
  console.log(checkUserDisLiked);

  useEffect(() => {
    if (!checkUserLiked.includes(userId.userId) && post.likes ) 
     setAddLikes(false);
     if (checkUserLiked.includes(userId.userId)  && post.likes > 0)
     setAddLikes(true);
    }, [addLikes, checkUserLiked, post.likes, userId.userId])

  useEffect(() => {
    if (!checkUserDisLiked.includes(userId.userId))
     setAddDislikes(false);
     if (checkUserDisLiked.includes(userId.userId)  && post.dislikes > 0)
     setAddDislikes(true)
  }, [addDislikes, checkUserDisLiked, post.dislikes, userId.userId]);

  const handleAddLike = (e) => {
    e.preventDefault();
    if (addLikes === false && addDislikes === false) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/likes`,
        withCredentials: true,
        data: {
          posterId: userId.userId,
          likes: 1,
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
        });
    } else {
      swal({
        title: "Refusé!",
        text: "Vous avez déja ajouté un like à ce post!",
        icon: "error",
      });
    }
  };

  const handleRmvLike = (e) => {
    e.preventDefault();
    if (addLikes === true) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/likes`,
        withCredentials: true,
        data: {
          posterId: userId.userId,
          likes: 0,
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
        });
    } else {
      swal({
        title: "Refusé!",
        text: "Vous n'avez pas encore ajouté de like!",
        icon: "error",
      });
    }
  };

  const handleAddDisLike = (e) => {
    e.preventDefault();
    if (addDislikes === false && addLikes === false) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/likes`,
        withCredentials: true,
        data: {
          posterId: userId.userId,
          likes: -1,
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
        });
    } else {
      swal({
        title: "Refusé!",
        text: "Vous avez déja ajouté un dislike à ce post!",
        icon: "error",
      });
    }
  };

  const handleRmvDislike = (e) => {
    e.preventDefault();
    if (addDislikes === true) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/likes`,
        withCredentials: true,
        data: {
          posterId: userId.userId,
          likes: 0,
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
        });
    } else {
      swal({
        title: "Refusé!",
        text: "Vous n'avez pas encore ajouté de dislike!",
        icon: "error",
      });
    }
  };

  return (
    <React.Fragment key={post._id}>
      {addLikes === true ? (
        <React.Fragment>
          <img
            src="images/like.jpg"
            alt="like_pic"
            onClick={handleRmvLike}
            className="like-btn:active"
          />
          <span>{post.likes}</span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img
            src="images/like.jpg"
            alt="like_pic"
            onClick={handleAddLike}
            className="like-btn"
          />
          <span>{post.likes}</span>
        </React.Fragment>
      )}
      {addDislikes === true ? (
        <React.Fragment>
          <img
            src="images/dislike.jpg"
            alt="dislike_pic"
            onClick={handleRmvDislike}
            className="dislike-btn:active"
          />
          <span>{post.dislikes}</span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img
            src="images/dislike.jpg"
            alt="dislike_pic"
            onClick={handleAddDisLike}
            className="dislike-btn"
          />
          <span>{post.dislikes}</span>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Like;
