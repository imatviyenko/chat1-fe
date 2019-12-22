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
import ErrorPage from './pages/ErrorPage/ErrorPage';

// Contexts for accessing global app level objects
import AppContext from './context/AppContext';
import AppReducerDispatchContext from './context/AppReducerDispatchContext';
import ServicesContext from './context/ServicesContext';

// Contexts for accessing slices of the app state
import ContactsContext from './context/ContactsContext';


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
    <AppContext.Provider value={state}>
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
              <Route path="/error">
                <ErrorPage />
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
    </AppContext.Provider>
    </AppReducerDispatchContext.Provider>
  );
}


export default App;
