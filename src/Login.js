import React from 'react';
//import Chatbox from './Chatbox';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
            valid: true,
            //counter: 0,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
      }
    
    onChange(e){
          
         //this.setState({counter: e.target.value.length})
         this.props.onChange(e.target.value, e.target.value.length);
         
         //this.props.onChange(e.target.value.length)  
          //let input = e.target.value;
          //console.log(input);   
    } 


    onSubmit(e){
        e.preventDefault();
       // this.setState({valid: true});

        //let status = this.state.valid;
        //let users = this.state.username;

        this.props.onSubmit(this.state.valid)

    }

    render(){

    /*     if (this.state.value){
            console.log("this is correct")
        } else {
            console.log("this is wrong");
        } */

        let namecolor;
        if (this.props.counter <= 12){
            namecolor = "grey";
        } else {
            namecolor = "red";
        }

        let newPage;
        let warning;
        if(this.state.valid){
            
                 newPage = (<form className = "form" onSubmit = {this.onSubmit}>
                        <h3>Log in</h3>
                        <h5>Please log in to join the chat room!</h5>
                        <input className="input-box" type="text" placeholder="Username" username={this.props.value} onChange={this.onChange}/>
                        <label className="username">Username can not be longer than 12 character!</label>
                        <span style={{color: namecolor}} className="text-counter">{this.props.counter}/12</span>
                        {warning}
                        <button className="login-button">Log in</button>
                                
                        </form>
                        )
            }

        return  (<div className = "login-box">
                    {newPage}
                </div>)   
    }
}

export default Login;