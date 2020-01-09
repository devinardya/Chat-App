import io from 'socket.io-client';

function DataMessagesHistory(cb){
    
    var socket = io('http://3.120.96.16:3000');

    socket.on('connect', function(){
       cb(null, console.log("CONNECTED")) 
    });
  
    //getting all the messages sent before (history)
    socket.on('messages', data =>{
        console.log("messages", data);
        cb(null, data);
    });
  
}

export {DataMessagesHistory};