import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import Cookies from 'js-cookie'
import $ from 'jquery';
import LoadScreen from './Components/LoadScreen';
import LoginPage from './Components/LoginComponent';
import SignUp from './Components/SignUp';


/*
*    Main class : Called during all URL calls
*    Function : Routing and authenticaion checker
*/

export default class App extends Component{
    constructor(props)
    {
      super(props);
      this.state = {authentication : "pending"};      
    }

    componentDidMount()
    {
        isAuthenticatedUser().then((result) =>
          {
            if(result == false)
            {
              this.setState({authentication: "failed"});
             
            }
            else if(result == true)
            {
              this.setState({authentication: "Passed"});
            }
          }
        );
    }

    render(){
      if(this.state.authentication == "pending")
      {
        return (<LoadScreen />);
      }
      else if(this.state.authentication == "failed")
      {
        return (<Redirect to = "/Login" />);
      }
        
        
      

    }  
}

/*
* Check is given user is an authentic user
*/
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