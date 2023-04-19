import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import Sidebar from "../sidebar/Sidebar";
import NewPost from "../newpost/NewPost";
import SearchBar from "../search/SearchBar";
import Posts from "../posts/Posts";
import socket from "../../socket/socket";

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [cookies, setCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);

  useEffect(() => {
    socket.emit("getProfileInfo", user?.id, (data) => {
      let { post, ...ud } = data?.data;
      setUserData(ud);
    });
  }, [user]);

  return (
    <div>
      <SearchBar />
      <NewPost user={userData} />
      <Posts />
      <Sidebar />
    </div>
  );
}

export default Dashboard;
