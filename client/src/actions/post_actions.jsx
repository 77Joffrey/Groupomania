import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST";


export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/posts`)
            .then((res) => {
                dispatch({type : GET_POSTS, payload : res.data})
            })
            .catch((err) => console.log(err))
    }
}

export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            methode : "patch",
            url : `${process.env.REACT_APP_API_URL}api/posts/${postId}/likes`,
            data : userId
        })
        .then((res) => dispatch({type : LIKE_POST, payload : {postId, userId}}))
        .catch((err) => console.log(err))
    }
}