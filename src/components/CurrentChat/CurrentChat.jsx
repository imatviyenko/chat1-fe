import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import constants from '../../constants';
import AppContext from '../../context/AppContext';
import ServicesContext from '../../context/ServicesContext';
import ChatsContext from '../../context/ChatsContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_CHAT_UPDATE_NAME} from '../../state/chatsReducer';


import ChatProperties from './ChatProperties';
import ChatMessages from './ChatMessages';

import './CurrentChat.css';

function CurrentChat() {
    let history = useHistory();

    const dispatch = useContext(AppReducerDispatchContext);
    const services = useContext(ServicesContext);
    const chats = useContext(ChatsContext);
    const chatsList = chats && chats.chatsList;
    console.log(`CurrentChat -> chats: ${JSON.stringify(chats)}`);
    console.log(`CurrentChat -> chatsList: ${JSON.stringify(chatsList)}`);

    const currentChat = Array.isArray(chatsList) && chatsList.find( c => c.isSelected);
    console.log(`CurrentChat -> currentChat: ${JSON.stringify(currentChat)}`);

    const onUpdateChatName = (updatedChatName) => {
        dispatch({type: ACTION_CHAT_UPDATE_NAME, chatGuid: currentChat, updatedChatName});
    };

    return (
        <div className="chat1-currentChat">
            <div className="chat1-currentChat__row1">
                <ChatProperties chat={currentChat} onUpdateChatName={onUpdateChatName}/>
            </div>
            <div className="chat1-currentChat__row2">
                <ChatMessages chat={currentChat}/>
            </div>
        </div>
    );
}

export default CurrentChat;
