import tokenService from './tokenService.js';

const API_URL = 'https://blog.kreosoft.space/api';

const request = async (url, method, body = null, auth = false) => {
    url = API_URL + url;

    const headers = {"content-type": "application/json"};
    if (auth) {
        const token = tokenService.getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        } else {
            throw new Error("Необходим токен");
        }
    }

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        })

        if (response.status === 200) {
            return {status: response.status, body: await response.json()};
        }

        return {status: response.status};
    }
    catch (error) {
        console.error("Не удалось выполнить запрос", error);
        return {status: 0};
    }
}

export default {
    post: (url, body, auth) => request(url, "POST", body, auth),
    get: (url, body, auth) => request(url, "GET", body, auth),
    put: (url, body, auth) => request(url, "PUT", body, auth),
    delete: (url, body, auth) => request(url, "DELETE", body, auth)
}