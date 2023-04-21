import { combineReducers } from "redux";
import { postsReducer } from "./posts/postsReducer";
const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;
