import io from 'socket.io-client';

function DataMessagesUpdate(cb){
    
    var socket = io('http://3.120.96.16:3000');
  
    //getting new "Live" messages
    socket.on('new_message', function(message){
      console.log("new_message", message);
      cb(null, message);
    });
}

export {DataMessagesUpdate}