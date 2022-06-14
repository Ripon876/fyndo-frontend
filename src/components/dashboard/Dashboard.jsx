import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

function Dashboard() {

const navigate = useNavigate();


const logOut = ()=> {
	axios.get('http://localhost:5000/logout',{withCredentials: true })
    .then((res)=> {
    
    	navigate('/login');
    })
}


	return (
		<div>
	    <Sidebar />
			<h1>this is the Dashboard</h1>
			<button onClick={logOut} >Log out</button>
		</div>
	)
}

export default Dashboard;