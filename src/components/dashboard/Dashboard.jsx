import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import Sidebar from "../sidebar/Sidebar";
import NewPost from "../newpost/NewPost";
import SearchBar from "../search/SearchBar";
import Posts from "../posts/Posts";
import { useQuery, gql } from "@apollo/client";
import { Circle2 } from "react-preloaders2";
import cookie from "cookie";

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [cookies, setCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);

  const query = gql`
    {
      user(id: "${user.id}") {
        id
        profilePhoto
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  return (
    <div>
      {loading && <Circle2 color={"#9ca3af"} />}
      <SearchBar />
      <NewPost user={data?.user} />
      <Posts />
      <Sidebar />
    </div>
  );
}

export default Dashboard;
