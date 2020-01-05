import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import constants from '../../constants';
import AppContext from '../../context/AppContext';
import ServicesContext from '../../context/ServicesContext';
import ChatsContext from '../../context/ChatsContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import {ACTION_CHAT_FETCH_ALL} from '../../state/chatsReducer';

import './Chats.css';

const mapFunc = (chat, index) => {
    if (!chat || !chat.displayName || !chat.type) return null;
    
    let className = chat.type === constants.CHAT_TYPE_PRIVATE ? 
        "chat1-chats__chatDispayName chat1-chats__chatDispayName_private"
        :
        "chat1-chats__chatDispayName chat1-chats__chatDispayName_group";

    const displayName = chat.type === constants.CHAT_TYPE_PRIVATE ? 
        `PRIVATE CHAT: ${chat.displayName}`
        :
        `GROUP CHAT: ${chat.displayName}`;

    return (
        <li className={className} key={index}>
            {displayName}
        </li>
    );
}


function Chats() {
    let history = useHistory();

    const dispatch = useContext(AppReducerDispatchContext);
    const services = useContext(ServicesContext);
    const chats = useContext(ChatsContext);
    const chatsList = chats && chats.chatsList;
    console.log(`Chats -> chats: ${JSON.stringify(chats)}`);
    console.log(`Chats -> chatsList: ${JSON.stringify(chatsList)}`);

    // effect for fetching the list of chats for the current user
    const effectFunc1 = () => { 
        const asynFunc = async () => {
          try {
            const result = await services.getChats();
            if (result.status === constants.ERROR_SUCCESS) {
              dispatch({type: ACTION_CHAT_FETCH_ALL, chats: result.chats});
            } else {
              dispatch({type: ACTION_APP_ERROR, message: 'Error fetching chats', result}); // notify the app reducer that there has been an application error
              history.replace({ pathname: '/error'});
              return;
            }
          } catch (e) {
            console.error('Chats -> error in effectFunc1:');
            console.error(e);
          };
    
        }
        asynFunc();
    };
    useEffect(effectFunc1, []); // run once when the component is mounted

    return (
        <div className="chat1-chats">
          <h3>Chats</h3>
          <div className="chat1-chats__content">
            <ul className="chat1-chats__chatsList">
                {Array.isArray(chatsList) && chatsList.map(mapFunc)}
            </ul>
          </div>
        </div>
    );
}

export default Chats;
