import constants from '../../../constants';
import fakeUsers from '../data/fakeUsers';

const timeoutInSeconds = 5;

export async function authUser(userEmail, password) {
    console.log('authUser -> userEmail: ', userEmail);
    const userEmailLowercase = userEmail.toLowerCase();
    const matchedUser = fakeUsers.find( u => u.status === constants.PROFILE_STATUS_ACTIVE && u.email.toLowerCase() === userEmailLowercase);

    let result;
    if (matchedUser && matchedUser.password === password) {
        result = {status: constants.ERROR_SUCCESS, token: `email:${matchedUser.email}`};
    } else {
        result = {status: constants.ERROR_AUTH_INVALID_CREDENTIALS};
    }

    return new Promise( (resolve, reject) => {
        setTimeout(resolve(result), timeoutInSeconds * 1000);
    });
}
