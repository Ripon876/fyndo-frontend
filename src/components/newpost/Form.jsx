import {useState,useEffect,useRef} from 'react';
import {Fade} from 'react-reveal';
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'



function Form({close}) {

const [input, setInput] = useState("");
const [showEmojis, setShowEmojis] = useState(false); 

 // new Picker({ data });



 const addEmoji = (e) => {  

 	 console.log(e)
    let sym = e.unified; 

   // &#x1F354;
	// "1f929"
 // 0x1F354
 const emoji = ` 0x${e.unified};`

// console.log(emoji)

    setInput(input + e.native);  
    // setInput(input + '&#x1F44C');  
   
  };


function EmojiPicker(props) {
  const ref = useRef()

  useEffect(() => {
    new Picker({ ...props, data, ref })
  }, [])

  return <div className='position-absolute emojiPicker' ref={ref} />
}

useEffect(() => {
	  
	  console.log(String(input))


}, [input])

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
 <button  className='button'  onClick={() => setShowEmojis(!showEmojis)}>  
        <svg  
          xmlns="http://www.w3.org/2000/svg"  
          className="icon"  
          fill="none"  
          viewBox="0 0 24 24"  
          stroke="currentColor"  
        >  
          <path  
            stroke-linecap="round"  
            stroke-linejoin="round"  
            stroke-width="2"  
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"  
          />  
        </svg>  
      </button> 
       {showEmojis && (  
        <div>  
          <EmojiPicker onEmojiSelect={addEmoji} />
           {/*<Picker title='Pick your emoji…' emoji='point_up' onSelect={addEmoji} />*/}
        </div>  
      )}
								<textarea onChange={(e) => setInput(  e.target.value)} className='form-control' id="" cols="30" rows="10" value={input} />
								</div>
								<button type="submit" className="btn t-btn">Post</button>
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