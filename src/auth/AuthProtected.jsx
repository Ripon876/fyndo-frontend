import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router-dom";

function AuthProtected() {
  const [cookies, setCookie] = useCookies([]);

  // console.log(cookies.token);

  return cookies.token ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthProtected;
