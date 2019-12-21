import React, {useState, useContext, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import './ConfirmationPage.css';

import constants from '../../constants';
import ServicesContext from '../../context/ServicesContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_AUTHENTICATION_SUCCESS} from '../../state/authReducer';



export default function RegistrationPage() {
  const dispatch = useContext(AppReducerDispatchContext);
  const services = useContext(ServicesContext);

  let history = useHistory();
  const {code} = useParams();
  console.log('ConfirmationPage -> code: ', code);

  const [userEmailFromCode, setUserEmailFromCode] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState(null); 
  const [password, setPassword] = useState(null);
  const [confirmationStatus, setConfirmationStatus] = useState(null);

  const effectFunc = () => { // effect function cannot be async and should not return Promise!
    const asynFunc = async () => {
      // Try to complete user registration by posting the secret code from the URL to the back-end server
      if (code) {
        try {
          const result = await services.confirmEmailByCode(code);
          if (result.status === constants.ERROR_SUCCESS && result.token) { // if email confirmation was successfull then login the user
            dispatch({type: ACTION_AUTHENTICATION_SUCCESS, token: result.token}); // notify the app reducer that the user has been successfully authenticated
            history.replace({ pathname: "/" }); // if we got a token from services.registerUser, log in the user and redirect to the Home page
          } else {
            setConfirmationStatus(result.status);
          }
        } catch (e) {
          console.error('ConfirmationPage -> error in asyncFunc:');
          console.error(e);
          throw(e);
        };
      }

    };
    asynFunc();
  };

  useEffect(effectFunc, []); 

  console.log('ConfirmationPage -> confirmationStatus: ', confirmationStatus);

  let elementConfirmationResult = null;
  if (confirmationStatus) {
    elementConfirmationResult = (
        <div className="chat1-confirmationPage__confirmationResult_failure">
          {`Error confirming email address: ${confirmationStatus}`}
          <br/>
          Please try to refresh the page to try again.
        </div>
      );
  }

  return (
    <div className="chat1-confirmationPage">
      <header>
          <h1>Confirming email address ...</h1>
      </header>
      {elementConfirmationResult}
    </div>
  );
}
