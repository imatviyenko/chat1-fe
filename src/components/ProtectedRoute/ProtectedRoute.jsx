import React, {useContext}  from 'react';
import AuthContext from '../../context/AuthContext';

import {Route, Redirect} from "react-router-dom";

// https://reacttraining.com/react-router/web/example/auth-workflow
export default function ({children, ...rest}) {
    const authContext = useContext(AuthContext);
    console.log('ProtectedRoute -> authContext:');
    console.log(authContext);

    return (
        <Route
          {...rest}
          render = {({ location }) =>
            authContext && authContext.isAuthenticated ? (
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