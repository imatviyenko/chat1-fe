import React, {useState, useContext, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import './RegistrationPage.css';

import constants from '../../constants';


import ServicesContext from '../../context/ServicesContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import {ACTION_AUTHENTICATION_SUCCESS} from '../../state/authReducer';
import {ACTION_PROFILE_FETCH} from '../../state/profileReducer';


import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default function RegistrationPage() {
  const dispatch = useContext(AppReducerDispatchContext);
  const services = useContext(ServicesContext);

  let history = useHistory();
  const {code} = useParams();
  console.log('RegistrationPage -> code: ', code);

  //console.log('RegistrationPage -> services:');
  //console.log(services);

  const [userEmailFromCode, setUserEmailFromCode] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState(null); 
  const [password, setPassword] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const effectFunc = () => { // effect function cannot be async and should not return Promise!
    const asynFunc = async () => {
      if (!userDisplayName || !userEmail || !password) {

        // Try to decode the email address which must be stored in encrypted form the code passed via the URL
        if (code) {
          try {
            const result = await services.getEmailFromCode(code);
            if (result.status === constants.ERROR_SUCCESS && result.email) {
              setUserEmailFromCode(result.email);
            } else {
              setRegistrationStatus(result.status);
            }
          } catch (e) {
            console.error('RegistrationPage -> error in asyncFunc:');
            console.error(e);
            throw(e);
          };
        }
        return;
      }

      // If the current URL contains code param with encrypted email address, then it must be a new user which came to the site via a registration invitaion link sent by another already registered user.
      // In this case we DO NOT need to confirm his email and if services.registerUser returns succcess status and a token, then the user must be logged in immediatelly
      try {
        const result = await services.registerUser(userEmail, userDisplayName, password, code); // try to register the user on the remote back-end server and use the encrypted code from the URL
        if (result.status === constants.ERROR_SUCCESS && result.token && code) { // no need to confirm email address and we can log in the user to the system
          dispatch({type: ACTION_AUTHENTICATION_SUCCESS, token: result.token}); // notify the app reducer that the user has been successfully authenticated

          // get the user profile from the server
          const result2 = await services.getProfile();
          if (result2.status === constants.ERROR_SUCCESS) {
            dispatch({type: ACTION_PROFILE_FETCH, profile: result2.profile}); // save profile data in the app state by dispatching an action
          } else {
            dispatch({type: ACTION_APP_ERROR, message: 'Error fetching user profile', result2}); // notify the app reducer that there has been an application error
            history.replace({ pathname: '/error'});
            return;
          };


          // establish authenticated WebSocket connection to the back-end server
          const webSocketResult = await services.watcher.connect(result.token);
          if (webSocketResult.status !== constants.ERROR_SUCCESS) {
            dispatch({type: ACTION_APP_ERROR, message: 'Error establishing WebSocket connection to the back-end server', result}); // notify the app reducer that there has been an application error
            history.replace({ pathname: '/error'});
            return;
          };

          history.replace({ pathname: "/" }); // if we got a token from services.registerUser, log in the user and redirect to the Home page
        } else {
          setRegistrationStatus(result.status);
        }
      } catch (e) {
        console.error('RegistrationPage -> error in asyncFunc:');
        console.error(e);
      };
    };
    asynFunc();
  };

  useEffect(effectFunc, [code, userDisplayName, userEmail, password]); 

  /* Asynchronous version of click handler */
  // https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42
  const onHandleRegister = (userDisplayName, userEmail, password) => {
    setUserDisplayName(userDisplayName);
    setUserEmail(userEmail);
    setPassword(password);
  };


  console.log('RegistrationPage -> registrationStatus: ', registrationStatus);

  let elementRegistrationResult = null;
  if (registrationStatus) {
    elementRegistrationResult = registrationStatus === constants.ERROR_SUCCESS ?
      (
        <div className="chat1-registrationPage__registrationResult">
          <p>
            {`Confirmation email sent to address ${userEmail}`}
            <br/>
            Please check your Inbox and open the link in the confirmation email to complete registration.
          </p>
        </div>
      )
      :
      (
        <div className="chat1-registrationPage__registrationResult_failure">
          {`Error sending confirmation email to address ${userEmail}: ${registrationStatus}`}
          <br/>
          Please try to register again later.
        </div>
      );
  }

  return (
    <div className="chat1-registrationPage">
      <header>
          <h1>Register new user</h1>
      </header>
      {elementRegistrationResult}
      {
        registrationStatus !== constants.ERROR_SUCCESS && (<RegistrationForm onHandleRegister={onHandleRegister} userEmailFromCode={userEmailFromCode || ''}/>)
      }
    </div>
  );
}
