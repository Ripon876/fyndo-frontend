import {selector, atom} from 'recoil';



 const userState = atom({
	key : 'userState',
	default : {}
});

 const authToken = atom({
	key : 'authToken',
	default : ''
});

const thredAtom = atom({
	key  : 'thred',
	default : ''
})
 

const friendsAtom = atom({
	key : 'friends',
	default : []
})

 export {
 	userState,
 	authToken,
 	thredAtom,
 	friendsAtom
 }