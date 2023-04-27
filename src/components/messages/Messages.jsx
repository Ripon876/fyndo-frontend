import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import Chat from "./Chat";
import Input from "./Input";
import "./Messages.css";
import socket from "../../socket/socket";
import { GET_CONVERSATION } from "../../queries/conversation";
import { useMutation } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import Conversations from "./Conversations";

function Messages() {
  const messagesEndRef = useRef(null);
  const { id } = useParams();
  const location = useLocation();

  let [createConversation, { data }] = useMutation(GET_CONVERSATION);

  const chooseCn = id === "choose-conversation" || id.length !== 21;

  useEffect(() => {
    if (!chooseCn) {
      createConversation({
        variables: { participant: id },
      });
    } else {
      console.log("choose-conversation");
      data = null;
    }
  }, [location]);

  return (
    <div className="container pt-5 messages">
      {/* <FileUploader /> */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card chat-app">
            <Conversations />
            {!chooseCn ? (
              <div className="chat ms-auto">
                <ChatHeader
                  participant={data?.getConversation?.participants[0]}
                />
                <Chat
                  messagesEndRef={messagesEndRef}
                  participantId={data?.getConversation?.participants[0]?.id}
                  conversationId={data?.getConversation?.id}
                />
                <Input
                  messagesEndRef={messagesEndRef}
                  socket={socket}
                  participantId={data?.getConversation?.participants[0]?.id}
                  conversationId={data?.getConversation?.id}
                />
              </div>
            ) : (
              <div class="align-items-center chat d-flex justify-content-center ms-auto">
                <h1 style={{ color: "#9ca3af" }}>Choose a conversation 😉</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
