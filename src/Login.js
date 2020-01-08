import React from 'react';
import Chatbox from './Chatbox';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: "", 
            valid: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
      }
    
    onChange(e){
          this.setState({username: e.target.value});
          //let input = e.target.value;
          //console.log(input);   
    } 

    onSubmit(e){
        e.preventDefault();
        let status = this.setState({valid: true});
        let users = this.state.value;
        
    }

    render(){

        let uname = this.state.username;
        let newPage;
        if(this.state.valid){
            newPage = <Chatbox username={uname}/>;
            console.log(uname);
        } 

        return (
            <div className = "login-box">
                <form className = "form" onSubmit = {this.onSubmit}>
                    <label>Login to start chat box!</label>
                    <input className="input-box" type="text" username={this.state.value} onChange={this.onChange}/>
                    <button className="login-button">Log in</button>
                </form>
                {newPage}
               
            </div>
        )
    }
}

export default Login;