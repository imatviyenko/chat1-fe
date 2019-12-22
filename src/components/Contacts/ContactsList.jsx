import React from 'react';

import './ContactsList.css';
import constants from '../../constants';

const mapFunc = contact => {
    if (!contact || !contact.email || !contact.status) return null;
    
    let className = contact.status === constants.USER_STATUS_ACTIVE ? 
        "chat1-contacts__contactDispayName chat1-contacts__contactDispayName_active"
        :
        "chat1-contacts__contactDispayName chat1-contacts__contactDispayName_inactive";

    const displayName = contact.displayName ?
        `${contact.displayName} <${contact.email}>` 
        :
        contact.email;
    return (
        <li className={className} key={contact.email}>
            {displayName}
        </li>
    );
}


export default function ContactsList({contactsList}) {
    console.log(`ContactsList -> contactsList: ${JSON.stringify(contactsList)}`);

    return (
        <ul className="chat1-contacts__contactsList">
            {Array.isArray(contactsList) && contactsList.map(mapFunc)}
        </ul>
    )
}