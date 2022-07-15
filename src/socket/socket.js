import io from "socket.io-client";

const socket = io(process.env.REACT_APP_HOST ,{transports: ['websocket'], upgrade: false});


export default socket;