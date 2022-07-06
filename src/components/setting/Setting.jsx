import './Setting.css';
import BasicInfo from './BasicInfo';
import Contacts from './Contacts';


function Setting() {



	return (
		<div className='settings py-4'>
			<div className="container">
			    <BasicInfo />
			    <Contacts />
			</div>
		</div>
	)
}

export default Setting;