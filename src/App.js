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
import ChatsContext from './context/ChatsContext';


import initialAppState from './state/initialAppState';
import appReducer from './state/appReducer';

import prodServices from './services/prod'; 
const services = prodServices;

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  services.setAuthContext(state.auth);
  services.watcher.setDispatch(dispatch);

  console.log('App -> state:');
  console.log(state);

  return (
    <AppContext.Provider value={state}>
    <AppReducerDispatchContext.Provider value={dispatch}>
    <ServicesContext.Provider value={services}>
    <ContactsContext.Provider value={state.contacts}>
    <ChatsContext.Provider value={state.chats}>
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
    </ChatsContext.Provider>
    </ContactsContext.Provider>
    </ServicesContext.Provider>
    </AppReducerDispatchContext.Provider>
    </AppContext.Provider>
    
  );
}


export default App;
