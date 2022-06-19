import React,{useEffect} from 'react';
import {authToken,friendsAtom,userAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import User from  './User';
import ChatHeader  from './ChatHeader';
import Chat  from './Chat';
import './Messages.css';
import { io } from "socket.io-client";



function Messages() {





const socket = io('http://localhost:5000');




const token  = useRecoilValue(authToken);
const [friends,setFriends] = useRecoilState(friendsAtom);
const [user, setUser] = useRecoilState(userAtom);



useEffect(() => {
    




socket.on("connection",()=> {
    console.log('connected');
})




    var user = jwt_decode(token)
    setUser(user);

    axios.get('http://localhost:5000/friends',{withCredentials: true })
    .then((data)=> {
        setFriends(data.data);
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
    {user?.id !== friend._id  && <User user={friend} /> }
</>

)}



                </ul>
            </div>
            <div className="chat">
                <ChatHeader />
                <Chat />
             
{/*                <div className="chat-message clearfix">
                    <div className="input-group mb-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fa fa-send"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter text here..." />                                    
                    </div>
                </div>*/}



{/*<div className='msgInput'>
<div className='d-flex'>
        <div className="form-group">
            <input type="text" className='form-control'   /> 
        </div>
        <div className="sendBtn">
            <btton><i class="fa-solid fa-paper-plane-top"></i></btton>
        </div>
</div>

</div>
*/}

<div className="msgInput">
    <div className="d-flex position-relative">
        <div className="msInput">
            <input type="text" />
        </div>
        <div className="sendBtn">
        <button><i class="fa-solid fa-paper-plane"></i></button>
            
        </div>
    </div>
</div>




            </div>
        </div>
    </div>
</div>
</div>
	)
}

export default Messages;