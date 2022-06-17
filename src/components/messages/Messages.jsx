import React,{useEffect,useState} from 'react';
import User from  './User';
import {thredAtom,authToken,friendsAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import './Messages.css';




function Messages() {



const thred  = useRecoilValue(thredAtom);
const token  = useRecoilValue(authToken);
const [friends,setFriends] = useRecoilState(friendsAtom);
const [user, setUser] = useState({});


/*

useEffect(() => {


// console.log(user)
     console.log(thred)


}, [thred])
*/

useEffect(() => {
    

    var user = jwt_decode(token)
    setUser(user);

    axios.get('http://localhost:5000/friends',{withCredentials: true })
    .then((data)=> {
        setFriends(data.data);
    })

}, [])


useEffect(() => {
    console.log(friends)
}, [friends])


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
                <div className="chat-header clearfix">
                    <div className="row">
                        <div className="col-lg-6">
                            <a href="#" data-toggle="modal" data-target="#view_info">
                                <img src="https://via.placeholder.com/50" alt="avatar" />
                            </a>
                            <div className="chat-about">
                                <h6 className="m-b-0">Aiden Chavez</h6>
                                <small>Last seen: 2 hours ago</small>
                            </div>
                        </div>
                 {/*       <div className="col-lg-6 hidden-sm text-right">
                            <a href="#" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                            <a href="#" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                            <a href="#" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                            <a href="#" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                        </div>*/}
                    </div>
                </div>
                <div className="chat-history">
                    <ul className="m-b-0  px-4">
                        <li className="clearfix">
                            <div className="message-data text-right">
                                <span className="message-data-time">10:10 AM, Today</span>
                            </div>
                            <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                        </li>
                        <li className="clearfix">
                            <div className="message-data">
                                <span className="message-data-time">10:12 AM, Today</span>
                            </div>
                            <div className="message my-message">Are we meeting today?</div>                                    
                        </li>                               
                        <li className="clearfix">
                            <div className="message-data">
                                <span className="message-data-time">10:15 AM, Today</span>
                            </div>
                            <div className="message my-message">Project has been already finished and I have results to show you.</div>
                        </li>
                    </ul>
                </div>
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