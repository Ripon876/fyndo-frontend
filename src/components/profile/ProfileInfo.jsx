
function ProfileInfo({user}) {

console.log(user?.education)
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
				    {user?.education?.map((institute)=> 
				    	<p className='font-monospace text-start ps-1'><span>{institute.status === '1'  ?  'Curenntly in' : 'Studied  in'}</span>  <strong>{institute.name}</strong>  </p>
				    )}
				  
			    </div>
				
			</div>
	)
}

export default ProfileInfo;