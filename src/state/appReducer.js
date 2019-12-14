export const ACTION_AUTHENTICATION_SUCCESS = 'ACTION_AUTHENTICATION_SUCCESS';
export const ACTION_AUTHENTICATION_FAILURE = 'ACTION_AUTHENTICATION_FAILURE';

export default function (state, action) {
    console.log(`appReducer -> action: ${action}`);
    console.log(`appReducer -> action.type: ${action.type}`);

    switch (action.type) {

        case ACTION_AUTHENTICATION_SUCCESS:
            return {
                ...state,
                auth: {
                    isAuthenticated: true,
                    token: action.token
                }
            };
            break;

        case ACTION_AUTHENTICATION_FAILURE:
            return {
                ...state,
                auth: {
                    isAuthenticated: false,
                    authenticationErrorStatus: action.status
                }
            };
        break;

        default:
            return {
                ...state
            }
        }
}