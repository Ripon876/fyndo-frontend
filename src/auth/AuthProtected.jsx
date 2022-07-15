import {useEffect,useState} from 'react';
import {authToken} from '../store/store';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';





function AuthProtected({children,path}) {



const [auth,setAuth] = useRecoilState(authToken);
const [isLoading, setIsLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {


axios.get(process.env.REACT_APP_HOST + '/refreshtoken',{withCredentials: true })
.then((data) => {
 

	if(data.data.status){
	 
	setAuth(data.data.token);
	setIsLoading(false)


	}else{
		
		navigate('/login',{ state: { prvUrl : path  } })
	}
})

}, [])

if(isLoading) return null;
if(!isLoading) return <>{children}</>	 
 
}

export default AuthProtected