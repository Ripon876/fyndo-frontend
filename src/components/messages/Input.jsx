import {useState,useEffect} from 'react'
import {thredAtom,chatingWithAtom,userAtom,messeagesAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';






function Input({socket}) {



const [msg, setMsg] = useState('');
const [messages,setMessages] = useRecoilState(messeagesAtom); 
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
		name : user.name,
		username : user.username,
		id : user.id
	}
}
// console.log(user)

socket.emit('send_message',message);
setMessages((prev)=>  [...prev,message] )
setMsg('')
}






useEffect(() => {
	
socket.on('receive_message',(data)=> {
console.log(data)
// setMessages(messages.concat(...messages,data));
setMessages((prev)=>  [...prev,data] )
// setMessages([...messages,data]);

})


socket.on('rip',(t)=> {
	console.log(t)
})



console.log('changed')

},[socket])

	return (
	<div className="msgInput">
	    <div className="d-flex position-relative">
	        <div className="msInput">
	            <input type="text" value={msg} onChange={(e)=> setMsg(e.target.value) } />
	        </div>
	        <div className="sendBtn">
	       		<button onClick={sendMsg}><i class="fa-solid fa-paper-plane"></i></button>
	        </div>
	    </div>
	</div>
	)
}

export default Input;