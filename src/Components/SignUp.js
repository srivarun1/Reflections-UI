import { Component } from "react";
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class SignUp extends Component
{
    constructor(props)
    {
        super(props);
    }
    render(){
        return(<div> <Quotes /><div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}><SignUpBox /></div> </div>);
    }

}


function Quotes()
{
    return(<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '5vh'}}><h4 style={{color : '#629af5'}}>Nothing beautiful is without struggle.  ― Plato, The Republic </h4></div>);
}

function SignUpBox()
{
    const formStyle = {
        width: "380px",
       height: "350px",
       padding: "15px",
       backgroundColor: "white",
       boxShadow: "1px 3px 10px #87cdff",
      };


    return ( <div style={formStyle}>
        <TextBox value = "username"/> <br /> <br />
         <TextBox value = "password" />
        <br /> <br />
        <TextBox value = "Reenter password" />
        <br /> <br />
        <Button value = "Sign Up" />
      </div>);
}

export function TextBox(props)
{
	const boxStyle = {
		fontSize: "17px",
    	padding: "14px 16px",
    	width: "330px",
        marginTop : "20px",
        marginLeft : "5px", 
	};

     return (
        <input style ={boxStyle}
            type="text" placeholder = {props.value}
         id = {props.value}/>
     );
 }


 export function Button(props)
 {
 	const buttonStyle = {
 		backgroundColor: "#afdbfa",
    border: "none",
    borderRadius: "6px",
    fontSize: "20px",
    lineHeight: "48px",
    padding: "0 16px",
    width: "332px",
    marginLeft : "18px",
 	};
 	return (<button style = {buttonStyle} onClick={validate}>{props.value}</button>);
 }

 export function validate()
 {
    validateAndSubmitForSignUp().then(
        function(result) {
            if(result.toString().trim() == ("true"))
            {
                window.location.href = "/Login";
            }
            else{
                alert("username taken up !");
            }

        }
    )
 }

 export function validateAndSubmitForSignUp() {

    if(document.getElementById("password").value != document.getElementById("Reenter password").value)
    {
        alert("Password reentry does not match");
        return false;
    }

    return new Promise(function(resolve,reject){ 
         $.ajax({

        url : 'http://localhost:8080/Access/SignUp',
        type : 'POST',
        async: false,
        data : {
            'username' : document.getElementById("username").value,
            'password' :  document.getElementById("password").value,
        },
        success: function(response) 
        {
            resolve(response)
        },
        error: function(e)
        {
            reject(false);
        }
        });
    });
}