import React from 'react';
import './Sidebar.css';

function Sidebar() {
	return (
		<div>
			<nav className="social">
	            <ul>
		            <li><a href="https://twitter.com/highflyer910">Twitter <i className="fa fa-twitter"></i></a></li>
		            <li><a href="https://github.com/highflyer910">Github <i className="fa fa-github"></i></a></li>
		            <li><a href="https://www.linkedin.com/in/teonamushambadze">Linkedin <i className="fa fa-linkedin"></i></a></li>
	            </ul>
            </nav>
		</div>
	)
}

export default Sidebar;