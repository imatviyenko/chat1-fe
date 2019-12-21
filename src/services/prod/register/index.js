export async function registerUser(email, displayName, password, code) {
    const requestBody = {
        email,
        displayName,
        password,
        code
    };
    return this.callApiEndpoint('register', 'POST', requestBody);
}


export async function getEmailFromCode(code) {
    return this.callApiEndpoint(`register/${code}`, 'GET', null);
}

export async function confirmEmailByCode(code) {
    const requestBody = {
        code
    };
    return this.callApiEndpoint('confirm', 'POST', requestBody);
}