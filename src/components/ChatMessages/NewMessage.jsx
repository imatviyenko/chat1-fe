import React, {useRef} from 'react';

import IconButtton from '../IconButton/IconButton';
import icons from '../../icons';

import './NewMessage.css';

export default function NewMessage({onSend}) {
    const inputRefMessageText = useRef(null);

    const sendMessage = () => {
        console.log(`NewMessage.onSend invoked`);
        const messageText = inputRefMessageText && inputRefMessageText.current && inputRefMessageText.current.checkValidity() && inputRefMessageText.current.value;
        
        if (messageText) {
            onSend(messageText);
            inputRefMessageText && inputRefMessageText.current && (inputRefMessageText.current.value = "");
        }
    };

    const sendButtonElement = (
        <IconButtton 
            icon={icons.sendIcon}
            iconAlt="Send"
            label="Send"
            onClick={sendMessage}
            className="chat1-newMessage__sendButton"
        />
    );

    const messageTextInputElement = (
        <textarea 
            className="chat1-newMessage__messageText"
            ref={inputRefMessageText}
            defaultValue=""
            rows="3"
        />
    );


    return (
        <div className="chat1-newMessage">
            <div className="chat1-newMessage__textContainer">
                {messageTextInputElement}
            </div>
            <div className="chat1-newMessage__buttonContainer">
                {sendButtonElement}
            </div>
        </div>
    )
}


