import React from 'react';
import './Post.css';

function Post() {
	return (
	
			<div className="container">
<div className="row justify-content-center">
    <div className="col-md-6 col-sm-9">
        <div className="media g-mb-30 media-comment postContainer">
           <div className='d-flex py-3 ps-4'>
	           <div className="ppimg">
	            	<img className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src="https://via.placeholder.com/50" alt="Image Description"  />
	           </div>
           	   <div className='align-items-center d-flex row'>
           	   	<h5 className='userName'>Name</h5>
           	   	 <span className="postTime">5 days ago</span>
           	   </div>
           </div>
          
            <div className="p-4 post pt-0">
    
              <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
     

<div className="postEngagements">
	<div className="d-flex justify-content-space-around">
		<div className='col likes'>
			 <i className="fa fa-thumbs-up"></i> 178
		</div>
		<div className="col comments text-end"> <i className="fa fa-message"> </i> 4</div>
	</div>
</div>

            </div>
        </div>
    </div>
</div>
</div>

	)
}

export default Post;