import React,{useState,useEffect} from "react";
import axios from 'axios';
import {Routes,Route} from 'react-router-dom';
import Login from  './components/login/Login';
import SignUp from  './components/signup/SignUp';
import useAuth from './auth/useAuth';




function App() {
console.log(useAuth())

useEffect(() => {
    window.onbeforeunload = function() {

      console.log('before load')
        return true;
    };

    return () => {
        window.onbeforeunload = null;
    };
}, []);
  return ( 
        <Routes>
            <Route path='/' element={<p>dsfsdfds</p>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
        </Routes>
  )
}

export default App;
