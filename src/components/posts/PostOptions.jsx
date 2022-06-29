import {useState} from 'react';
import {Fade} from 'react-reveal';
import ClickOutside from 'react-click-outside';




function PostOptions() {

const [show, setShow] = useState(false);


	return (
		<div class="float-end position-absolute postOption">
			<i class="fa-solid fa-ellipsis postOptionIcon" onClick={()=> { setShow(true)}} ></i>

{show &&    
	<ClickOutside onClickOutside={()=> { setShow(false) }}>
		<Fade duration={500} >
			<div className="post-options-list position-absolute">
				<ul class="list-group">
					<li class="list-group-item"><i class="fa-solid fa-pen-to-square"></i> Edit</li>
					<li class="list-group-item"><i class="fa-solid fa-share"></i> Share</li>
					<li class="list-group-item"><i class="fa-solid fa-trash-can"></i> Delete</li>
				</ul>
			</div>
		</Fade>
    </ClickOutside>
}
		</div>
	)
}

export default PostOptions;