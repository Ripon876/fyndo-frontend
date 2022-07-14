import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import NewPost from '../newpost/NewPost';
import SearchBar from '../search/SearchBar';
import Posts from '../posts/Posts';
import Layout from '../layout/Layout';




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


// const  Dashboard = Layout(DashboardPage); 


export default Dashboard;