export const ACTION_MESSAGE_FETCH_PAGE = 'ACTION_MESSAGE_FETCH_PAGE';


function insertPage(messagesInChats, chatGuid, messages) {
    const _messagesInChats = { ...messagesInChats};
    _messagesInChats[chatGuid] = Array.isArray(_messagesInChats[chatGuid]) ? [..._messagesInChats[chatGuid]] : [];
    _messagesInChats[chatGuid].push(messages);
}


export default function (state, action) {
    console.log(`messageReducer -> action: ${JSON.stringify(action)}`);
    console.log(`messageReducer -> action.type: ${action.type}`);

    switch (action.type) {

        case ACTION_MESSAGE_FETCH_PAGE:
            return {
                ...state,
                messagesInChats: insertPage(state.messagesInChats, action.chatGuid, action.messages)
            };

        default:
            return state;
    }
}