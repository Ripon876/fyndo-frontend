import Sidebar from "../sidebar/Sidebar";
import NewPost from "../newpost/NewPost";
import SearchBar from "../search/SearchBar";
import Posts from "../posts/Posts";
import { useQuery, gql } from "@apollo/client";
import { Circle2 } from "react-preloaders2";
import { useSelector } from "react-redux";

function Dashboard() {
  const uId = useSelector((state) => state.user.id);

  const query = gql`
    {
      user(id: "${uId}") {
        id
        profilePhoto
      }
    }
  `;

  const { loading, data } = useQuery(query);

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
