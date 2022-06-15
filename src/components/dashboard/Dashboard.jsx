import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import NewPost from '../newpost/NewPost';
import SearchBar from '../search/SearchBar';
import Post from '../post/Post';




function Dashboard() {


	return (
		<div>
	    <SearchBar />
	    <NewPost />
	    <Post />
	    <Sidebar />
			{/*<h1>this is the Dashboard</h1>*/}
		</div>
	)
}

export default Dashboard;