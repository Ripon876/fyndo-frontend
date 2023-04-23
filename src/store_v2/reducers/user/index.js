import cookie from "cookie";
import jwtDecode from "jwt-decode";
let user;

if (!cookie.parse(document.cookie).token) {
  console.log("no user");
  user = {};
} else {
  user = jwtDecode(cookie.parse(document.cookie).token);
}

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
