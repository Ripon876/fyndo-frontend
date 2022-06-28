import {useState,useEffect} from 'react';
import {Fade} from 'react-reveal';
import EmojiPopUp from './EmojiPopUp';
import {useRecoilValue,useRecoilState} from 'recoil';
import socket from '../../socket/socket';


function Form({close}) {

const [input, setInput] = useState("");



const addEmoji = (e) => {  
    setInput(input + e.native);  
  
  };


const post = () => {
	console.log('posted')
	console.log(input)
}

useEffect(() => {
	console.log(socket)
}, [])



	return (
		<>
		<Fade duration={500} >
			<div className="modal d-block row" id="exampleModalCenter" tabindex="-1" >
				<div className="col-7 m-auto modal-dialog-centered px-5" role="document">
					<div className="modal-content p-3">
						<h1 className='small text-end closeModal'  onClick={close} ><i class="fa-solid fa-xmark"></i></h1>
						<div className="modal-body">
							<div>
								<div className="mb-3">
								<label for="exampleInputPassword1" className="form-label">Write what you want</label>
               
             	 				<EmojiPopUp f={addEmoji} />
								<textarea onChange={(e) => setInput(  e.target.value)} className='form-control' id="" cols="30" rows="10" value={input} />
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