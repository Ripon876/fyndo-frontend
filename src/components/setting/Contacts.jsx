import {useState,useEffect} from 'react';
import socket  from '../../socket/socket';
import {authToken,postsAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import jwt_decode from "jwt-decode";
import Toast from '../../utils/ToastAlert';




/*
	contacts : {
		phone_num : String,
		email : String,
		address : String
	}
*/


function Contacts() {

const [contacts,setContacts] = useState({
	phone_num : '',
	email : '',
	address : ''
})








	return (
		   <div className="row mt-5">
				<div className="col-10 m-auto">
					<div className="row">
						<div className='col-8 settingSections p-5'>
							<h4 className='border-start ps-2 mb-4'><strong>Contacts</strong></h4>
							<div className="mb-3">
								<label  className="form-label">Phone Number</label>
								<div className='d-flex gap-3'>
								  	<input type="number"  defaultValue={contacts?.phone_num}   className="form-control"  placeholder='number' />
								</div>  
							</div>
							<div className="mb-3">
								<label  className="form-label">Email</label>
								<div className='d-flex gap-3'>
								  	<input type="email"   defaultValue={contacts?.email}   className="form-control"  placeholder='email' />
								</div>  
							</div>
							
							<div className="mb-3">
								<label  className="form-label">Address</label>
								<div className='d-flex gap-3'>
								  	<input type="text"  defaultValue={contacts?.address}  className="form-control"  placeholder='address' />
								</div>  
							</div>
							
							<button type="submit"  className="btn formSubBtn">Save</button>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Contacts;