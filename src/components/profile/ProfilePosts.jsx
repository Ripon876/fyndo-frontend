import {useEffect,useState} from 'react';
import Post from '../posts/Post';
import NewPost  from '../newpost/NewPost';
import socket from '../../socket/socket';
import {authToken,userPostsAtom} from  '../../store/store';
import {useRecoilValue,useRecoilState} from  'recoil';
import jwt_decode from "jwt-decode";



function ProfilePosts() {


const token = useRecoilValue(authToken);
const user = jwt_decode(token);
const [userPosts, setUserPosts] = useRecoilState(userPostsAtom);


useEffect(() => {

	socket.emit('getProfileInfo',user.id,(data)=> {

			let {post,...ud} = data?.data;
	    	setUserPosts(post.reverse());
			
	})

}, [])


const removePost = (id)=> {
  const posts = userPosts.filter((post) =>  post._id !== id );
  setUserPosts(posts)
}






	return (
	<div className="col-8">
		<NewPost profile   />
			{userPosts?.map((post)=>

				<Post post={post} profile  rp={removePost} />

			)}
	</div>
	)
}

export default ProfilePosts;