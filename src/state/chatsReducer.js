import constants from '../constants';
import {ACTION_CONTACT_ADD, ACTION_CONTACT_FETCH_ALL} from './contactsReducer';

export const ACTION_CHAT_FETCH_ALL = 'ACTION_CHAT_FETCH_ALL';

const getContactDisplayName = (chat, contacts, profile) => {
    console.log(`getContactDisplayName -> chat: ${JSON.stringify(chat)}`);
    console.log(`getContactDisplayName -> contacts: ${JSON.stringify(contacts)}`);
    console.log(`getContactDisplayName -> profile: ${JSON.stringify(profile)}`);

    if (!Array.isArray(contacts)) return null;
    if (!profile) return null;

    const privateChatUser = chat.users.find(u => u.email.toLowerCase() !== profile.email.toLowerCase()); // find private chat's user who is not the current user
    if (!privateChatUser) return null;

    const privateChatContact = contacts.find(c => c.email.toLowerCase() === privateChatUser.email.toLowerCase());
    return privateChatContact && privateChatContact.displayName;
};


export default function (state, action, contacts, profile) {
    console.log(`chatsReducer -> action: ${JSON.stringify(action)}`);
    console.log(`chatsReducer -> action.type: ${action.type}`);

    console.log(`chatsReducer -> profile: ${JSON.stringify(profile)}`);

    let _contacts;

    const mapFunc = chat => {
        console.log(`chatsReducer.mapFunc -> chat: ${JSON.stringify(chat)}`);
        // Replace chat name from the database with the contact's display name for private chats only
        if (chat.type === constants.CHAT_TYPE_PRIVATE) {
            return {
                ...chat,
                displayName: getContactDisplayName(chat, _contacts, profile) || chat.displayName
            }
        }
        return chat;
    };

    switch (action.type) {

        case ACTION_CHAT_FETCH_ALL:
            _contacts = contacts;
            return {
                ...state,
                chatsList: Array.isArray(action.chats) ? action.chats.map(mapFunc) : []
            };

        case ACTION_CONTACT_ADD:
            _contacts = [action.contact];
            return {
                ...state,
                chatsList: Array.isArray(state.chatsList) ? state.chatsList.map(mapFunc) : []
            };

        case ACTION_CONTACT_FETCH_ALL:
            _contacts = action.contacts;
            return {
                ...state,
                chatsList: Array.isArray(state.chatsList) ? state.chatsList.map(mapFunc) : []
            };
        

        default:
            return state;
    }
}