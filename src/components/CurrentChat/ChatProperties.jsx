import React from 'react';

import './ChatProperties.css';

function ChatProperties({chat}) {
    console.log(`ChatProperties -> chat: ${JSON.stringify(chat)}`);
    if (!chat) return null;

    return (
        <div className="chat1-currentChat__chatProperties">
            <h3 className="chat1-currentChat__chatProperties__chatTypeHeader">Group chat</h3>
            <div className="chat1-currentChat__chatProperties__row">
                <span className="chat1-currentChat__chatProperties__fieldLabel">Chat display name:</span>
                <input 
                    type="text" 
                    className="chat1-currentChat__chatProperties__fieldInput"
                >
                </input>                
                <button className="chat1-currentChat__chatProperties__updateButton">Update</button>
            </div>
            <div className="chat1-currentChat__chatProperties__row">
                <span className="chat1-currentChat__chatProperties__fieldLabel">Users:</span>
            </div>
        </div>
    );
}

export default ChatProperties;
