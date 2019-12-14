import React, {useContext} from 'react';

import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_AUTHENTICATION_LOGOUT} from '../../state/authReducer';

export default function LogOutButton() {
    const dispatch = useContext(AppReducerDispatchContext);
    
    const onClickHandler = () => {
        dispatch({type: ACTION_AUTHENTICATION_LOGOUT});
    }

    return (
        <a href={null} className="chat1-topBar__buttonLogout" onClick={onClickHandler}>Log out</a>
    )
}