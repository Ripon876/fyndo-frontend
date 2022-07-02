import {useEffect,useRef,useState} from 'react';
import {thredAtom,friendsAtom,chatingWithAtom,incomingMsgAtom,messeagesAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import sm from './sm';
import {decompressFromUTF16} from 'lz-string';
import socket from '../../socket/socket';
import Toast from  '../../utils/ToastAlert';




function Chat() {


const chatingWith = useRecoilValue(chatingWithAtom);
const thred = useRecoilValue(thredAtom);
const [messages,setMessages] = useRecoilState(messeagesAtom);
const messagesEndRef = useRef(null);
const [pnum,setPnum] = useState(1);

 const listInnerRef = useRef();




const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}

useEffect(() => {
    // scrollToBottom();
    // scrollToBottom();
}, [messages]);


const handleScroll = (e) => {

    if (e.target.scrollTop  === 0) { 
        console.log("at the top now")
        setPnum((prevNum) => prevNum + 1)
    }


}


useEffect(() => {
    if(pnum !== 1){

    socket.emit('getOldMessages',thred,pnum,(res) => {
        if(res.status){
            setMessages((prev)=>  [...res.messages,...prev] )
        }else{
            console.log(res)

Toast({
    type: res.type,
    icon : res.type,
    title : res.msg
})

        }
    })



    }

}, [pnum])




	return (
		   <div className="chat-history">
                    <ul className="m-b-0  px-4"  onScroll={handleScroll} ref={listInnerRef} >
                    



                        {  chatingWith && messages?.map((msg) => 
                            <li className="clearfix">
                                <div className="message-data">
                                      <span className="message-data-time"></span>
                                </div>
                                <div className={`message  ${  msg?.from?.id  == chatingWith?._id ? 'other-message' : 'my-message float-right'}`}>

                                {msg.type == 'text' ?  msg.msg  : 
                                <>

                                 <img src={decompressFromUTF16(msg?.msg)}  className='img-fluid' />

                                </>
                                }

                                </div>
                            </li>
                        )}





                        <div ref={messagesEndRef} />
                    </ul>
                </div>
	)
}

export default Chat;