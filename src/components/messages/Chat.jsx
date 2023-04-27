import { useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../../queries/message";

function Chat({ messagesEndRef, participantId, conversationId }) {
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]);

  const { loading, data, error } = useQuery(GET_MESSAGES, {
    variables: { id: conversationId },
    fetchPolicy: "network-only"
  });
 
  useEffect(() => {
    scrollToBottom();
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <div className="chat-history">
      <div className="clearfix opacity-0">
        <div className="message other-message">first msg</div>
      </div>

      {data &&
        data?.getMesseges?.map((message) => (
          <div className="clearfix">
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
  );
}

export default Chat;
