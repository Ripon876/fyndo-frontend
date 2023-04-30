import { useState, useEffect, useCallback } from "react";
import {
  thredAtom,
  chatingWithAtom,
  userAtom,
  messeagesAtom,
} from "../../store/store";
import { useRecoilValue, useRecoilState } from "recoil";
import FileUploader from "../../utils/FileUploader";
import EmojiPopUp from "../../utils/EmojiPopUp";
import { useMutation } from "@apollo/client";
import { CREATE_MESSAGE } from "../../queries/message";
import { useSelector } from "react-redux";

function Input({
  messagesEndRef,
  participantId,
  conversationId,
  addMessage,
  socket,
}) {
  const [msg, setMsg] = useState("");
  const [showUploader, setShowUploader] = useState(false);
  const [, setMessages] = useRecoilState(messeagesAtom);
  const thred = useRecoilValue(thredAtom);
  const chatingWith = useRecoilValue(chatingWithAtom);
  const user = useRecoilValue(userAtom);
  const uId = useSelector((state) => state.user.id);

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const emojiRegex = /\p{Emoji}/u;

  const sendMsg = () => {
    let m = msg.replaceAll("(:", "🙂");

    if (msg !== "") {
      socket?.emit("SEND_MESSAGE", {
        receiver: participantId,
        sender: uId,
        conversation: conversationId,
        message: msg,
      });

      // createMessage({
      //   variables: {
      //     receiver: participantId,
      //     conversation: conversationId,
      //     message: msg,
      //   },
      // });
      addMessage({
        receiver: {
          id: participantId,
        },
        message: msg,
      });
      setMsg("");
    }
  };

  const send_Msg = (e) => {
    if (e.key === "Enter" && msg !== "") {
      sendMsg();
    }
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]);

  useEffect(() => {
    scrollToBottom();
    scrollToBottom();
  }, [scrollToBottom]);

  const addEmoji = (e) => {
    setMsg(msg + e.native);
  };

  return (
    <>
      {/* {showUploader && (
        <FileUploader
          su={setShowUploader}
          u={user}
          t={thred}
          cw={chatingWith}
          sm={setMessages}
        />
      )} */}
      {chatingWith && (
        <div className="msgInput p-3">
          <div className="align-items-center d-flex position-relative">
            <div>
              <h1
                className="fileChoserIcon p-1 mx-2"
                onClick={() => {
                  setShowUploader(true);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </h1>
            </div>
            <div className="msInput">
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyPress={(e) => {
                  send_Msg(e);
                }}
              />
              <div className="addEmoji sendBtn">
                <span>
                  <EmojiPopUp f={addEmoji}>
                    <i className="fa-solid fa-face-grin"></i>{" "}
                  </EmojiPopUp>
                </span>
              </div>
            </div>

            <div className="sendBtn">
              <button onClick={sendMsg}>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Input;
