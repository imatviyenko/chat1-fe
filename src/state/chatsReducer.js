import constants from '../constants';
import {ACTION_CONTACT_ADD, ACTION_CONTACT_FETCH_ALL, ACTION_CONTACT_SELECTED} from './contactsReducer';
import {ACTION_MESSAGE_REFRESH} from './messagesReducer';

export const ACTION_CHAT_FETCH_ALL = 'ACTION_CHAT_FETCH_ALL';
export const ACTION_CHAT_REFRESH = 'ACTION_CHAT_REFRESH';
export const ACTION_CHAT_SELECTED = 'ACTION_CHAT_SELECTED';
export const ACTION_CHAT_RESET_SELECTED = 'ACTION_CHAT_RESET_SELECTED';
export const ACTION_CHAT_UPDATED = 'ACTION_CHAT_UPDATED';
export const ACTION_CHAT_ADD_GROUP_CHAT = 'ACTION_CHAT_ADD_GROUP_CHAT';

export const getContactDisplayName = (chat, contactsList, profile) => {
    console.log(`chatsReducer.getContactDisplayName -> chat: ${JSON.stringify(chat)}`);
    console.log(`chatsReducer.getContactDisplayName -> contactsList: ${JSON.stringify(contactsList)}`);
    console.log(`chatsReducer.getContactDisplayName -> profile: ${JSON.stringify(profile)}`);

    if (!Array.isArray(contactsList)) return null;
    if (!profile) return null;

    const privateChatUser = chat.users.find(u => u.email.toLowerCase() !== profile.email.toLowerCase()); // find private chat's user who is not the current user
    if (!privateChatUser) return null;

    const privateChatContact = contactsList.find(c => c.email.toLowerCase() === privateChatUser.email.toLowerCase());
    return privateChatContact && (privateChatContact.displayName || privateChatContact.email);
};

function getPrivateChatGuidForContact(chats, contactEmail) {
    console.log(`getPrivateChatGuidForContact -> chats: ${JSON.stringify(chats)}`);
    console.log(`getPrivateChatGuidForContact -> contactEmail: ${contactEmail}`);

    if (!Array.isArray(chats)) return null;
    const chat = chats.find( c => c.type === constants.CHAT_TYPE_PRIVATE && c.users.find( u => u.email === contactEmail) );
    console.log(`getPrivateChatGuidForContact -> chat: ${JSON.stringify(chat)}`);
    
    return chat && chat.guid;
}

function updateChat(chats, chat) {
    return chats.map( c => {
        if (c.guid.toLowerCase() === chat.guid.toLowerCase()) return chat;
        return c;
    });
}

function addChat(chats, chat) {
    return [chat, ...chats];
}


function removeChat(chats, chat) {
    return chats.filter( c => c.guid !== chat.guid);
}

function setNewMessagesAvailableStatus(chats, newMessageChatGuid) {
    return chats.map( c => {
        if (c.guid.toLowerCase() === newMessageChatGuid.toLowerCase()) return {...c, newMessagesAvailable: true};
        return c;
    });
}

function resetNewMessagesAvailableStatus(chats, selectedChatGuid) {
    return chats.map( c => {
        if (c.guid.toLowerCase() === selectedChatGuid.toLowerCase()) return {...c, newMessagesAvailable: false};
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

    const sortFunc = (chat1, chat2) => {
        // Chats with messages should come before empty chats
        if (chat1.lastMessageTimestamp && !chat1.lastMessageTimestamp) return -1;
        if (!chat1.lastMessageTimestamp && chat2.lastMessageTimestamp) return 1;
        
        // Compare empty chats by chat display name
        if (!chat1.lastMessageTimestamp && !chat2.lastMessageTimestamp) return chat1.displayName.localeCompare(chat2.displayName);

        // If both chats have last message timestamp, the one with the most recent timestamp should go first
        return chat1.lastMessageTimestamp - chat2.lastMessageTimestamp;
    }

    switch (action.type) {

        case ACTION_CHAT_FETCH_ALL:
            _contactsList = contacts.contactsList;
            return {
                ...state,
                chatsList: Array.isArray(action.chats) ? action.chats.sort(sortFunc).map(mapFunc) : []
            };

        case ACTION_CHAT_REFRESH:
            return {
                ...state,
                dataVersion: (state.dataVersion || 0) + 1
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
                selectedChatGuid: action.guid,
                chatsList: resetNewMessagesAvailableStatus(state.chatsList, action.guid)
            };

        case ACTION_CONTACT_SELECTED:
            const selectedChatGuid = getPrivateChatGuidForContact(state.chatsList, action.email);
            return {
                ...state,
                selectedChatGuid
            };
    

        case ACTION_CHAT_RESET_SELECTED:
            return {
                ...state,
                selectedChatGuid: null
            };            
    
        case ACTION_CHAT_UPDATED:
            // check for the case when the updated chat no longer contains my own email because I or somebody else deleted myself from the chat users
            if (!action.chat.users.find( u => u.email === profile.email)) {
                return {
                    ...state,
                    chatsList: removeChat(state.chatsList, action.chat),
                    selectedChatGuid: action.chat.guid
                };
            }

            return {
                ...state,
                chatsList: updateChat(state.chatsList, action.chat),
                selectedChatGuid: action.chat.guid
            };
        
        case ACTION_CHAT_ADD_GROUP_CHAT:
            return {
                ...state,
                chatsList: addChat(state.chatsList, action.chat),
                selectedChatGuid: action.chat.guid
            };

        case ACTION_MESSAGE_REFRESH:
            if (state.selectedChatGuid && (state.selectedChatGuid.toLowerCase() === action.chatGuid.toLowerCase())) return state;
            return {
                ...state,
                chatsList: setNewMessagesAvailableStatus(state.chatsList, action.chatGuid)
            };
    

        default:
            return state;
    }
}