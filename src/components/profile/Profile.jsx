import {useEffect} from 'react';
import socket from '../../socket/socket';
import {authToken} from  '../../store/store';
import {useRecoilValue} from  'recoil';
import jwt_decode from "jwt-decode";
import './Profile.css';






function Profile() {


 const token = useRecoilValue(authToken);
 const user = jwt_decode(token);


useEffect(() => {

	socket.emit('getProfileInfo',user.id,(data)=> {
		console.log(data)
	})

}, [])


	return (
		<div className='profile py-4' >
			
<div className="container">
	<div className="row">
		<div className="col-10 m-auto">
		<div className="profileHeader position-relative">
			<div className='coverPhoto position-relative'>
				<img src="https://via.placeholder.com/650x300" className='img-fluid w-100' alt="Cover Photo" />
			    <div className='bottom-0 coverFadeBottom position-absolute w-100'></div>
			</div>
			<div className='profilePhoto'>
				<img src="https://via.placeholder.com/200x200" alt=""  className='rounded-circle w-100' />
			</div>
		</div>
			<h1>dfdsfdsfd</h1>
		</div>
	</div>
</div>




		</div>
	)
}

export default Profile;

