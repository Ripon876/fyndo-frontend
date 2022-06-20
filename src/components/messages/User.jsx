import React,{useEffect} from 'react'
import {useRecoilState,useRecoilValue} from 'recoil';
import {thredAtom,userAtom} from '../../store/store';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';



function User({user}) {

const [thred,setThred] = useRecoilState(thredAtom); 
const c_user =  useRecoilValue(userAtom);
const [searchParams,setSearchParams] = useSearchParams();

useEffect(() => {

    if(searchParams.get('thredId') && searchParams.get('thredId').length !== 0){
        setThred(searchParams.get('thredId'))
    }


}, [])


const changeThred = () => {


axios.post('http://localhost:5000/thread',

{
users: [c_user.id,user._id]
},


{withCredentials: true })
    .then((data)=> {
        // setFriends(data.data);
        console.log(data.data.id)
        setThred(data.data.id);


})



/*var thredId = c_user?.id.slice(c_user.id.length/2,c_user.id.length) + user._id.slice(user._id.length/2,user._id.length);
setThred(thredId);
*/
}



	return (
		<li className="clearfix" onClick={changeThred} key={user._id} >
            <img src="https://via.placeholder.com/50" alt="avatar" />
            <div className="about">
                <div className="name">{user?.first_name} {user.last_name}</div>
                <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
            </div>
        </li>
	)
}

export default User;