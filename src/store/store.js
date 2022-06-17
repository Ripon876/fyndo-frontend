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
 

const userAtom = atom({
	key : 'c_user',
	default : {}
})

const friendsAtom = atom({
	key : 'friends',
	default : []
})


const chatingWithAtom = atom({
	key : 'catingWith',
	default : {}
})


 export {
 	userState,
 	authToken,
 	thredAtom,
 	userAtom,
 	friendsAtom,
 	chatingWithAtom
 }