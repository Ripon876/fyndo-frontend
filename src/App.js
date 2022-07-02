import React,{useState,useEffect} from "react";
import axios from 'axios';
import {Routes,Route} from 'react-router-dom';
import Login from  './components/login/Login';
import SignUp from  './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import AuthProtected from './auth/AuthProtected';
import NotFound from './components/notfound/NotFound';


function App() {


  return ( 
        <Routes>
       
          <Route path='/' element={ <AuthProtected path='/' ><Dashboard /></AuthProtected>} />
          <Route path='/messages' element={ <AuthProtected path='/messages'><MessagesPage /></AuthProtected>} />
          <Route path='/profile' element={ <AuthProtected path='/profile'><ProfilePage /></AuthProtected>} />
          <Route path='/settings' element={ <AuthProtected path='/settings'><SettingPage /></AuthProtected>} />
        
            
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
  )
}

export default App;
