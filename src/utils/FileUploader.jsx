import {useEffect,useState} from 'react';
import './Utils.css';
import {compress,decompress} from 'lz-string';
import Toast from './ToastAlert';
import {fileAtom} from '../store/store';
import {useRecoilState} from 'recoil';
import { Bars } from  'react-loader-spinner'


function FileUploader() {

const [file, setFile] = useRecoilState(fileAtom);
const [showLoader, setShowLoader] = useState(false);




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

var compressed = compress(e.target.result);

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

		<div className='uploaderContainer'>



		<div className='h-100 position-relative w-100'>
			<div id="file-upload-form" className="uploader">
			  <input id="file-upload" onChange={(e) => { getImg(e.target.files[0])
              }} type="file" name="fileUpload" accept="image/*" />
				
				{file && 
					<i className="fa fa-xmark mb-2 clearImg" onClick={clearImg} aria-hidden="true"></i>
				}
				
			  <label for="file-upload" id="file-drag">


				{file && 
				 	<div className='demoImg'>
				 		<img id="file-image" src={decompress(file)} alt="Preview" className="" />

				 	</div>
				}   



			    <div id="start" className='text-center'>
			     {(!showLoader && !file) &&
              			<>
              				<i className="fa fa-download" aria-hidden="true"></i>
              				<div>Select a Image</div>
              				<span id="file-upload-btn" className="btn btn-primary">Select a file</span>
              			</>
			   
			     }  
					
                   {showLoader && 
                   		<div className='fileLoadingAnm'>
						<Bars color="#9CA3AF" height={80} width={80} />
					</div> 
				}
			    
			    </div>

			    
			  </label>
			</div>
		</div>
		</div>
	)
}

export default FileUploader;