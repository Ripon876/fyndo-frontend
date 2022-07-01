import {useEffect} from 'react';
import './Utils.css';
import {compress,decompress} from 'lz-string';
import Toast from './ToastAlert';
import {fileAtom} from '../store/store';
import {useRecoilState} from 'recoil';



function FileUploader() {

const [file, setFile] = useRecoilState(fileAtom);




const  getImg = (file) => {


 const size = Math.round((file.size / 1024));

  if (size >= 1500) {
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



useEffect(() => {
	console.log(file)
}, [file])

	return (
		<div className='uploaderContainer'>
		<div className='h-100 position-relative w-100'>
			<div id="file-upload-form" className="uploader">
			  <input id="file-upload" onChange={(e) => { getImg(e.target.files[0])
        }} type="file" name="fileUpload" accept="image/*" />

			  <label for="file-upload" id="file-drag">
			    <img id="file-image" src="#" alt="Preview" className="hidden" />
			    <div id="start">
			      <i className="fa fa-download" aria-hidden="true"></i>
			      <div>Select a Image</div>
			      {/*<div id="notimage" className="hidden">Please select an image</div>*/}
			      <span id="file-upload-btn" className="btn btn-primary">Select a file</span>
			    </div>
			    <div id="response" className="hidden">
			      <div id="messages"></div>
			      <progress className="progress" id="file-progress" value="0">
			        <span>0</span>%
			      </progress>
			    </div>
			  </label>
			</div>
		</div>
		</div>
	)
}

export default FileUploader;