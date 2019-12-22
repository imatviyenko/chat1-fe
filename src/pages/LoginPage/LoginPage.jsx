import React, {useState, useContext, useEffect} from 'react';
import {useHistory, useLocation, Link} from 'react-router-dom';

import './LoginPage.css';

import constants from '../../constants';
import AppContext from '../../context/AppContext';
import ServicesContext from '../../context/ServicesContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import {ACTION_AUTHENTICATION_SUCCESS, ACTION_AUTHENTICATION_FAILURE} from '../../state/authReducer';
import {ACTION_PROFILE_FETCH} from '../../state/profileReducer';

import LoginForm from '../../components/LoginForm/LoginForm';

// https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
export default function LoginPage() {
  const auth = useContext(AppContext).auth;
  const dispatch = useContext(AppReducerDispatchContext);
  const services = useContext(ServicesContext);

  //console.log('LoginPage -> services:');
  //console.log(services);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };
  
  const [userEmail, setUserEmail] = useState(null); 
  const [password, setPassword] = useState(null); 

  const effectFunc = () => { // effect function cannot be async and should not return Promise!
    const asynFunc = async () => {
      if (!userEmail || !password) return;

      try {
        const authResult = await services.authUser(userEmail, password); // try to authenticate the user on the remote back-end server
        if (authResult.status === constants.ERROR_SUCCESS) {
          dispatch({type: ACTION_AUTHENTICATION_SUCCESS, token: authResult.token}); // notify the app reducer that the user has been successfully authenticated

          // get the user profile from the server
          const result = await services.getProfile();
          if (result.status === constants.ERROR_SUCCESS) {
            dispatch({type: ACTION_PROFILE_FETCH, profile: result.profile}); // save profile data in the app state by dispatching an action
          } else {
            dispatch({type: ACTION_APP_ERROR, message: 'Error fetching user profile', result}); // notify the app reducer that there has been an application error
            history.replace({ pathname: '/error'});
            return;
          };

          history.replace(from); // if auth is succcessfull, return to whatever page we've been redirected from
        } else {
          dispatch({type: ACTION_AUTHENTICATION_FAILURE, status: authResult.status}); // notify the app reducer that authentication failed
        }
      } catch (e) {
        console.error('LoginPage -> error in asyncFunc:');
        console.error(e);
      };
    };
    asynFunc();
  };

  useEffect(effectFunc, [userEmail, password]); // list username and password as the dependency so that EVERY change to its value will invoke the effect function right after the re-render

  /* Asynchronous version of click handler */
  // https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42
  const onHandleLogin = (userEmail, password) => {
    setUserEmail(userEmail);
    setPassword(password);
  };


  console.log('LoginPage -> auth:');
  console.log(auth);
  const elementAuthFailed = auth && (auth.isAuthenticated === false) && auth.authenticationErrorStatus ?
    (
      <div className="chat1-loginPage__authFailureMessage">
        Authentication failure: {auth.authenticationErrorStatus}
      </div>
    )
    :
    null;

  return (
    <div className="chat1-loginPage">
      <header>
          <h1>Enter your email and password to login</h1>
      </header>
      {elementAuthFailed}
      <LoginForm onHandleLogin={onHandleLogin}/>
      <div className="chat1-loginPage__registerPageLinkSection">
        <div>
            New users can register here
        </div>
        <div className="chat1-loginPage__registerPageLink">
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
