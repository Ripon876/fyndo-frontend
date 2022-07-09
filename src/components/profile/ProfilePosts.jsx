import {useEffect,useState} from 'react';
import Post from '../posts/Post';
import NewPost  from '../newpost/NewPost';
import socket from '../../socket/socket';
import {authToken,userPostsAtom} from  '../../store/store';
import {useRecoilValue,useRecoilState} from  'recoil';
import jwt_decode from "jwt-decode";
import {useLocation} from 'react-router-dom';






function ProfilePosts() {


const token = useRecoilValue(authToken);
const user = jwt_decode(token);
const [userPosts, setUserPosts] = useRecoilState(userPostsAtom);
const location = useLocation();



useEffect(() => {


	socket.emit('getProfileInfo',getUserId(),(data)=> {

			let {post,...ud} = data?.data;
	    	setUserPosts(post.reverse());
			
	})

}, [location])

function getUserId(){ 

    let params = new URLSearchParams(document.location.search);
    return params.get('id') 
}



const removePost = (id)=> {
  const posts = userPosts.filter((post) =>  post._id !== id );
  setUserPosts(posts)
}






	return (
	<div className="col-8">
		<NewPost profile   />
			{userPosts?.map((post)=>

				<Post post={post} profile showOptions={getUserId() === user.id ? true : false} rp={removePost} />

			)}
	</div>
	)
}

export default ProfilePosts;