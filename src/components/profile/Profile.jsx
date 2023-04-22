import { useQuery, gql } from "@apollo/client";
import "./Profile.css";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import ProfileInfo from "./ProfileInfo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Circle2 } from "react-preloaders2";

function Profile() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const location = useLocation();

  useEffect(() => {
    console.log("id updated");
    if (!id || id.length !== 21) {
      return (window.location = "/");
    }
  }, [location]);

  const query = gql`
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        firstName
        lastName
        bio
        email
        phone
        address
        profilePhoto
        coverPhoto
        posts {
          id
          content
          createdAt
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    variables: { id },
  });
  let postsWithCreator;
  if (data) {
    const { posts, ...userData } = data.user;
    postsWithCreator = posts.map((post) => {
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
  }

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
                <ProfilePosts userData={data?.user} posts={postsWithCreator} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
