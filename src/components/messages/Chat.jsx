import { useEffect, useRef, useState, useCallback } from "react";
import {
  thredAtom,
  chatingWithAtom,
  messeagesAtom,
  lastMsgAtom,
} from "../../store/store";
import { useRecoilValue, useRecoilState } from "recoil";
import { decompressFromUTF16 } from "lz-string";
import socket from "../../socket/socket";
import Toast from "../../utils/ToastAlert";
import { TailSpin } from "react-loader-spinner";
import PopUp from "./PopUp";

function Chat({ messagesEndRef }) {
  const chatingWith = useRecoilValue(chatingWithAtom);
  const thred = useRecoilValue(thredAtom);
  const [messages, setMessages] = useRecoilState(messeagesAtom);
  const [pnum, setPnum] = useState(1);
  const listInnerRef = useRef();
  const lm = useRecoilValue(lastMsgAtom);
  const [msgLoader, setMsgLoader] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");


  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]);

  const closePopUP = () => {
    setShowPopUp();
  };

  useEffect(() => {
    scrollToBottom();
    scrollToBottom();
  }, [lm, scrollToBottom]);

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setPnum((prevNum) => prevNum + 1);
    }
  };

  useEffect(() => {
    if (pnum !== 1) {
      setMsgLoader(true);
      socket.emit("getOldMessages", thred, pnum, (res) => {
        if (res.status) {
          setMsgLoader(false);
          console.log(res.messages);
          setMessages((prev) => [...res.messages, ...prev]);
        } else {
          setMsgLoader(false);
          Toast({
            type: res.type,
            icon: res.type,
            title: res.msg,
          });
        }
      });
    }
  }, [pnum, setMessages, thred]);

  return (
    <div className="chat-history">
      {showPopUp && <PopUp imgSrc={selectedImg} closePopUP={closePopUP} />}
      <ul className="m-b-0  px-4" onScroll={handleScroll} ref={listInnerRef}>
        <div className="msgLoadingAnm">
          {msgLoader && <TailSpin color="#9CA3AF" height={80} width={80} />}
        </div>

        {chatingWith &&
          messages?.map((msg, i) => (
            <li className="clearfix" key={"sd433dsf" + i}>
              {/*  
                                    <div className="message-data">
                                          <span className="message-data-time"></span>
                                    </div>
                               */}
              <div
                className={`message  ${
                  msg?.from?.id === chatingWith?._id
                    ? "other-message"
                    : "my-message float-right"
                } ${msg.type === "emoji" ? "emoji" : ""} `}
              >
                {msg.type === "text" ? (
                  msg.msg
                ) : (
                  <>
                    <img
                      alt=""
                      src={decompressFromUTF16(msg?.msg)}
                      onClick={(e) => {
                        setSelectedImg(e.target.src);
                        setShowPopUp(!showPopUp);
                      }}
                      className="img-fluid"
                    />
                  </>
                )}
                {msg.type === "emoji" ? msg.msg : ""}
              </div>
            </li>
          ))}

        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
}

export default Chat;
