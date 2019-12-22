import React, {useContext}  from 'react';
import AppContext from '../../context/AppContext';

import {Route, Redirect} from "react-router-dom";

// https://reacttraining.com/react-router/web/example/auth-workflow
export default function ({children, ...rest}) {
    const auth = useContext(AppContext).auth;
    console.log('ProtectedRoute -> auth:');
    console.log(auth);

    return (
        <Route
          {...rest}
          render = {({ location }) =>
            auth && auth.isAuthenticated ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}