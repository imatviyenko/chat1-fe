import constants from '../../../constants';

const timeoutInSeconds = 5;

export async function registerUser(userDisplayName, userEmail, password, code) {
    console.log('registerUser -> userEmail: ', userEmail);

    const result  = {
        status: constants.ERROR_SUCCESS
    };

    if (code) {
        result.token = `email:${userEmail}`;
    }

    return new Promise( (resolve, reject) => {
        setTimeout(resolve(result), timeoutInSeconds * 1000);
    });
}


export async function getEmailFromCode(code) {
    console.log('getEmailFromCode -> code: ', code);

    const SECRET = 'SECRET.';

    let result;
    if (code && code.includes(SECRET)) {
        console.log('getEmailFromCode -> code is valid');
        const emailFromCode = code.split(SECRET)[1];
        result = {
            status: constants.ERROR_SUCCESS,
            email: emailFromCode
        }
    } else {
        result = {
            status: constants.ERROR_REGISTRATION_INVALID_CODE
        };
    }

    return new Promise( (resolve, reject) => {
        setTimeout(resolve(result), timeoutInSeconds * 1000);
    });    
}