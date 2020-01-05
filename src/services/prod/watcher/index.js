import constants from '../../../constants';

function connect(token) {
    console.log(`watcher.connect invoked`);

    try {
        const webSocketServerUrl = process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:3001/'; // get back-end API URL via the environment variable REACT_APP_WEBSOCKET_URL
        console.debug('watcher.connect -> webSocketServerUrl: ', webSocketServerUrl);
    
        // Hack -> send jwt token string as WebSocket "sec-websocket-protocol" header
        this.connection = new WebSocket(webSocketServerUrl, token);
        this.connection.onopen = this.onOpen.bind(this);
        this.connection.onerror = this.onError;
        this.connection.onmessage = this.onMessage;
    
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
}

const watcher = {
    connect,
    onOpen,
    onError,
    onMessage
};

export default watcher;