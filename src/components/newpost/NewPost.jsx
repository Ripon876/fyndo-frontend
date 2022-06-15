import React from 'react';
import './NewPost.css';

function NewPost() {
	return (
		<div>
			<div class="container py-3">
            <div class="row height d-flex justify-content-center align-items-center">
              <div class="col-md-6 col-sm-9">
                <div class="form">
                  <img className='profileImg' src="https://via.placeholder.com/50" alt="Id name" />
                  <input type="text" class="form-control form-input" placeholder="Write something.." />
                </div>
              </div>
            </div>
          </div>
		</div>
		)
}

export default NewPost;