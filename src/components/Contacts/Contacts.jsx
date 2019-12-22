import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import constants from '../../constants';

import AppContext from '../../context/AppContext';
import ServicesContext from '../../context/ServicesContext';
import ContactsContext from '../../context/ContactsContext';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import {ACTION_CONTACT_ADD, ACTION_CONTACT_REMOVE, ACTION_CONTACT_FETCH_ALL} from '../../state/contactsReducer';

import ContactsList from './ContactsList';
import './Contacts.css';

function Contacts() {
    let history = useHistory();

    const dispatch = useContext(AppReducerDispatchContext);
    const services = useContext(ServicesContext);
    const [newContactEmail, setNewContactEmail] = useState(null);
    const [addContactFlippingFlag, setAddContactFlippingFlag] = useState(null);
    console.log(`Contacts -> addContactFlippingFlag: ${addContactFlippingFlag}`);
    
    const profile = useContext(AppContext).profile;
    const contacts = useContext(ContactsContext);
    const contactsList = contacts && contacts.contactsList;
    console.log(`Contacts -> contacts: ${JSON.stringify(contacts)}`);
    console.log(`Contacts -> contactsList: ${JSON.stringify(contactsList)}`);

    // effect for adding a new contact for the current user when "Add contact" button is pressed
    const effectFunc1 = () => { 
        const asynFunc = async () => {
          console.log(`effect1 ->  newContactEmail: ${newContactEmail}`);
          console.log(`effect1 ->  addContactFlippingFlag: ${addContactFlippingFlag}`);
          if (addContactFlippingFlag === null || !newContactEmail) return;

          const newContactEmailLowerCase = newContactEmail.toLowerCase();
          if (newContactEmailLowerCase === profile.email) return; // cannot add self to the contacts

          const existingContact = Array.isArray(contacts.contactsList) && contacts.contactsList.find( c => c.email.toLowerCase() === newContactEmailLowerCase);
          console.log(`effect1 -> existingContact: ${JSON.stringify(existingContact)}`);
          if (existingContact) return; // contact with such email already exists

          try {
            const result = await services.addContact(newContactEmail);
            if (result.status === constants.ERROR_SUCCESS) {
              dispatch({type: ACTION_CONTACT_ADD, contact: result.contact});
            } else {
              dispatch({type: ACTION_APP_ERROR, message: 'Error fetching contacts', result}); // notify the app reducer that there has been an application error
              history.replace({ pathname: '/error'});
              return;
            }
          } catch (e) {
            console.error('Contacts -> error in effectFunc1:');
            console.error(e);
          };
    
        }
        asynFunc();
    };
    useEffect(effectFunc1, [addContactFlippingFlag]); // run whenever addContactFireMultipleTimesFlag value is changed


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
            <div className="chat1-contacts__row1">
                <span className="chat1-contacts__fieldLabel">Email:</span>
                <input type="email" className="chat1-contacts__fieldInput" onChange={ e => setNewContactEmail(e.target.value) }></input>
                <button className="chat1-contacts__button_addUser" onClick={ () => setAddContactFlippingFlag(!addContactFlippingFlag)}>Add user</button>
            </div>
            <div className="chat1-contacts__row2">
                <ContactsList contactsList={contactsList} />
            </div>
          </div>
        </div>
    );
}

export default Contacts;
