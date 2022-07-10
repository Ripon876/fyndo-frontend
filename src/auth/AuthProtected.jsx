import {useEffect,useState} from 'react';
import {authToken} from '../store/store';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import socket  from '../socket/socket';
import jwt_decode from "jwt-decode";

function AuthProtected({children,path}) {

const [auth,setAuth] = useRecoilState(authToken);

const [isLoading, setIsLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {


axios.get('http://localhost:5000/refreshtoken',{withCredentials: true })
.then((data) => {
 

	if(data.data.status){

	setAuth(data.data.token);
	setIsLoading(false)
	 
	const user = jwt_decode(data.data.token);

	socket.emit('active',user.id);




	}else{
		
		navigate('/login',{ state: { prvUrl : path  } })
	}
})

}, [])

if(isLoading) return null;
if(!isLoading) return <>{children}</>	 
 
}

export default AuthProtected