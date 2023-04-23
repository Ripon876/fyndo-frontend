import React, { useEffect } from "react";
import { thredAtom, chatingWithAtom } from "../../store/store";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function ChatHeader() {
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
        <div className="col-lg-6">
          <p data-toggle="modal" data-target="#view_info">
            <img
              src="https://via.placeholder.com/50"
              alt="avatar"
              style={{ visibility: `${!chatingWith ? "hidden" : ""}` }}
            />
          </p>
          <div className="chat-about">
            <h6 className="m-b-0">
              {chatingWith?.first_name} {chatingWith?.last_name}
            </h6>
            {/*{chatingWith && <small>Last seen: 2 hours ago</small>}   */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
