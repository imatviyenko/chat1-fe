export async function sendMessage(chatGuid, messageText) {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    const requestBody = {
        chatGuid,
        messageText
    };
    return this.callApiEndpoint('messages', 'POST', requestBody, this.authContext.token);
}

function dateToString(date) {
    return encodeURI(date.toISOString());
}

export async function fetchMessagesAfterDate(cutoffDate) {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    const cutoffDateAsString = dateToString(cutoffDate);
    return this.callApiEndpoint(`messages?after=${cutoffDateAsString}`, 'GET', null, this.authContext.token);
}