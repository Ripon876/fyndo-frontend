import {useEffect,useRef,useState} from 'react';
import {thredAtom,friendsAtom,chatingWithAtom,incomingMsgAtom,messeagesAtom,lastMsgAtom} from '../../store/store';
import {useRecoilValue,useRecoilState} from 'recoil';
import sm from './sm';
import {decompressFromUTF16} from 'lz-string';
import socket from '../../socket/socket';
import Toast from  '../../utils/ToastAlert';
import { TailSpin } from  'react-loader-spinner'
import PopUp from './PopUp';


function Chat({messagesEndRef}) {


const chatingWith = useRecoilValue(chatingWithAtom);
const thred = useRecoilValue(thredAtom);
const [messages,setMessages] = useRecoilState(messeagesAtom);
const [pnum,setPnum] = useState(1);
const listInnerRef = useRef();
const lm = useRecoilValue(lastMsgAtom);
const [msgLoader,setMsgLoader] = useState(false);
const [showPopUp,setShowPopUp] = useState(false);
const [selectedImg,setSelectedImg] = useState('');




const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}


const closePopUP = () => {
    setShowPopUp()
}

useEffect(() => {
    scrollToBottom();
    scrollToBottom();
}, [lm]);


const handleScroll = (e) => {

    if (e.target.scrollTop  === 0) { 
       
        setPnum((prevNum) => prevNum + 1)
    }


}


useEffect(() => {
    if(pnum !== 1){
        setMsgLoader(true);
        socket.emit('getOldMessages',thred,pnum,(res) => {
            if(res.status){
                setMsgLoader(false);
                setMessages((prev)=>  [...res.messages,...prev] )
            }else{
                setMsgLoader(false);
                Toast({
                    type: res.type,
                    icon : res.type,
                    title : res.msg
                })
            }
        })
    }

}, [pnum])




/*useEffect(() => {
    


}, [selectedImg])*/



	return (
		   <div className="chat-history">

{showPopUp  && <PopUp  imgSrc={selectedImg}  closePopUP={closePopUP} /> }   
                    <ul className="m-b-0  px-4"  onScroll={handleScroll} ref={listInnerRef} >
                    <div className='msgLoadingAnm'>
                       {msgLoader && <TailSpin color="#9CA3AF" height={80} width={80} />} 
                    </div> 

                        {  chatingWith && messages?.map((msg) => 
                            <li className="clearfix">
                                <div className="message-data">
                                      <span className="message-data-time"></span>
                                </div>
                                <div className={`message  ${  msg?.from?.id  == chatingWith?._id ? 'other-message' : 'my-message float-right'}`}>

                                {msg.type == 'text' ?  msg.msg  : 
                                <>
                                       
                                 <img src={decompressFromUTF16(msg?.msg)} onClick={(e)=> { setSelectedImg(e.target.src); setShowPopUp(!showPopUp) } } className='img-fluid' />

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