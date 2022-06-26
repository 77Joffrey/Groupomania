import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import usersReducer from "./users_reducer";
import postsReducer from "./posts_reducer";


export default combineReducers({
    usersReducer, userReducer, postsReducer
})