import React from 'react';

import './ChatMessages.css';

function ChatMessages({chat}) {
    console.log(`ChatMessages -> chat: ${JSON.stringify(chat)}`);
    if (!chat) return null;

    return (
        <div className="chat1-currentChat__chatMessages">
            ChatMessages
        </div>
    );
}

export default ChatMessages;
