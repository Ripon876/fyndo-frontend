import {useEffect,useState,useRef} from 'react';
import {authToken,friendsAtom,userAtom,thredAtom,messeagesAtom,chatingWithAtom,unseenMsgAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import User from  './User';
import ChatHeader  from './ChatHeader';
import Chat  from './Chat';
import Input  from './Input';
import './Messages.css';
// import { io } from "socket.io-client";
import socket from '../../socket/socket';




 // const socket = io('http://localhost:5000',{transports: ['websocket'], upgrade: false});




function Messages() {

const token  = useRecoilValue(authToken);
const [friends,setFriends] = useRecoilState(friendsAtom);
const [user, setUser] = useRecoilState(userAtom);
const [unseenMsg, setUnseenMsg] = useRecoilState(unseenMsgAtom);
const messagesEndRef = useRef(null);

const [thred,setThred] = useRecoilState(thredAtom); 
const [messages,setMessages] = useRecoilState(messeagesAtom); 
const c_user =  useRecoilValue(userAtom);
const [chatingWith,setChatingWith] = useRecoilState(chatingWithAtom);

function getThreadId(){ 

    let params = new URLSearchParams(document.location.search);
    return params.get('thredId') 
}

let myFriends;

useEffect(() => {



    var user = jwt_decode(token)
    // console.log(user)
    setUser(user);

    axios.get('http://localhost:5000/friends',{withCredentials: true })
    .then((data)=> {

     var fns =  data?.data.filter((u)=> {  return u._id !== user.id    })
     setFriends(fns);
     myFriends = fns;
    }).then(()=> {

        if(getThreadId() && getThreadId().length !== 0){
        setThred(getThreadId());
    

        axios.post('http://localhost:5000/thread?id='+ getThreadId(),
        {
        users: [c_user.id,user._id]
        },

        {withCredentials: true })
        .then((data)=> {

                setMessages(data.data.messages);
            
                var chating_withuser =  myFriends?.find((f)=> f.threads.includes(data.data.id));
              
                setChatingWith(chating_withuser);
                socket.emit('room', {thread : data.data.id,uId : user.id});

        })
    }
    })

}, [])




useEffect(() => {
    
// console.log('updated')
socket.on('receive_message_not_seen',(data)=> {
    console.log('this message not seen yet : ',data)
    var newUnseenMsg = {
        id : data.from.id,
        msg : data.msg
    }
    setUnseenMsg(newUnseenMsg);
})


}, [socket])







	return (
			<div className="container pt-5 messages">
            {/* <FileUploader /> */}
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
                <Chat messagesEndRef={messagesEndRef} />
               <Input  messagesEndRef={messagesEndRef}  socket={socket}/>
             
            </div>
        </div>
    </div>
</div>
</div>
	)
}

export default Messages;