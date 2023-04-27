import React, { useEffect } from "react";
import { thredAtom, chatingWithAtom } from "../../store/store";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function ChatHeader({ participant }) {
  const thred = useRecoilValue(thredAtom);
  const chatingWith = useRecoilValue(chatingWithAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (thred) {
      navigate({
        pathname: "/messages",
        search: `?thredId=${thred}`,
      });
    }
  }, [thred, navigate]);

  return (
    <div className="chat-header clearfix">
      <div className="row">
        <div className="align-items-center col-lg-6 d-flex">
          <img
            src={
              participant?.profilePhoto
                ? participant?.profilePhoto
                : "/chatHeaderPH.png"
            }
            alt="avatar"
            style={{ visibility: `${!chatingWith ? "hidden" : ""}` }}
          />

          <div className="align-items-center chat-about d-flex h-100">
            <h6 className="m-0">
              {participant?.firstName} {participant?.lastName}
            </h6>
            {/*{chatingWith && <small>Last seen: 2 hours ago</small>}   */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
