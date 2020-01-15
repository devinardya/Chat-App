import React from 'react';
import './App.css';
import Login from './Login';
import Chatbox from './Chatbox';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {status : false, 
                  username: "",              
                  }
    this.onPageChange = this.onPageChange.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
  }

  onPageChange(status, value) {
    this.setState({status: status})
    this.setState({username: value});
  }

  onTextInputChange(value) {
    //this.setState({counter: value.length})
    this.setState({username: value});
    
  }
  
  render(){

    let renderPage;
    //console.log(this.state.status)
    if (!this.state.status){
        renderPage = <Login onSubmit={this.onPageChange} onChange={this.onTextInputChange} username={this.state.username}/>
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
