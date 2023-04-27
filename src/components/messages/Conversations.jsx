import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CONVERSATIONS } from "../../queries/conversation";
import Conversation from "./Conversation";

function Conversations() {
  const { loading, data, error } = useQuery(GET_CONVERSATIONS,{
    fetchPolicy: "network-only"
  });

  return (
    <>
      {data?.getConversations?.map((conversation) => (
        <Conversation conversation={conversation} />
      ))}
    </>
  );
}

export default Conversations;
