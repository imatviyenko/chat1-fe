export const ACTION_CHAT_FETCH_ALL = 'ACTION_CHAT_FETCH_ALL';

export default function (state, action) {
    console.log(`chatsReducer -> action: ${JSON.stringify(action)}`);
    console.log(`chatsReducer -> action.type: ${action.type}`);

    switch (action.type) {

        case ACTION_CHAT_FETCH_ALL:
            return {
                ...state,
                chatsList: action.chats
            };

        default:
            return state;
    }
}