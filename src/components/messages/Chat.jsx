import {useEffect} from 'react';
import {thredAtom,friendsAtom,chatingWithAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import sm from './sm';







function Chat() {


const chatingWith = useRecoilValue(chatingWithAtom);


// console.log(chatingWith)

	return (
		   <div className="chat-history">
                    <ul className="m-b-0  px-4">
                    
                        {  chatingWith && sm?.map((msg) => 
                            <li className="clearfix">
                                <div className="message-data">
                                      <span className="message-data-time"></span>
                                </div>
                                <div className={`message ${  msg?.from.id  == chatingWith?._id ? 'other-message' : 'my-message float-right'}`}>{msg.message}</div>
                            </li>
                        )}

                    </ul>
                </div>
	)
}

export default Chat;