import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cookies from 'js-cookie'
import $ from 'jquery';


export default function BasicExample() {
    
  var showLoginPage = false;
  var loading  = true;
  if(Cookies.get('reflections') == null)
  {
      showLoginPage = true;
  }
  
  if(!showLoginPage)
  {
      authenticateCookie(Cookies.get('reflections')).then(
          function(result)
          {
              loading = false;
              if(result.toString().trim() == ("Invalid Credential"))
              {
                  showLoginPage = false;
              }
              else 
              {
                  showLoginPage = true;
              }
          }
      )
      
  }

  while(loading)
  {
    return (<h1> Loading </h1>);
  }

  return(<h1> {showLoginPage}</h1>)

//    if(true)
//    {
    
//      return (
//          <Router>
//          <div>
//              <ul>
//              <li>
//                  <Link to="/">Home</Link>
//              </li>
//              <li>
//                  <Link to="/about">About</Link>
//              </li>
//              <li>
//                  <Link to="/dashboard">Dashboard</Link>
//              </li>
//              </ul>
 
//              <hr />
 
//              {/*
//              A <Switch> looks through all its children <Route>
//              elements and renders the first one whose path
//              matches the current URL. Use a <Switch> any time
//              you have multiple routes, but you want only one
//              of them to render at a time
//              */}
//              <Switch>
//              <Route exact path="/">
//                  <Home />
//              </Route>
//              <Route path="/about">
//                  <About />
//              </Route>
//              <Route path="/dashboard">
//                  <Dashboard />
//              </Route>
//              </Switch>
//          </div>
//          </Router>
//      );
//             }
//     else
//     {
//      return(<h1> Hello World !! </h1>);
//     }
   


}

// You can think of these components as "pages"
// in your app.


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

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

