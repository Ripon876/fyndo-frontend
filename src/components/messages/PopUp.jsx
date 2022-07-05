import React from 'react'

function PopUp({imgSrc,closePopUP}) {
	return (
		<div className='img-popup'>
			<div className="popUpContent">
				<div>
					<i className="fa fa-xmark mb-2 clearImg" onClick={closePopUP} ></i>
					<div className='w-75 m-auto'>
						<img src={imgSrc} className='img-fluid' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PopUp;