import { Component } from "react";
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";

  import Cookies from 'js-cookie'
export default class LoginComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {login : "pending"}; 
    }
    componentDidMount()
    {
        isAuthenticatedUser().then((result) =>
          {
            if(result == false)
            {
              this.setState({login: "failed"});
             
            }
            else if(result == true)
            {
              this.setState({login: "Passed"});
            }
          }
        );
    }

    render(){
        if(this.state.login == "Passed")
        {
            return (<Redirect to = "/Activity" />);
        }
        else
        {
            return(<div> <Quotes /><div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}><LoginBox /></div> </div>);
        }
    }

}


function Quotes()
{
    return(<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '5vh'}}><h4 style={{color : '#629af5'}}>Nothing beautiful is without struggle.  ― Plato, The Republic </h4></div>);
}

function LoginBox()
{
    const formStyle = {
        width: "380px",
       height: "280px",
       padding: "15px",
       backgroundColor: "white",
       boxShadow: "1px 3px 10px #87cdff",
      };


    return ( <div style={formStyle}>
        <TextBox value = "username"/> <br /> <br />
         <TextBox value = "password" />
        <br /> <br />
        <Button value = "Login" />
        <br />
        <SignUpLink />
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
 	return (<button style = {buttonStyle} onClick={authenticate}>{props.value}</button>);
 }

 export function authenticate() {
    $.ajax({

   url : 'http://localhost:8080/Access/SignIn',
   type : 'POST',
   async: false,
   data : {
       'username' : document.getElementById("username").value,
       'password' :  document.getElementById("password").value,
   },
   success: function(response) 
 {
       if(response != "Invalid Credential")
       {
            Cookies.set('reflections',response);
            window.location.href = "/Activity";
       }
       else{
           alert("Kindly enter valid credentials !")
       }
  },
 error: function(e)
 {
   console.log("ERROR: ", e);
  }
});
}

export function SignUpLink()
{
   return (<Link to="/SignUp">Click to SignUp</Link>);
}

function isAuthenticatedUser()
{
      return new Promise(function(resolve,reject){
        var showLoginPage = false;
        if(Cookies.get('reflections') == null)
        {
            resolve(false);
        }
        if(!showLoginPage)
        {
            authenticateCookie(Cookies.get('reflections')).then(
                function(result)
                {
                    if(result.toString().trim() == ("Invalid Credential"))
                    {
                          resolve(false);
                    }
                    else 
                    {
                        resolve(true);
                    }
                }
            )    
        }
      });
}

function authenticateCookie(cookieId)
{
    return new Promise(function(resolve,reject){
        $.ajax({
            url : 'http://localhost:8080/Access/ValidateCookie',
            type : 'POST',
            async: false,
            data : {
                'cookie' : cookieId,
            },
            success: function(response) 
            {
                resolve(response);
            },
        error: function(e)
        {
            reject(e);
        }
        });
    });
}