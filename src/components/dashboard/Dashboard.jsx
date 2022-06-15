import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import NewPost from '../newpost/NewPost';
import SearchBar from '../search/SearchBar';
import Post from '../post/Post';




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
	    <SearchBar />
	    <NewPost />
	    <Post />
	    <Sidebar l={logOut} />
			{/*<h1>this is the Dashboard</h1>*/}
		</div>
	)
}

export default Dashboard;