import React,{useState,useEffect} from 'react';
import {Link,useNavigate ,useLocation } from 'react-router-dom';
import axios from 'axios';
import {authToken} from '../../store/store';
import {useRecoilState} from 'recoil';
import './Login.css';
import Toast from '../../utils/ToastAlert';




function Login() {

const [username, setUn] = useState('');
const [password, setPwd] = useState('');
const [auth,setAuth] = useRecoilState(authToken);
const navigate = useNavigate();
const {state} = useLocation();


const handleSubmit = async (e) => {
	e.preventDefault()
	 if(username && password){


		axios.post('http://localhost:5000/login',{username,password},{withCredentials: true })
		.then((data)=> {
		    setAuth(data.data.token);
		}).then(()=> {
			state?.prvUrl ? navigate(state.prvUrl) : navigate('/');
		}).catch((err)=> {
			if(err && err.response.status === 401){
				 Toast({
				 	type : 'warning',
				 	icon : 'warning',
				 	title : 'Please create a account first'
				 })
			}
		})



	 }
}

	return (
		<div>
	<div className="section">
		<div className="container">
			<div className="row full-height justify-content-center">
				<div className="col-12 text-center align-self-center py-5">
					<div className="section pb-5 pt-5 pt-sm-2 text-center">
						<div className="card-3d-wrap mx-auto">
							<div className="card-3d-wrapper">
								<div className="card-front">
									<div className="center-wrap">
										<div className="section text-center">
										<form  onSubmit={handleSubmit}>
											<h4 className="mb-4 pb-3 text-white">Log In</h4>
											<div className="form-group">
												<input type="text"  className="form-style" placeholder="Username" onChange={(e)=> { setUn(e.target.value) }}  autoComplete="off" />
												<i className="input-icon uil uil-at"></i>
											</div>	
											<div className="form-group mt-2">
												<input type="password"   className="form-style" placeholder="Password" onChange={(e)=> { setPwd(e.target.value) }}  autoComplete="off" />
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
											<button type="submit" className="subBtn mt-4">submit</button>
                            				<p className="mb-0 mt-4 text-center"> <span className="form-footer">Forgot your password? </span> <Link to="/password-reset" className="link"> Reset Password</Link></p>
                            				<p className="mb-0 text-center"> <span className="form-footer">Don't have an account ? </span> <Link to="/signup" className="link"> Sign Up now</Link></p>
				      					</form>
				      					</div>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>
	</div>
		</div>
	)
}

export default Login;