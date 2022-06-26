import { GET_POSTS, LIKE_POST } from "../actions/post_actions";

const initialState = {};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return (post.likes = 1);
        }
        return post
      });
    default:
      return state;
  }
}
