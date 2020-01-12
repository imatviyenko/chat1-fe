export const ACTION_PROFILE_FETCH = 'ACTION_PROFILE_FETCH';
export const ACTION_PROFILE_UPDATED = 'ACTION_PROFILE_UPDATED';

export default function (state, action) {
    console.log(`profileReducer -> action: ${JSON.stringify(action)}`);
    console.log(`profileReducer -> action.type: ${action.type}`);

    switch (action.type) {

        case ACTION_PROFILE_FETCH:
            return {
                ...state,
                ...action.profile
            };

        default:
            return state;
    }
}