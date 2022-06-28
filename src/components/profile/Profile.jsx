import {useEffect} from 'react';
import socket from '../../socket/socket';
import {authToken} from  '../../store/store';
import {useRecoilValue} from  'recoil';
import jwt_decode from "jwt-decode";







function Profile() {


 const token = useRecoilValue(authToken);
 const user = jwt_decode(token);


useEffect(() => {

	socket.emit('getProfileInfo',user.id,(data)=> {
		console.log(data)
	})

}, [])


	return (
		<div>
			<h1>this is the profile page</h1>
		</div>
	)
}

export default Profile;

