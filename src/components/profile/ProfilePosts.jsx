import { useSelector } from "react-redux";
import Post from "../posts/Post";
import NewPost from "../newpost/NewPost";

function ProfilePosts({ userData, posts }) {
  const uId = useSelector((state) => state.user.id);
  const state = useSelector((state) => state);

  console.log(state);
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

  console.log(uId, getUserId());
  return (
    <div className="col-8">
      {getUserId() === uId && <NewPost profile user={userData} />}
      {postsWithCreator?.map((post) => (
        <Post
          post={post}
          profile
          showOptions={getUserId() === uId ? true : false}
        />
      ))}
    </div>
  );
}

export default ProfilePosts;
