import React, {useReducer} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedPage from './pages/ProtectedPage/ProtectedPage';

import AuthContext from './context/AuthContext';
import ServicesContext from './context/ServicesContext';
import AppReducerDispatchContext from './context/AppReducerDispatchContext';
import initialAppState from './state/initialAppState';
import appReducer from './state/appReducer';


import services from './services/fake'; 

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  //console.log('App -> services:');
  //console.log(services);

  return (
    <AppReducerDispatchContext.Provider value={dispatch}>
    <AuthContext.Provider value={state.auth}>
    <ServicesContext.Provider value={services}>
      <Router>
          <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <ProtectedRoute path="/protected">
                <ProtectedPage />
              </ProtectedRoute>            
              <ProtectedRoute path="/">
                <HomePage />
              </ProtectedRoute>
        </Switch>
      </Router>
    </ServicesContext.Provider>
    </AuthContext.Provider>
    </AppReducerDispatchContext.Provider>
  );
}


export default App;
