const initialState = {
    auth: {
        isAuthenticated: false
    },
    profile: {      
    },    
    contacts: {
    },
    chats: {
    },
    messages: {
    }
};


const initialState_test = {
    auth: {
        isAuthenticated: true,
        token: 'test_token'
    }
};

export default initialState;