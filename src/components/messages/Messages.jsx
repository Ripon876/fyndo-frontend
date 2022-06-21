import React,{useEffect,useState} from 'react';
import {authToken,friendsAtom,userAtom,socketAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import User from  './User';
import ChatHeader  from './ChatHeader';
import Chat  from './Chat';
import Input  from './Input';
import './Messages.css';
import { io } from "socket.io-client";





 const socket = io('http://localhost:5000',{transports: ['websocket'], upgrade: false});




function Messages() {




const token  = useRecoilValue(authToken);
const [friends,setFriends] = useRecoilState(friendsAtom);
const [user, setUser] = useRecoilState(userAtom);




useEffect(() => {
    

    var user = jwt_decode(token)
    // console.log(user)
    setUser(user);

    axios.get('http://localhost:5000/friends',{withCredentials: true })
    .then((data)=> {

     var fns =  data?.data.filter((u)=> {  return u._id !== user.id    })
     setFriends(fns);
     
    })

}, [])





	return (
			<div className="container pt-5 messages">
<div className="row">
    <div className="col-lg-12">
        <div className="card chat-app">
            <div id="plist" className="people-list">
                <div className="d-none input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Search..." />
                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  

{friends?.map((friend)=> 


<>
    {user?.id !== friend._id  && <User user={friend} socket={socket}/> }
</>

)}



                </ul>
            </div>
            <div className="chat">
                <ChatHeader />
                <Chat />
               <Input   socket={socket}/>
             



            </div>
        </div>
    </div>
</div>
</div>
	)
}

export default Messages;