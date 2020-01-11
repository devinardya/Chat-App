import React from 'react';
import { MdDone } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdPerson } from "react-icons/md";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {   
            valid: false,
            
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
      }
    
    onChange(e){

         this.props.onChange(e.target.value, e.target.value.length);

    } 

    notSubmit(e){
        e.preventDefault();
    }


    onSubmit(e){
        e.preventDefault();
        this.props.onSubmit(true)
    }

    render(){

        let warncolor;
        let warncolor2;
        let newcolor;
        let getSubmit;
        let validateIcon1;
        let validateIcon2;


        // validate input box for errors =========================================
        let regex = /[!"#€%&\/()=?+^¨*':;.,$°§@\[\]{}]{1,12}/g
        let notValidInput = regex.test(this.props.username);

        if (this.props.counter === 0) {
            warncolor = {color: "red"};
            warncolor2 = {color: "red"};
            newcolor = {color: "red"};
            getSubmit = this.notSubmit;
            validateIcon1 = <MdClose className ="icons" size="10px" color="red" />
            validateIcon2 = <MdClose className ="icons" size="10px" color="red" />
        } else if (this.props.counter > 12 ) {
            warncolor = {color: "red"};
            warncolor2 = {color: "green"};
            newcolor = {color: "red"};
            getSubmit = this.notSubmit;
            validateIcon1 = <MdClose className ="icons" size="10px" color="red" />
            validateIcon2 = <MdClose className ="icons" size="10px" color="green" />
            //console.log("this is false")
        } else if (notValidInput){
            warncolor = {color: "green"};
            warncolor2 = {color: "red"};
            newcolor = {color: "red"};
            getSubmit = this.notSubmit;
            validateIcon1 = <MdClose className ="icons" size="10px" color="green" />
            validateIcon2 = <MdClose className ="icons" size="10px" color="red" />
            //console.log("notvalidinput")
        } else {
            warncolor = {color: "green"};
            warncolor2 = {color: "green"};
            newcolor = {color: "#252525"};
            getSubmit = this.onSubmit;
            validateIcon1 = <MdDone className ="icons" size="10px" color="green" />
            validateIcon2 = <MdDone className ="icons" size="10px" color="green" />
            //console.log("this is trueeee")
        }

        // create DOM elements to render the login page =========================================

        let newPage;

        newPage = (<form className = "form" onSubmit = {getSubmit}>
                        <span className="login-icon"><MdPerson className ="icons" size="60px" color="rgb(184, 3, 139" /></span> 
                        <h3>Log in</h3>
                        <h5>Please log in to join the chat room!</h5>
                        <input className="input-box" type="text" style={newcolor} placeholder="Username" username={this.props.value} onChange={this.onChange}/>
                        <label className="warning" style={warncolor}>{validateIcon1}Username have to be between 1 to 12 characters!</label>
                        <label className="warning" style={warncolor2}>{validateIcon2}Username can only contains uppercase, lowercase, "-", "_" and numbers.</label>
                        <button className="login-button">Log in</button>
                    </form>
                )
     

        return  (<div className = "login-box">
                    {newPage}
                </div>)   
    }
}

export default Login;