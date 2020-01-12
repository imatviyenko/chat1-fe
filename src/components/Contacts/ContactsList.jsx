import React from 'react';

//import userOnlineIcon from './user-online.png';
import icons from '../../icons';

import './ContactsList.css';
import constants from '../../constants';




export default function ContactsList({contactsList, onContactSelected, onSelectedContactBlur }) {
    console.log(`ContactsList -> contactsList: ${JSON.stringify(contactsList)}`);


    const mapFunc = contact => {
        if (!contact || !contact.email || !contact.status) return null;
    
        const contactOnlineIconElement = contact.isOnline ? 
            (
                <img src={icons.userOnlineIcon} className="chat1-contacts__contactIsOnlineIcon" alt="User online: " />
            )
            :
            null;    
    
        const displayName = contact.displayName ?
            `${contact.displayName} <${contact.email}>` 
            :
            contact.email;
    
    
        let className = "chat1-contacts__contact";
        contact.status === constants.USER_STATUS_ACTIVE ? 
            className += " chat1-contacts__contact_active"
            :
            className += " chat1-contacts__contact_inactive";
    
        if (contact.isOnline) className += " chat1-contacts__contact_online";
        if (contact.isSelected) className += " chat1-contacts__contact_selected";
    
        
        const onBlur = contact.isSelected ? onSelectedContactBlur : null;
        return (
            <li className={className} key={contact.email} tabIndex="0" onFocus={ () => onContactSelected(contact) } onBlur={onBlur}>
                <span>{displayName}</span> {contactOnlineIconElement} 
            </li>
        );
    }



    return (
        <ul className="chat1-contacts__contactsList">
            {Array.isArray(contactsList) && contactsList.map(mapFunc)}
        </ul>
    )
}