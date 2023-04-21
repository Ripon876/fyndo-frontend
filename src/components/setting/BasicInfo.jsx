import { useState, useEffect } from "react";
import { Circle2 } from "react-preloaders2";
import { gql, useMutation } from "@apollo/client";
import jwt_decode from "jwt-decode";
import socket from "../../socket/socket";
import Toast from "../../utils/ToastAlert";

function BasicInfo({ user }) {
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });

  useEffect(() => {
    setBasicInfo({
      firstName: user?.firstName,
      lastName: user?.lastName,
      bio: user?.bio,
    });
  }, [user]);

  const props = Object.keys(basicInfo)
    .map((key) => `${key}: ${"$" + key}`)
    .join(",");

  const query = gql`
      mutation {
       updateUser (${props}){
         firstName
         lastName
         bio
       }
     }
     `;

  const [updateInfo, { data, loading, error }] = useMutation(query);

  const saveBasicInfo = () => {
    if (Object.values(basicInfo).some((i) => i !== "")) {
      updateInfo({ variables: { ...basicInfo } });

      if (error) {
        Toast({
          type: "error",
          icon: "error",
          title: "Something went wrong",
        });
      }
      if (data) {
        Toast({
          type: "success",
          icon: "success",
          title: "Basic Information updated",
        });
      }
    }
  };

  return (
    <div className="row">
      {!user && <Circle2 color={"#9ca3af"} />}

      <div className="col-10 m-auto">
        <div className="row">
          <div className="col-12 col-md-8 p-5 settingSections">
            <h4 className="border-start ps-2 mb-4">
              <strong>Basic Info</strong>
            </h4>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <div className="d-flex gap-3">
                <input
                  type="text"
                  defaultValue={basicInfo?.firstName}
                  onChange={(e) => {
                    setBasicInfo({ ...basicInfo, firstName: e.target.value });
                  }}
                  className="form-control"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  defaultValue={basicInfo?.lastName}
                  onChange={(e) => {
                    setBasicInfo({ ...basicInfo, lastName: e.target.value });
                  }}
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Intro</label>

              <textarea
                className="form-control"
                onChange={(e) => {
                  setBasicInfo({ ...basicInfo, bio: e.target.value });
                }}
                defaultValue={basicInfo?.bio}
                placeholder="bio"
                cols="30"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={saveBasicInfo}
              className="btn formSubBtn"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
