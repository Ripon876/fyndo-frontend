const initialPosts = [];

const postsReducer = (state = initialPosts, action) => {
  switch (action.type) {
    case "ADD_POSTS":
      return [...action.posts];

    case "ADD_POST":
      return [action.post, ...state];

    case "REMOVE_POST":
      let posts = [...state];
      let filteredPost = posts.filter((post) => post.id !== action.id);
      return [filteredPost];

    default:
      return state;
  }
};

const pageReducer = (state = 1, action) => {
  switch (action.type) {
    case "INCREASE_PAGE":
      return state + 1;
    case "DECREASE_PAGE":
      return state - 1;
    case "DEFAULT":
      return 1;
    default:
      return state;
  }
};

export { postsReducer, pageReducer };
