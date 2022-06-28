import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import NewPost from '../newpost/NewPost';
import SearchBar from '../search/SearchBar';
import Posts from '../posts/Posts';




function Dashboard() {


	return (
		<div>
	    <SearchBar />
	    <NewPost />
	    <Posts />
	    <Sidebar />
			{/*<h1>this is the Dashboard</h1>*/}
		</div>
	)
}

export default Dashboard;