import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';

function Sidebar({l}) {
	return (
		<div>
			<nav className="social">
	            <ul>
		            <li><Link to="/">Home <i class="fa-solid fa-house"></i></Link></li>
		            <li><Link to="/videos">Video <i class="fa-solid fa-video"></i></Link></li>
		            <li><Link to="/settings">Settings <i class="fa-solid fa-bars"></i></Link></li>
		            <li><Link to="/logout" onClick={l}>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></Link></li>
	            </ul>
            </nav>
		</div>
	)
}

export default Sidebar;