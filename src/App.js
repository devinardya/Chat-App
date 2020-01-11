import React from 'react';
import './App.css';
import Login from './Login';
import Chatbox from './Chatbox';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {status : false, 
                  username: "",
                  counter: 0,
                 
                  }
    this.onPageChange = this.onPageChange.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onChangeCounter = this.onChangeCounter.bind(this);
  }

  onPageChange(status) {
    this.setState({status: status})
  
    this.setState({counter: 0})
  }

  onTextInputChange(value, count) {
    //this.setState({counter: value.length})
    this.setState({username: value});
    this.setState({counter: count});
  }

  onChangeCounter(count){
    this.setState({counter: count})
  }
  
  render(){

    let renderPage;
    //console.log(this.state.status)
    if (!this.state.status){
        renderPage = <Login onSubmit={this.onPageChange} onChange={this.onTextInputChange} counter={this.state.counter} username={this.state.username}/>
    } else {
        renderPage = <Chatbox username={this.state.username} onCloseChat={this.onPageChange}/>
    }

    return (
      <div className="App">
            {renderPage} 
      </div>
    );
  }  
}

export default App;
