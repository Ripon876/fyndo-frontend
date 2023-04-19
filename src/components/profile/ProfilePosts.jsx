import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";
import Post from "../posts/Post";
import NewPost from "../newpost/NewPost";
import socket from "../../socket/socket";
import { userPostsAtom } from "../../store/store";
import { useRecoilState } from "recoil";

function ProfilePosts({ userData }) {
  const [cookies, setCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);
  const [userPosts, setUserPosts] = useRecoilState(userPostsAtom);
  const location = useLocation();

  useEffect(() => {
    socket.emit("getProfileInfo", getUserId(), (data) => {
      if (data?.data) {
        let { post, ...ud } = data?.data;
        setUserPosts(post.reverse());
      }
    });
  }, [location]);

  function getUserId() {
    let params = new URLSearchParams(document.location.search);
    return params.get("id");
  }

  const removePost = (id) => {
    const posts = userPosts.filter((post) => post._id !== id);
    setUserPosts(posts);
  };

  return (
    <div className="col-8">
      <NewPost profile user={userData} />
      {userPosts?.map((post) => (
        <Post
          post={post}
          profile
          showOptions={getUserId() === user.id ? true : false}
          rp={removePost}
        />
      ))}
    </div>
  );
}

export default ProfilePosts;
