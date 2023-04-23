import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router-dom";

function UnProtected() {
  const [cookies] = useCookies([]);

  return cookies.token ? <Navigate to="/" /> : <Outlet />;
}

export default UnProtected;
