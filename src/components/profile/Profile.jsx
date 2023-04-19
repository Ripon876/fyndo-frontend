import { useEffect, useState } from "react";
import socket from "../../socket/socket";
import { useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import "./Profile.css";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import ProfileInfo from "./ProfileInfo";
import { useLocation } from "react-router-dom";
import { fileAtom } from "../../store/store";

function Profile() {
  const [cookies, setCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);
  const file = useRecoilValue(fileAtom);

  const [userData, setUserData] = useState({});
  const location = useLocation();

  useEffect(() => {
    socket.emit("getProfileInfo", getUserId(), (data) => {
      if (data?.data) {
        let { post, ...ud } = data?.data;
        setUserData(ud);
      }
    });
    console.log("file changed");
  }, [location, file]);

  function getUserId() {
    let params = new URLSearchParams(document.location.search);
    return params.get("id");
  }

  return (
    <div className="profile py-4">
      <div className="container">
        <div className="row">
          <div className="col-10 m-auto">
            <ProfileHeader user={userData} />
            <div className="row">
              <ProfileInfo user={userData} />
              <ProfilePosts userData={userData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
