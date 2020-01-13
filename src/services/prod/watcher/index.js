import constants from '../../../constants';
import {ACTION_CONTACT_ONLINE, ACTION_CONTACT_OFFLINE, ACTION_CONTACT_REFRESH} from '../../../state/contactsReducer';
import {ACTION_CHAT_REFRESH} from '../../../state/chatsReducer';
import {ACTION_AUTHENTICATION_LOGOUT} from '../../../state/authReducer';

function setDispatch(dispatch) {
    console.log(`watcher.setDispatch invoked`);
    this.dispatch = dispatch;
    console.log(`watcher.setDispatch -> this:`);
    console.log(this);
}

function connect(token) {
    console.log(`watcher.connect invoked`);

    try {
        const webSocketServerUrl = process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:3001/'; // get back-end API URL via the environment variable REACT_APP_WEBSOCKET_URL
        console.debug('watcher.connect -> webSocketServerUrl: ', webSocketServerUrl);
    
        // Hack -> send jwt token string as WebSocket "sec-websocket-protocol" header
        this.connection = new WebSocket(webSocketServerUrl, token);
        this.connection.onopen = this.onOpen.bind(this);
        this.connection.onclose = this.onClose.bind(this);
        this.connection.onerror = this.onError.bind(this);
        this.connection.onmessage = this.onMessage.bind(this);
    
       return {
            status: constants.ERROR_SUCCESS
        };
    
    } catch (webSocketError) {
        console.error(webSocketError);
        return {
            status: constants.ERROR_API_CALL_FAILED
        }
    }
}

function disconnect() {
    console.log(`watcher.disconnect invoked`);
    if (!this.connection) return;
    if (this.connection.readyState !== 1) return;

    try {
        this.connection.close();
    } catch (e) {
        console.error(`Error closing WebSocket connection:`);
        console.error(e);
    };
}

function sendMessage(message) {
    console.log(`watcher.sendMessage -> message: ${JSON.stringify(message)}`);
    if (!this.connection) return;

    try {
        this.connection.send(JSON.stringify(message));
    } catch (e) {
        console.error(`Error sending message to the back-end server over WebSocket connection:`);
        console.error(e);
    };    
}

function onOpen() {
    console.log(`watcher.onOpen invoked`);
    this.connection.send('hey');
}

function onClose() {
    console.log(`watcher.onClose invoked`);
    this.dispatch({type: ACTION_AUTHENTICATION_LOGOUT}); // logout current user if WebSocket connection to the back-end server is interrupted
}


function onError(error) {
    console.log(`watcher.onError -> error: ${JSON.stringify(error)}`);
    this.dispatch({type: ACTION_AUTHENTICATION_LOGOUT}); // logout current user if WebSocket connection to the back-end server is interrupted
}
  
function onMessage(e) {
    console.log(`watcher.onMessage -> e: ${JSON.stringify(e)}`);
    console.log(`watcher.onMessage -> data: ${JSON.stringify(e.data)}`);
    const message = JSON.parse(e.data);
    console.log(`watcher.onMessage -> message: ${JSON.stringify(message)}`);
    console.log(`watcher.onMessage -> this:`);
    console.log(this);

    //this.dispatch({type: ACTION_CONTACT_ONLINE, email: 'test123@gmail.com'});    

    switch (message.event) {
        
        case constants.EVENT_USER_ONLINE:
            console.log(`watcher.onMessage -> dispatching ACTION_CONTACT_ONLINE event`);
            this.dispatch({type: ACTION_CONTACT_ONLINE, email: message.data});
            console.log(`watcher.onMessage -> ACTION_CONTACT_ONLINE event dispatched`);
            return;

        case constants.EVENT_USER_OFFLINE:
            this.dispatch({type: ACTION_CONTACT_OFFLINE, email: message.data});
            return;
    
        case constants.EVENT_USER_PROFILE_UPDATED:
            this.dispatch({type: ACTION_CONTACT_REFRESH});
            return;

        case constants.EVENT_CHAT_UPDATED:
            this.dispatch({type: ACTION_CHAT_REFRESH});
            return;            
    }
}

const watcher = {
    setDispatch,
    connect,
    disconnect,
    sendMessage,
    onOpen,
    onClose,
    onError,
    onMessage
};

export default watcher;