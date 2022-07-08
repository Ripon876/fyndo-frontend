import {useState} from 'react'


function Institute({newForm}) {

const [show, setShow] = useState(true);

const removeForm = (e) => {
setShow(false)
}

	return (
		<>
		{show &&
			<div className='d-flex gap-3'>
				<div className=' w-75'> 
					<label  className="form-label">Name</label>
					<input type="text" name='name' required className="form-control"  placeholder='School / Collage name' />
				</div>
				<div className=' w-25'> 
					<label  className="form-label">Status</label>
					<select name='status'  class="form-select form-select mb-3" required>
						<option selected={newForm ? true : false} >select</option>
						<option value="1"  selected={false} >Currently In</option>
						<option value="2"  selected={false} >Went out</option>
					</select>
				</div>
				 {newForm && <div className='clearInput' onClick={(e)=> {removeForm(e)}}><i className='fa-solid fa-x'></i></div> }
			</div>
		}
		</>
	)
}

export default Institute;