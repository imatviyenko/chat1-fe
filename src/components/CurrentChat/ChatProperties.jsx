import React, {useState, useContext, useEffect, useRef} from 'react';

import constants from '../../constants';
import ContactPicker from './ContactPicker';

import icons from '../../icons';

/*
import privateChatIcon from '../Chats/private-chat.png';
import groupChatIcon from '../Chats/group-chat.png';
import editChatNameIcon from './pen-icon.png';
import updateChatNameIcon from './check-1-icon.png';
*/

import './ChatProperties.css';

function ChatProperties({chat, onUpdateChatName, onUpdateChatUsers}) {
    console.log(`ChatProperties -> chat: ${JSON.stringify(chat)}`);
    const [editChatNameMode, setEditChatNameMode] = useState(false);
    const inputRefChatName = useRef(null);
    console.log(`ChatProperties -> editChatNameMode: ${editChatNameMode}`);


    if (!chat) return null;

    const chatIconElement = chat.type === constants.CHAT_TYPE_PRIVATE ? 
        (
        <img src={icons.privateChatIcon} className="chat1-currentChat__chatProperties__icon" alt="Private chat: " />
        )
        :
        (
        <img src={icons.groupChatIcon} className="chat1-currentChat__chatProperties__icon" alt="Group chat: " />
        );


    const chatHeaderElement = (
        <h2>
            {chatIconElement} <span className="chat1-currentChat__chatProperties__chatTypeHeader">{chat.type === constants.CHAT_TYPE_PRIVATE ? 'Private chat' : 'Group chat'}</span>
        </h2>
    );

    const updateChatName = () => {
        console.log(`ChatProperties.updateChatName invoked`);
        const updatedChatName = inputRefChatName && inputRefChatName.current && inputRefChatName.current.checkValidity() && inputRefChatName.current.value;

        console.log(`ChatProperties.updateChatName -> updatedChatName: ${updatedChatName}`);
        if (updatedChatName) {
            onUpdateChatName(updatedChatName);
        }
    };

    const chatNameElement = editChatNameMode && chat.type === constants.CHAT_TYPE_GROUP ?
        (
            <>
                <input 
                    type="text" 
                    className="chat1-currentChat__chatProperties__fieldInput"
                    onBlur={ () => setEditChatNameMode(false)}
                    autoFocus
                    ref={inputRefChatName}
                    defaultValue={chat && chat.displayName}
                />
                <img 
                    src={icons.updateIcon} 
                    className="chat1-currentChat__chatProperties__icon_small" 
                    alt="Update" 
                    onMouseDown={ ()=> updateChatName()}
                />
            </>
        )
        :
        (
            <>
                <span className="chat1-currentChat__chatProperties__field" >{chat.displayName}</span> 
                {
                     chat.type === constants.CHAT_TYPE_GROUP && (
                        <img 
                            src={icons.editIcon} 
                            className="chat1-currentChat__chatProperties__icon_small" 
                            alt="Edit" 
                            onClick={ () => setEditChatNameMode(true)}
                        />
                     )
                }
            </>
        );

    return (
        <div className="chat1-currentChat__chatProperties">
            {chatHeaderElement}
            <div className="chat1-currentChat__chatProperties__row">
                <div className="chat1-currentChat__chatProperties__leftCol">
                    <span className="chat1-currentChat__chatProperties__fieldLabel">Chat name:</span>
                </div>
                <div className="chat1-currentChat__chatProperties__rightCol">
                    {chatNameElement}
                </div>
            </div>
            <div className="chat1-currentChat__chatProperties__row">
                <div className="chat1-currentChat__chatProperties__leftCol">
                    <span className="chat1-currentChat__chatProperties__fieldLabel">Users:</span>
                </div>
                <div className="chat1-currentChat__chatProperties__rightCol">
                    <ContactPicker initialContactsList={chat.users} onUpdateContactsList={onUpdateChatUsers} readonly={chat.type === constants.CHAT_TYPE_PRIVATE} maxContactCount={constants.MAX_USERS_PER_GROUP_CHAT}/>
                </div>
            </div>
        </div>
    );
}

export default ChatProperties;
