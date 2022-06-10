import {selector, atom} from 'recoil';



 const userState = atom({
	key : 'userState',
	default : 0
});

 const authToken = atom({
	key : 'authToken',
	default : ''
});


 export {
 	userState,
 	authToken
 }