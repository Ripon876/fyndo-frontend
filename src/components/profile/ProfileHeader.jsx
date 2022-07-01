import React from 'react'

function ProfileHeader({user}) {
	return (
		<>
			<div className="profileHeader position-relative">
				<div className='coverPhoto position-relative'>
					<img src="https://via.placeholder.com/650x300" className='img-fluid w-100 rounded-top' alt="Cover Photo" />
				    <div className='bottom-0 coverFadeBottom position-absolute w-100'></div>
				</div>
				<div className='profilePhoto'>
					<img src="https://via.placeholder.com/200x200" alt=""  className='rounded-circle w-100' />
				</div>
			</div>
			<div className='my-2 mb-5 pt-4 text-center userName'>
				<h1>{user?.first_name} {user?.last_name}</h1>
			</div>
		</>
	)
}

export default ProfileHeader;