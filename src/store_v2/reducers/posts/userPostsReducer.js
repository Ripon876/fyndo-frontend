const initialPosts = [];

const userPostsReducer = (state = initialPosts, action) => {
  switch (action.type) {
    case "ADD_USER_POSTS":
      return [...action.posts];

    case "ADD_USER_NEW_POST":
      return [action.post, ...state];
    default:
      return state;
  }
};

export { userPostsReducer };
