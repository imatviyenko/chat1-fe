import constants from '../../../constants';

const getServerErrorResult = async response => {
    const result = {status: constants.ERROR_GENERIC_SERVER_FAILURE};
    try {
        const json = await response.json();
        console.error(`getServerErrorResult -> json: ${JSON.stringify(json)}`);
        if (json.status) result.status = json.status;
    } catch {};
    return result;
};


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

    console.log(`callApiEndpoint -> url: ${url}, method: ${method}, token: ${token}`);

    let result;
    try {
        const response = await fetch(url, options);
        if (!response.ok) return await getServerErrorResult(response);

        const json = await response.json();
        console.log('callApiEndpoint -> response json:');
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