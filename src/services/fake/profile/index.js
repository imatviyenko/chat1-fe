import constants from '../../../constants';
import fakeUsers from '../data/users';

const timeoutInSeconds = 5;

export async function getUserProfileByEmail(email) {
    const emailLowerCase = email.toLowerCase();
    const userProfile = fakeUsers.find( p => p.email.toLowerCase() === emailLowerCase );
    return new Promise( (resolve, reject) => {
        setTimeout(resolve(userProfile), timeoutInSeconds * 1000);
    });
}
