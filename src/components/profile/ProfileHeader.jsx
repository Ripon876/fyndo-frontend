import { useState } from "react";
import UpdateImg from "./UpdateImg";
import jwtDecode from "jwt-decode";
import cookie from "cookie";
import { Circle2 } from "react-preloaders2";

function ProfileHeader({ user }) {
  const decode = jwtDecode(cookie.parse(document.cookie).token);
  const [upaloading, setUpaloading] = useState(false);

  return (
    <>
      <div className="profileHeader position-relative">
        {upaloading && <Circle2 color={"#9ca3af"} />}
        <div className="coverPhoto position-relative">
          <img
            style={{ height: "360px", objectFit: "cover" }}
            src={
              user?.coverPhoto
                ? user?.coverPhoto
                : "https://via.placeholder.com/650x300"
            }
            className="img-fluid w-100 rounded-top"
            alt="Cover Photo"
          />
          <div className="bottom-0 coverFadeBottom position-absolute w-100"></div>
          {decode?.id === user?.id && (
            <div className="profile_img_uploader">
              <UpdateImg
                id={user.id}
                type="coverPhoto"
                ul={upaloading}
                sul={setUpaloading}
              />
            </div>
          )}
        </div>
        <div className="profilePhoto">
          <img
            src={
              user?.profilePhoto
                ? user?.profilePhoto
                : "https://via.placeholder.com/200x200"
            }
            alt="Profile photo"
            className="rounded-circle w-100"
          />
          {decode?.id === user?.id && (
            <div className="profile_img_uploader">
              <UpdateImg
                id={user?.id}
                type="profilePhoto"
                ul={upaloading}
                sul={setUpaloading}
              />
            </div>
          )}
        </div>
      </div>
      <div className="my-2 mb-5 pt-4 text-center userName">
        <h1>
          {user?.firstName} {user?.lastName}
        </h1>
      </div>
    </>
  );
}

export default ProfileHeader;
