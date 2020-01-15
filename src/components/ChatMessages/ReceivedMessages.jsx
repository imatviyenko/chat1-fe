import React, {useRef} from 'react';

import IconButtton from '../IconButton/IconButton';
import icons from '../../icons';

import './ReceivedMessages.css';

export default function ReceivedMessages({messages, moreDataAvailable, downloadMoreMessages}) {

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


    const downloadMoreMessagesButtonElement = moreDataAvailable && (
        <IconButtton 
            icon={icons.arrowDownIcon}
            iconAlt="More"
            label="More messages ..."
            onClick={downloadMoreMessages}
            className="chat1-receivedMessages__downloadMoreMessagesButton"
        />
    );

    return (
        <div className="chat1-receivedMessages">
            <div className="chat1-receivedMessages__listContainer">
                <ul className="chat1-receivedMessages__list">
                    {Array.isArray(messages) && messages.map(mapFunc)}
                </ul>
                {downloadMoreMessagesButtonElement}
            </div>
        </div>
    )
}


