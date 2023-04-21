import React from "react";
import Moment from "react-moment";
import PostOptions from "./PostOptions";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { decompressFromUTF16 } from "lz-string";
import { useCookies } from "react-cookie";

function Post({ post, profile, showOptions, rp }) {
  const [cookies, setCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);

  return (
    <>
      <div className={profile ? "" : "container"}>
        <div className="row justify-content-center">
          <div className={profile ? "" : "col-9 col-md-6 col-sm-9"}>
            <div className="g-mb-30 media media-comment position-relative postContainer">
              <div className="d-flex py-3 ps-4">
                <div className="ppimg">
                  <Link to={`/profile?id=${post?.creator?.id}`}>
                    <img
                      className="d-flex rounded-circle g-mt-3 g-mr-15"
                      src={
                        post.creator?.profilePhoto
                          ? post.creator?.profilePhoto
                          : "https://via.placeholder.com/200x200"
                      }
                      width={"45px"}
                      height={"45px"}
                      alt="Image Description"
                    />
                  </Link>
                </div>
                <div className="align-items-center d-flex row">
                  <Link to={`/profile?id=${post?.creator?._id}`}>
                    <h5 className="userName mb-0">
                      {post?.creator?.firstName} {post?.creator?.lastName}
                    </h5>
                  </Link>
                  <span className="postTime">
                    <Moment fromNow>{post?.createdAt}</Moment>
                  </span>
                </div>
              </div>

              <div className="p-4 post pt-0">
                <p>{post?.content}</p>

                <div className="postEngagements">
                  <div className="d-flex justify-content-space-around">
                    <div className="col likes">
                      <i className="fa fa-thumbs-up"></i> 178
                    </div>
                    <div className="col comments text-end">
                      {" "}
                      <i className="fa fa-message"> </i> 4
                    </div>
                  </div>
                </div>
              </div>

              {showOptions && <PostOptions id={post._id} rp={rp} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
