import constants from '../../../constants';

export async function callApiEndpoint(path, method, body, token) {
    const url = this.apiUrl.replace(/\/$/, '') + '/' + path;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = {
        method,
        mode: 'cors',
        credentials: 'omit',
        headers,
        body: body ? JSON.stringify(body) : null
    };

    let result;
    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log('callApiEndpoint -> json:');
        console.log(json);
        result = json;
    } catch (fetchError) {
        console.error(fetchError);
        result = {
            status: constants.ERROR_API_CALL_FAILED
        }
    }
    return result;
}