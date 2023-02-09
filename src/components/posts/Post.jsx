import React from 'react'
import Moment from 'react-moment';
import PostOptions from './PostOptions';
import{Link} from 'react-router-dom';
import {authToken,userPostsAtom} from  '../../store/store';
import {useRecoilValue,useRecoilState} from  'recoil';
import jwt_decode from "jwt-decode";



function Post({post,profile,showOptions,rp}) {

const token = useRecoilValue(authToken);
const user = jwt_decode(token);

	return (
			<>
			<div className={profile ? '' : 'container'}>
				<div className="row justify-content-center">
				    <div className={profile ? '' : 'col-md-6 col-sm-9' }>
				        <div className="g-mb-30 media media-comment position-relative postContainer">
				           <div className='d-flex py-3 ps-4'>
					           <div className="ppimg">
					           	<Link to={`/profile?id=${post?.creator?._id}`} >
					            	<img className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src="https://via.placeholder.com/50" alt="Image Description"  />
					         	</Link>
					           </div>
				           	   <div className='align-items-center d-flex row'>
					           	    <Link to={`/profile?id=${post?.creator?._id}`} >
					           	   		<h5 className='userName'>{post?.creator?.first_name} {post?.creator?.last_name}</h5>
					           	    </Link>
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

				        { showOptions  &&   <PostOptions id={post._id} rp={rp} />} 

				        </div>
				    </div>
				</div>
			</div>
			</>
	)
}

export default Post;