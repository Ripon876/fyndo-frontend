import {useState,useEffect} from 'react'
import Institute from './Institute';
import socket  from '../../socket/socket';
import {authToken,postsAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import jwt_decode from "jwt-decode";
import Toast from '../../utils/ToastAlert';





function Education() {

const [formsList, setFormsList] = useState([]);
const token =  useRecoilValue(authToken);
const user = jwt_decode(token);



const onAddBtnClick = () => {
    setFormsList(formsList.concat(<Institute key={formsList.length} newForm />));
};



const parseData = (arr) => {
    var parsedData = [];
    for (var i = 0; i < arr.length / 2;i++){
        
    parsedData[i] = {name: arr[i][1],status: arr[i+1][1]};
        
    }
        return parsedData;
}




const handleSubmit = (e) => {
	e.preventDefault()
	
	const data = new FormData(e.target);
	 const values = [...data.entries()];
    console.log();
    // console.log(Object.assign({}, values))




socket.emit('saveEducationInfo',user.id,parseData(values),(res)=> {
	console.log(res)
});



}





	return (
		 <div className="row mt-5">
				<div className="col-10 m-auto">
					<div className="row">
						<div className='col-8 settingSections p-5'>
							<h4 className='border-start ps-2 mb-4'><strong>Education</strong></h4>
						
							<form onSubmit={handleSubmit}>
							    <div className="mb-3">
								 
								  <Institute />  
							 	
								  {formsList && formsList}
							 	</div>
							    <div className="mb-3">
							    		<button type="submit"   onClick={onAddBtnClick}  className="btn formSubBtn"><i className="fa fa-plus" ></i> Add</button>
							    </div>
							<button type="submit"   className="btn formSubBtn">Save</button>
							</form>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Education;