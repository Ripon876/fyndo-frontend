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
import { GET_CONVERSATION } from "../../queries/conversation";
import { useMutation, useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import Conversations from "./Conversations";

function Messages() {
  const messagesEndRef = useRef(null);
  const { id } = useParams();
  const location = useLocation();

  const [createConversation, { data, error: er }] =
    useMutation(GET_CONVERSATION);

  useEffect(() => {
    createConversation({
      variables: { participant: id },
    });
  }, [location]);

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
                <Conversations />
              </ul>
            </div>
            <div className="chat ms-auto">
              <ChatHeader
                participant={data?.getConversation?.participants[0]}
              />
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
