/**
  This CodeSandbox has been automatically generated using
  `codesandboxer`. If you're curious how that happened, you can
  check out our docs here: https://github.com/codesandbox/codesandboxer

  If you experience any struggles with this sandbox, please raise an issue
  on github. :)
*/
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from './App';
import LoadScreen from './Components/LoadScreen';
import LoginPage from './Components/LoginComponent';
import SignUp from './Components/SignUp';
import Activity from './Components/Activity';


ReactDOM.render(
  <Routes />,
document.getElementById('root')
);

function Routes()
{
  return (<Router><Switch>
    <Route exact path="/"><App /></Route>
    <Route exact path="/Login"><LoginPage /></Route>
    <Route exact path="/SignUp"><SignUp /></Route>
    <Route exact path="/Activity"><Activity /></Route></Switch></Router>);
}