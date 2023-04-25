import { useEffect, useRef } from "react";
import {
  friendsAtom,
  userAtom,
  thredAtom,
  messeagesAtom,
  chatingWithAtom,
  unseenMsgAtom,
  activerUsersAtom,
} from "../../store/store";
import { useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "./User";
import ChatHeader from "./ChatHeader";
import Chat from "./Chat";
import Input from "./Input";
import "./Messages.css";
import socket from "../../socket/socket";

function Messages() {
  const [cookies] = useCookies([]);
  const token = cookies.token;
  const currentUser = jwt_decode(token);

  const [friends, setFriends] = useRecoilState(friendsAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [, setUnseenMsg] = useRecoilState(unseenMsgAtom);
  const [, setActiverUsers] = useRecoilState(activerUsersAtom);
  const messagesEndRef = useRef(null);

  const [, setThred] = useRecoilState(thredAtom);
  const [, setMessages] = useRecoilState(messeagesAtom);
  const [, setChatingWith] = useRecoilState(chatingWithAtom);

  function getThreadId() {
    let params = new URLSearchParams(document.location.search);
    return params.get("thredId");
  }

  useEffect(() => {
    setUser(user);

    axios
      .get(process.env.REACT_APP_HOST + "/friends", {
        withCredentials: true,
      })
      .then((data) => {
        var fns = data?.data.filter((u) => {
          return u._id !== user.id;
        });
        setFriends(fns);
      })
      .then(() => {
        if (getThreadId() && getThreadId().length !== 0) {
          setThred(getThreadId());

          axios
            .post(
              process.env.REACT_APP_HOST + "/thread?id=" + getThreadId(),
              {
                userId: currentUser.id,
              },

              { withCredentials: true }
            )
            .then((data) => {
              setMessages(data?.data.messages);
              setChatingWith(data?.data.cw);
              socket.emit("room", {
                thread: data.data.id,
                uId: user.id,
              });
            });
        }
      });
  }, [
    currentUser.id,
    setChatingWith,
    setFriends,
    setMessages,
    setThred,
    setUser,
    user,
  ]);

  useEffect(() => {
    socket.on("receive_message_not_seen", (data) => {
      // console.log('this message not seen yet : ',data)
      var newUnseenMsg = {
        id: data.from.id,
        msg: data.msg,
      };
      setUnseenMsg(newUnseenMsg);
    });

    socket.on("currentlyActiveUsers", (users) => {
      // console.log(users);
      setActiverUsers(users.filter((user) => user !== currentUser.id));
    });
  }, [currentUser.id, setActiverUsers, setUnseenMsg]);

  useEffect(() => {
    socket.emit("getActiveUsers", (users) => {
      setActiverUsers(users.filter((user) => user !== currentUser.id));
    });
  }, [currentUser.id, setActiverUsers]);

  return (
    <div className="container pt-5 messages">
      {/* <FileUploader /> */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="m-auto people-list pe-0">
              <div className="d-none input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                {new Array(20).fill("d").map(() => (
                  <U />
                ))}
                {friends?.map((friend, i) => (
                  <>
                    {user?.id !== friend._id && (
                      <User user={friend} socket={socket} key={"sdfs343" + i} />
                    )}
                  </>
                ))}
              </ul>
            </div>
            <div className="chat ms-auto">
              <ChatHeader />
              <Chat messagesEndRef={messagesEndRef} />
              <Input messagesEndRef={messagesEndRef} socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;

const U = () => {
  return (
    <li
      className="clearfix"
      
    >
      <span className="listImg active">
        <img src="https://via.placeholder.com/200x200" alt="avatar" />
        <div className="activeStatus"></div>
      </span>
      <div className="about">
        <div
          className="name"
          style={{
            color: "9ca3af",
          }}
        >
          MD Ripon Islam
        </div>
        <div className="status">New message </div>
      </div>
    </li>
  );
};
