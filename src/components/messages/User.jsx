import React,{useEffect} from 'react'
import {useRecoilState,useRecoilValue} from 'recoil';
import {thredAtom,userAtom,messeagesAtom,unseenMsgAtom} from '../../store/store';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';




function User({user,socket}) {


const [thred,setThred] = useRecoilState(thredAtom); 
const [messages,setMessages] = useRecoilState(messeagesAtom); 
const c_user =  useRecoilValue(userAtom);
const [unseenMsg,setUnseenMsg] =  useRecoilState(unseenMsgAtom);
const [searchParams,setSearchParams] = useSearchParams();


function getThreadId(){ 

    let params = new URLSearchParams(document.location.search);
    return params.get('thredId') 
}



const changeThred = () => {
// console.log(thred)


 if(unseenMsg.id === user._id){
setUnseenMsg({id : '',msg : ''})
 }

socket.emit('leave_room',thred);
    axios.post('http://localhost:5000/thread',
    {
    users: [c_user.id,user._id]
    },

    {withCredentials: true })
        .then((data)=> {
 
            setThred(data.data.id);
            setMessages(data.data.messages);
            socket.emit('room', {thread : data.data.id,uId : c_user.id});
            // console.log(data.data.id)
    })


}


	return (
		<li className="clearfix" onClick={changeThred} key={user._id} >
            <img src="https://via.placeholder.com/50" alt="avatar" />
            <div className="about">
                <div className="name" 

                style={{fontWeight : `${unseenMsg.id === user._id ? 'bold' : ''}`,
                color : `${unseenMsg.id === user._id ? '#d2d4d6' : '#9ca3af'}`}} 

                  >{user?.first_name} {user.last_name}</div>
                {/*{(unseenMsg !== {} ) && <h1>dsfdsfdsfsdfds</h1>}*/}
               {(unseenMsg.id === user._id) && <div className="status">New message </div>}  {/*<i className="fa fa-circle offline"></i>*/}                                             
            </div>
        </li>
	)
}

export default User;