import io from 'socket.io-client';

function DataMessagesHistory(){
    
    const socket = io('http://3.120.96.16:3000');

    function connect(){
        return new Promise((resolve, reject) => {
            socket.on('connect', function(){
                resolve(console.log("CONNECTED")) 
            })
        })
    }

    function getDataHistory(){
        return new Promise((resolve, reject) =>{
            socket.on('messages', data =>{
                console.log("messages", data);
                resolve(data);
            })
        })
    }

    return connect()
    .then(getDataHistory)

}

export {DataMessagesHistory};