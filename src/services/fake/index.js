import * as sampleExports from './sample';
import * as authExports from './auth';
import * as registerExports from './register';
import * as profileExports from './profile';
import * as emailExports from './email';


const apiUrl = process.env.REACT_APP_API_URL; // get back-end API URL via the environment variable REACT_APP_API_URL
console.debug('services -> apiUrl: ', apiUrl);

const services = {
    apiUrl,
    ...authExports,
    ...registerExports,
    ...profileExports,
    ...emailExports,
    ...sampleExports
}

export default services;