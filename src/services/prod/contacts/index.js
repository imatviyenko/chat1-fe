export async function addContact(contactEmail) {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    const requestBody = {
        contactEmail
    };
    return this.callApiEndpoint('contacts', 'POST', requestBody, this.authContext.token);
}

export async function getContacts() {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    return this.callApiEndpoint('contacts', 'GET', null, this.authContext.token);
}