const initialState = {
    auth: {
        isAuthenticated: false
    },
    contacts: {
    },
    profile: {      
    }
};


const initialState_test = {
    auth: {
        isAuthenticated: true,
        token: 'test_token'
    }
};

export default initialState;