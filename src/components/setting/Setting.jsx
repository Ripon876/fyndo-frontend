import {useState,useEffect} from 'react';
import './Setting.css';
import socket  from '../../socket/socket';
import {authToken,postsAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import jwt_decode from "jwt-decode";




function Setting() {



const token =  useRecoilValue(authToken);
const user = jwt_decode(token);
const [basicInfo, setBasicInfo] = useState({
	first_name : '',
	last_name : '',
	bio : ''
})

useEffect(() => {
	
socket.emit('getUserInfo',user.id,(res) => {

	if(res.status){
		setBasicInfo({
			first_name : res.data?.first_name,
			last_name :  res.data?.last_name,
			bio :  res.data?.bio ?  res.data?.bio : ''
		})
	}
	
})

}, [])



const saveBasicInfo = () => {

	if(Object.values(basicInfo).some((i ) => i !== '' )){
		socket.emit('saveBasicInfo',user.id,basicInfo,(res)=> {
			if(res.status){
				setBasicInfo({
				first_name : res.data?.first_name,
				last_name :  res.data?.last_name,
				bio :  res.data?.bio ?  res.data?.bio : ''
				})
			}
		})
	}

}





	return (
		<div className='settings py-4'>
			
			<div className="container">
			    <div className="row">
					<div className="col-10 m-auto">
						<div className="row">
						
							<div className='col-8 settingSections p-5'>
							    <h4 className='border-start ps-2 mb-4'><strong>Basic Info</strong></h4>
							    <div className="mb-3">
								  	<label  className="form-label">Name</label>
								  	<div className='d-flex gap-3'>
								  	  	<input type="text" defaultValue={basicInfo?.first_name} onChange={(e) => { setBasicInfo({...basicInfo,first_name : e.target.value}) }}   className="form-control"  placeholder='First Name' />
								    	<input type="text" defaultValue={basicInfo?.last_name}  onChange={(e) => { setBasicInfo({...basicInfo,last_name : e.target.value}) }} className="form-control"  placeholder='Last Name' />
								  	</div>  
							 	</div>
							  	<div className="mb-3">
							  	  <label  className="form-label">Intro</label>
					
							 	   <textarea  className="form-control" onChange={(e) => { setBasicInfo({...basicInfo,bio : e.target.value}) }}   defaultValue={basicInfo?.bio} placeholder='bio'  cols="30" rows="4"></textarea>

							 	</div>
							 	 <button type="submit" onClick={saveBasicInfo} className="btn formSubBtn">Save</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Setting;