import React,{useEffect} from 'react'
import {useRecoilState} from 'recoil';
import {thredAtom} from '../../store/store';


function User({user}) {

const [thred,setThred] = useRecoilState(thredAtom); 


const changeThred = () => {
setThred(user._id)
}



	return (
		<li className="clearfix" onClick={changeThred} >
            <img src="https://via.placeholder.com/50" alt="avatar" />
            <div className="about">
                <div className="name">{user?.first_name} {user.last_name}</div>
                <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
            </div>
        </li>
	)
}

export default User;