import * as authExports from './auth';
import * as sampleExports from './sample';

const apiUrl = process.env.REACT_APP_API_URL; // get back-end API URL via the environment variable REACT_APP_API_URL
console.debug('services -> apiUrl: ', apiUrl);

const services = {
    apiUrl,
    ...authExports,
    ...sampleExports
}

export default services;