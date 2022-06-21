import {atom} from 'recoil';



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
 
const incomingMsgAtom = atom({
	key  : 'i_msg',
	default : ''
})
 
const outgoingMsgAtom = atom({
	key  : 'o_msg',
	default : ''
})

const messeagesAtom = atom({
	key  : 'messages',
	default : []
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
 	chatingWithAtom,
 	incomingMsgAtom,
 	outgoingMsgAtom,
 	messeagesAtom
 }