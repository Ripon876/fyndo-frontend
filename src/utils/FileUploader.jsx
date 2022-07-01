import {useEffect,useState} from 'react';
import './Utils.css';
import {compressToUTF16,decompressFromUTF16} from 'lz-string';
import Toast from './ToastAlert';
import {fileAtom} from '../store/store';
import {useRecoilState} from 'recoil';
import { Bars } from  'react-loader-spinner'
import {Fade} from 'react-reveal';
import ClickOutside from 'react-click-outside';
import socket from '../socket/socket';


function FileUploader({su,u,t,cw,sm}) {

const [file, setFile] = useRecoilState(fileAtom);
const [showLoader, setShowLoader] = useState(false);




const sendPhoto = () => {


/*console.log(cw)
console.log(t)
console.log(u)*/



var message = {
	threadId : t,
	type: 'image',
	msg : file,
	to : {
		name : cw.first_name + ' ' +  cw.last_name,
		username : cw.username,
		id : cw._id
	},
	from : {
		name : u.name,
		username : u.username,
		id : u.id
	}
};

// console.log(message)

socket.emit('send_message',message);
// sm(message,'img')
sm((prev)=>  [...prev,message] )
 su(false)
};



const  getImg = (file) => {

setShowLoader(true)

 const size = Math.round((file.size / 1024));

  if (size >= 1500) {

  	setShowLoader(false)
       Toast({
		  type: 'error',
		  icon : 'error',
		  title: 'Image too big'
		})
   }else{
   	readURL(file)
   }

function readURL() {
	if (file) {
		var reader = new FileReader();
		reader.onload = function(e) {
		// console.log(e.target.result.length)
		var compressed = compressToUTF16(e.target.result);
		// console.log(compressed.length)

		setFile(compressed);

		}
		reader.readAsDataURL(file); 
	}
}

}


const  clearImg = () => {
	setFile('');
}











useEffect(() => {
if(file != ''){

	// console.log(file);
	setShowLoader(false)
}

}, [file])

	return (
<Fade duration={500} >
		<div className='uploaderContainer'>



		<div className='h-100 position-relative w-100'>

		 <ClickOutside onClickOutside={()=> { su(false)}}>


			<div id="file-upload-form" className="uploader">
			  <input id="file-upload" onChange={(e) => { getImg(e.target.files[0])
              }} type="file" name="fileUpload" accept="image/*" />
				
				{file && 
					<i className="fa fa-xmark mb-2 clearImg" onClick={clearImg} aria-hidden="true"></i>
				}
				
			  <label for="file-upload" id="file-drag">


				{file && 
				 	<div className='demoImg'>
				 		<img id="file-image" src={decompressFromUTF16(file)} alt="Preview" className="" />

				 	</div>
				}   



			    <div id="start" className='text-center'>
			     {(!showLoader && !file) &&
              			<>
              				<i className="fa fa-download" aria-hidden="true"></i>
              				<div>Select a Image</div>
              				{/* <span id="file-upload-btn" className="btn btn-primary">Select a file</span>*/}
              			</>
			   
			     }  
					
                   {showLoader && 
                   		<div className='fileLoadingAnm'>
						<Bars color="#9CA3AF" height={80} width={80} />
					</div> 
				}
			    
			    </div>
			  </label>
				{file &&  <span id="file-upload-btn" onClick={sendPhoto} className="btn btn-primary">Send</span> }
			</div>




</ClickOutside>

		</div>
		</div>

		</Fade>
	)
}

export default FileUploader;