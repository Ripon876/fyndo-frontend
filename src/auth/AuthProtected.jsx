import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router-dom";

function AuthProtected() {
  const [cookies] = useCookies([]);

  return cookies.token ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthProtected;
