import {useState,useEffect} from 'react';
import {Fade} from 'react-reveal';
import EmojiPopUp from '../newpost/EmojiPopUp';
import {userAtom,authToken,postsAtom,userPostsAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import socket from '../../socket/socket';
import jwt_decode from "jwt-decode";
import Toast from '../../utils/ToastAlert';





function EditPost({id}) {

const [showModal, setShowModal] = useState(false);
const [input, setInput] = useState("");   
/*const c_user =  useRecoilValue(userAtom);
const token =  useRecoilValue(authToken);
const [posts, setPost] = useRecoilState(postsAtom);
const [userPosts, setUserPost] = useRecoilState(userPostsAtom);*/

 // var user = jwt_decode(token)

const addEmoji = (e) => {  
    setInput(input + e.native);  
  
  };

const getPost = ()=> {
	socket.emit('getPostToEdit',id,(post)=> {
       
        setInput(post.content)

	})
}

const closeModal = () => {
  setShowModal(false);
} 

useEffect(() => {
	 getPost()
}, [])



const editPost = () => {
	socket.emit('editPost',id,(res)=> {
		console.log(res);
	})
}





	return (
		<>
		<Fade duration={500} >
			<div className="modal d-block row" id="exampleModalCenter" tabindex="-1" >
				<div className="col-md-7 col-sm-10 m-auto modal-dialog-centered px-5" role="document">
					<div className="modal-content p-3">
						<h1 className='small text-end closeModal'  onClick={closeModal} ><i class="fa-solid fa-xmark"></i></h1>
						<div className="modal-body">
							<div>
								<div className="mb-3">
								<label for="exampleInputPassword1" className="form-label">Edit Your Post</label>
               
             	 				<EmojiPopUp f={addEmoji} />
								<textarea autoFocus  onChange={(e) => setInput(  e.target.value)} className='form-control' id="" cols="30" rows="10" value={input} />
								</div>
								<button  className="btn t-btn">Save</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fade>
		</>
	)
}

export default EditPost;