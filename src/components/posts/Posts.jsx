import {useEffect} from 'react';
import Post from './Post';
import './Posts.css';
import socket from '../../socket/socket';
import {authToken,postsAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import jwt_decode from "jwt-decode";

function Posts() {

const token =  useRecoilValue(authToken);
const [posts, setPost] = useRecoilState(postsAtom)

 var user = jwt_decode(token);



useEffect(() => {
	
// console.log(user);
   socket.emit('getPost',user.id,(data)=> {
   	// console.log(data)
   	setPost(data.reverse());
   })

}, [])

// console.log(socket)



	return (
		<>

		{posts?.map((post)=> 

		<Post post={post} />

		)}

				
		</>
	)
}
 
export default Posts;