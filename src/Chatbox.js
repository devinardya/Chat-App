import React from 'react';
import {DataMessagesHistory} from './socketListen';
import {DataMessagesUpdate} from './SocketWrite';
import io from 'socket.io-client';
import { MdClose } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import {emojify} from 'react-emojione';


class Chatbox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: "",  
            counter: 0,
            valid: false,
        }
      
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCloseChat = this.onCloseChat.bind(this);
        this.gettingData = this.gettingData.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        
    
      }

    gettingData(){

        DataMessagesHistory()
        .then( chatHistory => {
            //console.log(chatHistory)
            this.setState({dataHistory: chatHistory})
        })

        DataMessagesUpdate()
        .then ((newMessage) => {
            let copyMessage = [...this.state.dataHistory];
            copyMessage.splice(0, 1);
            this.setState({ dataHistory: [...copyMessage, newMessage] });
        })
    }

   componentDidMount(){
      
        this.gettingData();
        this.scrollToBottom();
    }   

    componentDidUpdate(){
        this.scrollToBottom();
    }

    componentWillUnmount(){
    }


    onChange(e){
          this.setState({value: e.target.value});
    } 

    notSubmit(e){
        e.preventDefault();
    }

    onSubmit(e){
    
        e.preventDefault();
      let name = this.props.username;
        console.log(name)
        var socket = io('http://3.120.96.16:3000');
        socket.emit("message",{
            username: name,
            content: this.state.value,
        }, (response) =>{
            console.log("Emitted", response)
        });  
        this.setState({value: ""});
    }

    onCloseChat(){
        this.props.onCloseChat(this.state.valid);
    }

    scrollToBottom(){
        const scrollHeight = this.messageList.scrollHeight;
        this.messageList.scrollTop = scrollHeight;
       /*  const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop: 0; */
    }


    render(){
    
        let printData;
        let dataH = this.state.dataHistory;
        let dataHis = [];
        let classNameMessage;
        let userCurrent = this.props.username;
        let count = this.state.value.length;
        let newcolor;
        let getSubmit;

    // input box validation  
   
        if (count > 200){
            newcolor = {color: "red"}
            getSubmit = this.notSubmit;
        } else {
            newcolor = {color: "#252525"}
            getSubmit = this.onSubmit;
        }

   // saving data from server to a new local variable
        if (dataH !== undefined){

            dataH.map(data =>{
                return dataHis.push(data)
            })
        }

    // function to check if there's link inside the string
        function isLink(string){
            let urlRegex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
            return urlRegex.test(string);
        }

    // create DOM elements to render data history from the server
        printData = dataHis.map(data =>{
            checkMessages(data.username);

            let content = data.content.split(" ").map(word => {
                if (isLink(word)){
                    //console.log(word)
                    return <a key={word} href={word}>{word}</a>
                }
                return emojify(" " + word + " ", {output: 'unicode'});
            })

            return (<div className={classNameMessage} key={data.id}>
                        <p className="uName">{data.username}</p>
                        <p  className="textMessages">{content}</p>
                    </div>)
        })  

    // to check if the username is the same with the one from the server - to change chat bubble style
        function checkMessages(data){
            if (data === userCurrent){
              return  classNameMessage = "user-messages";
            } else {
              return  classNameMessage = "messages";
            }
        } 

        return (
                <div className="chatbox">
                    <div className="profile">
                        <h5><MdAccountCircle className="profile-icon" size="30px" color="white" onClick={this.onCloseChat}/> 
                            {this.props.username}
                        </h5>
                        <span className="close-button"><MdClose size="30px" color="white" onClick={this.onCloseChat}/></span>
                    </div>
                    <div className="render-messages" ref={(div) => {this.messageList = div;}}>
                        {printData}
                    </div>
                    <div className="chat-input-container">
                        <form className="chat-form" onSubmit = {getSubmit}>
                            <input className="chat-input" style={newcolor} type="text" placeholder="Enter messages..." value={this.state.value} onChange={this.onChange}/>
                            <button className="send-button">Send</button>
                            <span className="input-label">Maximum 200 characters</span>
                            <span className="input-label2" style={newcolor}>{count}/200</span>
                        </form>
                    </div>
                </div>
            )
    }
}

export default Chatbox;