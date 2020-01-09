import React from 'react';
import {DataMessagesHistory} from './socketListen';
import {DataMessagesUpdate} from './SocketWrite';
import io from 'socket.io-client';

class Chatbox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: "",  
            counter: 0,  
        }
        // DataMessagesHistory((err, chatHistory) => this.setState({dataHistory: chatHistory}));
        // DataMessagesUpdate((err, chatUpdate) => this.setState({dataUpdate: chatUpdate}));
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
      }

    componentDidMount(){
        DataMessagesHistory((err, chatHistory) => this.setState({dataHistory: chatHistory}));
        DataMessagesUpdate((err, chatUpdate) => this.setState({dataUpdate: chatUpdate}));
    }  
    
    onChange(e){
          this.setState({value: e.target.value});

         /*  let input = e.target.value;
          console.log(input);    */
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


    render(){
    
        let printData;
        let updateData;
        let dataH = this.state.dataHistory;
        let dataU = this.state.dataUpdate;
        //console.log(dataH);
        //console.log(dataU);
        
        if (dataH !== undefined){
         printData = dataH.map(data =>{
                return (<p className="messages" key={data.id}>
                            <span className="uName">{data.username}</span>
                            <span  className="textMessages">{data.content}</span>
                        </p>)
            })  
        }

        if (dataU !== undefined){
            updateData = (<p className="messages" >
                                    <span className="uName">{dataU.username}</span>
                                    <span className="textMessages">{dataU.content}</span>
                        </p>)
        }

        return (
                <div className="chatbox">
                    <div className="render-messages">
                        {printData}
                        {updateData}
                    </div>
                    <div className="chat-input-container">
                        <h5>Hello, {this.props.username}</h5>
                        <form className="chat-form" onSubmit = {this.onSubmit}>
                            <input className="chat-input" type="text" placeholder="Enter messages..." value={this.state.value} onChange={this.onChange}/>
                            <button className="send-button">Send</button>
                            <span className="input-label">Maximum 200 words</span>
                            <span className="input-label2">{this.state.counter}/200</span>
                        </form>
                    </div>
                   
                </div>
            )
    }
}

export default Chatbox;