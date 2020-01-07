import React, {useContext, useState, useEffect} from 'react';

import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_AUTHENTICATION_LOGOUT} from '../../state/authReducer';
import ServicesContext from '../../context/ServicesContext';

export default function LogOutButton() {
    const dispatch = useContext(AppReducerDispatchContext);
    const services = useContext(ServicesContext);
    const [logoutButtonClickedFlag, setLogoutButtonClickedFlag] = useState(false);

    const effectFunc = () => { 
        const asynFunc = async () => {
            if (!logoutButtonClickedFlag) return;
            await services.watcher.disconnect(); // close  WebSocket connection to the back-end server
            dispatch({type: ACTION_AUTHENTICATION_LOGOUT});
        };
        asynFunc();
    };
    
    useEffect(effectFunc, [logoutButtonClickedFlag]); 

    
    const onClickHandler = () => {
        setLogoutButtonClickedFlag(true);
    }

    return (
        <a href="#0" className="chat1-topBar__buttonLogout" onClick={onClickHandler}>Log out</a>
    )
}