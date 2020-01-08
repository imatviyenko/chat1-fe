import React, {useContext, useState} from 'react';

import AppContext from '../../context/AppContext';
import ContactsContext from '../../context/ContactsContext';

import editModeIcon from './pen-icon.png';
import updateIcon from './check-1-icon.png';
import cancelIcon from './close-icon.png';
import addContactIcon from './find-icon.png';
import './ContactPicker.css';




const augmentContactsLists = (currentContactsList, contactsList, profile) => {
    if (!Array.isArray(currentContactsList) || !Array.isArray(contactsList)) return currentContactsList;

    const allUsers = [...contactsList, profile];
    return currentContactsList.map( c => {
        return allUsers.find( c2 => c2.email.toLowerCase() === c.email.toLowerCase() );
    });
}


const getNewContactDropDownUsers = (currentContactsList, contactsList) => {
    if (!Array.isArray(currentContactsList) || !Array.isArray(contactsList)) return [];

    return contactsList.filter( c => {
        return !currentContactsList.find( c2 => c2.email.toLowerCase() === c.email.toLowerCase() );
    });
}


function ContactPicker({initialContactsList}) {
    const [editMode, setEditMode] = useState(false);

    const contacts = useContext(ContactsContext);
    const contactsList = contacts && contacts.contactsList;
    const profile = useContext(AppContext).profile;
    const [currentContactsList, setCurrentContactsList] = useState(initialContactsList);
    const augmentedCurrentContactsList = augmentContactsLists(currentContactsList, contactsList, profile);
    const newContactDropDownUsers = getNewContactDropDownUsers(currentContactsList, contactsList);
    console.log(`ContactPicker -> initialContactsList: ${JSON.stringify(initialContactsList)}`);
    console.log(`ContactPicker -> contacts: ${JSON.stringify(contacts)}`);
    console.log(`ContactPicker -> contactsList: ${JSON.stringify(contactsList)}`);
    console.log(`ContactPicker -> profile: ${JSON.stringify(profile)}`);
    console.log(`ContactPicker -> currentContactsList: ${JSON.stringify(currentContactsList)}`);
    console.log(`ContactPicker -> augmentedCurrentContactsList: ${JSON.stringify(augmentedCurrentContactsList)}`);
    console.log(`ContactPicker -> newContactDropDownUsers: ${JSON.stringify(newContactDropDownUsers)}`);

    const [showNewContactDropDown, setShowNewContactDropDown] = useState(false);


    if (!Array.isArray(augmentedCurrentContactsList)) return null;

    let addContactElement;
    let addDropDownClicked = false;
    if (editMode) {
        addContactElement = showNewContactDropDown ?
        (
            <select className="chat1-contactPicker__addDropDown" autofocus onBlur={ () => setShowNewContactDropDown(false) } onMouseDown = {() => {addDropDownClicked = true;}} >
                {newContactDropDownUsers.map( u => <option key={u.email}>{u.displayName || u.email}</option>)}
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

    };

    const editModeIconElement = !editMode && (
        <img 
            src={editModeIcon} 
            className="chat1-contactPicker__icon" 
            alt="Edit" 
            onClick={ ()=> setEditMode(true) }
        />
    );


    const updateIconElement = editMode && (
        <img 
            src={updateIcon} 
            className="chat1-contactPicker__icon chat1-contactPicker__icon_update" 
            alt="Update" 
            onClick={ ()=> update() }
        />
    );

    let cancelIconElement = editMode && (
        <img 
            src={cancelIcon} 
            className="chat1-contactPicker__icon" 
            alt="Cancel" 
            onClick={ ()=> setEditMode(false) }
        />
    );
    cancelIconElement = null;

    const mapContactFunc = contact => {
        return (
            <span className="chat1-contactPicker__contact" key={contact.email}>
                {editMode && <span className="chat1-contactPicker__contact__deleteButton">x</span>}{contact.displayName};&nbsp;
            </span>
        )
    };

    let className = "chat1-contactPicker";
    if (editMode) className += " chat1-contactPicker_editMode";
    
    const onBlur = editMode ? 
        (e) => {
            if (addDropDownClicked) {
                e.preventDefault();
                return;
            }
            setEditMode(false) 
        }
        : 
        null;

    return (
        <div className={className} tabIndex="0" autofocus onBlur={onBlur}>
            {augmentedCurrentContactsList.map(mapContactFunc)}
            {editModeIconElement}
            {addContactElement}
            {updateIconElement}
            {cancelIconElement}
        </div>
    );
}

export default ContactPicker;
