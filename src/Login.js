import React from 'react';
import ReactDOM from 'react-dom';


import $ from 'jquery';
 
export function TextBox(props)
{
	const boxStyle = {
		fontSize: "17px",
    	padding: "14px 16px",
    	width: "330px",
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
 		backgroundColor: "#ed8a2d",
    border: "none",
    borderRadius: "6px",
    fontSize: "20px",
    lineHeight: "48px",
    padding: "0 16px",
    width: "332px",
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
            alert(response);
       },
      error: function(e)
      {
        console.log("ERROR: ", e);
       }
	});
}


export function Login() {
 const formStyle = {
   width: "300px",
  height: "500px",
  padding: "15px",
  backgroundColor: "#ffffcc",
  boxShadow: "1px 3px 10px #ff6600",
 };
 
 
 const wordStyle = {
 	color: "red",
 };
 
 
  const element = (
    <div style={formStyle}>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
      <TextBox value = "username"/> <br /> <br />
       <TextBox value = "password" />
      <br /> <br />
      <Button value = "Submit" />
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

export function BackgrounPage(){
  const backgroundStyle = {
    width : "100%",
    height : "100%",
    color : "blue",
  };

  return (<div style = {backgroundStyle}></div>)
}
