export async function registerUser(userDisplayName, userEmail, password, code) {
    const requestBody = {
        email: userEmail,
        displayName: userDisplayName,
        password,
        code
    };
    return this.callApiEndpoint('registration', 'POST', requestBody);
}


export async function getEmailFromCode(code) {
    return this.callApiEndpoint(`registration/${code}`, 'GET', null);
}