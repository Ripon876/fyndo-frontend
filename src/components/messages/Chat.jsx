import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
// import socket from "../../socket/socket";
import io from "socket.io-client";
import { GET_MESSAGES } from "../../queries/message";
import Input from "./Input";

let socket;
function Chat({ messagesEndRef, participantId, conversationId }) {
  const [messages, setMessages] = useState([]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]);

  const { data } = useQuery(GET_MESSAGES, {
    variables: { id: conversationId },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setMessages(data.getMesseges);
      scrollToBottom();
    },
  });

  useEffect(() => {
    scrollToBottom();
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = (msg) => {
    setMessages((old) => [...old, msg]);
  };

  useEffect(() => {
    if (conversationId) {
      socket = io(process.env.REACT_APP_HOST, {
        transports: ["websocket"],
        upgrade: false,
      });
      socket.on("connect", () => {
        console.log("connected");
        socket.emit("JOIN", conversationId);
      });

      socket.on("RECEIVE_MESSAGE", (msg) => {
        addMessage(msg);
      });
    }

    return () => {
      socket?.disconnect();
    };
  }, [conversationId]);

  return (
    <>
      <div className="chat-history">
        <div className="clearfix opacity-0">
          <div className="message other-message">first msg</div>
        </div>

        {messages &&
          messages?.map((message, i) => (
            <div
              className="clearfix"
              key={"message" + i + "of" + conversationId}
            >
              <div
                className={`message ${
                  message?.receiver?.id !== participantId
                    ? "other-message"
                    : "my-message"
                } `}
              >
                {message?.message}
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <Input
        socket={socket}
        addMessage={addMessage}
        messagesEndRef={messagesEndRef}
        participantId={participantId}
        conversationId={conversationId}
      />
    </>
  );
}

export default Chat;
