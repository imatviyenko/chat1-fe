import authReducer from "./authReducer";
import contactsReducer from "./contactsReducer";
import profileReducer from "./profileReducer";

export const ACTION_APP_ERROR = 'ACTION_APP_ERROR';


// combibe reducers similar to Redux approach desribed here: https://redux.js.org/recipes/structuring-reducers/refactoring-reducer-example#separating-data-handling-by-domain
export default function (state, action) {
    console.log(`appReducer -> action: ${JSON.stringify(action)}`);
    console.log(`appReducer -> action.type: ${action.type}`);

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
        auth: authReducer(state.auth, action),
        contacts: contactsReducer(state.contacts, action),
        profile: profileReducer(state.profile, action)
    }
}