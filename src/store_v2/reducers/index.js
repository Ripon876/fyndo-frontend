import { combineReducers } from "redux";
import { postsReducer, pageReducer } from "./posts/postsReducer";
import { userPostsReducer } from "./posts/userPostsReducer";
import { userReducer } from "./user";
const rootReducer = combineReducers({
  posts: postsReducer,
  userPosts: userPostsReducer,
  user: userReducer,
  page: pageReducer,
});

export default rootReducer;
