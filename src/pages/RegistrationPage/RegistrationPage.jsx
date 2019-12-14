import React, {useState, useContext, useEffect} from 'react';

import './RegistrationPage.css';

import constants from '../../constants';
import AuthContext from '../../context/AuthContext';
import ServicesContext from '../../context/ServicesContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_AUTHENTICATION_LOGOUT} from '../../state/authReducer';

import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default function RegistrationPage() {
  const authState = useContext(AuthContext);
  const dispatch = useContext(AppReducerDispatchContext);
  const services = useContext(ServicesContext);

  //console.log('RegistrationPage -> services:');
  //console.log(services);

  const [userDisplayName, setUserDisplayName] = useState(null); 
  const [userEmail, setUserEmail] = useState(null); 
  const [password, setPassword] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const effectFunc = () => { // effect function cannot be async and should not return Promise!
    const asynFunc = async () => {
      if (!userDisplayName || !userEmail || !password) return;

      try {
        const result = await services.registerUser(userDisplayName, userEmail, password); // try to register the user on the remote back-end server
        if (result.status === constants.ERROR_SUCCESS) {
          setRegistrationStatus(constants.ERROR_SUCCESS);
        } else {
          setRegistrationStatus(result.status);
        }
      } catch (e) {
        console.error('RegisterPage -> error in asyncFunc:');
        console.error(e);
      };
    };
    asynFunc();
  };

  useEffect(effectFunc, [userDisplayName, userEmail, password]); 

  /* Asynchronous version of click handler */
  // https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42
  const onHandleRegister = (userDisplayName, userEmail, password) => {
    setUserDisplayName(userDisplayName);
    setUserEmail(userEmail);
    setPassword(password);
  };


  console.log('RegisterPage -> registrationStatus: ', registrationStatus);

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
        registrationStatus !== constants.ERROR_SUCCESS && (<RegistrationForm onHandleRegister={onHandleRegister}/>)
      }
    </div>
  );
}
