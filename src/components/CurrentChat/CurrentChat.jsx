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
    const chats = useContext(ChatsContext);
    const chatsList = chats && chats.chatsList;
    const selectedChatGuid = chats && chats.selectedChatGuid;    
    const currentChatStateFromContext = Array.isArray(chatsList) && chatsList.find( c => c.guid === selectedChatGuid);
    const [currentChat, setCurrentChat] = useState(currentChatStateFromContext);
    const [currentChatUpdate, setCurrentChatUpdate] = useState(null);

    console.log(`CurrentChat -> chats: ${JSON.stringify(chats)}`);
    console.log(`CurrentChat -> chatsList: ${JSON.stringify(chatsList)}`);
    console.log(`CurrentChat -> selectedChatGuid: ${JSON.stringify(selectedChatGuid)}`);
    console.log(`CurrentChat -> currentChatStateFromContext: ${JSON.stringify(currentChatStateFromContext)}`);
    console.log(`CurrentChat -> currentChat: ${JSON.stringify(currentChat)}`);


    // effetct to refresh currentChat if changes to chats state slice are propagated via context
    const effectFunc1 = () => {
        setCurrentChat(currentChatStateFromContext);
    };
    useEffect(effectFunc1, [currentChatStateFromContext]);


    // effect to call api to update chat in the database
    const effectFunc2 = () => { 
        const asynFunc = async () => {
            //console.log(`CurrentChat.effect ->  updateBackendFlippingFlag: ${updateBackendFlippingFlag}`);
            console.log(`CurrentChat.effect ->  currentChat: ${JSON.stringify(currentChat)}`);
            if (!currentChatUpdate) return;
            
            try {
                const result = await services.updateChat(currentChatUpdate);
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
    useEffect(effectFunc2, [currentChatUpdate]); // fire effect when currentChatUpdate object changes, ignore null value
        

    const onUpdateChatName = (updatedChatName) => {
        console.log(`CurrentChat.onUpdateChatName -> updatedChatName: ${updatedChatName}`);
        const _currentChat = {
            ...currentChat,
            displayName: updatedChatName
        };
        setCurrentChatUpdate(_currentChat);
    };

    const onUpdateChatUsers = (updatedChatUsers) => {
        console.log(`CurrentChat.onUpdateChatUsers -> updatedChatUsers: ${JSON.stringify(updatedChatUsers)}`);

        const _currentChat = {
            ...currentChat,
            users: [...updatedChatUsers]
        };
        setCurrentChatUpdate(_currentChat);
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
