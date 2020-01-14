import React, {useRef} from 'react';

import IconButtton from '../IconButton/IconButton';
import icons from '../../icons';

import './ReceivedMessages.css';

export default function ReceivedMessages({messages}) {

    const mapFunc = message => {
        return (
            <li className="chat1-receivedMessages__message" key={message.sequenceNumber} >
                <div className="chat1-receivedMessages__message__text">
                    <span>{message.text}</span>
                </div>

                <div className="chat1-receivedMessages__message__info">
                    <span className="chat1-receivedMessages__message__author">{message.authorDisplayName}</span>
                    <span className="chat1-receivedMessages__message__timestamp">{(new Date(message.createdAt)).toLocaleString()}</span>
                </div>
            </li>
        );
    };

    return (
        <div className="chat1-receivedMessages">
            <ul className="chat1-receivedMessages__list">
                {Array.isArray(messages) && messages.map(mapFunc)}
            </ul>
        </div>
    )
}


