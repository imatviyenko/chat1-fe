import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import constants from '../../constants';
import AppContext from '../../context/AppContext';
import ServicesContext from '../../context/ServicesContext';
import ChatsContext from '../../context/ChatsContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import {ACTION_CHAT_FETCH_ALL, ACTION_CHAT_SELECTED, ACTION_CHAT_RESET_SELECTED} from '../../state/chatsReducer';

import privateChatIcon from './private-chat.png';
import groupChatIcon from './group-chat.png';
import messageIcon from './message.png';
import './Chats.css';




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
    useEffect(effectFunc1, [chats.dataVersion]); // run once when the component is mounted and whenever chats.dataVersion changes


    const mapFunc = (chat, index) => {
      if (!chat || !chat.displayName || !chat.type) return null;
      
      const chatIconElement = chat.type === constants.CHAT_TYPE_PRIVATE ? 
        (
          <img src={privateChatIcon} className="chat1-chats__chatIcon" alt="Private chat: " />
        )
        :
        (
          <img src={groupChatIcon} className="chat1-chats__chatIcon" alt="Group chat: " />
        );
          
      let className = "chat1-chats__chat";
      chat.type === constants.CHAT_TYPE_PRIVATE ? 
        className += " chat1-chats__chat_private"
        :
        className += " chat1-chats__chat_group";
      if (chat.isSelected) className += " chat1-chats__chat_selected"
      
  
      const onChatSelected = (chat) => {
        console.log(`Chats.onChatSelected -> chat: ${JSON.stringify(chat)}`);
        dispatch({type: ACTION_CHAT_SELECTED, guid: chat.guid});
      };
  
      const onSelectedChatBlur = () => {
        console.log(`Chats.onSelectedChatBlur invoked`);
        dispatch({type: ACTION_CHAT_RESET_SELECTED});
      };
    
  
  
      const onBlur = chat.isSelected ? onSelectedChatBlur : null;
      return (
          <li className={className} key={chat.guid} tabIndex="0" onFocus={ () => onChatSelected(chat) } onBlur={onBlur}>
              {chatIconElement} <span>{chat.displayName}</span>
          </li>
      );
    }    

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
