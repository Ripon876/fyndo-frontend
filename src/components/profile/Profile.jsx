import { useQuery } from "@apollo/client";
import "./Profile.css";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import ProfileInfo from "./ProfileInfo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Circle2 } from "react-preloaders2";
import { GET_USER_DATA } from "../../queries/profile";

function Profile() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const location = useLocation();




  useEffect(() => {
    console.log("id updated");
    if (!id || id.length !== 21) {
      return (window.location = "/");
    }
  }, [location,id]);

  const { loading, data } = useQuery(GET_USER_DATA, {
    variables: { id },
    // fetchPolicy: "network-only",
  });

  return (
    <div className="profile py-4">
      {loading && <Circle2 color={"#9ca3af"} />}
      <div className="container">
        <div className="row">
          <div className="col-10 m-auto">
            <ProfileHeader user={data?.user} />
            <div className="row">
              <ProfileInfo user={data?.user} />
              {data && (
                <ProfilePosts userData={data?.user} posts={data?.user.posts} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
