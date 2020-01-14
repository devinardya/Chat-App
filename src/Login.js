import React from 'react';
import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { AiFillWechat } from "react-icons/ai";

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
        let regex = /[!"#€%&\/()=?+^¨*':;.,$°§@\[\]{}]/g
        let notValidInput = regex.test(this.props.username);

        if (this.props.counter === 0) {
            warncolor = {color: "red"};
            warncolor2 = {color: "red"};
            newcolor = {color: "red"};
            getSubmit = this.notSubmit;
            validateIcon1 = <MdCancel className ="icons" size="12px" color="red" />
            validateIcon2 = <MdCancel className ="icons" size="12px" color="red" />
        } else if (this.props.counter > 12 ) {
            warncolor = {color: "red"};
            warncolor2 = {color: "green"};
            newcolor = {color: "red"};
            getSubmit = this.notSubmit;
            validateIcon1 = <MdCancel className ="icons" size="12px" color="red" />
            validateIcon2 = <MdCancel className ="icons" size="12px" color="green" />
            //console.log("this is false")
        } else if (notValidInput){
            warncolor = {color: "green"};
            warncolor2 = {color: "red"};
            newcolor = {color: "red"};
            getSubmit = this.notSubmit;
            validateIcon1 = <MdCancel className ="icons" size="12px" color="green" />
            validateIcon2 = <MdCancel className ="icons" size="12px" color="red" />
            //console.log("notvalidinput")
        } else {
            warncolor = {color: "green"};
            warncolor2 = {color: "green"};
            newcolor = {color: "#252525"};
            getSubmit = this.onSubmit;
            validateIcon1 = <MdCheckCircle className ="icons" size="12px" color="green" />
            validateIcon2 = <MdCheckCircle className ="icons" size="12px" color="green" />
            //console.log("this is trueeee")
        }

        // create DOM elements to render the login page =========================================

        let newPage;

        newPage = (<form className = "form" onSubmit = {getSubmit}>
                        <div className="form-top">
                            <span className="login-icon"><AiFillWechat className ="icons" size="60px" color="white" /></span> 
                            <h3>Welcome!</h3>
                            <h5>Please log in to join the chat room!</h5>
                        </div>
                        <div className="form-bottom">
                            <input className="input-box" type="text" style={newcolor} placeholder="Username" username={this.props.value} onChange={this.onChange}/>
                            <label className="warning" style={warncolor}>{validateIcon1}Username have to be between 1 to 12 characters!</label>
                            <label className="warning" style={warncolor2}>{validateIcon2}Username can only contains uppercase, lowercase, "-", "_", numbers and empty space.</label>
                        </div>
                        <button className="login-button">Log in</button>
                    </form>
                )
     

        return  (<div className = "login-box">
                    {newPage}
                </div>)   
    }
}

export default Login;