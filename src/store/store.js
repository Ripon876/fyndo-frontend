import {selector, atom} from 'recoil';



 const userState = atom({
	key : 'userState',
	default : {}
});

 const authToken = atom({
	key : 'authToken',
	default : ''
});


 export {
 	userState,
 	authToken
 }