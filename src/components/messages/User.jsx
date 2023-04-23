import { useRecoilState, useRecoilValue } from "recoil";
import { decompressFromUTF16 } from "lz-string";
import {
  thredAtom,
  userAtom,
  messeagesAtom,
  unseenMsgAtom,
  chatingWithAtom,
  activerUsersAtom,
} from "../../store/store";
import axios from "axios";

function User({ user, socket }) {
  const [thred, setThred] = useRecoilState(thredAtom);
  const [, setMessages] = useRecoilState(messeagesAtom);
  const c_user = useRecoilValue(userAtom);
  const activerUsers = useRecoilValue(activerUsersAtom);
  const [unseenMsg, setUnseenMsg] = useRecoilState(unseenMsgAtom);
  const [chatingWith, setChatingWith] = useRecoilState(chatingWithAtom);


  const changeThred = () => {
    if (unseenMsg.id === user._id) {
      setUnseenMsg({ id: "", msg: "" });
    }

    socket.emit("leave_room", thred);
    axios
      .post(
        process.env.REACT_APP_HOST + "/thread",
        {
          users: [c_user.id, user._id],
        },

        { withCredentials: true }
      )
      .then((data) => {
        setChatingWith(data.data.cw);
        setThred(data.data.id);
        setMessages(data.data.messages);
        socket.emit("room", { thread: data.data.id, uId: c_user.id });
      });
  };

  return (
    <li
      className={`clearfix  ${
        user?._id === chatingWith._id ? "selectedChat" : ""
      }`}
      onClick={changeThred}
      key={user?._id}
    >
      <span
        className={`listImg ${
          activerUsers?.includes(user?._id) ? "active" : ""
        } `}
      >
        <img
          src={
            user?.profile_photo
              ? decompressFromUTF16(user?.profile_photo)
              : "https://via.placeholder.com/200x200"
          }
          alt="avatar"
        />
        <div className="activeStatus"></div>
      </span>
      <div className="about">
        <div
          className="name"
          style={{
            fontWeight: `${unseenMsg.id === user?._id ? "bold" : ""}`,
            color: `${unseenMsg.id === user._id ? "#d2d4d6" : "#9ca3af"}`,
          }}
        >
          {user?.first_name} {user.last_name}
        </div>
        {/*{(unseenMsg !== {} ) && <h1>dsfdsfdsfsdfds</h1>}*/}
        {unseenMsg.id === user?._id && (
          <div className="status">New message </div>
        )}{" "}
        {/*<i className="fa fa-circle offline"></i>*/}
      </div>
    </li>
  );
}

export default User;
