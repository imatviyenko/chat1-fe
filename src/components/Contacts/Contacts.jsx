import React, {useState, useContext, useEffect} from 'react';

import constants from '../../constants';
import ServicesContext from '../../context/ServicesContext';
import ContactsContext from '../../context/ContactsContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import {ACTION_CONTACT_ADD, ACTION_CONTACT_REMOVE, ACTION_CONTACT_FETCH_ALL} from '../../state/contactsReducer';

import ContactsList from './ContactsList';


import './Contacts.css';


function Contacts() {
    const dispatch = useContext(AppReducerDispatchContext);
    const services = useContext(ServicesContext);
    const [newContactEmail, setNewContactEmail] = useState(null);
    const [addContactFireOnceFlag, setAddContactFireOnceFlag] = useState(false);
    
    const contacts = useContext(ContactsContext);
    const contactsList = contacts && contacts.contactsList;
    console.log(`Contacts -> contacts: ${JSON.stringify(contacts)}`);
    console.log(`Contacts -> contactsList: ${JSON.stringify(contactsList)}`);

    // effect for adding a new contact for the current user when "Add contact" button is pressed
    const effectFunc1 = () => { 
        const asynFunc = async () => {
          if (!addContactFireOnceFlag || !newContactEmail) return;

          try {
            const result = await services.addContact(newContactEmail);
            if (result.status === constants.ERROR_SUCCESS) {
              dispatch({type: ACTION_CONTACT_ADD, contact: result.contact});
            } else {
              dispatch({type: ACTION_APP_ERROR, status: result.status}); // notify the app reducer that there has been an application error
            }
          } catch (e) {
            console.error('Contacts -> error in effectFunc1:');
            console.error(e);
          };
    
        }
        asynFunc();
    };
    useEffect(effectFunc1, [addContactFireOnceFlag]); // run whenever addContactFireOnceFlag value is changed


    // effect for fetching the list of contacts for the current user
    const effectFunc2 = () => { 
        const asynFunc = async () => {
          try {
            const result = await services.getContacts();
            if (result.status === constants.ERROR_SUCCESS) {
              dispatch({type: ACTION_CONTACT_FETCH_ALL, contacts: result.contacts});
            } else {
              dispatch({type: ACTION_APP_ERROR, status: result.status}); // notify the app reducer that there has been an application error
            }
          } catch (e) {
            console.error('Contacts -> error in effectFunc2:');
            console.error(e);
          };
    
        }
        asynFunc();
    };
    useEffect(effectFunc2, []); // run once when the component is mounted

    return (
        <div className="chat1-contacts">
            <h3>My Contacts</h3>
            <div className="chat1-contacts__content">
                <div className="chat1-contacts__contentRow">
                    <div className="chat1-contacts__contentColumn">
                        <span className="chat1-contacts__fieldLabel">Email:</span>
                        <input type="email" className="chat1-contacts__fieldInput" onChange={ e => setNewContactEmail(e.target.value) }></input>
                        <button className="chat1-contacts__button_addUser" onClick={ () => setAddContactFireOnceFlag(true)}>Add user</button>
                    </div>
                    <div>
                        <ContactsList contactsList={contactsList} />
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;
