import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CONVERSATIONS } from "../../queries/conversation";
import Conversation from "./Conversation";

function Conversations() {
  const { data } = useQuery(GET_CONVERSATIONS, {
    fetchPolicy: "network-only",
  });

  return (
    <>
      <div id="plist" className="m-auto people-list pe-0">
        {/* <div className="d-none input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-search"></i>
            </span>
          </div>
          <input type="text" className="form-control" placeholder="Search..." />
        </div> */}
        <ul className="list-unstyled chat-list mt-2 mb-0">
          {data?.getConversations?.map((conversation) => (
            <Conversation conversation={conversation} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Conversations;
