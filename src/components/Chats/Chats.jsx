import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import constants from '../../constants';
import AppContext from '../../context/AppContext';
import ServicesContext from '../../context/ServicesContext';
import ChatsContext from '../../context/ChatsContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import {ACTION_CHAT_FETCH_ALL, ACTION_CHAT_SELECTED, ACTION_CHAT_RESET_SELECTED, ACTION_CHAT_UPDATED, ACTION_CHAT_ADD_GROUP_CHAT} from '../../state/chatsReducer';

import IconButton from '../IconButton/IconButton';

/*
import privateChatIcon from './private-chat.png';
import groupChatIcon from './group-chat.png';
import messageIcon from './message.png';
import addChatIcon from './add-icon.png';
*/
import icons from '../../icons';
import './Chats.css';




function Chats() {
    let history = useHistory();

    const dispatch = useContext(AppReducerDispatchContext);
    const services = useContext(ServicesContext);
    const chats = useContext(ChatsContext);
    const chatsList = chats && chats.chatsList;
    const selectedChatGuid = chats && chats.selectedChatGuid;    
    const [addGroupChatFlippingFlag, setAddGroupChatFlippingFlag] = useState(null); // three state flag, can be either null, true or false
    console.log(`Chats -> chats: ${JSON.stringify(chats)}`);
    console.log(`Chats -> chatsList: ${JSON.stringify(chatsList)}`);
    console.log(`Chats -> selectedChatGuid: ${JSON.stringify(selectedChatGuid)}`);
    console.log(`Chats -> addGroupChatFlippingFlag: ${addGroupChatFlippingFlag}`);

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


    const effectFunc2 = () => { 
      const asynFunc = async () => {
          console.log(`Chats.effect2 ->  addGroupChatFlippingFlag: ${addGroupChatFlippingFlag}`);
          if (addGroupChatFlippingFlag === null) return;
          
          try {
              const result = await services.addGroupChat();
              if (result.status === constants.ERROR_SUCCESS) {
                dispatch({type: ACTION_CHAT_ADD_GROUP_CHAT, chat: result.chat});
              } else {
                dispatch({type: ACTION_APP_ERROR, message: 'Error creating group chat', result}); // notify the app reducer that there has been an application error
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
    useEffect(effectFunc2, [addGroupChatFlippingFlag]); // fire effect on addGroupChatFlippingFlag transitions true->false and false->true, ignore null value


    const mapFunc = (chat, index) => {
      if (!chat || !chat.displayName || !chat.type) return null;
      
      const chatIconElement = chat.type === constants.CHAT_TYPE_PRIVATE ? 
        (
          <img src={icons.privateChatIcon} className="chat1-chats__chatIcon" alt="Private chat: " />
        )
        :
        (
          <img src={icons.groupChatIcon} className="chat1-chats__chatIcon" alt="Group chat: " />
        );
          
      let className = "chat1-chats__chat";
      chat.type === constants.CHAT_TYPE_PRIVATE ? 
        className += " chat1-chats__chat_private"
        :
        className += " chat1-chats__chat_group";
      if (chat.guid === selectedChatGuid) className += " chat1-chats__chat_selected";
        
    
      const onChatSelected = (chat) => {
        console.log(`Chats.onChatSelected -> chat: ${JSON.stringify(chat)}`);
        dispatch({type: ACTION_CHAT_SELECTED, guid: chat.guid});
      };

      return (
          <li className={className} key={chat.guid} tabIndex="0" onFocus={ () => onChatSelected(chat) }>
              {chatIconElement} <span>{chat.displayName}</span>
          </li>
      );
    }    

    const addGroupChat = ()=> {
      console.log(`Chats.addGroupChat invoked`);
      setAddGroupChatFlippingFlag(!addGroupChatFlippingFlag);
    };

    return (
        <div className="chat1-chats">
          <h3>Chats</h3>
          <div className="chat1-chats__buttons">
            <IconButton 
              icon={icons.addIcon}
              iconAlt="Add Group Chat"
              label="Add Group Chat"
              onClick={addGroupChat}
            />
          </div>
          <div className="chat1-chats__content">
            <ul className="chat1-chats__chatsList">
                {Array.isArray(chatsList) && chatsList.map(mapFunc)}
            </ul>
          </div>
        </div>
    );
}

export default Chats;
