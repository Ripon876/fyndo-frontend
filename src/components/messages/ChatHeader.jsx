import React,{useEffect} from 'react'
import {thredAtom,friendsAtom,chatingWithAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';





function ChatHeader() {

const thred  = useRecoilValue(thredAtom);
const friends  = useRecoilValue(friendsAtom);
const [chatingWith,setChatingWith] = useRecoilState(chatingWithAtom);
const navigate = useNavigate();

useEffect(() => {
    // console.log(thred)
    // console.log(friends)


// var user =  friends?.find((f)=> f._id.includes(thred.slice(thred.length/2,thred.length)) )
var user =  friends?.find((f)=> f.threads.includes(thred));

// console.log(user)
setChatingWith(user);


if(thred){
navigate({
      pathname: '/messages',
      search: `?thredId=${thred}`,
});
}





}, [thred])


	return (
		<div className="chat-header clearfix">
            <div className="row">
                <div className="col-lg-6">
                    <a href="#" data-toggle="modal" data-target="#view_info">
                    	<img src="https://via.placeholder.com/50" alt="avatar" />
                    </a>
                    <div className="chat-about">
                        <h6 className="m-b-0">{chatingWith?.first_name} {chatingWith?.last_name}</h6>
                        <small>Last seen: 2 hours ago</small>
                    </div>
                </div>
            </div>
         </div>
	)
}

export default ChatHeader;