import React from 'react'
import Moment from 'react-moment';
import PostOptions from './PostOptions';



function Post({post,profile,rp}) {



/*
{
    "_id": "62baefc69cd7d33b70786162",
    "creator": {
        "_id": "62b0d52940bdf8edf9b5acc3",
        "first_name": "MD Ripon",
        "last_name": "Islam",
        "username": "ripon",
        "password": "$2b$10$byPPcFX7QjHsLFof46gCIOOeCPA2kvcibhYkbV6tvqjdssu3fh2gS",
        "education": [],
        "post": [
            "62baefc69cd7d33b70786162"
        ],
        "threads": [
            "62b0d54c40bdf8edf9b5acd0",
            "62b0d61340bdf8edf9b5ace5"
        ],
        "__v": 3
    },
    "content": "HI ! 😋",
    "creationDate": "2022-06-28T12:08:10.812Z",
    "__v": 0
}
*/


// console.log(post)


	return (
			<>
			<div className={profile ? '' : 'container'}>
				<div className="row justify-content-center">
				    <div className={profile ? '' : 'col-md-6 col-sm-9' }>
				        <div className="g-mb-30 media media-comment position-relative postContainer">
				           <div className='d-flex py-3 ps-4'>
					           <div className="ppimg">
					            	<img className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src="https://via.placeholder.com/50" alt="Image Description"  />
					           </div>
				           	   <div className='align-items-center d-flex row'>
				           	   	<h5 className='userName'>{post?.creator.first_name} {post?.creator.last_name}</h5>
				           	   	 <span className="postTime"><Moment fromNow>{post?.creationDate}</Moment></span>
				           	   </div>
				           </div>
				          
				            <div className="p-4 post pt-0">
				    
				              <p>{post?.content}</p>
				     

							<div className="postEngagements">
								<div className="d-flex justify-content-space-around">
									<div className='col likes'>
										 <i className="fa fa-thumbs-up"></i> 178
									</div>
									<div className="col comments text-end"> <i className="fa fa-message"> </i> 4</div>
								</div>
							</div>
				            </div>

				        {profile &&  <PostOptions id={post._id} rp={rp} />} 

				        </div>
				    </div>
				</div>
			</div>
			</>
	)
}

export default Post;