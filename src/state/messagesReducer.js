export const ACTION_MESSAGE_FETCH = 'ACTION_MESSAGE_FETCH';

export const getContactDisplayNameByEmail = (email, contactsList, profile) => {
    console.log(`messagesReducer.getContactDisplayNameByEmail -> email: ${email}`);
    //console.log(`messagesReducer.getContactDisplayNameByEmail -> contactsList: ${JSON.stringify(contactsList)}`);
    //console.log(`messagesReducer.getContactDisplayNameByEmail -> profile: ${JSON.stringify(profile)}`);

    if (!Array.isArray(contactsList)) return null;
    if (!profile) return null;

    const contactsListWithProfile = [
        ...contactsList,
        profile
    ];

    const contact = contactsListWithProfile.find(c => c.email.toLowerCase() === email.toLowerCase());
    return contact && (contact.displayName || contact.email);
};

function insertMessages(messagesInChats, chatGuid, messages, contactsList, profile) {
    const _messagesInThisChat = messagesInChats && Array.isArray(messagesInChats[chatGuid]) ? [ ...messagesInChats[chatGuid]] : [];
    const _messagesFromServer = messages.sort( (m1, m2) => m1.sequenceNumber - m2.sequenceNumber ); // sort messages which came from the server by ascending sequenceNumber
    const lastChatMessageSequenceNumber = _messagesInThisChat[0] && _messagesInThisChat[0].sequenceNumber;
    const firstServerMessageSequenceNumber = _messagesFromServer[_messagesFromServer.length -1] && _messagesFromServer[_messagesFromServer.length -1].sequenceNumber;
    
    // normally messages which came from the server will have sequence numbers greater than the max sequeence number we have in the front-end state
    // if it is not so, then something's wrong with the message ordering and we need to resort
    let needResorting = lastChatMessageSequenceNumber && firstServerMessageSequenceNumber &&  (lastChatMessageSequenceNumber >= firstServerMessageSequenceNumber); 

    // go through the server messages and add them one by one at the beginning of the array so that the latest message with the max sequenceNumnber is at index 0
    let _messages = _messagesInThisChat;
    if (Array.isArray(messages)) {
        _messagesFromServer.forEach( messageFromServer => {
            if (_messages.find( existingMessage => existingMessage.sequenceNumber === messageFromServer.sequenceNumber)) {
                needResorting = true; // if we already have a message with this sequence number, then something went wrong, we should not add the server message and we should resort
            } else {
                // add authorDisplayName prop with message author display name from my contacts
                const _messageFromServer = {
                    ...messageFromServer,
                    authorDisplayName: getContactDisplayNameByEmail(messageFromServer.authorEmail, contactsList, profile)
                };
                _messages.unshift(_messageFromServer);
            };
        });
    }

    if (needResorting) _messages = _messages.sort((m1, m2) => m2.sequenceNumber - m1.sequenceNumber); // sort all messages for the current chat by descending sequenceNumber
    
    const _messagesInChats = messagesInChats || {};
    _messagesInChats[chatGuid] = _messages;
    return _messagesInChats;
}


export default function (state, action, contacts, profile) {
    console.log(`messageReducer -> action: ${JSON.stringify(action)}`);
    console.log(`messageReducer -> action.type: ${action.type}`);

    switch (action.type) {

        case ACTION_MESSAGE_FETCH:
            return {
                ...state,
                messagesInChats: insertMessages(state.messagesInChats, action.chatGuid, action.messages, contacts.contactsList, profile)
            };

        default:
            return state;
    }
}