import React from 'react';

function Form({close}) {



	return (
		<>
		
<div className="modal d-block row" id="exampleModalCenter" tabindex="-1" >
	<div className="col-7 m-auto modal-dialog-centered px-5" role="document">
		<div className="modal-content p-3">
			<h1 className='small text-end closeModal'  onClick={close} ><i class="fa-solid fa-xmark"></i></h1>
			<div className="modal-body">
				<form>
					<div className="mb-3">
					    <label for="exampleInputPassword1" className="form-label">Write what you want</label>
						<textarea name="" className='form-control' id="" cols="30" rows="10"></textarea>
					</div>
					<button type="submit" className="btn t-btn">Post</button>
				</form>
			</div>
		</div>
	</div>
</div>
		</>
	)
}

export default Form;