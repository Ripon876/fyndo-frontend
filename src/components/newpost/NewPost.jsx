import {useState} from 'react';
import {Link} from 'react-router-dom';
import './NewPost.css';
import Form  from './Form';

function NewPost() {

const [showModal, setShowModal] = useState(false);


const closeModal = () => {
  setShowModal(!showModal);
} 


	return (
    <>
		<div>
			<div className="container py-3">
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="col-md-6 col-sm-9">
                <div className="form d-flex">
                  <Link to='/profile' ><img className='me-2 p-1 profileImg' src="https://via.placeholder.com/50" alt="Id name" /></Link>
                  <input type="text" className="form-control form-input" placeholder="Write something.." onClick={()=> { setShowModal(!showModal) }} />
                </div>
              </div>
            </div>
          </div>
		</div>
    {showModal && <Form close={closeModal} /> }
    </>
		)
}

export default NewPost;