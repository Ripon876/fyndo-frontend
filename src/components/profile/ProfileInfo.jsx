
function ProfileInfo({user}) {


	return (
			<div className="col-4">
			    <div className="bio p-2 border-start mt-0">
				    <h5 className='ps-2'>Intro</h5>
				    <p className='font-monospace text-center lead '>{user?.bio}</p>
			    </div>
			    <div className="bio p-2 border-start">
				    <h5 className='ps-2'>Contacts</h5>
				       <p className='font-monospace text-start ps-1'><i className="fa-solid fa-phone"></i> <span>{user?.contacts?.phone_num}</span> </p>
				       <p className='font-monospace text-start ps-1'><i className="fa-solid fa-envelope"></i> <span>{user?.contacts?.email}</span> </p>
				       <p className='font-monospace text-start ps-1'><i className="fa-solid fa-location-dot"></i> <span>{user?.contacts?.address}</span> </p>
			    </div>
			    <div className="bio p-2 border-start">
				    <h5 className='ps-2'>Education</h5>
				    <p className='font-monospace text-start ps-1'>Lorem ipsum dolor sit amet consectetur - <span>status</span> </p>
			    </div>
				
			</div>
	)
}

export default ProfileInfo;