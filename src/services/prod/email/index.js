import constants from '../../../constants';

const timeoutInSeconds = 5;

export async function sendRegistrationConfirmationEmail(email, displayName) {
    const secret = `SECRET.${email}`;
    const confirmationLink = `http://localhost:3000/confirm?secret=${secret}`;
    console.log('*************************************************');
    console.log('sendRegistrationConfirmationEmail -> confirmationLink: ', confirmationLink);
    console.log('*************************************************');

    const result = {status: constants.ERROR_SUCCESS};
    return new Promise( (resolve, reject) => {
        setTimeout(resolve(result), timeoutInSeconds * 1000);
    });
}