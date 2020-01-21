import React, {useContext, useState, useEffect} from 'react';

import AppContext from '../../context/AppContext';
import ContactsContext from '../../context/ContactsContext';

/*
import editModeIcon from './pen-icon.png';
import updateIcon from './check-1-icon.png';
import cancelIcon from './close-icon.png';
import addContactIcon from './find-icon.png';
*/
import icons from '../../icons';
import './ContactPicker.css';

const augmentContactsLists = (currentContactsList, contactsList, profile) => {
    if (!Array.isArray(currentContactsList) || !Array.isArray(contactsList)) return currentContactsList;

    const allUsers = [...contactsList, profile];
    return currentContactsList.map( c => {
        const userFromMyContacts = allUsers.find( c2 => c2.email.toLowerCase() === c.email.toLowerCase() );
        if (userFromMyContacts) return userFromMyContacts;
        return c;
    });
}


const getContactsDropDownUsers = (currentContactsList, contactsList) => {
    if (!Array.isArray(currentContactsList) || !Array.isArray(contactsList)) return [];

    return contactsList.filter( c => {
        return !currentContactsList.find( c2 => c2.email.toLowerCase() === c.email.toLowerCase() );
    });
}


function ContactPicker({initialContactsList, onUpdateContactsList, readonly, maxContactCount}) {
    const [editMode, setEditMode] = useState(false);

    const contacts = useContext(ContactsContext);
    const contactsList = contacts && contacts.contactsList;
    const profile = useContext(AppContext).profile;
    
    const [currentContactsList, setCurrentContactsList] = useState(initialContactsList);
    // https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
    useEffect( ()=> {
        setCurrentContactsList(initialContactsList);
    }, [initialContactsList]);
        

    const augmentedCurrentContactsList = augmentContactsLists(currentContactsList, contactsList, profile);
    const contactsDropDownUsers = getContactsDropDownUsers(currentContactsList, contactsList);
    console.log(`ContactPicker -> initialContactsList: ${JSON.stringify(initialContactsList)}`);
    console.log(`ContactPicker -> contacts: ${JSON.stringify(contacts)}`);
    console.log(`ContactPicker -> contactsList: ${JSON.stringify(contactsList)}`);
    console.log(`ContactPicker -> profile: ${JSON.stringify(profile)}`);
    console.log(`ContactPicker -> currentContactsList: ${JSON.stringify(currentContactsList)}`);
    console.log(`ContactPicker -> augmentedCurrentContactsList: ${JSON.stringify(augmentedCurrentContactsList)}`);
    console.log(`ContactPicker -> contactsDropDownUsers: ${JSON.stringify(contactsDropDownUsers)}`);

    const [showNewContactDropDown, setShowNewContactDropDown] = useState(false);

    const addContact = contactEmail => {
        console.log(`ContactPicker.addContact -> contactEmail: ${contactEmail}`);
        const contactToAdd = Array.isArray(contactsDropDownUsers) && contactsDropDownUsers.find( c => c.email === contactEmail);
        if (contactToAdd) {
            if (Array.isArray(currentContactsList) && !currentContactsList.find( c => c.email === contactEmail)) {
                setCurrentContactsList([...currentContactsList, {email: contactEmail}]);
            }
        }
    };


    const deleteContact = contactEmail => {
        console.log(`ContactPicker.deleteContact -> contactEmail: ${contactEmail}`);
        if (contactEmail) {
            if (Array.isArray(currentContactsList)) setCurrentContactsList(currentContactsList.filter( c => c.email !== contactEmail));
        }
    };

    if (!Array.isArray(augmentedCurrentContactsList)) return null;

    let addContactElement;
    const dropDownOptions  = [
        <option value="" key="EMPTY">Select contact</option>,
        ...contactsDropDownUsers.map( u => <option key={u.email} value={u.email}>{u.displayName || u.email}</option>)
    ];
    if (editMode && !readonly && augmentedCurrentContactsList.length < maxContactCount) {
        addContactElement = showNewContactDropDown ?
        (
            <select 
                className="chat1-contactPicker__addDropDown" 
                autoFocus 
                tabIndex="0" 
                onBlur={ () => setShowNewContactDropDown(false) }
                onChange={ e => addContact(e.target.value) }
            >
                {dropDownOptions}
            </select>
        )
        :
        (
            <span className="chat1-contactPicker__contact__addButton" onClick={ () => setShowNewContactDropDown(true) } >+</span>
        );
    } else {
        addContactElement = null;
    };

    const update = () => {
        console.log(`ContactPicker.update invoked`);
        setEditMode(false);
        onUpdateContactsList(currentContactsList);
    };

    const cancel = () => {
        console.log(`ContactPicker.update invoked`);
        setEditMode(false);
        setCurrentContactsList(initialContactsList);
    };

    const editModeIconElement = !editMode && !readonly && (
        <img 
            src={icons.editIcon} 
            className="chat1-contactPicker__icon" 
            alt="Edit" 
            onClick={ ()=> setEditMode(true) }
        />
    );


    const updateIconElement = editMode && (
        <img 
            src={icons.updateIcon} 
            className="chat1-contactPicker__icon chat1-contactPicker__icon_update" 
            alt="Update" 
            onClick={ update }
        />
    );

    let cancelIconElement = editMode && (
        <img 
            src={icons.cancelIcon} 
            className="chat1-contactPicker__icon" 
            alt="Cancel" 
            onClick={ cancel }
        />
    );

    const mapContactFunc = contact => {
        return (
            <span className="chat1-contactPicker__contact" key={contact.email}>
                {editMode && <span className="chat1-contactPicker__contact__deleteButton" onClick={ () => deleteContact(contact.email)}>x</span>} 
                {contact.displayName || contact.email};&nbsp;
            </span>
        )
    };

    let className = "chat1-contactPicker";
    if (editMode) className += " chat1-contactPicker_editMode";

    return (
        <div className={className} tabIndex="0">
            {augmentedCurrentContactsList.map(mapContactFunc)}
            {editModeIconElement}
            {addContactElement}
            {updateIconElement}
            {cancelIconElement}
        </div>
    );
}

export default ContactPicker;
