import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import socket from "../../socket/socket";
import "./Sidebar.css";

function Sidebar({ l }) {
  const [cookies, , removeCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);

  const logOut = () => {
    console.log("logging out");
    socket.disconnect();
    removeCookie("token");
    window.location = "/login";
  };

  return (
    <div>
      <nav className="social">
        <ul>
          <li>
            <Link to="/">
              Home <i className="fa-solid fa-house"></i>
            </Link>
          </li>
          <li>
            <Link to={`/profile?id=${user.id}`}>
              Profile <i className="fa-solid fa-user"></i>
            </Link>
          </li>
          <li>
            <Link to="/messages/choose-conversation">
              Messages <i className="fa-brands fa-facebook-messenger"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              Video <i className="fa-solid fa-video"></i>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              Settings <i className="fa-solid fa-bars"></i>
            </Link>
          </li>
          <li>
            <Link to="#" onClick={logOut}>
              Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
