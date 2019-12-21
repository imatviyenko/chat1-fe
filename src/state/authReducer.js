export const ACTION_AUTHENTICATION_SUCCESS = 'ACTION_AUTHENTICATION_SUCCESS';
export const ACTION_AUTHENTICATION_FAILURE = 'ACTION_AUTHENTICATION_FAILURE';
export const ACTION_AUTHENTICATION_LOGOUT = 'ACTION_AUTHENTICATION_LOGOUT';

export default function (state, action) {
    console.log(`authReducer -> action: ${JSON.stringify(action)}`);
    console.log(`authReducer -> action.type: ${action.type}`);

    switch (action.type) {

        case ACTION_AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                authenticationErrorStatus: null,
                token: action.token
            };

        case ACTION_AUTHENTICATION_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                authenticationErrorStatus: action.status,
                token: null
            };


        case ACTION_AUTHENTICATION_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authenticationErrorStatus: null,
                token: null
            };

        default:
            return state;
    }
}