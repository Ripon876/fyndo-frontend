import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Post from "../posts/Post";
import NewPost from "../newpost/NewPost";
import { useSelector } from "react-redux";

function ProfilePosts({ userData, posts }) {
  const [cookies, setCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);
  // const posts = useSelector((state) => state.userPosts);
  let postsWithCreator = posts.map((post) => {
    const pwc = {
      ...post,
      creator: {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profilePhoto: userData.profilePhoto,
      },
    };

    return pwc;
  });

  function getUserId() {
    let params = new URLSearchParams(document.location.search);
    return params.get("id");
  }

  return (
    <div className="col-8">
      {getUserId() === user.id && <NewPost profile user={userData} />}
      {postsWithCreator?.map((post) => (
        <Post
          post={post}
          profile
          showOptions={getUserId() === user.id ? true : false}
        />
      ))}
    </div>
  );
}

export default ProfilePosts;
