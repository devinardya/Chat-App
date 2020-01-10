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
        //DataMessagesHistory((err, chatHistory) => this.setState({dataHistory: chatHistory}));
        //DataMessagesUpdate((err, chatUpdate) => this.setState({dataUpdate: chatUpdate}));
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
      }

   componentDidMount(){
         DataMessagesHistory((err, chatHistory) => this.setState({dataHistory: chatHistory}));
       /*   DataMessagesUpdate((chatLastUpdate) => {
                this.setState({dataLastUpdate: chatLastUpdate});
        
                this.setState(prevState => ({
                    dataHistory: [...prevState.dataHistory, this.state.dataLastUpdate]
                  }))

                });     */

        DataMessagesUpdate((err, neWMessage) => {
                    let copyMessage = [...this.state.dataHistory];
                    copyMessage.splice(0, 1);
    
                    this.setState({ dataHistory: [...copyMessage, neWMessage] }); // to push new message to history
                  })
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
        //let updateData;
        let dataH = this.state.dataHistory;
        //let dataU = this.state.dataUpdate;
        let dataHis = [];
       

        //console.log(dataH);
        //console.log(dataU);
        let classNameMessage;
        let userCurrent = this.props.username;
        //console.log(userCurrent);

      let count = this.state.value.length;
      let newcolor;
      let getSubmit;

      if (count > 200){
            newcolor = {color: "red"}
      } else {
          newcolor = {color: "#252525"}
          getSubmit = this.onSubmit;
      }

    // to render data history from the server
    if (dataH !== undefined){

        dataH.map(data =>{
            return dataHis.push(data)
        })
        console.log(dataHis)
    }

    printData = dataHis.map(data =>{
        checkMessages(data.username);
        return (<div className={classNameMessage} key={data.id}>
                    <p className="uName">{data.username}</p>
                    <p  className="textMessages">{data.content}</p>
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
                    <div className="render-messages">
                        {printData}
                        {/*{updateData}*/}
                    </div>
                    <div className="chat-input-container">
                        <h5>Hello, {this.props.username}</h5>
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