import constants from '../../../constants';

import {getUserProfileByEmail} from '../profile';
import {sendRegistrationConfirmationEmail} from '../email';
const timeoutInSeconds = 5;

export async function registerUser(userDisplayName, userEmail, password) {
    console.log('registerUser -> userEmail: ', userEmail);

    // check if such a user already exists
    const existingUserProfile = await getUserProfileByEmail(userEmail);
    console.log('registerUser -> existingUserProfile: ', existingUserProfile);

    let result;
    if (existingUserProfile && (existingUserProfile.status === constants.PROFILE_STATUS_ACTIVE || existingUserProfile.status === constants.PROFILE_STATUS_DISABLED) ) {
        result = {status: constants.ERROR_REGISTRATION_USER_ALREADY_EXISTS};
    } else {
        try {
            // TODO: Save user in the database with 'PROFILE_STATUS_CONFIRMATION_PENDING' status

            
            const sendEmailResult = await sendRegistrationConfirmationEmail(userDisplayName, userEmail);
            if (!sendEmailResult || sendEmailResult.status !== constants.ERROR_SUCCESS) {
                result = {status: constants.ERROR_REGISTRATION_EMAIL_SENDING_FAILURE};
            }
        } catch(sendEmailError) {
            result = {status: constants.ERROR_REGISTRATION_EMAIL_SENDING_FAILURE};
        };
        result = {status: constants.ERROR_SUCCESS};
    }

    return new Promise( (resolve, reject) => {
        setTimeout(resolve(result), timeoutInSeconds * 1000);
    });
}
