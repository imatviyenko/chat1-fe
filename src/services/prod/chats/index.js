export async function getChats() {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    return this.callApiEndpoint('chats', 'GET', null, this.authContext.token);
}


export async function updateChat(chat) {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    return this.callApiEndpoint(`chats/${chat.guid}`, 'PUT', chat, this.authContext.token);
}