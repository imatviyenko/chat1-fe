export async function sendMessage(chatGuid, messageText) {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    const requestBody = {
        chatGuid,
        messageText
    };
    return this.callApiEndpoint(`chats/${chatGuid}/messages`, 'POST', requestBody, this.authContext.token);
}

export async function fetchMessagesAfterSequenceNumber(chatGuid, sequenceNumber) {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    const url = sequenceNumber ? `chats/${chatGuid}/messages?after=${sequenceNumber}` : `chats/${chatGuid}/messages`;
    return this.callApiEndpoint(url, 'GET', null, this.authContext.token);
}


/*
function dateToString(date) {
    return encodeURI(date.toISOString());
}

export async function fetchMessagesAfterDate(cutoffDate) {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    const cutoffDateAsString = dateToString(cutoffDate);
    return this.callApiEndpoint(`messages?after=${cutoffDateAsString}`, 'GET', null, this.authContext.token);
}
*/