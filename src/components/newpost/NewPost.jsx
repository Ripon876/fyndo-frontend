import { useState } from "react";
import { Link } from "react-router-dom";
import { decompressFromUTF16 } from "lz-string";
import "./NewPost.css";
import Form from "./Form";

function NewPost({ profile, user }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div>
        <div className={profile ? "" : "container py-3"}>
          <div className="row height d-flex justify-content-center align-items-center">
            <div className={profile ? "" : "col-9 col-md-6 col-sm-9"}>
              <div className="form d-flex">
                <Link to={"/profile/?id=" + user?.id}>
                  <img
                    className="me-2 p-1 profileImg"
                    style={{ height: "50px", width: "50px" }}
                    src={
                      user?.profilePhoto
                        ? user?.profilePhoto
                        : "https://via.placeholder.com/200x200"
                    }
                    alt="Id name"
                  />
                </Link>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Write something.."
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <Form close={closeModal} profile />}
    </>
  );
}

export default NewPost;
