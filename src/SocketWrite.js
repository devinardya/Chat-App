

function DataMessagesUpdate(socket, cb){
  socket.on('new_message', function(message){
    console.log("new_message", message);
    cb(null, message);
  });

    
}

export {DataMessagesUpdate};