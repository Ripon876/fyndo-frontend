import {useState,useEffect} from 'react'
import { io } from "socket.io-client";
import {thredAtom,chatingWithAtom,userAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';




function Input() {


const socket = io('http://localhost:5000');
const [msg, setMsg] = useState('')
const thred  = useRecoilValue(thredAtom);
const chatingWith  = useRecoilValue(chatingWithAtom);
const user  = useRecoilValue(userAtom);



const sendMsg = () => {

var message = {
	threadId : thred,
	msg : msg,
	to : {
		name : chatingWith.first_name + ' ' +  chatingWith.last_name,
		username : chatingWith.username,
		id : chatingWith._id
	},
	from : {
		name : 'MD Ripon Islam',
		username : user.username,
		id : user.id
	}
}
// console.log(message)

socket.emit('send_message',message)

}


socket.on('connect',()=> {
	console.log('connected')

	 socket.emit('room', thred);
})


useEffect(() => {
	console.log(user)
}, [msg])

	return (
	<div className="msgInput">
	    <div className="d-flex position-relative">
	        <div className="msInput">
	            <input type="text" onChange={(e)=> setMsg(e.target.value) } />
	        </div>
	        <div className="sendBtn">
	       		<button onClick={sendMsg}><i class="fa-solid fa-paper-plane"></i></button>
	        </div>
	    </div>
	</div>
	)
}

export default Input;