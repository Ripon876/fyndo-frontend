import React from 'react';
import './NewPost.css';

function NewPost() {
	return (
		<div>
			<div className="container py-3">
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="col-md-6 col-sm-9">
                <div className="form d-flex">
                  <img className='me-2 p-1 profileImg' src="https://via.placeholder.com/50" alt="Id name" />
                  <input type="text" className="form-control form-input" placeholder="Write something.." />
                </div>
              </div>
            </div>
          </div>
		</div>
		)
}

export default NewPost;