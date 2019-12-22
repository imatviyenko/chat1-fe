export async function getChats() {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    return this.callApiEndpoint('chats', 'GET', null, this.authContext.token);
}