export async function authUser(email, password) {
    const requestBody = {
        email,
        password,
    };
    return this.callApiEndpoint('auth', 'POST', requestBody);
}
