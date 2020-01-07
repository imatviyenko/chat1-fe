import constants from '../constants';
import {ACTION_CONTACT_ADD, ACTION_CONTACT_FETCH_ALL} from './contactsReducer';

export const ACTION_CHAT_FETCH_ALL = 'ACTION_CHAT_FETCH_ALL';
export const ACTION_CHAT_REFRESH = 'ACTION_CHAT_REFRESH';
export const ACTION_CHAT_SELECTED = 'ACTION_CHAT_SELECTED';
export const ACTION_CHAT_RESET_SELECTED = 'ACTION_CHAT_RESET_SELECTED';


const getContactDisplayName = (chat, contactsList, profile) => {
    console.log(`getContactDisplayName -> chat: ${JSON.stringify(chat)}`);
    console.log(`getContactDisplayName -> contactsList: ${JSON.stringify(contactsList)}`);
    console.log(`getContactDisplayName -> profile: ${JSON.stringify(profile)}`);

    if (!Array.isArray(contactsList)) return null;
    if (!profile) return null;

    const privateChatUser = chat.users.find(u => u.email.toLowerCase() !== profile.email.toLowerCase()); // find private chat's user who is not the current user
    if (!privateChatUser) return null;

    const privateChatContact = contactsList.find(c => c.email.toLowerCase() === privateChatUser.email.toLowerCase());
    return privateChatContact && (privateChatContact.displayName || privateChatContact.email);
};


function selectChat(chats, chatGuid) {
    const newChats = Array.isArray(chats) ? [...chats] : [];
    return newChats.map( c => {
        if (c.guid === chatGuid) {
            return {
                ...c,
                isSelected: true
            };
        }
        return c;
    });
}

function resetSelectedChat(chats) {
    const newChats = Array.isArray(chats) ? [...chats] : [];
    return newChats.map( c => {
        if (c.isSelected) {
            return {
                ...c,
                isSelected: false
            };
        }
        return c;
    });
}



export default function (state, action, contacts, profile) {
    console.log(`chatsReducer -> action: ${JSON.stringify(action)}`);
    console.log(`chatsReducer -> action.type: ${action.type}`);

    console.log(`chatsReducer -> profile: ${JSON.stringify(profile)}`);

    let _contactsList;

    const mapFunc = chat => {
        console.log(`chatsReducer.mapFunc -> chat: ${JSON.stringify(chat)}`);
        // Replace chat name from the database with the contact's display name for private chats only
        if (chat.type === constants.CHAT_TYPE_PRIVATE) {
            return {
                ...chat,
                displayName: getContactDisplayName(chat, _contactsList, profile) || chat.displayName
            }
        }
        return chat;
    };

    switch (action.type) {

        case ACTION_CHAT_FETCH_ALL:
            _contactsList = contacts.contactsList;
            return {
                ...state,
                chatsList: Array.isArray(action.chats) ? action.chats.map(mapFunc) : []
            };

        case ACTION_CHAT_REFRESH:
            return {
                ...state,
                dataVersion: state.dataVersion + 1
            };
    

        case ACTION_CONTACT_ADD:
            _contactsList = [action.contact];
            return {
                ...state,
                chatsList: Array.isArray(state.chatsList) ? state.chatsList.map(mapFunc) : []
            };

        case ACTION_CONTACT_FETCH_ALL:
            _contactsList = action.contacts;
            return {
                ...state,
                chatsList: Array.isArray(state.chatsList) ? state.chatsList.map(mapFunc) : []
            };

        case ACTION_CHAT_SELECTED:
            return {
                ...state,
                chatsList: selectChat(state.chatsList, action.guid)
            };

        case ACTION_CHAT_RESET_SELECTED:
            return {
                ...state,
                chatsList: resetSelectedChat(state.chatsList)
            };            
    
        

        default:
            return state;
    }
}