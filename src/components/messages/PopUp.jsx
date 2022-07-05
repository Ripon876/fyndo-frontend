import React from 'react'

function PopUp({imgSrc}) {
	return (
		<div className='img-popup'>
			<div className="popUpContent">
				<img src={imgSrc} alt="" />
			</div>
		</div>
	)
}

export default PopUp;