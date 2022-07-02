import {useEffect,useState} from 'react';
import socket from '../../socket/socket';
import {authToken,userPostsAtom} from  '../../store/store';
import {useRecoilValue,useRecoilState} from  'recoil';
import jwt_decode from "jwt-decode";
import './Profile.css';
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';
import ProfileInfo from './ProfileInfo';
import {useLocation} from 'react-router-dom';


function Profile() {


const token = useRecoilValue(authToken);
const user = jwt_decode(token);
const [userData, setUserData] = useState({});
const location = useLocation();




useEffect(() => {

	socket.emit('getProfileInfo',getUserId(),(data)=> {
			let {post,...ud} = data?.data;
			setUserData(ud);
	})





}, [location])



function getUserId(){ 
    let params = new URLSearchParams(document.location.search);
    return params.get('id') 
}



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

