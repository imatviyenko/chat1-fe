import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import constants from '../../constants';
import AppContext from '../../context/AppContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import ServicesContext from '../../context/ServicesContext';
import ChatsContext from '../../context/ChatsContext';
import MessagesContext from '../../context/MessagesContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_MESSAGE_FETCH} from '../../state/messagesReducer';

import NewMessage from './NewMessage';
import ReceivedMessages from './ReceivedMessages';

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
    
    const messagesInChats = messages && messages.messagesInChats;

    const currentChatMessagesDataVersion = currentChat && messagesInChats && messagesInChats[currentChat.guid] && messagesInChats[currentChat.guid].dataVersion;

    const currentChatMessages = currentChat && messagesInChats && messagesInChats[currentChat.guid] && Array.isArray(messagesInChats[currentChat.guid].messages) ? 
        messagesInChats[currentChat.guid].messages
        : 
        [];


    const lastMessageSequenceNumber = currentChatMessages.length > 0 ? currentChatMessages[0].sequenceNumber : null; // the latest message with the max sequence number is at index 0
    
    console.log(`ChatMessages -> currentChat: ${JSON.stringify(currentChat)}`);
    console.log(`ChatMessages -> currentChatMessagesDataVersion: ${JSON.stringify(currentChatMessagesDataVersion)}`);
    console.log(`ChatMessages -> currentChatMessages: ${JSON.stringify(currentChatMessages)}`);
    console.log(`ChatMessages -> lastMessageSequenceNumber: ${lastMessageSequenceNumber}`);

    const [messageTextToSend, setMessageTextToSend] = useState(null);

    // effect to call back-end to send message
    const effectFunc1 = () => { 
        const asynFunc = async () => {
            console.log(`ChatMessages.effect1 ->  messageTextToSend: ${messageTextToSend}`);
            if (!messageTextToSend) return;
            
            try {
                const result = await services.sendMessage(selectedChatGuid, messageTextToSend);
                if (result.status === constants.ERROR_SUCCESS) {
                    const result2 = await services.fetchMessagesAfterSequenceNumber(selectedChatGuid, lastMessageSequenceNumber); // get the page with the latest messages
                    if (result2.status === constants.ERROR_SUCCESS) {
                        dispatch({type: ACTION_MESSAGE_FETCH, chatGuid: selectedChatGuid, messages: result2.messages});
                        setMessageTextToSend(null);
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
                console.error('ChatMessages -> error in effectFunc1:');
                console.error(e);
            };
        };
        asynFunc();
    };
    useEffect(effectFunc1, [messageTextToSend]); // fire effect when profileUpdate object changes, ignore null value


    // effect to call back-end to fetch messages
    const effectFunc2 = () => { 
        const asynFunc = async () => {
            console.log(`ChatMessages.effect2 ->  currentChatMessagesDataVersion: ${currentChatMessagesDataVersion}`);
            
            try {
                const result = await services.fetchMessagesAfterSequenceNumber(selectedChatGuid, lastMessageSequenceNumber); // get the page with the latest messages
                if (result.status === constants.ERROR_SUCCESS) {
                    dispatch({type: ACTION_MESSAGE_FETCH, chatGuid: selectedChatGuid, messages: result.messages});
                    setMessageTextToSend(null);
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
    useEffect(effectFunc2, [currentChatMessagesDataVersion]); // fire effect when messagesDataVersion changes


    const onSend = messageText => {
        console.log(`ChatMessages.onSend -> messageText: ${messageText}`);
        setMessageTextToSend(messageText);
    };

    return (
        <div className="chat1-currentChat__chatMessages">
            <NewMessage onSend={onSend}/>
            <ReceivedMessages messages={currentChatMessages}/>
        </div>
    );
}

export default ChatMessages;
