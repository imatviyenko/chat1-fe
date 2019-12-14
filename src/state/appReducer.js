import authReducer from "./authReducer";

// combibe reducers similar to Redux approach desribed here: https://redux.js.org/recipes/structuring-reducers/refactoring-reducer-example#separating-data-handling-by-domain
export default function (state, action) {
    console.log(`appReducer -> action: ${action}`);
    console.log(`appReducer -> action.type: ${action.type}`);

    return {
        auth: authReducer(state.auth, action)
    }
}