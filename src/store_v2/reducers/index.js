import { combineReducers } from "redux";
import { postsReducer } from "./posts/postsReducer";
import { userPostsReducer } from "./posts/userPostsReducer";
import { userReducer } from "./user";
const rootReducer = combineReducers({
  posts: postsReducer,
  userPosts: userPostsReducer,
  user: userReducer,
});

export default rootReducer;
