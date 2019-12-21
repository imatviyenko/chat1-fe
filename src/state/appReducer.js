import authReducer from "./authReducer";
import contactsReducer from "./contactsReducer";

export const ACTION_APP_ERROR = 'ACTION_APP_ERROR';


// combibe reducers similar to Redux approach desribed here: https://redux.js.org/recipes/structuring-reducers/refactoring-reducer-example#separating-data-handling-by-domain
export default function (state, action) {
    console.log(`appReducer -> action: ${JSON.stringify(action)}`);
    console.log(`appReducer -> action.type: ${action.type}`);

    return {
        auth: authReducer(state.auth, action),
        contacts: contactsReducer(state.contacts, action)
    }
}