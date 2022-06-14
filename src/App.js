import React,{useState,useEffect} from "react";
import axios from 'axios';
import {Routes,Route} from 'react-router-dom';
import Login from  './components/login/Login';
import SignUp from  './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import AuthProtected from './auth/AuthProtected';


function App() {


  return ( 
        <Routes>
       
          <Route path='/' element={ <AuthProtected><Dashboard /></AuthProtected>} />
        
            
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
        </Routes>
  )
}

export default App;
