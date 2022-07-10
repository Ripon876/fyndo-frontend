import {atom,selector} from 'recoil';



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
});
 


const messeagesAtom = atom({
	key  : 'messages',
	default : []
});



const lastMsgAtom = selector({
	key  : 'lm',
	get : ({get}) => {
		 const msgs = get(messeagesAtom);
		 return msgs.at(-1);
	},
});
 

const userAtom = atom({
	key : 'c_user',
	default : {}
});

const friendsAtom = atom({
	key : 'friends',
	default : []
});


const chatingWithAtom = atom({
	key : 'catingWith',
	default : {}
});

const unseenMsgAtom = atom({
	key : 'unseenMsg',
	default : { 
      id: '',
      msg : ''
    }
});


const postsAtom = atom({
	key : 'posts',
	default : []
});

const userPostsAtom = atom({
	key: 'userPosts',
	default: []
});


const fileAtom = atom({
	key : 'file',
	default : ''
});

const activerUsersAtom = atom({
	key : 'activeUsers',
	default : []
});



 export {
 	userState,
 	authToken,
 	thredAtom,
 	userAtom,
 	friendsAtom,
 	chatingWithAtom,
 	messeagesAtom,
 	unseenMsgAtom,
 	postsAtom,
 	userPostsAtom,
 	fileAtom,
 	lastMsgAtom,
 	activerUsersAtom
 }