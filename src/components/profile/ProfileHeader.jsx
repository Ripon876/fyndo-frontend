import React from "react";
import UpdateImg from "./UpdateImg";
import { decompressFromUTF16 } from "lz-string";

function ProfileHeader({ user }) {
  return (
    <>
      <div className="profileHeader position-relative">
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
          <div className="profile_img_uploader">
            <UpdateImg id={user?._id} type="cover_photo" />
          </div>
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
          <div className="profile_img_uploader">
            <UpdateImg id={user?._id} type="profile_photo" />
          </div>
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
