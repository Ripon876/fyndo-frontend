import {useEffect,useState} from 'react';
import socket from '../../socket/socket';
import {authToken} from  '../../store/store';
import {useRecoilValue} from  'recoil';
import jwt_decode from "jwt-decode";
import './Profile.css';
import Post from '../posts/Post';





function Profile() {


const token = useRecoilValue(authToken);
const user = jwt_decode(token);
const [userPosts, setUserPosts] = useState([]);
const [userData, setUserData] = useState({});

useEffect(() => {

	socket.emit('getProfileInfo',user.id,(data)=> {
		let {post,...ud} = data?.data;
	    setUserPosts(post);
		setUserData(ud);
		// console.log(post)
	})

}, [])


useEffect(() => {
	 console.log(userPosts)
}, [])




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
			<h1>Jhone Doe</h1>
		</div>
			



<div className="row">
	<div className="col-4">
	    <div className="bio p-2">
		    <h1>bio</h1>
	    </div>
		
	</div>
	<div className="col-8">
	
		{userPosts?.map((post)=>

		  <Post post={post} profile />

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

