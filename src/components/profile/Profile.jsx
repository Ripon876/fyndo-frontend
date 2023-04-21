import { useQuery, gql } from "@apollo/client";
import "./Profile.css";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import ProfileInfo from "./ProfileInfo";
import { Circle2 } from "react-preloaders2";

function Profile() {
  const query = gql`
    {
      user {
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

  const { loading, error, data } = useQuery(query);
  
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
