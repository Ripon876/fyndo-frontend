import {useState,useEffect} from 'react';
import {Fade} from 'react-reveal';
import EmojiPopUp from '../../utils/EmojiPopUp';
import {userAtom,authToken,postsAtom,userPostsAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import socket from '../../socket/socket';
import jwt_decode from "jwt-decode";
import Toast from '../../utils/ToastAlert';





function Form({close,profile}) {


const [input, setInput] = useState("");   
const c_user =  useRecoilValue(userAtom);
const token =  useRecoilValue(authToken);
const [posts, setPost] = useRecoilState(postsAtom);
const [userPosts, setUserPost] = useRecoilState(userPostsAtom);

 var user = jwt_decode(token)

const addEmoji = (e) => {  
    setInput(input + e.native);  
  
  };


const post = () => {
		 

	var postData = {
		creator : user.id,
		content : input
	}

	socket.emit('post',postData, async(res) => {

		if(res.status){

	        setInput('');
	        close();
			
			await Toast({
			  type: 'success',
			  icon : 'success',
			  title: 'Post created successfully'
			})

		setPost((prvPosts) => [res.post,...posts] );  

			if(profile){
				setUserPost((prvPosts) => [res.post,...userPosts])
			}
		}
	});
};



	return (
		<>
		<Fade duration={500} >
			<div className="modal d-block row" id="exampleModalCenter" tabindex="-1" >
				<div className="col-md-7 col-sm-10 m-auto modal-dialog-centered px-5" role="document">
					<div className="modal-content p-3">
						<h1 className='small text-end closeModal'  onClick={close} ><i class="fa-solid fa-xmark"></i></h1>
						<div className="modal-body">
							<div>
								<div className="mb-3">
								<label for="exampleInputPassword1" className="form-label">Write what you want</label>
               
             	 				<EmojiPopUp f={addEmoji} />
								<textarea autoFocus  onChange={(e) => setInput(  e.target.value)} className='form-control' id="" cols="30" rows="10" value={input} />
								</div>
								<button  onClick={post} className="btn t-btn">Post</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fade>
		</>
	)
}

export default Form;