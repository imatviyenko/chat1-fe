import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import constants from '../../constants';
import AppContext from '../../context/AppContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import ServicesContext from '../../context/ServicesContext';
import ChatsContext from '../../context/ChatsContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_CHAT_UPDATED} from '../../state/chatsReducer';


import ChatProperties from './ChatProperties';
import ChatMessages from './ChatMessages';

import './CurrentChat.css';

function CurrentChat() {
    let history = useHistory();
    const dispatch = useContext(AppReducerDispatchContext);
    const services = useContext(ServicesContext);
    const [updateBackendFlippingFlag, setUpdateBackendFlippingFlag] = useState(null); // three state flag, can be either null, true or false
    const chats = useContext(ChatsContext);
    const chatsList = chats && chats.chatsList;
    let currentChat = Array.isArray(chatsList) && chatsList.find( c => c.isSelected);
    console.log(`CurrentChat -> chats: ${JSON.stringify(chats)}`);
    console.log(`CurrentChat -> chatsList: ${JSON.stringify(chatsList)}`);
    console.log(`CurrentChat -> currentChat: ${JSON.stringify(currentChat)}`);

    const effectFunc = () => { 
        const asynFunc = async () => {
            console.log(`CurrentChat.effect ->  updateBackendFlippingFlag: ${updateBackendFlippingFlag}`);
            console.log(`CurrentChat.effect ->  currentChat: ${JSON.stringify(currentChat)}`);
            if (updateBackendFlippingFlag === null || !currentChat) return;
            
            try {
                const result = await services.updateChat(currentChat);
                if (result.status === constants.ERROR_SUCCESS) {
                  dispatch({type: ACTION_CHAT_UPDATED, chat: result.chat});
                } else {
                  dispatch({type: ACTION_APP_ERROR, message: 'Error updating chat', result}); // notify the app reducer that there has been an application error
                  history.replace({ pathname: '/error'});
                  return;
                }
            } catch (e) {
                console.error('CurrentChat -> error in effectFunc:');
                console.error(e);
            };
        };
        asynFunc();
      };
    
    useEffect(effectFunc, [updateBackendFlippingFlag]); // fire effect on updateBackendFlippingFlag transitions true->false and false->true, ignore null value
        

    const onUpdateChatName = (updatedChatName) => {
        console.log(`CurrentChat.onUpdateChatName -> updatedChatName: ${updatedChatName}`);
        currentChat = {
            ...currentChat,
            displayName: updatedChatName
        };
        //setUpdateBackendFlippingFlag(!updateBackendFlippingFlag);
    };

    const onUpdateChatUsers = (updatedChatUsers) => {
        console.log(`CurrentChat.onUpdateChatUsers -> updatedChatUsers: ${JSON.stringify(updatedChatUsers)}`);

        currentChat = {
            ...currentChat,
            users: [...updatedChatUsers]
        };
        //setUpdateBackendFlippingFlag(!updateBackendFlippingFlag);
    };

    return (
        <div className="chat1-currentChat">
            <div className="chat1-currentChat__row1">
                <ChatProperties chat={currentChat} onUpdateChatName={onUpdateChatName} onUpdateChatUsers={onUpdateChatUsers}/>
            </div>
            <div className="chat1-currentChat__row2">
                <ChatMessages chat={currentChat}/>
            </div>
        </div>
    );
}

export default CurrentChat;
