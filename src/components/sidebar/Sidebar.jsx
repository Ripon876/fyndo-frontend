import axios from 'axios';
import './Sidebar.css';
import {Link,useNavigate} from 'react-router-dom';



function Sidebar({l}) {

const navigate = useNavigate();


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
		            <li><Link to="/">Home <i class="fa-solid fa-house"></i></Link></li>
		            <li><Link to="/messages">Messages <i class="fa-brands fa-facebook-messenger"></i></Link></li>
		            <li><Link to="/videos">Video <i class="fa-solid fa-video"></i></Link></li>
		            <li><Link to="/settings">Settings <i class="fa-solid fa-bars"></i></Link></li>
		            <li><Link to="/logout" onClick={logOut}>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></Link></li>
	            </ul>
            </nav>
		</div>
	)
}

export default Sidebar;