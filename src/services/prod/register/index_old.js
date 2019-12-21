import constants from '../../../constants';

import {getUserProfileByEmail} from '../data';
import {sendRegistrationConfirmationEmail} from '../email';
const timeoutInSeconds = 5;

export async function registerUser(userDisplayName, userEmail, password, code) {
    console.log('registerUser -> userEmail: ', userEmail);

    // check if such a user already exists
    const existingUserProfile = await getUserProfileByEmail(userEmail);
    console.log('registerUser -> existingUserProfile: ', existingUserProfile);

    let result;
    if (existingUserProfile && (existingUserProfile.status === constants.USER_STATUS_ACTIVE || existingUserProfile.status === constants.USER_STATUS_DISABLED) ) {
        result = {status: constants.ERROR_REGISTRATION_USER_ALREADY_EXISTS};
    } else {
        let shouldSendEmail;
        try {
            const databaseOperationResult = await completeUserRegistration(userDisplayName, userEmail, password, code); 
            if (!databaseOperationResult || databaseOperationResult.status !== constants.ERROR_SUCCESS) {
                result = {status: constants.ERROR_REGISTRATION_DATABASE_FAILURE};
                shouldSendEmail = false; 
            } else {
                result = databaseOperationResult; // this method returns the auth token and the user is automatically logged in after registration is completed
                shouldSendEmail = !code; // if code containing the email address in encrypted form was provided, then we don't need to confirm email address
            }
        } catch(saveUserInDatabaseError) {
            result = {status: constants.ERROR_REGISTRATION_EMAIL_SENDING_FAILURE};
            shouldContinue = false;
        }

        if (shouldSendEmail) {
            try {
                const sendEmailResult = await sendRegistrationConfirmationEmail(userEmail, userDisplayName);
                if (!sendEmailResult || sendEmailResult.status !== constants.ERROR_SUCCESS) {
                    result = {status: constants.ERROR_REGISTRATION_EMAIL_SENDING_FAILURE};
                } else {
                    result = {status: constants.ERROR_SUCCESS};
                }
            } catch(sendEmailError) {
                result = {status: constants.ERROR_REGISTRATION_EMAIL_SENDING_FAILURE};
            };
        }
    }

    return new Promise( (resolve, reject) => {
        setTimeout(resolve(result), timeoutInSeconds * 1000);
    });
}
