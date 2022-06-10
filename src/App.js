import React,{useState} from "react";
import axios from 'axios';
import {userState} from './store/store';
import {useRecoilState} from 'recoil';



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
      <div>
        <h1>hello world</h1>









<div>
  login
<input type='text' onChange={ (e)=> { setU(e.target.value) }} />
<input type='text' onChange={ (e)=> { setP(e.target.value) }} />


<button onClick={subMit}>Submit</button>

</div>






      </div>
       
  )
}

export default App;
