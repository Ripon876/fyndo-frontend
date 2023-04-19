import { useEffect } from "react";
import Post from "./Post";
import "./Posts.css";
import socket from "../../socket/socket";
import { postsAtom } from "../../store/store";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import jwt_decode from "jwt-decode";

function Posts() {
  const [posts, setPost] = useRecoilState(postsAtom);
  const [cookies, setCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);

  useEffect(() => {
    socket.emit("getPost", user?.id, (data) => {
      setPost(data.reverse());
    });
  }, []);

  return (
    <>
      {posts?.map((post, i) => (
        <Post post={post} key={"post" + i} />
      ))}
    </>
  );
}

export default Posts;
