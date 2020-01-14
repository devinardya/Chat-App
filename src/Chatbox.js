import React from 'react';
import { DataMessagesHistory } from './socketListen';
import { DataMessagesUpdate } from './SocketWrite';
import io from 'socket.io-client';
import { MdClose } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { emojify } from 'react-emojione';


const socket = io('http://3.120.96.16:3000');

class Chatbox extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            value: "",  
            counter: 0,
            valid: false,
            dataHistory: [],
        }
      
        this.messageList = React.createRef();
        this.onChange = this.onChange.bind(this);
        this.onNotSubmit = this.onNotSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCloseChat = this.onCloseChat.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
      }

   componentDidMount(){
        DataMessagesHistory()
        .then( chatHistory => {
            //console.log(chatHistory)
            this.setState({dataHistory: chatHistory})
        })

        DataMessagesUpdate(socket, (err, newMessage) => {	
            let copyMessage = [...this.state.dataHistory];	
            copyMessage.splice(0, 1);	
            //console.log(newMessage)
            this.setState({ dataHistory: [...copyMessage, newMessage] });
        })
        
        this.scrollToBottom();
    }   

    componentDidUpdate(){
        this.scrollToBottom();
        
    }

    componentWillUnmount(){
        socket.close();
        console.log("DISCONNECTED")
    }

    onChange(e){
          this.setState({value: e.target.value});
    } 

    onNotSubmit(e){
        e.preventDefault();
    }

    onSubmit(e){
    
        e.preventDefault();
        let name = this.props.username;
        console.log(name)
       
        socket.emit("message",{
            username: name,
            content: this.state.value,
        }, (response) =>{
            console.log("Emitted", response)
        });  

        let message = {username: name, content: this.state.value};
        let copyMessage = [...this.state.dataHistory];	
        copyMessage.splice(0, 1);	
        this.setState({ dataHistory: [...copyMessage, message] });
        this.setState({value: ""});
 
    }

    onCloseChat(){
        this.props.onCloseChat(this.state.valid);
    }

    scrollToBottom(){
        const scrollHeight = this.messageList.current.scrollHeight;
        this.messageList.current.scrollTop = scrollHeight;
    }


    render(){
    
        let printData;
        let dataH = this.state.dataHistory;
        let messageLog = [];
        let classNameMessage;
        let userCurrent = this.props.username;
        let count = this.state.value.length;
        let newcolor;
        let getSubmit;

    // input box validation  
       
        if (count > 200 || count === 0){
            newcolor = {color: "red"}
            getSubmit = this.onNotSubmit;
        } else {
            newcolor = {color: "#252525"}
            getSubmit = this.onSubmit;
        }
        
   // saving data from server to a new local variable
        if (dataH !== undefined){

            dataH.map(data =>{
               
                return messageLog.push(data)
            })
        }

       // console.log(messageLog)


    // function to check if there's link inside the string
        function isLink(string){
            let urlRegex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
            return urlRegex.test(string);
        }

    // create DOM elements to render data history from the server
  
        printData = messageLog.map(data =>{
            checkMessages(data.username);

            let content = data.content.split(" ").map(word => {
                if (isLink(word)){
                    //console.log(word)
                    return <a key={word} href={word}>{word}</a>
                }
                return emojify(" " + word + " ");
            })

            return (<div className={classNameMessage} key={data.id}>
                        <p key={data.id} className="uName">{data.username}</p>
                        <p key={data.timestamps} className="textMessages">{content}</p>
                    </div>)
        })  

    // to check if the username is the same with the one from the server - to change chat bubble style
        function checkMessages(data){
            if (data === userCurrent){
              return  classNameMessage = "messages user";
            } else {
              return  classNameMessage = "messages";
            }
        } 

        return (
                <div className="chatbox">
                    <div className="profile">
                        <h5><MdAccountCircle className="profile-icon" size="30px" color="white" /> 
                            {this.props.username}
                        </h5>
                        <span className="close-button"><MdClose size="30px" color="white" onClick={this.onCloseChat}/></span>
                    </div>
                    <div className="render-messages" ref={this.messageList}>
                        {printData}
                    </div>
                    <div className="chat-input-container">
                        <form className="chat-form" onSubmit = {getSubmit}>
                            <input className="chat-input" style={newcolor} type="text" placeholder="Enter messages..." value={this.state.value} onChange={this.onChange}/>
                            <button className="send-button">Send</button>
                            <span className="input-label" style={newcolor}>{count}/200 characters</span>
                        </form>
                    </div>
                </div>
            )
    }
}

export default Chatbox;