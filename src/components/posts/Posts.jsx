import {useEffect} from 'react';
import Post from './Post';
import './Posts.css';
import socket from '../../socket/socket';
import {authToken,postsAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import jwt_decode from "jwt-decode";
import InfiniteScroll from "react-infinite-scroll-component";




function Posts() {

const token =  useRecoilValue(authToken);
const [posts, setPost] = useRecoilState(postsAtom)

 var user = jwt_decode(token);



useEffect(() => {
	
   socket.emit('getPost',user.id,(data)=> {
      	setPost(data.reverse());
   })

}, [])


	return (
		<>

		{posts?.map((post)=> 

		<Post post={post} />

		)}

				
		</>
	)
}
 
export default Posts;