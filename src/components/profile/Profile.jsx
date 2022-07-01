import {useEffect,useState} from 'react';
import socket from '../../socket/socket';
import {authToken,userPostsAtom} from  '../../store/store';
import {useRecoilValue,useRecoilState} from  'recoil';
import jwt_decode from "jwt-decode";
import './Profile.css';
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';
import ProfileInfo from './ProfileInfo';



function Profile() {


const token = useRecoilValue(authToken);
const user = jwt_decode(token);
const [userData, setUserData] = useState({});

useEffect(() => {

	socket.emit('getProfileInfo',user.id,(data)=> {
			let {post,...ud} = data?.data;
			setUserData(ud);
	})

}, [])






	return (
		<div className='profile py-4' >
			
<div className="container">
	<div className="row">
		<div className="col-10 m-auto">
				
			<ProfileHeader user={userData} />


			<div className="row">
			
			
			<ProfileInfo />
			<ProfilePosts />

			</div>


		</div>
	</div>
</div>




		</div>
	)
}

export default Profile;

