import { useQuery } from "@apollo/client";
import Post from "./Post";
import "./Posts.css";
import { GET_ALL_POSTS } from "../../queries/post";

function Posts() {
  const { data } = useQuery(GET_ALL_POSTS);

  return (
    <>
      {data &&
        data.posts?.map((post, i) => <Post post={post} key={"post" + i} />)}
    </>
  );
}

export default Posts;