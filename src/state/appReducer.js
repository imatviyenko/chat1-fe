import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import contactsReducer from "./contactsReducer";
import chatsReducer from "./chatsReducer";
import messagesReducer from "./messagesReducer";


export const ACTION_APP_ERROR = 'ACTION_APP_ERROR';


// combibe reducers similar to Redux approach desribed here: https://redux.js.org/recipes/structuring-reducers/refactoring-reducer-example#separating-data-handling-by-domain
export default function (state, action) {
    console.log(`appReducer -> action: ${JSON.stringify(action)}`);
    console.log(`appReducer -> action.type: ${action.type}`);
    console.log(`appReducer -> state: ${JSON.stringify(state)}`);

    if (action.type === ACTION_APP_ERROR) {
        return {
            ...state,
            error: {
                message: action.message,
                result: action.result
            }
        }
    };

    return {
        ...state,
        auth: authReducer(state.auth, action),
        profile: profileReducer(state.profile, action),
        contacts: contactsReducer(state.contacts, action),
        chats: chatsReducer(state.chats, action, state.contacts, state.profile),
        messages: messagesReducer(state.messages, action, state.contacts, state.profile)
    }
}