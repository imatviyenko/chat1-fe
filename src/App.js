import React, {useReducer} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import AuthContext from './context/AuthContext';
import ContactsContext from './context/ContactsContext';
import ServicesContext from './context/ServicesContext';
import AppReducerDispatchContext from './context/AppReducerDispatchContext';
import initialAppState from './state/initialAppState';
import appReducer from './state/appReducer';


import fakeServices from './services/fake'; 
import prodServices from './services/prod'; 

let services;
if (process.env.NODE_ENV === 'production') {
  services = prodServices;
} else {
  services =  (process.env.REACT_APP_SERVICES_MODE === 'production') ? prodServices : fakeServices;
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  services.setAuthContext(state.auth);

  console.log('App -> state:');
  console.log(state);

  return (
    <AppReducerDispatchContext.Provider value={dispatch}>
    <AuthContext.Provider value={state.auth}>
    <ContactsContext.Provider value={state.contacts}>
    <ServicesContext.Provider value={services}>
      <Router>
          <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register/:code">
                <RegistrationPage />
              </Route>
              <Route path="/register">
                <RegistrationPage />
              </Route>
              <Route path="/confirm/:code">
                <ConfirmationPage />
              </Route>
              <ProtectedRoute path="/profile">
                <ProfilePage />
              </ProtectedRoute>            
              <ProtectedRoute path="/">
                <HomePage />
              </ProtectedRoute>
        </Switch>
      </Router>
    </ServicesContext.Provider>
    </ContactsContext.Provider>
    </AuthContext.Provider>
    </AppReducerDispatchContext.Provider>
  );
}


export default App;
