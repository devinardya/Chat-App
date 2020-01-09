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
            namecolor = "white";
        } else {
            namecolor = "red";
        }

        let newPage;
        let warning;
        if(this.state.valid){
            
            newPage = (<form className = "form" onSubmit = {this.onSubmit}>
                                <h3>Login to start chat box!</h3>
                                <label>Username:</label>
                                <input className="input-box" type="text" username={this.props.value} onChange={this.onChange}/>
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