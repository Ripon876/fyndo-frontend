import {useEffect} from 'react'
import socket  from '../../socket/socket';
import jwt_decode from "jwt-decode";
import axios from 'axios';



const Layout = Component => ({ ...props }) => {
// console.log(Component)

console.log('Layout used')


	console.log(socket)

axios.get('http://localhost:5000/refreshtoken',{withCredentials: true })
.then((data) => {
 

	if(data.data.status){
	const user = jwt_decode(data.data.token);
	console.log(user)
	console.log(socket)
    socket.emit('active',user.id);

	}
})









	return  <Component { ...props } />
} 

export default Layout;