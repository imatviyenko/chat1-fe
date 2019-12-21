import * as helpers from './helpers';
import * as authExports from './auth';
import * as registerExports from './register';
import * as dataExports from './data';
import * as emailExports from './email';
import * as contactsExports from './contacts';


const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/'; // get back-end API URL via the environment variable REACT_APP_API_URL
console.debug('services -> apiUrl: ', apiUrl);

function setAuthContext(auth) {
    this.authContext = auth;
}


const services = {
    apiUrl,
    setAuthContext,
    ...helpers,
    ...authExports,
    ...registerExports,
    ...dataExports,
    ...emailExports,
    ...contactsExports
}

export default services;