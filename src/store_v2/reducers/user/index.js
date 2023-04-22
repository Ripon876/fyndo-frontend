const initialData = {};

const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_USER":
      console.log("adding user", action.user);
      return { ...state, ...action.user };
    default:
      return state;
  }
};

export { userReducer };
