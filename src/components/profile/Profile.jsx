import { useQuery, gql } from "@apollo/client";
import "./Profile.css";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import ProfileInfo from "./ProfileInfo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(query, {
    variables: { id },
  });

  return (
    <div className="profile py-4">
      <div className="container">
        <div className="row">
          <div className="col-10 m-auto">
            <ProfileHeader user={data?.user} />
            <div className="row">
              <ProfileInfo user={data?.user} />
              <ProfilePosts userData={data?.user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
