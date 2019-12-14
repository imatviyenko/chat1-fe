import React, {useState, useContext, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import './LoginPage.css';

import AuthContext from '../../context/AuthContext';
import ServicesContext from '../../context/ServicesContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_AUTHENTICATION_SUCCESS, ACTION_AUTHENTICATION_FAILURE} from '../../state/appReducer';

import LoginForm from '../../components/LoginForm/LoginForm';

// https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
export default function() {
  const authState = useContext(AuthContext);
  const dispatch = useContext(AppReducerDispatchContext);
  const services = useContext(ServicesContext);

  //console.log('LoginPage -> services:');
  //console.log(services);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  const [username, setUsername] = useState(null); 
  const [password, setPassword] = useState(null); 

  const effectFunc = () => { // effect function cannot be async and should not return Promise!
    const asynFunc = async () => {
      if (!username || !password) return;

      try {
        const authResult = await services.authUser(username, password); // try to authenticate the user on the remote back-end server
        if (authResult.status === 'success') {
          dispatch({type: ACTION_AUTHENTICATION_SUCCESS, token: authResult.tokenAsString}); // notify the app reducer that the user has been successfully authenticated
          history.replace(from); // if auth is succcessfull, return to whatever page we've been redirected from
        } else {
          dispatch({type: ACTION_AUTHENTICATION_FAILURE, status: authResult.status}); // notify the app reducer that the user has been successfully authenticated
        }
      } catch (e) {
        console.error('LoginPage -> error in asyncFunc:');
        console.error(e);
      };
    };
    asynFunc();
  };

  useEffect(effectFunc, [username, password]); // list username and password as the dependency so that EVERY change to its value will invoke the effect function right after the re-render

  /* Asynchronous version of click handler */
  // https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42
  const onHandleLogin = (username, password) => {
    setUsername(username);
    setPassword(password);
  };


  console.log('LoginPage -> authState:');
  console.log(authState);
  const elementAuthFailed = authState && (authState.isAuthenticated === false) && authState.authenticationErrorStatus ?
    (
      <div className="chat1-loginpage__authFailureMessage">
        Authentication failure: {authState.authenticationErrorStatus}
      </div>
    )
    :
    null;

  return (
    <div className="chat1-loginpage">
      <header>
          <h1>Login</h1>
      </header>
      {elementAuthFailed}
      <LoginForm onHandleLogin={onHandleLogin}/>
    </div>
  );
}
