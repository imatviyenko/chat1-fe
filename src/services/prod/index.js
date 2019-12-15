import * as helpers from './helpers';
import * as authExports from './auth';
import * as registerExports from './register';
import * as dataExports from './data';
import * as emailExports from './email';


const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/'; // get back-end API URL via the environment variable REACT_APP_API_URL
console.debug('services -> apiUrl: ', apiUrl);

const services = {
    apiUrl,
    ...helpers,
    ...authExports,
    ...registerExports,
    ...dataExports,
    ...emailExports,
}

export default services;