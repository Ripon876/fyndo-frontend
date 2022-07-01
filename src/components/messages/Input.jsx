import {useState,useEffect} from 'react'
import {thredAtom,chatingWithAtom,userAtom,messeagesAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import { useSearchParams } from 'react-router-dom';
import FileUploader from '../../utils/FileUploader'

 



function Input({socket}) {



const [msg, setMsg] = useState('');
const [showUploader, setShowUploader] = useState(false);
const [messages,setMessages] = useRecoilState(messeagesAtom); 
const thred  = useRecoilValue(thredAtom);
const chatingWith  = useRecoilValue(chatingWithAtom);
const user  = useRecoilValue(userAtom);
const [searchParams,setSearchParams] = useSearchParams();



const sendMsg = () => {

var message = {
	threadId : thred,
	type: 'text',
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
};

socket.emit('send_message',message);
setMessages((prev)=>  [...prev,message] )
setMsg('');

}



const send_Msg = (e) => {
	if(e.key === 'Enter'){
		sendMsg()
	}
}






function getThreadId(){ 

    let params = new URLSearchParams(document.location.search);
    return params.get('thredId') 
}



useEffect(() => {
	
socket.on('receive_message',(data)=> {

	if(data.threadId === getThreadId()){
		setMessages((prev)=>  [...prev,data] )
	}

})


console.log('changed')

},[socket])

	return (
		<>
		{showUploader && <FileUploader  su={setShowUploader} u={user} t={thred}  cw={chatingWith} sm={setMessages} /> }
		
	<div className="msgInput">
	    <div className="d-flex position-relative">
	        <div>
	            <h1 className="fileChoserIcon p-1 mx-2" onClick={()=> { setShowUploader(true)}}><i class="fa-solid fa-plus"></i></h1>
	        </div>  
	        <div className="msInput">
	            <input type="text" value={msg} onChange={(e)=> setMsg(e.target.value) }  onKeyPress={(e)=> { send_Msg(e)}} />
	        </div>
	        <div className="sendBtn">
	       		<button onClick={sendMsg}><i class="fa-solid fa-paper-plane"></i></button>
	        </div>
	    </div>
	</div>
	</>
	)
}

export default Input;