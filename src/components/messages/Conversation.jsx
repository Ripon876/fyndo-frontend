import React from "react";
import { useNavigate } from "react-router-dom";

function Conversation({ conversation }) {
  const navigate = useNavigate();
  const { id, participants, lastMessage } = conversation;

  return (
    <li
      className="clearfix"
      onClick={() => navigate("/messages/" + participants[0].id)}
    >
      <span className="listImg active">
        <img src={participants[0]?.profilePhoto} alt="avatar" />
        <div className="activeStatus"></div>
      </span>
      <div className="about">
        <div
          className="name"
          style={{
            color: "9ca3af",
          }}
        >
          {participants[0]?.firstName} {participants[0]?.lastName}
        </div>
        <div className="status">New message </div>
      </div>
    </li>
  );
}

export default Conversation;
