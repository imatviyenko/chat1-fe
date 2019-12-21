import constants from '../../../constants';
import fakeUsers from '../data/fakeUsers';

const timeoutInSeconds = 5;

export async function authUser(email, password) {
    console.log('authUser -> email: ', email);
    const emailLowercase = email.toLowerCase();
    const matchedUser = fakeUsers.find( u => u.status === constants.USER_STATUS_ACTIVE && u.email.toLowerCase() === emailLowercase);

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
