import axios from 'axios';
import './Sidebar.css';
import {Link,useNavigate} from 'react-router-dom';
import {authToken,userPostsAtom} from  '../../store/store';
import {useRecoilValue,useRecoilState} from  'recoil';
import jwt_decode from "jwt-decode";



function Sidebar({l}) {

const navigate = useNavigate();

const token = useRecoilValue(authToken);
const user = jwt_decode(token);

const logOut = ()=> {
	axios.get('http://localhost:5000/logout',{withCredentials: true })
    .then((res)=> {
    
    	navigate('/login');
    })
}



	return (
		<div>
			<nav className="social">
	            <ul>
		            <li><Link to="/">Home <i className="fa-solid fa-house"></i></Link></li>
		            <li><Link to={`/profile?id=${user.id}`}>Profile <i className="fa-solid fa-user"></i></Link></li>
		            <li><Link to="/messages">Messages <i className="fa-brands fa-facebook-messenger"></i></Link></li>
		            <li><Link to="/videos">Video <i className="fa-solid fa-video"></i></Link></li>
		            <li><Link to="/settings">Settings <i className="fa-solid fa-bars"></i></Link></li>
		            <li><Link to="/logout" onClick={logOut}>Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></Link></li>
	            </ul>
            </nav>
		</div>
	)
}

export default Sidebar;