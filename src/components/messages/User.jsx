import {useRecoilState,useRecoilValue} from 'recoil';
import {thredAtom,userAtom,messeagesAtom,unseenMsgAtom,chatingWithAtom} from '../../store/store';
import axios from 'axios';




function User({user,socket}) {


const [thred,setThred] = useRecoilState(thredAtom); 
const [messages,setMessages] = useRecoilState(messeagesAtom); 
const c_user =  useRecoilValue(userAtom);
const [unseenMsg,setUnseenMsg] =  useRecoilState(unseenMsgAtom);
const [chatingWith,setChatingWith] = useRecoilState(chatingWithAtom);




function getThreadId(){ 

    let params = new URLSearchParams(document.location.search);
    return params.get('thredId') 
}



const changeThred = () => {

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

            setChatingWith(data.data.cw)
            setThred(data.data.id);
            setMessages(data.data.messages);
            socket.emit('room', {thread : data.data.id,uId : c_user.id});
         
    })


}

	return (
		<li className={`clearfix  ${user._id  === chatingWith._id ? 'selectedChat' : ''}`} onClick={changeThred} key={user._id} >
           <span className='listImg'>
                <img src="https://via.placeholder.com/50" alt="avatar" />
                <div className="activeStatus"></div>
           </span>
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