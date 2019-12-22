export const ACTION_CONTACT_ADD = 'ACTION_CONTACT_ADD';
export const ACTION_CONTACT_REMOVE = 'ACTION_CONTACT_REMOVE';
export const ACTION_CONTACT_FETCH_ALL = 'ACTION_CONTACT_FETCH_ALL';

function addContact(contacts, contact) {
    console.log(`addContact -> contacts: ${JSON.stringify(contacts)}`);
    console.log(`addContact -> contact: ${JSON.stringify(contact)}`);

    const newContacts = Array.isArray(contacts) ? [...contacts] : [];
    if (newContacts.find(c => c.email === contact.email)) return;
    newContacts.push(contact);
    return newContacts.sort( (c1, c2) => {
        const c1DisplayName = c1.displayName || c1.email;
        const c2DisplayName = c2.displayName || c2.email;
        return c1DisplayName.localeCompare(c2DisplayName);
    });
}


function removeContact(contacts, contact) {
    const newContacts = Array.isArray(contacts) ? [...contacts] : [];
    const index = contacts.findIndex(c => c.email === contact.email);
    if (index === -1) return;
    return [...newContacts.splice(index, 1)];
}


export default function (state, action) {
    console.log(`contactsReducer -> action: ${JSON.stringify(action)}`);
    console.log(`contactsReducer -> action.type: ${action.type}`);

    switch (action.type) {

        case ACTION_CONTACT_ADD:
            return {
                ...state,
                contactsList: addContact(state.contactsList, action.contact)
            };

        case ACTION_CONTACT_REMOVE:
            return {
                ...state,
                contactsList: removeContact(state.contactsList, action.contact)
            };

        case ACTION_CONTACT_FETCH_ALL:
            return {
                ...state,
                contactsList: action.contacts
            };

        default:
            return state;
    }
}