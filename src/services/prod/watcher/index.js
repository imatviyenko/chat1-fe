import constants from '../../../constants';
import {ACTION_CONTACT_ONLINE, ACTION_CONTACT_OFFLINE, ACTION_CONTACT_REFRESH} from '../../../state/contactsReducer';

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

function onError(error) {
    console.log(`watcher.onError -> error: ${JSON.stringify(error)}`);
}
  
function onMessage(e) {
    console.log(`watcher.onMessage -> e: ${JSON.stringify(e)}`);
    console.log(`watcher.onMessage -> data: ${JSON.stringify(e.data)}`);
    console.log(`watcher.onMessage -> this:`);
    console.log(this);
    const message = JSON.parse(e.data);

    switch (message.event) {
        
        case constants.EVENT_USER_ONLINE:
            this.dispatch({type: ACTION_CONTACT_ONLINE, email: message.data});
            return;

        case constants.EVENT_USER_OFFLINE:
            this.dispatch({type: ACTION_CONTACT_OFFLINE, email: message.data});
            return;
    
        case constants.EVENT_USER_PROFILE_UPDATED:
            this.dispatch({type: ACTION_CONTACT_REFRESH});
            return;            
    }
}

const watcher = {
    setDispatch,
    connect,
    disconnect,
    sendMessage,
    onOpen,
    onError,
    onMessage
};

export default watcher;