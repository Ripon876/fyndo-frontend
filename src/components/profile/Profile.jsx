import {useEffect,useState} from 'react';
import socket from '../../socket/socket';
import {authToken,userPostsAtom} from  '../../store/store';
import {useRecoilValue,useRecoilState} from  'recoil';
import jwt_decode from "jwt-decode";
import './Profile.css';
import Post from '../posts/Post';
import NewPost  from '../newpost/NewPost';




function Profile() {


const token = useRecoilValue(authToken);
const user = jwt_decode(token);
const [userPosts, setUserPosts] = useRecoilState(userPostsAtom);
const [userData, setUserData] = useState({});

useEffect(() => {

	socket.emit('getProfileInfo',user.id,(data)=> {
			let {post,...ud} = data?.data;
	    setUserPosts(post.reverse());
			setUserData(ud);
		// console.log(post)
	})

}, [])




const removePost = (id)=> {
  const posts = userPosts.filter((post) =>  post._id !== id );

  setUserPosts(posts)
}




	return (
		<div className='profile py-4' >
			
<div className="container">
	<div className="row">
		<div className="col-10 m-auto">
		<div className="profileHeader position-relative">
			<div className='coverPhoto position-relative'>
				<img src="https://via.placeholder.com/650x300" className='img-fluid w-100 rounded-top' alt="Cover Photo" />
			    <div className='bottom-0 coverFadeBottom position-absolute w-100'></div>
			</div>
			<div className='profilePhoto'>
				<img src="https://via.placeholder.com/200x200" alt=""  className='rounded-circle w-100' />
			</div>
		</div>
		<div className='my-2 mb-5 pt-4 text-center userName'>
			<h1>{userData?.first_name} {userData?.last_name}</h1>
		</div>
			



<div className="row">
	<div className="col-4">
	    <div className="bio p-2 border-start">
		    <h5 className='ps-2'>Intro</h5>
		    <p className='font-monospace text-center'>hello world!</p>
	    </div>
		
	</div>
	<div className="col-8">
	<NewPost profile   />
		{userPosts?.map((post)=>

		  <Post post={post} profile  rp={removePost} />

		)}

	</div>
</div>



		</div>
	</div>
</div>




		</div>
	)
}

export default Profile;

