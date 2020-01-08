import React from 'react';
import './App.css';
import Login from './Login';
import Chatbox from './Chatbox';

class App extends React.Component {
render(){
    return (
      <div className="App">
              <Login/>
              <Chatbox/>
      </div>
    );
  } 

  /* constructor(props){
    super(props);
    this.state = {
                 status : null,
                };
    this.DataFromLogin = this.DataFromLogin.bind(this);
 
    }

    DataFromLogin = (err, data) => {
      this.setState({status: data})
      console.log(data);
    }



    render(){

        let content;

          

        if (this.state.status === null) {
                content = <Login/>
            } else {
                content = <Chatbox/>
            }

        
        return (<div className = "App">
                   {content}
              </div>
              
        );
      } */
}

export default App;
