export async function getProfile() {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    return this.callApiEndpoint('profile', 'GET', null, this.authContext.token);
}

export async function updateProfile(profile) {
    if (!(this.authContext && this.authContext.token)) throw new Error('No authentication context');

    return this.callApiEndpoint(`profile`, 'PUT', profile, this.authContext.token);
}