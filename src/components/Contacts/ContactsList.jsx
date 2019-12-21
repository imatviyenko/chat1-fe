import React, {useContext} from 'react';

import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_AUTHENTICATION_LOGOUT} from '../../state/authReducer';

const mapFunc = contact => {
    return (
        <option>
            {contact && contact.email}
        </option>
    );
}


export default function ContactsList({contactsList}) {
    console.log(`ContactsList -> contactsList: ${JSON.stringify(contactsList)}`);

    return (
        <select className="" size="5">
            {Array.isArray(contactsList) && contactsList.map(mapFunc)}
        </select>
    )
}