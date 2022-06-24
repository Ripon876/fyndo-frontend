import React,{useEffect,useState} from 'react';
import {authToken,friendsAtom,userAtom,socketAtom,thredAtom,messeagesAtom,chatingWithAtom} from '../../store/store';
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

const [thred,setThred] = useRecoilState(thredAtom); 
const [messages,setMessages] = useRecoilState(messeagesAtom); 
const c_user =  useRecoilValue(userAtom);
const [chatingWith,setChatingWith] = useRecoilState(chatingWithAtom);

function getThreadId(){ 

    let params = new URLSearchParams(document.location.search);
    return params.get('thredId') 
}


useEffect(() => {
    
    let myFriends;
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
       // console.log(getThreadId())

        axios.post('http://localhost:5000/thread?id='+ getThreadId(),
        {
        users: [c_user.id,user._id]
        },

        {withCredentials: true })
        .then((data)=> {

                setMessages(data.data.messages);
                // setThred(data.data.id);

                var user =  myFriends?.find((f)=> f.threads.includes(data.data.id));
                // console.log(myFriends)
                setChatingWith(user);
                socket.emit('room', data.data.id);

        })
    }
    })





}, [])

/*

useEffect(() => {


   

}, []);*/


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