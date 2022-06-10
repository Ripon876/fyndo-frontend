import React,{useState} from "react";
import axios from 'axios';
import {userState} from './store/store';
import {useRecoilState} from 'recoil';
import {Routes,Route} from 'react-router-dom';
import Login from  './components/login/Login';




function App() {

const [user,setUser] = useRecoilState(userState);

const [u, setU] = useState('');
const [p, setP] = useState('');



function subMit(){
  axios.post('http://localhost:5000/login',{username :  u,password : p}, {
    withCredentials: true })

  .then((data)=> {
    console.log(data)
  })


    axios.get('http://localhost:5000/cc', {withCredentials: true })
  .then((data)=> {
    console.log(data)
  })
}

  return ( 
        <Routes>
            <Route path='/' element={<p>dsfsdfds</p>} />
            <Route path='/login' element={<Login />} />
        </Routes>
  )
}

export default App;
