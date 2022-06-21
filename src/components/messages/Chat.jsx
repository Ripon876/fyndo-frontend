import {useEffect,useRef} from 'react';
import {thredAtom,friendsAtom,chatingWithAtom,incomingMsgAtom,messeagesAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import sm from './sm';







function Chat() {


const chatingWith = useRecoilValue(chatingWithAtom);
const messages = useRecoilValue(messeagesAtom);
const messagesEndRef = useRef(null);


const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}

useEffect(() => {
    scrollToBottom()
}, [messages]);



	return (
		   <div className="chat-history">
                    <ul className="m-b-0  px-4">
                    
                        {  chatingWith && messages?.map((msg) => 
                            <li className="clearfix">
                                <div className="message-data">
                                      <span className="message-data-time"></span>
                                </div>
                                <div className={`message ${  msg?.from?.id  == chatingWith?._id ? 'other-message' : 'my-message float-right'}`}>{msg.msg}</div>
                            </li>
                        )}
 <div ref={messagesEndRef} />
                    </ul>
                </div>
	)
}

export default Chat;