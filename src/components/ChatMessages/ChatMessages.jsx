import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import constants from '../../constants';
import AppContext from '../../context/AppContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import ServicesContext from '../../context/ServicesContext';
import ChatsContext from '../../context/ChatsContext';
import MessagesContext from '../../context/MessagesContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_MESSAGE_FETCH_PAGE} from '../../state/messagesReducer';

import NewMessage from './NewMessage';

import './ChatMessages.css';

function ChatMessages() {
    let history = useHistory();
    const dispatch = useContext(AppReducerDispatchContext);
    const services = useContext(ServicesContext);

    const chats = useContext(ChatsContext);
    const chatsList = chats && chats.chatsList;
    const selectedChatGuid = chats && chats.selectedChatGuid;    
    const currentChat = Array.isArray(chatsList) && chatsList.find( c => c.guid === selectedChatGuid);

    const messages = useContext(MessagesContext);
    const currentChatMessages = currentChat ? messages[currentChat.guid] : [];
    const lastMessageTimestamp = currentChatMessages.length > 0 ? currentChatMessages[0].timestamp : null; 
    
    console.log(`ChatMessages -> currentChat: ${JSON.stringify(currentChat)}`);
    console.log(`ChatMessages -> currentChatMessages: ${JSON.stringify(currentChatMessages)}`);
    console.log(`ChatMessages -> lastMessageTimestamp: ${JSON.stringify(lastMessageTimestamp)}`);

    const [messageTextToSend, setMessageTextToSend] = useState(null);

    // effect to call api to send message
    const effectFunc = () => { 
        const asynFunc = async () => {
            console.log(`ChatMessages.effect ->  messageTextToSend: ${messageTextToSend}`);
            if (!messageTextToSend) return;
            
            try {
                const result = await services.sendMessage(selectedChatGuid, messageTextToSend);
                if (result.status === constants.ERROR_SUCCESS) {
                    const result2 = await services.fetchMessagesAfterDate(lastMessageTimestamp); // get the page with the latest messages
                    if (result2.status === constants.ERROR_SUCCESS) {
                        dispatch({type: ACTION_MESSAGE_FETCH_PAGE, messages: result2.messages});
                        setMessageToSend(null);
                    } else {
                        dispatch({type: ACTION_APP_ERROR, message: 'Error sending message', result}); // notify the app reducer that there has been an application error
                        history.replace({ pathname: '/error'});
                        return;
                    }
                } else {
                    dispatch({type: ACTION_APP_ERROR, message: 'Error sending message', result}); // notify the app reducer that there has been an application error
                    history.replace({ pathname: '/error'});
                    return;
                }
            } catch (e) {
                console.error('ChatMessages -> error in effectFunc:');
                console.error(e);
            };
        };
        asynFunc();
    };
    useEffect(effectFunc, [messageToSend]); // fire effect when profileUpdate object changes, ignore null value


    const onSend = messageText => {
        console.log(`ChatMessages.onSend -> messageText: ${messageText}`);
        setMessageTextToSend(messageText);
    };

    return (
        <div className="chat1-currentChat__chatMessages">
            <NewMessage onSend={onSend}/>
            old messages...
        </div>
    );
}

export default ChatMessages;
