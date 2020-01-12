import io from 'socket.io-client';

function DataMessagesUpdate(){

    const socket = io('http://3.120.96.16:3000');
    return new Promise((resolve, reject) => {
      socket.on('new_message', function(message){
        console.log("new_message", message);
        resolve(message);
      });
    })
    
}

export {DataMessagesUpdate};