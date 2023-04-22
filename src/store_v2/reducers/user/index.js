import cookie from "cookie";
import jwtDecode from "jwt-decode";

const token = cookie.parse(document.cookie).token;
const user = jwtDecode(token);
const initialData = { ...user };

const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, ...action.user };
    default:
      return state;
  }
};

export { userReducer };
